import { useState, useEffect, useRef } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --cream: #FAF6EE;
    --warm-white: #FFF8F0;
    --terracotta: #C4622D;
    --terracotta-light: #E07A48;
    --terracotta-dark: #9E4A1E;
    --amber: #D4952A;
    --charcoal: #1C1A17;
    --charcoal-soft: #3A3630;
    --stone: #8A8075;
    --stone-light: #C5BFB5;
    --sand: #E8DECE;
    --leaf: #4A6741;
    --gold: #C9A227;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--charcoal);
    min-height: 100vh;
  }

  .page { min-height: 100vh; }

  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--warm-white);
    position: relative;
    overflow: hidden;
    padding: 2rem;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 15% 80%, rgba(196,98,45,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 85% 20%, rgba(212,149,42,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(196,98,45,0.04) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.5; pointer-events: none;
  }

  .hero-deco {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(196,98,45,0.12);
  }
  .hero-deco-1 { width: 600px; height: 600px; top: -200px; right: -150px; }
  .hero-deco-2 { width: 400px; height: 400px; bottom: -100px; left: -100px; border-color: rgba(212,149,42,0.10); }

  .hero-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--terracotta);
    margin-bottom: 1.2rem;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .hero-eyebrow::before, .hero-eyebrow::after {
    content: '';
    width: 32px; height: 1px;
    background: var(--terracotta);
    opacity: 0.5;
  }

  .hero-logo {
    font-family: 'Playfair Display', serif;
    font-size: clamp(4rem, 10vw, 7.5rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.03em;
    color: var(--charcoal);
    position: relative;
    text-align: center;
    margin-bottom: 0.5rem;
    animation: fadeUp 0.8s ease both;
  }
  .hero-logo span { color: var(--terracotta); font-style: italic; }

  .hero-tagline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    font-weight: 400;
    font-style: italic;
    color: var(--stone);
    margin-bottom: 3rem;
    text-align: center;
    animation: fadeUp 0.8s 0.15s ease both;
  }

  .search-wrap {
    width: 100%;
    max-width: 680px;
    position: relative;
    animation: fadeUp 0.8s 0.25s ease both;
  }

  .search-bar {
    width: 100%;
    display: flex;
    align-items: center;
    background: white;
    border: 2px solid var(--sand);
    border-radius: 60px;
    padding: 0.5rem 0.5rem 0.5rem 1.8rem;
    box-shadow: 0 8px 40px rgba(196,98,45,0.10), 0 2px 8px rgba(0,0,0,0.06);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .search-bar:focus-within {
    border-color: var(--terracotta);
    box-shadow: 0 8px 40px rgba(196,98,45,0.18), 0 2px 8px rgba(0,0,0,0.08);
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.05rem;
    color: var(--charcoal);
    background: transparent;
    padding: 0.6rem 0;
  }
  .search-input::placeholder { color: var(--stone-light); }

  .search-btn {
    background: var(--terracotta);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 0.75rem 1.8rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.2s, transform 0.1s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .search-btn:hover { background: var(--terracotta-dark); }
  .search-btn:active { transform: scale(0.98); }
  .search-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .hero-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 1.5rem;
    animation: fadeUp 0.8s 0.35s ease both;
  }
  .suggestion-pill {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--stone);
    background: white;
    border: 1px solid var(--sand);
    border-radius: 20px;
    padding: 0.35rem 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .suggestion-pill:hover {
    color: var(--terracotta);
    border-color: var(--terracotta);
    background: rgba(196,98,45,0.04);
  }

  .results-page { min-height: 100vh; background: var(--cream); }

  .results-header {
    background: white;
    border-bottom: 1px solid var(--sand);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  }

  .header-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 900;
    color: var(--charcoal);
    cursor: pointer;
    flex-shrink: 0;
  }
  .header-logo span { color: var(--terracotta); font-style: italic; }

  .header-search-bar {
    flex: 1;
    max-width: 560px;
    display: flex;
    align-items: center;
    background: var(--cream);
    border: 1.5px solid var(--sand);
    border-radius: 50px;
    padding: 0.35rem 0.35rem 0.35rem 1.2rem;
    transition: border-color 0.2s;
  }
  .header-search-bar:focus-within { border-color: var(--terracotta); }

  .header-search-input {
    flex: 1; border: none; outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    color: var(--charcoal);
    background: transparent;
  }

  .header-search-btn {
    background: var(--terracotta);
    color: white;
    border: none;
    border-radius: 40px;
    padding: 0.5rem 1.2rem;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .header-search-btn:hover { background: var(--terracotta-dark); }
  .header-search-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .results-body {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2.5rem;
  }

  .sidebar { position: sticky; top: 90px; height: fit-content; }

  .sidebar-section {
    background: white;
    border-radius: 16px;
    padding: 1.4rem;
    margin-bottom: 1rem;
    border: 1px solid var(--sand);
  }

  .sidebar-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--charcoal);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-pills { display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .filter-pill {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--charcoal-soft);
    background: var(--cream);
    border: 1px solid var(--sand);
    border-radius: 20px;
    padding: 0.28rem 0.75rem;
    cursor: pointer;
    transition: all 0.18s;
  }
  .filter-pill.active, .filter-pill:hover {
    background: var(--terracotta);
    color: white;
    border-color: var(--terracotta);
  }

  .stars-filter { display: flex; flex-direction: column; gap: 0.3rem; }
  .stars-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    padding: 0.2rem 0;
    border-radius: 6px;
    transition: background 0.15s;
  }
  .stars-row:hover { background: rgba(196,98,45,0.06); }
  .stars-row input { accent-color: var(--terracotta); }
  .stars-row span { font-size: 0.82rem; color: var(--stone); }

  .results-count { font-size: 0.82rem; color: var(--stone); margin-bottom: 1.2rem; font-weight: 500; }
  .results-count strong { color: var(--charcoal); }

  .sort-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .sort-label { font-size: 0.8rem; color: var(--stone); font-weight: 500; }
  .sort-btn {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--stone);
    background: white;
    border: 1px solid var(--sand);
    border-radius: 20px;
    padding: 0.3rem 0.85rem;
    cursor: pointer;
    transition: all 0.18s;
  }
  .sort-btn.active {
    color: var(--terracotta);
    border-color: var(--terracotta);
    background: rgba(196,98,45,0.06);
  }

  .section-divider {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin: 1.5rem 0 1rem;
  }
  .section-divider span {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--stone);
    white-space: nowrap;
  }
  .section-divider::before, .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--sand);
  }

  .recipe-grid { display: flex; flex-direction: column; gap: 1.2rem; }

  .recipe-card {
    background: white;
    border: 1px solid var(--sand);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: pointer;
  }
  .recipe-card:hover {
    box-shadow: 0 8px 32px rgba(196,98,45,0.12);
    transform: translateY(-2px);
  }
  .recipe-card.unrated {
    border-style: dashed;
    opacity: 0.92;
  }

  .card-image {
    width: 180px;
    min-height: 160px;
    flex-shrink: 0;
    object-fit: cover;
    background: var(--sand);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  .card-body {
    flex: 1;
    padding: 1.2rem 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-top { flex: 1; }

  .card-source {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.5rem;
  }
  .source-dot {
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--sand);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.55rem;
    font-weight: 700;
    color: var(--stone);
    flex-shrink: 0;
  }
  .source-name {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--stone);
    text-transform: uppercase;
  }

  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--charcoal);
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .card-desc {
    font-size: 0.84rem;
    color: var(--stone);
    line-height: 1.55;
    margin-bottom: 0.8rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .meta-chip {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    color: var(--stone);
    font-weight: 500;
  }

  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.9rem;
    padding-top: 0.9rem;
    border-top: 1px solid var(--sand);
  }

  .web-rating { display: flex; flex-direction: column; gap: 0.15rem; }
  .rating-label { font-size: 0.67rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--stone); }
  .stars-display { display: flex; align-items: center; gap: 0.25rem; }
  .star-icon { font-size: 0.9rem; line-height: 1; }
  .star-icon.filled { color: var(--amber); }
  .star-icon.half { color: var(--amber); opacity: 0.6; }
  .star-icon.empty { color: var(--sand); }
  .rating-num { font-size: 0.85rem; font-weight: 700; color: var(--charcoal); margin-left: 0.2rem; }
  .rating-count { font-size: 0.72rem; color: var(--stone); margin-left: 0.1rem; }

  .unrated-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--stone);
    background: var(--cream);
    border: 1px dashed var(--stone-light);
    border-radius: 20px;
    padding: 0.25rem 0.7rem;
    font-style: italic;
  }

  .your-rating { display: flex; flex-direction: column; gap: 0.15rem; align-items: flex-end; }
  .your-stars { display: flex; gap: 0.15rem; }
  .your-star {
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.1s;
    color: var(--sand);
  }
  .your-star:hover { transform: scale(1.2); }
  .your-star.rated { color: var(--terracotta); }

  .card-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--terracotta);
    text-decoration: none;
    padding: 0.4rem 0.9rem;
    border: 1.5px solid rgba(196,98,45,0.25);
    border-radius: 20px;
    transition: all 0.18s;
    margin-left: auto;
  }
  .card-link-btn:hover {
    background: var(--terracotta);
    color: white;
    border-color: var(--terracotta);
  }

  .rated-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--terracotta);
    background: rgba(196,98,45,0.08);
    border: 1px solid rgba(196,98,45,0.2);
    border-radius: 20px;
    padding: 0.2rem 0.6rem;
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 4rem 2rem;
    text-align: center;
  }
  .loading-spinner {
    width: 48px; height: 48px;
    border: 3px solid var(--sand);
    border-top-color: var(--terracotta);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  .loading-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-style: italic;
    color: var(--stone);
  }
  .loading-sub { font-size: 0.82rem; color: var(--stone-light); }

  .empty-state { text-align: center; padding: 4rem 2rem; color: var(--stone); }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
  .empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--charcoal);
    margin-bottom: 0.5rem;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .recipe-card { animation: slideIn 0.4s ease both; }

  @media (max-width: 768px) {
    .results-body { grid-template-columns: 1fr; }
    .sidebar { position: static; }
    .card-image { width: 120px; min-height: 120px; font-size: 1.8rem; }
    .results-header { flex-wrap: wrap; gap: 0.8rem; }
    .header-logo { font-size: 1.2rem; }
  }
