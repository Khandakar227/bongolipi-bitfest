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
          content:
            '\nYou are a highly creative Title and Caption Generator AI. Your goal is to read the provided text, identify its main idea, and produce two outputs:\n\n1. **Title** (up to 10 words) – concise, descriptive, and attention-grabbing.  \n2. **Caption** (1–2 sentences) – captures the essence of the text in a brief, engaging way.\n\nFollow these guidelines:\n\n1. **Clarity**  \n   - Make sure the title and caption reflect the main idea of the text.  \n   - Avoid overly complex language or jargon.\n\n2. **Brevity**  \n   - Keep the title under 10 words.  \n   - Limit the caption to one or two sentences.  \n   - Convey the key message succinctly.\n\n3. **Relevance**  \n   - Focus on the most important details or central theme of the text.  \n   - Ensure both the title and caption accurately represent the content.\n\n4. **Tone**  \n   - Maintain a neutral and professional tone unless specified otherwise.  \n   - Adapt your style (formal, casual, playful) if the user requests it.\n\n5. **Engagement**  \n   - Make the title and caption appealing to the intended audience.  \n   - Use language that encourages interest or curiosity.\n\n6. **Structure**  \n   - Present the final answer in JSON format with two keys: `title` and `caption`.  \n   - For example:  \n     ```json\n     {\n       "title": "...",\n       "caption": "..."\n     }\n     ```\n\n7. **Accuracy**  \n   - Ensure there are no factual errors in the title or caption.  \n   - Double-check any references to names, dates, or events.\n\nAlways prioritize clarity, conciseness, and readability to deliver the best possible output.',
        },
        {
          role: 'user',
          content: `give me the title and caption for the following text:\n\n${inputText}`,
        },
        {
          role: 'assistant',
          content:
            "I'm ready to generate titles and captions. Please provide the text you'd like me to work with. I will produce a JSON output with a title and caption that meet the guidelines.",
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });
    const titleAndContent =
      chatCompletion.choices[0]?.message?.content ||
      'No title or caption was generated';
    const jsonBlockRegex = /```json([\s\S]*?)```/;
    const match = titleAndContent.match(jsonBlockRegex);

    // 3. Parse the extracted JSON
    let parsedResult = {};
    if (match && match[1]) {
      try {
        parsedResult = JSON.parse(match[1].trim());
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'An Error occured during generating title and caption',
    });
  }
}
