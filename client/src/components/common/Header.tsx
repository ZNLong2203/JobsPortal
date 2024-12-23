import Link from 'next/link'
import { Briefcase } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center">
          <Briefcase className="mr-2" />
          JobPortal
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Jobs
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign up</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

