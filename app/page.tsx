"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Users, Zap, Shield, Star, Rocket, Wallet, Filter, Globe } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Modern Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-16 md:py-20 pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 md:mb-8">
              {/* <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full"></div>
              </div> */}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Ready to find your co-builder?
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join over 1,200 builders already creating the future of Web3. Connect your wallet and start matching today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/create-profile" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto btn-primary text-slate-900 font-semibold px-8 py-4 text-lg rounded-full hover-lift flex items-center justify-center gap-2"
              >
                <Wallet className="h-5 w-5" />
                Connect Wallet & Start
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/match" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-4 text-lg rounded-full bg-transparent hover-lift flex items-center justify-center gap-2"
              >
                <Users className="h-5 w-5" />
                Explore Builders
              </Button>
            </Link>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">1,200+</div>
              <div className="text-sm md:text-base text-slate-400">Active Builders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">350+</div>
              <div className="text-sm md:text-base text-slate-400">Successful Matches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">120+</div>
              <div className="text-sm md:text-base text-slate-400">Projects Launched</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">50+</div>
              <div className="text-sm md:text-base text-slate-400">Countries</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features */}
      <section id="features" className="px-4 md:px-6 py-12 md:py-16 mt-6 md:mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Advanced Matching Features</h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              Powered by intelligent algorithms and comprehensive profile data for perfect matches.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Users,
                title: "Detailed Profiles",
                description:
                  "Comprehensive profiles with skills, experience, location, timezone, and project preferences for better matching.",
                delay: 0.1,
              },
              {
                icon: Filter,
                title: "Smart Filtering",
                description:
                  "Advanced filters by role, skills, experience level, location, and availability to find your perfect match.",
                delay: 0.2,
              },
              {
                icon: Globe,
                title: "Global Network",
                description:
                  "Connect with builders worldwide with timezone-aware matching and location-based preferences.",
                delay: 0.3,
              },
              {
                icon: Zap,
                title: "Instant Matching",
                description:
                  "Lightning-fast swipe interface with real-time matching and immediate connection capabilities.",
                delay: 0.4,
              },
              {
                icon: Shield,
                title: "Web3 Native",
                description:
                  "Wallet-based authentication, on-chain reputation, and decentralized identity integration.",
                delay: 0.5,
              },
              {
                icon: Rocket,
                title: "Project Focused",
                description: "Match based on specific project types, from DeFi to NFTs, gaming to infrastructure.",
                delay: 0.6,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.6 }}
              >
                <Card className="p-8 glass-card rounded-3xl hover-lift hover-glow group">
                  <div className="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-cyan-400/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 md:px-6 py-12 md:py-16 mt-6 md:mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">How It Works</h2>
            <p className="text-lg md:text-xl text-slate-300">Simple, fast, and effective matching process</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Connect Wallet",
                description: "Connect your Web3 wallet and create your detailed builder profile",
              },
              {
                step: "02",
                title: "Set Preferences",
                description: "Choose your skills, project types, and what you're looking for in a co-founder",
              },
              {
                step: "03",
                title: "Smart Matching",
                description: "Our algorithm shows you the most compatible builders based on your criteria",
              },
              {
                step: "04",
                title: "Connect & Build",
                description: "Match, connect via Telegram/Twitter, and start building the future together",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-900 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-4 md:px-6 py-12 md:py-16 mt-6 md:mt-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Trusted by Top Builders</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                quote:
                  "The detailed profiles and skill matching helped me find the perfect technical co-founder. We launched our DeFi protocol in just 3 months!",
                author: "Sarah Chen",
                role: "Founder @ ZKFinance",
                skills: "Product Strategy, Tokenomics",
              },
              {
                quote:
                  "Foundev's filtering system is incredible. I found 3 amazing founders working on privacy tech, exactly what I was looking for.",
                author: "Alex Rodriguez",
                role: "Senior Blockchain Developer",
                skills: "Solidity, ZK Proofs, Rust",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="p-8 glass-card rounded-3xl hover-lift">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-slate-400">{testimonial.role}</div>
                    <div className="text-cyan-400 text-sm mt-1">{testimonial.skills}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-12 md:py-16 mt-6 md:mt-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-12 text-center pulse-glow"
          >
            <Rocket className="h-12 w-12 md:h-16 md:w-16 text-cyan-400 mx-auto mb-4 md:mb-6 float" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">Ready to find your co-builder?</h2>
            <p className="text-lg md:text-xl text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join over 1,200 builders already creating the future of Web3. Connect your wallet and start matching
              today.
            </p>
            <Link href="/create-profile">
              <Button
                size="lg"
                className="w-full sm:w-auto btn-primary text-slate-900 font-semibold px-8 md:px-12 py-3 md:py-4 text-base md:text-lg rounded-full hover-lift flex items-center justify-center gap-2 mx-auto"
              >
                <Wallet className="h-5 w-5" />
                Connect Wallet & Start
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-8 md:py-12 mt-6 md:mt-8 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Foundev
              </div>
              <p className="text-slate-400">Connecting the future of Web3, one match at a time.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-slate-400">
                <div>Features</div>
                <div>How it Works</div>
                <div>Pricing</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-slate-400">
                <div>Discord</div>
                <div>Twitter</div>
                <div>Telegram</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-slate-400">
                <div>Help Center</div>
                <div>Contact</div>
                <div>Status</div>
              </div>
            </div>
          </div>
          <div className="text-center text-slate-400 pt-8 border-t border-slate-700">
            <p>&copy; 2025 Foundev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
