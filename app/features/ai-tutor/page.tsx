// src/app/features/ai-tutor/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import {
  Brain,
  MessageSquare,
  Clock,
  BookOpen,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Play,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const capabilities = [
  {
    icon: MessageSquare,
    title: 'Instant Responses',
    description: 'Get answers to your questions in seconds, not hours. Our AI understands context and provides accurate explanations.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: BookOpen,
    title: 'Multi-Subject Expert',
    description: 'From mathematics to literature, sciences to arts - our AI tutor is trained across all academic disciplines.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Target,
    title: 'Adaptive Teaching',
    description: 'The AI adjusts its explanations based on your understanding level, ensuring concepts truly click.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Lightbulb,
    title: 'Practice Problems',
    description: 'Generate unlimited practice problems with step-by-step solutions to reinforce your learning.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Available 24/7',
    description: 'Study at midnight or dawn - your AI tutor is always ready to help whenever you need assistance.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Brain,
    title: 'Smart Learning',
    description: 'Personalized learning paths that adapt to your pace and learning style for maximum retention.',
    color: 'from-indigo-500 to-blue-500',
  },
];

const features = [
  { icon: Zap, text: 'Instant answers to any academic question' },
  { icon: CheckCircle, text: 'Personalized learning at your own pace' },
  { icon: Users, text: 'Interactive discussions and explanations' },
  { icon: TrendingUp, text: 'Track your learning progress' },
  { icon: BookOpen, text: 'Covers 100+ subjects and topics' },
  { icon: Sparkles, text: 'AI-powered personalized tutoring' },
];

const tutoringSessions = [
  {
    title: 'Quick Questions',
    description: 'Get instant answers to specific questions',
    icon: MessageSquare,
    color: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Topic Deep Dive',
    description: 'Comprehensive explanations of complex concepts',
    icon: BookOpen,
    color: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Practice Mode',
    description: 'Solve problems with guided solutions',
    icon: Target,
    color: 'from-orange-600 to-red-600',
  },
  {
    title: 'Exam Prep',
    description: 'Focused preparation for upcoming exams',
    icon: Lightbulb,
    color: 'from-yellow-600 to-orange-600',
  },
];

export default function AITutorFeature() {
  const [activeSession, setActiveSession] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 px-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-sm font-medium text-purple-300">24/7 AI Tutor</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight">
                  Your Personal <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">AI Tutor</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
                  Get instant help on any subject, anytime. Our intelligent AI tutor provides personalized explanations,
                  answers questions, and guides you through complex concepts with patience and clarity.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
                {[
                  { label: 'Active Students', value: '250K+' },
                  { label: 'Questions Answered', value: '10M+' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
                    <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/auth/sign-up"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-gray-500"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20" />
              <Image
                src="/images/features/ai-tutor.jpg"
                alt="AI Tutor"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              {/* Play Button */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:bg-white/30">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 sm:py-28 px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">AI Tutor Capabilities</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to master any subject with personalized AI assistance
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/15"
                >
                  {/* Gradient Background */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10',
                      capability.color
                    )}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={cn(
                        'inline-flex rounded-xl bg-gradient-to-br p-3 text-white mb-4',
                        capability.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{capability.title}</h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">{capability.description}</p>

                    {/* Accent Line */}
                    <div
                      className={cn('h-1 w-12 mt-4 rounded-full transition-all group-hover:w-20', capability.color)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tutoring Sessions */}
      <section className="relative py-20 sm:py-28 px-12 bg-gradient-to-b from-white/5 to-transparent border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">Tutoring Modes</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Choose the learning style that works best for you
            </p>
          </div>

          {/* Session Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {tutoringSessions.map((session, index) => {
              const Icon = session.icon;
              const isActive = activeSession === index;

              return (
                <div
                  key={session.title}
                  onClick={() => setActiveSession(index)}
                  className={cn(
                    'group relative rounded-2xl border transition-all cursor-pointer p-8 sm:p-10',
                    isActive
                      ? 'border-white/30 bg-gradient-to-br from-white/15 to-white/5 shadow-xl shadow-white/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'inline-flex rounded-lg p-3 mb-4 transition-all',
                      isActive
                        ? `bg-gradient-to-br ${session.color} text-white`
                        : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className={cn('text-2xl font-bold mb-2', isActive ? 'text-white' : 'text-gray-300')}>
                    {session.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{session.description}</p>

                  {/* Animated Border */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative py-20 sm:py-28 px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">Why Students Love Our AI Tutor</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join thousands of students improving their grades and learning faster
            </p>
          </div>

          {/* Features List */}
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 sm:p-12 backdrop-blur-sm">
              <div className="grid gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-lg text-gray-300 group-hover:text-white transition-colors">{feature.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-20 sm:py-28 px-12 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">What Students Say</h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Sarah Johnson',
                role: 'High School Student',
                content:
                  'The AI tutor helped me improve my math grades by 40% in just 3 months. It explains things in a way I finally understand!',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'College Student',
                content:
                  'Available 24/7, instant answers, and personalized help. This is exactly what every student needs for better grades.',
                rating: 5,
              },
              {
                name: 'Emma Wilson',
                role: 'Competitive Exam Taker',
                content:
                  'The practice problems and detailed explanations made exam prep so much easier. Highly recommend to anyone!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Sparkles key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{testimonial.content}"</p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 p-12 sm:p-16 text-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-black text-white">Ready to Meet Your AI Tutor?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Start learning smarter with personalized AI assistance. Free account includes unlimited questions and
                access to all subjects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-purple-600 transition-all hover:bg-gray-100 active:scale-95 shadow-xl"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10">
                  <span>Schedule Demo</span>
                </button>
              </div>
              <p className="text-sm text-white/70">No credit card required. 100% free forever plan available.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}