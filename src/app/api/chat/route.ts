// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { gerarPrompt, tratarRespostaDoBot } from '../../../utils/bot';

// Armazena o histórico por ID do usuário (ex: número do WhatsApp)
const sessions = new Map<string, { role: 'system' | 'user' | 'assistant'; content: string }[]>();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, message } = body;

    if (!sessionId || !message) {
      return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
    }

    // Recupera o histórico da sessão ou cria um novo com o prompt de system
    let userHistory = sessions.get(sessionId);
    if (!userHistory) {
      userHistory = [
        {
          role: 'system',
          content: gerarPrompt({
            id: 'temp',
            mensagem: message,
            status: 'em andamento',
            criadoEm: new Date().toISOString(),
          }),
        },
      ];
      sessions.set(sessionId, userHistory);
    }

    // Adiciona a nova mensagem do usuário
    userHistory.push({ role: 'user', content: message });

    // Envia para a API da OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      messages: userHistory,
    });

    const respostaHevelyn = completion.choices[0].message.content ?? 'Sem resposta';

    // Adiciona a resposta do assistente ao histórico
    userHistory.push({ role: 'assistant', content: respostaHevelyn });

    // Verifica se a Hevelyn finalizou o chamado
    const resultado = await tratarRespostaDoBot(respostaHevelyn, message);

    return NextResponse.json({
      response: respostaHevelyn,
      chamadoFinalizado: resultado.sucesso,
      ...(resultado.sucesso && { chamado: resultado.chamado }),
    });
  } catch (err: any) {
    console.error('Erro na geração de resposta:', err);
    return NextResponse.json({ error: 'Erro ao gerar resposta' }, { status: 500 });
  }
}
