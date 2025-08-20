// Import navbar.js
document.write('<script type="text/javascript" src="navbar.js"></script>');

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("ZhgpiL0kX2Dy-IrNa");  
});
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
function loadGoogleTranslate() {
    if (!window.google || !window.google.translate) {
        let script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        document.body.appendChild(script);
    } else {
        googleTranslateInit();
    }
}
function googleTranslateInit() {
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
        googleTranslateDropdown.dispatchEvent(new Event("change"));
        setTimeout(fixGoogleTranslateStyles, 1000);
    } else {
        console.error("Google Translate dropdown not found!");
    }
}
document.getElementById("language-select").addEventListener("change", function () {
    let selectedLang = this.value;
    setTimeout(() => changeLanguage(selectedLang), 500);
});
function fixGoogleTranslateStyles() {
    document.querySelectorAll("*").forEach(element => {
        element.style.fontSize = ""; 
        element.style.lineHeight = ""; 
        element.style.letterSpacing = ""; 
    });
}
window.addEventListener("load", loadGoogleTranslate);


document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const question = item.querySelector(".question");
        const answer = item.querySelector(".answer");
        const arrow = item.querySelector(".arrow");
        question.addEventListener("click", function () {
            const isOpen = item.classList.contains("active");
            faqItems.forEach((faq) => {
                faq.classList.remove("active");
                faq.querySelector(".answer").style.display = "none";
                faq.querySelector(".arrow").style.transform ="rotate(0deg)"; 
            });
            if (!isOpen) {
                item.classList.add("active");
                answer.style.display = "block";
                arrow.style.transform ="rotate(180deg)"; 
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const testimonials = document.querySelectorAll(".testimonial-item");
    const totalTestimonials = testimonials.length;
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
    setInterval(() => changeTestimonial(1), 5000);
    document.querySelector(".prev").addEventListener("click", () => changeTestimonial(-1));
    document.querySelector(".next").addEventListener("click", () => changeTestimonial(1));
});
document.addEventListener("DOMContentLoaded", function () {
    if (typeof google === "undefined") {
        console.error("Google Maps API is not loaded.");
        return;
    }
    let map = new google.maps.Map(document.getElementById("mapContainer"), {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
    });
    const locations = [
        { name: "Traditional Haveli in Rajasthan", lat: 27.0238, lng: 74.2176, price: 2500, location: "Rajasthan" },
        { name: "Cozy Cottage in Kerala", lat: 10.8505, lng: 76.2711, price: 1800, location: "Kerala" },
        { name: "Mountain Retreat in Himachal", lat: 31.1048, lng: 77.1734, price: 4000, location: "Himachal Pradesh" },
        { name: "Spacious Villa in Uttarakhand", lat: 30.0668, lng: 79.0193, price: 6000, location: "Uttarakhand" },
        { name: "Heritage Home in Tamil Nadu", lat: 11.1271, lng: 78.6569, price: 3500, location: "Tamil Nadu" },
        { name: "Charming Cottage in Madhya Pradesh", lat: 22.9734, lng: 78.6569, price: 1500, location: "Madhya Pradesh" },
    ];
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
        if (filteredLocations.length === 1) {
            map.setCenter({ lat: filteredLocations[0].lat, lng: filteredLocations[0].lng });
            map.setZoom(10);
        } else if (filteredLocations.length > 1) {
            const bounds = new google.maps.LatLngBounds();
            filteredLocations.forEach(loc => bounds.extend({ lat: loc.lat, lng: loc.lng }));
            map.fitBounds(bounds);
        } else {
            map.setCenter({ lat: 20.5937, lng: 78.9629 });
            map.setZoom(5);
        }
    }
    renderMarkers(locations);
    document.getElementById("mapFilterApply").addEventListener("click", () => {
        const selectedLocation = document.getElementById("mapLocationFilter").value;
        const selectedPrice = document.getElementById("mapPriceFilter").value;
        const filteredLocations = locations.filter(loc => {
            const matchesLocation = selectedLocation === "all" || loc.location === selectedLocation;
            let matchesPrice = true;
            if (selectedPrice !== "all") {
                const [minPrice, maxPrice] = selectedPrice.split("-").map(Number);
                matchesPrice = maxPrice ? loc.price >= minPrice && loc.price <= maxPrice : loc.price >= minPrice;
            }
            return matchesLocation && matchesPrice;
        });
        renderMarkers(filteredLocations);
    });
});
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
    document.querySelectorAll(".add-to-wishlist-btn").forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active");
            this.innerHTML = this.classList.contains("active") 
                ? '<i class="fas fa-heart" style="color:red;"></i>' 
                : '<i class="far fa-heart"></i>';
        });
    });
    priceFilter.addEventListener("input", function () {
        priceDisplay.textContent = `₹${this.value}`;
    });
    applyFiltersBtn.addEventListener("click", function () {
        const selectedLocation = locationFilter.value;
        const selectedPrice = parseInt(priceFilter.value, 10);
        const selectedBedrooms = bedroomFilter.value;
        const selectedRating = ratingFilter.value;
        const selectedAvailability = availabilityFilter.value;
        const selectedSort = sortBy.value;
        let filteredCards = Array.from(homestayCards).filter(card => {
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
        if (selectedSort === "priceLowHigh") {
            filteredCards.sort((a, b) => parseInt(a.dataset.price, 10) - parseInt(b.dataset.price, 10));
        } else if (selectedSort === "priceHighLow") {
            filteredCards.sort((a, b) => parseInt(b.dataset.price, 10) - parseInt(a.dataset.price, 10));
        } else if (selectedSort === "ratingsHighLow") {
            filteredCards.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
        }
        cardContainer.innerHTML = ""; 
        if (filteredCards.length > 0) {
            filteredCards.forEach(card => cardContainer.appendChild(card));
        } else {
            cardContainer.innerHTML = `<p style="text-align:center; font-size:1.2rem; color:#888;">No homestays match your search criteria. 🏡</p>`;
        }
    });
});
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
    const bookingReferenceNumber = document.getElementById("bookingReferenceNumber");
    const confirmationMessage = document.getElementById("confirmationMessage");
    function calculatePrice() {
        const checkIn = new Date(checkInDate.value);
        const checkOut = new Date(checkOutDate.value);
        const guests = parseInt(guestCount.value, 10) || 0;
        const room = roomType.value;
        if (!checkInDate.value || !checkOutDate.value || !room || guests === 0) {
            alert("Please fill in all required fields to calculate the price.");
            return;
        }
        const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        if (days <= 0 || isNaN(days)) {
            alert("Check-Out date must be later than Check-In date.");
            return;
        }
        const roomPrices = {
            deluxe: 3000,
            suite: 5000,
            cottage: 7000,
            villa: 10000
        };
        const totalPrice = (roomPrices[room] || 0) * days + guests * 500;
        priceDisplay.textContent = `₹${totalPrice};`
    }
    function handleBooking(event) {
        event.preventDefault();
        if (!checkInDate.value || !checkOutDate.value || !guestCount.value || !roomType.value || !selectedLocation.value) {
            alert("Please complete all required fields before booking.");
            return;
        }
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
        const referenceNumber = Math.floor(100000 + Math.random() * 900000); 
        bookingReferenceNumber.textContent = referenceNumber;
        confirmationMessage.style.display = "block";
        setTimeout(() => {
            bookingConfirmationModal.classList.remove("show");
            confirmationMessage.style.display = "none";
            bookingForm.reset(); 
            priceDisplay.textContent = "₹0.00"; 
        }, 4000);
    }
    function closeModal() {
        bookingConfirmationModal.classList.remove("show");
    }
    calculatePriceBtn.addEventListener("click", calculatePrice);
    bookingForm.addEventListener("submit", handleBooking);
    confirmBookingBtn.addEventListener("click", confirmBooking);
    closeConfirmationModal.addEventListener("click", closeModal);
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelectorAll(".mobile-menu ul li a");
    const navbar = document.querySelector(".navbar");
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });
    menuClose.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("sticky");
            navbar.classList.remove("scrolled");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.querySelector(".search-bar button");
    const mobileSearchInput = document.getElementById("mobile-search-input");
    const mobileSearchBtn = document.querySelector(".mobile-search-bar button");
    function handleSearch(query) {
        query = query.trim().toLowerCase();
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
            "Adventure": "../Adventure.html",
            "Adventures": "../Adventure.html",
            "pp": "../pp.html",
            "t&c": "../t&c.html"
        };
        if (pages[query]) {
            window.location.href = pages[query];
        } else {
            alert("No results found for: " + query);
        }
    }
    searchBtn.addEventListener("click", function () {
        if (searchInput.value.trim() !== "") {
            handleSearch(searchInput.value);
        }
    });
    mobileSearchBtn.addEventListener("click", function () {
        if (mobileSearchInput.value.trim() !== "") {
            handleSearch(mobileSearchInput.value);
        }
    });
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch(searchInput.value);
        }
    });
    mobileSearchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch(mobileSearchInput.value);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const backToTopBtn = document.getElementById("backToTop");
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
    const chatButton = document.getElementById("chatButton");
    const chatModal = document.getElementById("chatModal");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const closeChatbot = document.querySelector(".close-chatbot");
    const voiceInputButton = document.getElementById("voiceInput");
    const clearChatButton = document.getElementById("clearChat");
    const typingIndicator = document.getElementById("typingIndicator");
    const categories = {
        "Website & Services": [
            "What services does this website offer?",
            "How do I register on the website?",
            "How can I contact customer support?"
        ],
        "Bus & Train Tickets": [
            "How do I book a bus or train ticket?",
            "Can I cancel or reschedule my bus/train ticket?",
            "What happens if my bus/train is delayed or canceled?",
            "How do I check my PNR status for train tickets?"
        ],
        "Homestays & Hotels": [
            "How do I find the best hotels/homestays?",
            "Can I book a hotel without advance payment?",
            "Are there any budget-friendly homestays available?",
            "What is the cancellation policy for hotels/homestays?",
            "Do hotels/homestays allow pets?"
        ],
        "Sightseeing & Tour Packages": [
            "What sightseeing packages do you offer?",
            "Can I customize my tour package?",
            "Are guides included in sightseeing packages?",
            "What are the best travel destinations in India?"
        ],
        "Travel Information & Assistance": [
            "What is the best time to visit [specific place]?",
            "Do I need a visa for an international trip?",
            "How can I check the weather at my destination?"
        ],
        "Payments & Pricing": [
            "What payment methods do you accept?",
            "How do I apply a promo code or discount?",
            "How do I get a refund if I cancel a booking?",
            "Are there EMI options available for expensive bookings?"
        ],
        "Car Rentals & Transport": [
            "How do I book a car rental?",
            "Are drivers included in car rentals?",
            "Can I modify my rental booking?"
        ],
        "Ratings & Reviews": [
            "How do I leave a rating or review?",
            "Can I see ratings before booking?"
        ],
        "Offers & Memberships": [
            "Do you offer loyalty programs?",
            "How can I stay updated on deals and offers?"
        ]
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
    chatButton.addEventListener("click", () => {
        chatModal.classList.add("active");
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
        if (answers[userMessage]) {
            typingIndicator.style.display = "block";
            setTimeout(() => {
                typingIndicator.style.display = "none";
                appendMessage("bot", answers[userMessage]);
            }, 1000);
        } else {
            typingIndicator.style.display = "block";
            setTimeout(() => {
                typingIndicator.style.display = "none";
                appendMessage("bot", "🤖 Sorry, I don't have an answer for that. Try another question!");
            }, 1000);
        }
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
        categories[category].forEach((question) => {
            const button = document.createElement("button");
            button.classList.add("option-button");
            button.innerText = question;
            button.addEventListener("click", () => getAnswer(question));
            questionsContainer.appendChild(button);
        });
        chatMessages.appendChild(questionsContainer);
        scrollToBottom();
    }
    function getAnswer(question) {
        appendMessage("user", question);
        typingIndicator.style.display = "block";
        setTimeout(() => {
            typingIndicator.style.display = "none";
            appendMessage("bot", answers[question] || "🤖 I'm not sure, but I can find out for you!");
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
    voiceInputButton.addEventListener("click", () => {
        if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
            alert("Your browser does not support voice input.");
            return;
        }
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = (event) => {
            const voiceMessage = event.results[0][0].transcript;
            chatInput.value = voiceMessage;
            sendMessage();
        };
        recognition.onerror = () => {
            appendMessage("bot", "❌ Sorry, I couldn't understand your voice input.");
        };
    });
    appendMessage("bot", "👋 Hi there! How can I assist you today?");
    showCategories();
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
});


// Your existing homestay.js code above
// (functions to generate homestays, fetch data, etc.)

// --- Skeleton loader logic ---
document.addEventListener("DOMContentLoaded", () => {
  const skeleton = document.getElementById("skeleton-container");
  const homestays = document.getElementById("homestay-container");

  if (skeleton && homestays) {
    // Show skeleton first
    skeleton.style.display = "flex";
    homestays.style.display = "none";

    // Simulate data fetch (you can replace with fetch)
    setTimeout(() => {
      skeleton.style.display = "none";   // Hide skeleton
      homestays.style.display = "flex";  // Show real cards
    }, 2000); // 2 sec loading
  }
});
