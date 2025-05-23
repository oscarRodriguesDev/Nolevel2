"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Send, X, Minimize2, Maximize2, Bot } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

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
 
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sessionId, setSessionId] = useState<string>("")

  // Inicializa o ID da sessão quando o componente é montado
  useEffect(() => {
    // Verifica se já existe um ID de sessão no localStorage
    const existingSessionId = localStorage.getItem("chatSessionId")
    if (existingSessionId) {
      setSessionId(existingSessionId)
    } else {
      // Cria um novo ID de sessão
      const newSessionId = uuidv4()
      localStorage.setItem("chatSessionId", newSessionId)
      setSessionId(newSessionId)
    }
  }, [])

  // Função para enviar mensagem para a API
  const sendMessageToAPI = async (userMessage: string) => {
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Falha na comunicação com o servidor")
      }

      const data = await response.json()

      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: data.response,
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: "Desculpe, tive um problema ao processar sua mensagem. Poderia tentar novamente?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
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

    // Envia a mensagem para a API
    sendMessageToAPI(input)

    // Limpa o campo de entrada
    setInput("")
 
  }

  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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
                    onFocus={e => e.target.focus()}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button type="submit" size="icon" className="h-10 w-10" disabled={isTyping}>
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
