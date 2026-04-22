import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search, MessageCircle, Mail, FileText, Video, HelpCircle } from "lucide-react"
import { Suspense } from "react"
import Loading from "./loading"

export const metadata: Metadata = {
  title: "Help & Support - ZEERO AI",
  description: "Get help and support for ZEERO AI",
}

const faqs = [
  {
    question: "How do I generate a video lecture?",
    answer: "To generate a video lecture, navigate to your Dashboard and click 'Generate Lecture'. Enter your topic, provide a detailed description of what you want to learn, select the subject category, and choose your preferred duration and style. Our AI will process your request and create a personalized video lecture.",
  },
  {
    question: "How long does it take to generate a lecture?",
    answer: "Lecture generation typically takes 5-15 minutes depending on the length and complexity of the content. You'll receive a notification when your lecture is ready.",
  },
  {
    question: "Can I download my generated lectures?",
    answer: "Yes! Pro and Team plan members can download their lectures for offline viewing. Go to your lecture library, click on a lecture, and select the download option.",
  },
  {
    question: "How does the AI Tutor work?",
    answer: "Our AI Tutor is available 24/7 to answer your questions. Simply type your question or topic, and the AI will provide detailed explanations, examples, and can even generate practice problems to help you learn.",
  },
  {
    question: "What subjects does ZEERO AI support?",
    answer: "ZEERO AI supports a wide range of subjects including Computer Science, Mathematics, Physics, Chemistry, Biology, History, Literature, Economics, Psychology, and more. Our AI is continuously learning to support additional topics.",
  },
  {
    question: "How do I join a virtual meeting room?",
    answer: "You can join a meeting room by entering a meeting code on the Meetings page or by clicking 'Join' on any active meeting in your list. You can also create your own meeting room and invite others.",
  },
]

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@zeeroai.com",
    action: "Send Email",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Browse our help docs",
    action: "View Docs",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch how-to videos",
    action: "Watch Now",
  },
]

export default function HelpPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Help & Support</h1>
          <p className="mt-2 text-muted-foreground">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="h-12 bg-input pl-12 text-base"
            />
          </div>
        </div>

        {/* Support Options */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supportOptions.map((option) => (
            <Card
              key={option.title}
              className="border-border/50 bg-card/50 transition-all hover:border-primary/50"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <option.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">{option.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
                <Button variant="outline" className="mt-4 bg-transparent" size="sm">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageCircle className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Still need help?</h3>
              <p className="mt-1 text-muted-foreground">
                Our support team is available 24/7 to assist you with any questions or issues.
              </p>
            </div>
            <Button size="lg">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </Suspense>
  )
}
