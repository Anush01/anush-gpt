export type OllamaStreamResponse = {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    context?: number[];
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
  }
  
  export async function streamOllamaResponse(
    prompt: string,
    model: string,
    onMessage: (message: string) => void,
    onEnd: (context?: number[]) => void,
    context?: number[],
  ) {
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
          context,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }
  
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
  
      if (!reader) {
        throw new Error('No reader available');
      }
  
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
  
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
  
        for (const line of lines) {
          if (line.trim() === '') continue;
  
          try {
            const data = JSON.parse(line) as OllamaStreamResponse;
            
            if (data.response) {
              onMessage(data.response);
            }
  
            if (data.done) {
              onEnd(data.context);
              break;
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error in streamOllamaResponse:', error);
      throw error;
    }
  }