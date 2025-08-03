"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Heart,
  ArrowLeft,
  Users,
  Sparkles,
  Filter,
  MapPin,
  Clock,
  Github,
  Twitter,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FilterPanel } from "../../components/filter-panel"
import { Navbar } from "../../components/navbar"
import type { Profile, FilterOptions } from "../types/profile"

const sampleProfiles: Profile[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "developer",
    bio: "Full-stack developer passionate about ZK proofs and privacy-preserving applications. Looking for a co-founder to build the next generation of DeFi tools on Miden. I have 5+ years of experience in blockchain development and have contributed to several open-source projects.",
    skills: ["Solidity", "Rust", "ZK Proofs", "Smart Contracts", "DeFi"],
    experience: "senior",
    location: "San Francisco, CA",
    timezone: "PST",
    github: "github.com/alexchen",
    twitter: "@alexchen_dev",
    telegram: "@alexchen",
    lookingFor: ["Co-founder", "Technical Partner"],
    projectTypes: ["DeFi Protocol", "Privacy Tech"],
    availability: "full-time",
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "founder",
    bio: "Serial entrepreneur with 2 successful exits. Currently exploring opportunities in Web3 infrastructure. Seeking technical co-founder for stealth mode project focused on cross-chain interoperability. Strong background in product strategy and business development.",
    skills: ["Product Management", "Business Development", "Tokenomics", "Marketing"],
    experience: "expert",
    location: "New York, NY",
    timezone: "EST",
    twitter: "@sarahkim_web3",
    telegram: "@sarahkim",
    lookingFor: ["Technical Partner", "Co-founder"],
    projectTypes: ["Infrastructure", "Cross-chain"],
    availability: "full-time",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "developer",
    bio: "Blockchain engineer with 5+ years experience. Specialized in smart contracts and Layer 2 solutions. Ready to build something revolutionary on Miden. Previously worked at ConsenSys and contributed to Ethereum scaling solutions.",
    skills: ["Solidity", "Layer 2", "Smart Contracts", "JavaScript", "Node.js"],
    experience: "senior",
    location: "London, UK",
    timezone: "GMT",
    github: "github.com/marcusj",
    twitter: "@marcus_blockchain",
    lookingFor: ["Co-founder", "Team Member"],
    projectTypes: ["Layer 2", "Infrastructure"],
    availability: "part-time",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "founder",
    bio: "Product leader from Google. Passionate about decentralized identity and privacy. Looking for developers who share the vision of a more private internet. Led product teams of 20+ engineers and launched products used by millions.",
    skills: ["Product Management", "UI/UX Design", "Privacy Tech", "Community Building"],
    experience: "expert",
    location: "Austin, TX",
    timezone: "CST",
    twitter: "@elena_privacy",
    telegram: "@elenarodriguez",
    lookingFor: ["Technical Partner", "Developer"],
    projectTypes: ["Privacy Tech", "Social"],
    availability: "full-time",
  },
  {
    id: 5,
    name: "David Park",
    role: "designer",
    bio: "Frontend wizard and UX enthusiast. Love creating beautiful, intuitive interfaces for complex Web3 applications. Seeking ambitious founders to collaborate with. Previously designed for Coinbase and Uniswap.",
    skills: ["UI/UX Design", "React", "TypeScript", "Next.js", "Web3"],
    experience: "senior",
    location: "Los Angeles, CA",
    timezone: "PST",
    github: "github.com/davidpark",
    twitter: "@davidpark_design",
    lookingFor: ["Co-founder", "Collaborator"],
    projectTypes: ["DeFi Protocol", "NFT Marketplace"],
    availability: "flexible",
  },
]

