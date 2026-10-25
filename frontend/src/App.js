import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:5000';
const EMPTY_FORM = { name: '', category: 'Tourist Spot', location: '', description: '', budget: 'Low', imageUrl: '' };

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="Lakbay Lokal home">
          <span className="brand-mark" aria-hidden="true">L</span>
          <span>Lakbay <span className="brand-accent">Lokal</span><small>FIND YOUR KIND OF PARADISE</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <div className={`nav-links${menuOpen ? ' nav-links-open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/favorites">Favorites</Link>
          <Link className="nav-admin" to="/admin">Admin <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>
    </header>
  );
}

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> YOUR NEXT GREAT STORY STARTS HERE</span>
          <h1>Find your own<br /><em>island rhythm.</em></h1>
          <p>Little-known coastlines, unforgettable local eats, and stays worth slowing down for. Your Philippines, your way.</p>
          <form className="hero-search" onSubmit={handleSearch}>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              aria-label="Search destinations or locations"
              type="search"
              placeholder="Where do you want to go?"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="button button-primary" type="submit">Find a place <span aria-hidden="true">→</span></button>
          </form>
          <div className="hero-note"><span className="avatar-stack" aria-hidden="true"><i>J</i><i>M</i><i>A</i></span><span>Loved by curious travelers across the islands</span></div>
        </div>
        <div className="hero-caption"><span>01 / 07</span><span className="caption-rule" /> SOUTHERN LEYTE, PHILIPPINES</div>
        <div className="hero-stamp" aria-hidden="true"><span>GO A LITTLE</span><strong>LOCAL</strong><span>COME BACK FULL</span></div>
      </section>

      <section className="intro-section page-shell">
        <div>
          <span className="eyebrow">MADE FOR THE WAY YOU TRAVEL</span>
          <h2>Good trips feel<br /><em>like you found them.</em></h2>
        </div>
        <p>Skip the usual itinerary. Find the places locals love, choose what fits your budget, and make a trip that’s yours from the very first stop.</p>
      </section>

      <section className="discover-strip">
        <div className="discover-copy">
          <span className="eyebrow">A GOOD PLACE TO START</span>
          <h2>There’s more<br />out there.</h2>
          <p>Explore hidden corners, small-town favorites, and the kind of places you’ll tell your friends about.</p>
          <Link className="text-link" to="/explore">Explore all destinations <span aria-hidden="true">→</span></Link>
        </div>
        <div className="discover-photo discover-photo-one"><span className="photo-label">THE COAST IS CALLING</span></div>
        <div className="discover-photo discover-photo-two"><span className="photo-label">TAKE THE LONG WAY</span></div>
      </section>

      <section className="home-bottom page-shell">
        <div><span className="eyebrow">GO ON, MAKE A PLAN</span><h2>Your next favorite place<br />is just around the <em>bend.</em></h2></div>
        <Link className="button button-dark" to="/explore">Start exploring <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}

function ExplorePage() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState(() => new URLSearchParams(window.location.search).get('search') || '');
  const [category, setCategory] = useState('All');
  const [budget, setBudget] = useState('All');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE}/api/destinations`, { params: { search, category, budget } })
      .then((response) => {
        setDestinations(response.data);
        setError('');
      })
      .catch((err) => {
        console.error('Error fetching destinations:', err);
        setError('We couldn’t load destinations right now. Please try again in a moment.');
      });
  }, [search, category, budget]);

  return (
    <main className="page-shell page-content">
      <div className="page-heading">
        <div><span className="eyebrow">THE GOOD STUFF IS OUT THERE</span><h1>Find your <em>somewhere.</em></h1></div>
        <p>From slow mornings by the sea to late-night local favorites, start with what feels right.</p>
      </div>
      <section className="filter-panel" aria-label="Filter destinations">
        <label className="filter-search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search a place or location..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        <label className="select-wrap"><span>GOING FOR</span><select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="All">All categories</option><option value="Tourist Spot">Tourist spot</option><option value="Restaurant">Restaurant</option><option value="Hotel">Hotel</option><option value="Beach">Beach</option>
        </select></label>
        <label className="select-wrap"><span>YOUR BUDGET</span><select aria-label="Filter by budget" value={budget} onChange={(event) => setBudget(event.target.value)}>
          <option value="All">Any budget</option><option value="Low">Low · ₱</option><option value="Medium">Medium · ₱₱</option><option value="High">High · ₱₱₱</option>
        </select></label>
      </section>
      <div className="results-heading"><span>{destinations.length} {destinations.length === 1 ? 'place' : 'places'} to get you started</span><span>MADE FOR YOUR NEXT GETAWAY</span></div>
      {error ? <div className="notice notice-error" role="alert">{error}</div> : destinations.length === 0 ? (
        <div className="empty-state"><span className="empty-icon" aria-hidden="true">⌕</span><h2>No places found just yet.</h2><p>Try another search or change your filters to see what’s out there.</p></div>
      ) : (
        <div className="destination-grid">
          {destinations.map((item, index) => (
            <article className="destination-card" key={item._id}>
              <Link className="card-image-wrap" to={`/destination/${item._id}`} aria-label={`View ${item.name}`}>
                <img src={item.imageUrl} alt={item.name} loading="lazy" />
                <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="category-pill">{item.category}</span>
              </Link>
              <div className="card-body">
                <p className="card-location"><span aria-hidden="true">↗</span> {item.location}</p>
                <h2><Link to={`/destination/${item._id}`}>{item.name}</Link></h2>
                <div className="card-footer"><span>{item.budget} budget</span><Link to={`/destination/${item._id}`}>Take a look <span aria-hidden="true">→</span></Link></div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/api/destinations`)
      .then((response) => {
        const found = response.data.find((item) => item._id === id);
        setDestination(found);
      })
      .catch((err) => console.error('Error fetching destination:', err));
  }, [id]);

  const saveToFavorites = () => {
    const existing = JSON.parse(localStorage.getItem('lakbay_favs')) || [];
    if (!existing.some((favorite) => favorite._id === id)) {
      existing.push(destination);
      localStorage.setItem('lakbay_favs', JSON.stringify(existing));
      setSaved(true);
    } else {
      setSaved(true);
    }
  };

  if (!destination) return <main className="page-shell loading-state"><span className="eyebrow">ONE MOMENT</span><h1>Finding your place...</h1></main>;

  return (
    <main className="page-shell page-content detail-page">
      <Link className="back-link" to="/explore"><span aria-hidden="true">←</span> Back to all places</Link>
      <div className="detail-hero">
        <img src={destination.imageUrl} alt={destination.name} />
        <div className="detail-overlay"><span className="eyebrow">{destination.category} · {destination.budget} BUDGET</span><h1>{destination.name}</h1><p><span aria-hidden="true">↗</span> {destination.location}</p></div>
      </div>
      <section className="detail-info">
        <div><span className="eyebrow">A LITTLE ABOUT THIS PLACE</span><h2>Stay for a while.</h2><p>{destination.description}</p></div>
        <aside className="save-card"><span className="save-star" aria-hidden="true">✳</span><h3>One for the list?</h3><p>Keep this place close for your next island adventure.</p><button className={`button ${saved ? 'button-saved' : 'button-primary'}`} onClick={saveToFavorites}>{saved ? 'Saved to favorites ✓' : 'Save to favorites ♡'}</button></aside>
      </section>
    </main>
  );
}

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('lakbay_favs')) || []);
  }, []);

  const removeFav = (id) => {
    const updated = favorites.filter((item) => item._id !== id);
    setFavorites(updated);
    localStorage.setItem('lakbay_favs', JSON.stringify(updated));
  };

  return (
    <main className="page-shell page-content">
      <div className="page-heading favorites-heading"><div><span className="eyebrow">YOUR LITTLE BLACK BOOK</span><h1>Places to <em>come back to.</em></h1></div><p>All the spots you’ve saved for someday. Someday can be soon.</p></div>
      {favorites.length === 0 ? (
        <div className="empty-state"><span className="empty-icon" aria-hidden="true">♡</span><h2>Your list is waiting.</h2><p>Save a few places you love and they’ll find a home here.</p><Link className="button button-dark" to="/explore">Find a place <span aria-hidden="true">→</span></Link></div>
      ) : (
        <div className="destination-grid">
          {favorites.map((item, index) => (
            <article className="destination-card" key={item._id}>
              <Link className="card-image-wrap" to={`/destination/${item._id}`} aria-label={`View ${item.name}`}><img src={item.imageUrl} alt={item.name} loading="lazy" /><span className="card-number">{String(index + 1).padStart(2, '0')}</span><span className="category-pill">{item.category}</span></Link>
              <div className="card-body"><p className="card-location"><span aria-hidden="true">↗</span> {item.location}</p><h2><Link to={`/destination/${item._id}`}>{item.name}</Link></h2><div className="card-footer"><span>{item.budget} budget</span><button className="remove-button" onClick={() => removeFav(item._id)}>Remove <span aria-hidden="true">×</span></button></div></div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function AdminDashboard() {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const fetchAll = () => {
    axios.get(`${API_BASE}/api/destinations`)
      .then((response) => {
        setDestinations(response.data);
        setError('');
      })
      .catch((err) => {
        console.error('Error fetching destinations:', err);
        setError('Could not load listings. Check that the server is running, then try again.');
      });
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/destinations/${editingId}`, formData);
        setNotice('Your destination has been updated.');
      } else {
        await axios.post(`${API_BASE}/api/destinations`, formData);
        setNotice('Your new destination is live.');
      }
      setEditingId(null);
      setFormData(EMPTY_FORM);
      fetchAll();
    } catch (err) {
      console.error('Error saving destination:', err);
      setError('Your changes could not be saved. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({ ...EMPTY_FORM, ...item });
    setNotice('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this destination record?')) return;
    setError('');
    setNotice('');
    try {
      await axios.delete(`${API_BASE}/api/destinations/${id}`);
      setNotice('The destination has been deleted.');
      fetchAll();
    } catch (err) {
      console.error('Error deleting destination:', err);
      setError('The destination could not be deleted. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  return (
    <main className="page-shell page-content admin-page">
      <div className="page-heading"><div><span className="eyebrow">YOUR CORNER OF THE INTERNET</span><h1>Manage the <em>good stuff.</em></h1></div><p>Add the places worth sharing and keep your destination list up to date.</p></div>
      <div className="admin-layout">
        <section className="admin-form-panel">
          <div className="panel-heading"><span className="eyebrow">{editingId ? 'MAKE IT JUST RIGHT' : 'ADD SOMEWHERE NEW'}</span><h2>{editingId ? 'Edit destination' : 'New destination'}</h2></div>
          {error && <div className="notice notice-error" role="alert">{error}</div>}
          {notice && <div className="notice notice-success" role="status">{notice}</div>}
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>Place name<input type="text" placeholder="e.g. A quiet cove in Southern Leyte" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} required /></label>
            <label>Location<input type="text" placeholder="Town, province" value={formData.location} onChange={(event) => setFormData({ ...formData, location: event.target.value })} required /></label>
            <div className="form-row">
              <label>Category<select value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })}><option value="Tourist Spot">Tourist Spot</option><option value="Restaurant">Restaurant</option><option value="Hotel">Hotel</option><option value="Beach">Beach</option></select></label>
              <label>Budget<select value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })}><option value="Low">Low · ₱</option><option value="Medium">Medium · ₱₱</option><option value="High">High · ₱₱₱</option></select></label>
            </div>
            <label>Image URL<input type="url" placeholder="https://..." value={formData.imageUrl} onChange={(event) => setFormData({ ...formData, imageUrl: event.target.value })} required /></label>
            <label>Tell us about it<textarea placeholder="What makes this place special?" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} required rows="4" /></label>
            <div className="form-actions"><button className="button button-dark" type="submit">{editingId ? 'Save changes' : 'Add destination'} <span aria-hidden="true">→</span></button>{editingId && <button className="button button-quiet" type="button" onClick={cancelEdit}>Cancel</button>}</div>
          </form>
        </section>
        <section className="admin-list-panel">
          <div className="panel-heading list-heading"><div><span className="eyebrow">THE DESTINATION LIST</span><h2>Places you’ve added</h2></div><span className="count-badge">{destinations.length}</span></div>
          {destinations.length === 0 ? <div className="admin-empty">No destinations yet. Add your first place to get started.</div> : (
            <div className="admin-table-wrap"><table className="admin-table">
              <thead><tr><th>PLACE</th><th>CATEGORY</th><th>LOCATION</th><th>BUDGET</th><th>ACTIONS</th></tr></thead>
              <tbody>{destinations.map((item) => <tr key={item._id}><td data-label="Place"><strong>{item.name}</strong></td><td data-label="Category">{item.category}</td><td data-label="Location">{item.location}</td><td data-label="Budget">{item.budget}</td><td data-label="Actions"><div className="table-actions"><button className="edit-button" onClick={() => handleEdit(item)}>Edit</button><button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button></div></td></tr>)}</tbody>
            </table></div>
          )}
        </section>
      </div>
    </main>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="page-shell footer-inner"><Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true">L</span><span>Lakbay <span className="brand-accent">Lokal</span><small>FIND YOUR KIND OF PARADISE</small></span></Link><p>Take the long way. It’s usually the good one.</p><span>© {new Date().getFullYear()} LAKBAY LOKAL</span></div></footer>;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}
