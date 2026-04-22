// src/app/features/video-generation/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import {
  Video,
  Wand2,
  Mic,
  Palette,
  Clock,
  Languages,
  ArrowRight,
  CheckCircle,
  Play,
  Zap,
  Brain,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import { cn } from "@/lib/utils";

const benefits = [
  {
    icon: Wand2,
    title: 'Text-to-Video AI',
    description: 'Simply type your topic and watch as AI generates complete video lectures with visuals and narration.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Multiple Styles',
    description: 'Choose from various presentation styles - academic, casual, animated, or documentary format.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Mic,
    title: 'Professional Voiceover',
    description: 'AI-generated natural voiceovers in multiple voices and tones to match your content.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Clock,
    title: 'Any Duration',
    description: 'Create lectures from 5 minutes to 2 hours. Perfect for quick explanations or deep dives.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Languages,
    title: 'Multi-language',
    description: 'Generate content in 50+ languages to reach global audiences.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Brain,
    title: 'Smart Content',
    description: 'AI researches and structures content automatically for better learning outcomes.',
    color: 'from-yellow-500 to-orange-500',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Enter Your Topic',
    description: 'Type the subject you want to learn about or teach. Add specific requirements if needed.',
    icon: Wand2,
  },
  {
    step: '02',
    title: 'AI Processing',
    description: 'Our AI analyzes your input, researches the topic, and creates a structured lecture outline.',
    icon: Brain,
  },
  {
    step: '03',
    title: 'Video Generation',
    description: 'Watch as the AI generates visuals, animations, and narration for your complete video lecture.',
    icon: Video,
  },
  {
    step: '04',
    title: 'Review & Export',
    description: 'Preview your video, make edits if needed, and export in high quality.',
    icon: CheckCircle,
  },
];

const stats = [
  { label: 'Videos Created', value: '500K+' },
  { label: 'Global Users', value: '100K+' },
  { label: 'Languages', value: '50+' },
  { label: 'Uptime', value: '99.9%' },
];

export default function VideoGenerationFeature() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main className="min-h-screen px-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative container mx-auto overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-blue-300">AI-Powered Video Generation</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight">
                  Create <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Professional Videos</span> in Minutes
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
                  Transform your ideas into captivating video lectures with AI-powered generation. No editing skills
                  needed. Just describe and create.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
                {[
                  { label: 'Videos Created', value: '500K+' },
                  { label: 'Active Users', value: '100K+' },
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
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95"
                >
                  <span>Start Creating Free</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-gray-500"
                >
                  <span>Explore Features</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20" />
              <Image
                src="/images/features/video-generation.jpg"
                alt="AI Video Generation"
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
      </section>

      {/* Stats Section */}
      <section className="border-t border-white/10 bg-white/5 backdrop-blur-sm py-12 sm:py-16">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 sm:py-28">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">Powerful Features</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to create professional video content with AI
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/15"
                >
                  {/* Gradient Background */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10',
                      benefit.color
                    )}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={cn(
                        'inline-flex rounded-xl bg-gradient-to-br p-3 text-white mb-4',
                        benefit.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>

                    {/* Accent Line */}
                    <div
                      className={cn('h-1 w-12 mt-4 rounded-full transition-all group-hover:w-20', benefit.color)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
      </section>

      {/* How It Works - Interactive */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-white/5 to-transparent border-t border-white/10">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">How It Works</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Four simple steps to create your first video
            </p>
          </div>

          {/* Steps */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeStep === index;

              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    'group relative rounded-2xl border transition-all cursor-pointer p-6 sm:p-8',
                    isActive
                      ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-xl shadow-blue-500/20'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  {/* Step Number */}
                  <div
                    className={cn(
                      'text-6xl font-black mb-4 transition-all',
                      isActive
                        ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text'
                        : 'text-white/20 group-hover:text-white/30'
                    )}
                  >
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      'inline-flex rounded-lg p-3 mb-4 transition-all',
                      isActive
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                        : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className={cn('text-xl font-bold mb-2', isActive ? 'text-white' : 'text-gray-300')}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>

                  {/* Arrow */}
                  {index < howItWorks.length - 1 && (
                    <div
                      className={cn(
                        'hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10',
                        isActive ? 'text-blue-400' : 'text-gray-600'
                      )}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-20 sm:py-28">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">Why Choose ZEERO AI?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The easiest and fastest way to create professional videos
            </p>
          </div>

          {/* Comparison Card */}
          <div className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 sm:p-12 backdrop-blur-sm">
            <div className="grid gap-6">
              {[
                { icon: Zap, text: 'Generate videos in minutes, not hours' },
                { icon: CheckCircle, text: 'No technical skills or experience needed' },
                { icon: Shield, text: 'Professional quality every single time' },
                { icon: TrendingUp, text: 'Increase engagement and reach' },
                { icon: Languages, text: 'Support for 50+ languages' },
                { icon: Users, text: 'Join 100K+ satisfied creators' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-lg text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28 border-t border-white/10">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-12 sm:p-16 text-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-black text-white">Ready to Create?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Join thousands of educators, students, and content creators using ZEERO AI to generate stunning videos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-600 transition-all hover:bg-gray-100 active:scale-95 shadow-xl"
                >
                  <span>Start Free Today</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10">
                  <span>Schedule Demo</span>
                </button>
              </div>
              <p className="text-sm text-white/70">No credit card required. Free account includes 5 videos.</p>
            </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}