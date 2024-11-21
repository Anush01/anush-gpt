"use client";

import { useState } from "react";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { streamOllamaResponse } from "@/lib/ollama";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemma2:latest");
  const [currentContext, setCurrentContext] = useState<number[] | undefined>();

  const handleSubmit = async (content: string) => {
    try {
      setIsLoading(true);
      
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Create assistant message placeholder
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: ''
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Stream the response with context
      await streamOllamaResponse(
        content,
        selectedModel, // Pass the current context
        (chunk) => {
          setMessages(prev => prev.map(msg => 
            msg.id === assistantMessageId 
              ? { ...msg, content: msg.content + chunk }
              : msg
          ));
        },
        (newContext) => {
          setIsLoading(false);
          setCurrentContext(newContext); // Save the new context
        },
        currentContext
      );
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setIsLoading(false);
      // Handle error appropriately
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setCurrentContext(undefined);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b p-4">
        <Select 
          value={selectedModel} 
          onValueChange={(value) => {
            setSelectedModel(value);
            handleNewConversation(); // Reset conversation when model changes
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gemma2:latest">Gemma</SelectItem>
            <SelectItem value="llama3.2">LLama3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatMessages messages={messages} />
      </div>
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}