"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Textarea } from "@/src/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { MessageSquare, ArrowLeft, Paperclip, Send, Bot } from "lucide-react"
import { Chatbot } from "@/src/components/chatbot"

export default function ChamadoDetalhePage(params: { params: { id: string } }) {
  // Extraindo o ID do chamado da URL
  const { id } = params.params

  // Dados de exemplo para o chamado
  const chamado = {
    id: id,
    titulo: "Problema com impressora do setor",
    departamento: "TI",
    status: "em andamento",
    data: "2023-05-20",
    prioridade: "média",
    descricao:
      "A impressora do setor de contabilidade está apresentando falhas ao imprimir documentos com mais de 10 páginas. O erro exibido é 'E-23'. Já tentamos reiniciar o equipamento, mas o problema persiste.",
    mensagens: [
      {
        id: 1,
        usuario: {
          nome: "João Silva",
          avatar: "/placeholder.svg?height=40&width=40",
          departamento: "Contabilidade",
        },
        data: "2023-05-20T10:30:00",
        conteudo:
          "A impressora do setor de contabilidade está apresentando falhas ao imprimir documentos com mais de 10 páginas. O erro exibido é 'E-23'. Já tentamos reiniciar o equipamento, mas o problema persiste.",
      },
      {
        id: 2,
        usuario: {
          nome: "Carlos Técnico",
          avatar: "/placeholder.svg?height=40&width=40",
          departamento: "TI",
        },
        data: "2023-05-20T11:15:00",
        conteudo:
          "Olá João, obrigado por reportar o problema. O erro E-23 geralmente está relacionado ao fusor da impressora. Você poderia verificar se há papel preso na bandeja traseira?",
      },
      {
        id: 3,
        usuario: {
          nome: "João Silva",
          avatar: "/placeholder.svg?height=40&width=40",
          departamento: "Contabilidade",
        },
        data: "2023-05-20T11:30:00",
        conteudo: "Verifiquei e não há papel preso. Tentei imprimir novamente e o erro persiste.",
      },
      {
        id: 4,
        usuario: {
          nome: "Carlos Técnico",
          avatar: "/placeholder.svg?height=40&width=40",
          departamento: "TI",
        },
        data: "2023-05-20T13:45:00",
        conteudo:
          "Entendi. Neste caso, precisarei fazer uma visita técnica. Posso passar no setor hoje às 15h. Está bom para você?",
      },
    ],
  }

  const [novaMensagem, setNovaMensagem] = useState("")

  const getStatusColor = (status:string) => {
    switch (status) {
      case "aberto":
        return "bg-blue-100 text-blue-800"
      case "em andamento":
        return "bg-yellow-100 text-yellow-800"
      case "concluído":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadeColor = (prioridade:string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "média":
        return "bg-orange-100 text-orange-800"
      case "baixa":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    if (novaMensagem.trim() === "") return

    // Aqui seria implementada a lógica para enviar a mensagem
    console.log("Nova mensagem:", novaMensagem)
    setNovaMensagem("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <h1 className="text-xl font-bold">No-Level</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium">
              Início
            </Link>
            <Link href="/chamados" className="font-medium">
              Meus Chamados
            </Link>
            <Link href="/sobre" className="font-medium">
              Sobre
            </Link>
          </nav>
          <div>
            <span className="text-sm mr-2">Olá, João</span>
            <Button variant="outline" size="sm">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/chamados" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para chamados
          </Link>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{chamado.titulo}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{chamado.departamento}</Badge>
                    <Badge className={getPrioridadeColor(chamado.prioridade)}>
                      Prioridade: {chamado.prioridade.charAt(0).toUpperCase() + chamado.prioridade.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(chamado.status)}>
                      {chamado.status.charAt(0).toUpperCase() + chamado.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Encontrar o elemento do chatbot e simular um clique
                      const chatbotButton = document.querySelector(".fixed.bottom-6.right-6") as HTMLButtonElement
                      if (chatbotButton) chatbotButton.click()
                    }}
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Falar com Hevelyn
                  </Button>
                  <Button variant="outline" size="sm">
                    Alterar Status
                  </Button>
                  {chamado.status !== "concluído" && (
                    <Button variant="outline" size="sm">
                      Encerrar
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 mb-4">
                Aberto em: {new Date(chamado.data).toLocaleDateString("pt-BR")} às{" "}
                {new Date(chamado.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Mensagens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {chamado.mensagens.map((mensagem) => (
                  <div key={mensagem.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={mensagem.usuario.avatar || "/placeholder.svg"} alt={mensagem.usuario.nome} />
                      <AvatarFallback>{mensagem.usuario.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{mensagem.usuario.nome}</span>
                        <Badge variant="outline" className="text-xs">
                          {mensagem.usuario.departamento}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(mensagem.data).toLocaleDateString("pt-BR")} às{" "}
                          {new Date(mensagem.data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm">{mensagem.conteudo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <Button type="button" variant="outline" size="sm" className="flex items-center">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Anexar Arquivo
                  </Button>
                  <Button type="submit" className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar
                  </Button>
                </div>
              </form>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 px-4 mt-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <MessageSquare className="h-5 w-5" />
              <span className="font-bold">No-Level</span>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} No-Level. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot component */}
      <Chatbot />
    </div>
  )
}
