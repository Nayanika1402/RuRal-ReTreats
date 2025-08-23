// ==============================================
// availability.js - Homestay Availability System
// Add this file to your js/ folder
// ==============================================

class MinimalAvailabilitySystem {
    constructor() {
        this.availabilityData = this.initializeData();
        this.init();
    }

    // Initialize with sample data - replace with your real data source
    initializeData() {
        return {
            'homestay-1': { total: 5, available: 5 },
            'homestay-2': { total: 3, available: 1 }, // Few spots left
            'homestay-3': { total: 8, available: 0 }, // Fully booked
            'homestay-4': { total: 4, available: 3 },
            'homestay-5': { total: 6, available: 2 }, // Few spots left
            'homestay-6': { total: 2, available: 2 },
            'homestay-7': { total: 7, available: 0 }, // Fully booked
            'homestay-8': { total: 3, available: 3 },
        };
    }

    // Get availability status
    getStatus(homestayId) {
        const data = this.availabilityData[homestayId];
        if (!data) return null;

        const occupancyRate = (data.total - data.available) / data.total;

        if (data.available === 0) {
            return { status: 'booked', label: 'Fully Booked', color: '#ef4444' };
        } else if (occupancyRate >= 0.7) {
            return { status: 'few', label: `${data.available} left`, color: '#f59e0b' };
        } else {
            return { status: 'available', label: 'Available', color: '#10b981' };
        }
    }

    // Add subtle availability badges to existing homestay cards
    addAvailabilityBadges() {
        // Look for common homestay card patterns in your existing HTML
        const selectors = [
            '.homestay-card',
            '.property-card', 
            '.listing-card',
            '.card',
            '[data-homestay]',
            '.accommodation',
            '.room-card',
            '.stay-card'
        ];

        let cards = [];
        selectors.forEach(selector => {
            const found = document.querySelectorAll(selector);
            cards = cards.concat(Array.from(found));
        });

        // Remove duplicates and filter out non-homestay cards
        cards = [...new Set(cards)].filter(card => {
            // Only process cards that look like homestay/accommodation listings
            const cardText = card.textContent.toLowerCase();
            return cardText.includes('homestay') || 
                   cardText.includes('room') || 
                   cardText.includes('stay') ||
                   cardText.includes('book') ||
                   card.querySelector('img') ||
                   cardText.includes('₹') ||
                   cardText.includes('price');
        });

        cards.forEach((card, index) => {
            // Auto-assign ID if not present
            let homestayId = card.getAttribute('data-homestay-id') || 
                           card.getAttribute('data-homestay') ||
                           card.getAttribute('id') ||
                           `homestay-${index + 1}`;
            
            if (!card.getAttribute('data-homestay-id')) {
                card.setAttribute('data-homestay-id', homestayId);
            }

            this.addBadgeToCard(card, homestayId);
        });
    }

