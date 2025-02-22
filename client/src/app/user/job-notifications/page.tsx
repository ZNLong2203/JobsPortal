"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bell, Plus, X, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export default function JobNotificationsPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [skills, setSkills] = useState<string[]>([""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddSkill = () => {
    setSkills([...skills, ""])
  }

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index)
    setSkills(newSkills)
  }

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!email || !name || skills.filter(Boolean).length === 0) {
      setError("Please fill in all fields and add at least one skill.")
      setIsSubmitting(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSuccess(true)
    } catch (err) {
      setError(`An error occurred: ${err instanceof Error ? err.message : 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Job Notification Preferences</h1>
          <p className="mt-2 text-sm text-gray-600">Customize your job alerts to receive relevant opportunities</p>
        </div>

        <Card className="bg-white shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-medium text-gray-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              Set Your Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className="mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Skills</Label>
                <AnimatePresence>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 mb-2"
                    >
                      <Input
                        placeholder="e.g. React, Python, Project Management"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveSkill(index)}
                        className="shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSkill}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Preferences"}
              </Button>
            </form>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 bg-green-50 border border-green-200 rounded-md p-4"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Bell className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Preferences Saved</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>You will now receive job notifications based on your preferences.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-xl font-medium text-gray-900">Current Preferences</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Email</h3>
                <p className="mt-1 text-sm text-gray-900">{email || "Not set"}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-700">Name</h3>
                <p className="mt-1 text-sm text-gray-900">{name || "Not set"}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(Boolean).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
