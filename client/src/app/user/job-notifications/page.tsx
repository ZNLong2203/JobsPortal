"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus, X, AlertCircle, CheckCircle, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSubscribers } from "@/hooks/useSubscribers"
import toast from "react-hot-toast"
import { Subscriber } from "@/types/subscriber"

export default function JobNotificationsPage() {
  const { createSubscriber, subscribers = [], deleteSubscriber, isLoading, error } = useSubscribers()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [skills, setSkills] = useState<string[]>([""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSubscriber, setNewSubscriber] = useState<Subscriber | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (newSubscriber) {
      const timer = setTimeout(() => setNewSubscriber(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [newSubscriber])

  const handleAddSkill = () => setSkills([...skills, ""])
  const handleRemoveSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index))
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    if (!email || !name || skills.filter(Boolean).length === 0) {
      setFormError("Please fill in all fields and add at least one skill.")
      setIsSubmitting(false)
      return
    }

    try {
      const newSub = await createSubscriber({
        email,
        name,
        skills: skills.filter(Boolean),
      })
      setNewSubscriber(newSub)
      toast.success("Successfully subscribed to job notifications!")
      setEmail("")
      setName("")
      setSkills([""])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again."
      setFormError(`Failed to save preferences: ${message}`)
      toast.error(`An error occurred: ${message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteSubscriber(id)
      toast.success("Subscription deleted successfully")
    } catch {
      toast.error("Failed to delete subscription")
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Notification Center</h1>
          <p className="text-xl text-gray-600">Stay updated with opportunities tailored to your skills</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Set Your Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Skills</Label>
                  <AnimatePresence>
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 mt-2"
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
                  <Button type="button" variant="outline" size="sm" onClick={handleAddSkill} className="mt-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
                {formError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      <p className="text-sm text-red-700">{formError}</p>
                    </div>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Preferences"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="bg-white shadow-xl rounded-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Active Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                    </div>
                  ) : error ? (
                    <div className="text-center py-8 text-red-500">
                      Failed to load subscribers
                    </div>
                  ) : subscribers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No active notifications yet
                    </div>
                  ) : (
                    subscribers.map((sub: Subscriber) => (
                      <div key={sub._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{sub.name}</h3>
                          <p className="text-sm text-gray-600">{sub.email}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {sub.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(sub._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {newSubscriber && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-green-50 border-green-200 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-500 rounded-full p-2">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800">New Subscription Added!</h3>
                          <p className="text-green-600">
                            {newSubscriber.name} ({newSubscriber.email})
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newSubscriber.skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

