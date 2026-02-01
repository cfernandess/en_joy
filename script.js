// Shopping cart
const cart = [];
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const cartEmptyEl = document.getElementById('cart-empty');
const cartPanel = document.getElementById('cart-panel');
const orderForm = document.getElementById('order-form-element');
const orderMessage = document.getElementById('order-message');

// Toggle cart panel
function toggleCart() {
    cartPanel.classList.toggle('hidden');
}

// Calculate price based on quantity and bundle deals
function calculatePrice(productEl, qty) {
    const basePrice = Number(productEl.dataset.price);
    const bundleQty = Number(productEl.dataset.bundleQty) || 0;
    const bundlePrice = Number(productEl.dataset.bundlePrice) || 0;

    if (bundleQty > 0 && bundlePrice > 0 && qty >= bundleQty) {
        // Calculate how many bundles and remaining items
        const bundles = Math.floor(qty / bundleQty);
        const remaining = qty % bundleQty;
        return (bundles * bundlePrice) + (remaining * basePrice);
    }

    return qty * basePrice;
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const productEl = btn.closest('.product');
        const name = productEl.dataset.name;
        const basePrice = Number(productEl.dataset.price);
        const qty = Number(productEl.querySelector('.qty-input').value);
        const totalPrice = calculatePrice(productEl, qty);

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += qty;
            existing.total = calculatePrice(productEl, existing.qty);
        } else {
            cart.push({
                name,
                qty,
                basePrice,
                total: totalPrice,
                productEl // Keep reference to recalculate bundles
            });
        }

        renderCart();
        updateCartCount();

        // Show cart panel
        cartPanel.classList.remove('hidden');

        // Animation feedback
        btn.textContent = 'נוסף! ✓';
        setTimeout(() => {
            btn.textContent = 'הוסף לסל 🛒';
        }, 1000);
    });
});

// Render cart
function renderCart() {
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
        cartEmptyEl.style.display = 'block';
        cartTotalEl.textContent = '0';
        return;
    }

    cartEmptyEl.style.display = 'none';

    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');

        const itemText = document.createElement('span');
        itemText.textContent = `${item.name} × ${item.qty} – ${item.total} ₪`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item';
        removeBtn.textContent = '✕';
        removeBtn.onclick = () => removeItem(index);

        li.appendChild(itemText);
        li.appendChild(removeBtn);
        cartItemsEl.appendChild(li);

        total += item.total;
    });

    cartTotalEl.textContent = total.toString();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
    updateCartCount();
}

// Update cart count badge
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalItems.toString();
}

// Validate delivery date (Sunday-Thursday only)
function isDateValid(dateStr) {
    const d = new Date(dateStr);
    const day = d.getDay();
    // 0 = Sunday, 1 = Monday, ..., 4 = Thursday
    return day >= 0 && day <= 4;
}

// Form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        orderMessage.textContent = 'הסל ריק! הוסף מוצרים לפני שליחת ההזמנה.';
        orderMessage.style.color = '#ff6b6b';
        return;
    }

    const date = document.getElementById('date').value;
    if (!isDateValid(date)) {
        orderMessage.textContent = 'אספקה אפשרית רק בימים א׳–ה׳. אנא בחר תאריך מתאים.';
        orderMessage.style.color = '#ff6b6b';
        return;
    }

    // Build order summary for WhatsApp
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;
    const total = cartTotalEl.textContent;

    let orderText = `היי גיל! אני רוצה להזמין:\n\n`;
    cart.forEach(item => {
        orderText += `• ${item.name} × ${item.qty} - ${item.total} ₪\n`;
    });
    orderText += `\nסה״כ: ${total} ₪\n`;
    orderText += `\nשם: ${name}\n`;
    orderText += `טלפון: ${phone}\n`;
    orderText += `תאריך אספקה: ${date}\n`;
    if (notes) {
        orderText += `הערות: ${notes}\n`;
    }

    // Encode and open WhatsApp
    const encodedText = encodeURIComponent(orderText);
    window.open(`https://wa.me/972503919925?text=${encodedText}`, '_blank');

    orderMessage.textContent = 'ההזמנה נשלחה לוואטסאפ! נחזור אליך בהקדם.';
    orderMessage.style.color = '#25d366';

    // Clear cart and form
    cart.length = 0;
    renderCart();
    updateCartCount();
    orderForm.reset();
});

// Checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('הסל ריק!');
        return;
    }

    // Scroll to order form
    document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' });
    toggleCart();
});

// Initialize
renderCart();
updateCartCount();
