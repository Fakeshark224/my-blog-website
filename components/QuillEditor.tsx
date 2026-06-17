'use client'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const css = `
.ql-container { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.0625rem;
  border-radius: 0 0 8px 8px; border-color: #E3E3DF !important; min-height: 420px; }
.ql-toolbar { border-radius: 8px 8px 0 0; border-color: #E3E3DF !important;
  background: #F8F8F6; }
.ql-editor { min-height: 420px; line-height: 1.82; color: #141412; }
.ql-editor.ql-blank::before { color: #B5B5AD; font-style: normal; }
`

export default function QuillEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <>
      <style>{css}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Tell your story…"
      />
    </>
  )
}