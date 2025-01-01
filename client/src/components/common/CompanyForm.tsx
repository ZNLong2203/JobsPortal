import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CompanyFormProps {
  initialData?: {
    name: string;
    industry: string;
    employees: string;
  };
  onSubmit: (data: { name: string; industry: string; employees: string }) => void;
  submitLabel: string;
}

export function CompanyForm({ initialData, onSubmit, submitLabel }: CompanyFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      industry: formData.get('industry') as string,
      employees: formData.get('employees') as string,
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={initialData?.name}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              defaultValue={initialData?.industry}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employees">Number of Employees</Label>
            <Input
              id="employees"
              name="employees"
              type="number"
              defaultValue={initialData?.employees}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">{submitLabel}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

