const {
  useState,
  useEffect,
  useMemo
} = React;

// Preloaded Catalog
const INITIAL_PRODUCTS = [{
  "id": 1,
  "title": "Aura Handwoven Khadi Kurta",
  "category": "Kurtas",
  "gender_type": "Men",
  "sizes": ["S", "M", "L", "XL"],
  "color": "Natural Off-White",
  "style": "Ethnic",
  "price": 2499,
  "fabric_type": "Organic Khadi",
  "eco_material_info": "100% Hand-spun Khadi cotton spun on traditional amber charkha. Zero electrical energy used in weaving, colored with raw herbal washes.",
  "carbon_saved_kg": 6.8,
  "water_saved_liters": 2800,
  "eco_score": 98,
  "rating": 4.9,
  "reviews_count": 64,
  "stock": 25,
  "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop&q=80",
  "description": "Breathable, lightweight handwoven khadi kurta for warm climates. Crafted by master weaver collectives in rural India."
}, {
  "id": 2,
  "title": "Terra Hemp Relaxed Trousers",
  "category": "Trousers",
  "gender_type": "Unisex",
  "sizes": ["S", "M", "L", "XL"],
  "color": "Earthy Ochre",
  "style": "Casual",
  "price": 2899,
  "fabric_type": "Hemp Fiber",
  "eco_material_info": "55% Pure Hemp, 45% Organic Cotton. Hemp requires 75% less water than traditional fibers and revitalizes soil nitrogen.",
  "carbon_saved_kg": 7.4,
  "water_saved_liters": 3100,
  "eco_score": 96,
  "rating": 4.8,
  "reviews_count": 52,
  "stock": 30,
  "image_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=700&auto=format&fit=crop&q=80",
  "description": "Relaxed-fit everyday trousers with deep pockets and an elasticated drawstring waistband. Hypoallergenic and antimicrobial."
}, {
  "id": 3,
  "title": "Vriksha Bamboo Linen Midi Dress",
  "category": "Dresses",
  "gender_type": "Women",
  "sizes": ["XS", "S", "M", "L"],
  "color": "Sage Green",
  "style": "Minimalist",
  "price": 3499,
  "fabric_type": "Bamboo Linen",
  "eco_material_info": "100% Closed-loop bamboo linen. Bamboo produces 35% more oxygen than trees and thrives without any synthetic pesticides.",
  "carbon_saved_kg": 8.2,
  "water_saved_liters": 3900,
  "eco_score": 97,
  "rating": 4.9,
  "reviews_count": 89,
  "stock": 20,
  "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=700&auto=format&fit=crop&q=80",
  "description": "Elegant flowing midi dress with clean architectural cuts. Incredibly soft, thermo-regulating bamboo texture."
}, {
  "id": 4,
  "title": "Neelam Botanical Indigo Shirt",
  "category": "Shirts",
  "gender_type": "Men",
  "sizes": ["M", "L", "XL"],
  "color": "Indigo Blue",
  "style": "Casual",
  "price": 2199,
  "fabric_type": "Organic Cotton",
  "eco_material_info": "GOTS certified Indian organic cotton dyed with 100% natural Indigofera tinctoria plant ferment. Zero harmful azodyes.",
  "carbon_saved_kg": 5.2,
  "water_saved_liters": 2400,
  "eco_score": 94,
  "rating": 4.7,
  "reviews_count": 41,
  "stock": 18,
  "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop&q=80",
  "description": "Classic casual mandarin collar shirt. Rich artisanal indigo depth that matures uniquely with every wash."
}, {
  "id": 5,
  "title": "Ahimsa Peace Silk Saree & Wrap",
  "category": "Dresses",
  "gender_type": "Women",
  "sizes": ["Free Size"],
  "color": "Terracotta",
  "style": "Ethnic",
  "price": 5499,
  "fabric_type": "Ahimsa (Peace) Silk",
  "eco_material_info": "Cruelty-free silk reeled only after the moth has naturally hatched and flown away. Handspun and naturally madder-root dyed.",
  "carbon_saved_kg": 9.5,
  "water_saved_liters": 4200,
  "eco_score": 99,
  "rating": 5.0,
  "reviews_count": 38,
  "stock": 12,
  "image_url": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format&fit=crop&q=80",
  "description": "Exquisite non-violent silk drape featuring understated metallic borders. A treasured heirloom for conscious celebrations."
}, {
  "id": 6,
  "title": "Prakriti Hand-Block Printed Tunic",
  "category": "Kurtas",
  "gender_type": "Women",
  "sizes": ["S", "M", "L", "XL"],
  "color": "Mustard Yellow",
  "style": "Bohemian",
  "price": 1999,
  "fabric_type": "Organic Cotton",
  "eco_material_info": "Jaipur hand-block stamped using carved teak wood blocks and turmeric-pomegranate peel non-toxic colors.",
  "carbon_saved_kg": 4.8,
  "water_saved_liters": 2100,
  "eco_score": 93,
  "rating": 4.8,
  "reviews_count": 73,
  "stock": 35,
  "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&auto=format&fit=crop&q=80",
  "description": "Relaxed bohemian tunic featuring heritage floral motifs. Side slits and coconut shell buttons."
}, {
  "id": 7,
  "title": "Zenith Recycled Cotton Blazer",
  "category": "Jackets",
  "gender_type": "Men",
  "sizes": ["M", "L", "XL"],
  "color": "Charcoal Slate",
  "style": "Formal",
  "price": 4899,
  "fabric_type": "Recycled Cotton",
  "eco_material_info": "Post-industrial textile offcuts shredded and respun into structured suiting cloth. Diverts 1.8kg fabric scrap from landfills.",
  "carbon_saved_kg": 11.2,
  "water_saved_liters": 5400,
  "eco_score": 95,
  "rating": 4.7,
  "reviews_count": 29,
  "stock": 15,
  "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=80",
  "description": "Sharp contemporary unstructured blazer tailored with recycled cotton canvas and plant-based corozo buttons."
}, {
  "id": 8,
  "title": "Kala Cotton Workwear Overshirt",
  "category": "Jackets",
  "gender_type": "Unisex",
  "sizes": ["S", "M", "L", "XL"],
  "color": "Natural Off-White",
  "style": "Casual",
  "price": 3199,
  "fabric_type": "Organic Khadi",
  "eco_material_info": "Indigenous rain-fed Kala cotton of Kutch requiring zero chemical fertilizers and zero irrigation.",
  "carbon_saved_kg": 6.9,
  "water_saved_liters": 3300,
  "eco_score": 98,
  "rating": 4.9,
  "reviews_count": 47,
  "stock": 22,
  "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&auto=format&fit=crop&q=80",
  "description": "Heavy-duty textured overshirt with chore jacket patch pockets. Durable, rough-spun yet gentle on sensitive skin."
}, {
  "id": 9,
  "title": "Soma Lotus Stem Silk Shirt",
  "category": "Shirts",
  "gender_type": "Men",
  "sizes": ["S", "M", "L"],
  "color": "Sage Green",
  "style": "Formal",
  "price": 4299,
  "fabric_type": "Ahimsa (Peace) Silk",
  "eco_material_info": "Innovative fiber extracted from harvested lotus stems blended with wild ahimsa silk. Completely biodegradable and luxurious.",
  "carbon_saved_kg": 7.9,
  "water_saved_liters": 3700,
  "eco_score": 99,
  "rating": 4.9,
  "reviews_count": 31,
  "stock": 14,
  "image_url": "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?w=700&auto=format&fit=crop&q=80",
  "description": "Silky crisp luxury formal shirt suitable for boardroom and evening galas. Naturally wrinkle-resistant and breathable."
}, {
  "id": 10,
  "title": "Avani Bohemian Hemp Wrap Skirt",
  "category": "Dresses",
  "gender_type": "Women",
  "sizes": ["XS", "S", "M", "L"],
  "color": "Terracotta",
  "style": "Bohemian",
  "price": 2699,
  "fabric_type": "Hemp Fiber",
  "eco_material_info": "100% Himalayan hemp woven by women's self-help groups in Uttarakhand. Carbon-negative crop cultivation.",
  "carbon_saved_kg": 8.0,
  "water_saved_liters": 3500,
  "eco_score": 97,
  "rating": 4.8,
  "reviews_count": 61,
  "stock": 28,
  "image_url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&auto=format&fit=crop&q=80",
  "description": "Flattering high-waisted wrap skirt with adjustable ribbon tie. Naturally UV-protective and softens with age."
}, {
  "id": 11,
  "title": "Dharti Organic Cotton Chinos",
  "category": "Trousers",
  "gender_type": "Men",
  "sizes": ["30", "32", "34", "36"],
  "color": "Olive Green",
  "style": "Formal",
  "price": 2799,
  "fabric_type": "Organic Cotton",
  "eco_material_info": "100% GOTS Fairtrade combed organic cotton twill. Safe wastewater treatment with zero hazardous effluent release.",
  "carbon_saved_kg": 5.7,
  "water_saved_liters": 2600,
  "eco_score": 95,
  "rating": 4.6,
  "reviews_count": 39,
  "stock": 32,
  "image_url": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700&auto=format&fit=crop&q=80",
  "description": "Smart-casual tailored chinos. Clean flat front styling with pocket linings made of recycled organic offcuts."
}, {
  "id": 12,
  "title": "Maitri Bamboo Minimalist T-Shirt",
  "category": "Shirts",
  "gender_type": "Unisex",
  "sizes": ["XS", "S", "M", "L", "XL"],
  "color": "Natural Off-White",
  "style": "Minimalist",
  "price": 1299,
  "fabric_type": "Bamboo Linen",
  "eco_material_info": "70% Bamboo viscose, 30% organic cotton. Naturally odor resistant and moisture wicking. 100% plastic-free packaging.",
  "carbon_saved_kg": 4.1,
  "water_saved_liters": 1800,
  "eco_score": 94,
  "rating": 4.8,
  "reviews_count": 112,
  "stock": 50,
  "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=700&auto=format&fit=crop&q=80",
  "description": "The ultimate essential tee. Butter-soft skin touch, crew neck, reinforced stitching built to withstand 200+ washes."
}];
const FABRICS_INFO = [{
  "name": "Organic Khadi",
  "carbon": "Near Zero Carbon",
  "water": "3,000 L / kg Saved",
  "desc": "Handspun on amber charkha, zero electricity, empowers rural Indian handloom artisans."
}, {
  "name": "Hemp Fiber",
  "carbon": "Carbon Negative",
  "water": "75% Less Water",
  "desc": "Naturally pest-resistant crop requiring no chemical fertilizers, enriches soil nitrogen."
}, {
  "name": "Bamboo Linen",
  "carbon": "35% More Oxygen",
  "water": "Rain-fed Growth",
  "desc": "Silky soft handfeel, hypoallergenic, thermo-regulating closed-loop production."
}, {
  "name": "Organic Cotton",
  "carbon": "46% Lower CO2",
  "water": "91% Water Saved",
  "desc": "Grown from non-GMO seeds without synthetic insecticides, preserving freshwater reserves."
}, {
  "name": "Ahimsa (Peace) Silk",
  "carbon": "Cruelty-Free",
  "water": "Reclaimed Water",
  "desc": "100% Non-violent silk reeled only after the silkworm naturally transforms and flies as a moth."
}, {
  "name": "Recycled Cotton",
  "carbon": "70% Lower Carbon",
  "water": "5,000 L / kg Saved",
  "desc": "Respun from post-industrial fabric offcuts, closing the circular fashion loop."
}];

