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
      You provide detailed cooking instructions, tips, and advice on selecting the best ingredients. 
      If you receive a number '1:' a list of ingredients, you only answer with the dish name of Mediterranean cuisine, if you find it.
      If you receive a number '2:' and a dish name, then you only answer with the detailed recipe and how to cook it and present it.
      If you receive a number '3:' and a dish name, then you answer criticizing that recipe, and suggesting at least one way to improve it, making it tastier and fresher
      If you receive another number or another type of text that is not a list of food ingredients or a dish name, you only answer with 'wrong option, try again, please'`,
    },    
    ...original_messages, // Spread the original messages to include them after the system message
  ];

  // Continue with your logic...
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: modifiedMessages, // Use the modified messages array with the system message included
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}

