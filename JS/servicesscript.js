
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
    const carousel = document.querySelector("#tours .carousel-wrapper");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const cardWidth = () => {
        const card = document.querySelector("#tours .package-card");
        return card ? card.offsetWidth + 18 : 300; // card width + gap
    };

    nextBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: cardWidth(), behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -cardWidth(), behavior: "smooth" });
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
        } else {
            navbar.classList.remove("sticky");
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
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
    const activeTab = document.querySelector(".tab-link.active");
    if (activeTab) {
        let tabId = activeTab.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    }
    tabLinks.forEach(link => {
        link.addEventListener("click", function () {
            let tabId = this.getAttribute("data-tab");
            tabLinks.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));
            this.classList.add("active");
            document.getElementById(tabId).classList.add("active");
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const openBusFormBtn = document.getElementById("open-bus-form");
    const busInfo = document.getElementById("bus-info");
    const busForm = document.getElementById("bus-form");
    const submitBusFormBtn = document.getElementById("submit-bus-form");
    const passengerForm = document.getElementById("passenger-form");
    const payNowBtn = document.getElementById("pay-now");
    const backToBusFormBtn = document.getElementById("back-to-bus-form");
    const busTypeSelect = document.getElementById("bus-type");
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const priceInput = document.getElementById("price");
    const amenitiesCheckboxes = document.querySelectorAll(".amenities-container input[type='checkbox']");
    const busFares = {
        "AC": 800,
        "Non-AC": 500,
        "Sleeper": 1000
    };
    const distancePricing = {
        "Madhya Pradesh-Tamil Nadu": 3600,
        "Madhya Pradesh-Uttarakhand": 1600,
        "Madhya Pradesh-Himachal Pradesh": 2000,
        "Madhya Pradesh-Kerala": 4000,
        "Madhya Pradesh-Rajasthan": 1000,
        "Tamil Nadu-Uttarakhand": 4400,
        "Tamil Nadu-Himachal Pradesh": 5000,
        "Tamil Nadu-Kerala": 1200,
        "Tamil Nadu-Rajasthan": 3800,
        "Uttarakhand-Himachal Pradesh": 600,
        "Uttarakhand-Kerala": 4800,
        "Uttarakhand-Rajasthan": 1200,
        "Himachal Pradesh-Kerala": 5600,
        "Himachal Pradesh-Rajasthan": 1600,
        "Kerala-Rajasthan": 4400,
        "Tamil Nadu-Madhya Pradesh": 3600,
        "Uttarakhand-Madhya Pradesh": 1600,
        "Himachal Pradesh-Madhya Pradesh": 2000,
        "Kerala-Madhya Pradesh": 4000,
        "Rajasthan-Madhya Pradesh": 1000,
        "Uttarakhand-Tamil Nadu": 4400,
        "Himachal Pradesh-Tamil Nadu": 5000,
        "Kerala-Tamil Nadu": 1200,
        "Rajasthan-Tamil Nadu": 3800,
        "Himachal Pradesh-Uttarakhand": 600,
        "Kerala-Uttarakhand": 4800,
        "Rajasthan-Uttarakhand": 1200,
        "Kerala-Himachal Pradesh": 5600,
        "Rajasthan-Himachal Pradesh": 1600,
        "Rajasthan-Kerala": 4400
    };
    const amenitiesPricing = {
        "WiFi": 50,
        "Food": 100,
        "Seats": 80,
        "Entertainment": 70,
        "Charging": 30,
        "Restrooms": 60
    };
    function calculatePrice() {
        const busType = busTypeSelect.value;
        const from = fromSelect.value;
        const to = toSelect.value;
        if (!busType || !from || !to) {
            priceInput.value = "Select all fields";
            return;
        }
        let baseFare = busFares[busType] || 500;
        let distanceKey = `${from}-${to}`;
        let distanceFare = distancePricing[distanceKey] || 200;
        let totalFare = baseFare + distanceFare;
        let amenitiesCost = 0;
        let selectedAmenities = [];
        amenitiesCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedAmenities.push(`${checkbox.value} (₹${amenitiesPricing[checkbox.value]})`);
                amenitiesCost += amenitiesPricing[checkbox.value] || 0;
            }
        });
        totalFare += amenitiesCost;
        priceInput.value = `₹${totalFare}`;
    }
    [busTypeSelect, fromSelect, toSelect, ...amenitiesCheckboxes].forEach(element => {
        element.addEventListener("change", calculatePrice);
    });
    openBusFormBtn.addEventListener("click", function (event) {
        event.preventDefault();
        busInfo.classList.add("hidden");
        busForm.classList.remove("hidden");
    });
    submitBusFormBtn.addEventListener("click", function () {
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        if (!priceInput.value || priceInput.value === "₹0" || priceInput.value === "Select all fields") {
            alert("Please select the bus type and destination to calculate price.");
            return;
        }
        if (!date || !time) {
            alert("Please select the date and time for your journey.");
            return;
        }
        busForm.classList.add("hidden");
        passengerForm.classList.remove("hidden");
    });
    backToBusFormBtn.addEventListener("click", function () {
        passengerForm.classList.add("hidden");
        busForm.classList.remove("hidden");
    });
    payNowBtn.addEventListener("click", function () {
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("children").value;

        if (!name || !phone || !email || !adults || !children) {
            alert("Please fill in all passenger details before proceeding.");
            return;
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const finalPrice = parseFloat(priceInput.value.replace("₹", ""));
        let selectedAmenities = [];
        let totalAmenitiesCost = 0;
        amenitiesCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedAmenities.push(checkbox.value);
                totalAmenitiesCost += amenitiesPricing[checkbox.value] || 0;
            }
        });

        const gstRate = 5; // 5% GST for transportation
        const subtotal = finalPrice + totalAmenitiesCost;
        const gstAmount = Math.round(subtotal * 0.05);
        const totalAmount = subtotal + gstAmount;

        // Create booking data for payment
        const busBookingData = {
            journey: {
                from: fromSelect.value,
                to: toSelect.value,
                date: document.getElementById("date").value,
                time: document.getElementById("time").value
            },
            busDetails: {
                type: busTypeSelect.value,
                amenities: selectedAmenities
            },
            passengers: {
                adults: parseInt(adults),
                children: parseInt(children)
            },
            pricing: {
                baseFare: finalPrice - totalAmenitiesCost,
                fareAmount: finalPrice,
                amenitiesCost: totalAmenitiesCost,
                gstAmount: gstAmount,
                totalAmount: totalAmount
            },
            customerDetails: {
                name: name,
                email: email,
                phone: phone
            }
        };

        // Initialize PaymentHandler if not available
        if (typeof PaymentHandler === 'undefined') {
            console.log('Loading PaymentHandler...');
            const script = document.createElement('script');
            script.src = './JS/payment-handler.js';
            script.onload = function() {
                const paymentHandler = new PaymentHandler();
                paymentHandler.processBusPayment(busBookingData);
            };
            script.onerror = function() {
                alert('Payment system could not be loaded. Please try again.');
            };
            document.head.appendChild(script);
        } else {
            const paymentHandler = new PaymentHandler();
            paymentHandler.processBusPayment(busBookingData);
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    const packageCards = document.querySelectorAll(".package-card");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentIndex = 0;
    function updateCarousel() {
        const cardWidth = packageCards[0].offsetWidth;
        carouselWrapper.style.transform = "translateX(0)";
    }
    nextBtn.addEventListener("click", function () {
        if (currentIndex < packageCards.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = packageCards.length - 1;
        }
        updateCarousel();
    });
    window.addEventListener("resize", updateCarousel);
});

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

