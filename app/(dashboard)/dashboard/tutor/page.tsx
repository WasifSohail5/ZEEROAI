"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Sparkles, BookOpen, Calculator, FlaskConical } from "lucide-react"

const suggestedTopics = [
  { icon: Calculator, label: "Explain derivatives", topic: "mathematics" },
  { icon: FlaskConical, label: "How do atoms bond?", topic: "chemistry" },
  { icon: BookOpen, label: "Summarize WWII", topic: "history" },
]

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI learning assistant. I can help you understand any topic, solve problems, or explain complex concepts. What would you like to learn today?",
    timestamp: new Date(),
  },
]

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateResponse(input),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsLoading(false)
  }

  function generateResponse(query: string): string {
    const responses: Record<string, string> = {
      default: `That's a great question! Let me explain:\n\n${query} is a fascinating topic. Here's what you need to know:\n\n1. **Key Concept**: This involves understanding the fundamental principles behind the subject.\n\n2. **How it Works**: The mechanism relies on several interconnected factors that work together.\n\n3. **Practical Application**: You can apply this knowledge in real-world scenarios.\n\nWould you like me to dive deeper into any specific aspect, or shall I provide some practice problems?`,
    }
    return responses.default
  }

  function handleSuggestedTopic(topic: string) {
    setInput(topic)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">AI Tutor</h1>
        <p className="mt-1 text-muted-foreground">
          Ask anything and get instant, personalized explanations
        </p>
      </div>

      {/* Chat Container */}
      <Card className="flex flex-1 flex-col border-border/50 bg-card/50">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    className={
                      message.role === "assistant"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Topics */}
        {messages.length === 1 && (
          <div className="border-t border-border px-4 py-3">
            <p className="mb-2 text-xs text-muted-foreground">Suggested topics:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic) => (
                <Button
                  key={topic.label}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  onClick={() => handleSuggestedTopic(topic.label)}
                >
                  <topic.icon className="h-4 w-4" />
                  {topic.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <CardContent className="border-t border-border p-4">
          <form onSubmit={handleSend} className="mx-auto flex max-w-3xl gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-input"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
