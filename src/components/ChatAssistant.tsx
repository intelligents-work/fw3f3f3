import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface ChatAssistantProps {
  compact?: boolean;
}

const suggestedPrompts = [
  "How will this improve my AOV?",
  "What's the ROI for 50 stores?",
  "How does the golden window work?",
  "What data do I need?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

type Msg = { role: "user" | "assistant"; content: string };

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (resp.status === 429) {
    onError("Rate limits exceeded. Please try again later.");
    return;
  }
  if (resp.status === 402) {
    onError("AI usage limit reached. Please contact support.");
    return;
  }
  if (!resp.ok || !resp.body) {
    onError("Failed to connect to AI. Please try again.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  onDone();
}

export function ChatAssistant({ compact }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI assistant for the Fairwood × AI Transcend demo. Ask me about ROI, proposals, or implementation. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async (message?: string) => {
    const text = message || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.id === -1) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { id: -1, role: "assistant", content: assistantSoFar }];
      });
    };

    const conversationHistory: Msg[] = messages
      .filter(m => m.id !== 1)
      .map(m => ({ role: m.role, content: m.content }));
    conversationHistory.push({ role: "user", content: text });

    try {
      await streamChat({
        messages: conversationHistory,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => {
          setIsLoading(false);
          setMessages((prev) => prev.map((m) => m.id === -1 ? { ...m, id: Date.now() } : m));
        },
        onError: (error) => {
          setIsLoading(false);
          toast({ variant: "destructive", title: "Error", description: error });
        },
      });
    } catch (error) {
      setIsLoading(false);
      toast({ variant: "destructive", title: "Error", description: "Connection failed." });
    }
  }, [input, isLoading, messages]);

  return (
    <div className={`flex flex-col ${compact ? 'h-full' : 'max-w-4xl mx-auto'}`}>
      {!compact && (
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-secondary" />
            <h1 className="text-xl font-bold text-foreground">AI Chat Assistant</h1>
          </div>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${compact ? '' : 'glass-card'}`}>
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={message.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai"><Loader2 className="w-4 h-4 animate-spin" /></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="px-2 py-1 text-xs rounded-full border border-border bg-card hover:bg-muted transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 h-9"
            disabled={isLoading}
          />
          <Button type="submit" size="sm" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}