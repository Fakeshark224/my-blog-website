export default function Home() {
  return (
    <main className="page">
      
      {/* Top Banner (Uses your shiny new .hero class) */}
      <section className="hero">
        <h1>Meridian Premium Workspace</h1>
        <p>Unlock distraction-free reading and exclusive financial insights.</p>
        <div className="hero-actions">
          <button className="btn btn-primary">Learn More</button>
        </div>
      </section>

      {/* Main Content Split (Automatically creates the left/right columns) */}
      <div className="layout">
        
        {/* Left Side: Articles */}
        <div className="content">
           <div className="category-bar">
             <span className="chip active">LATEST ARTICLES</span>
           </div>
           
           {/* Example Post Card (Matches your CSS grid for images/text) */}
           <article className="post-card">
              <div className="thumbnail">
                 {/* The CSS adds a placeholder color here until you add an actual <img> tag */}
              </div>
              <div className="post-content">
                 <div className="post-meta">
                    <span>01</span>
                 </div>
                 <h2>Your First Blog Post</h2>
                 <p className="post-excerpt">A brief description of what this article is about...</p>
                 <div className="post-footer">
                    <span className="read-more">Read</span>
                 </div>
              </div>
           </article>
        </div>

        {/* Right Side: Sticky Ad Sidebar */}
        {/* The 'aside' tag automatically gets position: sticky from your CSS! */}
        <aside>
          
          {/* The Ad Box (Automatically gets the dashed border and shine animation) */}
          <div className="ad">
            AD PLACEHOLDER
          </div>

          {/* Optional: A sleek newsletter widget to fill out the sidebar */}
          <div className="widget">
            <h3>Newsletter</h3>
            <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '12px' }}>Get the latest updates.</p>
            <input type="email" placeholder="Your email" style={{ marginBottom: '8px' }} />
            <button className="btn btn-primary" style={{ width: '100%' }}>Subscribe</button>
          </div>

        </aside>

      </div>
    </main>
  );
}