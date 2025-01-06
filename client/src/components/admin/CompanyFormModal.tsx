import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Company, NewCompany } from '@/types/company'

interface CompanyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (company: NewCompany) => void;
  initialData?: Company;
}

export function CompanyFormModal({ isOpen, onClose, onSubmit, initialData }: CompanyFormModalProps) {
  const [company, setCompany] = useState<NewCompany>({
    name: '',
    address: '',
    industry: '',
    employees: 0,
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3KRLQ-4_EdCiWdQ5WVmZBhS4HCHiTxV71A&s',
    des: '',
  })

  useEffect(() => {
    if (initialData) {
      setCompany(initialData)
    } else {
      setCompany({
        name: '',
        address: '',
        industry: '',
        employees: 0,
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl3KRLQ-4_EdCiWdQ5WVmZBhS4HCHiTxV71A&s',
        des: '',
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(company)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Company' : 'Add New Company'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={company.industry}
                onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                value={company.employees}
                onChange={(e) => setCompany({ ...company, employees: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={company.logo}
                onChange={(e) => setCompany({ ...company, logo: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="des">Description</Label>
              <Textarea
                id="des"
                value={company.des}
                onChange={(e) => setCompany({ ...company, des: e.target.value })}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Add'} Company
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

