
const products = [
    {
        id: 1,
        name: "Rose Elegance",
        category: "women",
        type: "Floral & Sweet",
        price: 285000,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500",
        best: true
    },
    {
        id: 2,
        name: "Midnight Oud",
        category: "men",
        type: "Woody & Spicy",
        price: 350000,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500",
        best: true
    },
    {
        id: 3,
        name: "Vanilla Dream",
        category: "women",
        type: "Vanilla & Creamy",
        price: 275000,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        best: true
    },
    {
        id: 4,
        name: "Ocean Breeze",
        category: "men",
        type: "Fresh & Aquatic",
        price: 320000,
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500",
        best: true
    },
    {
        id: 5,
        name: "Cherry Blossom",
        category: "women",
        type: "Floral & Fruity",
        price: 260000,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500",
        best: false
    },
    {
        id: 6,
        name: "Royal Amber",
        category: "unisex",
        type: "Amber & Warm",
        price: 390000,
        image: "https://images.unsplash.com/photo-1592945403407-9caf93068c2b?w=500",
        best: false
    },
    {
        id: 7,
        name: "Golden Musk",
        category: "unisex",
        type: "Soft & Musk",
        price: 310000,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500",
        best: false
    },
    {
        id: 8,
        name: "Sweet Peony",
        category: "women",
        type: "Floral & Powdery",
        price: 290000,
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500",
        best: false
    },
    {
        id: 9,
        name: "Black Velvet",
        category: "men",
        type: "Dark & Woody",
        price: 375000,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500",
        best: false
    },
    {
        id: 10,
        name: "White Jasmine",
        category: "unisex",
        type: "Fresh & Floral",
        price: 295000,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
        best: false
    }
];

let cart = [];

const rupiah = value =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);

// RENDER PRODUCT

function renderProducts(list, containerId) {
    const container = document.getElementById(containerId);

    container.innerHTML = list.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.best ? '<span class="best-label">BEST SELLER</span>' : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>

            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p>${product.type}</p>

                <div class="product-bottom">
                    <span class="price">${rupiah(product.price)}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        +
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

// DISPLAY PRODUCTS

renderProducts(
    products.filter(product => product.best),
    "bestSellerGrid"
);

renderProducts(products, "productGrid");

// FILTER

function filterProducts(category, button) {
    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    const filtered = category === "all"
        ? products
        : products.filter(product => product.category === category);

    renderProducts(filtered, "productGrid");
}

// ADD TO CART

function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    // Open cart automatically
    document.getElementById("cartSidebar").classList.add("open");
    document.getElementById("cartOverlay").classList.add("open");
}

// UPDATE CART

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cart-count").textContent = count;

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">Your bag is still empty ♡</p>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${rupiah(item.price)} × ${item.quantity}</p>
                </div>

                <button onclick="removeItem(${item.id})">✕</button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cartTotal").textContent = rupiah(total);
}

// REMOVE ITEM

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// CART SIDEBAR

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("open");
    document.getElementById("cartOverlay").classList.toggle("open");
}

// CHECKOUT

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang kamu masih kosong!");
        return;
    }

    const phone = "6287748535038";

    let message = "Halo LUMIÈRE! Saya ingin memesan:\n\n";

    cart.forEach(item => {
        message += `${item.name} (${item.quantity}x) - ${rupiah(item.price * item.quantity)}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message += `\nTotal: ${rupiah(total)}`;
    message += "\n\nMohon informasi pembayaran. Terima kasih!";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

// MOBILE MENU

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("show");
    });
});

// SCROLL REVEAL

function revealElements() {
    const elements = document.querySelectorAll(".reveal");

    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// CLOSE CART WITH ESCAPE

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.getElementById("cartSidebar").classList.remove("open");
        document.getElementById("cartOverlay").classList.remove("open");
    }
});
