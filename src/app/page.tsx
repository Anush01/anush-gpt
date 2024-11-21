import { redirect } from "next/navigation";

export default function Home() {
  // Later we'll create a new conversation here and redirect to it
  // For now, we'll just show a simple message
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to AnushGPT</h1>
        <p className="text-muted-foreground">
          Select a conversation or start a new one
        </p>
      </div>
    </div>
  );
}