import './globals.css';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        
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

        {children}

        <footer className="footer">
          <div className="container">
            <div className="footer__grid">
              <div>
                <div className="footer__logo">Meridian.</div>
                <p className="footer__tagline">A clean, editorial space for thoughts and ideas. Signature ads that feel designed-in.</p>
                <div className="footer__social mt-6">
                  <a href="#" className="footer__social-btn">X</a>
                  <a href="#" className="footer__social-btn">in</a>
                </div>
              </div>
              <div>
                <h4 className="footer__col-title">Categories</h4>
                <div className="footer__links">
                  <a href="#" className="footer__link">Macroeconomics</a>
                  <a href="#" className="footer__link">Technology</a>
                  <a href="#" className="footer__link">Finance</a>
                </div>
              </div>
              <div>
                <h4 className="footer__col-title">Company</h4>
                <div className="footer__links">
                  <a href="#" className="footer__link">About Us</a>
                  <a href="#" className="footer__link">Advertise</a>
                  <a href="#" className="footer__link">Careers</a>
                </div>
              </div>
            </div>
            <div className="footer__bottom">
              <p>© 2026 Meridian Editorial. All rights reserved.</p>
              <div className="footer__legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}