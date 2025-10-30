function subscribeNewsletter() {
    let email = document.getElementById("newsletter-email").value.trim();
    if (email === "") {
        alert("⚠️ Please enter a valid email!");
        return;
    }
    if (!validateEmail(email)) {
        alert("❌ Invalid Email! Please enter a valid email.");
        return;
    }
    sendNewsletterEmail(email);
    showConfirmationMessage(email);
    document.getElementById("newsletter-email").value = "";
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function sendNewsletterEmail(email) {
    // These service/template IDs must match your EmailJS setup
    let templateParams = {
        user_email: email,
        to_email: email,
        subject: "🌟 Welcome to Our Travel Newsletter!",
        message: `Hi there! 🎉\n\nThank you for subscribing to our exclusive travel newsletter! ✈️🌎\n\nYou’ll receive the latest travel deals, destination tips, and exciting offers. 🏖️\n\nClick the link below to complete your registration:\n\n🔗 [Complete Registration](#)\n\nHappy Travels! 🚀`
    };
    emailjs.send("service_n3pxpvu", "template_b6o5dqb", templateParams)
        .then(response => {
            console.log("✅ Email sent successfully!", response);
        })
        .catch(error => {
            console.error("❌ Email sending failed:", error);
            // In a real app, you might fall back to a server-side handler or a different service
            alert("Subscription successful, but failed to send confirmation email. Please check console.");
        });
}

function showConfirmationMessage(email) {
    let confirmationBox = document.createElement("div");
    confirmationBox.classList.add("newsletter-confirmation");
    confirmationBox.innerHTML = `
        <div class="newsletter-popup">
            <h2>🎉 Subscription Confirmed!</h2>
            <p>Dear <b>${email}</b>, thank you for subscribing!<br>
            You’ll receive an email with a registration form.</p>
            <p>📧 Check your inbox and complete your signup.</p>
            <button onclick="closeConfirmation()">OK</button>
        </div>
    `;
    document.body.appendChild(confirmationBox);
}

function closeConfirmation() {
    let confirmationBox = document.querySelector(".newsletter-confirmation");
    if (confirmationBox) {
        confirmationBox.remove();
    }
}


// --- 2. Google Translate Integration ---
function loadGoogleTranslate() {
    // The Google Maps callback name 'initMap' is a global function used for maps,
    // so we need to ensure the Google Translate library loads correctly as well.
    if (!window.google || !window.google.translate) {
        let script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        document.body.appendChild(script);
    } else {
        googleTranslateInit();
    }
}

// Global function required by the Google Translate API callback
window.googleTranslateInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: false
    }, 'google_translate_element');
    setTimeout(fixGoogleTranslateStyles, 1000);
}

function changeLanguage(lang) {
    let googleTranslateDropdown = document.querySelector(".goog-te-combo");
    if (googleTranslateDropdown) {
        googleTranslateDropdown.value = lang;
        // The Google Translate dropdown must fire a 'change' event to switch language
        googleTranslateDropdown.dispatchEvent(new Event("change")); 
        setTimeout(fixGoogleTranslateStyles, 1000);
    } else {
        console.error("Google Translate dropdown not found!");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("language-select");
    if (languageSelect) {
        languageSelect.addEventListener("change", function () {
            let selectedLang = this.value;
            // Short delay to ensure Google Translate element is ready
            setTimeout(() => changeLanguage(selectedLang), 500); 
        });
    }
});

function fixGoogleTranslateStyles() {
    // This function attempts to fix Google's intrusive font styling
    try {
        document.querySelectorAll("*").forEach(element => {
            element.style.fontSize = "";
            element.style.lineHeight = "";
            element.style.letterSpacing = "";
        });
    } catch (error) {
        console.error("Error fixing Google Translate styles:", error);
    }
}

window.addEventListener("load", loadGoogleTranslate);


