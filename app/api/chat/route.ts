import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const body = await req.json();

  // Extract the messages array from the request body
  const { messages: original_messages } = body;

  // Add a system message at the beginning of the messages array
  const modifiedMessages = [
    {
      role: 'system',
      content: `You are an experienced Spanish chef, specialized in Mediterranean cuisine. 
      You provide detailed cooking instructions, tips, and advice on selecting the best ingredients.`,
    },    
    ...original_messages, // Spread the original messages to include them after the system message
  ];

  // Continue with your logic...
  const response = await openai.chat.completions.create({
    // model: 'gpt-4-turbo-preview',
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: modifiedMessages, // Use the modified messages array with the system message included
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}