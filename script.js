// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default link behavior for demo purposes
            e.preventDefault();
        });
    });
    

    
    // Initialize EmailJS
    emailjs.init("JQUhHZUUuIdFm32sz");
    
    // Email form functionality
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const emailInput = document.querySelector('.email-input');
    const messageInput = document.querySelector('.message-input');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let allValid = true;
        
        if (!emailInput.value || !emailInput.value.includes('@')) {
            allValid = false;
            emailInput.style.borderColor = '#FF6666';
        } else {
            emailInput.style.borderColor = 'transparent';
        }
        
        if (!messageInput.value.trim()) {
            allValid = false;
            messageInput.style.borderColor = '#FF6666';
        } else {
            messageInput.style.borderColor = 'transparent';
        }
        
        if (allValid) {
            // Show loading state
            submitBtn.textContent = 'sending...';
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#616161';
            
            // Send email using EmailJS
            emailjs.send("service_mjzame9", "template_e4x0fqo", {
                name: emailInput.value,
                email: emailInput.value,
                message: messageInput.value,
                title: "New Website Contact"
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Success feedback
                submitBtn.textContent = 'sent!';
                submitBtn.style.backgroundColor = '#0099FF';
                
                // Reset form
                emailInput.value = '';
                messageInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = 'leggo';
                    submitBtn.style.backgroundColor = '#111111';
                    submitBtn.disabled = false;
                }, 3000);
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Error feedback
                submitBtn.textContent = 'error - try again';
                submitBtn.style.backgroundColor = '#FF6666';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = 'leggo';
                    submitBtn.style.backgroundColor = '#111111';
                    submitBtn.disabled = false;
                }, 3000);
            });
        }
    });
    
    // Console message for developers
    console.log('👋 Hey there! Nice to see you checking out the console. This site was built with love using HTML, CSS, and vanilla JavaScript.');
    
}); 