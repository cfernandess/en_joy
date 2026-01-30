const cart = [];
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartEmptyEl = document.getElementById('cart-empty');
const orderForm = document.getElementById('order-form');
const orderMessage = document.getElementById('order-message');

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const productEl = btn.closest('.product');
        const name = productEl.dataset.name;
        const price = Number(productEl.dataset.price);

        const flavorEl = productEl.querySelector('.flavor');
        const flavor = flavorEl ? flavorEl.value : "";

        const qty = Number(productEl.querySelector('.qty-input').value);

        const fullName = flavor ? `${name} – טעם: ${flavor}` : name;

        const existing = cart.find(item => item.name === fullName);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name: fullName, price, qty });
        }

        renderCart();
    });
});

function renderCart() {
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
        cartEmptyEl.style.display = 'block';
        cartTotalEl.textContent = '0';
        return;
    }
    cartEmptyEl.style.display = 'none';

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        const lineTotal = item.price * item.qty;
        total += lineTotal;
        li.textContent = `${item.name} × ${item.qty} – ${lineTotal} ₪`;
        cartItemsEl.appendChild(li);
    });

    cartTotalEl.textContent = total.toString();
}

function isDateValid(dateStr) {
    const d = new Date(dateStr);
    const day = d.getDay();
    return day >= 0 && day <= 4;
}

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert('הסל ריק');
        return;
    }

    const date = document.getElementById('date').value;
    if (!isDateValid(date)) {
        alert('ניתן להזמין רק לימים א׳–ה׳');
        return;
    }

    orderMessage.textContent = 'ההזמנה נקלטה! ניצור קשר לאישור.';
    orderMessage.style.color = 'green';

    cart.length = 0;
    renderCart();
    orderForm.reset();
});




