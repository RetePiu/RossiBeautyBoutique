/* ═══════════════════════════════════════════════════════════════
   ROSSI BEAUTY BOUTIQUE — Script
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── Navbar scroll effect ─────────────────────────────── */
    const navbar = document.getElementById('navbar');
    const topBar = document.getElementById('top-bar');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Add scrolled class for shadow
        if (scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    /* ─── Active menu tracking ─────────────────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link[data-section]');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link[data-section]');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                // Desktop links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
                // Mobile links
                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();


    /* ─── Hamburger / Mobile menu ──────────────────────────── */
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    /* ─── Smooth scroll for anchor links ───────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });

                // Close mobile menu if open
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });


    /* ─── Scroll reveal animations ─────────────────────────── */
    function applyScrollAnimations() {
        // Add animation classes to elements
        const animationMap = [
            { selector: '.chi-siamo__image-col', cls: 'fade-in-left' },
            { selector: '.chi-siamo__text-col', cls: 'fade-in-right' },
            { selector: '.trattamento-card', cls: 'fade-in' },
            { selector: '.promo-card', cls: 'fade-in' },
            { selector: '.gallery-card', cls: 'fade-in' },
            { selector: '.pillola', cls: 'fade-in' },
            { selector: '.come-lavoriamo__content', cls: 'fade-in-left' },
            { selector: '.come-lavoriamo__image', cls: 'fade-in-right' },
            { selector: '.contatti__info', cls: 'fade-in' },
            { selector: '.section-header', cls: 'fade-in' },
        ];

        animationMap.forEach(({ selector, cls }) => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add(cls);
                el.style.transitionDelay = `${i * 0.08}s`;
            });
        });

        // Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    applyScrollAnimations();


    /* ─── Gallery horizontal scroll ────────────────────────── */
    const galleryScroll = document.getElementById('gallery-scroll');
    const galleryLeft = document.getElementById('gallery-left');
    const galleryRight = document.getElementById('gallery-right');

    if (galleryScroll && galleryLeft && galleryRight) {
        const scrollAmount = 340;

        galleryLeft.addEventListener('click', () => {
            galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        galleryRight.addEventListener('click', () => {
            galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        // Drag to scroll support
        let isDown = false;
        let startX;
        let scrollLeftPos;

        galleryScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            galleryScroll.style.cursor = 'grabbing';
            startX = e.pageX - galleryScroll.offsetLeft;
            scrollLeftPos = galleryScroll.scrollLeft;
        });

        galleryScroll.addEventListener('mouseleave', () => {
            isDown = false;
            galleryScroll.style.cursor = 'grab';
        });

        galleryScroll.addEventListener('mouseup', () => {
            isDown = false;
            galleryScroll.style.cursor = 'grab';
        });

        galleryScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - galleryScroll.offsetLeft;
            const walk = (x - startX) * 1.5;
            galleryScroll.scrollLeft = scrollLeftPos - walk;
        });

        // Set initial cursor
        galleryScroll.style.cursor = 'grab';
    }

});


/* ─── Copy address ─────────────────────────────────────────── */
function copyAddress() {
    const address = 'Via Roma 42, 48121 Ravenna (RA)';
    navigator.clipboard.writeText(address).then(() => {
        showToast('Indirizzo copiato!');
    }).catch(() => {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = address;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('Indirizzo copiato!');
    });
}


/* ─── Toast notification ───────────────────────────────────── */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}


/* ─── Modal management ─────────────────────────────────────── */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(modal => {
            modal.classList.remove('open');
        });
        document.body.style.overflow = '';
    }
});
