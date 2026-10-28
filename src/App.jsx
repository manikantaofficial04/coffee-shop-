import { useEffect, useState } from "react";
import "./App.css";

const coffees = [
  {
    id: 1,
    name: "Caffe Mocha",
    subtitle: "Deep Foam",
    price: "4.53",
    rating: "4.8",
    reviews: 230,
    category: "Macchiato",
    image: "/coffee-mocha.png",
    description:
      "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85 ml of fresh milk. This delicious coffee has a rich aroma and a smooth, creamy texture.",
  },
  {
    id: 2,
    name: "Flat White",
    subtitle: "Espresso",
    price: "3.53",
    rating: "4.8",
    reviews: 180,
    category: "Latte",
    image: "/flat-white.png",
    description:
      "Flat White is a smooth coffee made with espresso and steamed milk. It has a rich coffee flavour, a silky texture and a delicious layer of milk foam.",
  },
  {
    id: 3,
    name: "Cappuccino",
    subtitle: "Classic Blend",
    price: "4.20",
    rating: "4.9",
    reviews: 195,
    category: "Macchiato",
    image: "/cappuccino.png",
    description:
      "Cappuccino combines espresso, steamed milk and a delicate layer of milk foam. Enjoy the balanced flavour and creamy texture in every sip.",
  },
  {
    id: 4,
    name: "Coffee Latte",
    subtitle: "Rich Taste",
    price: "4.50",
    rating: "4.8",
    reviews: 210,
    category: "Latte",
    image: "/coffee-latte.png",
    description:
      "Coffee Latte is a delicious blend of espresso and steamed milk. Its smooth texture and rich aroma make it a perfect drink for coffee lovers.",
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="7" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h5m4 0h7M4 17h9m4 0h3" />
      <circle cx="11" cy="7" r="2" />
      <circle cx="15" cy="17" r="2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 8.8c0 4.2-8.8 10.2-8.8 10.2S3.2 13 3.2 8.8A4.7 4.7 0 0 1 12 6.4a4.7 4.7 0 0 1 8.8 2.4Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
      <path d="M10 21h4" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function App() {
  const [screen, setScreen] = useState("welcome");
  const [orderType, setOrderType] = useState("Deliver");
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [trackingStage, setTrackingStage] = useState(0);
  const [selectedCoffee, setSelectedCoffee] = useState(coffees[0]);
  const [category, setCategory] = useState("All Coffee");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Bilzen, Tanjungbalai");
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("Recommended");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Welcome to Coffee Shop!", message: "Explore your favourite coffees and discover something new.", time: "Just now", unread: true },
    { id: 2, title: "Special coffee offer", message: "Your next coffee break is waiting. Check out today’s menu!", time: "Today", unread: true },
    { id: 3, title: "Delivery updates", message: "Order tracking and delivery details will appear here when available.", time: "Today", unread: true }
  ]);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedSize, setSelectedSize] = useState("M");
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("coffee-dark-theme", darkTheme);
    return () => document.body.classList.remove("coffee-dark-theme");
  }, [darkTheme]);

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesSearch = coffee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All Coffee" || coffee.category === category;

    const matchesFavorites =
      activeTab !== "favorites" ||
      favorites.some((item) => item.id === coffee.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  }).sort((a, b) => {
    if (sortOrder === "Price: Low to High") return Number(a.price) - Number(b.price);
    if (sortOrder === "Price: High to Low") return Number(b.price) - Number(a.price);
    if (sortOrder === "Rating") return Number(b.rating) - Number(a.rating);
    return a.id - b.id;
  });

  function openDetails(coffee) {
    setSelectedCoffee(coffee);
    setSelectedSize("M");
    setReadMore(false);
    setScreen("details");
    window.scrollTo(0, 0);
  }

  function addToCart(coffee, size = "M") {
    setCart((previous) => [...previous, { ...coffee, size }]);
    alert(`${coffee.name} added to cart!`);
  }

  function toggleFavorite(coffee) {
    setFavorites((previous) =>
      previous.some((item) => item.id === coffee.id)
        ? previous.filter((item) => item.id !== coffee.id)
        : [...previous, coffee]
    );
  }

  function openTab(tab) {
    setActiveTab(tab);

    if (tab === "home" || tab === "favorites") {
      setScreen("home");
    }

    if (tab === "cart") {
      setScreen("cart");
    }

    if (tab === "notifications") {
      setScreen("home");
      setNotificationsOpen(true);
    }

    window.scrollTo(0, 0);
  }

  return (
    <>
      {/* ONBOARDING PAGE */}
      {screen === "welcome" && (
        <main className="welcome-screen">
          <img
            className="welcome-image"
            src="/onboarding-coffee.jpg"
            alt="Coffee cup"
          />

          <div className="welcome-overlay" />

          <div className="welcome-content">
            <h1>Fall in Love with Coffee in Blissful Delight!</h1>

            <p className="welcome-description">
              Welcome to our cozy coffee corner, where every cup is a
              delightful for you.
            </p>

            <button
              className="main-button"
              onClick={() => setScreen("home")}
            >
              Get Started
            </button>
          </div>
        </main>
      )}

      {/* HOME PAGE */}
      {screen === "home" && (
        <main className="home-screen">
          <header className="home-header">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDarkTheme((current) => !current)}
              aria-label={darkTheme ? "Switch to light theme" : "Switch to dark theme"}
              title={darkTheme ? "Light theme" : "Dark theme"}
            >
              {darkTheme ? "☀️" : "🌙"}
            </button>
            <p className="location-label">Location</p>

            <button
              type="button"
              className="location-name location-trigger"
              onClick={() => {
                setLocationSearch("");
                setLocationModalOpen(true);
              }}
              aria-label="Change delivery location"
            >
              {location} <span>⌄</span>
            </button>

            <div className="search-row">
              <div className="search-box">
                <SearchIcon />

                <input
                  type="search"
                  placeholder="Search coffee"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search coffee"
                />
              </div>

              <button
                className="filter-button"
                aria-label="Open filters"
                onClick={() => setFilterModalOpen(true)}
              >
                <FilterIcon />
              </button>
            </div>
          </header>

          <section className="promo-banner">
            <img
              className="promo-background"
              src="/promo-coffee.png"
              alt="Coffee promotion"
            />
          </section>

          <section className="menu-area">
            {activeTab === "favorites" ? (
              <h2 className="section-title">My Wishlist ❤️</h2>
            ) : (
              <div className="category-row">
                {["All Coffee", "Macchiato", "Latte", "Americano"].map(
                  (item) => (
                    <button
                      key={item}
                      className={
                        category === item ? "category active" : "category"
                      }
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}

            <div className="product-grid">
              {filteredCoffees.map((coffee) => (
                <article className="product-card" key={coffee.id}>
                  <div className="product-image">
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      onClick={() => openDetails(coffee)}
                    />

                    {coffee.id <= 2 && (
                      <span className="rating">
                        <span className="rating-star">★</span>
                        {coffee.rating}
                      </span>
                    )}

                    <button
                      className={
                        favorites.some((item) => item.id === coffee.id)
                          ? "favorite-button selected"
                          : "favorite-button"
                      }
                      aria-label="Toggle wishlist"
                      onClick={() => toggleFavorite(coffee)}
                    >
                      <HeartIcon />
                    </button>
                  </div>

                  <h3
                    className="clickable-title"
                    onClick={() => openDetails(coffee)}
                  >
                    {coffee.name}
                  </h3>

                  <p>{coffee.subtitle}</p>

                  <div className="product-footer">
                    <strong>${coffee.price}</strong>

                    <button
                      className="add-button"
                      aria-label={`Add ${coffee.name} to cart`}
                      onClick={() => addToCart(coffee)}
                    >
                      +
                    </button>
                  </div>
                </article>
              ))}

              {filteredCoffees.length === 0 && (
                <p className="empty-message">
                  {activeTab === "favorites"
                    ? "Your wishlist is empty. Tap a heart to save coffee!"
                    : "No coffee found."}
                </p>
              )}
            </div>
          </section>

          {notificationsOpen && (
            <div className="location-modal-backdrop" onClick={() => setNotificationsOpen(false)}>
              <section
                className="location-modal notifications-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="notifications-title"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="location-modal-heading">
                  <div>
                    <h2 id="notifications-title">Notifications</h2>
                    <p className="notifications-subtitle">Offers and coffee shop updates</p>
                  </div>
                  <button type="button" aria-label="Close notifications" onClick={() => setNotificationsOpen(false)}>×</button>
                </div>

                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <article
                      className={notification.unread ? "notification-card unread" : "notification-card"}
                      key={notification.id}
                    >
                      <span className="notification-icon">
                        {notification.id === 1 ? "☕" : notification.id === 2 ? "🎁" : "🛵"}
                      </span>
                      <div className="notification-copy">
                        <div className="notification-title-row">
                          <h3>{notification.title}</h3>
                          {notification.unread && <span className="notification-unread-dot" />}
                        </div>
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="notification-actions">
                  <button
                    type="button"
                    className="filter-reset"
                    onClick={() => setNotifications((items) => items.map((item) => ({ ...item, unread: false })))}
                  >
                    Mark all as read
                  </button>
                  <button type="button" className="filter-apply" onClick={() => setNotificationsOpen(false)}>
                    Done
                  </button>
                </div>
              </section>
            </div>
          )}

          {filterModalOpen && (
            <div className="location-modal-backdrop" onClick={() => setFilterModalOpen(false)}>
              <section
                className="location-modal filter-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="filter-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="location-modal-heading">
                  <h2 id="filter-modal-title">Filter Coffee</h2>
                  <button type="button" aria-label="Close" onClick={() => setFilterModalOpen(false)}>×</button>
                </div>
                <h3 className="filter-group-title">Category</h3>
                <div className="filter-category-options">
                  {["All Coffee", "Macchiato", "Latte", "Americano"].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={category === item ? "filter-chip selected" : "filter-chip"}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <h3 className="filter-group-title">Sort by</h3>
                <div className="filter-sort-options">
                  {["Recommended", "Rating", "Price: Low to High", "Price: High to Low"].map((item) => (
                    <label key={item} className="filter-sort-option">
                      <input type="radio" name="coffee-sort" checked={sortOrder === item} onChange={() => setSortOrder(item)} />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <div className="filter-actions">
                  <button type="button" className="filter-reset" onClick={() => { setCategory("All Coffee"); setSearch(""); setSortOrder("Recommended"); }}>Reset</button>
                  <button type="button" className="filter-apply" onClick={() => setFilterModalOpen(false)}>Apply Filters</button>
                </div>
              </section>
            </div>
          )}

          {locationModalOpen && (
            <div className="location-modal-backdrop" onClick={() => setLocationModalOpen(false)}>
              <section
                className="location-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="location-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="location-modal-heading">
                  <h2 id="location-modal-title">Choose Location</h2>
                  <button type="button" aria-label="Close" onClick={() => setLocationModalOpen(false)}>×</button>
                </div>
                <input
                  className="location-search-input"
                  type="text"
                  placeholder="Search city or area"
                  value={locationSearch}
                  onChange={(event) => setLocationSearch(event.target.value)}
                  autoFocus
                />
                <div className="location-options">
                  {[
                    "Bilzen, Tanjungbalai",
                    "Ongole, Andhra Pradesh",
                    "Vijayawada, Andhra Pradesh",
                    "Hyderabad, Telangana",
                    "Visakhapatnam, Andhra Pradesh",
                    "Bengaluru, Karnataka"
                  ]
                    .filter((item) => item.toLowerCase().includes(locationSearch.toLowerCase()))
                    .map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={location === item ? "location-option selected" : "location-option"}
                        onClick={() => {
                          setLocation(item);
                          setLocationModalOpen(false);
                        }}
                      >
                        <span className="location-option-pin">⌖</span>
                        <span>{item}</span>
                        {location === item && <strong>✓</strong>}
                      </button>
                    ))}
                  {[
                    "Bilzen, Tanjungbalai",
                    "Ongole, Andhra Pradesh",
                    "Vijayawada, Andhra Pradesh",
                    "Hyderabad, Telangana",
                    "Visakhapatnam, Andhra Pradesh",
                    "Bengaluru, Karnataka"
                  ].filter((item) => item.toLowerCase().includes(locationSearch.toLowerCase())).length === 0 && (
                    <p className="location-no-results">No locations found. Try another city or area.</p>
                  )}
                </div>
                <p className="location-modal-note">Choose a location to update your delivery area.</p>
              </section>
            </div>
          )}

          <BottomNavigation activeTab={activeTab} openTab={openTab} cartCount={cart.length} wishlistCount={favorites.length} />
        </main>
      )}

      {/* COFFEE DETAIL PAGE */}
      {screen === "details" && (
        <main className="detail-screen">
          <header className="detail-header">
            <button
              className="back-button"
              aria-label="Go back"
              onClick={() => setScreen("home")}
            >
              <BackIcon />
            </button>

            <h2>Detail</h2>

            <button
              className={
                favorites.some((item) => item.id === selectedCoffee.id)
                  ? "detail-wishlist selected"
                  : "detail-wishlist"
              }
              aria-label="Toggle wishlist"
              onClick={() => toggleFavorite(selectedCoffee)}
            >
              <HeartIcon />
            </button>
          </header>

          <div className="detail-content">
            <img
              className="detail-coffee-image"
              src={selectedCoffee.image}
              alt={selectedCoffee.name}
            />

            <section className="detail-product-info">
              <h1>{selectedCoffee.name}</h1>

              <div className="detail-subtitle-row">
                <span>Ice/Hot</span>

                <div className="detail-options">
                  <span title="Coffee preparation">♨</span>
                  <span title="Coffee beans">◉</span>
                  <span title="Milk">▤</span>
                </div>
              </div>

              <div className="detail-rating">
                <span className="detail-star">★</span>
                <strong>{selectedCoffee.rating}</strong>
                <span className="review-count">
                  ({selectedCoffee.reviews})
                </span>
              </div>
            </section>

            <div className="detail-divider" />

            <section className="description-section">
              <h3>Description</h3>

              <p className={readMore ? "description expanded" : "description"}>
                {selectedCoffee.description}
              </p>

              <button
                className="read-more-button"
                onClick={() => setReadMore((previous) => !previous)}
              >
                {readMore ? "Read Less" : "Read More"}
              </button>
            </section>

            <section className="size-section">
              <h3>Size</h3>

              <div className="size-options">
                {["S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    className={
                      selectedSize === size ? "size-button selected" : "size-button"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <footer className="buy-footer">
            <div className="price-block">
              <span>Price</span>
              <strong>${selectedCoffee.price}</strong>
            </div>

            <button
              className="buy-button"
              onClick={() => {
                addToCart(selectedCoffee, selectedSize);
                setScreen("order");
              }}
            >
              Buy Now
            </button>
          </footer>
        </main>
      )}

      {/* CART PAGE */}
      {screen === "cart" && (
        <main className="cart-screen">
          <header className="cart-header">
            <button
              className="back-button"
              onClick={() => setScreen("home")}
              aria-label="Back to home"
            >
              <BackIcon />
            </button>
            <h2>My Cart</h2>
            <span />
          </header>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <BagIcon />
              <h3>Your cart is empty</h3>
              <p>Add your favourite coffee to get started.</p>
              <button
                className="buy-button"
                onClick={() => setScreen("home")}
              >
                Explore Coffee
              </button>
            </div>
          ) : (
            <div className="cart-list">
              {cart.map((item, index) => (
                <article className="cart-item" key={`${item.id}-${index}`}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <strong>${item.price}</strong>
                  </div>

                  <button
                    className="remove-cart-button"
                    onClick={() =>
                      setCart((previous) =>
                        previous.filter((_, itemIndex) => itemIndex !== index)
                      )
                    }
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>
                </article>
              ))}

              <button
                className="buy-button checkout-button"
                onClick={() => setScreen("order")}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </main>
      )}

      {/* ORDER PAGE */}
      {screen === "order" && (
        <main className="order-screen">
          <header className="order-header">
            <button
              className="back-button"
              aria-label="Back"
              onClick={() => setScreen("cart")}
            >
              <BackIcon />
            </button>
            <h2>Order</h2>
            <span />
          </header>

          <div className="order-type-toggle">
            {["Deliver", "Pick Up"].map((type) => (
              <button
                key={type}
                className={orderType === type ? "order-type active" : "order-type"}
                onClick={() => setOrderType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {orderType === "Deliver" && (
            <section className="delivery-section">
              <h3>Delivery Address</h3>
              <strong>Jl. Kpg Sutoyo</strong>
              <p>Kpg. Sutoyo No. 18, Kec. Medan Sunggal</p>
              <div className="address-actions">
                <button onClick={() => alert("Address editing can be connected next.")}>✎ Edit Address</button>
                <button onClick={() => setOrderNote((note) => note || "Please call when you arrive.")}>＋ Add Note</button>
              </div>
            </section>
          )}

          <div className="order-divider" />

          <section className="order-items-section">
            <h3>Order</h3>
            {(cart.length ? cart : [{ ...selectedCoffee, size: selectedSize }]).map((item, index) => (
              <article className="order-item" key={`${item.id}-${index}`}>
                <img src={item.image} alt={item.name} />
                <div className="order-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.subtitle}</p>
                  <strong>${item.price}</strong>
                </div>
                <div className="quantity-controls">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => {
                      if (cart.length) {
                        setCart((previous) => previous.filter((_, i) => i !== index));
                      }
                    }}
                  >−</button>
                  <span>1</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setCart((previous) => [...previous, { ...item }])}
                  >＋</button>
                </div>
              </article>
            ))}
          </section>

          <button className="discount-row" onClick={() => alert("Discount selection coming soon.")}>
            <span>▣  1 Discount is applied</span>
            <span>›</span>
          </button>

          <section className="payment-summary">
            <h3>Payment Summary</h3>
            <div><span>Price</span><strong>${(cart.length ? cart : [{ ...selectedCoffee }]).reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)}</strong></div>
            <div><span>Delivery Fee</span><strong>$1.00</strong></div>
          </section>

          <section className="payment-method-section">
            <h3>Payment Method</h3>
            <button className="payment-method" onClick={() => setPaymentMethod(paymentMethod === "Cash" ? "Wallet" : "Cash")}>
              <span className="payment-icon">{paymentMethod === "Cash" ? "💵" : "👛"}</span>
              <span>{paymentMethod}</span>
              <span className="payment-chevron">⌄</span>
            </button>
          </section>

          {orderNote && (
            <p className="order-note">Note: {orderNote}</p>
          )}

          <footer className="place-order-footer">
            <div className="price-block">
              <span>Total Payment</span>
              <strong>${((cart.length ? cart : [{ ...selectedCoffee }]).reduce((sum, item) => sum + Number(item.price), 0) + (orderType === "Deliver" ? 1 : 0)).toFixed(2)}</strong>
            </div>
            <button
              className="buy-button"
              onClick={() => {
                setTrackingStage(0);
                setScreen("tracking");
              }}
            >
              Order
            </button>
          </footer>
        </main>
      )}

      {/* DELIVERY TRACKING PAGE */}
      {screen === "tracking" && (
        <main className="tracking-screen tracking-reference-layout">
          <section className="tracking-map">
            <iframe
              className="real-map-frame"
              title="Delivery route map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=99.77%2C2.95%2C99.83%2C3.00&layer=mapnik&marker=2.975%2C99.80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="tracking-map-controls">
              <button
                type="button"
                className="tracking-back"
                aria-label="Go back to order"
                onClick={() => setScreen("order")}
              >
                <BackIcon />
              </button>
              <button
                type="button"
                className="tracking-location"
                aria-label="Current location"
                title="Current location"
              >
                ⌖
              </button>
            </div>
            <img className="tracking-route-image" src="/tracking-route.png" alt="" aria-hidden="true" />
            <img className="tracking-destination-pin" src="/delivery-location.png" alt="Delivery destination" />
            <span className="delivery-scooter tracking-red-scooter" aria-label="Delivery scooter">🛵</span>
          </section>
          <button className="tracking-panel-image-button" onClick={() => setTrackingStage((stage) => (stage >= 2 ? 0 : stage + 1))} aria-label="Update delivery status">
            <img className="tracking-panel-reference-image" src="/detail-driver.png" alt={`Delivery status: ${trackingStage === 0 ? "10 minutes left" : trackingStage === 1 ? "5 minutes left" : "Arrived at your location"}. Courier Brooklyn Simmons.`} />
          </button>
        </main>
      )}
    </>
  );
}

function BottomNavigation({ activeTab, openTab, cartCount, wishlistCount }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button
        className={activeTab === "home" ? "nav-item active" : "nav-item"}
        aria-label="Home"
        onClick={() => openTab("home")}
      >
        <HomeIcon />
        <span className="active-indicator" />
      </button>

      <button
        className={activeTab === "favorites" ? "nav-item active" : "nav-item"}
        aria-label={`Wishlist, ${wishlistCount} saved items`}
        onClick={() => openTab("favorites")}
      >
        <span className="nav-bag-icon">
          <HeartIcon />
          {wishlistCount > 0 && <span className="bag-count">{wishlistCount}</span>}
        </span>
        <span className="active-indicator" />
      </button>

      <button
        className={activeTab === "cart" ? "nav-item active" : "nav-item"}
        aria-label={`Shopping bag, ${cartCount} items`}
        onClick={() => openTab("cart")}
      >
        <span className="nav-bag-icon">
          <BagIcon />
          {cartCount > 0 && <span className="bag-count">{cartCount}</span>}
        </span>
        <span className="active-indicator" />
      </button>

      <button
        className="nav-item"
        aria-label="Notifications"
        onClick={() => openTab("notifications")}
      >
        <BellIcon />
      </button>
    </nav>
  );
}

export default App;