// --- 3. FAQ Accordion Functionality ---
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const question = item.querySelector(".question");
        const answer = item.querySelector(".answer");
        const arrow = item.querySelector(".arrow i"); // Target the icon inside the span
        
        // Ensure all required elements exist before adding listener
        if (question && answer && arrow) { 
            question.addEventListener("click", function () {
                const isOpen = item.classList.contains("active");

                // Close all other items
                faqItems.forEach((faq) => {
                    faq.classList.remove("active");
                    faq.querySelector(".answer").style.display = "none";
                    faq.querySelector(".arrow i").style.transform = "rotate(0deg)";
                });

                // Open the clicked item if it wasn't already open
                if (!isOpen) {
                    item.classList.add("active");
                    answer.style.display = "block";
                    arrow.style.transform = "rotate(180deg)";
                }
            });
        }
    });
});


// --- 4. Testimonial Carousel ---
document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const testimonials = document.querySelectorAll(".testimonial-item");
    const totalTestimonials = testimonials.length;
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    
    if (testimonials.length === 0) return; // Exit if no testimonials found

    function showTestimonial(index) {
        testimonials.forEach((item, i) => {
            item.style.display = i === index ? "block" : "none";
        });
    }

    function changeTestimonial(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = totalTestimonials - 1;
        } else if (currentIndex >= totalTestimonials) {
            currentIndex = 0;
        }
        showTestimonial(currentIndex);
    }

    showTestimonial(currentIndex);

    // Auto-advance every 5 seconds
    setInterval(() => changeTestimonial(1), 5000);

    if (prevButton) prevButton.addEventListener("click", () => changeTestimonial(-1));
    if (nextButton) nextButton.addEventListener("click", () => changeTestimonial(1));
});


// --- 5. Google Maps and Filter ---
// The Google Maps API will call 'initMap' globally once loaded.
window.initMap = function () {
    const locations = [
        { name: "Traditional Haveli in Rajasthan", lat: 27.0238, lng: 74.2176, price: 2500, location: "Rajasthan" },
        { name: "Cozy Cottage in Kerala", lat: 10.8505, lng: 76.2711, price: 1800, location: "Kerala" },
        { name: "Mountain Retreat in Himachal", lat: 31.1048, lng: 77.1734, price: 4000, location: "Himachal Pradesh" },
        { name: "Spacious Villa in Uttarakhand", lat: 30.0668, lng: 79.0193, price: 6000, location: "Uttarakhand" },
        { name: "Heritage Home in Tamil Nadu", lat: 11.1271, lng: 78.6569, price: 3500, location: "Tamil Nadu" },
        { name: "Charming Cottage in Madhya Pradesh", lat: 22.9734, lng: 78.6569, price: 1500, location: "Madhya Pradesh" },
    ];
    
    // Defer initialization until the DOM is loaded
    document.addEventListener("DOMContentLoaded", function () {
        const mapContainer = document.getElementById("mapContainer");
        if (!mapContainer || typeof google === "undefined" || !google.maps) {
            console.error("Google Maps API is not loaded or map container is missing.");
            return;
        }

        let map = new google.maps.Map(mapContainer, {
            center: { lat: 20.5937, lng: 78.9629 }, // Center of India
            zoom: 5,
        });

        let markers = [];

        function renderMarkers(filteredLocations) {
            markers.forEach(marker => marker.setMap(null));
            markers = [];

            filteredLocations.forEach(loc => {
                const marker = new google.maps.Marker({
                    position: { lat: loc.lat, lng: loc.lng },
                    map: map,
                    title: loc.name,
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `<h3>${loc.name}</h3><p>Price: ₹${loc.price}/Day</p>`,
                });

                marker.addListener("click", () => infoWindow.open(map, marker));
                markers.push(marker);
            });

            // Adjust map view based on results
            if (filteredLocations.length > 0) {
                const bounds = new google.maps.LatLngBounds();
                filteredLocations.forEach(loc => bounds.extend({ lat: loc.lat, lng: loc.lng }));
                map.fitBounds(bounds);
                // Set a sensible max zoom for single marker
                if (filteredLocations.length === 1 && map.getZoom() > 10) { 
                    map.setZoom(10);
                }
            } else {
                // Reset to default view if no locations are found
                map.setCenter({ lat: 20.5937, lng: 78.9629 });
                map.setZoom(5);
            }
        }

        renderMarkers(locations);

        const mapFilterApply = document.getElementById("mapFilterApply");
        const mapLocationFilter = document.getElementById("mapLocationFilter");
        const mapPriceFilter = document.getElementById("mapPriceFilter");

        if (mapFilterApply) {
            mapFilterApply.addEventListener("click", () => {
                const selectedLocation = mapLocationFilter.value;
                const selectedPrice = mapPriceFilter.value;

                const filteredLocations = locations.filter(loc => {
                    const matchesLocation = selectedLocation === "all" || loc.location === selectedLocation;
                    let matchesPrice = true;

                    if (selectedPrice !== "all") {
                        const [minPrice, maxPriceStr] = selectedPrice.split("-");
                        const minPriceNum = Number(minPrice);
                        const maxPriceNum = maxPriceStr ? Number(maxPriceStr) : Infinity;
                        
                        matchesPrice = loc.price >= minPriceNum && loc.price <= maxPriceNum;
                    }
                    return matchesLocation && matchesPrice;
                });

                renderMarkers(filteredLocations);
            });
        }
    });
};


