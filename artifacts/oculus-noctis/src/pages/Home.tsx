import { useState } from "react";

interface CartItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
  series: string;
}

interface Product {
  id: number;
  series: string;
  name: string;
  price: string;
  priceNum: number;
  longDesc: string;
}

const featuredProducts: Product[] = [
  { id: 1, series: "Silver Ring Collection", name: "Crescent Moon Ring", price: "$28.00", priceNum: 28, longDesc: "Delicately crafted from 925 sterling silver, the Crescent Moon Ring features a slender crescent arc that catches the light beautifully. Each curve is hand-polished to a mirror finish, giving it that distinctive silver shimmer. Perfect for stacking or wearing solo." },
  { id: 2, series: "Silver Ring Collection", name: "Serpent Coil Ring", price: "$35.00", priceNum: 35, longDesc: "Inspired by ancient symbolism, this Serpent Coil Ring wraps around the finger in a graceful spiral. Crafted in oxidized sterling silver for depth and contrast, with polished scales that catch the eye. A bold statement piece." },
  { id: 3, series: "Silver Ring Collection", name: "Obsidian Stone Ring", price: "$42.00", priceNum: 42, longDesc: "A striking contrast of polished silver band with a natural obsidian centerpiece. The deep black stone absorbs the light while the silver frame radiates around it. Handcrafted and one-of-a-kind." },
  { id: 4, series: "Silver Ring Collection", name: "Eternity Band", price: "$55.00", priceNum: 55, longDesc: "A timeless eternity band set with pavé-style silver beads running the full circumference. The uniform shimmer creates an unbroken circle of light. Elegant, minimal, and forever wearable." },
  { id: 5, series: "Silver Necklace Collection", name: "Midnight Drop Pendant", price: "$38.00", priceNum: 38, longDesc: "A sleek teardrop pendant in brushed sterling silver hangs from a delicate 45cm chain. The subtle matte finish gives it a sophisticated, understated look that transitions seamlessly from day to night." },
  { id: 6, series: "Silver Necklace Collection", name: "Celestial Layering Set", price: "$65.00", priceNum: 65, longDesc: "A curated set of three layering necklaces — a simple chain, a moon pendant, and a star burst — designed to be worn together. Each piece is crafted in polished sterling silver and comes at different lengths for perfect layering." },
  { id: 7, series: "Silver Necklace Collection", name: "Raven Feather Choker", price: "$48.00", priceNum: 48, longDesc: "A boldly elegant choker featuring a sculpted raven feather cast in sterling silver. The feather's fine details are highlighted with a partial oxidized finish, creating beautiful shadow and depth." },
  { id: 8, series: "Silver Necklace Collection", name: "Void Circle Pendant", price: "$32.00", priceNum: 32, longDesc: "Minimalism at its finest — a perfect open circle in polished sterling silver. The simple geometry makes a powerful statement. Pair with a classic chain or a delicate cord. Ideal for everyday elegance." },
];

const newProducts: Product[] = [
  { id: 9, series: "Silver Bracelet Collection", name: "Onyx Cuff", price: "$60.00", priceNum: 60, longDesc: "A bold open cuff bracelet in oxidized sterling silver with onyx stone inlay. The juxtaposition of matte black and polished silver creates a dramatic effect. Adjustable for most wrist sizes." },
  { id: 10, series: "Silver Bracelet Collection", name: "Chain Link Bracelet", price: "$45.00", priceNum: 45, longDesc: "Classic chunky chain links rendered in polished sterling silver. Each link is precisely cast and connected by hand. A versatile piece that works alone or layered with other bracelets." },
  { id: 11, series: "Silver Bracelet Collection", name: "Thorned Bangle", price: "$52.00", priceNum: 52, longDesc: "An architectural bangle studded with small spike details that run along the surface. Made from solid sterling silver, it's substantial enough to make a statement without being bulky." },
  { id: 12, series: "Silver Bracelet Collection", name: "Twisted Wire Bracelet", price: "$38.00", priceNum: 38, longDesc: "Three fine silver wires twisted together into a seamless braid. The intertwined structure catches light at every angle, creating a fluid, dynamic shimmer. Simple yet endlessly elegant." },
  { id: 13, series: "Silver Earring Collection", name: "Geometric Drop Earrings", price: "$34.00", priceNum: 34, longDesc: "Angular geometric drops in polished sterling silver that move beautifully with you. The faceted design refracts light in every direction, making even small movements shimmer." },
  { id: 14, series: "Silver Earring Collection", name: "Crescent Hoops", price: "$28.00", priceNum: 28, longDesc: "Sculptural crescent-shaped hoops that sit close to the ear. Crafted in polished sterling silver, they are lightweight yet visually impactful. A modern take on the classic hoop." },
  { id: 15, series: "Silver Earring Collection", name: "Spike Studs", price: "$22.00", priceNum: 22, longDesc: "Small but powerful — sterling silver spike studs with a polished finish. These pair perfectly with any look, from casual to formal. Secure butterfly clasp for all-day comfort." },
  { id: 16, series: "Silver Earring Collection", name: "Noir Drop Dangles", price: "$42.00", priceNum: 42, longDesc: "Elongated dangles with a brushed silver finish, oxidized at the tips to create a gradient from bright silver to deep charcoal. Elegant and dramatic in equal measure." },
];

