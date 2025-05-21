"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Plus, Filter, Bot } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export default function ChamadosPage() {
  // Dados de exemplo para chamados
  const chamados = [
    {
      id: 1,
      titulo: "Problema com impressora do setor",
      departamento: "TI",
      status: "aberto",
      data: "2023-05-20",
      prioridade: "média",
      mensagens: 3,
    },
    {
      id: 2,
      titulo: "Solicitação de material de escritório",
      departamento: "Almoxarifado",
      status: "em andamento",
      data: "2023-05-18",
      prioridade: "baixa",
      mensagens: 2,
    },
    {
      id: 3,
      titulo: "Manutenção no ar-condicionado",
      departamento: "Manutenção",
      status: "concluído",
      data: "2023-05-15",
      prioridade: "alta",
      mensagens: 5,
    },
    {
      id: 4,
      titulo: "Dúvida sobre benefícios",
      departamento: "RH",
      status: "aberto",
      data: "2023-05-19",
      prioridade: "média",
      mensagens: 1,
    },
  ]

  const getStatusColor = (status) => {
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

  const getPrioridadeColor = (prioridade) => {
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

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Chamados</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                // Encontrar o elemento do chatbot e simular um clique
                const chatbotButton = document.querySelector(".fixed.bottom-6.right-6") as HTMLButtonElement
                if (chatbotButton) chatbotButton.click()
              }}
            >
              <Bot className="mr-2 h-4 w-4" />
              Falar com Hevelyn
            </Button>
            <Link href="/chamados/novo">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Chamado
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <input type="text" placeholder="Buscar chamados..." className="pl-10 pr-4 py-2 border rounded-md w-full" />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        <Tabs defaultValue="todos" className="mb-6">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="abertos">Abertos</TabsTrigger>
            <TabsTrigger value="andamento">Em Andamento</TabsTrigger>
            <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
          </TabsList>
          <TabsContent value="todos">
            <div className="grid gap-4">
              {chamados.map((chamado) => (
                <Card key={chamado.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{chamado.titulo}</CardTitle>
                      <Badge className={getStatusColor(chamado.status)}>
                        {chamado.status.charAt(0).toUpperCase() + chamado.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{chamado.departamento}</Badge>
                      <Badge className={getPrioridadeColor(chamado.prioridade)}>
                        {chamado.prioridade.charAt(0).toUpperCase() + chamado.prioridade.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Aberto em: {new Date(chamado.data).toLocaleDateString("pt-BR")}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {chamado.mensagens} mensagens
                    </div>
                    <Link href={`/chamados/${chamado.id}`}>
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="abertos">
            <div className="grid gap-4">
              {chamados
                .filter((c) => c.status === "aberto")
                .map((chamado) => (
                  <Card key={chamado.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{chamado.titulo}</CardTitle>
                        <Badge className={getStatusColor(chamado.status)}>
                          {chamado.status.charAt(0).toUpperCase() + chamado.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{chamado.departamento}</Badge>
                        <Badge className={getPrioridadeColor(chamado.prioridade)}>
                          {chamado.prioridade.charAt(0).toUpperCase() + chamado.prioridade.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Aberto em: {new Date(chamado.data).toLocaleDateString("pt-BR")}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {chamado.mensagens} mensagens
                      </div>
                      <Link href={`/chamados/${chamado.id}`}>
                        <Button variant="outline" size="sm">
                          Ver detalhes
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="andamento">
            <div className="grid gap-4">
              {chamados
                .filter((c) => c.status === "em andamento")
                .map((chamado) => (
                  <Card key={chamado.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{chamado.titulo}</CardTitle>
                        <Badge className={getStatusColor(chamado.status)}>
                          {chamado.status.charAt(0).toUpperCase() + chamado.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{chamado.departamento}</Badge>
                        <Badge className={getPrioridadeColor(chamado.prioridade)}>
                          {chamado.prioridade.charAt(0).toUpperCase() + chamado.prioridade.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Aberto em: {new Date(chamado.data).toLocaleDateString("pt-BR")}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {chamado.mensagens} mensagens
                      </div>
                      <Link href={`/chamados/${chamado.id}`}>
                        <Button variant="outline" size="sm">
                          Ver detalhes
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="concluidos">
            <div className="grid gap-4">
              {chamados
                .filter((c) => c.status === "concluído")
                .map((chamado) => (
                  <Card key={chamado.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{chamado.titulo}</CardTitle>
                        <Badge className={getStatusColor(chamado.status)}>
                          {chamado.status.charAt(0).toUpperCase() + chamado.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">{chamado.departamento}</Badge>
                        <Badge className={getPrioridadeColor(chamado.prioridade)}>
                          {chamado.prioridade.charAt(0).toUpperCase() + chamado.prioridade.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Aberto em: {new Date(chamado.data).toLocaleDateString("pt-BR")}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {chamado.mensagens} mensagens
                      </div>
                      <Link href={`/chamados/${chamado.id}`}>
                        <Button variant="outline" size="sm">
                          Ver detalhes
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-6 px-4">
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
