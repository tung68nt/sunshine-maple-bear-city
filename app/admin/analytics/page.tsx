'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, Calendar, MessageSquare } from 'lucide-react'

export default function AnalyticsDashboard() {
  // Mock data - in production, fetch from Supabase
  const stats = [
    {
      title: 'Total Admissions',
      value: '42',
      icon: Users,
      color: 'bg-blue-100',
      textColor: 'text-blue-800',
    },
    {
      title: 'Tour Bookings',
      value: '18',
      icon: Calendar,
      color: 'bg-green-100',
      textColor: 'text-green-800',
    },
    {
      title: 'Blog Posts',
      value: '12',
      icon: BookOpen,
      color: 'bg-yellow-100',
      textColor: 'text-yellow-800',
    },
    {
      title: 'Announcements',
      value: '8',
      icon: MessageSquare,
      color: 'bg-red-100',
      textColor: 'text-red-800',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics & Statistics</h1>
        <p className="text-muted-foreground">Overview of school operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest events at the school</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-semibold text-foreground">New admission application received</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-semibold text-foreground">Campus tour booked</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-semibold text-foreground">New blog post published</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-foreground">Announcement sent</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Key events in the near future</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 py-3 border-b">
              <div className="bg-red-100 text-red-800 rounded px-3 py-1 text-sm font-semibold min-w-20">
                05/20
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">New Academic Year Opening Ceremony</p>
                <p className="text-sm text-muted-foreground">Whole school</p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-3 border-b">
              <div className="bg-yellow-100 text-yellow-800 rounded px-3 py-1 text-sm font-semibold min-w-20">
                05/28
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Museum Field Trip</p>
                <p className="text-sm text-muted-foreground">Kindergarten classes</p>
              </div>
            </div>
            <div className="flex items-start gap-4 py-3">
              <div className="bg-green-100 text-green-800 rounded px-3 py-1 text-sm font-semibold min-w-20">
                06/05
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Parent-Teacher Conference</p>
                <p className="text-sm text-muted-foreground">Whole school</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
