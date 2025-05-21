"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare, ArrowLeft } from "lucide-react"

export default function NovoChamadoPage() {
  const [formData, setFormData] = useState({
    titulo: "",
    departamento: "",
    descricao: "",
    prioridade: "média",
    anexos: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui seria implementada a lógica para enviar o chamado
    console.log("Dados do formulário:", formData)
    // Redirecionar para a página de chamados após o envio
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
          <div>
            <span className="text-sm mr-2">Olá, João</span>
            <Button variant="outline" size="sm">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Link href="/chamados" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para chamados
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Novo Chamado</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título do chamado</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  placeholder="Descreva brevemente o assunto"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento</Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) => handleSelectChange("departamento", value)}
                  required
                >
                  <SelectTrigger id="departamento">
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ti">TI</SelectItem>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="almoxarifado">Almoxarifado</SelectItem>
                    <SelectItem value="administrativo">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição detalhada</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  placeholder="Descreva detalhadamente sua solicitação ou problema"
                  rows={5}
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Prioridade</Label>
                <RadioGroup
                  value={formData.prioridade}
                  onValueChange={(value) => handleSelectChange("prioridade", value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="baixa" id="baixa" />
                    <Label htmlFor="baixa" className="cursor-pointer">
                      Baixa
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="média" id="media" />
                    <Label htmlFor="media" className="cursor-pointer">
                      Média
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alta" id="alta" />
                    <Label htmlFor="alta" className="cursor-pointer">
                      Alta
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anexos">Anexos (opcional)</Label>
                <Input id="anexos" type="file" multiple className="cursor-pointer" />
                <p className="text-xs text-gray-500">Você pode anexar até 3 arquivos (máx. 5MB cada)</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" asChild>
                <Link href="/chamados">Cancelar</Link>
              </Button>
              <Button type="submit">Enviar Chamado</Button>
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
