// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 200; // Number of stars

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        // Random size
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        // Random animation duration
        const duration = 2 + Math.random() * 3;
        star.style.setProperty('--duration', `${duration}s`);
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}
createStars();

// Display selected plan information
function displaySelectedPlan() {
    const planSummary = document.getElementById('plan-summary');
    if (planSummary) {
        planSummary.innerHTML = '';
    }
}

// Call on page load
displaySelectedPlan();

// Initialize PayPal Button
function initPayPalButton() {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay'
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '29.00' // This should match your plan price
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Handle successful payment
                alert('Transaction completed by ' + details.payer.name.given_name);
                // You can redirect to a success page here
                window.location.href = 'success.html';
            });
        }
    }).render('#paypal-button-container');
}

// Call PayPal initialization when PayPal is selected
const methodRadios = document.querySelectorAll('input[name="payment-method"]');
const cardFields = document.querySelector('.card-fields');
const paypalFields = document.querySelector('.paypal-fields');
const payNowBtn = document.querySelector('button.pay-btn[type="submit"]');
const cardBtn = document.querySelector('.card-btn');
const paypalBtn = document.querySelector('.paypal-btn');

// Set initial state
function updatePaymentFields() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    if (selectedMethod === 'card') {
        cardFields.style.display = 'block';
        cardBtn.style.display = '';
        paypalBtn.style.display = 'none';
    } else {
        cardFields.style.display = 'none';
        cardBtn.style.display = 'none';
        paypalBtn.style.display = '';
    }
}

// Call on page load
updatePaymentFields();

methodRadios.forEach(radio => {
    radio.addEventListener('change', updatePaymentFields);
});

// Simple validation
const form = document.getElementById('paymentForm');
form.addEventListener('submit', function(e) {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    if (selectedMethod === 'paypal') {
        // Redirect to PayPal
        window.location.href = 'https://www.paypal.com/';
        e.preventDefault();
        return;
    }
    let valid = true;
    let message = '';
    const email = form.email.value.trim();
    const fullname = form.fullname.value.trim();
    const address = form.address.value.trim();
    const city = form.city.value.trim();
    const zip = form.zip.value.trim();
    const name = form.name.value.trim();
    const card = form.card.value.replace(/\s+/g, '');
    const expiry = form.expiry.value.trim();
    const cvv = form.cvv.value.trim();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        valid = false;
        message += 'Please enter a valid email.\n';
    }
    if (!fullname) {
        valid = false;
        message += 'Full Name is required.\n';
    }
    if (!address) {
        valid = false;
        message += 'Address is required.\n';
    }
    if (!city) {
        valid = false;
        message += 'City is required.\n';
    }
    if (!/^\d{5}$/.test(zip)) {
        valid = false;
        message += 'ZIP Code must be 5 digits.\n';
    }
    if (!name) {
        valid = false;
        message += 'Name on Card is required.\n';
    }
    if (!/^\d{13,19}$/.test(card)) {
        valid = false;
        message += 'Card Number must be 13-19 digits.\n';
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        valid = false;
        message += 'Expiry must be in MM/YY format.\n';
    }
    if (!/^\d{3,4}$/.test(cvv)) {
        valid = false;
        message += 'CVV must be 3 or 4 digits.\n';
    }
    if (!valid) {
        e.preventDefault();
        alert(message);
    }
}); 