function ProductCard({ product, onOpenModal }: { product: Product; onOpenModal: (product: Product) => void }) {
  return (
    <div className="pro" onClick={() => onOpenModal(product)}>
      <div className="img-wrapper">
        <img
          src={`https://images.unsplash.com/photo-${[
            "1515562141207-7a88fb7ce338",
            "1605100804763-247f67b3557e",
            "1573408301185-9519f7988ef9",
            "1535632066927-ab7c9ab60908",
            "1611591437281-460bfbe1220a",
            "1506630268641-e8f06f93b13b",
            "1617038260897-41a533f4c6c2",
            "1630019852942-f89202989a59"
          ][product.id % 8]}?w=600&q=80&fit=crop`}
          alt={product.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&fit=crop`;
          }}
        />
      </div>
      <div className="des">
        <span>{product.series}</span>
        <h5>{product.name}</h5>
        <div className="star">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="fas fa-star" />
          ))}
        </div>
        <h4>{product.price}</h4>
      </div>
      <button
        className="cart-btn"
        onClick={(e) => { e.stopPropagation(); onOpenModal(product); }}
        title="Add to cart"
      >
        <i className="fa-solid fa-cart-plus" />
      </button>
    </div>
  );
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowProductModal(true);
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    setCart(prev => {
      const existing = prev.find(i => i.name === selectedProduct.name);
      if (existing) {
        return prev.map(i => i.name === selectedProduct.name ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, {
        name: selectedProduct.name,
        image: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&q=80&fit=crop`,
        quantity,
        price: selectedProduct.priceNum,
        series: selectedProduct.series,
      }];
    });
    setShowProductModal(false);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNewsletter = () => {
    if (newsletterEmail.trim()) {
      alert("Thank you for subscribing to Oculus Noctis!");
      setNewsletterEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div>
      {/* Header */}
      <section id="header">
        <a href="#" className="logo-text">Oculus Noctis</a>
        <div>
          <ul id="navbar">
            <li><a href="#hero">Home</a></li>
            <li><a href="#product1">Shop</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#footer">Contact</a></li>
            <li>
              <button
                className="cart-icon-btn"
                onClick={() => setShowCartModal(true)}
                aria-label="Cart"
              >
                <i className="fa-solid fa-cart-shopping" />
                {cart.length > 0 && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    background: '#c0c0c0', color: '#0a0a0a', borderRadius: '50%',
                    width: '16px', height: '16px', fontSize: '9px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, letterSpacing: 0,
                  }}>
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </section>

      {/* Hero */}
      <section id="hero">
        <div className="hero-label">New Collection 2026</div>
        <h1>WEAR THE<br />NIGHT</h1>
        <h2>Silver accessories crafted for those<br />who embrace the dark aesthetic</h2>
        <button onClick={() => document.getElementById('product1')?.scrollIntoView({ behavior: 'smooth' })}>
          Explore Collection
        </button>
      </section>

      {/* Features */}
      <section id="feature" className="section-p1">
        {[
          { icon: "fa-truck", label: "Free Shipping" },
          { icon: "fa-shield-halved", label: "Secure Order" },
          { icon: "fa-tag", label: "Best Prices" },
          { icon: "fa-gem", label: "925 Silver" },
          { icon: "fa-hand-sparkles", label: "Handcrafted" },
          { icon: "fa-headset", label: "24/7 Support" },
        ].map((f) => (
          <div className="fe-box" key={f.label}>
            <i className={`fa-solid ${f.icon} fe-icon`} />
            <h6>{f.label}</h6>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section id="product1">
        <div className="section-header">
          <h2>Featured Collection</h2>
          <div className="subtitle">Our Bestsellers</div>
        </div>
        <div className="pro-container">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} onOpenModal={openProductModal} />
          ))}
        </div>
      </section>

      {/* About Banner */}
      <section id="about" className="section-m1">
        <h2>Oculus Noctis</h2>
        <h4>
          Crafted for the bold. Worn by the rare. Each piece in our collection is handcrafted from 925 sterling silver, designed to last a lifetime and tell your story.
        </h4>
        <button
          className="normal"
          onClick={() => alert("Oculus Noctis is a silver accessories brand rooted in dark elegance. Every ring, necklace, bracelet, and earring is meticulously crafted from 925 sterling silver. We believe in accessories that make a statement — understated power, timeless craft, and the quiet allure of silver against darkness.")}
        >
          Our Story
        </button>
      </section>

      {/* New Products */}
      <section id="product1" style={{ background: '#0a0a0a' }}>
        <div className="section-header">
          <h2>New Arrivals</h2>
          <div className="subtitle">Just Dropped</div>
        </div>
        <div className="pro-container">
          {newProducts.map(p => (
            <ProductCard key={p.id} product={p} onOpenModal={openProductModal} />
          ))}
        </div>
      </section>

      {/* Collections Banners */}
      <section id="collections">
        <div className="banner-box">
          <div className="box-content">
            <h4>Rings</h4>
            <h2>Coil & Crest</h2>
            <span>Serpent Collection</span>
            <button className="white" onClick={() => alert("Explore our Serpent Ring Collection — bold silver rings inspired by ancient symbolism and dark beauty.")}>
              Discover
            </button>
          </div>
        </div>
        <div className="banner-box">
          <div className="box-content">
            <h4>Necklaces</h4>
            <h2>Void & Light</h2>
            <span>Celestial Series</span>
            <button className="white" onClick={() => alert("Explore the Celestial Necklace Series — pendants and chains that capture the mysteries of the cosmos in sterling silver.")}>
              Discover
            </button>
          </div>
        </div>
      </section>

      {/* More Collections */}
      <section id="more-collections">
        {[
          { sub: "Bracelets", title: "Thorned", desc: "Cuff Series" },
          { sub: "Earrings", title: "Geometric", desc: "Drop Collection" },
          { sub: "Sets", title: "Noir Bundle", desc: "Layering Sets" },
        ].map((b) => (
          <div className="banner-box" key={b.title}>
            <div className="box-content">
              <span>{b.sub}</span>
              <h2>{b.title}</h2>
              <h3>{b.desc}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Stay in the Dark</h4>
          <p>
            Receive exclusive updates, new arrivals, and{" "}
            <span>members-only offers</span>
          </p>
        </div>
        <div className="form">
          <input
            type="email"
            placeholder="Your email address"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNewsletter()}
          />
          <button className="normal" onClick={handleNewsletter}>Subscribe</button>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer">
        <div className="col">
          <div className="footer-brand">Oculus Noctis</div>
          <h4>Contact</h4>
          <p><strong style={{ color: '#909090' }}>Address:</strong> 123 Silver Lane, Noir District</p>
          <p><strong style={{ color: '#909090' }}>Phone:</strong> +1 (555) 234-5678</p>
          <p><strong style={{ color: '#909090' }}>Hours:</strong> 10:00 – 19:00, Mon – Sat</p>
          <div className="follow">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer"><i className="fab fa-pinterest-p" /></a>
            </div>
          </div>
        </div>

        <div className="col">
          <h4>Navigate</h4>
          <a href="#">About Us</a>
          <a href="#">Shipping Info</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="col">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="#">View Cart</a>
          <a href="#">Wishlist</a>
          <a href="#">Track Order</a>
          <a href="#">Support</a>
        </div>

        <div className="col">
          <h4>Craftsmanship</h4>
          <p>All pieces are crafted from 925 sterling silver and individually quality-checked before shipping.</p>
          <p style={{ marginTop: '12px' }}>Free shipping on orders over $100.</p>
          <p style={{ marginTop: '8px' }}>30-day returns guaranteed.</p>
        </div>

        <div className="copyright">
          <p>© 2026 Oculus Noctis — Silver Accessories. All rights reserved.</p>
        </div>
      </footer>

      {/* Product Modal */}
      {showProductModal && selectedProduct && (
        <div
          className={`modal-overlay ${showProductModal ? 'show' : ''}`}
          onClick={(e) => e.target === e.currentTarget && setShowProductModal(false)}
        >
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowProductModal(false)}>&times;</button>
            <div className="modal-body">
              <img
                id="modal-image"
                src={`https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80&fit=crop`}
                alt={selectedProduct.name}
              />
              <div className="modal-details">
                <span className="modal-series">{selectedProduct.series}</span>
                <h2>{selectedProduct.name}</h2>
                <p>{selectedProduct.longDesc}</p>
                <p style={{ color: '#c0c0c0', fontWeight: 600, fontSize: '15px', letterSpacing: '1px', marginTop: '8px' }}>
                  {selectedProduct.price}
                </p>
                <div className="modal-actions">
                  <label htmlFor="modal-quantity">Qty:</label>
                  <input
                    type="number"
                    id="modal-quantity"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                  <button id="add-to-cart-btn" onClick={addToCart}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div
          id="cart-modal"
          className={`modal-overlay ${showCartModal ? 'show' : ''}`}
          onClick={(e) => e.target === e.currentTarget && setShowCartModal(false)}
        >
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowCartModal(false)}>&times;</button>
            <h2>Your Cart</h2>
            <div id="cart-items">
              {cart.length === 0 ? (
                <p className="cart-empty-text">Your cart is empty.</p>
              ) : (
                cart.map((item, i) => (
                  <div className="cart-item" key={i}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(i)}>Remove</button>
                  </div>
                ))
              )}
            </div>
            <div id="cart-total">Total: ${cartTotal.toFixed(2)}</div>
            <button
              id="checkout-btn"
              onClick={() => alert("Checkout functionality coming soon.")}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