`;

const SUGGESTIONS = [
  "banana bread", "chocolate chip cookies", "chicken tikka masala",
  "beef bourguignon", "sourdough bread", "carbonara pasta"
];

function StarDisplay({ rating, count }) {
  return (
    <div className="stars-display">
      {[1, 2, 3, 4, 5].map(i => {
        const diff = rating - (i - 1);
        const cls = diff >= 1 ? "filled" : diff >= 0.5 ? "half" : "empty";
        return <span key={i} className={`star-icon ${cls}`}>★</span>;
      })}
      <span className="rating-num">{rating.toFixed(1)}</span>
      {count > 0 && <span className="rating-count">({count.toLocaleString()})</span>}
    </div>
  );
}

function YourStars({ value, onRate }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="your-stars">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`your-star ${i <= (hover || value) ? "rated" : ""}`}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={(e) => { e.stopPropagation(); onRate(i); }}
          title={`Rate ${i} star${i > 1 ? "s" : ""}`}
        >★</span>
      ))}
    </div>
  );
}

function RecipeCard({ recipe, userRating, onRate, idx }) {
  const emoji = ["🍞", "🍗", "🍝", "🥧", "🍰", "🥩", "🍜", "🥗", "🍕", "🍪"][idx % 10];
  const isUnrated = recipe.unrated || !recipe.webRating;

  return (
    <div className={`recipe-card ${isUnrated ? "unrated" : ""}`} style={{ animationDelay: `${idx * 0.07}s` }}>
      <div className="card-image">
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
        ) : emoji}
      </div>
      <div className="card-body">
        <div className="card-top">
          <div className="card-source">
            <div className="source-dot">{recipe.source?.[0]?.toUpperCase()}</div>
            <span className="source-name">{recipe.source}</span>
            {isUnrated && <span className="unrated-tag">✦ Be first to rate</span>}
          </div>
          <div className="card-title">{recipe.title}</div>
          <div className="card-desc">{recipe.description}</div>
          <div className="card-meta">
            {recipe.time && <span className="meta-chip">⏱ {recipe.time}</span>}
            {recipe.servings && <span className="meta-chip">👥 {recipe.servings}</span>}
            {recipe.difficulty && <span className="meta-chip">📊 {recipe.difficulty}</span>}
          </div>
        </div>
        <div className="card-bottom">
          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
            <div className="web-rating">
              <span className="rating-label">Web Rating</span>
              {isUnrated
                ? <span style={{ fontSize: "0.82rem", color: "var(--stone-light)", fontStyle: "italic" }}>No rating yet</span>
                : <StarDisplay rating={recipe.webRating} count={recipe.ratingCount} />
              }
            </div>
            <div className="your-rating">
              <span className="rating-label">{isUnrated ? "Rate it first!" : "Your Rating"}</span>
              <YourStars value={userRating || 0} onRate={(v) => onRate(recipe.id, v)} />
              {userRating && <span className="rated-badge">✓ You rated {userRating}★</span>}
            </div>
          </div>
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link-btn"
            onClick={e => e.stopPropagation()}
          >View Recipe ↗</a>
        </div>
      </div>
    </div>
  );
}

async function searchRecipes(query) {
  const response = await fetch(`https://flavorank-backend.onrender.com/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results || [];
}

