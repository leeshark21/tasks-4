document.addEventListener('DOMContentLoaded', () => {
    // Mock Data
    const productsData = [
        { id: 1, name: "ProBook X15", category: "laptops", price: 1299, rating: 4.8, icon: "💻" },
        { id: 2, name: "Galaxy S24", category: "smartphones", price: 899, rating: 4.6, icon: "📱" },
        { id: 3, name: "AirPods Pro", category: "accessories", price: 249, rating: 4.9, icon: "🎧" },
        { id: 4, name: "UltraBook 13", category: "laptops", price: 999, rating: 4.5, icon: "💻" },
        { id: 5, name: "Pixel 8", category: "smartphones", price: 699, rating: 4.4, icon: "📱" },
        { id: 6, name: "Magic Mouse", category: "accessories", price: 99, rating: 4.2, icon: "🖱️" },
        { id: 7, name: "DevStation PC", category: "laptops", price: 1899, rating: 4.9, icon: "🖥️" },
        { id: 8, name: "Mech Keyboard", category: "accessories", price: 159, rating: 4.7, icon: "⌨️" }
    ];

    // DOM Elements
    const productsGrid = document.getElementById('productsGrid');
    const noProductsMsg = document.getElementById('noProductsMsg');
    
    // Filter Elements
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const priceValue = document.getElementById('priceValue');
    const sortFilter = document.getElementById('sortFilter');

    // State
    let currentCategory = 'all';
    let currentMaxPrice = 2000;
    let currentSort = 'default';

    // Event Listeners
    categoryFilter.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        renderProducts();
    });

    priceFilter.addEventListener('input', (e) => {
        currentMaxPrice = parseInt(e.target.value);
        priceValue.textContent = currentMaxPrice;
        renderProducts();
    });

    sortFilter.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    // Generate stars based on rating
    function getStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 !== 0;
        let starsHTML = '';
        
        for(let i=0; i<5; i++) {
            if(i < fullStars) starsHTML += '★';
            else if(i === fullStars && hasHalf) starsHTML += '★'; // Simplify half star
            else starsHTML += '☆';
        }
        return `${starsHTML} <span style="color:var(--text-secondary); font-size:0.9rem">(${rating})</span>`;
    }

    function renderProducts() {
        // Filter
        let filtered = productsData.filter(p => {
            const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
            const matchesPrice = p.price <= currentMaxPrice;
            return matchesCategory && matchesPrice;
        });

        // Sort
        filtered.sort((a, b) => {
            if (currentSort === 'ratingHigh') return b.rating - a.rating;
            if (currentSort === 'ratingLow') return a.rating - b.rating;
            if (currentSort === 'priceHigh') return b.price - a.price;
            if (currentSort === 'priceLow') return a.price - b.price;
            return a.id - b.id; // Default sort by ID
        });

        // Render
        productsGrid.innerHTML = '';
        
        if (filtered.length === 0) {
            noProductsMsg.style.display = 'block';
        } else {
            noProductsMsg.style.display = 'none';
            
            filtered.forEach(p => {
                const card = document.createElement('div');
                card.className = 'glass-card product-card';
                card.innerHTML = `
                    <div class="img-placeholder">${p.icon}</div>
                    <h3 style="font-size: 1.2rem; margin-bottom:0.5rem">${p.name}</h3>
                    <div class="rating">${getStars(p.rating)}</div>
                    <div class="price">$${p.price}</div>
                    <div style="font-size: 0.85rem; color:var(--text-secondary); text-transform:capitalize;">${p.category}</div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.5rem;">Add to Cart</button>
                `;
                productsGrid.appendChild(card);
            });
        }
    }

    // Initial Render
    renderProducts();
});
