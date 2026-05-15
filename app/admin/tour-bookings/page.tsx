'use client'

import { useEffect, useState } from 'react'
import { Search, Calendar, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminTourBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  async function fetchBookings() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tour_bookings')
        .select('*')
        .order('preferred_date', { ascending: false })

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('tour_bookings')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchBookings()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const filteredBookings = bookings.filter(booking =>
    booking.visitor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.visitor_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.visitor_phone?.includes(searchTerm)
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-maple-black">Tour Bookings</h1>
        <p className="text-neutral-dark-gray mt-2">Manage school tour bookings and visitor schedules</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-neutral-dark-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search by visitor name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-maple-red"
            />
          </div>

          <button className="px-6 py-2 bg-maple-red text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
            + New Tour
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-medium-gray bg-neutral-light-gray">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Visitor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Tour Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Visitors</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8">Loading bookings...</td>
                </tr>
              ) : filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-neutral-medium-gray hover:bg-neutral-light-gray transition-colors">
                  <td className="py-3 px-4 text-sm text-maple-black font-medium">{booking.visitor_name}</td>
                  <td className="py-3 px-4 text-sm text-neutral-dark-gray">{booking.visitor_email}</td>
                  <td className="py-3 px-4 text-sm text-neutral-dark-gray">{booking.visitor_phone}</td>
                  <td className="py-3 px-4 text-sm text-neutral-dark-gray">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-neutral-dark-gray" />
                      {new Date(booking.preferred_date).toLocaleDateString('vi-VN')} @ {booking.preferred_time}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-neutral-dark-gray">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-neutral-dark-gray" />
                      {booking.number_of_visitors} visitors
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                            className="text-green-600 font-semibold hover:underline text-sm"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => updateStatus(booking.id, 'cancelled')}
                            className="text-red-600 font-semibold hover:underline text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status !== 'pending' && (
                         <span className="text-neutral-400 text-sm">Processed</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-8 text-neutral-dark-gray">
            No tour bookings found matching your search.
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <p className="text-neutral-dark-gray text-sm">Total Bookings</p>
          <p className="text-3xl font-bold text-maple-black mt-2">{bookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <p className="text-neutral-dark-gray text-sm">Confirmed</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <p className="text-neutral-dark-gray text-sm">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <p className="text-neutral-dark-gray text-sm">Total Visitors Expected</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {bookings
              .filter(b => b.status === 'confirmed')
              .reduce((sum, b) => sum + (b.number_of_visitors || 0), 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
