// JS/payment-handler.js
class PaymentHandler {
    constructor() {
        this.apiBaseUrl = 'http://localhost:3001/api';
        this.loadRazorpayScript();
    }

    // Load Razorpay checkout script dynamically
    async loadRazorpayScript() {
        return new Promise((resolve, reject) => {
            if (window.Razorpay) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Show loading spinner
    showLoader(show = true) {
        const loader = document.getElementById('payment-loader') || this.createLoader();
        loader.style.display = show ? 'flex' : 'none';
    }

    // Create loading spinner
    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'payment-loader';
        loader.innerHTML = `
            <div class="payment-loader-overlay">
                <div class="payment-loader-content">
                    <div class="spinner"></div>
                    <p>Processing your payment...</p>
                </div>
            </div>
        `;
        document.body.appendChild(loader);

        // Add CSS for loader
        if (!document.getElementById('payment-loader-styles')) {
            const style = document.createElement('style');
            style.id = 'payment-loader-styles';
            style.textContent = `
                .payment-loader-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                }
                .payment-loader-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        return loader;
    }

    // Show success/error messages
    showMessage(message, type = 'success') {
        const existingMessage = document.querySelector('.payment-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `payment-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${type === 'success' ? '✅' : '❌'}</span>
                <span class="message-text">${message}</span>
                <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add CSS for messages
        if (!document.getElementById('payment-message-styles')) {
            const style = document.createElement('style');
            style.id = 'payment-message-styles';
            style.textContent = `
                .payment-message {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10001;
                    max-width: 400px;
                    animation: slideIn 0.3s ease-out;
                }
                .payment-message.success {
                    background: #d4edda;
                    border: 1px solid #c3e6cb;
                    color: #155724;
                }
                .payment-message.error {
                    background: #f8d7da;
                    border: 1px solid #f5c6cb;
                    color: #721c24;
                }
                .message-content {
                    padding: 1rem;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .message-close {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-left: auto;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Homestay booking payment
    async processHomestayPayment(bookingData) {
        try {
            this.showLoader(true);

            const orderData = {
                amount: bookingData.pricing.totalAmount,
                bookingType: 'homestay',
                customerDetails: {
                    name: bookingData.guestName,
                    email: bookingData.email,
                    phone: bookingData.phone
                },
                bookingDetails: bookingData
            };

            const response = await fetch(`${this.apiBaseUrl}/payments/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const orderResult = await response.json();

            if (!orderResult.success) {
                throw new Error(orderResult.message || 'Failed to create order');
            }

            await this.openRazorpayCheckout(orderResult.order, orderResult.customerDetails, bookingData);

        } catch (error) {
            console.error('Payment error:', error);
            this.showLoader(false);
            this.showMessage(`Payment failed: ${error.message}`, 'error');
        }
    }

    // Bus booking payment
    async processBusPayment(busBookingData) {
        try {
            this.showLoader(true);

            const orderData = {
                amount: busBookingData.pricing.totalAmount,
                bookingType: 'bus',
                customerDetails: {
                    name: busBookingData.passengerName,
                    email: busBookingData.email,
                    phone: busBookingData.phone
                },
                bookingDetails: busBookingData
            };

            const response = await fetch(`${this.apiBaseUrl}/payments/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const orderResult = await response.json();

            if (!orderResult.success) {
                throw new Error(orderResult.message || 'Failed to create order');
            }

            await this.openRazorpayCheckout(orderResult.order, orderResult.customerDetails, busBookingData);

        } catch (error) {
            console.error('Payment error:', error);
            this.showLoader(false);
            this.showMessage(`Payment failed: ${error.message}`, 'error');
        }
    }

    // Holiday package payment
    async processPackagePayment(packageData) {
        try {
            this.showLoader(true);

            const orderData = {
                amount: packageData.pricing.totalAmount,
                bookingType: 'package',
                customerDetails: {
                    name: packageData.customerName,
                    email: packageData.email,
                    phone: packageData.phone
                },
                bookingDetails: packageData
            };

            const response = await fetch(`${this.apiBaseUrl}/payments/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const orderResult = await response.json();

            if (!orderResult.success) {
                throw new Error(orderResult.message || 'Failed to create order');
            }

            await this.openRazorpayCheckout(orderResult.order, orderResult.customerDetails, packageData);

        } catch (error) {
            console.error('Payment error:', error);
            this.showLoader(false);
            this.showMessage(`Payment failed: ${error.message}`, 'error');
        }
    }

    // Open Razorpay checkout
    async openRazorpayCheckout(order, customerDetails, bookingData) {
        await this.loadRazorpayScript();

        const options = {
            key: order.key_id,
            amount: order.amount,
            currency: order.currency,
            name: 'Rural Retreats',
            description: this.getBookingDescription(bookingData),
            image: './favicon/favicon-192x192.png',
            order_id: order.id,
            prefill: {
                name: customerDetails.name,
                email: customerDetails.email,
                contact: customerDetails.phone
            },
            notes: {
                booking_type: bookingData.bookingType || 'general',
                customer_id: bookingData.customerId || 'guest'
            },
            theme: {
                color: '#2E7D32'
            },
            modal: {
                ondismiss: () => {
                    this.showLoader(false);
                    this.showMessage('Payment cancelled by user', 'error');
                }
            },
            handler: (response) => {
                this.handlePaymentSuccess(response, bookingData);
            },
            method: {
                upi: true,
                card: true,
                netbanking: true,
                wallet: true
            }
        };

        const rzp = new Razorpay(options);

        rzp.on('payment.failed', (response) => {
            this.handlePaymentFailure(response, order.id);
        });

        this.showLoader(false);
        rzp.open();
    }

    // Get booking description for payment
    getBookingDescription(bookingData) {
        if (bookingData.bookingType === 'homestay') {
            return `Homestay booking at ${bookingData.homestayName || 'Rural Retreat'}`;
        } else if (bookingData.bookingType === 'bus') {
            return `Bus ticket from ${bookingData.journey?.from} to ${bookingData.journey?.to}`;
        } else if (bookingData.bookingType === 'package') {
            return `Holiday package: ${bookingData.packageName || 'Rural Experience'}`;
        }
        return 'Rural Retreats Booking';
    }

    // Handle successful payment
    async handlePaymentSuccess(response, bookingData) {
        try {
            this.showLoader(true);

            const verifyData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails: bookingData
            };

            const verifyResponse = await fetch(`${this.apiBaseUrl}/payments/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(verifyData)
            });

            const verifyResult = await verifyResponse.json();

            if (verifyResult.success) {
                this.showLoader(false);
                this.showPaymentSuccess(verifyResult);
            } else {
                throw new Error(verifyResult.message || 'Payment verification failed');
            }

        } catch (error) {
            console.error('Payment verification error:', error);
            this.showLoader(false);
            this.showMessage(`Payment verification failed: ${error.message}`, 'error');
        }
    }

    // Handle payment failure
    async handlePaymentFailure(response, orderId) {
        try {
            await fetch(`${this.apiBaseUrl}/payments/payment-failed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    razorpay_order_id: orderId,
                    error: response.error
                })
            });

            this.showLoader(false);
            this.showMessage(
                `Payment failed: ${response.error.description || 'Unknown error'}`,
                'error'
            );

        } catch (error) {
            console.error('Error handling payment failure:', error);
            this.showLoader(false);
            this.showMessage('Payment failed due to technical error', 'error');
        }
    }

