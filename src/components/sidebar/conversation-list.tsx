"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

type Conversation = {
  id: string;
  title: string;
  model_name: string;
  created_at: string;
}

export default function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const pathname = usePathname();

  // This will be replaced with actual API call later
  useEffect(() => {
    // Temporary mock data
    setConversations([
      {
        id: "1",
        title: "First Conversation",
        model_name: "llama2",
        created_at: new Date().toISOString(),
      },
    ]);
  }, []);

  return (
    <div className="space-y-1 p-2">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/chat/${conversation.id}`}
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
            pathname === `/chat/${conversation.id}`
              ? "bg-accent"
              : "hover:bg-accent/50"
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="truncate text-sm">{conversation.title}</span>
        </Link>
      ))}
    </div>
  );
}