'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

const QuillEditor = dynamic(() => import('@/components/QuillEditor'), { ssr: false })

const CATS = ['Business', 'Finance', 'Technology', 'Analysis',
               'Macroeconomics', 'Culture', 'Ideas']

const inp: React.CSSProperties = {
  padding: '0.625rem 1rem', border: '1px solid #E3E3DF', borderRadius: 9999,
  fontFamily: 'inherit', fontSize: '0.875rem', background: '#fff',
  color: '#141412', outline: 'none', flex: 1, minWidth: 150,
}

export default function WritePage() {
  const router = useRouter()
  const [title,   setTitle]   = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [author,  setAuthor]  = useState('')
  const [cat,     setCat]     = useState('Business')
  const [cover,   setCover]   = useState('')
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function publish() {
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError('Title, Author and Content are required.')
      return
    }
    setLoading(true)
    setError('')
    const { data, error: err } = await supabase
      .from('posts')
      .insert([{
        title: title.trim(), content, category: cat,
        author: author.trim(),
        excerpt: excerpt.trim() || null,
        cover_image: cover.trim() || null,
        published: true,
      }])
      .select().single()
    setLoading(false)
    if (err) { setError('Publish failed — check Supabase.'); return }
    router.push(`/${data.id}`)
  }

  return (
    <>
      <nav className="nav">
        <div className="nav__inner">
          <a href="/" className="nav__logo">Meridian.</a>
          <div className="nav__actions">
            <a href="/" className="btn btn--ghost">← Back</a>
            <button className="btn btn--primary" onClick={publish} disabled={loading}>
              {loading ? 'Publishing…' : 'Publish Article'}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '3rem 1.5rem' }}>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5',
            borderRadius: 8, padding: '0.875rem 1rem', marginBottom: '1.5rem',
            color: '#DC2626', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <input
          type="text" value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Your article title…"
          style={{ width: '100%', display: 'block',
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 400,
            lineHeight: 1.2, letterSpacing: '-0.025em',
            border: 'none', outline: 'none', background: 'transparent',
            color: '#141412', marginBottom: '1.25rem' }}
        />

        <textarea
          value={excerpt} onChange={e => setExcerpt(e.target.value)}
          placeholder="Short excerpt shown on cards…" rows={2}
          style={{ width: '100%', display: 'block', fontFamily: 'inherit',
            fontSize: '1.0625rem', fontWeight: 300, lineHeight: 1.65,
            border: 'none', borderBottom: '1px solid #E3E3DF',
            outline: 'none', background: 'transparent', resize: 'none',
            color: '#88887F', marginBottom: '2rem', paddingBottom: '1.5rem' }}
        />

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem',
          flexWrap: 'wrap' }}>
          <input type="text" value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Author name" style={inp} />
          <select value={cat} onChange={e => setCat(e.target.value)}
            style={{ ...inp, flex: '0 0 auto', cursor: 'pointer' }}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="url" value={cover}
            onChange={e => setCover(e.target.value)}
            placeholder="Cover image URL (optional)"
            style={{ ...inp, flex: 2 }} />
        </div>

        <QuillEditor value={content} onChange={setContent} />

      </main>
    </>
  )
}