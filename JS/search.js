// Dynamic search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById("search-input");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    const searchBtn = document.querySelector(".search-bar button");
    const mobileSearchBtn = document.querySelector(".mobile-search-bar button");

    function handleSearch(query) {
        query = query.toLowerCase().trim();
        const homestayCards = document.querySelectorAll('.homestay-card');
        let hasResults = false;
        
        homestayCards.forEach(card => {
            const cardContent = card.textContent.toLowerCase();
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardLocation = card.querySelector('p').textContent.toLowerCase();
            const amenities = Array.from(card.querySelectorAll('.amenities li'))
                                 .map(li => li.textContent.toLowerCase());
            
            const matchesQuery = cardContent.includes(query) || 
                               cardTitle.includes(query) || 
                               cardLocation.includes(query) ||
                               amenities.some(amenity => amenity.includes(query));
            
            if (matchesQuery || query === '') {
                card.style.display = 'block';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Check if no results found
        const visibleCards = document.querySelectorAll('.homestay-card[style="display: block"]');
        const noResultsMessage = document.querySelector('.no-results-message');
        
        if (visibleCards.length === 0 && query !== '') {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <p>No homestays found matching "${query}"</p>
                    <p>Try different keywords or browse all homestays</p>
                `;
                document.querySelector('.card-container').appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // Event listeners for search functionality
    searchBtn.addEventListener("click", () => handleSearch(searchInput.value));
    mobileSearchBtn.addEventListener("click", () => handleSearch(mobileSearchInput.value));
    
    // Real-time search as user types
    let searchTimeout;
    function debounceSearch(input) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(input.value);
        }, 300); // Wait 300ms after user stops typing
    }
    
    searchInput.addEventListener("input", () => debounceSearch(searchInput));
    mobileSearchInput.addEventListener("input", () => debounceSearch(mobileSearchInput));
    
    // Handle Enter key
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch(searchInput.value);
        }
    });
    
    mobileSearchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch(mobileSearchInput.value);
        }
    });

    // Add CSS for animations and no results message
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .homestay-card {
            transition: all 0.3s ease;
        }
        
        .no-results-message {
            text-align: center;
            padding: 2rem;
            color: #666;
            background: #f5f5f5;
            border-radius: 8px;
            margin: 2rem auto;
            max-width: 500px;
            animation: fadeIn 0.3s ease;
        }
        
        .no-results-message p:first-child {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #333;
        }
    `;
    document.head.appendChild(style);
});