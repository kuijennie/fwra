import { NextRequest } from "next/server";

// This is the personality and knowledge boundary of the AI.
// It is prepended to every conversation so OpenAI always knows its role.
// Changing this prompt changes how the AI behaves across the entire app.
const SYSTEM_PROMPT = `You are a friendly and knowledgeable farm waste recycling assistant for Kenyan farmers. Your expertise covers:

- **Composting**: Turning crop residues, food waste, and animal manure into nutrient-rich soil amendment (4-8 weeks)
- **Biogas**: Converting organic waste (especially animal manure) into clean cooking fuel and liquid fertilizer
- **Mulching**: Using crop residues like maize stalks, wheat straw, and rice husks to conserve soil moisture and suppress weeds
- **Animal Feed**: Safely repurposing crop residues and food waste as livestock feed or silage
- **Vermicomposting**: Using earthworms to break down organic waste into high-quality fertilizer

Guidelines:
- Keep answers practical, concise (2-4 paragraphs max), and relevant to small-scale Kenyan farming
- Consider local climate zones (arid, semi-arid, sub-humid, humid) when giving advice
- Mention common Kenyan crops: maize, wheat, rice, sugarcane, beans, tea, coffee
- If asked about something outside waste recycling / farming, politely redirect the conversation
- Use simple language accessible to farmers of all education levels`;

// This is the API route that the chat widget calls every time the user sends a message.
// It receives the full conversation history, forwards it to OpenAI, and streams the reply back.
export async function POST(req: NextRequest) {
  // The OpenAI API key is stored in .env.local — never exposed to the browser
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OpenAI API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // The chat widget sends the full conversation history (all previous messages)
  // so OpenAI has context and can give follow-up answers
  const { messages } = await req.json();

  // Prepend the system prompt to the conversation before sending to OpenAI
  const openaiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  // Call OpenAI's API with streaming enabled (stream: true)
  // This means OpenAI sends back the reply word-by-word instead of waiting for the full response
  // Model: gpt-4o-mini — fast and cost-effective for this use case
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: openaiMessages,
      stream: true,
      max_tokens: 800, // limits response length to keep answers concise
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI" }),
      { status: response.status, headers: { "Content-Type": "application/json" } }
    );
  }

  // We create our own stream to forward OpenAI's chunks to the browser.
  // OpenAI sends data in "Server-Sent Events" format — each line looks like:
  //   data: {"choices":[{"delta":{"content":"Hello"}}]}
  // We extract just the text content and pipe it to the client.
  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // Decode the raw bytes into text and add to the buffer
          buffer += decoder.decode(value, { stream: true });

          // Split on newlines — each line is one SSE event
          const lines = buffer.split("\n");
          // Keep the last incomplete line in the buffer for next iteration
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const data = trimmed.slice(6); // remove the "data: " prefix
            if (data === "[DONE]") break;  // OpenAI signals end of stream with [DONE]

            try {
              // Parse the JSON chunk and extract the text fragment
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                // Send this text fragment to the browser immediately
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch {
              // Skip any malformed chunks (can happen at the start/end of stream)
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  // Return the stream as plain text — the chat widget reads it chunk by chunk
  // to create the live "typing" effect
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
