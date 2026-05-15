'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Download, Eye, Check, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminAdmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [admissions, setAdmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdmissions()
  }, [])

  async function fetchAdmissions() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('admissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAdmissions(data || [])
    } catch (error) {
      console.error('Error fetching admissions:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('admissions')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchAdmissions()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const filteredAdmissions = admissions
    .filter(admission => {
      const matchesSearch =
        admission.parent_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.child_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.parent_email?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || admission.status === filterStatus
      return matchesSearch && matchesStatus
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'submitted':
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-maple-black">Admissions Management</h1>
        <p className="text-neutral-dark-gray mt-2">View and manage admission applications</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-neutral-dark-gray w-5 h-5" />
            <input
              type="text"
              placeholder="Search by parent name, child name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-maple-red"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-neutral-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-maple-red"
            >
              <option value="all">All Status</option>
              <option value="submitted">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button className="flex items-center gap-2 px-4 py-2 bg-maple-red text-white rounded-lg hover:bg-red-700 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-medium-gray bg-neutral-light-gray">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Parent Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Child</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Grade</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Submitted</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-dark-gray">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">Loading admissions...</td>
                </tr>
              ) : filteredAdmissions.map((admission) => (
                <tr key={admission.id} className="border-b border-neutral-medium-gray hover:bg-neutral-light-gray transition-colors">
                  <td className="py-3 px-4 text-sm text-maple-black font-medium">{admission.parent_name}</td>
                  <td className="py-3 px-4 text-sm text-neutral-dark-gray">{admission.child_name}</td>
                  <td className="py-3 px-4 text-sm text-neutral-dark-gray uppercase">{admission.grade_level}</td>
                  <td className="py-3 px-4 text-sm text-neutral-dark-gray">
                    {new Date(admission.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(admission.status)}`}>
                      {admission.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600">
                        <Eye size={18} />
                      </button>
                      {(admission.status === 'submitted' || admission.status === 'reviewing') && (
                        <>
                          <button 
                            onClick={() => updateStatus(admission.id, 'approved')}
                            className="p-2 hover:bg-green-100 rounded-lg transition-colors text-green-600"
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={() => updateStatus(admission.id, 'rejected')}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAdmissions.length === 0 && (
          <div className="text-center py-8 text-neutral-dark-gray">
            No admissions found matching your criteria.
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <p className="text-neutral-dark-gray text-sm">Total Applications</p>
          <p className="text-3xl font-bold text-maple-black mt-2">{admissions.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <p className="text-neutral-dark-gray text-sm">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {admissions.filter(a => a.status === 'submitted' || a.status === 'reviewing').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-medium-gray">
          <p className="text-neutral-dark-gray text-sm">Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {admissions.filter(a => a.status === 'approved').length}
          </p>
        </div>
      </div>
    </div>
  )
}
