import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <div className="header-inner">
        
        {/* 1. Left Side: Logo (CSS adds the cool glowing dot automatically!) */}
        <Link href="/" className="logo">Meridian.</Link>

        {/* 2. Middle: Navigation Links */}
        <nav>
          <Link href="/">Editorial</Link>
          <Link href="/">Features</Link>
          <Link href="/write">Write</Link>
        </nav>

        {/* 3. Right Side: Auth & Subscribe Buttons */}
        <div className="header-actions">
          <Link href="/signin" className="btn">
            Sign In
          </Link>
          <button className="btn btn-primary">Subscribe</button>
        </div>

      </div>
    </header>
  );
}