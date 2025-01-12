'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar, Languages, Award } from 'lucide-react'

export default function ProfilePage() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    location: 'San Francisco, CA',
    avatar: '/placeholder.svg?height=100&width=100',
    bio: 'Experienced software engineer with a passion for building user-friendly applications.',
    experience: [
      {
        id: 1,
        role: 'Senior Software Engineer',
        company: 'Tech Corp',
        period: '2020 - Present',
        description: 'Leading development of core products and mentoring junior developers.'
      },
      {
        id: 2,
        role: 'Software Engineer',
        company: 'StartUp Inc',
        period: '2018 - 2020',
        description: 'Developed and maintained multiple web applications.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Master of Computer Science',
        school: 'Tech University',
        year: '2018'
      },
      {
        id: 2,
        degree: 'Bachelor of Computer Science',
        school: 'State University',
        year: '2016'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'],
    languages: ['English (Native)', 'Spanish (Intermediate)', 'French (Basic)'],
    certifications: ['AWS Certified Developer', 'Google Cloud Professional']
  })

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  {user.location}
                </div>
                <div className="w-full space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {user.phone}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="space-y-2">
                  {user.languages.map((language) => (
                    <div key={language} className="flex items-center text-gray-600">
                      <Languages className="h-4 w-4 mr-2" />
                      {language}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{user.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {user.experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-gray-200 pl-4 ml-2">
                        <h3 className="text-lg font-semibold">{exp.role}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Briefcase className="h-4 w-4 mr-2" />
                          {exp.company}
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-2" />
                          {exp.period}
                        </div>
                        <p className="text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {user.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-gray-200 pl-4 ml-2">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <div className="flex items-center text-gray-600">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          {edu.school}
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-2" />
                          {edu.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {user.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <Award className="h-4 w-4 mr-2" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
