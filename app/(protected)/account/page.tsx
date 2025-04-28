'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import { useUser } from '@/lib/useUser'

export default function AccountSettingsPage() {
  const router = useRouter()
  const user   = useUser()
  const [examDate, setExamDate] = useState<string>('')
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)

  useEffect(() => {
    if (!user) {
      router.replace('/login')
      return
    }
    ;(async () => {
      const { data, error } = await supabaseBrowser
        .from('profiles')
        .select('exam_date')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error loading profile:', error.message)
      } else if (data?.exam_date) {
        setExamDate(data.exam_date)
      }
      setLoading(false)
    })()
  }, [user, router])

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabaseBrowser
      .from('profiles')
      .upsert({ id: user!.id, exam_date: examDate || null })

    if (error) {
      console.error('Error saving settings:', error.message)
      alert('Could not save, check console.')
    } else {
      alert('Settings saved!')
    }
    setSaving(false)
  }

  if (loading) return <p className="p-4">Loading…</p>

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <label className="block">
          <span className="block mb-1">Exam date</span>
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </main>
  )
}
