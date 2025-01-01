import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface JobFormProps {
  initialData?: {
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
  };
  onSubmit: (data: { title: string; company: string; location: string; type: string; description: string }) => void;
  submitLabel: string;
}

export function JobForm({ initialData, onSubmit, submitLabel }: JobFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              defaultValue={initialData?.company}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={initialData?.location}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Job Type</Label>
            <Input
              id="type"
              name="type"
              defaultValue={initialData?.type}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
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

