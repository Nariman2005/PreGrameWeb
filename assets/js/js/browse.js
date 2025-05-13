document.addEventListener('DOMContentLoaded', () => {
    // Photo Slider Logic
    const slides = document.querySelectorAll('.photo-slider .slide');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        stopSlideShow(); // Clear existing interval if any
        slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        showSlide(currentSlide); // Show the first slide initially

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                stopSlideShow(); // Optional: stop auto-slide on manual navigation
                // startSlideShow(); // Optional: restart auto-slide after manual navigation
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopSlideShow(); // Optional: stop auto-slide on manual navigation
                // startSlideShow(); // Optional: restart auto-slide after manual navigation
            });
        }

        // Optional: Auto-play
        startSlideShow();

        // Optional: Pause on hover
        const sliderContainer = document.querySelector('.photo-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlideShow);
            // sliderContainer.addEventListener('mouseleave', startSlideShow); // Be careful with this if manual nav also stops/starts
        }
    }

    // Existing Game Filter Logic
    const gameSearchInput = document.getElementById('game-search');
    const filterButton = document.querySelector('.filter-button');
    const clearButton = document.querySelector('.clear-button');
    const gamesContainer = document.querySelector('.games-container');
    const resultsCount = document.querySelector('.results-count span');
    const sortSelect = document.getElementById('sort-select');

    const allGameCards = Array.from(gamesContainer.querySelectorAll('.game-card'));

    const updateResultsCount = (count) => {
        resultsCount.textContent = `${count} game${count !== 1 ? 's' : ''} found`;
    };

    const filterAndSortGames = () => {
        const searchTerm = gameSearchInput.value.toLowerCase();

        const selectedGenres = Array.from(document.querySelectorAll('.filter-section:nth-child(2) input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        const selectedPlatforms = Array.from(document.querySelectorAll('.filter-section:nth-child(3) input[type="checkbox"]:checked'))
            .map(cb => cb.value);
        const selectedTestPhases = Array.from(document.querySelectorAll('.filter-section:nth-child(4) input[type="checkbox"]:checked'))
            .map(cb => cb.value);

        let filteredGames = allGameCards.filter(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            const cardGenre = card.dataset.genre?.toLowerCase() || '';
            const cardPlatform = card.dataset.platform?.toLowerCase() || '';
            const cardTestPhase = card.dataset.testPhase?.toLowerCase() || '';

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(cardGenre);
            const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(cardPlatform);
            const matchesTestPhase = selectedTestPhases.length === 0 || selectedTestPhases.includes(cardTestPhase);

            return matchesSearch && matchesGenre && matchesPlatform && matchesTestPhase;
        });

        const sortBy = sortSelect.value;
        if (sortBy === 'newest') {
            filteredGames.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        } else if (sortBy === 'oldest') {
            filteredGames.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
        } else if (sortBy === 'popular') {
            filteredGames.sort((a, b) => parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity));
        } else if (sortBy === 'testers') {
            filteredGames.sort((a, b) => parseInt(b.dataset.testers) - parseInt(a.dataset.testers));
        }

        gamesContainer.innerHTML = ''; // Clear existing games
        filteredGames.forEach(card => gamesContainer.appendChild(card));
        updateResultsCount(filteredGames.length);
    };

    filterButton.addEventListener('click', filterAndSortGames);
    gameSearchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterAndSortGames();
        }
    });

    document.querySelector('.search-box button').addEventListener('click', filterAndSortGames);

    clearButton.addEventListener('click', () => {
        gameSearchInput.value = '';
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(cb => cb.checked = false);
        sortSelect.value = 'newest'; // Reset sort to default
        filterAndSortGames(); // Re-apply to show all games
    });

    sortSelect.addEventListener('change', filterAndSortGames);

    // Initial load
    updateResultsCount(allGameCards.length);
    // Optionally, apply default sort on load if needed, e.g., newest
    // filterAndSortGames(); 
});
