// JS/homestays-payment.js
// Enhanced homestay booking with Razorpay integration

class HomestayBooking {
    constructor() {
        this.paymentHandler = new PaymentHandler();
        this.currentBooking = {
            homestayId: null,
            homestayName: '',
            location: '',
            pricing: {
                basePrice: 0,
                amenitiesAmount: 0,
                gstAmount: 0,
                totalAmount: 0
            },
            bookingDetails: {
                checkIn: '',
                checkOut: '',
                guests: {
                    adults: 1,
                    children: 0
                },
                roomType: 'deluxe'
            },
            customerDetails: {
                name: '',
                email: '',
                phone: ''
            },
            specialRequests: ''
        };
        
        this.selectedAmenities = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeDatePickers();
        this.loadHomestayData();
    }

    bindEvents() {
        // Booking form events
        document.addEventListener('change', (e) => {
            if (e.target.matches('#check-in, #check-out')) {
                this.updateStayDuration();
                this.calculateTotal();
            }
            
            if (e.target.matches('#adults, #children, #room-type')) {
                this.calculateTotal();
            }
        });

        // Amenities selection
        document.addEventListener('change', (e) => {
            if (e.target.matches('.amenity-checkbox')) {
                this.updateAmenities();
                this.calculateTotal();
            }
        });

        // Payment button
        document.addEventListener('click', (e) => {
            if (e.target.matches('#proceed-to-payment') || e.target.closest('#proceed-to-payment')) {
                e.preventDefault();
                this.handlePaymentProcess();
            }
        });

        // Quick booking buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.book-now-btn') || e.target.closest('.book-now-btn')) {
                e.preventDefault();
                const homestayCard = e.target.closest('.homestay-card');
                this.selectHomestay(homestayCard);
            }
        });
    }

    initializeDatePickers() {
        const today = new Date().toISOString().split('T')[0];
        const checkInInput = document.getElementById('check-in');
        const checkOutInput = document.getElementById('check-out');

        if (checkInInput) {
            checkInInput.min = today;
            checkInInput.addEventListener('change', () => {
                if (checkOutInput) {
                    const checkIn = new Date(checkInInput.value);
                    const nextDay = new Date(checkIn);
                    nextDay.setDate(checkIn.getDate() + 1);
                    checkOutInput.min = nextDay.toISOString().split('T')[0];
                }
            });
        }
    }

    loadHomestayData() {
        // Sample homestay data - in real app, this would come from API
        this.homestays = {
            'coorg-cottage': {
                id: 'coorg-cottage',
                name: 'Coorg Coffee Estate Cottage',
                location: 'Coorg, Karnataka',
                basePrice: 3500,
                images: ['./img/15.jpg'],
                amenities: ['WiFi', 'Food', 'Entertainment'],
                description: 'Experience warm hospitality in traditional Coorg homestays with lush greenery.',
                rating: 4.8
            },
            'kerala-backwaters': {
                id: 'kerala-backwaters',
                name: 'Kerala Backwater Homestay',
                location: 'Alleppey, Kerala',
                basePrice: 4200,
                images: ['./img/2.jpg'],
                amenities: ['WiFi', 'Food', 'Charging'],
                description: 'Serene backwater experience with traditional Kerala hospitality.',
                rating: 4.7
            },
            'himalayan-retreat': {
                id: 'himalayan-retreat',
                name: 'Himalayan Mountain Retreat',
                location: 'Manali, Himachal Pradesh',
                basePrice: 5500,
                images: ['./img/13.jpg'],
                amenities: ['WiFi', 'Food', 'Entertainment', 'Charging'],
                description: 'Mountain escape surrounded by majestic Himalayas.',
                rating: 4.9
            }
        };
    }

    selectHomestay(homestayCard) {
        const homestayId = homestayCard.dataset.homestayId || 'coorg-cottage';
        const homestay = this.homestays[homestayId];
        
        if (homestay) {
            this.currentBooking.homestayId = homestay.id;
            this.currentBooking.homestayName = homestay.name;
            this.currentBooking.location = homestay.location;
            this.currentBooking.pricing.basePrice = homestay.basePrice;
            
            this.showBookingModal(homestay);
        }
    }

    showBookingModal(homestay) {
        // Create booking modal
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="booking-modal-overlay">
                <div class="booking-modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h2>Book ${homestay.name}</h2>
                        <p class="location">${homestay.location}</p>
                        <div class="rating">
                            ${'★'.repeat(Math.floor(homestay.rating))} ${homestay.rating}
                        </div>
                    </div>
                    
                    <form class="booking-form" id="homestay-booking-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="check-in">Check-in Date</label>
                                <input type="date" id="check-in" required>
                            </div>
                            <div class="form-group">
                                <label for="check-out">Check-out Date</label>
                                <input type="date" id="check-out" required>
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
                        
                        <div class="form-group">
                            <label for="room-type">Room Type</label>
                            <select id="room-type" required>
                                <option value="deluxe">Deluxe Room</option>
                                <option value="suite">Suite</option>
                                <option value="cottage">Cottage</option>
                                <option value="villa">Villa</option>
                            </select>
                        </div>
                        
                        <div class="amenities-section">
                            <h4>Select Additional Amenities</h4>
                            <div class="amenities-grid">
                                ${this.renderAmenitiesOptions()}
                            </div>
                        </div>
                        
                        <div class="customer-details">
                            <h4>Guest Information</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="guest-name">Full Name</label>
                                    <input type="text" id="guest-name" required>
                                </div>
                                <div class="form-group">
                                    <label for="guest-email">Email</label>
                                    <input type="email" id="guest-email" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="guest-phone">Phone Number</label>
                                <input type="tel" id="guest-phone" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="special-requests">Special Requests (Optional)</label>
                            <textarea id="special-requests" rows="3" 
                                placeholder="Any special requirements or preferences..."></textarea>
                        </div>
                        
                        <div class="booking-summary">
                            <h4>Booking Summary</h4>
                            <div class="summary-item">
                                <span>Base Price (per night)</span>
                                <span id="base-price">₹${homestay.basePrice}</span>
                            </div>
                            <div class="summary-item">
                                <span>Duration</span>
                                <span id="stay-duration">Select dates</span>
                            </div>
                            <div class="summary-item">
                                <span>Amenities</span>
                                <span id="amenities-cost">₹0</span>
                            </div>
                            <div class="summary-item">
                                <span>GST (18%)</span>
                                <span id="gst-amount">₹0</span>
                            </div>
                            <div class="summary-total">
                                <span>Total Amount</span>
                                <span id="total-amount">₹0</span>
                            </div>
                        </div>
                        
                        <button type="submit" id="proceed-to-payment" class="payment-btn" disabled>
                            <i class="fas fa-credit-card"></i>
                            Proceed to Payment
                        </button>
                    </form>
                </div>
            </div>
        `;

        // Add modal styles if not exists
        this.addModalStyles();
        
        document.body.appendChild(modal);
        this.initializeDatePickers();
        
        // Close modal events
        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.querySelector('.booking-modal-overlay').onclick = (e) => {
            if (e.target.classList.contains('booking-modal-overlay')) {
                modal.remove();
            }
        };
    }

    renderAmenitiesOptions() {
        const amenities = [
            { id: 'WiFi', name: 'WiFi', price: 100 },
            { id: 'Food', name: 'Meal Package', price: 800 },
            { id: 'Entertainment', name: 'Entertainment System', price: 200 },
            { id: 'Charging', name: 'Device Charging', price: 50 },
            { id: 'Restrooms', name: 'Private Bathroom', price: 300 }
        ];

        return amenities.map(amenity => `
            <label class="amenity-option">
                <input type="checkbox" class="amenity-checkbox" 
                       value="${amenity.id}" data-price="${amenity.price}">
                <span class="amenity-info">
                    <strong>${amenity.name}</strong>
                    <span class="amenity-price">+₹${amenity.price}</span>
                </span>
            </label>
        `).join('');
    }

    updateStayDuration() {
        const checkIn = document.getElementById('check-in')?.value;
        const checkOut = document.getElementById('check-out')?.value;
        const durationElement = document.getElementById('stay-duration');
        
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            
            if (nights > 0) {
                durationElement.textContent = `${nights} night${nights > 1 ? 's' : ''}`;
                this.currentBooking.bookingDetails.checkIn = checkIn;
                this.currentBooking.bookingDetails.checkOut = checkOut;
                return nights;
            }
        }
        
        durationElement.textContent = 'Select dates';
        return 0;
    }

    updateAmenities() {
        const checkboxes = document.querySelectorAll('.amenity-checkbox:checked');
        this.selectedAmenities = Array.from(checkboxes).map(cb => ({
            id: cb.value,
            price: parseInt(cb.dataset.price)
        }));
    }

    calculateTotal() {
        const nights = this.updateStayDuration();
        const adults = parseInt(document.getElementById('adults')?.value || 1);
        const children = parseInt(document.getElementById('children')?.value || 0);
        
        if (nights <= 0) {
            this.updatePaymentButton(false);
            return;
        }
        
        // Base calculation
        let baseAmount = this.currentBooking.pricing.basePrice * nights;
        
        // Guest surcharge (additional guests beyond 2)
        const totalGuests = adults + children;
        if (totalGuests > 2) {
            baseAmount += (totalGuests - 2) * 500 * nights; // ₹500 per extra guest per night
        }
        
        // Amenities cost
        const amenitiesAmount = this.selectedAmenities.reduce((sum, amenity) => 
            sum + (amenity.price * nights), 0);
        
        // GST calculation (18%)
        const subtotal = baseAmount + amenitiesAmount;
        const gstAmount = Math.round(subtotal * 0.18);
        const totalAmount = subtotal + gstAmount;
        
        // Update booking object
        this.currentBooking.pricing = {
            basePrice: this.currentBooking.pricing.basePrice,
            baseAmount,
            amenitiesAmount,
            gstAmount,
            totalAmount
        };
        
        this.currentBooking.bookingDetails.guests = { adults, children };
        this.currentBooking.bookingDetails.roomType = document.getElementById('room-type')?.value || 'deluxe';
        
        // Update UI
        document.getElementById('amenities-cost').textContent = `₹${amenitiesAmount}`;
        document.getElementById('gst-amount').textContent = `₹${gstAmount}`;
        document.getElementById('total-amount').textContent = `₹${totalAmount}`;
        
        this.updatePaymentButton(true);
    }

    updatePaymentButton(enabled) {
        const button = document.getElementById('proceed-to-payment');
        if (button) {
            button.disabled = !enabled;
            button.textContent = enabled ? 
                `Pay ₹${this.currentBooking.pricing.totalAmount || 0}` : 
                'Select dates to continue';
        }
    }

    async handlePaymentProcess() {
        try {
            // Collect customer details
            const guestName = document.getElementById('guest-name')?.value;
            const guestEmail = document.getElementById('guest-email')?.value;
            const guestPhone = document.getElementById('guest-phone')?.value;
            const specialRequests = document.getElementById('special-requests')?.value;

            if (!guestName || !guestEmail || !guestPhone) {
                alert('Please fill in all guest information fields.');
                return;
            }

            // Update booking with customer details
            this.currentBooking.customerDetails = {
                name: guestName,
                email: guestEmail,
                phone: guestPhone
            };
            this.currentBooking.specialRequests = specialRequests;

            // Validate booking data
            const errors = this.paymentHandler.validateBookingData(this.currentBooking, 'homestay');
            if (errors.length > 0) {
                alert('Please fix the following errors:\n' + errors.join('\n'));
                return;
            }

            // Close modal
            document.querySelector('.booking-modal')?.remove();

            // Process payment
            await this.paymentHandler.processHomestayPayment(this.currentBooking);

        } catch (error) {
            console.error('Booking error:', error);
            alert(`Booking failed: ${error.message}`);
        }
    }

    addModalStyles() {
        if (document.getElementById('homestay-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'homestay-modal-styles';
        style.textContent = `
            .booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
            }
            
            .booking-modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
                overflow-y: auto;
            }
            
            .booking-modal-content {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: modalSlideIn 0.3s ease-out;
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
                border-bottom: 1px solid #eee;
                text-align: center;
            }
            
            .modal-header h2 {
                margin: 0 0 0.5rem;
                color: #2E7D32;
            }
            
            .location {
                color: #666;
                margin: 0;
            }
            
            .rating {
                color: #ffd700;
                margin-top: 0.5rem;
            }
            
            .booking-form {
                padding: 2rem;
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
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #2E7D32;
            }
            
            .amenities-section h4,
            .customer-details h4 {
                margin: 2rem 0 1rem;
                color: #2E7D32;
                border-bottom: 2px solid #2E7D32;
                padding-bottom: 0.5rem;
            }
            
            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .amenity-option {
                display: flex;
                align-items: center;
                padding: 1rem;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .amenity-option:hover {
                border-color: #2E7D32;
            }
            
            .amenity-option input:checked + .amenity-info {
                color: #2E7D32;
                font-weight: 600;
            }
            
            .amenity-option input {
                margin-right: 0.75rem;
                width: auto;
            }
            
            .amenity-info {
                display: flex;
                flex-direction: column;
                flex: 1;
            }
            
            .amenity-price {
                font-size: 0.9rem;
                color: #666;
                margin-top: 0.25rem;
            }
            
            .booking-summary {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                margin: 2rem 0;
            }
            
            .booking-summary h4 {
                margin: 0 0 1rem;
                color: #2E7D32;
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
            
            .payment-btn:hover:not(:disabled) {
                background: linear-gradient(135deg, #1B5E20, #2E7D32);
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
            }
            
            .payment-btn:disabled {
                background: #ccc;
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
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
                
                .booking-modal-content {
                    margin: 0.5rem;
                    max-height: 95vh;
                }
                
                .booking-form {
                    padding: 1rem;
                }
                
                .modal-header {
                    padding: 1.5rem 1rem 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize homestay booking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomestayBooking();
});