// --- 6. Homestay Filter & Sort Logic ---
document.addEventListener("DOMContentLoaded", function () {
    const locationFilter = document.getElementById("locationFilter");
    const priceFilter = document.getElementById("priceFilter");
    const bedroomFilter = document.getElementById("bedroomFilter");
    const ratingFilter = document.getElementById("ratingFilter");
    const availabilityFilter = document.getElementById("availabilityFilter");
    const sortBy = document.getElementById("sortBy");
    const applyFiltersBtn = document.getElementById("applyFilters");
    const priceDisplay = document.getElementById("currentPrice");
    const homestayCards = document.querySelectorAll(".homestay-card");
    const cardContainer = document.querySelector(".card-container");
    
    if (!applyFiltersBtn) return; // Exit if filter section is not present

    // Wishlist Toggle
    document.querySelectorAll(".add-to-wishlist-btn").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            this.innerHTML = this.classList.contains("active")
                ? '<i class="fas fa-heart" style="color:red;"></i>'
                : '<i class="far fa-heart"></i>';
        });
    });

    // Price Slider Display Update
    priceFilter.addEventListener("input", function () {
        priceDisplay.textContent = `₹${this.value}`;
    });

    // Main Filter and Sort Handler
    applyFiltersBtn.addEventListener("click", function () {
        const selectedLocation = locationFilter.value;
        const selectedPrice = parseInt(priceFilter.value, 10);
        const selectedBedrooms = bedroomFilter.value;
        const selectedRating = ratingFilter.value;
        const selectedAvailability = availabilityFilter.value;
        const selectedSort = sortBy.value;

        let filteredCards = Array.from(homestayCards).filter(card => {
            // Data attributes must match the HTML structure (data-price, data-location, etc.)
            const cardPrice = parseInt(card.dataset.price, 10);
            const cardBedrooms = card.dataset.bedrooms;
            const cardLocation = card.dataset.location;
            const cardRating = parseFloat(card.dataset.rating);
            const cardStatus = card.dataset.status;

            let matchesLocation = selectedLocation === "all" || cardLocation === selectedLocation;
            let matchesPrice = cardPrice <= selectedPrice;
            let matchesBedrooms = selectedBedrooms === "all" || cardBedrooms === selectedBedrooms;
            let matchesRating = selectedRating === "all" || cardRating >= parseFloat(selectedRating);
            let matchesAvailability = selectedAvailability === "all" || cardStatus === selectedAvailability;

            return matchesLocation && matchesPrice && matchesBedrooms && matchesRating && matchesAvailability;
        });

        // Sorting Logic
        if (selectedSort === "priceLowHigh") {
            filteredCards.sort((a, b) => parseInt(a.dataset.price, 10) - parseInt(b.dataset.price, 10));
        } else if (selectedSort === "priceHighLow") {
            filteredCards.sort((a, b) => parseInt(b.dataset.price, 10) - parseInt(a.dataset.price, 10));
        } else if (selectedSort === "ratingsHighLow") {
            filteredCards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
        }

        // Re-render cards
        cardContainer.innerHTML = "";
        if (filteredCards.length > 0) {
            filteredCards.forEach(card => cardContainer.appendChild(card));
        } else {
            cardContainer.innerHTML = `<p style="text-align:center; font-size:1.2rem; color:#888;">No homestays match your search criteria. 🏡</p>`;
        }
    });
});


