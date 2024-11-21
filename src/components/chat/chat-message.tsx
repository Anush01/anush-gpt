import MarkdownRenderer from "./MarkdownRenderer";

type ChatMessageProps = {
    role: 'user' | 'assistant';
    content: string;
  };
  
  export function ChatMessage({ role, content }: ChatMessageProps) {
    return (
      <div className={`flex gap-3 p-4 ${role === 'assistant' ? 'bg-muted/40' : ''}`}>
        <div className="w-7 h-7 rounded-sm bg-primary/10 flex items-center justify-center">
          {role === 'user' ? '👤' : '🤖'}
        </div>
        <div className="flex-1 space-y-2">
          <p className="font-semibold">{role === 'user' ? 'You' : 'Assistant'}</p>
          <div className="text-sm text-muted-foreground">
          <MarkdownRenderer content={content} />
          </div>
        </div>
      </div>
    );
  }