    // Show payment success modal
    showPaymentSuccess(result) {
        const successModal = document.createElement('div');
        successModal.className = 'payment-success-modal';
        successModal.innerHTML = `
            <div class="success-modal-overlay">
                <div class="success-modal-content">
                    <div class="success-icon">✅</div>
                    <h2>Payment Successful!</h2>
                    <p>Your booking has been confirmed.</p>
                    <div class="booking-details">
                        <p><strong>Booking Reference:</strong> ${result.bookingReference}</p>
                        <p><strong>Booking ID:</strong> ${result.bookingId}</p>
                    </div>
                    <div class="success-actions">
                        <button onclick="window.print()" class="btn-print">Print Receipt</button>
                        <button onclick="this.closest('.payment-success-modal').remove()" class="btn-close">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Add CSS for success modal
        if (!document.getElementById('success-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'success-modal-styles';
            style.textContent = `
                .payment-success-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10002;
                }
                .success-modal-overlay {
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .success-modal-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 15px;
                    text-align: center;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    animation: bounceIn 0.5s ease-out;
                }
                .success-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                .success-modal-content h2 {
                    color: #28a745;
                    margin-bottom: 1rem;
                }
                .booking-details {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 8px;
                    margin: 1rem 0;
                }
                .booking-details p {
                    margin: 0.5rem 0;
                }
                .success-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    margin-top: 1.5rem;
                }
                .btn-print, .btn-close {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 600;
                }
                .btn-print {
                    background: #007bff;
                    color: white;
                }
                .btn-close {
                    background: #28a745;
                    color: white;
                }
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3) translate(-50%, -50%);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05) translate(-50%, -50%);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translate(-50%, -50%);
                    }
                }
                @media (max-width: 768px) {
                    .success-actions {
                        flex-direction: column;
                    }
                    .success-modal-content {
                        margin: 1rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(successModal);
    }
}

// Initialize global PaymentHandler instance when script loads
window.PaymentHandler = PaymentHandler;