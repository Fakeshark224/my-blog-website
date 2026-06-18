import { supabase, Post } from '../lib/supabase'
import Link from 'next/link'

export const revalidate = 30

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US',
    { month: 'long', day: 'numeric', year: 'numeric' })
}

function rt(html: string) {
  const w = html.replace(/<[^>]+>/g, '').trim().split(/s+/).length
  return `${Math.max(1, Math.round(w / 200))} min read`
}

function blurb(p: Post, len = 120) {
  return p.excerpt ?? (p.content.replace(/<[^>]+>/g, '').slice(0, len) + '…')
}

const FB = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600'

export default async function HomePage() {
  const { data } = await supabase
    .from('posts').select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  const posts: Post[] = data ?? []

  return (
    <>
      

      {/* TOP BANNER — paste your AdSense code inside */}
      <div className="container">
        <div className="ad-unit ad-unit--banner">{/* AD CODE */}</div>
      </div>

      {posts[0] && (
        <section className="hero">
          <div className="container">
            <span className="hero__eyebrow">Spotlight</span>
            <h1 className="hero__title">{posts[0].title}</h1>
            <p className="hero__subtitle">{blurb(posts[0], 180)}</p>
            <div className="hero__meta">
              <span>By {posts[0].author}</span>
              <span className="hero__meta-dot"/>
              <span>{fmt(posts[0].created_at)}</span>
              <span className="hero__meta-dot"/>
              <span>{rt(posts[0].content)}</span>
            </div>
          </div>
        </section>
      )}

      <main>
        <div className="container">
          <div className="page-grid">
            <div className="page-grid__main">

              <div className="section-header" id="featured">
                <span className="section-header__title">Featured Editorials</span>
                <a href="#" className="section-header__link">View all →</a>
              </div>

              <div className="card-grid card-grid--3col"
                style={{ marginBottom: 'var(--sp-8)' }}>
                {posts.slice(0, 3).map(post => (
                  <Link key={post.id} href={`/${post.id}`}
                    className="card card--vertical">
                    <div className="card__image">
                      <img src={post.cover_image ?? FB}
                        alt={post.title} loading="lazy"/>
                    </div>
                    <div className="card__body">
                      <span className="card__category">{post.category}</span>
                      <h2 className="card__title">{post.title}</h2>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ background: 'var(--text)', borderRadius: 'var(--radius-lg)',
                padding: 'var(--sp-6)', marginBottom: 'var(--sp-8)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
                  fontWeight: 500, color: '#fff', marginBottom: 'var(--sp-2)' }}>
                  Meridian Premium Workspace
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)',
                  marginBottom: 'var(--sp-4)' }}>
                  Unlock distraction-free reading and exclusive financial insights.
                </p>
                <a href="#" style={{ color: '#fff', fontWeight: 600,
                  fontSize: 'var(--text-sm)' }}>Learn More →</a>
              </div>

              <div className="section-header">
                <span className="section-header__title">Latest Articles</span>
              </div>

             

              <div className="card-list">
                {posts.slice(0, 10).map((post, i) => (
                  <div key={post.id}>
                    <Link href={`/${post.id}`} className="card card--horizontal">
                      <div className="card__body">
                        <span className="card__category">{post.category}</span>
                        <h2 className="card__title">{post.title}</h2>
                        <p className="card__excerpt">{blurb(post)}</p>
                        <div className="card__meta">
                          <span>{post.author}</span>
                          <span className="card__meta-dot"/>
                          <span>{rt(post.content)}</span>
                        </div>
                      </div>
                      {post.cover_image && (
                        <div className="card__image">
                          <img src={post.cover_image} alt={post.title} loading="lazy"/>
                        </div>
                      )}
                    </Link>

                    {/* IN-FEED AD every 3rd article — paste ad code inside */}
                    {(i + 1) % 3 === 0 && (
                      <div className="ad-unit ad-unit--infeed">
                        <div className="ad__thumb" style={{ background:
                          'linear-gradient(135deg,#EEEEFF,#D8D8F0)',
                          borderRadius: 8, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '1.5rem' }}>📊</div>
                        <div className="ad__body">
                          <p className="ad__label">Sponsored</p>
                          {/* INSERT IN-FEED AD CODE HERE */}
                          <h3 className="ad__headline">Ad headline goes here</h3>
                          <p className="ad__description">Replace with ad network tag.</p>
                          <a href="#" className="ad__cta">Learn More →</a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <nav className="pagination">
                {[1,2,3,'…',8].map((p,i) => (
                  <button key={i}
                    className={`pagination__btn${p===1?' pagination__btn--active':''}`}>
                    {p}
                  </button>
                ))}
              </nav>
            </div>

            <aside className="sidebar">
              {/* SIDEBAR AD — paste 300x250 ad code inside */}
              <div className="ad-unit ad-unit--sidebar ad-unit--sticky">
                {/* INSERT SIDEBAR AD CODE HERE */}
              </div>

              <div className="widget widget--newsletter" id="newsletter">
                {/* SPONSORED BRIEF — replace YourBrand */}
                <div className="sponsored-brief">
                  <span className="sponsored-brief__text">
                    Today's Brief is brought to you by
                  </span>
                  <a href="#" className="sponsored-brief__brand">YourBrand</a>
                </div>
                <div className="widget__icon">✦</div>
                <h3 className="widget__heading">The Meridian Brief</h3>
                <p className="widget__copy">
                  A weekly digest of our best editorial pieces.
                </p>
                <div className="widget__input-group">
                  <input type="email" className="widget__input"
                    placeholder="your@email.com"/>
                  <button className="btn btn--primary w-full">Subscribe</button>
                </div>
              </div>

              <div className="widget">
                <p className="widget__title">Trending Now</p>
                <ul className="popular-list">
                  {posts.slice(0, 4).map((p, i) => (
                    <li key={p.id} className="popular-item">
                      <span className="popular-item__rank">{i + 1}</span>
                      <div>
                        <Link href={`/${p.id}`} className="popular-item__title">
                          {p.title}
                        </Link>
                        <p className="popular-item__meta">{rt(p.content)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="widget">
                <p className="widget__title">Topics</p>
                <div className="tag-cloud">
                  {['Macroeconomics','Finance','Technology',
                    'Business','Analysis','Ideas'].map(t => (
                    <a key={t} href="#" className="tag">{t}</a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* FOOTER LEADERBOARD — paste ad code inside */}
      <div className="ad-footer-leaderboard">
        <div className="ad-footer-leaderboard__inner container">
          {/* INSERT FOOTER LEADERBOARD AD CODE HERE */}
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div>
              <p className="footer__logo">Meridian.</p>
              <p className="footer__tagline">
                A clean, editorial space for thoughts and ideas.
              </p>
              <div className="footer__social">
                <a href="#" className="footer__social-btn">𝕏</a>
                <a href="#" className="footer__social-btn">in</a>
              </div>
            </div>
            <div>
              <p className="footer__col-title">Categories</p>
              <ul className="footer__links">
                {['Macroeconomics','Technology','Finance'].map(c => (
                  <li key={c}><a href="#" className="footer__link">{c}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="footer__col-title">Company</p>
              <ul className="footer__links">
                {['About Us','Advertise','Careers'].map(c => (
                  <li key={c}><a href="#" className="footer__link">{c}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© 2026 Meridian Editorial. All rights reserved.</p>
            <nav className="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}