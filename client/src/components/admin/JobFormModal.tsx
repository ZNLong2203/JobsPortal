"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { Job, NewJob } from "@/types/job"
import type { Company } from "@/types/company"
import { useCompanies } from "@/hooks/useCompanies"
import {
  HelpCircle,
  Bold,
  Italic,
  List,
  ListOrdered,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  GraduationCap,
  Tag,
  Calendar,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import moment from "moment"

interface JobFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (job: NewJob) => void
  initialData?: Job
}

export function JobFormModal({ isOpen, onClose, onSubmit, initialData }: JobFormModalProps) {
  const [job, setJob] = useState<NewJob>({
    name: "",
    company: "",
    skills: [],
    location: "",
    salary: 0,
    quantity: 0,
    level: "",
    category: "",
    type: "",
    des: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    isActive: true,
  })

  const { companies } = useCompanies()

  const resetForm = useCallback(() => {
    setJob({
      name: "",
      company: "",
      skills: [],
      location: "",
      salary: 0,
      quantity: 0,
      level: "",
      category: "",
      type: "",
      des: "",
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      isActive: true,
    })
  }, [])

  useEffect(() => {
    if (!isOpen) {
      resetForm()
    }
    if (isOpen && initialData) {
      setJob({
        ...initialData,
        startDate: moment(initialData.startDate).format("YYYY-MM-DD"),
        endDate: moment(initialData.endDate).format("YYYY-MM-DD"),
      })
    }
  }, [isOpen, initialData, resetForm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...job,
      startDate: moment(job.startDate).format("YYYY-MM-DD"),
      endDate: moment(job.endDate).format("YYYY-MM-DD"),
    })
  }

  const insertTextAtCursor = (text: string) => {
    const textarea = document.getElementById("des") as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentValue = textarea.value
    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end)
    setJob({ ...job, des: newValue })
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const JOB_TYPES = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    REMOTE: "Remote",
    INTERNSHIP: "Internship",
    CONTRACT: "Contract",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Job" : "Add New Job"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 text-sm mb-1">
                <Briefcase className="h-3 w-3" />
                Job Title
              </Label>
              <Input
                id="name"
                value={job.name}
                onChange={(e) => setJob({ ...job, name: e.target.value })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="company" className="flex items-center gap-2 text-sm mb-1">
                <Briefcase className="h-3 w-3" />
                Company
              </Label>
              <Select value={job.company.toString()} onValueChange={(value) => setJob({ ...job, company: value })}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {(Array.isArray(companies) ? companies : companies.companies).map((company: Company) => (
                    <SelectItem key={company._id} value={company._id ?? ""}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="skills" className="flex items-center gap-2 text-sm mb-1">
                <Tag className="h-3 w-3" />
                Skills
              </Label>
              <Input
                id="skills"
                value={job.skills.join(", ")}
                onChange={(e) => setJob({ ...job, skills: e.target.value.split(",").map((skill) => skill.trim()) })}
                required
                className="h-8 text-sm"
                placeholder="Comma-separated"
              />
            </div>
            <div>
              <Label htmlFor="location" className="flex items-center gap-2 text-sm mb-1">
                <MapPin className="h-3 w-3" />
                Location
              </Label>
              <Input
                id="location"
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="salary" className="flex items-center gap-2 text-sm mb-1">
                <DollarSign className="h-3 w-3" />
                Salary
              </Label>
              <Input
                id="salary"
                type="number"
                value={job.salary}
                onChange={(e) => setJob({ ...job, salary: Number(e.target.value) })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="quantity" className="flex items-center gap-2 text-sm mb-1">
                <Users className="h-3 w-3" />
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={job.quantity}
                onChange={(e) => setJob({ ...job, quantity: Number(e.target.value) })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="level" className="flex items-center gap-2 text-sm mb-1">
                <GraduationCap className="h-3 w-3" />
                Level
              </Label>
              <Input
                id="level"
                value={job.level}
                onChange={(e) => setJob({ ...job, level: e.target.value })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="category" className="flex items-center gap-2 text-sm mb-1">
                <Tag className="h-3 w-3" />
                Category
              </Label>
              <Input
                id="category"
                value={job.category}
                onChange={(e) => setJob({ ...job, category: e.target.value })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="type" className="flex items-center gap-2 text-sm mb-1">
                <Briefcase className="h-3 w-3" />
                Job Type
              </Label>
              <Select value={job.type} onValueChange={(value) => setJob({ ...job, type: value })}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select a job type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(JOB_TYPES).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate" className="flex items-center gap-2 text-sm mb-1">
                <Calendar className="h-3 w-3" />
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={moment(job.startDate).format("YYYY-MM-DD")}
                onChange={(e) => setJob({ ...job, startDate: e.target.value })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="endDate" className="flex items-center gap-2 text-sm mb-1">
                <Calendar className="h-3 w-3" />
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={moment(job.endDate).format("YYYY-MM-DD")}
                onChange={(e) => setJob({ ...job, endDate: e.target.value })}
                required
                className="h-8 text-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={job.isActive}
                onCheckedChange={(checked) => setJob({ ...job, isActive: checked })}
              />
              <Label htmlFor="isActive" className="text-sm">
                Active
              </Label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="des" className="flex items-center gap-2 text-sm">
                <HelpCircle className="h-3 w-3" />
                Job Description
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      <HelpCircle className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Format your text using the toolbar below</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="border rounded-md">
              <div className="flex items-center gap-1 p-1 border-b">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertTextAtCursor("**Bold**")}
                  className="h-6 text-xs"
                >
                  <Bold className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertTextAtCursor("*Italic*")}
                  className="h-6 text-xs"
                >
                  <Italic className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertTextAtCursor("\n• ")}
                  className="h-6 text-xs"
                >
                  <List className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertTextAtCursor("\n1. ")}
                  className="h-6 text-xs"
                >
                  <ListOrdered className="h-3 w-3" />
                </Button>
              </div>
              <Textarea
                id="des"
                value={job.des}
                onChange={(e) => setJob({ ...job, des: e.target.value })}
                required
                className="min-h-[100px] border-0 rounded-none focus-visible:ring-0 text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="h-8 text-sm">
              Cancel
            </Button>
            <Button type="submit" className="h-8 text-sm">
              {initialData ? "Update" : "Add"} Job
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

