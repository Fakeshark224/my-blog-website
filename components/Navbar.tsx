import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      
      {/* 1. Left Side: Logo */}
      <Link href="/" className="logo">Meridian.</Link>

      {/* 2. Middle: Navigation Links */}
      {/* Your CSS automatically hides this on mobile (< 900px) */}
      <nav>
        <Link href="/">Editorial</Link>
        <Link href="/">Features</Link>
        <Link href="/write">Write</Link>
      </nav>

      {/* 3. Right Side: Auth & Subscribe Buttons */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link href="/signin" style={{ fontWeight: 750, fontSize: '0.95rem' }}>
          Sign In
        </Link>
        <button className="btn">Subscribe</button>
      </div>
      
    </header>
  );
}