// --- 7. Booking Form & Payment Flow ---
document.addEventListener("DOMContentLoaded", function () {
    const checkInDate = document.getElementById("checkInDate");
    const checkOutDate = document.getElementById("checkOutDate");
    const guestCount = document.getElementById("guestCount");
    const roomType = document.getElementById("roomType");
    const selectedLocation = document.getElementById("selectedLocation");
    const specialRequests = document.getElementById("specialRequests");
    const priceDisplay = document.getElementById("priceDisplay");
    const calculatePriceBtn = document.getElementById("calculatePriceBtn");
    const bookingForm = document.getElementById("bookingForm");
    const bookingConfirmationModal = document.getElementById("bookingConfirmationModal");
    const closeConfirmationModal = document.getElementById("closeConfirmationModal");
    const confirmBookingBtn = document.getElementById("confirmBookingBtn");
    
    if (!bookingForm) return; // Exit if booking form is not present

    const roomPrices = {
        deluxe: 3000,
        suite: 5000,
        cottage: 7000,
        villa: 10000
    };

    function calculatePrice() {
        const checkIn = new Date(checkInDate.value);
        const checkOut = new Date(checkOutDate.value);
        const guests = parseInt(guestCount.value, 10) || 0;
        const room = roomType.value;

        if (!checkInDate.value || !checkOutDate.value || !room || guests === 0) {
            alert("Please fill in all required fields to calculate the price.");
            return;
        }

        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const days = timeDiff / (1000 * 60 * 60 * 24);

        if (days <= 0 || isNaN(days)) {
            alert("Check-Out date must be later than Check-In date.");
            return;
        }

        // Calculation: (Base Room Price * Days) + (Per Guest Surcharge * Guests)
        const totalPrice = (roomPrices[room] || 0) * days + guests * 500;
        
        priceDisplay.textContent = `₹${totalPrice}`;
        return totalPrice;
    }

    function handleBooking(event) {
        event.preventDefault();
        const calculatedPrice = calculatePrice(); // Recalculate and validate before showing modal
        
        if (!calculatedPrice) return; // If calculatePrice failed validation

        // Populate Confirmation Modal
        document.getElementById("confirmselectedLocation").textContent = selectedLocation.value;
        document.getElementById("confirmCheckInDate").textContent = checkInDate.value;
        document.getElementById("confirmCheckOutDate").textContent = checkOutDate.value;
        document.getElementById("confirmGuestCount").textContent = guestCount.value;
        document.getElementById("confirmRoomType").textContent = roomType.options[roomType.selectedIndex].text;
        document.getElementById("confirmTotalCost").textContent = priceDisplay.textContent;
        document.getElementById("confirmSpecialRequests").textContent = specialRequests.value || "None";
        
        bookingConfirmationModal.classList.add("show");
    }

    function confirmBooking() {
        const checkIn = checkInDate.value;
        const checkOut = checkOutDate.value;
        const guests = parseInt(guestCount.value, 10);
        const room = roomType.value;
        const location = selectedLocation.value;
        const requests = specialRequests.value || "None";

        const checkInDateObj = new Date(checkIn);
        const checkOutDateObj = new Date(checkOut);
        const days = (checkOutDateObj - checkInDateObj) / (1000 * 60 * 60 * 24);

        const baseAmount = (roomPrices[room] || 0) * days + guests * 500;
        const gstAmount = Math.round(baseAmount * 0.12); // 12% GST
        const totalAmount = baseAmount + gstAmount;

        const homestayBookingData = {
            stay: { location, checkIn, checkOut, days },
            room: { type: room, guests },
            pricing: { baseAmount, gstAmount, totalAmount },
            specialRequests: requests,
            customerDetails: { name: '', email: '', phone: '' } // To be filled by payment handler
        };

        // Close the modal
        bookingConfirmationModal.classList.remove("show");

        // Load PaymentHandler dynamically to handle the final step
        if (typeof PaymentHandler === 'undefined') {
            console.log('Loading PaymentHandler...');
            const script = document.createElement('script');
            script.src = './JS/payment-handler.js'; // Assumes PaymentHandler class is here
            script.onload = function() {
                // Ensure the file loaded successfully and defined PaymentHandler
                if (typeof PaymentHandler !== 'undefined') {
                    const paymentHandler = new PaymentHandler();
                    paymentHandler.processHomestayPayment(homestayBookingData);
                } else {
                    alert('Payment system could not be initialized. Check console for errors.');
                }
            };
            script.onerror = function() {
                alert('Payment system file could not be loaded. Please try again.');
            };
            document.head.appendChild(script);
        } else {
            // Already loaded, just use it
            const paymentHandler = new PaymentHandler();
            paymentHandler.processHomestayPayment(homestayBookingData);
        }
    }

    function closeModal() {
        bookingConfirmationModal.classList.remove("show");
    }

    calculatePriceBtn.addEventListener("click", calculatePrice);
    bookingForm.addEventListener("submit", handleBooking);
    confirmBookingBtn.addEventListener("click", confirmBooking);
    closeConfirmationModal.addEventListener("click", closeModal);
});


