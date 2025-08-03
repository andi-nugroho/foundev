"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Filter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { FilterOptions } from "../app/types/profile"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

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

export function FilterPanel({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) {
  const handleRoleToggle = (role: string) => {
    const newRoles = filters.roles.includes(role) ? filters.roles.filter((r) => r !== role) : [...filters.roles, role]
    onFiltersChange({ ...filters, roles: newRoles })
  }

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill]
    onFiltersChange({ ...filters, skills: newSkills })
  }

  const handleExperienceToggle = (exp: string) => {
    const newExperience = filters.experience.includes(exp)
      ? filters.experience.filter((e) => e !== exp)
      : [...filters.experience, exp]
    onFiltersChange({ ...filters, experience: newExperience })
  }

  const handleAvailabilityToggle = (avail: string) => {
    const newAvailability = filters.availability.includes(avail)
      ? filters.availability.filter((a) => a !== avail)
      : [...filters.availability, avail]
    onFiltersChange({ ...filters, availability: newAvailability })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      roles: [],
      skills: [],
      experience: [],
      location: "",
      availability: [],
    })
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50"
          >
            <Card className="h-full glass-card rounded-l-3xl rounded-r-none border-r-0 overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Filter className="h-6 w-6 text-cyan-400" />
                    <h2 className="text-2xl font-bold text-white">Filters</h2>
                    {getActiveFilterCount() > 0 && (
                      <span className="bg-cyan-400 text-slate-900 px-2 py-1 rounded-full text-sm font-bold">
                        {getActiveFilterCount()}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-slate-300 hover:text-white hover:bg-white/10 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Clear All */}
                {getActiveFilterCount() > 0 && (
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="w-full mb-6 border-slate-600 text-slate-300 hover:bg-slate-700 rounded-2xl bg-transparent"
                  >
                    Clear All Filters
                  </Button>
                )}

                {/* Roles */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Roles</h3>
                  <div className="space-y-2">
                    {["founder", "developer", "designer", "product-manager", "marketing"].map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleToggle(role)}
                        className={`w-full p-3 rounded-xl text-left font-medium transition-all capitalize ${
                          filters.roles.includes(role)
                            ? "bg-cyan-400 text-slate-900"
                            : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-600"
                        }`}
                      >
                        {role.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Experience Level</h3>
                  <div className="space-y-2">
                    {[
                      { value: "beginner", label: "Beginner (0-1 years)" },
                      { value: "intermediate", label: "Intermediate (2-4 years)" },
                      { value: "senior", label: "Senior (5+ years)" },
                      { value: "expert", label: "Expert (10+ years)" },
                    ].map((exp) => (
                      <button
                        key={exp.value}
                        onClick={() => handleExperienceToggle(exp.value)}
                        className={`w-full p-3 rounded-xl text-left font-medium transition-all ${
                          filters.experience.includes(exp.value)
                            ? "bg-cyan-400 text-slate-900"
                            : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-600"
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
                  <div className="space-y-2">
                    {["full-time", "part-time", "weekends", "flexible"].map((avail) => (
                      <button
                        key={avail}
                        onClick={() => handleAvailabilityToggle(avail)}
                        className={`w-full p-3 rounded-xl text-left font-medium transition-all capitalize ${
                          filters.availability.includes(avail)
                            ? "bg-cyan-400 text-slate-900"
                            : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-600"
                        }`}
                      >
                        {avail.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`p-2 rounded-xl text-sm font-medium transition-all ${
                          filters.skills.includes(skill)
                            ? "bg-cyan-400 text-slate-900"
                            : "bg-slate-800/50 text-slate-300 hover:bg-slate-700 border border-slate-600"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
