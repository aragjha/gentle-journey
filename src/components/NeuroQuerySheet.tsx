import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface NeuroQuerySheetProps {
  isOpen: boolean;
  onClose: () => void;
  contextTopic?: string;
  suggestedPrompts?: string[];
}

const NeuroQuerySheet = ({
  isOpen,
  onClose,
  contextTopic,
  suggestedPrompts = [],
}: NeuroQuerySheetProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset messages when sheet opens with new topic
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: "assistant",
          content: contextTopic
            ? `I'm here to help you understand more about "${contextTopic}". What would you like to know? 🧠`
            : "Hi! I'm NeuroQuery. Ask me anything about Parkinson's disease. 🧠",
        },
      ]);
    }
  }, [isOpen, contextTopic]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Thanks for asking about "${userMessage.slice(0, 50)}${userMessage.length > 50 ? "..." : ""}". This feature is coming soon! I'll be able to provide personalized, evidence-based information to help you on your journey. 💬`,
        },
      ]);
    }, 500);
  };

  const handlePromptClick = (prompt: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt },
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Great question about "${prompt.slice(0, 40)}...". This feature is coming soon! I'll provide detailed, easy-to-understand answers backed by medical research. 🌟`,
        },
      ]);
    }, 500);
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[85vh] max-h-[85vh]">
        {/* Header */}
        <DrawerHeader className="border-b border-border pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <DrawerTitle className="text-h3 text-foreground">
                  NeuroQuery
                </DrawerTitle>
                <p className="text-helper text-muted-foreground">
                  Your PD learning companion
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </DrawerHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-accent text-accent-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  <p className="text-body">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />

          {/* Suggested prompts (show only at start) */}
          {messages.length <= 1 && suggestedPrompts.length > 0 && (
            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-helper text-muted-foreground mb-2">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 4).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-3 py-2 rounded-full bg-card border border-border text-helper-lg text-foreground hover:border-accent/50 hover:bg-accent/5 transition-colors text-left"
                  >
                    {prompt.length > 40 ? `${prompt.slice(0, 40)}...` : prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border px-4 py-3 pb-safe-bottom bg-background">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 rounded-full bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-accent-foreground" />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Not medical advice. Consult your healthcare team.
          </p>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NeuroQuerySheet;
