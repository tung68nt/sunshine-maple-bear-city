import { redirect } from 'next/navigation'

export default function AdminAnnouncementsPage() {
  // Mass announcements removed as per scope definition (handled by external Email Marketing apps)
  redirect('/admin/events')
}
