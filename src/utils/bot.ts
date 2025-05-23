import { randomUUID } from 'crypto';

export type Chamado = {
  id: string;
  mensagem: string;
  status: string;
  criadoEm: string;
};

/**
 * Cria e salva um chamado único com base na mensagem do usuário.
 */
export async function criarChamado(userMessage: string): Promise<Chamado> {
  const chamado: Chamado = {
    id: randomUUID(),
    mensagem: userMessage,
    status: 'aberto',
    criadoEm: new Date().toISOString(),
  };

  try {
    const response = await fetch('http://localhost:3000/api/chamados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(chamado),
    });

    if (!response.ok) {
      throw new Error(`Erro ao salvar o chamado: ${response.statusText}`);
    }

    return chamado;
  } catch (error) {
    console.error('Erro ao salvar o chamado:', error);
    throw error;
  }
}

/**
 * Gera o prompt completo para o modelo da Hevelyn, baseado em um chamado.
 */
export function gerarPrompt(chamado: Chamado): string {
  return `
Você é Hevelyn, uma assistente virtual cordial e prestativa. Sua função é ajudar os usuários com seus chamados e solicitações de forma amigável e eficiente.

Regras de interação:
1. Sempre se apresente como Hevelyn
2. Mantenha um tom cordial e profissional
3. Seja direta e objetiva nas respostas
4. Demonstre empatia ao lidar com problemas dos usuários
5. Peça esclarecimentos quando necessário
6. Confirme o entendimento antes de prosseguir com ações
7. Ofereça alternativas quando apropriado
8. Mantenha um registro do contexto da conversa
9. Finalize a conversa com um bom atendimento e, em seguida, adicione a tag: #CHAMADO_FINALIZADO

Ao receber um chamado:
1. Cumprimente o usuário
2. Identifique a natureza do chamado
3. Colete informações relevantes (uma por vez)
4. Proponha soluções
5. Confirme se a solução atendeu à necessidade

Informações do chamado atual:
ID: ${chamado.id}
Data: ${chamado.criadoEm}
Status: ${chamado.status}
Mensagem do usuário: "${chamado.mensagem}"

Lembre-se: seu objetivo é proporcionar uma experiência positiva e resolver os problemas dos usuários da melhor forma possível.
Quando o chamado estiver pronto, finalize com a tag: "#CHAMADO_FINALIZADO".
`;
}

/**
 * Trata a resposta da Hevelyn e salva o chamado caso esteja finalizado.
 * @param respostaDoBot Texto da resposta gerada pelo modelo
 * @param mensagemUsuario Texto original da solicitação do usuário
 */
export async function tratarRespostaDoBot(respostaDoBot: string, mensagemUsuario: string) {
  if (respostaDoBot.includes('#CHAMADO_FINALIZADO')) {
    try {
      const chamado = await criarChamado(mensagemUsuario);
      console.log('Chamado criado com sucesso:', chamado);
      return {
        sucesso: true,
        mensagem: 'Chamado registrado com sucesso!',
        chamado,
      };
    } catch (error) {
      return {
        sucesso: false,
        mensagem: 'Ocorreu um erro ao registrar o chamado. Por favor, tente novamente.',
        erro: error,
      };
    }
  }

  return {
    sucesso: false,
    mensagem: 'Chamado ainda em andamento.',
  };
  
}