// Holiday Package Booking Functionality
document.addEventListener("DOMContentLoaded", function() {
    console.log('Services script loaded');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(function() {
        // Add click handlers for all Book Now buttons
        const bookButtons = document.querySelectorAll('.book-btn');
        console.log('Found book buttons:', bookButtons.length);
        
        if (bookButtons.length === 0) {
            console.error('No book buttons found! Checking selectors...');
            const allLinks = document.querySelectorAll('a');
            console.log('All links found:', allLinks.length);
            allLinks.forEach((link, i) => {
                if (link.textContent.includes('Book Now')) {
                    console.log('Found Book Now link:', i, link);
                }
            });
        }
        
        bookButtons.forEach((button, index) => {
            console.log('Adding listener to button', index, button);
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Book button clicked!');
                
                // Check if user is logged in first
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    alert('Please login to book a package');
                    window.location.href = 'login.html';
                    return;
                }
                
                // Get package details from the parent card
                const packageCard = this.closest('.package-card');
                if (!packageCard) {
                    console.error('Package card not found');
                    return;
                }
                
                const packageTitle = packageCard.querySelector('h2').textContent;
                const packagePriceElement = packageCard.querySelector('.price strong');
                const packageDurationElement = packageCard.querySelector('p');
                
                if (!packagePriceElement || !packageDurationElement) {
                    console.error('Package details not found');
                    return;
                }
                
                const packagePrice = packagePriceElement.textContent;
                const packageDuration = packageDurationElement.textContent;
                
                // Create booking data
                const bookingData = {
                    type: 'package',
                    title: packageTitle,
                    price: packagePrice,
                    duration: packageDuration,
                    amount: parseFloat(packagePrice.replace('₹', '').replace(',', ''))
                };
                
                console.log('Booking data:', bookingData);
                
                // Show confirmation and proceed with payment
                if (confirm(`Book ${packageTitle} for ${packagePrice}?`)) {
                    initiatePackagePayment(bookingData);
                }
            });
        });
        
        // Also add a global click listener to test
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('book-btn') || e.target.textContent.includes('Book Now')) {
                console.log('Global click detected on book button');
            }
        });
    }, 1000);
});

