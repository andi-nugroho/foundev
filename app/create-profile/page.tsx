"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, Sparkles, MapPin, Clock, Github, Twitter, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "../../components/navbar"
import type { Profile } from "../types/profile"

const skillOptions = [
  "Solidity",
  "Rust",
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "React",
  "Next.js",
  "Node.js",
  "Smart Contracts",
  "DeFi",
  "NFTs",
  "ZK Proofs",
  "Layer 2",
  "Blockchain",
  "Web3",
  "UI/UX Design",
  "Product Management",
  "Marketing",
  "Business Development",
  "Tokenomics",
  "Community Building",
]

const projectTypes = [
  "DeFi Protocol",
  "NFT Marketplace",
  "Gaming",
  "Infrastructure",
  "Developer Tools",
  "Social",
  "Privacy Tech",
  "Layer 2",
  "Cross-chain",
  "DAO Tools",
  "Analytics",
  "Security",
]

export default function CreateProfile() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    skills: [] as string[],
    experience: "",
    location: "",
    timezone: "",
    github: "",
    twitter: "",
    telegram: "",
    lookingFor: [] as string[],
    projectTypes: [] as string[],
    availability: "",
  })

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleProjectTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type],
    }))
  }

  const handleLookingForToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(item)
        ? prev.lookingFor.filter((l) => l !== item)
        : [...prev.lookingFor, item],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.role && formData.bio && formData.skills.length > 0) {
      const profiles = JSON.parse(localStorage.getItem("buidlmatch-profiles") || "[]")
      const newProfile: Profile = {
        id: Date.now(),
        ...formData,
        isCurrentUser: true,
      }
      profiles.push(newProfile)
      localStorage.setItem("buidlmatch-profiles", JSON.stringify(profiles))
      localStorage.setItem("buidlmatch-current-user", JSON.stringify(newProfile))
      router.push("/match")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="p-6 pt-24">
        <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
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
          <h1 className="text-3xl font-bold text-white">Create Your Builder Profile</h1>
        </motion.div>

        {/* Profile Form */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-8 glass-card rounded-3xl hover-lift">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center">
                <User className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                  Build Your Profile
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                </h2>
                <p className="text-slate-300">The more details you provide, the better your matches will be</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Basic Information</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-white font-medium text-lg">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="role" className="text-white font-medium text-lg">
                      Primary Role *
                    </Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white">
                        <SelectValue placeholder="Select your primary role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600 rounded-2xl">
                        <SelectItem value="founder" className="text-white hover:bg-slate-700 rounded-xl">
                          Founder
                        </SelectItem>
                        <SelectItem value="developer" className="text-white hover:bg-slate-700 rounded-xl">
                          Developer
                        </SelectItem>
                        <SelectItem value="designer" className="text-white hover:bg-slate-700 rounded-xl">
                          Designer
                        </SelectItem>
                        <SelectItem value="product-manager" className="text-white hover:bg-slate-700 rounded-xl">
                          Product Manager
                        </SelectItem>
                        <SelectItem value="marketing" className="text-white hover:bg-slate-700 rounded-xl">
                          Marketing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bio" className="text-white font-medium text-lg">
                    Bio *
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself, your background, and what drives you in Web3..."
                    className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl min-h-[120px] resize-none text-white placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">
                  Skills & Expertise *
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {skillOptions.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        formData.skills.includes(skill)
                          ? "bg-cyan-400 text-slate-900"
                          : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-600"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience & Location */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">
                  Experience & Location
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="experience" className="text-white font-medium">
                      Experience Level
                    </Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => setFormData({ ...formData, experience: value })}
                    >
                      <SelectTrigger className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600 rounded-2xl">
                        <SelectItem value="beginner" className="text-white hover:bg-slate-700 rounded-xl">
                          Beginner (0-1 years)
                        </SelectItem>
                        <SelectItem value="intermediate" className="text-white hover:bg-slate-700 rounded-xl">
                          Intermediate (2-4 years)
                        </SelectItem>
                        <SelectItem value="senior" className="text-white hover:bg-slate-700 rounded-xl">
                          Senior (5+ years)
                        </SelectItem>
                        <SelectItem value="expert" className="text-white hover:bg-slate-700 rounded-xl">
                          Expert (10+ years)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="availability" className="text-white font-medium">
                      Availability
                    </Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(value) => setFormData({ ...formData, availability: value })}
                    >
                      <SelectTrigger className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600 rounded-2xl">
                        <SelectItem value="full-time" className="text-white hover:bg-slate-700 rounded-xl">
                          Full-time
                        </SelectItem>
                        <SelectItem value="part-time" className="text-white hover:bg-slate-700 rounded-xl">
                          Part-time
                        </SelectItem>
                        <SelectItem value="weekends" className="text-white hover:bg-slate-700 rounded-xl">
                          Weekends only
                        </SelectItem>
                        <SelectItem value="flexible" className="text-white hover:bg-slate-700 rounded-xl">
                          Flexible
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-white font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., San Francisco, CA"
                      className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="timezone" className="text-white font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Timezone
                    </Label>
                    <Input
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      placeholder="e.g., PST, EST, UTC+2"
                      className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Social Links</h3>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="github" className="text-white font-medium flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="github.com/username"
                      className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="twitter" className="text-white font-medium flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      placeholder="@username"
                      className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="telegram" className="text-white font-medium flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Telegram
                    </Label>
                    <Input
                      id="telegram"
                      value={formData.telegram}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      placeholder="@username"
                      className="bg-slate-800/50 border-slate-600 focus:border-cyan-400 rounded-2xl h-12 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Project Preferences */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2">Project Preferences</h3>

                <div className="space-y-4">
                  <Label className="text-white font-medium">What are you looking for?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Co-founder", "Technical Partner", "Advisor", "Team Member", "Collaborator", "Mentor"].map(
                      (item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleLookingForToggle(item)}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            formData.lookingFor.includes(item)
                              ? "bg-cyan-400 text-slate-900"
                              : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-600"
                          }`}
                        >
                          {item}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-white font-medium">Interested Project Types</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleProjectTypeToggle(type)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          formData.projectTypes.includes(type)
                            ? "bg-cyan-400 text-slate-900"
                            : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary text-slate-900 font-semibold py-4 text-lg rounded-2xl hover-lift"
                disabled={!formData.name || !formData.role || !formData.bio || formData.skills.length === 0}
              >
                Create Profile & Start Matching
              </Button>
            </form>
          </Card>
        </motion.div>

        <div className="text-center mt-8">
          <p className="text-slate-400">
            Already have a profile?{" "}
            <Link href="/match" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Start matching
            </Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  )
}