export default function MatchPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<Profile[]>([])
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    roles: [],
    skills: [],
    experience: [],
    location: "",
    availability: [],
  })

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem("buidlmatch-profiles") || "[]")
    const allProfiles = [...sampleProfiles, ...storedProfiles.filter((p: Profile) => !p.isCurrentUser)]
    setProfiles(allProfiles)
    setFilteredProfiles(allProfiles)

    const storedMatches = JSON.parse(localStorage.getItem("buidlmatch-matches") || "[]")
    setMatches(storedMatches)
  }, [])

  useEffect(() => {
    // Apply filters
    const filtered = profiles.filter((profile) => {
      if (filters.roles.length > 0 && !filters.roles.includes(profile.role)) return false
      if (filters.skills.length > 0 && !filters.skills.some((skill) => profile.skills.includes(skill))) return false
      if (filters.experience.length > 0 && !filters.experience.includes(profile.experience)) return false
      if (filters.availability.length > 0 && !filters.availability.includes(profile.availability)) return false
      if (filters.location && !profile.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      return true
    })

    setFilteredProfiles(filtered)
    setCurrentIndex(0)
  }, [filters, profiles])

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= filteredProfiles.length) return

    setSwipeDirection(direction)

    if (direction === "right") {
      const newMatch = filteredProfiles[currentIndex]
      const updatedMatches = [...matches, newMatch]
      setMatches(updatedMatches)
      localStorage.setItem("buidlmatch-matches", JSON.stringify(updatedMatches))
    }

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setSwipeDirection(null)
    }, 300)
  }

  const currentProfile = filteredProfiles[currentIndex]

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

  const getActiveFilterCount = () => {
    return (
      filters.roles.length +
      filters.skills.length +
      filters.experience.length +
      filters.availability.length +
      (filters.location ? 1 : 0)
    )
  }

  if (currentIndex >= filteredProfiles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-12 glass-card rounded-3xl text-center max-w-md hover-lift">
            <div className="w-20 h-20 bg-cyan-400/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Users className="h-10 w-10 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {filteredProfiles.length === 0 ? "No matches found" : "No more profiles!"}
            </h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {filteredProfiles.length === 0
                ? "Try adjusting your filters to see more builders."
                : "You've seen all profiles matching your criteria. Check back later for new builders!"}
            </p>
            <div className="flex gap-4">
              <Link href="/matches" className="flex-1">
                <Button className="w-full btn-primary text-slate-900 font-semibold rounded-2xl py-3">
                  View Matches ({matches.length})
                </Button>
              </Link>
              <Button
                onClick={() => setShowFilters(true)}
                variant="outline"
                className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 rounded-2xl bg-transparent"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="p-6 pt-24">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Find Your Match
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowFilters(true)}
              variant="ghost"
              className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full relative"
            >
              <Filter className="h-5 w-5" />
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
            <Link href="/matches">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full">
                Matches ({matches.length})
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Profile Card */}
        <div className="relative h-[700px] mb-8">
          <AnimatePresence mode="wait">
            {currentProfile && (
              <motion.div
                key={currentProfile.id}
                initial={{ scale: 0.9, opacity: 0, rotateY: 90 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotateY: 0,
                  x: swipeDirection === "left" ? -400 : swipeDirection === "right" ? 400 : 0,
                  rotate: swipeDirection === "left" ? -30 : swipeDirection === "right" ? 30 : 0,
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                <Card className="h-full p-6 glass-card rounded-3xl flex flex-col hover-lift overflow-y-auto">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentProfile.name}</h2>
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getRoleColor(currentProfile.role)}`}
                          >
                            {currentProfile.role.replace("-", " ")}
                          </span>
                          <span className="text-slate-400 text-sm">{currentProfile.experience}</span>
                        </div>

                        {/* Location & Timezone */}
                        <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                          {currentProfile.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {currentProfile.location}
                            </div>
                          )}
                          {currentProfile.timezone && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {currentProfile.timezone}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="bg-slate-800/30 rounded-2xl p-4 mb-6 border border-slate-700/50">
                      <p className="text-slate-200 leading-relaxed">{currentProfile.bio}</p>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-3">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-cyan-400/20 text-cyan-400 border-cyan-400/30 rounded-full px-3 py-1"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Looking For */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-3">Looking For</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.lookingFor.map((item) => (
                          <Badge
                            key={item}
                            className="bg-purple-400/20 text-purple-400 border-purple-400/30 rounded-full px-3 py-1"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Types */}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold mb-3">Project Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.projectTypes.map((type) => (
                          <Badge
                            key={type}
                            className="bg-green-400/20 text-green-400 border-green-400/30 rounded-full px-3 py-1"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300">Availability:</span>
                        <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30 rounded-full capitalize">
                          {currentProfile.availability.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-3 mb-6">
                      {currentProfile.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl flex items-center gap-2 bg-transparent"
                          onClick={() => window.open(`https://${currentProfile.github}`, "_blank")}
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </Button>
                      )}
                      {currentProfile.twitter && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl flex items-center gap-2 bg-transparent"
                          onClick={() =>
                            window.open(`https://twitter.com/${currentProfile.twitter?.replace("@", "")}`, "_blank")
                          }
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </Button>
                      )}
                      {currentProfile.telegram && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 rounded-xl flex items-center gap-2 bg-transparent"
                          onClick={() =>
                            window.open(`https://t.me/${currentProfile.telegram?.replace("@", "")}`, "_blank")
                          }
                        >
                          <MessageCircle className="h-4 w-4" />
                          Telegram
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-6 justify-center pt-4 border-t border-slate-700/50">
                    <Button
                      onClick={() => handleSwipe("left")}
                      size="lg"
                      variant="outline"
                      className="w-16 h-16 rounded-full border-2 border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400 bg-transparent hover-lift"
                    >
                      <X className="h-7 w-7" />
                    </Button>
                    <Button
                      onClick={() => handleSwipe("right")}
                      size="lg"
                      className="w-16 h-16 rounded-full btn-primary text-slate-900 font-semibold hover-lift"
                    >
                      <Heart className="h-7 w-7" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-400"
        >
          <p className="mb-3">
            {currentIndex + 1} of {filteredProfiles.length} profiles
            {getActiveFilterCount() > 0 && (
              <span className="text-cyan-400 ml-2">({getActiveFilterCount()} filters active)</span>
            )}
          </p>
          <div className="w-full bg-slate-700/50 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / filteredProfiles.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </div>
  )
}
