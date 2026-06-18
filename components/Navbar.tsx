'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  // Button ke functions (Dimaag)
  const handleSignIn = () => {
    router.push('/login'); // Ye aapko login page par bhej dega
  };

  const handleSubscribe = () => {
    alert("Meridian Newsletter par Subscribe karne ke liye Shukriya! 🎉");
  };

  // Yahan se UI (Design) shuru hota hai
  return (
    <nav className="nav">
      <div className="nav_inner">
        <Link href="/" className="nav_logo">Meridian.</Link>

        <div className="nav_links">
          <Link href="/" className="nav_link nav_link--active">Editorial</Link>
          <Link href="#" className="nav_link">Features</Link>
          <Link href="/write" className="nav_link">Write</Link>
        </div>

        <div className="nav_actions">
          <div className="nav_search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search</span>
          </div>
          
          {/* Ye aapke functional buttons hain */}
          <button className="btn btn--ghost" onClick={handleSignIn}>Sign In</button>
          <button className="btn btn--primary" onClick={handleSubscribe}>Subscribe</button>

          <div className="nav_menu-toggle">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}