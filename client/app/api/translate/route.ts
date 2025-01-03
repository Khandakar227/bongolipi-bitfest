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

**IMPORTANT**: 
1. You must output your response in code-fenced JSON with the key "bangla_text". 
2. Do not include any commentary outside the code-fenced JSON. 
3. Provide only one JSON code fence in your final answer.

For example:
\`\`\`json
{
  "bangla_text": "আমার নাম রাহিম।"
}
\`\`\`
          `,
        },
        {
          role: 'user',
          content: `
Translate the following Banglish text to Bangla, and output only code-fenced JSON:

${inputText}
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

    // 1. Extract text from the response
    const translationText =
      chatCompletion.choices[0]?.message?.content ||
      'No translation was generated';

    // 2. Log the raw response (for debugging)
    console.log('Raw model response:', translationText);

    // 3. Use regex to find the JSON block
    const jsonBlockRegex = /```json([\s\S]*?)```/;
    const match = translationText.match(jsonBlockRegex);

    let parsedResult = {};

    // 4. Parse the extracted JSON if it exists
    if (match && match[1]) {
      try {
        parsedResult = JSON.parse(match[1].trim());
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // If parsing fails, return the raw text
        parsedResult = {
          bangla_text: translationText,
        };
      }
    } else {
      // If no JSON block is found, return the entire text as fallback
      parsedResult = {
        bangla_text: translationText,
      };
    }

    // 5. Send the parsed JSON (or fallback) to the client
    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'An error occurred during Banglish to Bangla translation',
    });
  }
}