// --- 8. Navbar & Mobile Menu, Scroll Effects ---
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".mobile-menu ul li a");
    const navbar = document.querySelector(".navbar");
    
    // Mobile Menu Toggles
    if (menuToggle) menuToggle.addEventListener("click", () => { mobileMenu.classList.add("active"); });
    if (menuClose) menuClose.addEventListener("click", () => { mobileMenu.classList.remove("active"); });
    navLinks.forEach(link => {
        link.addEventListener("click", () => { mobileMenu.classList.remove("active"); });
    });

    // Sticky/Scrolled Navbar Effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            // The original code used both "sticky" and "scrolled". I'll use "scrolled" as the main class in CSS.
            navbar.classList.add("scrolled"); 
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});


// --- 9. Simple Search/Navigation ---
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.querySelector(".search-bar button");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    const mobileSearchBtn = document.querySelector(".mobile-search-bar button");

    const pages = {
        "home": "../index.html",
        "services": "../services.html",
        "homestays": "../homestays.html",
        "faq": "../faq.html",
        "contact": "../contact.html",
        "privacy policy": "../pp.html",
        "terms and condition": "../t&c.html",
        "service": "../services.html",
        "homestay": "../homestays.html",
        "faqs": "../faq.html",
        "blogs": "../blog.html",
        "blog": "../blog.html",
        "adventure": "../Adventure.html",
        "adventures": "../Adventure.html",
        "pp": "../pp.html",
        "t&c": "../t&c.html"
    };

    function handleSearch(query) {
        query = query.trim().toLowerCase();
        if (pages[query]) {
            window.location.href = pages[query];
        } else {
            alert("No results found for: " + query);
        }
    }
    
    if(searchBtn) searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() !== "") handleSearch(searchInput.value);
    });

    if(mobileSearchBtn) mobileSearchBtn.addEventListener("click", function () {
        if (mobileSearchInput.value.trim() !== "") handleSearch(mobileSearchInput.value);
    });

    // Handle Enter keypress for both search inputs
    if(searchInput) searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch(searchInput.value);
        }
    });

    if(mobileSearchInput) mobileSearchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch(mobileSearchInput.value);
        }
    });
});


