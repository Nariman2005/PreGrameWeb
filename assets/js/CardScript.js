document.addEventListener('DOMContentLoaded', () => {
    const gameCards = document.querySelectorAll('.game-card');
    const buyButtons = document.querySelectorAll('.buy-now');

    // Add hover effect to game cards
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add click effect to buy buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const gameTitle = button.closest('.game-card').querySelector('.game-title').textContent;
            const gamePrice = button.closest('.game-card').querySelector('.game-price').textContent;
            
            // Show purchase confirmation
            alert(`Added to cart: ${gameTitle}\nPrice: ${gamePrice}`);
            
            // Add visual feedback
            button.textContent = 'Added to Cart!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'Buy Now';
                button.style.backgroundColor = '#2196F3';
            }, 2000);
        });
    });
}); 