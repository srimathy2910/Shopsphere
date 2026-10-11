import { useState } from 'react'
import { ShoppingBag, Search, Heart, ShoppingCart, Menu, ArrowRight } from 'lucide-react'
import './App.css'

const products = [
{ id: 1, name: 'Classic White Sneakers', category: 'Footwear', price: 2499, emoji: '👟' },
{ id: 2, name: 'Minimalist Watch', category: 'Accessories', price: 3299, emoji: '⌚' },
{ id: 3, name: 'Everyday Backpack', category: 'Accessories', price: 1899, emoji: '🎒' },
{ id: 4, name: 'Premium Headphones', category: 'Electronics', price: 4599, emoji: '🎧' },
{ id: 5, name: 'Classic Sunglasses', category: 'Accessories', price: 1299, emoji: '🕶️' },
{ id: 6, name: 'Casual Hoodie', category: 'Clothing', price: 1999, emoji: '👕' },
{ id: 7, name: 'Running Shoes', category: 'Footwear', price: 2799, emoji: '👟' },
{ id: 8, name: 'Wireless Earbuds', category: 'Electronics', price: 2199, emoji: '🎵' },
]

function App() {
const [search, setSearch] = useState('')
const [category, setCategory] = useState('All')
const [cart, setCart] = useState([])
const [wishlist, setWishlist] = useState([])

const categories = ['All', 'Footwear', 'Accessories', 'Electronics', 'Clothing']

const filteredProducts = products.filter((product) => {
const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
const matchesCategory = category === 'All' || product.category === category
return matchesSearch && matchesCategory
})

const addToCart = (product) => {
setCart((current) => [...current, product])
}

const toggleWishlist = (id) => {
setWishlist((current) =>
current.includes(id)
? current.filter((item) => item !== id)
: [...current, id]
)
}

return ( <div className="app"> <div className="announcement">
FREE SHIPPING ON ORDERS ABOVE ₹2,000 </div>

```
  <header className="navbar">
    <a href="#" className="logo">
      <ShoppingBag size={25} strokeWidth={1.8} />
      <span>shop<span className="logo-accent">sphere.</span></span>
    </a>

    <nav className="nav-links">
      <a href="#home">Home</a>
      <a href="#products">Shop</a>
      <a href="#about">About</a>
    </nav>

    <div className="nav-actions">
      <label className="search-box">
        <Search size={18} />
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </label>

      <button className="icon-button" aria-label={`Wishlist, ${wishlist.length} items`} onClick={() => document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })}>
        <Heart size={21} />
        {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
      </button>

      <button className="icon-button" aria-label={`Shopping cart, ${cart.length} items`} onClick={() => document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' })}>
        <ShoppingCart size={21} />
        {cart.length > 0 && <span className="badge">{cart.length}</span>}
      </button>

      <button className="mobile-menu" aria-label="Shop navigation">
        <Menu size={23} />
      </button>
    </div>
  </header>

  <main>
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="eyebrow">THE NEW EVERYDAY</span>
        <h1>Find your<br />kind of <span>beautiful.</span></h1>
        <p>Thoughtfully selected essentials for the way you live, work, and express yourself.</p>
        <a href="#products" className="primary-button">
          Explore Collection <ArrowRight size={18} />
        </a>
        <div className="hero-note">
          <span className="note-dot"></span>
          NEW SEASON COLLECTION · 2026
        </div>
      </div>

      <div className="hero-art" aria-label="Featured shopping collection">
        <div className="art-circle"></div>
        <div className="art-card art-card-one"><span>✳</span><small>LESS, BUT BETTER.</small></div>
        <div className="art-card art-card-two"><span>◒</span><small>EVERYDAY ICONS.</small></div>
        <div className="art-center">S<br />S<span>.</span></div>
        <div className="art-caption">YOUR STYLE. YOUR STORY.</div>
      </div>
    </section>

    <section className="benefits">
      <div><span>01</span><p>Thoughtfully Curated</p></div>
      <div><span>02</span><p>Quality You Can Feel</p></div>
      <div><span>03</span><p>Simple, Secure Shopping</p></div>
    </section>

    <section className="products-section" id="products">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE COLLECTION</span>
          <h2>Good things, <span>picked for you.</span></h2>
        </div>
        <p>Everyday favourites. Exceptional little details.</p>
      </div>

      <div className="filters">
        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="product-count">{filteredProducts.length} PRODUCTS</span>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <article className="product-card" key={product.id}>
            <div className={`product-image image-${product.id}`}>
              {index < 2 && <span className="product-tag">BESTSELLER</span>}
              <button
                className={`wishlist-button ${wishlist.includes(product.id) ? 'selected' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={19} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
              </button>
              <span className="product-emoji">{product.emoji}</span>
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <div className="product-bottom">
                <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                <button className="add-button" onClick={() => addToCart(product)}>
                  <ShoppingBag size={16} /> Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <span>⌕</span>
          <h3>No products found</h3>
          <p>Try another search or category.</p>
          <button className="primary-button" onClick={() => { setSearch(''); setCategory('All') }}>Clear Filters</button>
        </div>
      )}
    </section>

    <section className="cart-section" id="cart">
      <div>
        <span className="eyebrow">YOUR BAG</span>
        <h2>Your picks, <span>all together.</span></h2>
      </div>
      {cart.length === 0 ? (
        <p className="empty-message">Your cart is waiting for something lovely.</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <div className="cart-item" key={`${product.id}-${index}`}>
              <span className="cart-emoji">{product.emoji}</span>
              <span>{product.name}</span>
              <strong>₹{product.price.toLocaleString('en-IN')}</strong>
              <button className="remove-button" onClick={() => setCart((current) => current.filter((_, i) => i !== index))}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <span>Total</span>
            <strong>₹{cart.reduce((total, product) => total + product.price, 0).toLocaleString('en-IN')}</strong>
          </div>
        </>
      )}
    </section>

    <section className="wishlist-section" id="wishlist">
      <div>
        <span className="eyebrow">SAVED FOR LATER</span>
        <h2>Your little <span>love list.</span></h2>
      </div>
      {wishlist.length === 0 ? (
        <p className="empty-message">Tap the heart on a product to save your favourites.</p>
      ) : (
        <div className="saved-list">
          {products.filter((product) => wishlist.includes(product.id)).map((product) => (
            <div className="saved-item" key={product.id}>
              <span>{product.emoji}</span>
              <div><strong>{product.name}</strong><small>₹{product.price.toLocaleString('en-IN')}</small></div>
              <button onClick={() => addToCart(product)}>Add to bag</button>
              <button onClick={() => toggleWishlist(product.id)} aria-label="Remove from wishlist">×</button>
            </div>
          ))}
        </div>
      )}
    </section>

    <section className="newsletter" id="about">
      <span className="eyebrow">A LITTLE SOMETHING GOOD</span>
      <h2>Good finds. <span>Good feelings.</span></h2>
      <p>Shop thoughtfully. Live beautifully. Welcome to ShopSphere.</p>
      <a href="#products" className="primary-button">Discover Your Favourites <ArrowRight size={18} /></a>
    </section>
  </main>

  <footer className="footer">
    <a href="#home" className="logo"><ShoppingBag size={22} /><span>shop<span className="logo-accent">sphere.</span></span></a>
    <p>Little things. Lovely living.</p>
    <span>© 2026 ShopSphere. Demo storefront.</span>
  </footer>
</div>


)
}

export default App
