'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from 'react-hot-toast'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'FindJobs',
    siteDescription: 'Your go-to platform for finding the perfect job',
    contactEmail: 'support@findjobs.com',
    jobsPerPage: '10',
    allowUserRegistration: true,
    maintenanceMode: false,
    defaultJobDuration: '30',
    adminNotificationEmail: 'admin@findjobs.com',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    })
  }

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked
    })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setSettings({
      ...settings,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the settings to your backend
    console.log('Settings saved:', settings)
    toast.success('Settings saved successfully')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure the basic settings for your job platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Listings Settings</CardTitle>
            <CardDescription>Configure settings related to job listings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobsPerPage">Jobs Per Page</Label>
              <Select
                value={settings.jobsPerPage}
                onValueChange={handleSelectChange('jobsPerPage')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select jobs per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultJobDuration">Default Job Duration (days)</Label>
              <Input
                id="defaultJobDuration"
                name="defaultJobDuration"
                type="number"
                value={settings.defaultJobDuration}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Settings</CardTitle>
            <CardDescription>Configure user-related settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="allowUserRegistration"
                checked={settings.allowUserRegistration}
                onCheckedChange={handleSwitchChange('allowUserRegistration')}
              />
              <Label htmlFor="allowUserRegistration">Allow User Registration</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={handleSwitchChange('maintenanceMode')}
              />
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminNotificationEmail">Admin Notification Email</Label>
              <Input
                id="adminNotificationEmail"
                name="adminNotificationEmail"
                type="email"
                value={settings.adminNotificationEmail}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button type="submit">Save Settings</Button>
      </div>
    </form>
  )
}

