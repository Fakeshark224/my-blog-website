'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css'; // Minimalist editor theme

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handlePublish = async () => {
    if (!title || !content) return alert('Please add a title and content.');

    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Instant Publishing to Supabase
      const { error } = await supabase.from('posts').insert({
        title,
        content,
        excerpt: content.substring(0, 150).replace(/<[^>]+>/g, '') + '...', // Strip HTML for excerpt
        author_id: user.id,
      });

      if (!error) {
        router.push('/'); // Redirect to homepage feed
        router.refresh();
      } else {
        alert('Error publishing post.');
      }
    }
  };

  // Editor toolbar configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link'], // Allows seamless pasting/embedding of external links
      ['clean']
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <input
        type="text"
        placeholder="Article Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-5xl font-bold text-gray-900 placeholder-gray-300 border-none outline-none mb-8 bg-transparent"
      />
      
      <div className="min-h-[400px] mb-8">
        <ReactQuill 
          theme="snow" 
          value={content} 
          onChange={setContent} 
          modules={modules}
          className="h-[350px]" // Leaves room for the toolbar
        />
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handlePublish}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
        >
          Publish Instantly
        </button>
      </div>
    </div>
  );
}