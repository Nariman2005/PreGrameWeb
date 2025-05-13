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

function switchUserType(type) {
    const buttons = document.querySelectorAll('.user-type-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Update plan features based on user type
    const features = {
        developer: {
            free: [
                'Upload 1 game (5GB max)',
                'Receive standard feedback',
                'Basic analytics'
            ],
            pro: [
                'Upload 5 games (50GB max)',
                '50GB asset storage',
                'Access targeted testing and custom forms',
                'Advanced analytics',
                'Manage early access',
                'Featured game listing ',
                'Receive a "PregamePro Developer" badge'
            ],
            enterprise: [
                'Unlimited game uploads (500GB and up)',
                '1TB+ asset storage',
                'Access targeted testing and custom forms',
                'Full access to all Pro features',
                'API access',
                'Legal/NDA tools',
                'Branding opportunities',
                '"Pregame Certified Studio" certificate'
            ]
        },
        tester: {
            free: [
                'Test up to 2 games/month',
                'Basic profile with qualifications',
                'Basic feedback tools'
            ],
            pro: [
                'Test up to 10 games/month',
                'Advanced testing tools', 
                'Exclusive testing guides', 
                'Direct developer communication (monthly Q&A)',
                'Access to premium testing tools',
                'Featured tester profile',
                'Receive a "Verified Tester" digital certificate'
            ],
            enterprise: [
                'Unlimited game testing',
                'Guaranteed access to premium, high-paying tests (5x more opportunities)',
                'Direct collaboration with top developers',
                'Influence platform development',
                'Public recognition',
                'Mentorship opportunities',
                'Receive a prestigious "Elite Tester" framed certificate and platform recognition',
                'Access to beta platform features',
                'Premium testing tools',
                'API access',
                'Receive a prestigious "Elite Tester" certificate'
            ]
        },
        gamer: {
            free: [
                'Play up to 2 games/month',
                'Provide standard feedback',
                'Basic feedback tools'
            ],
            pro: [
                'Play up to 10 games/month',
                'Exclusive in-game content',
                'Enhanced profile with gamer badges',
                'Limited direct developer interaction (monthly Q&A)',
                'Access to exclusive game servers',
                'Featured gamer profile',
                '"Premium Player" digital badge',
            ],
            enterprise: [
                'Unlimited game access',
                'Deeper direct communication with developers',
                'Exclusive merchandise',
                'Significant platform currency bonus ',
                'Influence on in-game content',
                'Premium gaming features',
                'Exclusive rewards',
                '"VIP Player" certificate '
            ]
        }
    };

    // Update features for each plan
    const plans = document.querySelectorAll('.plan-card');
    const userFeatures = features[type];
    
    plans[0].querySelector('.features-list').innerHTML = 
        userFeatures.free.map(feature => `<li>${feature}</li>`).join('');
    plans[1].querySelector('.features-list').innerHTML = 
        userFeatures.pro.map(feature => `<li>${feature}</li>`).join('');
    plans[2].querySelector('.features-list').innerHTML = 
        userFeatures.enterprise.map(feature => `<li>${feature}</li>`).join('');

    // Update plan names based on user type
    const planNames = {
        developer: ["Indie Scout", "Beta Baron", "Franchise Founder"],
        tester: ["Bug Buster Recruit", "Glitch Guardian", "Grandmaster"],
        gamer: ["The Explorer", "Game Changer", "Elite Champion"]
    };
    const nameElements = document.querySelectorAll('.plan-name');
    planNames[type].forEach((name, idx) => {
        nameElements[idx].textContent = name;
    });
}

function selectPlan(planName, price) {
    // Store plan details
    localStorage.setItem('selectedPlan', planName);
    localStorage.setItem('planPrice', price);
    
    // Get the current page URL
    const currentPage = window.location.href;
    
    if (currentPage.includes('developer-plans')) {
        window.location.href = 'payment-developer.html';
    } else if (currentPage.includes('gamer-plans')) {
        window.location.href = 'payment-gamer.html';
    } else if (currentPage.includes('tester-plans')) {
        window.location.href = 'payment-tester.html';
    } else {
        window.location.href = 'payment-developer.html'; // fallback
    }
}

// Render plans for a specific user type if #plans-root exists
function renderPlansForUserType(userType) {
    const plansRoot = document.getElementById('plans-root');
    if (!plansRoot) return;
    const features = {
        developer: {
            free: [
                'Upload 1 game (5GB max)',
                'Receive standard feedback',
                'Basic analytics'
            ],
            pro: [
                'Upload 5 games (50GB max)',
                '50GB asset storage',
                'Access targeted testing and custom forms',
                'Advanced analytics',
                'Manage early access',
                'Featured game listing ',
                'Receive a "PregamePro Developer" badge'
            ],
            enterprise: [
                'Unlimited game uploads (500GB and up)',
                '1TB+ asset storage',
                'Access targeted testing and custom forms',
                'Full access to all Pro features',
                'API access',
                'Legal/NDA tools',
                'Branding opportunities',
                '"Pregame Certified Studio" certificate'
            ]
        },
        tester: {
            free: [
                'Test up to 2 games/month',
                'Basic profile with qualifications',
                'Basic feedback tools'
            ],
            pro: [
                'Test up to 10 games/month',
                'Advanced testing tools', 
                'Exclusive testing guides', 
                'Direct developer communication (monthly Q&A)',
                'Access to premium testing tools',
                'Featured tester profile',
                'Receive a "Verified Tester" digital certificate'
            ],
            enterprise: [
                'Unlimited game testing',
                'Guaranteed access to premium, high-paying tests (5x more opportunities)',
                'Direct collaboration with top developers',
                'Influence platform development',
                'Public recognition',
                'Mentorship opportunities',
                'Receive a prestigious "Elite Tester" framed certificate and platform recognition',
                'Access to beta platform features',
                'Premium testing tools',
                'API access',
                'Receive a prestigious "Elite Tester" certificate'
            ]
        },
        gamer: {
            free: [
                'Play up to 2 games/month',
                'Provide standard feedback',
                'Basic feedback tools'
            ],
            pro: [
                'Play up to 10 games/month',
                'Exclusive in-game content',
                'Enhanced profile with gamer badges',
                'Limited direct developer interaction (monthly Q&A)',
                'Access to exclusive game servers',
                'Featured gamer profile',
                '"Premium Player" digital badge',
            ],
            enterprise: [
                'Unlimited game access',
                'Deeper direct communication with developers',
                'Exclusive merchandise',
                'Significant platform currency bonus ',
                'Influence on in-game content',
                'Premium gaming features',
                'Exclusive rewards',
                '"VIP Player" certificate '
            ]
        }
    };
    const planNames = {
        developer: ["Indie Scout", "Beta Baron", "Franchise Founder"],
        tester: ["Bug Buster Recruit", "Glitch Guardian", "Grandmaster"],
        gamer: ["The Explorer", "Game Changer", "Elite Champion"]
    };
    const prices = {
        developer: ["$0", "$17/month", "$53/month"],
        tester:    ["$0", "$21/month", "$67/month"],
        gamer:     ["$0", "$9/month", "$39/month"]
    };
    const planTypes = ["free", "pro", "enterprise"];
    let html = '<div class="plans-container">';
    for (let i = 0; i < 3; i++) {
        html += `<div class="plan-card${i === 1 ? ' premium' : ''}">`;
        html += `<div class="plan-header"><h2 class="plan-name">${planNames[userType][i]}</h2><div class="plan-price">${prices[userType][i]}</div></div>`;
        html += '<ul class="features-list">';
        features[userType][planTypes[i]].forEach(feature => {
            html += `<li>${feature}</li>`;
        });
        html += '</ul>';
        html += `<button class="select-plan-btn" onclick="selectPlan('${planNames[userType][i]}', '${prices[userType][i]}')">Select Plan</button>`;
        html += '</div>';
    }
    html += '</div>';
    plansRoot.innerHTML = html;
}

// On page load, check if #plans-root exists and render plans for the correct user type
window.addEventListener('DOMContentLoaded', function() {
    const plansRoot = document.getElementById('plans-root');
    if (plansRoot) {
        const userType = plansRoot.getAttribute('data-user-type');
        renderPlansForUserType(userType);
    }
}); 