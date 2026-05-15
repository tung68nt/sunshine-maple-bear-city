'use client'

import { useEffect, useState } from 'react'
import { Users, FileText, Calendar, Image as ImageIcon, TrendingUp, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState({
    admissions: 0,
    tours: 0,
    blogs: 0,
    gallery: 0
  })
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([])

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [
          { count: admissionsCount },
          { count: toursCount },
          { count: blogsCount },
          { count: galleryCount },
          { data: recentAdmissionsData }
        ] = await Promise.all([
          supabase.from('admissions').select('*', { count: 'exact', head: true }),
          supabase.from('tour_bookings').select('*', { count: 'exact', head: true }),
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('gallery_items').select('*', { count: 'exact', head: true }),
          supabase.from('admissions').select('*').order('created_at', { ascending: false }).limit(4)
        ])

        setStatsData({
          admissions: admissionsCount || 0,
          tours: toursCount || 0,
          blogs: blogsCount || 0,
          gallery: galleryCount || 0
        })

        if (recentAdmissionsData) {
          setRecentAdmissions(recentAdmissionsData)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [])

  const stats = [
    {
      title: 'Total Admissions',
      value: statsData.admissions.toString(),
      change: 'All time',
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Tour Bookings',
      value: statsData.tours.toString(),
      change: 'All time',
      icon: Calendar,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Blog Posts',
      value: statsData.blogs.toString(),
      change: 'Total articles',
      icon: FileText,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Gallery Images',
      value: statsData.gallery.toString(),
      change: 'Total photos',
      icon: ImageIcon,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-maple-black">Dashboard</h1>
        <p className="text-neutral-dark-gray mt-2">Welcome back! Here&apos;s what&apos;s happening at Sunshine Maple Bear today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.iconColor} w-6 h-6`} />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-sm text-neutral-dark-gray font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-maple-black mt-2">{stat.value}</p>
              <p className="text-xs text-neutral-dark-gray mt-2">{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Admissions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Admissions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <h2 className="text-xl font-bold text-maple-black mb-6">Recent Admissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-medium-gray">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Parent Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Child</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Grade</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-sm text-neutral-500">
                      No recent admissions found.
                    </td>
                  </tr>
                ) : (
                  recentAdmissions.map((admission) => (
                    <tr key={admission.id} className="border-b border-neutral-medium-gray hover:bg-neutral-light-gray transition-colors">
                      <td className="py-3 px-4 text-sm text-maple-black">{admission.parent_name}</td>
                      <td className="py-3 px-4 text-sm text-maple-black">{admission.child_name}</td>
                      <td className="py-3 px-4 text-sm text-neutral-dark-gray">{admission.grade_level}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            admission.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : admission.status === 'submitted' || admission.status === 'reviewing'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {admission.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <a href="/admin/admissions" className="mt-6 inline-block text-maple-red font-semibold hover:underline">View All Admissions →</a>
        </div>

        {/* Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
            <h3 className="text-lg font-bold text-maple-black mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Alerts
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-sm font-medium text-yellow-800">3 pending admissions need review</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm font-medium text-blue-800">Tour bookings for this week: 5</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <p className="text-sm font-medium text-green-800">Gallery updated 2 days ago</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
            <h3 className="text-lg font-bold text-maple-black mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-maple-red hover:bg-neutral-light-gray rounded-lg transition-colors">
                + Add New Blog Post
              </button>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-maple-red hover:bg-neutral-light-gray rounded-lg transition-colors">
                + Upload Gallery Images
              </button>
              <button className="w-full px-4 py-2 text-left text-sm font-medium text-maple-red hover:bg-neutral-light-gray rounded-lg transition-colors">
                + Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
