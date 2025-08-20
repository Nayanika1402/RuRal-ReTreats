// Gallery JavaScript Functionality

document.addEventListener("DOMContentLoaded", function () {
    // Initialize gallery functionality
    initializeGallery();
    initializeModal();
    initializeBackToTop();
    initializeNavbar();
});

// Gallery Filter Functionality
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Modal Functionality
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const closeModal = document.querySelector('.close-modal');

    // Close modal when clicking the X
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Open Modal Function (called from HTML)
function openModal(imageSrc, title, description) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Back to Top Functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
}

// Navbar Functionality
function initializeNavbar() {
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".mobile-menu ul li a");
    const navbar = document.querySelector(".navbar");

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
        });
    }

    if (menuClose) {
        menuClose.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });

    // Sticky navbar on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    });

    // Search functionality
    initializeSearch();
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.querySelector(".search-bar button");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    const mobileSearchBtn = document.querySelector(".mobile-search-bar button");

    function handleSearch(query) {
        query = query.trim().toLowerCase();
        const pages = {
            "home": "index.html",
            "services": "services.html",
            "homestays": "homestays.html",
            "gallery": "gallery.html",
            "faq": "faq.html",
            "contact": "contact.html",
            "about": "about.html",
            "blog": "blog.html",
            "adventure": "Adventure.html",
            "budget": "Budget.html"
        };

        if (pages[query]) {
            window.location.href = pages[query];
        } else {
            alert("No results found for: " + query);
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            if (searchInput.value.trim() !== "") {
                handleSearch(searchInput.value);
            }
        });
    }

    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener("click", function () {
            if (mobileSearchInput.value.trim() !== "") {
                handleSearch(mobileSearchInput.value);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSearch(searchInput.value);
            }
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSearch(mobileSearchInput.value);
            }
        });
    }
}

// Subscribe to Updates Function (for under construction section)
function subscribeUpdates() {
    const email = prompt("Enter your email to get notified when new features are available:");
    
    if (email && validateEmail(email)) {
        // Simulate subscription
        alert("🎉 Thank you for subscribing! We'll notify you when these features go live.");
        
        // Here you would typically send the email to your backend
        console.log("Subscriber email:", email);
    } else if (email) {
        alert("Please enter a valid email address.");
    }
}

// Newsletter Subscription Function
function subscribeNewsletter() {
    const email = document.getElementById("newsletter-email").value.trim();
    
    if (email === "") {
        alert("⚠️ Please enter a valid email!");
        return;
    }
    
    if (!validateEmail(email)) {
        alert("❌ Invalid Email! Please enter a valid email.");
        return;
    }
    
    // Simulate newsletter subscription
    alert("✅ Thank you for subscribing to our newsletter!");
    document.getElementById("newsletter-email").value = "";
}

// Email Validation Function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Add animation classes for fade in effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (optional enhancement)
function initializeLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.3s';
                    img.style.opacity = '1';
                };
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    initializeLazyLoading();
}
