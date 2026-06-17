'use client'
import Link from 'next/link';

export default function Navbar() {
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
          <button className="nav_search" onClick={() => alert("Search clicked!")}>
            {/* Yahan tumhara SVG icon code aayega */}
            Search
          </button>
          <button className="btn btn-ghost" onClick={() => console.log("Sign In clicked")}>
            Sign In
          </button>
          <Link href="#newsletter" className="btn btn-primary">
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}
 <nav className="nav">
          <div className="nav__inner">
            <a href="/" className="nav__logo">Meridian.</a>
            
            <div className="nav__links">
              <a href="/" className="nav__link nav__link--active">Editorial</a>
              <a href="#" className="nav__link">Features</a>
              <a href="/write" className="nav__link">Write</a>
            </div>
            
            <div className="nav__actions">
              <div className="nav__search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span>Search</span>
              </div>
              {/* Added the ghost button your CSS included */}
              <button className="btn btn--ghost">Sign In</button>
              <button className="btn btn--primary">Subscribe</button>
              
              <div className="nav__menu-toggle">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </nav>
        
