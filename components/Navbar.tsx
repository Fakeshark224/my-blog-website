import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white w-full">
      
      {/* 1. Left Side: Logo */}
      <div className="text-2xl font-bold tracking-tight">
        <Link href="/">Meridian.</Link>
      </div>

      {/* 2. Middle: Links */}
      <div className="flex items-center space-x-8 text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-black">Editorial</Link>
        <Link href="/" className="hover:text-black">Features</Link>
        <Link href="/write" className="hover:text-black">Write</Link>
      </div>

      {/* 3. Right Side: Search & Auth Buttons */}
      <div className="flex items-center space-x-4 text-sm">
        <button className="flex items-center text-gray-600 hover:text-black">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          Search
        </button>
        <button className="font-medium hover:text-gray-600">Sign In</button>
        <button className="bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition">
          Subscribe
        </button>
      </div>
      
    </nav>
  );
}