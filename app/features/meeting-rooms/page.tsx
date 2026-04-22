// src/app/features/meeting-rooms/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import {
  Users,
  Video,
  Presentation,
  MessageSquare,
  Layout,
  Share2,
  ArrowRight,
  Play,
  Monitor,
  Mic,
  Camera,
  Phone,
  Lock,
  Clock,
  Wifi,
  CheckCircle,
  Zap,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Video,
    title: 'HD Video Conferencing',
    description: 'Crystal clear video and audio for seamless communication with peers and instructors.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Presentation,
    title: 'Interactive Whiteboard',
    description: 'Collaborate in real-time with a shared digital whiteboard for drawings and annotations.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Share2,
    title: 'Screen Sharing',
    description: 'Share your screen to present work, demonstrate concepts, or troubleshoot together.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Layout,
    title: 'Breakout Rooms',
    description: 'Split into smaller groups for focused discussions and collaborative work sessions.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Send messages, share files, and communicate without interrupting the main session.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'End-to-end encryption ensures your meetings and data stay completely private.',
    color: 'from-indigo-500 to-blue-500',
  },
];

const meetingModes = [
  {
    title: 'Study Groups',
    description: 'Small group sessions for collaborative learning',
    icon: Users,
    maxParticipants: '10',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'One-on-One Tutoring',
    description: 'Private sessions with personalized attention',
    icon: Video,
    maxParticipants: '2',
    color: 'from-purple-600 to-pink-600',
  },
  {
    title: 'Live Lectures',
    description: 'Large-scale webinars and presentations',
    icon: Presentation,
    maxParticipants: '100+',
    color: 'from-orange-600 to-red-600',
  },
  {
    title: 'Team Collaboration',
    description: 'Work together on projects and assignments',
    icon: Layout,
    maxParticipants: '50',
    color: 'from-green-600 to-emerald-600',
  },
];

const controls = [
  { icon: Mic, label: 'Mute/Unmute', description: 'Control your microphone' },
  { icon: Camera, label: 'Video On/Off', description: 'Toggle camera visibility' },
  { icon: Share2, label: 'Share Screen', description: 'Present your content' },
  { icon: Users, label: 'Participants', description: 'View all attendees' },
  { icon: MessageSquare, label: 'Chat', description: 'Send messages' },
  { icon: Phone, label: 'Leave Meeting', description: 'Exit the room' },
];

const benefits = [
  { icon: Wifi, text: 'Works on low bandwidth connections' },
  { icon: Lock, text: 'End-to-end encrypted meetings' },
  { icon: Clock, text: 'No time limits on sessions' },
  { icon: Globe, text: 'Join from anywhere in the world' },
  { icon: Zap, text: 'Instant room creation' },
  { icon: CheckCircle, text: 'Free for all students' },
];

export default function MeetingRoomsFeature() {
  const [activeMode, setActiveMode] = useState(0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24 px-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-sm font-medium text-cyan-300">Virtual Meeting Rooms</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight">
                  Collaborate in <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Immersive</span> Classrooms
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
                  Connect with peers, tutors, and study groups in feature-rich virtual meeting rooms. Real-time
                  collaboration tools make remote learning feel personal and engaging.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4">
                {[
                  { label: 'Active Rooms', value: '15K+' },
                  { label: 'Daily Meetings', value: '50K+' },
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
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-cyan-500/30 transition-all hover:shadow-2xl hover:shadow-cyan-500/50 active:scale-95"
                >
                  <span>Create Room Free</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-gray-500">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 to-blue-600/20" />
              <Image
                src="/images/features/meeting-room.jpg"
                alt="Virtual Meeting Rooms"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              
              {/* Live Indicator */}
              <div className="absolute top-4 right-4 rounded-full bg-red-500 px-3 py-1.5 flex items-center gap-2 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold text-white">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Preview */}
      <section className="relative py-16 px-12 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Intuitive Meeting Controls</h3>
            <p className="text-gray-400">Everything you need at your fingertips</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {controls.map((control) => {
              const Icon = control.icon;
              return (
                <div
                  key={control.label}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 text-center hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 text-white group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-1">{control.label}</p>
                  <p className="text-xs text-gray-400">{control.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 sm:py-28 px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">Meeting Room Features</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Professional-grade tools for seamless virtual collaboration
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/15"
                >
                  {/* Gradient Background */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-10',
                      feature.color
                    )}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={cn(
                        'inline-flex rounded-xl bg-gradient-to-br p-3 text-white mb-4',
                        feature.color
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>

                    {/* Accent Line */}
                    <div
                      className={cn('h-1 w-12 mt-4 rounded-full transition-all group-hover:w-20', feature.color)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meeting Modes */}
      <section className="relative py-20 sm:py-28 px-12 bg-gradient-to-b from-white/5 to-transparent border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">Perfect for Every Scenario</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From intimate study sessions to large-scale lectures
            </p>
          </div>

          {/* Mode Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {meetingModes.map((mode, index) => {
              const Icon = mode.icon;
              const isActive = activeMode === index;

              return (
                <div
                  key={mode.title}
                  onClick={() => setActiveMode(index)}
                  className={cn(
                    'group relative rounded-2xl border transition-all cursor-pointer p-8 sm:p-10',
                    isActive
                      ? 'border-white/30 bg-gradient-to-br from-white/15 to-white/5 shadow-xl shadow-white/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  {/* Content */}
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        'rounded-lg p-3 transition-all shrink-0',
                        isActive
                          ? `bg-gradient-to-br ${mode.color} text-white`
                          : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className={cn('text-2xl font-bold mb-2', isActive ? 'text-white' : 'text-gray-300')}>
                        {mode.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{mode.description}</p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                        <Users className="h-3 w-3 text-cyan-400" />
                        <span className="text-xs font-semibold text-white">Up to {mode.maxParticipants} people</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 sm:py-28 px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-black text-white">Why Choose Our Meeting Rooms?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              The most reliable and feature-rich virtual classroom experience
            </p>
          </div>

          {/* Benefits List */}
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 sm:p-12 backdrop-blur-sm">
              <div className="grid gap-6 sm:grid-cols-2">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-4 group">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 text-white shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-base text-gray-300 group-hover:text-white transition-colors">
                        {benefit.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28 px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 p-12 sm:p-16 text-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-black text-white">Ready to Collaborate?</h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Join thousands of students and educators collaborating in our virtual classrooms every day. Create
                your first meeting room in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-cyan-600 transition-all hover:bg-gray-100 active:scale-95 shadow-xl"
                >
                  <span>Create Free Room</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10">
                  <Monitor className="h-5 w-5" />
                  <span>View Features</span>
                </button>
              </div>
              <p className="text-sm text-white/70">
                No credit card required. Unlimited meeting time for students.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}