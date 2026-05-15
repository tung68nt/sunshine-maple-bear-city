'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Link as LinkIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface GalleryItem {
  id: string
  title: string
  image_url: string
  album: string
  created_at: string
}

export default function GalleryManagement() {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState('all')
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    album: 'activities',
  })

  const fetchGallery = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  const albums = ['activities', 'classroom', 'events', 'facilities']
  const filteredItems = selectedAlbum === 'all' ? items : items.filter(item => item.album === selectedAlbum)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const { error } = await supabase
        .from('gallery_items')
        .insert([
          {
            title: formData.title,
            image_url: formData.image_url || 'https://via.placeholder.com/800x600',
            album: formData.album
          }
        ])

      if (error) throw error

      fetchGallery()
      setFormData({ title: '', image_url: '', album: 'activities' })
    } catch (error) {
      console.error('Error uploading:', error)
      alert('An error occurred.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id)
        
      if (error) throw error
      fetchGallery()
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gallery Management</h1>
          <p className="text-muted-foreground">Manage school activity photos</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Photo title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Album</label>
              <select
                value={formData.album}
                onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="activities">Activities</option>
                <option value="classroom">Classroom</option>
                <option value="events">Events</option>
                <option value="facilities">Facilities</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <Button type="submit" disabled={isUploading} className="w-full bg-primary hover:bg-red-700">
              {isUploading ? 'Uploading...' : 'Add Image'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <div className="flex gap-2 mb-4">
          <Button
            variant={selectedAlbum === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedAlbum('all')}
          >
            All
          </Button>
          {albums.map((album) => (
            <Button
              key={album}
              variant={selectedAlbum === album ? 'default' : 'outline'}
              onClick={() => setSelectedAlbum(album)}
            >
              {album === 'activities' && 'Activities'}
              {album === 'classroom' && 'Classroom'}
              {album === 'events' && 'Events'}
              {album === 'facilities' && 'Facilities'}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredItems.length === 0 ? (
            <p className="text-center text-muted-foreground col-span-full py-8">No photos yet</p>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-4">
                  <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <Badge className="mb-3">{item.album}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="w-full text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
