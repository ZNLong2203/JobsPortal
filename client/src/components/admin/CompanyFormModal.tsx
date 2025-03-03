"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { Company, NewCompany } from "@/types/company"
import { Upload, Building, MapPin, Briefcase, Users, FileText } from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"
import { uploadCompanyImage } from "@/redux/api/fileApi"

const DEFAULT_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3KRLQ-4_EdCiWdQ5WVmZBhS4HCHiTxV71A&s"

interface CompanyFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (company: NewCompany) => void
  initialData?: Company
}

export function CompanyFormModal({ isOpen, onClose, onSubmit, initialData }: CompanyFormModalProps) {
  const [company, setCompany] = useState<NewCompany>({
    name: "",
    address: "",
    industry: "",
    employees: 0,
    logo: DEFAULT_LOGO,
    des: "",
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(company.logo || DEFAULT_LOGO)

  useEffect(() => {
    if (initialData) {
      setCompany(initialData)
      setPreviewUrl(initialData.logo || DEFAULT_LOGO)
    } else {
      setCompany({
        name: "",
        address: "",
        industry: "",
        employees: 0,
        logo: DEFAULT_LOGO,
        des: "",
      })
      setPreviewUrl(DEFAULT_LOGO)
    }
  }, [initialData])

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB")
        return
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file")
        return
      }
      setLogoFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setCompany({ ...company, logo: "" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (logoFile) {
      const formData = new FormData()
      formData.append("file", logoFile)

      try {
        const uploadResponse = await uploadCompanyImage(formData)
        onSubmit({
          ...company,
          logo: uploadResponse.url,
        })
      } catch {
        toast.error("Failed to upload image")
        return
      }
    } else {
      onSubmit(company)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Company" : "Add New Company"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <Building className="h-4 w-4" />
                  Company Name
                </Label>
                <Input
                  id="name"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={company.address}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="industry" className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4" />
                  Industry
                </Label>
                <Input
                  id="industry"
                  value={company.industry}
                  onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="employees" className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  Number of Employees
                </Label>
                <Input
                  id="employees"
                  type="number"
                  value={company.employees}
                  onChange={(e) => setCompany({ ...company, employees: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="logo" className="flex items-center gap-2 mb-2">
                  <Upload className="h-4 w-4" />
                  Company Logo
                </Label>
                <div className="mt-2 flex flex-col items-center gap-4">
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="Company logo preview"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex items-center gap-2">
                    <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("logo")?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    {logoFile && <p className="text-sm text-muted-foreground">{logoFile.name}</p>}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="des" className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4" />
                  Description
                </Label>
                <Textarea
                  id="des"
                  value={company.des}
                  onChange={(e) => setCompany({ ...company, des: e.target.value })}
                  required
                  className="h-[120px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Add"} Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

