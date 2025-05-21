"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, X, Minimize2, Maximize2, Bot } from "lucide-react"

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Eu sou a Hevelyn, sua assistente virtual. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simula respostas do chatbot
  const simulateResponse = (userMessage: string) => {
    setIsTyping(true)

    // Respostas pré-definidas baseadas em palavras-chave
    const responses = [
      {
        keywords: ["olá", "oi", "ei", "bom dia", "boa tarde", "boa noite"],
        response:
          "Olá! Como posso ajudar você hoje? Posso registrar um chamado, verificar o status de chamados existentes ou fornecer informações sobre os departamentos.",
      },
      {
        keywords: ["chamado", "problema", "solicitar", "ajuda", "suporte", "registrar"],
        response: "Entendi que você precisa registrar um chamado. Pode me contar qual é o problema ou solicitação?",
        followUp: true,
      },
      {
        keywords: ["impressora", "imprimir", "scanner", "digitalizar"],
        response:
          "Parece que você está tendo problemas com equipamentos de impressão. Vou registrar um chamado para o departamento de TI. Qual é o seu setor e a localização do equipamento?",
        followUp: true,
      },
      {
        keywords: ["internet", "rede", "wifi", "conexão", "lenta", "caindo"],
        response:
          "Problemas de conexão podem afetar sua produtividade. Vou registrar um chamado para o suporte de rede. Em qual setor você está e desde quando está enfrentando esse problema?",
        followUp: true,
      },
      {
        keywords: ["material", "escritório", "caneta", "papel", "suprimento"],
        response:
          "Para solicitação de materiais de escritório, vou registrar um chamado para o Almoxarifado. Quais itens você precisa e qual é a quantidade?",
        followUp: true,
      },
      {
        keywords: ["ar condicionado", "ar-condicionado", "temperatura", "calor", "frio"],
        response:
          "Problemas com a temperatura do ambiente serão encaminhados para a Manutenção. Qual é a sua localização e qual é o problema específico?",
        followUp: true,
      },
      {
        keywords: ["obrigado", "obrigada", "valeu", "agradeço"],
        response: "Por nada! Estou aqui para ajudar. Há mais alguma coisa em que eu possa auxiliar você hoje?",
      },
    ]

    // Verifica se alguma palavra-chave corresponde
    let foundResponse = false
    let responseText = ""

    for (const item of responses) {
      if (item.keywords.some((keyword) => userMessage.toLowerCase().includes(keyword))) {
        responseText = item.response
        foundResponse = true

        // Se for uma mensagem de follow-up para registro de chamado
        if (item.followUp) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                content:
                  "Estou registrando essas informações. Você poderia fornecer mais detalhes para que possamos atender sua solicitação da melhor forma?",
                sender: "bot",
                timestamp: new Date(),
              },
            ])
          }, 3000)
        }
        break
      }
    }

    // Resposta padrão se nenhuma palavra-chave for encontrada
    if (!foundResponse) {
      responseText =
        "Não tenho certeza se entendi completamente. Você poderia fornecer mais detalhes sobre sua solicitação? Ou, se preferir, posso criar um chamado para você falar diretamente com um atendente."
    }

    // Simula o tempo de digitação
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: responseText,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }, 1500)
  }

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (input.trim() === "") return

    // Adiciona a mensagem do usuário
    const newMessage: Message = {
      id: Date.now(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // Simula a resposta do bot
    simulateResponse(input)
  }

  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Verifica se a última mensagem contém palavras-chave de conclusão de chamado
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.sender === "user") {
      const containsCompletionKeywords = ["concluir", "finalizar", "pronto", "terminei", "acabei"].some((keyword) =>
        lastMessage.content.toLowerCase().includes(keyword),
      )

      if (containsCompletionKeywords) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              content:
                "Seu chamado foi registrado com sucesso! O número do protocolo é #" +
                Math.floor(10000 + Math.random() * 90000) +
                ". Você receberá atualizações sobre o andamento do seu chamado. Posso ajudar com mais alguma coisa?",
              sender: "bot",
              timestamp: new Date(),
            },
          ])
        }, 1500)
      }
    }
  }, [messages])

  return (
    <>
      {/* Botão flutuante para abrir o chat */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Janela do chat */}
      {isOpen && (
        <Card
          className={`fixed right-6 shadow-xl transition-all duration-300 z-50 w-80 md:w-96 ${
            isMinimized ? "bottom-6 h-14" : "bottom-6 h-[500px] max-h-[80vh]"
          }`}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Hevelyn" />
                <AvatarFallback>HV</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">Hevelyn</CardTitle>
                {!isMinimized && (
                  <Badge variant="outline" className="text-xs font-normal">
                    Assistente Virtual
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-3 overflow-y-auto flex-1 h-[calc(100%-110px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user" ? "bg-black text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-900">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 pt-0 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="h-10 w-10">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}
