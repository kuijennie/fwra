"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatCircle as MessageCircle, X, PaperPlaneTilt as Send, CircleNotch as Loader2, Sparkle as Sparkles } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "How do I start composting at home?",
  "What waste is good for biogas?",
  "How can I make mulch from crop residue?",
  "What animals can eat farm waste safely?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = { role: "user", content: content.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!response.ok) {
          throw new Error("Failed to get response");
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          assistantContent += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I couldn't process your request. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:bg-green-700 hover:scale-105 active:scale-95 md:bottom-6"
          aria-label="Open recycling assistant chat"
        >
          <MessageCircle weight="duotone" className="h-6 w-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <>
          {/* Backdrop on mobile */}
          <div
            className="fixed inset-0 z-50 bg-black/30 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={panelRef}
            role="dialog"
            aria-label="Recycling assistant chat"
            className="fixed bottom-0 right-0 z-50 flex h-[85vh] w-full flex-col rounded-t-2xl bg-white shadow-2xl dark:bg-gray-900 md:bottom-6 md:right-4 md:h-[600px] md:w-[400px] md:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-green-600 px-4 py-3 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Sparkles weight="duotone" className="h-5 w-5 text-green-100" />
                <h2 className="font-semibold text-white">
                  AgriCycle AI
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-green-100 transition-colors hover:bg-green-700 hover:text-white"
                aria-label="Close chat"
              >
                <X weight="bold" className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-900">
                    <Sparkles weight="duotone" className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="mb-1 text-center font-medium text-gray-900 dark:text-white">
                    Ask me anything about
                  </p>
                  <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    farm waste recycling & composting
                  </p>
                  <div className="flex flex-col gap-2 w-full max-w-[280px]">
                    {SUGGESTED_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        onClick={() => sendMessage(question)}
                        className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-left text-sm text-green-800 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          message.role === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {message.role === "assistant" ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ol]:mb-2">
                            <ReactMarkdown>
                              {message.content || "..."}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          message.content
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-2.5 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        <Loader2 weight="duotone" className="h-4 w-4 animate-spin" />
                        Thinking...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 px-4 py-3 dark:border-gray-700"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about recycling..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 outline-none transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-green-500"
                  aria-label="Type your message"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition-all hover:bg-green-700 disabled:opacity-40 disabled:hover:bg-green-600"
                  aria-label="Send message"
                >
                  <Send weight="duotone" className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