export default function Flavorank() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRatings, setUserRatings] = useState({});
  const [sortBy, setSortBy] = useState("rating");
  const [minRating, setMinRating] = useState(0);
  const [cookTime, setCookTime] = useState("Any");
  const [difficulty, setDifficulty] = useState("Any");
  const [error, setError] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    if (page === "home" && inputRef.current) inputRef.current.focus();
  }, [page]);

  const handleSearch = async (q) => {
    const term = (q || searchInput).trim();
    if (!term) return;
    setQuery(term);
    setPage("results");
    setLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const results = await searchRecipes(term);
      setRecipes(results);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleRate = (id, stars) => {
    setUserRatings(prev => ({ ...prev, [id]: stars }));
  };

  const parseMins = (timeStr) => {
    if (!timeStr) return null;
    const h = timeStr.match(/(\d+)\s*h/i);
    const m = timeStr.match(/(\d+)\s*m/i);
    let total = 0;
    if (h) total += parseInt(h[1]) * 60;
    if (m) total += parseInt(m[1]);
    if (!h && !m) { const n = timeStr.match(/\d+/); if (n) total = parseInt(n[0]); }
    return total || null;
  };

  const getSorted = () => {
    let r = [...recipes];
    if (minRating > 0) r = r.filter(x => !x.unrated && x.webRating >= minRating);
    if (difficulty !== "Any") r = r.filter(x => x.difficulty === difficulty);
    if (cookTime !== "Any") r = r.filter(x => {
      const mins = parseMins(x.time);
      if (!mins) return false;
      if (cookTime === "< 30 min") return mins < 30;
      if (cookTime === "30–60 min") return mins >= 30 && mins <= 60;
      if (cookTime === "1–2 hrs") return mins > 60 && mins <= 120;
      if (cookTime === "2+ hrs") return mins > 120;
      return true;
    });
    if (sortBy === "rating") r.sort((a, b) => {
      if (a.unrated && !b.unrated) return 1;
      if (!a.unrated && b.unrated) return -1;
      return (b.webRating || 0) - (a.webRating || 0);
    });
    if (sortBy === "votes") r.sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));
    if (sortBy === "yours") r.sort((a, b) => (userRatings[b.id] || 0) - (userRatings[a.id] || 0));
    return r;
  };

  if (page === "home") return (
    <div className="page hero">
      <style>{STYLES}</style>
      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-deco hero-deco-1" />
      <div className="hero-deco hero-deco-2" />
      <div className="hero-eyebrow">Real Recipes. Real Ratings. Real Cooks.</div>
      <h1 className="hero-logo">flavo<span>rank</span></h1>
      <p className="hero-tagline">Search the entire web for top-ranked recipes — then rate them yourself.</p>
      <div className="search-wrap">
        <div className="search-bar">
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search any recipe… banana bread, tikka masala, carbonara…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          <button className="search-btn" onClick={() => handleSearch()}>
            <span>🔍</span> Search
          </button>
        </div>
      </div>
      <div className="hero-suggestions">
        <span style={{ fontSize: "0.78rem", color: "var(--stone)", fontWeight: 500, alignSelf: "center" }}>Try:</span>
        {SUGGESTIONS.map(s => (
          <button key={s} className="suggestion-pill" onClick={() => { setSearchInput(s); handleSearch(s); }}>{s}</button>
        ))}
      </div>
    </div>
  );

  const sorted = getSorted();
  const ratedResults = sorted.filter(r => !r.unrated);
  const unratedResults = sorted.filter(r => r.unrated);

  return (
    <div className="page results-page">
      <style>{STYLES}</style>
      <header className="results-header">
        <div className="header-logo" onClick={() => { setPage("home"); setSearchInput(""); setRecipes([]); }}>
          flavo<span>rank</span>
        </div>
        <div className="header-search-bar">
          <input
            className="header-search-input"
            value={searchInput || query}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Search recipes…"
          />
          <button className="header-search-btn" onClick={() => handleSearch()} disabled={loading}>
            {loading ? "…" : "Search"}
          </button>
        </div>
      </header>

      <div className="results-body">
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">⭐ Min Rating</div>
            <div className="stars-filter">
              {[0, 3, 3.5, 4, 4.5].map(v => (
                <label key={v} className="stars-row">
                  <input type="radio" name="minRating" checked={minRating === v} onChange={() => setMinRating(v)} />
                  <span>{v === 0 ? "All ratings" : `${v}★ & up`}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">🕐 Cook Time</div>
            <div className="filter-pills">
              {["Any", "< 30 min", "30–60 min", "1–2 hrs", "2+ hrs"].map(t => (
                <button key={t} className={`filter-pill ${cookTime === t ? "active" : ""}`} onClick={() => setCookTime(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-title">📊 Difficulty</div>
            <div className="filter-pills">
              {["Any", "Easy", "Medium", "Hard"].map(d => (
                <button key={d} className={`filter-pill ${difficulty === d ? "active" : ""}`} onClick={() => setDifficulty(d)}>{d}</button>
              ))}
            </div>
          </div>
          {Object.keys(userRatings).length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-title">✨ Your Ratings</div>
              <p style={{ fontSize: "0.82rem", color: "var(--stone)" }}>You've rated <strong style={{ color: "var(--terracotta)" }}>{Object.keys(userRatings).length}</strong> recipe{Object.keys(userRatings).length > 1 ? "s" : ""} in this search.</p>
            </div>
          )}
        </aside>

        <main>
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <div className="loading-text">Scouring the web for the best {query} recipes…</div>
              <div className="loading-sub">Aggregating ratings from food blogs, magazines & more</div>
            </div>
          ) : error ? (
            <div className="empty-state">
              <div className="empty-icon">⚠️</div>
              <div className="empty-title">Search failed</div>
              <p>{error}</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍳</div>
              <div className="empty-title">No results yet</div>
              <p>Search for any recipe above to get started.</p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div className="results-count">
                  Found <strong>{sorted.length}</strong> results for "<strong>{query}</strong>"
                  {unratedResults.length > 0 && <span style={{ color: "var(--stone-light)", marginLeft: "0.4rem" }}>({unratedResults.length} unrated)</span>}
                </div>
              </div>
              <div className="sort-row">
                <span className="sort-label">Sort by:</span>
                {[["rating", "Web Rating"], ["votes", "Most Rated"], ["yours", "Your Picks"]].map(([val, label]) => (
                  <button key={val} className={`sort-btn ${sortBy === val ? "active" : ""}`} onClick={() => setSortBy(val)}>{label}</button>
                ))}
              </div>
              <div className="recipe-grid">
                {ratedResults.map((recipe, idx) => (
                  <RecipeCard key={recipe.id} recipe={recipe} userRating={userRatings[recipe.id]} onRate={handleRate} idx={idx} />
                ))}
                {unratedResults.length > 0 && (
                  <>
                    <div className="section-divider">
                      <span>✦ Not yet rated on the web — be the first!</span>
                    </div>
                    {unratedResults.map((recipe, idx) => (
                      <RecipeCard key={recipe.id} recipe={recipe} userRating={userRatings[recipe.id]} onRate={handleRate} idx={ratedResults.length + idx} />
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}