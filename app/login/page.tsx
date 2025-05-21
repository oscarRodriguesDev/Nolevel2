"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquare } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui seria implementada a lógica de autenticação
    console.log("Dados de login:", formData)
    // Redirecionar para a página de chamados após o login
    // router.push('/chamados')
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
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Entre com seu e-mail e senha para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="senha">Senha</Label>
                  <Link href="/recuperar-senha" className="text-sm text-gray-600 hover:text-black">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="••••••••"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <div className="mt-4 text-center text-sm">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="text-black font-medium hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
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
    </div>
  )
}
