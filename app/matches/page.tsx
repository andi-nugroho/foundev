"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Users, ExternalLink, Send } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "../../components/navbar"

interface Profile {
  id: number
  name: string
  role: string
  bio: string
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Profile[]>([])

  useEffect(() => {
    const storedMatches = JSON.parse(localStorage.getItem("buidlmatch-matches") || "[]")
    setMatches(storedMatches)
  }, [])

  const getRoleColor = (role: string) => {
    switch (role) {
      case "founder":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "developer":
        return "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
      case "designer":
        return "bg-gradient-to-r from-green-500 to-teal-500 text-white"
      default:
        return "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
    }
  }

  const handleStartChat = (platform: "telegram" | "twitter", name: string) => {
    const message = encodeURIComponent(
      `Hi ${name}! We matched on BuidlMatch. I'd love to discuss potential collaboration opportunities. Let's build something amazing together! 🚀`,
    )

    if (platform === "telegram") {
      // For demo purposes, we'll show an alert. In production, you'd integrate with Telegram's deep linking
      alert(`Opening Telegram to message ${name}...

In production, this would open:
t.me/share/url?url=https://buidlmatch.com&text=${message}`)
    } else {
      // Twitter/X direct message or tweet
      const twitterUrl = `https://twitter.com/intent/tweet?text=${message}`
      window.open(twitterUrl, "_blank")
    }
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="p-6 pt-24">
          <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link href="/match">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Your Matches</h1>
          </motion.div>

          {/* Empty State */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-12 glass-card rounded-3xl text-center hover-lift">
              <div className="w-24 h-24 bg-cyan-400/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <Users className="h-12 w-12 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">No matches yet</h2>
              <p className="text-slate-300 mb-8 max-w-md mx-auto leading-relaxed">
                Start swiping to find builders who share your vision and passion for Web3. Your perfect co-founder is
                waiting!
              </p>
              <Link href="/match">
                <Button className="btn-primary text-slate-900 font-semibold px-8 py-4 text-lg rounded-2xl hover-lift">
                  Start Matching
                </Button>
              </Link>
            </Card>
          </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="p-6 pt-24">
        <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/match">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Your Matches</h1>
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold">
            {matches.length}
          </span>
        </motion.div>

        {/* Matches List */}
        <div className="space-y-6">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="p-8 glass-card rounded-3xl hover-lift hover-glow group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">{match.name}</h3>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getRoleColor(match.role)}`}
                      >
                        {match.role}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">{match.bio}</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-slate-700/50">
                  <Button
                    onClick={() => handleStartChat("telegram", match.name)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-3 font-semibold hover-lift"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Telegram
                  </Button>
                  <Button
                    onClick={() => handleStartChat("twitter", match.name)}
                    className="flex-1 bg-black hover:bg-gray-900 text-white rounded-2xl py-3 font-semibold hover-lift"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 rounded-2xl bg-transparent hover-lift"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Matching */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="mt-8 p-8 glass-card rounded-3xl text-center hover-lift">
            <h3 className="text-2xl font-bold text-white mb-3">Keep discovering builders</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Continue swiping to find more potential co-founders and collaborators in the Web3 space.
            </p>
            <Link href="/match">
              <Button className="btn-primary text-slate-900 font-semibold px-8 py-3 text-lg rounded-2xl hover-lift">
                Continue Matching
              </Button>
            </Link>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
