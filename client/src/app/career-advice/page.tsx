'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, ArrowRight } from 'lucide-react'

// Mock data for articles
const articles = [
  { id: 1, title: "10 Tips for a Successful Job Interview", category: "Interviews", date: "2023-06-01", readTime: "5 min" },
  { id: 2, title: "How to Write a Standout Resume", category: "Resume", date: "2023-05-28", readTime: "7 min" },
  { id: 3, title: "Navigating Career Changes in 2023", category: "Career Development", date: "2023-05-25", readTime: "6 min" },
  { id: 4, title: "The Importance of Networking in Your Job Search", category: "Job Search", date: "2023-05-22", readTime: "4 min" },
  { id: 5, title: "Mastering Soft Skills in the Workplace", category: "Skills", date: "2023-05-19", readTime: "8 min" },
  { id: 6, title: "Negotiating Your Salary: Do's and Don'ts", category: "Salary", date: "2023-05-16", readTime: "6 min" },
]

const categories = ["All", "Interviews", "Resume", "Career Development", "Job Search", "Skills", "Salary"]

export default function CareerAdvicePage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === activeCategory)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Career Advice</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Featured Article</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">10 Tips for a Successful Job Interview</h2>
            <p className="text-gray-600 mb-4">Master the art of job interviews with our comprehensive guide. Learn how to prepare, what to wear, and how to follow up effectively.</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center"><CalendarIcon className="mr-1 h-4 w-4" /> June 1, 2023</span>
              <span className="flex items-center"><Clock className="mr-1 h-4 w-4" /> 5 min read</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Read More <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.slice(1).map(category => (
                <Badge key={category} variant="secondary">{category}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="All" className="mb-8">
        <TabsList className="mb-4">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeCategory}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge>{article.category}</Badge>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center"><CalendarIcon className="mr-1 h-4 w-4" /> {article.date}</span>
                    <span className="flex items-center"><Clock className="mr-1 h-4 w-4" /> {article.readTime} read</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read Article</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

