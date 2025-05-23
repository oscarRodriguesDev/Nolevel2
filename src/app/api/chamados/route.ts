import { NextResponse } from 'next/server';




export async function POST(request: Request) {
  try {
    const body = await request.json();
    
 /*    const chamado = await prisma.chamado.create({
      data: {
        titulo: body.mensagem.substring(0, 100), // Usa os primeiros 100 caracteres como título
        mensagem: body.mensagem,
        status: body.status,
        criadoEm: new Date(body.criadoEm)
      }
    }); */
    console.log('chamado realizado')

    return NextResponse.json('chamad gerado', { status: 201 });
  } catch (error) {
    console.error('Erro ao criar chamado:', error);
    return NextResponse.json(
      { error: 'Erro ao criar chamado' },
      { status: 500 }
    );
    
  }
}
