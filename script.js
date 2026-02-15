document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }));

    // Smooth Scroll for Anchor Links (Optional enhanced behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission Handler
    const bookingForm = document.getElementById('booking-form');
    const formMessage = document.getElementById('form-message');

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = bookingForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());

        // Placeholder for Google Apps Script Web App URL
        // User needs to update this const with their deployment URL
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOmd8QPOIzwHtnLqEjH7Xm90NljcfsWDnrrTR45mdHjUwkqlHxV81x28_-KYJLqZi43A/exec';

        try {
            if (GOOGLE_SCRIPT_URL === 'https://script.google.com/macros/s/AKfycbzOmd8QPOIzwHtnLqEjH7Xm90NljcfsWDnrrTR45mdHjUwkqlHxV81x28_-KYJLqZi43A/exec') {
                // Simulation mode if URL not set
                console.log('Form Data Collected:', data);
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

                formMessage.innerHTML = '<p style="color: green; text-align: center; margin-top: 1rem;">Booking simulation successful! (Connect Backend to Realize)</p>';
                bookingForm.reset();
            } else {
                // Actual submission
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    // mode: 'no-cors' // Often needed for Google Apps Script simple triggers, but 'cors' is better if script handles it
                });

                // Note: 'no-cors' mode returns opaque response, so we can't check .ok or .json() easily. 
                // We'll assume success if no network error, or use a workaround in the Apps Script.

                formMessage.innerHTML = '<p style="color: green; text-align: center; margin-top: 1rem;">Booking received! We will confirm shortly.</p>';
                bookingForm.reset();
            }
        } catch (error) {
            console.error('Error:', error);
            formMessage.innerHTML = '<p style="color: red; text-align: center; margin-top: 1rem;">Something went wrong. Please try again or call us.</p>';
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});

