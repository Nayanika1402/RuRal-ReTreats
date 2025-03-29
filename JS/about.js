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
    document.querySelector(".cta-button").addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.1)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentIndex = 0;
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove("active");
            if (i === index) {
                testimonial.classList.add("active");
            }
        });
    }
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }
    nextBtn.addEventListener("click", nextTestimonial);
    prevBtn.addEventListener("click", prevTestimonial);
    setInterval(nextTestimonial, 5000); 
});
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        counter.textContent = "0"; 
        const updateCounter = () => {
            const target = +counter.getAttribute("data-target"); 
            const speed = target / 100; 
            let count = 0;
            const incrementCounter = () => {
                count += Math.ceil(speed);
                if (count >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = count;
                    setTimeout(incrementCounter, 45);
                }
            };
            incrementCounter();
        };
        updateCounter();
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);
    const lightboxContent = document.createElement("div");
    lightboxContent.classList.add("lightbox-content");
    lightbox.appendChild(lightboxContent);
    const closeLightbox = document.createElement("span");
    closeLightbox.classList.add("close-lightbox");
    closeLightbox.innerHTML = "&times;";
    lightboxContent.appendChild(closeLightbox);
    const lightboxImg = document.createElement("img");
    lightboxContent.appendChild(lightboxImg);
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".filter-btn.active").classList.remove("active");
            button.classList.add("active");
            const filterValue = button.getAttribute("data-filter");
            galleryItems.forEach(item => {
                if (filterValue === "all" || item.classList.contains(filterValue)) {
                    item.style.display = "block";
                    item.style.opacity = "0";
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.animation = "fadeIn 0.5s ease-in-out";
                    }, 100);
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 200);
                }
            });
        });
    });
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const imgSrc = item.querySelector("img").getAttribute("src");
            lightboxImg.setAttribute("src", imgSrc);
            lightbox.classList.add("active");
        });
    });
    closeLightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove("active");
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".cta-btn").forEach(button => {
        button.addEventListener("click", function(event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });
    const observerOptions = { threshold: 0.3 };
    const sectionsToAnimate = document.querySelectorAll(".cta-section, .newsletters, .social-media");
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sectionsToAnimate.forEach(section => sectionObserver.observe(section));
    document.getElementById("subscribe-btn").addEventListener("click", function () {
        let emailInput = document.getElementById("newsletter-emails").value.trim();
        if (emailInput) {
            alert("🎉 Thank you for subscribing! Get ready for exclusive travel deals.");
            document.getElementById("newsletter-emails").value = "";
        } else {
            alert("⚠️ Please enter a valid email address.");
        }
    });
});
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
document.addEventListener("DOMContentLoaded", function () {
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
            "home": "../HTML/index.html",
            "services": "../HTML/services.html",
            "homestays": "../HTML/homestays.html",
            "faq": "../HTML/faq.html",
            "contact": "../HTML/contact.html",
            "privacy policy": "../HTML/pp.html",
            "terms and condition": "../HTML/t&c.html",
            "service": "../HTML/services.html",
            "homestay": "../HTML/homestays.html",
            "faqs": "../HTML/faq.html",
            "blogs": "../HTML/blog.html",
            "blog": "../HTML/blog.html",
            "Adventure": "../HTML/Adventure.html",
            "Adventures": "../HTML/Adventure.html",
            "pp": "../HTML/pp.html",
            "t&c": "../HTML/t&c.html"
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