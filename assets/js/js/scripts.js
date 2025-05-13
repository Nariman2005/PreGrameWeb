document.addEventListener('DOMContentLoaded', function () {
    // Games Slider functionality
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const gamesSlider = document.querySelector('.games-slider');

    if (sliderPrev && sliderNext && gamesSlider) {
        // Current visible slide (for mobile and tablet views)
        let currentSlide = 0;
        // Total number of game cards
        const totalCards = document.querySelectorAll('.game-card').length;
        // Number of cards shown per view (responsive)
        let cardsPerView = getCardsPerView();

        // Update cardsPerView on window resize
        window.addEventListener('resize', function () {
            cardsPerView = getCardsPerView();
            updateSlider();
        });

        // Function to get number of cards shown per view based on screen width
        function getCardsPerView() {
            if (window.innerWidth <= 576) {
                return 1;
            } else if (window.innerWidth <= 992) {
                return 2;
            } else {
                return 3;
            }
        }

        // Function to update slider display
        function updateSlider() {
            // Disable prev button if at start
            sliderPrev.disabled = currentSlide === 0;
            sliderPrev.style.opacity = currentSlide === 0 ? '0.5' : '1';

            // Disable next button if at end
            const maxSlide = totalCards - cardsPerView;
            sliderNext.disabled = currentSlide >= maxSlide;
            sliderNext.style.opacity = currentSlide >= maxSlide ? '0.5' : '1';

            // Move slider
            const cards = document.querySelectorAll('.game-card');
            cards.forEach((card, index) => {
                if (cardsPerView === 1) {
                    // Mobile: show one at a time
                    card.style.display = index === currentSlide ? 'block' : 'none';
                } else {
                    // Tablet/Desktop: show multiple with transform
                    card.style.display = 'block';
                    gamesSlider.style.transform = `translateX(-${currentSlide * (100 / cardsPerView)}%)`;
                }
            });
        }

        // Previous slide
        sliderPrev.addEventListener('click', function () {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });

        // Next slide
        sliderNext.addEventListener('click', function () {
            if (currentSlide < totalCards - cardsPerView) {
                currentSlide++;
                updateSlider();
            }
        });

        // Initialize slider
        updateSlider();
    }

    // FAQ Accordion functionality 
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon i');

            question.addEventListener('click', () => {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-icon i');

                        otherAnswer.classList.remove('active');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                        }
                    }
                });

                // Toggle current FAQ item
                answer.classList.toggle('active');
                if (icon) {
                    if (answer.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }

    // Pricing Toggle functionality (for payment.html)
    const billingToggle = document.getElementById('billing-toggle');

    if (billingToggle) {
        const priceAmounts = document.querySelectorAll('.amount');
        const originalPrices = Array.from(priceAmounts).map(el => parseInt(el.textContent));

        billingToggle.addEventListener('change', function () {
            priceAmounts.forEach((el, index) => {
                if (this.checked) {
                    // Yearly pricing (20% discount)
                    const yearlyPrice = Math.round(originalPrices[index] * 12 * 0.8 / 12);
                    el.textContent = yearlyPrice;
                    el.nextElementSibling.textContent = '/month';
                } else {
                    // Monthly pricing
                    el.textContent = originalPrices[index];
                    el.nextElementSibling.textContent = '/month';
                }
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (mobileMenuBtn) {
        const nav = document.querySelector('.head-right');

        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
}); 