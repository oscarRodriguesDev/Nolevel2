"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, MessageSquare, Users, Clock, Bot } from "lucide-react"
import { Chatbot } from "@/components/chatbot"

export default function Home() {
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
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Aproximando pessoas, <span className="text-black">eliminando barreiras</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              O No-Level conecta todos os níveis da empresa, promovendo uma cultura de inclusão e humanização no
              ambiente de trabalho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  // Encontrar o elemento do chatbot e simular um clique
                  const chatbotButton = document.querySelector("[data-chatbot-trigger]") as HTMLButtonElement
                  if (chatbotButton) chatbotButton.click()
                }}
              >
                Falar com a Hevelyn
                <Bot className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/chamados">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver Meus Chamados
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Bot className="h-10 w-10 mb-2" />
                  <CardTitle>Converse com a Hevelyn</CardTitle>
                  <CardDescription>Nossa assistente virtual inteligente</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Registre seus chamados de forma simples e conversacional com a Hevelyn, nossa assistente virtual que
                    entende suas necessidades.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 mb-2" />
                  <CardTitle>Acompanhamento direto</CardTitle>
                  <CardDescription>Comunique-se diretamente com o setor responsável</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sem intermediários, você conversa diretamente com quem vai resolver sua solicitação, agilizando o
                    processo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 mb-2" />
                  <CardTitle>Resolução rápida</CardTitle>
                  <CardDescription>Acompanhe o status e receba atualizações em tempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receba notificações sobre o andamento do seu chamado e avalie o atendimento após a conclusão.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Uma empresa mais humana e conectada</h2>
                <p className="text-gray-600 mb-6">
                  O No-Level foi criado para eliminar barreiras hierárquicas e aproximar todos os colaboradores,
                  independentemente de cargo ou função.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-black text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                      ✓
                    </div>
                    <span>Comunicação direta entre setores</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-black text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                      ✓
                    </div>
                    <span>Transparência no atendimento</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-black text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                      ✓
                    </div>
                    <span>Feedback contínuo para melhorias</span>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-black text-white p-1 rounded-full h-6 w-6 flex items-center justify-center text-sm">
                      ✓
                    </div>
                    <span>Valorização de todas as vozes</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <div className="relative">
                  <div className="border rounded-lg p-4 bg-white shadow-sm mb-4">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>HV</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Hevelyn</p>
                        <p className="text-xs text-gray-500">Assistente Virtual</p>
                      </div>
                    </div>
                    <p className="text-sm">Olá! Como posso ajudar você hoje?</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-black text-white shadow-sm mb-4 ml-auto max-w-[80%]">
                    <p className="text-sm">Preciso solicitar material de escritório para meu departamento.</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback>HV</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Hevelyn</p>
                        <p className="text-xs text-gray-500">Assistente Virtual</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      Para solicitação de materiais de escritório, vou registrar um chamado para o Almoxarifado. Quais
                      itens você precisa e qual é a quantidade?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-6">Conheça a Hevelyn</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Nossa assistente virtual inteligente que torna o processo de abertura de chamados mais simples e
              conversacional.
            </p>
            <div className="flex justify-center mb-10">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Hevelyn" />
                <AvatarFallback className="text-2xl">HV</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="text-xl font-bold mb-2">Intuitiva</h3>
                <p className="text-gray-600">
                  Hevelyn entende linguagem natural, permitindo que você explique seu problema como se estivesse
                  conversando com um colega.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Eficiente</h3>
                <p className="text-gray-600">
                  Direciona automaticamente seu chamado para o departamento correto, economizando tempo e reduzindo
                  erros.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Acessível</h3>
                <p className="text-gray-600">
                  Disponível 24/7 para registrar suas solicitações a qualquer momento, de qualquer lugar.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-10"
              data-chatbot-trigger
              onClick={() => {
                // Este botão será usado como trigger para abrir o chatbot
                const chatbotButton = document.querySelector(".fixed.bottom-6.right-6") as HTMLButtonElement
                if (chatbotButton) chatbotButton.click()
              }}
            >
              Conversar com a Hevelyn
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
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

// Importação do Avatar para a seção de demonstração do chatbot
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