    // Add a small, non-intrusive badge to a card
    addBadgeToCard(card, homestayId) {
        // Don't add if badge already exists
        if (card.querySelector('.availability-indicator')) return;

        const status = this.getStatus(homestayId);
        if (!status) return;

        // Create minimal badge
        const badge = document.createElement('div');
        badge.className = 'availability-indicator';
        badge.innerHTML = `
            <span class="availability-dot" style="background-color: ${status.color}"></span>
            <span class="availability-text">${status.label}</span>
        `;

        // Add minimal styling inline to avoid CSS conflicts
        badge.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(4px);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            z-index: 10;
            border: 1px solid rgba(0,0,0,0.05);
            transition: all 0.2s ease;
            cursor: default;
            user-select: none;
        `;

        // Style the dot
        const dot = badge.querySelector('.availability-dot');
        dot.style.cssText = `
            width: 6px;
            height: 6px;
            border-radius: 50%;
            flex-shrink: 0;
        `;

        // Make parent card relative positioned if not already
        const cardPosition = getComputedStyle(card).position;
        if (cardPosition === 'static') {
            card.style.position = 'relative';
        }

        // Add hover effect
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'scale(1.05)';
            badge.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'scale(1)';
            badge.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });

        // Add tooltip for more info
        badge.title = `${status.label} - Click to refresh`;
        badge.addEventListener('click', () => {
            this.refreshBadge(homestayId);
        });

        card.appendChild(badge);
    }

    // Update availability for a specific homestay
    updateAvailability(homestayId, newAvailable, newTotal = null) {
        if (this.availabilityData[homestayId]) {
            this.availabilityData[homestayId].available = newAvailable;
            if (newTotal !== null) {
                this.availabilityData[homestayId].total = newTotal;
            }
            this.refreshBadge(homestayId);
            this.saveToLocalStorage();
        }
    }

    // Refresh a specific badge
    refreshBadge(homestayId) {
        const card = document.querySelector(`[data-homestay-id="${homestayId}"]`);
        if (!card) return;

        const badge = card.querySelector('.availability-indicator');
        if (!badge) return;

        const status = this.getStatus(homestayId);
        if (!status) return;

        const dot = badge.querySelector('.availability-dot');
        const text = badge.querySelector('.availability-text');

        if (dot) dot.style.backgroundColor = status.color;
        if (text) text.textContent = status.label;
        
        badge.title = `${status.label} - Click to refresh`;
    }

    // Initialize the system
    init() {
        // Load saved data from localStorage
        this.loadFromLocalStorage();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.addAvailabilityBadges(), 100);
            });
        } else {
            setTimeout(() => this.addAvailabilityBadges(), 100);
        }
    }

    // Save data to localStorage
    saveToLocalStorage() {
        try {
            localStorage.setItem('homestayAvailability', JSON.stringify(this.availabilityData));
        } catch (error) {
            console.log('Could not save availability data');
        }
    }

    // Load data from localStorage
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('homestayAvailability');
            if (saved) {
                this.availabilityData = {...this.availabilityData, ...JSON.parse(saved)};
            }
        } catch (error) {
            console.log('Using default availability data');
        }
    }

    // API method to connect to your backend
    async loadFromAPI(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.availabilityData = data;
            this.refreshAllBadges();
            this.saveToLocalStorage();
        } catch (error) {
            console.log('Using local availability data');
        }
    }

    // Refresh all badges
    refreshAllBadges() {
        Object.keys(this.availabilityData).forEach(id => {
            this.refreshBadge(id);
        });
    }

    // Add new homestay
    addHomestay(id, total, available = null) {
        this.availabilityData[id] = {
            total: total,
            available: available !== null ? available : total
        };
        this.saveToLocalStorage();
    }

    // Remove homestay
    removeHomestay(id) {
        delete this.availabilityData[id];
        this.saveToLocalStorage();
        
        // Remove badge if it exists
        const card = document.querySelector(`[data-homestay-id="${id}"]`);
        if (card) {
            const badge = card.querySelector('.availability-indicator');
            if (badge) badge.remove();
        }
    }
}

// Auto-initialize when script loads
window.availabilitySystem = new MinimalAvailabilitySystem();

// ==============================================
// PUBLIC API - Use these functions in your code
// ==============================================

// Update availability after booking
window.onBookingComplete = function(homestayId, roomsBooked) {
    const current = window.availabilitySystem.availabilityData[homestayId];
    if (current) {
        const newAvailable = Math.max(0, current.available - roomsBooked);
        window.availabilitySystem.updateAvailability(homestayId, newAvailable);
    }
};

// Update availability after cancellation
window.onBookingCancelled = function(homestayId, roomsCancelled) {
    const current = window.availabilitySystem.availabilityData[homestayId];
    if (current) {
        const newAvailable = Math.min(current.total, current.available + roomsCancelled);
        window.availabilitySystem.updateAvailability(homestayId, newAvailable);
    }
};

// Get current availability status
window.getAvailabilityStatus = function(homestayId) {
    return window.availabilitySystem.getStatus(homestayId);
};

// ==============================================
// OPTIONAL: Connect to real-time updates
// ==============================================

// Example: WebSocket connection (uncomment and modify as needed)
/*
function connectToRealTimeUpdates() {
    const ws = new WebSocket('ws://your-api.com/availability');
    ws.onmessage = (event) => {
        const { homestayId, available } = JSON.parse(event.data);
        window.availabilitySystem.updateAvailability(homestayId, available);
    };
}
// Call connectToRealTimeUpdates(); to enable
*/

// ==============================================
// TESTING FUNCTIONS (Remove in production)
// ==============================================

// Test functions - you can call these from browser console
window.testAvailability = {
    // Simulate a booking
    book: (homestayId = 'homestay-1') => {
        const current = window.availabilitySystem.availabilityData[homestayId];
        if (current && current.available > 0) {
            window.availabilitySystem.updateAvailability(homestayId, current.available - 1);
            console.log(`✅ Booked 1 room at ${homestayId}. ${current.available - 1} rooms left.`);
        } else {
            console.log(`❌ No rooms available at ${homestayId}`);
        }
    },
    
    // Simulate a cancellation
    cancel: (homestayId = 'homestay-1') => {
        const current = window.availabilitySystem.availabilityData[homestayId];
        if (current && current.available < current.total) {
            window.availabilitySystem.updateAvailability(homestayId, current.available + 1);
            console.log(`✅ Cancelled 1 room at ${homestayId}. ${current.available + 1} rooms now available.`);
        } else {
            console.log(`❌ ${homestayId} already at full capacity`);
        }
    },
    
    // Check current status
    status: (homestayId = 'homestay-1') => {
        const status = window.availabilitySystem.getStatus(homestayId);
        console.log(`📊 ${homestayId}:`, status);
        return status;
    },

    // List all homestays
    listAll: () => {
        console.log('🏠 All Homestay Availability:');
        Object.keys(window.availabilitySystem.availabilityData).forEach(id => {
            const data = window.availabilitySystem.availabilityData[id];
            const status = window.availabilitySystem.getStatus(id);
            console.log(`${id}: ${data.available}/${data.total} - ${status.label}`);
        });
    },

    // Reset all to full availability
    reset: () => {
        Object.keys(window.availabilitySystem.availabilityData).forEach(id => {
            const data = window.availabilitySystem.availabilityData[id];
            window.availabilitySystem.updateAvailability(id, data.total);
        });
        console.log('🔄 Reset all homestays to full availability');
    }
};

// Log successful initialization
console.log('🏡 Homestay Availability System initialized!');
console.log('💡 Try: window.testAvailability.listAll() to see all homestays');

// ==============================================
// AUTO-REFRESH (Optional - every 5 minutes)
// ==============================================

// Uncomment to enable auto-refresh every 5 minutes
/*
setInterval(() => {
    // You can replace this with an API call
    console.log('🔄 Auto-refreshing availability data...');
    window.availabilitySystem.refreshAllBadges();
}, 300000); // 5 minutes
*/