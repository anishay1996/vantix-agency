$(document).ready(function() {
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
            
            // Close mobile menu if open
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Portfolio Filtering Logic
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        const filterValue = $(this).attr('data-filter');
        const items = $('.portfolio-item');

        if (filterValue === 'all') {
            items.fadeIn(400).addClass('active');
        } else {
            items.hide().removeClass('active');
            const filteredItems = items.filter('.' + filterValue);
            filteredItems.fadeIn(400).addClass('active');
        }
    });

    // Contact Form handling
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        const btn = $(this).find('button');
        const originalText = btn.text();
        
        btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...');
        btn.prop('disabled', true);
        
        setTimeout(() => {
            alert('Thank you! We have received your message. Our team will contact you shortly.');
            btn.text(originalText);
            btn.prop('disabled', false);
            $(this).trigger('reset');
        }, 2000);
    });
});
