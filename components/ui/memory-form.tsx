"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { motion } from "framer-motion"
import { Loader2, ImagePlus, Calendar, MapPin, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function MemoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione uma imagem nos formatos: JPG, PNG, WEBP ou GIF.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!preview) {
      toast({
        title: "Imagem obrigatória",
        description: "Por favor, adicione uma imagem para sua memória.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset do formulário
      const form = e.target as HTMLFormElement
      form.reset()
      setPreview(null)

      toast({
        title: "Memória adicionada!",
        description: "Sua memória foi adicionada com sucesso ao nosso memorial.",
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar sua memória. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-md mx-auto"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="title" className="text-gray-300">
          Título da Memória
        </Label>
        <Input
          id="title"
          placeholder="Ex: Nosso primeiro encontro"
          required
          className="bg-gray-900 border-gray-800"
          maxLength={50}
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-1 text-gray-300">
            <Calendar className="h-4 w-4" />
            <span>Data</span>
          </Label>
          <Input id="date" type="date" required className="bg-gray-900 border-gray-800" />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-1 text-gray-300">
            <MapPin className="h-4 w-4" />
            <span>Local</span>
          </Label>
          <Input
            id="location"
            placeholder="Ex: Restaurante"
            required
            className="bg-gray-900 border-gray-800"
            maxLength={30}
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="description" className="text-gray-300">
          Descrição
        </Label>
        <Textarea
          id="description"
          placeholder="Conte um pouco sobre esse momento especial..."
          className="min-h-[100px] bg-gray-900 border-gray-800"
          required
          maxLength={200}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="image" className="block text-gray-300">
          Imagem
        </Label>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-900/50 transition-colors">
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleImageChange}
            required={!preview}
          />
          <label htmlFor="image" className="cursor-pointer block">
            {preview ? (
              <div className="relative aspect-video mx-auto overflow-hidden rounded-md">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <ImagePlus className="h-10 w-10 text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Clique para adicionar uma imagem</p>
                <p className="text-xs text-gray-600 mt-1">JPG, PNG, WEBP ou GIF (máx. 5MB)</p>
              </div>
            )}
          </label>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button type="submit" className="w-full bg-wedding-purple hover:bg-wedding-purple/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Adicionar Memória
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}

