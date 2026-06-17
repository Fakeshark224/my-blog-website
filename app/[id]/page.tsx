import { supabase, Post } from '../../lib/supabase'
import { notFound } from 'next/navigation'
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

export default async function ArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const { data: post, error } = await supabase
    .from('posts').select('*').eq('id', params.id).single()
  if (!post || error) notFound()

  const { data: related } = await supabase
    .from('posts').select('*')
    .eq('published', true).neq('id', params.id)
    .order('created_at', { ascending: false }).limit(4)
  const rel: Post[] = related ?? []

  const mid   = post.content.indexOf('</p>',
    Math.floor(post.content.length / 2)) + 4
  const split = mid > 4 && post.content.length > 600
  const half1 = split ? post.content.slice(0, mid) : post.content
  const half2 = split ? post.content.slice(mid)    : ''

  return (
    <>
      <nav className="nav">
        <div className="nav__inner">
          <a href="/" className="nav__logo">Meridian.</a>
          <ul className="nav__links">
            <li><a href="/" className="nav__link">Editorial</a></li>
            <li><a href="/write" className="nav__link">Write</a></li>
          </ul>
          <div className="nav__actions">
            <a href="/" className="btn btn--ghost">← Home</a>
            <a href="#newsletter" className="btn btn--primary">Subscribe</a>
          </div>
        </div>
      </nav>

      {/* TOP BANNER */}
      <div className="container">
        <div className="ad-unit ad-unit--banner">{/* AD CODE */}</div>
      </div>

      <main>
        <div className="container">
          <div className="page-grid">

            <article className="page-grid__main">
              <header className="article__header">
                <span className="article__category">{post.category}</span>
                <h1 className="article__title">{post.title}</h1>
                {post.excerpt && (
                  <p className="article__lead">{post.excerpt}</p>
                )}
                <div className="article__byline">
                  <div className="article__avatar">
                    <div style={{ width:'100%', height:'100%',
                      background:'linear-gradient(135deg,#EEEEFF,#D8D8F0)',
                      display:'flex', alignItems:'center',
                      justifyContent:'center', fontWeight:700, color:'#5C5CE0' }}>
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="article__author-name">{post.author}</p>
                    <p className="article__publish-meta">{fmt(post.created_at)}</p>
                  </div>
                  <span className="article__reading-time">
                    {rt(post.content)}
                  </span>
                </div>
              </header>

              {post.cover_image && (
                <figure style={{ marginBottom:'2.5rem',
                  borderRadius:12, overflow:'hidden' }}>
                  <img src={post.cover_image} alt={post.title}
                    style={{ width:'100%', height:420,
                      objectFit:'cover', display:'block' }}/>
                </figure>
              )}

              <div className="article__content"
                dangerouslySetInnerHTML={{ __html: half1 }}/>

              {/* MID-ARTICLE PULL-QUOTE AD */}
              {half2 && (
                <div className="ad-mid-article">
                  <div className="ad-mid-article__inner">
                    <span className="ad-mid-article__label">Sponsored</span>
                    {/* INSERT MID-ARTICLE AD CODE HERE */}
                    <p className="ad-mid-article__headline">
                      "Your sponsored pull-quote goes here."
                    </p>
                    <p className="ad-mid-article__copy">
                      Replace with your ad network code.
                    </p>
                    <a href="#" className="ad-mid-article__cta">Learn More →</a>
                  </div>
                </div>
              )}

              {half2 && (
                <div className="article__content"
                  dangerouslySetInnerHTML={{ __html: half2 }}/>
              )}

              {/* UP NEXT SLATE */}
              {rel.length > 0 && (
                <div className="ad-up-next-slate">
                  <Link href={`/${rel[0].id}`}
                    className="up-next-slate__article">
                    {rel[0].cover_image && (
                      <div className="up-next-slate__image">
                        <img src={rel[0].cover_image} alt={rel[0].title}/>
                      </div>
                    )}
                    <div className="up-next-slate__body">
                      <span className="up-next-slate__eyebrow">Up Next</span>
                      <h3 className="up-next-slate__title">{rel[0].title}</h3>
                      <p className="up-next-slate__meta">
                        {rel[0].author} · {rt(rel[0].content)}
                      </p>
                    </div>
                  </Link>
                  <div className="up-next-slate__sponsored">
                    {/* INSERT SPONSORED UP-NEXT AD CODE HERE */}
                    <span className="up-next-slate__eyebrow
                      up-next-slate__eyebrow--sponsored">Sponsored</span>
                    <h3 className="up-next-slate__title">
                      Sponsored headline goes here
                    </h3>
                    <p className="up-next-slate__copy">
                      Replace with your native ad.
                    </p>
                    <a href="#" className="up-next-slate__cta">Learn More →</a>
                  </div>
                </div>
              )}
            </article>

            <aside className="sidebar">
              {/* SIDEBAR AD */}
              <div className="ad-unit ad-unit--sidebar ad-unit--sticky">
                {/* INSERT SIDEBAR AD CODE HERE */}
              </div>

              {/* NEWSLETTER + SPONSORED BRIEF */}
              <div className="widget widget--newsletter" id="newsletter">
                <div className="sponsored-brief">
                  <span className="sponsored-brief__text">
                    Today's Brief is brought to you by
                  </span>
                  <a href="#" className="sponsored-brief__brand">YourBrand</a>
                </div>
                <div className="widget__icon">✦</div>
                <h3 className="widget__heading">The Meridian Brief</h3>
                <p className="widget__copy">
                  Weekly digest of our best editorial pieces.
                </p>
                <div className="widget__input-group">
                  <input type="email" className="widget__input"
                    placeholder="your@email.com"/>
                  <button className="btn btn--primary w-full">Subscribe</button>
                </div>
              </div>

              {rel.length > 0 && (
                <div className="widget">
                  <p className="widget__title">More to Read</p>
                  <ul className="popular-list">
                    {rel.slice(0, 4).map((p, i) => (
                      <li key={p.id} className="popular-item">
                        <span className="popular-item__rank">{i + 1}</span>
                        <div>
                          <Link href={`/${p.id}`}
                            className="popular-item__title">{p.title}</Link>
                          <p className="popular-item__meta">{rt(p.content)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

          </div>
        </div>
      </main>

      {/* FOOTER LEADERBOARD */}
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