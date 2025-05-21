// Tipos
export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type UserSession = {
  name?: string;
  chamado?: {
    titulo: string;
    mensagem: string;
    status: string;
  };
  messages: ChatMessage[];
  lastActivity?: number;
  timeout?: NodeJS.Timeout;
};

// Quadro de avisos
const avisos: Record<string, string> = {
  aviso1: "Os colaboradores que desejam ferias para julho, agosto e setembro devem procurar seu gestor imediato para solicitar!",
  aviso2: "Teremos um atraso no deposito do vale transporte, o mesmo sera depositado no dia 10/10/2023",
};

function getAvisos(): string {
  return Object.entries(avisos)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');
}

// Protocolo de atendimento
const protocoloAtendimento: Record<string, string> = {
  protocolo1: "Se apresentar como Hevelyn, atendente da empresa, e perguntar o nome do colaborador.",
  protocolo2: "Se o colaborador não souber o que quer, perguntar se ele tem algum aviso ou recado para a empresa.",
  protocolo3: "Se não souber o nome do colaborador, peça-o antes de passar qualquer informação.",
  protocolo4: `Consultar o quadro de avisos: ${getAvisos()} para verificar se a dúvida do colaborador já está contemplada lá.`,
  protocolo5: "Finalizar de forma educada, agradecendo o colaborador por entrar em contato e se colocando à disposição para ajudar.",
  protocolo6: "Caso não saiba a resposta,vai guiar o colaborador para abertura de um chamado ",
};

function getProtocolo(): string {
  return Object.entries(protocoloAtendimento)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');
}

// Controla renovação de sessão
function renovar(session: UserSession): void {
  session.timeout = setTimeout(() => {
    console.log('Sessão ativa');
  }, 5 * 60 * 1000);
}

// Reset da sessão
function resetSession(session: UserSession): void {
  session.name = undefined;
  session.chamado = undefined;
  session.messages = [];
  session.lastActivity = undefined;

  if (session.timeout) {
    clearTimeout(session.timeout);
    session.timeout = undefined;
  }
}

// Geração do prompt
export function getChatbotPrompt(message: string, session: UserSession): ChatMessage[] {
  session.lastActivity = Date.now();

  if (session.timeout) clearTimeout(session.timeout);
  session.timeout = setTimeout(() => {
    resetSession(session);
    console.log('Sessão expirada e resetada por inatividade.');
  }, 5 * 60 * 1000);

  const nameMatch = message.match(/meu nome é ([a-zA-Z\s]+)/i);
  if (nameMatch) {
    session.name = nameMatch[1].trim();
  }

  // Detecta dados de chamado
  const tituloMatch = message.match(/t[ií]tulo[:\-]?\s*(.+)/i);
  const mensagemMatch = message.match(/mensagem[:\-]?\s*(.+)/i);

  if (tituloMatch && mensagemMatch) {
    session.chamado = {
      titulo: tituloMatch[1].trim(),
      mensagem: mensagemMatch[1].trim(),
      status: "aberto",
    };
  }

  // Armazena mensagem do usuário
  session.messages.push({ role: 'user', content: message });

  const systemMessage: ChatMessage = {
    role: 'assistant',
    content: `Atenda de acordo com: ${getProtocolo()} Resolvido a dúvida do usuário, despeça-se de forma clara e objetiva. Se não souber a resposta, diga que não sabe e que vai transferir para o setor responsável.`,
  };

  const prompt: ChatMessage[] = [systemMessage];

  const missing: string[] = [];
  if (!session.name) missing.push('seu nome');

  if (missing.length > 0) {
    renovar(session);
    prompt.push(...session.messages);
    prompt.push({
      role: 'assistant',
      content: `Antes de prosseguir com seu atendimento, poderia me informar ${missing.join(' e ')}?`,
    });
    return prompt;
  }

  if (session.chamado?.titulo && session.chamado?.mensagem) {
    prompt.push(...session.messages);
    prompt.push({
      role: 'assistant',
      content: `Entendi! Você abriu um chamado com o título: "${session.chamado.titulo}" e a mensagem: "${session.chamado.mensagem}".\n\nSeu chamado foi registrado com sucesso e está com o status "aberto". Em breve o setor responsável entrará em contato.`,
    });
    return prompt;
  }else{
    session.chamado = undefined;
    prompt.push(...session.messages);
    prompt.push({
      role: 'assistant',
      content: `Entendi! Você não abriu nenhum chamado. Em que posso te ajudar?`,
    });
  }

  prompt.push({
    role: 'assistant',
    content: `Olá, ${session.name}! Em que posso te ajudar hoje?`,
  });

  prompt.push(...session.messages);

  return prompt;
}
