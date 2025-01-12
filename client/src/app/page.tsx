import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, TrendingUp, Search, FileText, Building2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Find Your Dream Job Today</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Connect with top employers, explore exciting opportunities, and take the next step in your career journey with FindJobs.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/jobs">Explore Jobs</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/companies">View Companies</Link>
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose FindJobs?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Briefcase className="h-10 w-10 text-blue-500" />}
            title="Diverse Opportunities"
            description="Access a wide range of job listings across various industries and experience levels."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-blue-500" />}
            title="Connect with Employers"
            description="Directly interact with top companies and recruiters looking for talent like you."
          />
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10 text-blue-500" />}
            title="Career Growth"
            description="Find resources and advice to help you advance in your professional journey."
          />
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              icon={<Search className="h-12 w-12 mb-6 text-blue-300" />}
              title="Search Jobs"
              description="Explore thousands of job listings tailored to your skills and interests."
            />
            <StepCard
              number="2"
              icon={<FileText className="h-12 w-12 mb-6 text-blue-300" />}
              title="Apply with Ease"
              description="Submit your applications with just a few clicks and track your progress."
            />
            <StepCard
              number="3"
              icon={<Building2 className="h-12 w-12 mb-6 text-blue-300" />}
              title="Get Hired"
              description="Interview with top companies and land your dream job."
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600">
            Join thousands of professionals who have found their perfect career match with FindJobs.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-semibold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-center">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({ number, icon, title, description }: { number: string, icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="text-center relative">
      <div className="absolute -top-4 -left-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <Card className="pt-8 pb-6 px-6 bg-gray-200 border-none hover:bg-gray-400 transition-colors duration-300">
        <CardHeader>
          <div className="flex justify-center">{icon}</div>
          <CardTitle className="text-2xl font-semibold mb-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-black">{description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