function initiatePackagePayment(bookingData) {
    console.log('Initiating payment for:', bookingData);
    
    // Check if PaymentHandler is available
    if (typeof PaymentHandler === 'undefined') {
        console.log('PaymentHandler not found, loading script...');
        // Load payment handler script dynamically
        const script = document.createElement('script');
        script.src = './JS/payment-handler.js';
        script.onload = function() {
            console.log('Payment handler script loaded');
            processPackagePayment(bookingData);
        };
        script.onerror = function() {
            console.error('Failed to load payment handler script');
            showBookingError('Payment system could not be loaded. Please try again.');
        };
        document.head.appendChild(script);
    } else {
        console.log('PaymentHandler available, processing payment...');
        processPackagePayment(bookingData);
    }
}

async function processPackagePayment(bookingData) {
    try {
        console.log('Creating PaymentHandler instance...');
        
        // First, test if the server is running
        try {
            const healthCheck = await fetch('http://localhost:3001/health');
            if (!healthCheck.ok) {
                throw new Error('Server not responding');
            }
            console.log('Server health check passed');
        } catch (serverError) {
            console.error('Server connection error:', serverError);
            showBookingError('Server is not running. Please start the server first.');
            return;
        }
        
        const paymentHandler = new PaymentHandler();
        
        // Get user data from localStorage if available
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Create package data in the format expected by PaymentHandler
        const packageData = {
            packageName: bookingData.title,
            pricing: {
                totalAmount: bookingData.amount // Amount should already be in rupees, not paise
            },
            customerName: userData.username || userData.name || 'Guest User',
            email: userData.email || 'guest@example.com',
            phone: userData.phone || '9999999999',
            bookingType: 'package'
        };
        
        console.log('Package data:', packageData);
        
        // Use the correct method name from PaymentHandler
        await paymentHandler.processPackagePayment(packageData);
        
    } catch (error) {
        console.error('Payment processing error:', error);
        showBookingError('Payment system error: ' + error.message);
    }
}

function showBookingSuccess(bookingData, paymentResponse) {
    const modal = document.createElement('div');
    modal.className = 'booking-success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-header">
                <h2>🎉 Booking Confirmed!</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="booking-details">
                <h3>${bookingData.title}</h3>
                <p><strong>Duration:</strong> ${bookingData.duration}</p>
                <p><strong>Amount Paid:</strong> ${bookingData.price}</p>
                <p><strong>Payment ID:</strong> ${paymentResponse.razorpay_payment_id}</p>
                <p><strong>Booking Reference:</strong> PKG${Date.now()}</p>
            </div>
            <div class="next-steps">
                <p>📧 Confirmation email will be sent shortly</p>
                <p>📞 Our team will contact you within 24 hours</p>
            </div>
            <button class="close-btn" onclick="closeBookingModal()">Close</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    modal.querySelector('.modal-content').style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    modal.querySelector('.close-modal').onclick = closeBookingModal;
    modal.querySelector('.close-btn').onclick = closeBookingModal;
    modal.onclick = function(e) {
        if (e.target === modal) closeBookingModal();
    };
}

function showBookingError(errorMessage) {
    alert(`Booking failed: ${errorMessage}`);
}

function closeBookingModal() {
    const modal = document.querySelector('.booking-success-modal');
    if (modal) {
        modal.remove();
    }
}

