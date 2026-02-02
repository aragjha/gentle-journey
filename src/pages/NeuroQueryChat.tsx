import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { MessageCircle, Send } from "lucide-react";

interface NeuroQueryChatProps {
  onNavigate: (tab: "home" | "maps" | "tools" | "profile") => void;
}

const quickPrompts = [
  "Explain a symptom",
  "What should I track?",
  "Questions for my doctor",
  "Help me prepare for appointment",
];

const NeuroQueryChat = ({ onNavigate }: NeuroQueryChatProps) => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm NeuroQuery, your Parkinson's learning companion. Ask me anything about symptoms, treatments, or daily tips. 🧠",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: "Thanks for your question! This feature is coming soon. For now, I'm here to show you how the chat will work. 💬" },
    ]);
    setInput("");
  };

  const handleQuickPrompt = (prompt: string) => {
    setMessages([
      ...messages,
      { role: "user", content: prompt },
      { role: "assistant", content: `Great question about "${prompt.toLowerCase()}"! This feature is coming soon. I'll be able to provide personalized guidance based on your journey. 🌟` },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-safe-top border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-h2 text-foreground">NeuroQuery</h1>
            <p className="text-helper text-muted-foreground">Your PD learning companion</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 overflow-y-auto pb-48">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-accent text-accent-foreground rounded-br-sm"
                  : "bg-card text-card-foreground rounded-bl-sm border border-border"
              }`}
            >
              <p className="text-body">{message.content}</p>
            </div>
          </motion.div>
        ))}

        {/* Quick Prompts */}
        {messages.length <= 2 && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-helper text-muted-foreground mb-3">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-helper-lg hover:bg-accent/20 hover:text-foreground transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/95 backdrop-blur-sm border-t border-border">
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
            className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
          >
            <Send className="w-5 h-5 text-accent-foreground" />
          </button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Not medical advice. Not for emergencies.
        </p>
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="tools" onTabChange={onNavigate} />
    </div>
  );
};

export default NeuroQueryChat;
