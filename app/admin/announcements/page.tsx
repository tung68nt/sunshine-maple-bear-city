'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import useSWR from 'swr'

interface Announcement {
  id: string
  title: string
  content: string
  priority: 'high' | 'normal' | 'low'
  status: 'active' | 'inactive'
  created_at: string
  target_audience: string
}

export default function AnnouncementsManagement() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'normal' as const,
    status: 'active' as const,
    target_audience: 'all',
  })

  const { data: announcements = [], mutate } = useSWR<Announcement[]>(
    '/api/admin/announcements',
    async (url) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch announcements')
      return res.json()
    }
  )

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingId ? `/api/admin/announcements/${editingId}` : '/api/admin/announcements'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save announcement')

      mutate()
      setFormData({
        title: '',
        content: '',
        priority: 'normal',
        status: 'active',
        target_audience: 'all',
      })
      setEditingId(null)
      setIsCreating(false)
    } catch (error) {
      console.error('Error saving announcement:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    try {
      const res = await fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      mutate()
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const handleEdit = (item: Announcement) => {
    setFormData({
      title: item.title,
      content: item.content,
      priority: item.priority,
      status: item.status,
      target_audience: item.target_audience,
    })
    setEditingId(item.id)
    setIsCreating(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'normal':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground">Send announcements to parents and staff</p>
        </div>
        <Button
          onClick={() => {
            setIsCreating(!isCreating)
            setEditingId(null)
          }}
          className="bg-primary hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit' : 'Create'} Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Announcement title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Announcement content"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'high' | 'normal' | 'low' })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="inactive">Inactive</option>
                    <option value="active">Active</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Audience</label>
                  <select
                    value={formData.target_audience}
                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="all">All</option>
                    <option value="parents">Parents</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-primary hover:bg-red-700">
                  {editingId ? 'Update' : 'Create'} Announcement
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false)
                    setEditingId(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No announcements yet</p>
            </CardContent>
          </Card>
        ) : (
          announcements.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                    <p className="text-muted-foreground mt-2">{item.content}</p>
                    <div className="flex gap-2 mt-3">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority === 'high' && 'High'}
                        {item.priority === 'normal' && 'Normal'}
                        {item.priority === 'low' && 'Low'}
                      </Badge>
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant="outline">{item.target_audience}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
