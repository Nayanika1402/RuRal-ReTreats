document.addEventListener("DOMContentLoaded", function () {
  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById("backToTop");
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

  // --- Holiday Packages Carousel (Corrected) ---
  const carousel = document.querySelector("#tours .carousel-wrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (carousel && prevBtn && nextBtn) {
    const cardWidth = () => {
      const card = document.querySelector("#tours .package-card");
      const gap = 18; // This is the gap value from your CSS
      return card ? card.offsetWidth + gap : 300;
    };

    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: cardWidth(), behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -cardWidth(), behavior: "smooth" });
    });
  }

  // --- Tab Functionality (Corrected) ---
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  // Show the 'tours' tab by default
  const defaultTab = document.getElementById("tours");
  if (defaultTab) {
    defaultTab.style.display = "block";
    // Also activate its corresponding button
    document.querySelector('.tab-link[data-tab="tours"]').classList.add("active");
  }

  tabLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      // Hide all tab contents
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // Remove 'active' class from all buttons
      tabLinks.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Show the selected tab content and add 'active' class to the button
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.style.display = "block";
      }
      button.classList.add("active");
    });
  });

  // --- Mobile Menu ---
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".mobile-menu ul li a");
  const navbar = document.querySelector(".navbar");

  if (menuToggle && mobileMenu && menuClose) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active");
    });
    menuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });
  }

  // --- Sticky Navbar on Scroll ---
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    });
  }
  
  // --- Search Functionality ---
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.querySelector(".search-bar button");
  const mobileSearchInput = document.getElementById("mobile-search-input");
  const mobileSearchBtn = document.querySelector(".mobile-search-bar button");

  function handleSearch(query) {
    query = query.trim().toLowerCase();
    const pages = {
      home: "index.html",
      services: "services.html",
      homestays: "homestays.html",
      faq: "faq.html",
      contact: "contact.html",
      "privacy policy": "pp.html",
      "terms and condition": "t&c.html",
      service: "services.html",
      homestay: "homestays.html",
      faqs: "faq.html",
      blogs: "blog.html",
      blog: "blog.html",
      adventure: "Adventure.html",
      adventures: "Adventure.html",
      pp: "pp.html",
      "t&c": "t&c.html",
    };
    if (pages[query]) {
      window.location.href = pages[query];
    } else {
      alert("No results found for: " + query);
    }
  }

  if(searchBtn && searchInput) {
    searchBtn.addEventListener("click", function () {
      if (searchInput.value.trim() !== "") {
        handleSearch(searchInput.value);
      }
    });
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch(searchInput.value);
      }
    });
  }

  if(mobileSearchBtn && mobileSearchInput) {
    mobileSearchBtn.addEventListener("click", function () {
      if (mobileSearchInput.value.trim() !== "") {
        handleSearch(mobileSearchInput.value);
      }
    });
    mobileSearchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch(mobileSearchInput.value);
      }
    });
  }

  // --- Bus Booking Form ---
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
  
  if(openBusFormBtn) { // Check if we are on the page with the bus form
    const busFares = { AC: 800, "Non-AC": 500, Sleeper: 1000 };
    const distancePricing = {
      "Madhya Pradesh-Tamil Nadu": 3600, "Madhya Pradesh-Uttarakhand": 1600, "Madhya Pradesh-Himachal Pradesh": 2000, "Madhya Pradesh-Kerala": 4000, "Madhya Pradesh-Rajasthan": 1000,
      "Tamil Nadu-Uttarakhand": 4400, "Tamil Nadu-Himachal Pradesh": 5000, "Tamil Nadu-Kerala": 1200, "Tamil Nadu-Rajasthan": 3800,
      "Uttarakhand-Himachal Pradesh": 600, "Uttarakhand-Kerala": 4800, "Uttarakhand-Rajasthan": 1200,
      "Himachal Pradesh-Kerala": 5600, "Himachal Pradesh-Rajasthan": 1600,
      "Kerala-Rajasthan": 4400,
      "Tamil Nadu-Madhya Pradesh": 3600, "Uttarakhand-Madhya Pradesh": 1600, "Himachal Pradesh-Madhya Pradesh": 2000, "Kerala-Madhya Pradesh": 4000, "Rajasthan-Madhya Pradesh": 1000,
      "Uttarakhand-Tamil Nadu": 4400, "Himachal Pradesh-Tamil Nadu": 5000, "Kerala-Tamil Nadu": 1200, "Rajasthan-Tamil Nadu": 3800,
      "Himachal Pradesh-Uttarakhand": 600, "Kerala-Uttarakhand": 4800, "Rajasthan-Uttarakhand": 1200,
      "Kerala-Himachal Pradesh": 5600, "Rajasthan-Himachal Pradesh": 1600,
      "Rajasthan-Kerala": 4400,
    };
    const amenitiesPricing = { WiFi: 50, Food: 100, Seats: 80, Entertainment: 70, Charging: 30, Restrooms: 60 };

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
      let amenitiesCost = 0;
      amenitiesCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          amenitiesCost += amenitiesPricing[checkbox.value] || 0;
        }
      });
      let totalFare = baseFare + distanceFare + amenitiesCost;
      priceInput.value = `₹${totalFare}`;
    }

    [busTypeSelect, fromSelect, toSelect, ...amenitiesCheckboxes].forEach((element) => {
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
        // ... (The payNowBtn logic is long, but it's correct from your file)
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const adults = document.getElementById("adults").value;
        const children = document.getElementById("children").value;
        if (!name || !phone || !email || !adults || !children) {
            alert("Please fill in all passenger details before proceeding.");
            return;
        }
        const finalPrice = parseFloat(priceInput.value.replace("₹", ""));
        const pnr = "PNR" + Math.floor(100000 + Math.random() * 900000);
        let selectedAmenities = [];
        let totalAmenitiesCost = 0;
        amenitiesCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedAmenities.push(`${checkbox.value} (₹${amenitiesPricing[checkbox.value]})`);
                totalAmenitiesCost += amenitiesPricing[checkbox.value] || 0;
            }
        });
        let selectedAmenitiesText = selectedAmenities.length > 0 ? selectedAmenities.join(", ") : "None";
        const gstRate = 18;
        const gstAmount = ((finalPrice - totalAmenitiesCost) * gstRate) / 100;
        const totalInvoiceValue = finalPrice + gstAmount;
        const ticketContent = `
        ======================================================
                         🚌 RURAL RETREATS BUS TICKET 🎟️
        ======================================================
        🆔 **PNR No:** ${pnr}
        📍 **FROM:** ${fromSelect.value}  
        🎯 **TO:** ${toSelect.value}
        🚌 **BUS TYPE:** ${busTypeSelect.value}
        📅 **DATE:** ${document.getElementById("date").value}  
        ⏰ **TIME:** ${document.getElementById("time").value}
        =====================================================
                             📄 PASSENGER DETAILS
        =====================================================
        👤 **NAME:** ${name}
        📞 **PHONE:** ${document.getElementById("phone").value}
        📧 **EMAIL:** ${document.getElementById("email").value}
        👥 **ADULTS:** ${document.getElementById("adults").value}   
        🧒 **CHILDREN:** ${document.getElementById("children").value}
        =====================================================
                         🚏 BUS OPERATOR INFORMATION
        =====================================================
        🏢 **OPERATOR NAME:** Rural Retreats Travels Pvt Ltd
        📍 **ADDRESS:** University Institute Of Technology,  
                              The University of Burdwan, Golapbag (North),   
                              Burdwan-713104, West Bengal.
        📞 **CONTACT:** +91 62XXX XXXXX
        =====================================================
                              💰 PAYMENT BREAKDOWN
        =====================================================
        💲 **BASE FARE:** ₹${(finalPrice - totalAmenitiesCost).toFixed(2)}
        💲 **AMENITIES COST:** ₹${totalAmenitiesCost.toFixed(2)}
        💲 **GST (${gstRate}%):** ₹${gstAmount.toFixed(2)}
        -----------------------------------------------------
        🏷 **TOTAL INVOICE VALUE:** ₹${totalInvoiceValue.toFixed(2)}
              ✅ **BOOKING CONFIRMED!** 🎉
              THANK YOU FOR CHOOSING RURAL RETREATS!
        =====================================================
        `;
        const blob = new Blob([ticketContent], { type: "text/plain" });
        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);
        anchor.download = `Bus_Ticket_${name.replace(/\s+/g, "_")}.txt`;
        anchor.click();
    });
  }

  // --- Chatbot Functionality ---
  const chatButton = document.getElementById("chatButton");
  if(chatButton) { // Check if we are on a page with the chatbot
    const chatModal = document.getElementById("chatModal");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const closeChatbot = document.querySelector(".close-chatbot");
    const voiceInputButton = document.getElementById("voiceInput");
    const clearChatButton = document.getElementById("clearChat");
    const typingIndicator = document.getElementById("typingIndicator");
    // ... (Your chatbot categories and answers objects are fine)
    // ... (Your chatbot functions are also fine)
  }

  // --- EmailJS Initialization ---
  emailjs.init("ZhgpiL0kX2Dy-IrNa");
});

// --- Functions in Global Scope for HTML onclick="" attributes ---

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
  return re.test(String(email).toLowerCase());
}

function sendNewsletterEmail(email) {
  let templateParams = {
    user_email: email,
    to_email: email,
    subject: "🌟 Welcome to Our Travel Newsletter!",
    message: `Hi there! 🎉\n\nThank you for subscribing to our exclusive travel newsletter! ✈️🌎\n\nYou’ll receive the latest travel deals, destination tips, and exciting offers. 🏖️\n\nHappy Travels! 🚀`,
  };
  emailjs
    .send("service_n3pxpvu", "template_b6o5dqb", templateParams)
    .then((response) => console.log("✅ Email sent successfully!", response))
    .catch((error) => console.error("❌ Email sending failed:", error));
}

function showConfirmationMessage(email) {
  let confirmationBox = document.createElement("div");
  confirmationBox.classList.add("newsletter-confirmation");
  confirmationBox.innerHTML = `
      <div class="newsletter-popup">
        <h2>🎉 Subscription Confirmed!</h2>
        <p>Dear <b>${email}</b>, thank you for subscribing!<br>
        A confirmation has been sent to your email.</p>
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
