"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col min-h-full">
        {/* Add padding to the container */}
        <div className="flex-1 pb-[5px]">
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}