// Clean Pure React SVG Icon Component
function Icon({
  name,
  className = "w-4 h-4"
}) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  switch (name) {
    case 'leaf':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 21c0-3 1.9-5.4 5.1-6"
      }));
    case 'droplet':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
      }));
    case 'bag':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 6h18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 10a4 4 0 0 1-8 0"
      }));
    case 'search':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m21 21-4.3-4.3"
      }));
    case 'shield':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m9 12 2 2 4-4"
      }));
    case 'user':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "7",
        r: "4"
      }));
    case 'lock':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "11",
        width: "18",
        height: "11",
        rx: "2",
        ry: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M7 11V7a5 5 0 0 1 10 0v4"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("polyline", {
        points: "20 6 9 17 4 12"
      }));
    case 'plus':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("line", {
        x1: "12",
        y1: "5",
        x2: "12",
        y2: "19"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "5",
        y1: "12",
        x2: "19",
        y2: "12"
      }));
    default:
      return null;
  }
}

// Main VastraVerse Application
function App() {
  const [activeTab, setActiveTab] = useState('shop'); // 'shop', 'fabrics', 'admin', 'login'

  // Stored Session User (Null if logged out)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vastraverse_auth');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Login & Registration state
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('customer');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Catalog & Cart state
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [priceRange, setPriceRange] = useState(6000);

  // Admin New Product Form
  const [newForm, setNewForm] = useState({
    title: '',
    category: 'Kurtas',
    gender_type: 'Men',
    style: 'Ethnic',
    fabric_type: 'Organic Khadi',
    price: 2499,
    stock: 20,
    sizes: ['S', 'M', 'L', 'XL'],
    water_saved_liters: 2800,
    carbon_saved_kg: 6.5,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700',
    description: '',
    eco_material_info: '100% sustainable organic certified fabric.'
  });
  const showToast = message => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3500);
  };

  // Sync products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Login Request (Authenticates against Backend DB)
  const handleLoginSubmit = async e => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        localStorage.setItem('vastraverse_auth', JSON.stringify(data.user));
        showToast(`Welcome back, ${data.user.username}! Signed in as ${data.user.role.toUpperCase()}`);

        // Redirect based on role
        if (data.user.role === 'admin') {
          setActiveTab('admin');
        } else {
          setActiveTab('shop');
        }
      } else {
        setAuthError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setAuthError('Unable to connect to server. Check backend.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Register Request
  const handleRegisterSubmit = async e => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: regUsername.trim(),
          email: regEmail.trim(),
          password: regPassword.trim(),
          role: regRole
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        localStorage.setItem('vastraverse_auth', JSON.stringify(data.user));
        showToast(`Account created! Signed in as ${data.user.role.toUpperCase()}`);
        setActiveTab(data.user.role === 'admin' ? 'admin' : 'shop');
      } else {
        setAuthError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setAuthError('Server error during registration.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vastraverse_auth');
    setActiveTab('shop');
    showToast('Signed out successfully.');
  };

  // Fill Demo Credentials Helper
  const fillCredentials = (uname, pwd) => {
    setLoginUsername(uname);
    setLoginPassword(pwd);
    setAuthError('');
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches = p.title && p.title.toLowerCase().includes(q) || p.fabric_type && p.fabric_type.toLowerCase().includes(q) || p.description && p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedCategory !== 'All' && p.category && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedType !== 'All' && p.gender_type && p.gender_type.toLowerCase() !== selectedType.toLowerCase() && p.gender_type.toLowerCase() !== 'unisex') {
        return false;
      }
      if (selectedFabric !== 'All' && p.fabric_type && p.fabric_type.toLowerCase() !== selectedFabric.toLowerCase()) {
        return false;
      }
      if (p.price && p.price > priceRange) {
        return false;
      }
      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedType, selectedFabric, priceRange]);

  // Cart Management
  const addToCart = (product, size = 'M') => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => item.product.id === product.id && item.size === size ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }
      return [...prev, {
        product,
        size,
        quantity: 1
      }];
    });
    showToast(`Added "${product.title}" to Bag`);
  };
  const updateQuantity = (idx, delta) => {
    setCart(prev => {
      const copy = [...prev];
      copy[idx].quantity += delta;
      return copy.filter(item => item.quantity > 0);
    });
  };
  const cartTotals = useMemo(() => {
    let total = 0;
    let water = 0;
    let carbon = 0;
    let count = 0;
    cart.forEach(item => {
      total += (item.product.price || 0) * item.quantity;
      water += (item.product.water_saved_liters || 2000) * item.quantity;
      carbon += (item.product.carbon_saved_kg || 5) * item.quantity;
      count += item.quantity;
    });
    return {
      total,
      water,
      carbon,
      count
    };
  }, [cart]);
  const handleCheckout = async () => {
    if (!user) {
      setIsCartOpen(false);
      setActiveTab('login');
      showToast('Please sign in to place an order.');
      return;
    }
    if (cart.length === 0) return;
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.id,
          customer_name: user.username,
          customer_email: user.email,
          items: cart.map(i => ({
            title: i.product.title,
            size: i.size,
            price: i.product.price,
            qty: i.quantity
          })),
          total_price: cartTotals.total,
          carbon_saved_total: cartTotals.carbon,
          water_saved_total: cartTotals.water
        })
      });
    } catch (e) {}
    showToast(`🎉 Order Placed! You conserved ${cartTotals.water.toLocaleString()}L of water!`);
    setCart([]);
    setIsCartOpen(false);
  };

  // Admin Actions (CRUD)
  const handleCreateProduct = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newForm)
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(prev => [{
          ...newForm,
          id: data.id || Date.now()
        }, ...prev]);
      }
    } catch (e) {
      setProducts(prev => [{
        ...newForm,
        id: Date.now()
      }, ...prev]);
    }
    showToast('New sustainable clothing added to inventory');
    setIsAddProductModalOpen(false);
  };
  const handleUpdateProduct = async e => {
    e.preventDefault();
    try {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingProduct)
      });
    } catch (e) {}
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    showToast('Product updated successfully');
    setEditingProduct(null);
  };
  const handleDeleteProduct = async id => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {}
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from inventory');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col bg-[#FAF7F2]"
  }, notification && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-6 z-50 bg-earth text-white px-5 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, notification)), /*#__PURE__*/React.createElement("div", {
    className: "bg-earth text-ecru-sand text-xs py-2 px-6 flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "droplet",
    className: "w-3.5 h-3.5 text-blue-300"
  }), /*#__PURE__*/React.createElement("span", null, "Sustainable E-Commerce: Handcrafted Organic & Natural Fibers")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, user ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "Signed in: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-white uppercase"
  }, user.role), " (", user.username, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: handleLogout,
    className: "bg-red-900/60 hover:bg-red-800 text-white px-2.5 py-0.5 rounded text-[11px] font-bold transition ml-1"
  }, "Sign Out")) : /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-neutral-300"
  }, "Guest Visitor"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActiveTab('login');
      setAuthMode('login');
    },
    className: "bg-sage hover:bg-sage-light text-white px-3 py-0.5 rounded text-[11px] font-bold transition"
  }, "Sign In / Role Login")))), /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 cursor-pointer",
    onClick: () => setActiveTab('shop')
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-full bg-earth text-white flex items-center justify-center font-bold"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    className: "w-5 h-5 text-terracotta"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-brand text-2xl font-bold tracking-wider text-earth"
  }, "VASTRAVERSE"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] tracking-widest text-neutral-500 uppercase font-semibold"
  }, "Sustainable Fashion Platform"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('shop'),
    className: `px-4 py-2 rounded-full text-xs font-bold transition ${activeTab === 'shop' ? 'bg-earth text-white' : 'text-neutral-600 hover:text-earth'}`
  }, "Collection"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveTab('fabrics'),
    className: `px-4 py-2 rounded-full text-xs font-bold transition ${activeTab === 'fabrics' ? 'bg-earth text-white' : 'text-neutral-600 hover:text-earth'}`
  }, "Fabric Science"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (!user) {
        setActiveTab('login');
        showToast('Please sign in with an Admin account.');
      } else if (user.role !== 'admin') {
        showToast('Access Denied: Only Admin accounts can access the Admin Console.');
      } else {
        setActiveTab('admin');
      }
    },
    className: `px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 transition ${activeTab === 'admin' ? 'bg-terracotta text-white' : user && user.role === 'admin' ? 'text-terracotta hover:bg-terracotta/10' : 'text-neutral-400 hover:text-neutral-600'}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    className: "w-3.5 h-3.5"
  }), " Admin Console")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative hidden md:block w-48"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search garments...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    className: "w-full bg-neutral-100 border border-neutral-300 rounded-full pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-earth"
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute left-3 top-2.5 text-neutral-400"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsCartOpen(true),
    className: "bg-earth hover:bg-earth-light text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold shadow-sm transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bag",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Bag (", cartTotals.count, ")")), !user && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActiveTab('login');
      setAuthMode('login');
    },
    className: "border border-earth text-earth hover:bg-earth hover:text-white px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    className: "w-3.5 h-3.5"
  }), " Login")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"
  }, activeTab === 'login' && /*#__PURE__*/React.createElement("div", {
    className: "max-w-md mx-auto my-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl p-8 border border-neutral-200 shadow-xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-earth/10 text-earth flex items-center justify-center mx-auto mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    className: "w-6 h-6 text-earth"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "font-serif-luxury text-2xl font-bold text-earth"
  }, authMode === 'login' ? 'Role-Based Sign In' : 'Create Customer Account'), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-neutral-500 mt-1"
  }, authMode === 'login' ? 'Authenticate with your assigned role to access platform features' : 'Register for a sustainable shopping customer profile')), /*#__PURE__*/React.createElement("div", {
    className: "flex bg-neutral-100 p-1 rounded-xl mb-6 text-xs font-bold"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setAuthMode('login');
      setAuthError('');
    },
    className: `flex-1 py-2 rounded-lg transition ${authMode === 'login' ? 'bg-white text-earth shadow-sm' : 'text-neutral-500'}`
  }, "Sign In"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setAuthMode('register');
      setAuthError('');
    },
    className: `flex-1 py-2 rounded-lg transition ${authMode === 'register' ? 'bg-white text-earth shadow-sm' : 'text-neutral-500'}`
  }, "Register")), authError && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium"
  }, authError), authMode === 'login' ? /*#__PURE__*/React.createElement("form", {
    onSubmit: handleLoginSubmit,
    className: "space-y-4 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-1"
  }, "Username"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: loginUsername,
    onChange: e => setLoginUsername(e.target.value),
    placeholder: "e.g. admin or aarav_sharma",
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-earth"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-1"
  }, "Password"), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    value: loginPassword,
    onChange: e => setLoginPassword(e.target.value),
    placeholder: "Enter account password",
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-earth"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: authLoading,
    className: "w-full bg-earth hover:bg-earth-light text-white font-bold py-3 rounded-xl shadow-md transition text-xs mt-2"
  }, authLoading ? 'Verifying with Database...' : 'Sign In with Database'), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 pt-5 border-t border-neutral-100"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold text-neutral-400 block mb-2 uppercase tracking-wider"
  }, "Demo Accounts (Click to Autofill)"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-left"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => fillCredentials('admin', 'admin123'),
    className: "p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl text-[11px] transition"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-terracotta block"
  }, "\uD83D\uDEE1\uFE0F Admin Role"), /*#__PURE__*/React.createElement("span", {
    className: "text-neutral-500"
  }, "admin / admin123")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => fillCredentials('aarav_sharma', 'customer123'),
    className: "p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl text-[11px] transition"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-earth block"
  }, "\uD83D\uDC64 Customer Role"), /*#__PURE__*/React.createElement("span", {
    className: "text-neutral-500"
  }, "aarav / customer123"))))) :
  /*#__PURE__*/
  /* REGISTER FORM */
  React.createElement("form", {
    onSubmit: handleRegisterSubmit,
    className: "space-y-3.5 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-1"
  }, "Username"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: regUsername,
    onChange: e => setRegUsername(e.target.value),
    placeholder: "Choose a username",
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-earth"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-1"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    value: regEmail,
    onChange: e => setRegEmail(e.target.value),
    placeholder: "e.g. user@example.com",
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-earth"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-1"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    required: true,
    value: regPassword,
    onChange: e => setRegPassword(e.target.value),
    placeholder: "Create a password",
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-earth"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-1"
  }, "Account Role"), /*#__PURE__*/React.createElement("select", {
    value: regRole,
    onChange: e => setRegRole(e.target.value),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-xl p-2 text-xs focus:outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: "customer"
  }, "Customer (Shopper)"), /*#__PURE__*/React.createElement("option", {
    value: "admin"
  }, "Administrator (Store Manager)"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: authLoading,
    className: "w-full bg-earth hover:bg-earth-light text-white font-bold py-3 rounded-xl shadow-md transition text-xs mt-2"
  }, authLoading ? 'Creating in Database...' : 'Register Account')))), activeTab === 'shop' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl bg-earth text-white p-8 md:p-12 mb-8 shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-terracotta-light text-xs font-bold uppercase tracking-wider block mb-2"
  }, "Sustainable Fashion E-Commerce"), /*#__PURE__*/React.createElement("h1", {
    className: "font-serif-luxury text-3xl md:text-5xl font-normal leading-tight mb-3"
  }, "Conscious Wardrobes Handcrafted for Tomorrow."), /*#__PURE__*/React.createElement("p", {
    className: "text-neutral-300 text-sm leading-relaxed mb-6 font-light"
  }, "Browse our certified organic khadi, bamboo linen, pure Himalayan hemp, and cruelty-free peace silk apparel. Clean craftsmanship with zero microplastics."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 text-xs font-semibold text-neutral-200"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-400"
  }), " 100% Traceable Fabrics"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-400"
  }), " Safe Herbal Dyes"), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-4 h-4 text-emerald-400"
  }), " Fairtrade Artisans")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row gap-8"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "w-full lg:w-60 shrink-0 bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm h-fit text-xs space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-neutral-100"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-neutral-800 uppercase tracking-wider"
  }, "Filters"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSelectedCategory('All');
      setSelectedType('All');
      setSelectedFabric('All');
      setPriceRange(6000);
      setSearchQuery('');
    },
    className: "text-terracotta hover:underline font-semibold"
  }, "Reset")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-2"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    value: selectedCategory,
    onChange: e => setSelectedCategory(e.target.value),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 focus:outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All Categories"), /*#__PURE__*/React.createElement("option", {
    value: "Kurtas"
  }, "Kurtas"), /*#__PURE__*/React.createElement("option", {
    value: "Shirts"
  }, "Shirts"), /*#__PURE__*/React.createElement("option", {
    value: "Dresses"
  }, "Dresses"), /*#__PURE__*/React.createElement("option", {
    value: "Trousers"
  }, "Trousers"), /*#__PURE__*/React.createElement("option", {
    value: "Jackets"
  }, "Jackets"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-2"
  }, "Fit / Type"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1.5"
  }, ['All', 'Men', 'Women', 'Unisex'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setSelectedType(t),
    className: `py-1.5 px-2 rounded-lg font-medium transition text-center ${selectedType === t ? 'bg-earth text-white font-bold' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`
  }, t)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700 block mb-2"
  }, "Fabric Material"), /*#__PURE__*/React.createElement("select", {
    value: selectedFabric,
    onChange: e => setSelectedFabric(e.target.value),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2 focus:outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All Materials"), /*#__PURE__*/React.createElement("option", {
    value: "Organic Khadi"
  }, "Organic Khadi"), /*#__PURE__*/React.createElement("option", {
    value: "Hemp Fiber"
  }, "Hemp Fiber"), /*#__PURE__*/React.createElement("option", {
    value: "Bamboo Linen"
  }, "Bamboo Linen"), /*#__PURE__*/React.createElement("option", {
    value: "Organic Cotton"
  }, "Organic Cotton"), /*#__PURE__*/React.createElement("option", {
    value: "Ahimsa (Peace) Silk"
  }, "Ahimsa (Peace) Silk"), /*#__PURE__*/React.createElement("option", {
    value: "Recycled Cotton"
  }, "Recycled Cotton"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "font-bold text-neutral-700"
  }, "Max Price"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-earth"
  }, "\u20B9", priceRange.toLocaleString())), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "1200",
    max: "6000",
    step: "200",
    value: priceRange,
    onChange: e => setPriceRange(Number(e.target.value)),
    className: "w-full accent-earth"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center pb-4 mb-6 border-b border-neutral-200 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-neutral-500 font-medium"
  }, "Showing ", /*#__PURE__*/React.createElement("strong", {
    className: "text-earth"
  }, filteredProducts.length), " clothing items")), filteredProducts.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl p-12 text-center border border-neutral-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-neutral-600 font-medium"
  }, "No garments match your selected filters.")) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
  }, filteredProducts.map(product => /*#__PURE__*/React.createElement("div", {
    key: product.id,
    className: "bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer",
    onClick: () => setSelectedProduct(product)
  }, /*#__PURE__*/React.createElement("img", {
    src: product.image_url,
    alt: product.title,
    className: "w-full h-full object-cover product-card-img"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 left-3 bg-white/90 backdrop-blur-md text-earth font-bold text-[10px] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    className: "w-3 h-3 text-sage"
  }), " ", product.fabric_type), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 right-3 bg-blue-900/80 backdrop-blur-md text-white font-semibold text-[10px] px-2 py-0.5 rounded-full shadow-sm"
  }, "\uD83D\uDCA7 ", product.water_saved_liters, "L")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 flex-1 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] uppercase font-bold text-neutral-400 block mb-1"
  }, product.gender_type, " \u2022 ", product.category), /*#__PURE__*/React.createElement("h3", {
    onClick: () => setSelectedProduct(product),
    className: "font-serif-luxury text-base font-bold text-neutral-900 hover:text-earth transition cursor-pointer line-clamp-1 mb-1"
  }, product.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-neutral-500 line-clamp-2 mb-3"
  }, product.description)), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-neutral-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-serif-luxury text-lg font-bold text-earth"
  }, "\u20B9", product.price.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedProduct(product),
    className: "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-full text-xs font-semibold"
  }, "Details"), /*#__PURE__*/React.createElement("button", {
    onClick: () => addToCart(product),
    className: "bg-earth hover:bg-earth-light text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm transition flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3.5 h-3.5"
  }), " Bag")))))))))), activeTab === 'fabrics' && /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center max-w-xl mx-auto mb-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-terracotta text-xs font-bold uppercase tracking-wider block mb-2"
  }, "Sustainable Materials"), /*#__PURE__*/React.createElement("h2", {
    className: "font-serif-luxury text-3xl md:text-4xl font-bold text-earth mb-3"
  }, "Eco-Friendly Fabric Guide"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-neutral-600 leading-relaxed"
  }, "Learn about the natural fibers powering VastraVerse to reduce carbon emissions and freshwater drain.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, FABRICS_INFO.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-full bg-sage/20 text-sage flex items-center justify-center font-bold mb-4"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "leaf",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif-luxury text-xl font-bold text-earth mb-2"
  }, f.name), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5 mb-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between bg-neutral-50 p-2 rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-neutral-500"
  }, "Carbon:"), /*#__PURE__*/React.createElement("strong", {
    className: "text-earth"
  }, f.carbon)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between bg-neutral-50 p-2 rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-neutral-500"
  }, "Freshwater:"), /*#__PURE__*/React.createElement("strong", {
    className: "text-blue-800"
  }, f.water))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-neutral-600 leading-relaxed"
  }, f.desc))))), activeTab === 'admin' && /*#__PURE__*/React.createElement("div", null, !user || user.role !== 'admin' ? /*#__PURE__*/React.createElement("div", {
    className: "max-w-md mx-auto bg-white rounded-3xl p-8 border border-neutral-200 shadow-md text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif-luxury text-xl font-bold text-neutral-800 mb-2"
  }, "Admin Authentication Required"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-neutral-500 mb-6"
  }, "You must be authenticated with an ", /*#__PURE__*/React.createElement("strong", null, "Administrator"), " role to manage inventory and access CRUD operations."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setActiveTab('login');
      setAuthMode('login');
    },
    className: "bg-earth hover:bg-earth-light text-white font-bold text-xs px-6 py-2.5 rounded-full"
  }, "Sign In with Admin Account")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center pb-4 mb-6 border-b border-neutral-200"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-terracotta text-xs font-bold uppercase tracking-wider block"
  }, "Admin Dashboard"), /*#__PURE__*/React.createElement("h2", {
    className: "font-serif-luxury text-3xl font-bold text-earth"
  }, "Clothing Inventory Management")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsAddProductModalOpen(true),
    className: "bg-earth hover:bg-earth-light text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-md transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-4 h-4"
  }), " Add Product")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-neutral-50 border-b border-neutral-100 flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-neutral-700"
  }, "All Catalog Products (", products.length, ")")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-neutral-100 text-neutral-600 uppercase font-bold"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, "Item"), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, "Type"), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, "Fabric"), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, "Price"), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, "Stock"), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4 text-right"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-neutral-100"
  }, products.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id,
    className: "hover:bg-neutral-50 transition"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image_url,
    alt: "",
    className: "w-10 h-10 object-cover rounded-lg shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-neutral-900"
  }, p.title)), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-neutral-700"
  }, p.category), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-neutral-700"
  }, p.gender_type), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 font-medium text-sage-dark"
  }, p.fabric_type), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 font-bold text-earth"
  }, "\u20B9", p.price.toLocaleString()), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 font-semibold"
  }, p.stock, " units"), /*#__PURE__*/React.createElement("td", {
    className: "py-3 px-4 text-right space-x-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingProduct(p),
    className: "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1 rounded font-medium"
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteProduct(p.id),
    className: "bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded font-medium"
  }, "Delete"))))))))))), selectedProduct && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: selectedProduct.image_url,
    alt: "",
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-6 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs text-neutral-400 mb-2"
  }, /*#__PURE__*/React.createElement("span", null, selectedProduct.category, " \u2022 ", selectedProduct.gender_type), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedProduct(null),
    className: "text-neutral-400 hover:text-neutral-700 text-xl font-bold"
  }, "\u2715")), /*#__PURE__*/React.createElement("h3", {
    className: "font-serif-luxury text-2xl font-bold text-neutral-900 mb-1"
  }, selectedProduct.title), /*#__PURE__*/React.createElement("div", {
    className: "font-serif-luxury text-xl font-bold text-earth mb-4"
  }, "\u20B9", selectedProduct.price.toLocaleString()), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-neutral-600 leading-relaxed mb-4"
  }, selectedProduct.description), /*#__PURE__*/React.createElement("div", {
    className: "bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 mb-4 text-xs space-y-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-earth block"
  }, "Eco-Transparency"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-neutral-600"
  }, selectedProduct.eco_material_info), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 pt-1 text-[11px] font-bold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-800"
  }, "\uD83D\uDCA7 ", selectedProduct.water_saved_liters, "L Water Saved"), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-800"
  }, "\uD83C\uDF31 ", selectedProduct.carbon_saved_kg, "kg CO2 Offset")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      addToCart(selectedProduct);
      setSelectedProduct(null);
    },
    className: "w-full bg-earth hover:bg-earth-light text-white font-bold text-sm py-3 rounded-full shadow-lg transition"
  }, "Add to Bag"))))), isCartOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
    onClick: () => setIsCartOpen(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-y-0 right-0 max-w-full flex pl-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 border-b border-neutral-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif-luxury text-xl font-bold text-neutral-900"
  }, "Conscious Bag"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsCartOpen(false),
    className: "text-neutral-400 hover:text-neutral-700 text-xl font-bold"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 p-6 overflow-y-auto space-y-4"
  }, cart.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-center text-xs text-neutral-400 py-12"
  }, "Your bag is empty.") : cart.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex gap-4 p-3 rounded-xl bg-neutral-50 border border-neutral-200"
  }, /*#__PURE__*/React.createElement("img", {
    src: item.product.image_url,
    alt: "",
    className: "w-16 h-20 object-cover rounded-lg shrink-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col justify-between text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-neutral-900"
  }, item.product.title), /*#__PURE__*/React.createElement("span", {
    className: "text-neutral-500 text-[10px]"
  }, item.product.fabric_type, " \u2022 Size: ", item.size)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-earth"
  }, "\u20B9", (item.product.price * item.quantity).toLocaleString()), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-white px-2 py-0.5 rounded border border-neutral-300"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => updateQuantity(idx, -1),
    className: "font-bold text-neutral-500"
  }, "-"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, item.quantity), /*#__PURE__*/React.createElement("button", {
    onClick: () => updateQuantity(idx, 1),
    className: "font-bold text-neutral-500"
  }, "+"))))))), cart.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "p-6 bg-neutral-50 border-t border-neutral-200 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-emerald-900 text-white p-3.5 rounded-xl text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block font-bold text-emerald-200 mb-1"
  }, "Environmental Conserved"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA7 ", cartTotals.water.toLocaleString(), " Liters Freshwater \u2022 \uD83C\uDF31 ", cartTotals.carbon.toFixed(1), " kg CO2")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-neutral-500"
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    className: "font-serif-luxury text-xl font-bold text-earth"
  }, "\u20B9", cartTotals.total.toLocaleString())), /*#__PURE__*/React.createElement("button", {
    onClick: handleCheckout,
    className: "w-full bg-earth hover:bg-earth-light text-white font-bold text-sm py-3.5 rounded-full shadow-lg transition"
  }, "Place Order"))))), isAddProductModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center pb-3 border-b border-neutral-100 mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif-luxury text-xl font-bold text-earth"
  }, "Add Sustainable Clothing"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsAddProductModalOpen(false),
    className: "text-neutral-400 text-xl font-bold"
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleCreateProduct,
    className: "space-y-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: newForm.title,
    onChange: e => setNewForm({
      ...newForm,
      title: e.target.value
    }),
    placeholder: "e.g. Lotus Stem Formal Shirt",
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    value: newForm.category,
    onChange: e => setNewForm({
      ...newForm,
      category: e.target.value
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Kurtas"
  }, "Kurtas"), /*#__PURE__*/React.createElement("option", {
    value: "Shirts"
  }, "Shirts"), /*#__PURE__*/React.createElement("option", {
    value: "Dresses"
  }, "Dresses"), /*#__PURE__*/React.createElement("option", {
    value: "Trousers"
  }, "Trousers"), /*#__PURE__*/React.createElement("option", {
    value: "Jackets"
  }, "Jackets"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Gender / Fit"), /*#__PURE__*/React.createElement("select", {
    value: newForm.gender_type,
    onChange: e => setNewForm({
      ...newForm,
      gender_type: e.target.value
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Men"
  }, "Men"), /*#__PURE__*/React.createElement("option", {
    value: "Women"
  }, "Women"), /*#__PURE__*/React.createElement("option", {
    value: "Unisex"
  }, "Unisex")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Fabric"), /*#__PURE__*/React.createElement("select", {
    value: newForm.fabric_type,
    onChange: e => setNewForm({
      ...newForm,
      fabric_type: e.target.value
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Organic Khadi"
  }, "Organic Khadi"), /*#__PURE__*/React.createElement("option", {
    value: "Hemp Fiber"
  }, "Hemp Fiber"), /*#__PURE__*/React.createElement("option", {
    value: "Bamboo Linen"
  }, "Bamboo Linen"), /*#__PURE__*/React.createElement("option", {
    value: "Organic Cotton"
  }, "Organic Cotton"), /*#__PURE__*/React.createElement("option", {
    value: "Ahimsa (Peace) Silk"
  }, "Ahimsa (Peace) Silk"), /*#__PURE__*/React.createElement("option", {
    value: "Recycled Cotton"
  }, "Recycled Cotton"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Price (\u20B9)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    value: newForm.price,
    onChange: e => setNewForm({
      ...newForm,
      price: Number(e.target.value)
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Image URL"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: newForm.image_url,
    onChange: e => setNewForm({
      ...newForm,
      image_url: e.target.value
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Description"), /*#__PURE__*/React.createElement("textarea", {
    rows: "2",
    value: newForm.description,
    onChange: e => setNewForm({
      ...newForm,
      description: e.target.value
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-neutral-200 flex justify-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setIsAddProductModalOpen(false),
    className: "px-4 py-2 border rounded-full"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-earth text-white font-bold px-6 py-2 rounded-full"
  }, "Save"))))), editingProduct && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center pb-3 border-b border-neutral-100 mb-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-serif-luxury text-xl font-bold text-earth"
  }, "Edit #", editingProduct.id), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditingProduct(null),
    className: "text-neutral-400 text-xl font-bold"
  }, "\u2715")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleUpdateProduct,
    className: "space-y-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: editingProduct.title,
    onChange: e => setEditingProduct({
      ...editingProduct,
      title: e.target.value
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Price (\u20B9)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    required: true,
    value: editingProduct.price,
    onChange: e => setEditingProduct({
      ...editingProduct,
      price: Number(e.target.value)
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "font-bold block mb-1"
  }, "Stock"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: editingProduct.stock,
    onChange: e => setEditingProduct({
      ...editingProduct,
      stock: Number(e.target.value)
    }),
    className: "w-full bg-neutral-50 border border-neutral-300 rounded-lg p-2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-neutral-200 flex justify-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setEditingProduct(null),
    className: "px-4 py-2 border rounded-full"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "bg-earth text-white font-bold px-6 py-2 rounded-full"
  }, "Update"))))), /*#__PURE__*/React.createElement("footer", {
    className: "bg-earth text-ecru-sand py-8 text-center text-xs mt-16 border-t border-neutral-800"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-brand text-sm font-bold tracking-wider text-white mb-1"
  }, "VASTRAVERSE"), /*#__PURE__*/React.createElement("p", {
    className: "text-neutral-400"
  }, "Simple Full-Stack Sustainable Fashion Platform \u2022 React Frontend, Flask REST Backend, SQLite Database")));
}

// Mount React Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/React.createElement(App, null));