import { NextRequest } from "next/server";

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

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OpenAI API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = await req.json();

  const openaiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

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
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI" }),
      { status: response.status, headers: { "Content-Type": "application/json" } }
    );
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
