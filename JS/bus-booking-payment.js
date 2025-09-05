// JS/bus-booking-payment.js
// Enhanced bus booking with Razorpay integration

class BusBooking {
    constructor() {
        this.paymentHandler = new PaymentHandler();
        this.currentBooking = {
            journey: {
                from: '',
                to: '',
                date: '',
                time: ''
            },
            busDetails: {
                type: 'AC',
                amenities: []
            },
            passengers: {
                adults: 1,
                children: 0
            },
            pricing: {
                baseFare: 0,
                amenitiesCost: 0,
                gstAmount: 0,
                totalAmount: 0
            },
            customerDetails: {
                name: '',
                email: '',
                phone: ''
            }
        };

        this.busTypes = {
            'AC': { baseFare: 800, name: 'AC Bus' },
            'Non-AC': { baseFare: 600, name: 'Non-AC Bus' },
            'Sleeper': { baseFare: 1200, name: 'Sleeper Bus' }
        };

        this.amenityPrices = {
            'WiFi': 50,
            'Food': 100,
            'Seats': 80,
            'Entertainment': 70,
            'Charging': 30,
            'Restrooms': 60
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeDatePicker();
        this.loadStates();
    }

    bindEvents() {
        // Bus form events
        document.addEventListener('change', (e) => {
            if (e.target.matches('#bus-type')) {
                this.updateBusType();
            }
            if (e.target.matches('#from, #to')) {
                this.updateJourney();
            }
            if (e.target.matches('#date, #time')) {
                this.updateDateTime();
            }
            if (e.target.matches('.amenity-checkbox')) {
                this.updateAmenities();
            }
            if (e.target.matches('#adults, #children')) {
                this.updatePassengers();
            }
        });

        // Open bus form button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#open-bus-form')) {
                e.preventDefault();
                this.showBusBookingModal();
            }
        });

        // Submit bus form
        document.addEventListener('click', (e) => {
            if (e.target.matches('#submit-bus-form')) {
                e.preventDefault();
                this.showPassengerForm();
            }
        });

        // Payment button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#pay-now')) {
                e.preventDefault();
                this.handlePayment();
            }
        });

        // Back button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#back-to-bus-form')) {
                e.preventDefault();
                this.showBusForm();
            }
        });
    }

    initializeDatePicker() {
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.min = today;
        }
    }

    loadStates() {
        const states = ['Madhya Pradesh', 'Tamil Nadu', 'Uttarakhand', 'Himachal Pradesh', 'Kerala', 'Rajasthan'];
        const fromSelect = document.getElementById('from');
        const toSelect = document.getElementById('to');

        if (fromSelect && toSelect) {
            states.forEach(state => {
                fromSelect.innerHTML += `<option value="${state}">${state}</option>`;
                toSelect.innerHTML += `<option value="${state}">${state}</option>`;
            });
        }
    }

    showBusBookingModal() {
        const modal = document.createElement('div');
        modal.className = 'bus-booking-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h2><i class="fas fa-bus"></i> Book Your Bus Journey</h2>
                        <p>Travel comfortably across India with our premium bus services</p>
                    </div>

                    <div class="booking-steps">
                        <div class="step active" data-step="1">
                            <span class="step-number">1</span>
                            <span class="step-title">Journey Details</span>
                        </div>
                        <div class="step" data-step="2">
                            <span class="step-number">2</span>
                            <span class="step-title">Passenger Info</span>
                        </div>
                        <div class="step" data-step="3">
                            <span class="step-number">3</span>
                            <span class="step-title">Payment</span>
                        </div>
                    </div>

                    <form id="bus-booking-form" class="booking-form">
                        <div class="form-section active" id="journey-details">
                            <h3>Journey Information</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="bus-type">Bus Type</label>
                                    <select id="bus-type" required>
                                        <option value="AC">AC Bus - ₹800</option>
                                        <option value="Non-AC">Non-AC Bus - ₹600</option>
                                        <option value="Sleeper">Sleeper Bus - ₹1200</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="from">From</label>
                                    <select id="from" required>
                                        <option value="">Select departure state</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="to">To</label>
                                    <select id="to" required>
                                        <option value="">Select destination state</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="date">Journey Date</label>
                                    <input type="date" id="date" required>
                                </div>
                                <div class="form-group">
                                    <label for="time">Departure Time</label>
                                    <input type="time" id="time" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="adults">Adults</label>
                                    <select id="adults" required>
                                        <option value="1">1 Adult</option>
                                        <option value="2">2 Adults</option>
                                        <option value="3">3 Adults</option>
                                        <option value="4">4 Adults</option>
                                        <option value="5">5 Adults</option>
                                        <option value="6">6 Adults</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="children">Children</label>
                                    <select id="children">
                                        <option value="0">0 Children</option>
                                        <option value="1">1 Child</option>
                                        <option value="2">2 Children</option>
                                        <option value="3">3 Children</option>
                                    </select>
                                </div>
                            </div>

                            <div class="amenities-section">
                                <h4>Select Additional Amenities</h4>
                                <div class="amenities-grid">
                                    ${this.renderAmenitiesOptions()}
                                </div>
                            </div>

                            <div class="price-summary">
                                <div class="summary-item">
                                    <span>Base Fare</span>
                                    <span id="base-fare">₹800</span>
                                </div>
                                <div class="summary-item">
                                    <span>Amenities</span>
                                    <span id="amenities-cost">₹0</span>
                                </div>
                                <div class="summary-item">
                                    <span>GST (5%)</span>
                                    <span id="gst-amount">₹40</span>
                                </div>
                                <div class="summary-total">
                                    <span>Total Amount</span>
                                    <span id="total-amount">₹840</span>
                                </div>
                            </div>

                            <button type="button" id="continue-to-passenger" class="continue-btn">
                                Continue to Passenger Details
                            </button>
                        </div>

                        <div class="form-section" id="passenger-details">
                            <h3>Passenger Information</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="passenger-name">Full Name</label>
                                    <input type="text" id="passenger-name" required>
                                </div>
                                <div class="form-group">
                                    <label for="passenger-phone">Phone Number</label>
                                    <input type="tel" id="passenger-phone" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="passenger-email">Email Address</label>
                                <input type="email" id="passenger-email" required>
                            </div>

                            <div class="booking-review">
                                <h4>Review Your Booking</h4>
                                <div id="booking-summary"></div>
                            </div>

                            <div class="form-actions">
                                <button type="button" id="back-to-journey" class="back-btn">
                                    <i class="fas fa-arrow-left"></i> Back
                                </button>
                                <button type="button" id="proceed-to-payment" class="payment-btn">
                                    <i class="fas fa-credit-card"></i> Pay Now
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;

        this.addBusModalStyles();
        document.body.appendChild(modal);
        this.loadStates();
        this.initializeDatePicker();
        this.bindModalEvents(modal);
        this.updateBusType(); // Initialize pricing
    }

    bindModalEvents(modal) {
        // Close modal
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.querySelector('.modal-overlay').onclick = (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                modal.remove();
            }
        };

        // Continue to passenger details
        modal.querySelector('#continue-to-passenger').onclick = () => {
            if (this.validateJourneyForm()) {
                this.showPassengerSection();
            }
        };

        // Back to journey details
        modal.querySelector('#back-to-journey').onclick = () => {
            this.showJourneySection();
        };

        // Proceed to payment
        modal.querySelector('#proceed-to-payment').onclick = () => {
            this.handlePayment();
        };

        // Form change events
        modal.addEventListener('change', (e) => {
            if (e.target.matches('#bus-type')) {
                this.updateBusType();
            }
            if (e.target.matches('#from, #to, #date, #time')) {
                this.updateJourney();
            }
            if (e.target.matches('#adults, #children')) {
                this.updatePassengers();
            }
            if (e.target.matches('.amenity-checkbox')) {
                this.updateAmenities();
            }
        });
    }

    renderAmenitiesOptions() {
        return Object.entries(this.amenityPrices).map(([amenity, price]) => `
            <label class="amenity-option">
                <input type="checkbox" class="amenity-checkbox" value="${amenity}" data-price="${price}">
                <div class="amenity-info">
                    <i class="fas fa-${this.getAmenityIcon(amenity)}"></i>
                    <span class="amenity-name">${amenity}</span>
                    <span class="amenity-price">+₹${price}</span>
                </div>
            </label>
        `).join('');
    }

    getAmenityIcon(amenity) {
        const icons = {
            'WiFi': 'wifi',
            'Food': 'utensils',
            'Seats': 'chair',
            'Entertainment': 'tv',
            'Charging': 'plug',
            'Restrooms': 'restroom'
        };
        return icons[amenity] || 'check';
    }

    updateBusType() {
        const busType = document.getElementById('bus-type')?.value;
        if (busType && this.busTypes[busType]) {
            this.currentBooking.busDetails.type = busType;
            this.currentBooking.pricing.baseFare = this.busTypes[busType].baseFare;
            this.calculateTotal();
        }
    }

    updateJourney() {
        const from = document.getElementById('from')?.value;
        const to = document.getElementById('to')?.value;
        const date = document.getElementById('date')?.value;
        const time = document.getElementById('time')?.value;

        this.currentBooking.journey = { from, to, date, time };
    }

    updateDateTime() {
        const date = document.getElementById('date')?.value;
        const time = document.getElementById('time')?.value;
        
        this.currentBooking.journey.date = date;
        this.currentBooking.journey.time = time;
    }

    updateAmenities() {
        const checkboxes = document.querySelectorAll('.amenity-checkbox:checked');
        this.currentBooking.busDetails.amenities = Array.from(checkboxes).map(cb => cb.value);
        this.calculateTotal();
    }

    updatePassengers() {
        const adults = parseInt(document.getElementById('adults')?.value || 1);
        const children = parseInt(document.getElementById('children')?.value || 0);
        
        this.currentBooking.passengers = { adults, children };
        this.calculateTotal();
    }

    calculateTotal() {
        const { baseFare } = this.currentBooking.pricing;
        const { adults, children } = this.currentBooking.passengers;
        const { amenities } = this.currentBooking.busDetails;

        // Base calculation (adults pay full fare, children 50%)
        let fareAmount = (baseFare * adults) + (baseFare * children * 0.5);

        // Amenities cost
        let amenitiesCost = 0;
        amenities.forEach(amenity => {
            amenitiesCost += this.amenityPrices[amenity] * (adults + children);
        });

        // GST calculation (5% for transportation)
        const subtotal = fareAmount + amenitiesCost;
        const gstAmount = Math.round(subtotal * 0.05);
        const totalAmount = subtotal + gstAmount;

        // Update pricing object
        this.currentBooking.pricing = {
            ...this.currentBooking.pricing,
            baseFare,
            fareAmount,
            amenitiesCost,
            gstAmount,
            totalAmount
        };

        // Update UI
        this.updatePriceDisplay();
    }

    updatePriceDisplay() {
        const { fareAmount, amenitiesCost, gstAmount, totalAmount } = this.currentBooking.pricing;
        
        document.getElementById('base-fare').textContent = `₹${fareAmount}`;
        document.getElementById('amenities-cost').textContent = `₹${amenitiesCost}`;
        document.getElementById('gst-amount').textContent = `₹${gstAmount}`;
        document.getElementById('total-amount').textContent = `₹${totalAmount}`;
    }

    validateJourneyForm() {
        const { from, to, date, time } = this.currentBooking.journey;
        
        if (!from || !to) {
            alert('Please select both departure and destination states.');
            return false;
        }
        
        if (from === to) {
            alert('Departure and destination cannot be the same.');
            return false;
        }
        
        if (!date || !time) {
            alert('Please select journey date and time.');
            return false;
        }

        // Check if date is not in the past
        const journeyDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        
        if (journeyDateTime <= now) {
            alert('Journey date and time must be in the future.');
            return false;
        }

        return true;
    }

    showPassengerSection() {
        // Update step indicators
        document.querySelector('.step[data-step="1"]').classList.remove('active');
        document.querySelector('.step[data-step="2"]').classList.add('active');
        
        // Hide journey details, show passenger details
        document.getElementById('journey-details').classList.remove('active');
        document.getElementById('passenger-details').classList.add('active');
        
        // Update booking summary
        this.updateBookingSummary();
    }

    showJourneySection() {
        // Update step indicators
        document.querySelector('.step[data-step="2"]').classList.remove('active');
        document.querySelector('.step[data-step="1"]').classList.add('active');
        
        // Show journey details, hide passenger details
        document.getElementById('passenger-details').classList.remove('active');
        document.getElementById('journey-details').classList.add('active');
    }

    updateBookingSummary() {
        const { journey, busDetails, passengers, pricing } = this.currentBooking;
        const summaryElement = document.getElementById('booking-summary');
        
        summaryElement.innerHTML = `
            <div class="summary-card">
                <div class="route-info">
                    <h5><i class="fas fa-route"></i> Journey Details</h5>
                    <p><strong>From:</strong> ${journey.from}</p>
                    <p><strong>To:</strong> ${journey.to}</p>
                    <p><strong>Date:</strong> ${new Date(journey.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${journey.time}</p>
                </div>
                
                <div class="bus-info">
                    <h5><i class="fas fa-bus"></i> Bus Details</h5>
                    <p><strong>Type:</strong> ${this.busTypes[busDetails.type].name}</p>
                    <p><strong>Passengers:</strong> ${passengers.adults} Adults, ${passengers.children} Children</p>
                    ${busDetails.amenities.length > 0 ? 
                        `<p><strong>Amenities:</strong> ${busDetails.amenities.join(', ')}</p>` : ''}
                </div>
                
                <div class="price-info">
                    <h5><i class="fas fa-money-bill-wave"></i> Fare Breakdown</h5>
                    <div class="fare-item">
                        <span>Base Fare</span>
                        <span>₹${pricing.fareAmount}</span>
                    </div>
                    <div class="fare-item">
                        <span>Amenities</span>
                        <span>₹${pricing.amenitiesCost}</span>
                    </div>
                    <div class="fare-item">
                        <span>GST (5%)</span>
                        <span>₹${pricing.gstAmount}</span>
                    </div>
                    <div class="fare-total">
                        <span><strong>Total Amount</strong></span>
                        <span><strong>₹${pricing.totalAmount}</strong></span>
                    </div>
                </div>
            </div>
        `;
    }

    async handlePayment() {
        try {
            // Collect passenger details
            const passengerName = document.getElementById('passenger-name')?.value;
            const passengerEmail = document.getElementById('passenger-email')?.value;
            const passengerPhone = document.getElementById('passenger-phone')?.value;

            if (!passengerName || !passengerEmail || !passengerPhone) {
                alert('Please fill in all passenger information fields.');
                return;
            }

            // Validate email
            if (!/\S+@\S+\.\S+/.test(passengerEmail)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Update booking with customer details
            this.currentBooking.customerDetails = {
                name: passengerName,
                email: passengerEmail,
                phone: passengerPhone
            };

            // Close modal
            document.querySelector('.bus-booking-modal')?.remove();

            // Process payment
            await this.paymentHandler.processBusPayment(this.currentBooking);

        } catch (error) {
            console.error('Bus booking error:', error);
            alert(`Booking failed: ${error.message}`);
        }
    }

    addBusModalStyles() {
        if (document.getElementById('bus-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'bus-modal-styles';
        style.textContent = `
            .bus-booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
            }

            .modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                overflow-y: auto;
            }

            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 700px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: modalSlideUp 0.4s ease-out;
            }

            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                z-index: 1;
            }

            .modal-header {
                padding: 2rem 2rem 1rem;
                background: linear-gradient(135deg, #2E7D32, #4CAF50);
                color: white;
                text-align: center;
                border-radius: 15px 15px 0 0;
            }

            .modal-header h2 {
                margin: 0 0 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .booking-steps {
                display: flex;
                justify-content: center;
                padding: 1.5rem;
                background: #f8f9fa;
                border-bottom: 1px solid #e0e0e0;
            }

            .step {
                display: flex;
                align-items: center;
                margin: 0 1rem;
                opacity: 0.5;
                transition: all 0.3s;
            }

            .step.active {
                opacity: 1;
                color: #2E7D32;
            }

            .step-number {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #e0e0e0;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                margin-right: 0.5rem;
                transition: all 0.3s;
            }

            .step.active .step-number {
                background: #2E7D32;
            }

            .form-section {
                display: none;
                padding: 2rem;
            }

            .form-section.active {
                display: block;
            }

            .form-section h3 {
                color: #2E7D32;
                margin-bottom: 1.5rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #2E7D32;
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .form-group {
                margin-bottom: 1rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #333;
            }

            .form-group input,
            .form-group select {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }

            .form-group input:focus,
            .form-group select:focus {
                outline: none;
                border-color: #2E7D32;
            }

            .amenities-section h4 {
                margin: 2rem 0 1rem;
                color: #2E7D32;
            }

            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }

            .amenity-option {
                display: flex;
                align-items: center;
                padding: 1rem;
                border: 2px solid #e0e0e0;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s;
            }

            .amenity-option:hover {
                border-color: #2E7D32;
                background: #f8f9fa;
            }

            .amenity-option input {
                margin-right: 0.75rem;
                width: auto;
            }

            .amenity-option input:checked + .amenity-info {
                color: #2E7D32;
            }

            .amenity-info {
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            .amenity-info i {
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }

            .amenity-name {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }

            .amenity-price {
                font-size: 0.9rem;
                color: #666;
            }

            .price-summary {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                margin: 2rem 0;
            }

            .summary-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.75rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid #e0e0e0;
            }

            .summary-total {
                display: flex;
                justify-content: space-between;
                font-size: 1.2rem;
                font-weight: 700;
                color: #2E7D32;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 2px solid #2E7D32;
            }

            .continue-btn,
            .payment-btn {
                width: 100%;
                padding: 1rem 2rem;
                background: linear-gradient(135deg, #2E7D32, #4CAF50);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }

            .continue-btn:hover,
            .payment-btn:hover {
                background: linear-gradient(135deg, #1B5E20, #2E7D32);
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
            }

            .back-btn {
                background: #6c757d;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .form-actions {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
            }

            .form-actions .back-btn {
                flex: 0 0 auto;
            }

            .form-actions .payment-btn {
                flex: 1;
            }

            .booking-review {
                margin: 2rem 0;
            }

            .booking-review h4 {
                color: #2E7D32;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid #e0e0e0;
            }

            .summary-card {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                border-left: 4px solid #2E7D32;
            }

            .route-info,
            .bus-info,
            .price-info {
                margin-bottom: 1.5rem;
            }

            .route-info h5,
            .bus-info h5,
            .price-info h5 {
                color: #2E7D32;
                margin-bottom: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .route-info p,
            .bus-info p {
                margin: 0.25rem 0;
                color: #555;
            }

            .fare-item,
            .fare-total {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }

            .fare-total {
                padding-top: 0.75rem;
                border-top: 2px solid #2E7D32;
                color: #2E7D32;
                font-size: 1.1rem;
            }

            @keyframes modalSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @media (max-width: 768px) {
                .form-row {
                    grid-template-columns: 1fr;
                }

                .amenities-grid {
                    grid-template-columns: 1fr;
                }

                .booking-steps {
                    flex-direction: column;
                    align-items: center;
                }

                .step {
                    margin: 0.25rem 0;
                }

                .form-section {
                    padding: 1rem;
                }

                .modal-header {
                    padding: 1.5rem 1rem 1rem;
                }

                .form-actions {
                    flex-direction: column;
                }

                .modal-content {
                    margin: 0.5rem;
                    max-height: 95vh;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize bus booking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BusBooking();
});