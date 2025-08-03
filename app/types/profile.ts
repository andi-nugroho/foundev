export interface Profile {
  id: number
  name: string
  role: string
  bio: string
  skills: string[]
  experience: string
  location: string
  timezone: string
  github?: string
  twitter?: string
  telegram?: string
  lookingFor: string[]
  projectTypes: string[]
  availability: string
  isCurrentUser?: boolean
}

export interface FilterOptions {
  roles: string[]
  skills: string[]
  experience: string[]
  location: string
  availability: string[]
}
