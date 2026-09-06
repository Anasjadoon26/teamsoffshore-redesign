document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".mobile-menu");
    const desktopNav = document.querySelector(".desktop-nav");
    const header = document.querySelector(".site-header");

    const revealElements = document.querySelectorAll(".reveal");
    const serviceCards = document.querySelectorAll(".service-card");
    const regionCards = document.querySelectorAll(".region-card");


   

    const closeMobileMenu = () => {
        if (!menuButton || !desktopNav) return;

        desktopNav.classList.remove("mobile-open");
        menuButton.classList.remove("is-active");
        menuButton.setAttribute("aria-expanded", "false");
    };

    const openMobileMenu = () => {
        if (!menuButton || !desktopNav) return;

        desktopNav.classList.add("mobile-open");
        menuButton.classList.add("is-active");
        menuButton.setAttribute("aria-expanded", "true");
    };

    if (menuButton && desktopNav) {
        menuButton.addEventListener("click", () => {
            const isOpen = desktopNav.classList.contains("mobile-open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when a navigation link is clicked
        desktopNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
        });
    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });


    /* =========================================
       CLOSE MOBILE MENU ON DESKTOP
    ========================================= */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 720) {
            closeMobileMenu();
        }
    });


    /* =========================================
       HEADER SCROLL STATE
    ========================================= */

    if (header) {
        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 30);
        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    if (revealElements.length) {
        // Respect users who prefer reduced motion
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            revealElements.forEach((element) => {
                element.classList.add("is-visible");
            });
        } else {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

            revealElements.forEach((element) => {
                revealObserver.observe(element);
            });
        }
    }


    /* =========================================
       SERVICE CARD INTERACTION
    ========================================= */

    if (serviceCards.length) {
        serviceCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                serviceCards.forEach((otherCard) => {
                    if (otherCard !== card) {
                        otherCard.classList.add("is-dimmed");
                    }
                });
            });

            card.addEventListener("mouseleave", () => {
                serviceCards.forEach((otherCard) => {
                    otherCard.classList.remove("is-dimmed");
                });
            });
        });
    }


    /* =========================================
       GLOBAL REGION INTERACTION
    ========================================= */

    if (regionCards.length) {
        regionCards.forEach((card) => {
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");

            const activateRegion = () => {
                regionCards.forEach((otherCard) => {
                    otherCard.classList.remove("active");
                });

                card.classList.add("active");
            };

            card.addEventListener("click", activateRegion);

            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activateRegion();
                }
            });
        });
    }


    /* =========================================
       SMOOTH SCROLLING
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            // Ignore empty anchors
            if (!targetId || targetId === "#") {
                return;
            }

            let target;

            try {
                target = document.querySelector(targetId);
            } catch (error) {
                // Ignore malformed selectors
                return;
            }

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
});

