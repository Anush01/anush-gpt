"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ConversationList from "./conversation-list";

export default function Sidebar() {
  return (
    <div className="w-64 border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <Link href="/">
          <Button className="w-full" variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <ConversationList />
      </div>
    </div>
  );
}