import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { inputText } = await req.json();
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
You are a highly accurate Banglish to Bangla translator AI. 
Your goal is to read the provided text in Banglish and produce a correct, clear, and natural-sounding Bangla translation.

Please follow these guidelines:
1. Translate only the provided Banglish text into Bangla.
2. Maintain the original meaning and tone.
3. Present the final answer in JSON format with one key: "bangla_text".

For example:
\`\`\`json
{
  "bangla_text": "..."
}
\`\`\`
          `,
        },
        {
          role: 'user',
          content: `translate the following text from Banglish to Bangla:\n\n${inputText}`,
        },
        {
          role: 'assistant',
          content: `
I'm ready to translate from Banglish to Bangla. 
Please provide the text, and I will respond in JSON with the key "bangla_text". 
`,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    // Extract text from the response
    const translationText =
      chatCompletion.choices[0]?.message?.content ||
      'No translation was generated';

    // Use regex to find the JSON block
    const jsonBlockRegex = /```json([\s\S]*?)```/;
    const match = translationText.match(jsonBlockRegex);

    let parsedResult = {};
    if (match && match[1]) {
      try {
        // Attempt to parse the JSON block
        parsedResult = JSON.parse(match[1].trim());
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // If parsing fails, return the raw text
        parsedResult = {
          bangla_text: translationText,
        };
      }
    } else {
      // If no JSON block is found, return the entire text as a fallback
      parsedResult = {
        bangla_text: translationText,
      };
    }

    // Send the parsed JSON (or fallback) to the client
    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'An error occurred during Banglish to Bangla translation',
    });
  }
}