// --- 10. Back to Top Button and Chatbot (Primary DOMContentLoaded block) ---
document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTop");
    const chatButton = document.getElementById("chatButton");
    const chatModal = document.getElementById("chatModal");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const closeChatbot = document.querySelector(".close-chatbot");
    const voiceInputButton = document.getElementById("voiceInput");
    const clearChatButton = document.getElementById("clearChat");
    const typingIndicator = document.getElementById("typingIndicator");

    // Back to Top Logic
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Chatbot Data
    const categories = {
        "Website & Services": ["What services does this website offer?", "How do I register on the website?", "How can I contact customer support?"],
        "Bus & Train Tickets": ["How do I book a bus or train ticket?", "Can I cancel or reschedule my bus/train ticket?", "What happens if my bus/train is delayed or canceled?", "How do I check my PNR status for train tickets?"],
        "Homestays & Hotels": ["How do I find the best hotels/homestays?", "Can I book a hotel without advance payment?", "Are there any budget-friendly homestays available?", "What is the cancellation policy for hotels/homestays?", "Do hotels/homestays allow pets?"],
        "Sightseeing & Tour Packages": ["What sightseeing packages do you offer?", "Can I customize my tour package?", "Are guides included in sightseeing packages?", "What are the best travel destinations in India?"],
        "Travel Information & Assistance": ["What is the best time to visit [specific place]?", "Do I need a visa for an international trip?", "How can I check the weather at my destination?"],
        "Payments & Pricing": ["What payment methods do you accept?", "How do I apply a promo code or discount?", "How do I get a refund if I cancel a booking?", "Are there EMI options available for expensive bookings?"],
        "Car Rentals & Transport": ["How do I book a car rental?", "Are drivers included in car rentals?", "Can I modify my rental booking?"],
        "Ratings & Reviews": ["How do I leave a rating or review?", "Can I see ratings before booking?"],
        "Offers & Memberships": ["Do you offer loyalty programs?", "How can I stay updated on deals and offers?"]
    };

    const answers = {
        "What services does this website offer?": "We offer hotel & homestay bookings, bus/train tickets, sightseeing packages, car rentals, and customized tour packages.",
        "How do I register on the website?": "Click Sign Up, enter your details, verify your email/phone, and start booking.",
        "How can I contact customer support?": "You can reach us via live chat, email (support@tourismwebsite.com), or call us at +91-XXXXXXX.",
        "How do I book a bus or train ticket?": "Select your source, destination, date, and transport type, then proceed with payment to confirm your booking.",
        "Can I cancel or reschedule my bus/train ticket?": "Yes! Go to My Bookings, select your ticket, and choose Cancel or Reschedule. Cancellation fees may apply.",
        "What happens if my bus/train is delayed or canceled?": "You’ll get real-time SMS/email updates. If it’s canceled, you can apply for a full refund or reschedule.",
        "How do I check my PNR status for train tickets?": "Enter your PNR number in our Check PNR Status section to see live updates.",
        "How do I book a car rental?": "Choose your pick-up and drop-off location, select a vehicle, and confirm your booking.",
        "Are drivers included in car rentals?": "We offer both self-drive and chauffeur-driven car rental options.",
        "Can I modify my rental booking?": "Yes! Go to My Rentals, select your booking, and modify as needed.",
        "How do I leave a rating or review?": "After your trip, go to My Bookings, select your experience, and submit a review.",
        "Can I see ratings before booking?": "Yes! Each hotel, homestay, and service displays customer ratings and reviews.",
        "Do you offer loyalty programs?": "Yes! Our Travel Rewards Program lets you earn points and redeem them for discounts.",
        "How can I stay updated on deals and offers?": "Subscribe to our newsletter or enable WhatsApp notifications for the latest deals."
    };

    if (chatButton) {
        // Chatbot UI Handlers
        chatButton.addEventListener("click", () => {
            chatModal.classList.add("active");
            // Only show initial welcome and categories if chat is empty
            if (!chatMessages.innerHTML.trim()) { 
                appendMessage("bot", "👋 Hi there! How can I assist you today?");
                showCategories();
            }
        });

        closeChatbot.addEventListener("click", () => {
            appendMessage("bot", "🙏 Thank you for chatting with us. Have a great day!");
            setTimeout(() => {
                chatModal.classList.remove("active");
            }, 2000);
        });

        sendMessageButton.addEventListener("click", sendMessage);
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });

        function sendMessage() {
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;

            appendMessage("user", userMessage);
            chatInput.value = "";

            typingIndicator.style.display = "block";

            setTimeout(() => {
                typingIndicator.style.display = "none";
                const answer = answers[userMessage];
                if (answer) {
                    appendMessage("bot", answer);
                } else {
                    // Simple search logic for a few keywords
                    const lowerMsg = userMessage.toLowerCase();
                    if (lowerMsg.includes("booking") || lowerMsg.includes("homestay")) {
                         appendMessage("bot", "🤖 I see you're asking about booking or homestays. Would you like to view our 'Homestays & Hotels' category?");
                    } else if (lowerMsg.includes("cancel") || lowerMsg.includes("refund")) {
                        appendMessage("bot", "🤖 For cancellation and refunds, please check your booking status in 'My Bookings' or review our FAQ.");
                    } else {
                         appendMessage("bot", "🤖 Sorry, I don't have an exact answer for that. Try selecting a category above or asking a different question!");
                    }
                }
            }, 1000);
        }

        function showCategories() {
            const categoriesContainer = document.createElement("div");
            categoriesContainer.classList.add("options-container");
            Object.keys(categories).forEach((category) => {
                const button = document.createElement("button");
                button.classList.add("option-button");
                button.innerText = category;
                button.addEventListener("click", () => showQuestions(category));
                categoriesContainer.appendChild(button);
            });
            chatMessages.appendChild(categoriesContainer);
            scrollToBottom();
        }

        function showQuestions(category) {
            appendMessage("user", category);
            const questionsContainer = document.createElement("div");
            questionsContainer.classList.add("options-container");
            
            typingIndicator.style.display = "block";
            setTimeout(() => {
                typingIndicator.style.display = "none";
                categories[category].forEach((question) => {
                    const button = document.createElement("button");
                    button.classList.add("option-button");
                    button.innerText = question;
                    button.addEventListener("click", () => getAnswer(question));
                    questionsContainer.appendChild(button);
                });
                appendMessage("bot", "Great! Here are a few related questions you can ask:");
                chatMessages.appendChild(questionsContainer);
                scrollToBottom();
            }, 500);
        }

        function getAnswer(question) {
            appendMessage("user", question);
            typingIndicator.style.display = "block";
            setTimeout(() => {
                typingIndicator.style.display = "none";
                appendMessage("bot", answers[question] || "🤖 I'm not sure, but I can find out for you!");
                showCategories(); // Show categories again after an answer
            }, 1000);
        }

        function appendMessage(sender, message) {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message", sender === "user" ? "user-message" : "bot-message");
            messageElement.innerText = message;
            chatMessages.appendChild(messageElement);
            scrollToBottom();
        }

        function scrollToBottom() {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }

        clearChatButton.addEventListener("click", () => {
            chatMessages.innerHTML = "";
            appendMessage("bot", "👋 Hi there! How can I assist you today?");
            showCategories();
        });

        // Voice Input Integration
        voiceInputButton.addEventListener("click", () => {
            if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
                alert("Your browser does not support voice input.");
                return;
            }
            // Use window.webkitSpeechRecognition for wider browser support
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)(); 
            recognition.lang = "en-US";
            recognition.start();

            appendMessage("bot", "🎧 Listening... Say something!");
            voiceInputButton.style.color = "red";

            recognition.onresult = (event) => {
                const voiceMessage = event.results[0][0].transcript;
                chatInput.value = voiceMessage;
                voiceInputButton.style.color = "#000000";
                sendMessage();
            };
            
            recognition.onspeechend = () => {
                voiceInputButton.style.color = "#000000";
                recognition.stop();
            };

            recognition.onerror = () => {
                voiceInputButton.style.color = "#000000";
                recognition.stop();
                appendMessage("bot", "❌ Sorry, I couldn't understand your voice input.");
            };
        });

        // Initial greeting on page load (only if chatModal is NOT immediately active, which it shouldn't be)
        // Note: The original JS had this, but it will be better when triggered by the chatButton. 
        // I'll leave the initial message logic in the chatButton click event for better UX.

    } 
});