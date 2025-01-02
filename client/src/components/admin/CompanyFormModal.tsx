import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface Company {
  id?: number;
  name: string;
  industry: string;
  employees: number;
}

interface CompanyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (company: Company) => void;
  initialData?: Company;
}

export function CompanyFormModal({ isOpen, onClose, onSubmit, initialData }: CompanyFormModalProps) {
  const [company, setCompany] = useState<Company>({
    name: '',
    industry: '',
    employees: 0,
  })

  useEffect(() => {
    if (initialData) {
      setCompany(initialData)
    } else {
      setCompany({ name: '', industry: '', employees: 0 })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(company)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
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
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{initialData ? 'Update' : 'Add'} Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

