/* ===========================================================
   RSCollectiblesDE
   Premium Script
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const content = window.siteContent || {};
    const legalTexts = {
        ...(window.legalContent || {}),
        ...(content.legalTexts || {})
    };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const progress = document.getElementById("progressBar");
    const scrollBtn = document.getElementById("scrollTop");
    const glow = document.querySelector(".cursorGlow");
    const header = document.querySelector("header");
    const hitsGrid = document.getElementById("hitsGrid");
    const forceUnlockPageScroll = () => {
        document.documentElement.classList.remove("scrollLocked");
        document.body.classList.remove("scrollLocked");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
    };

    const applyMeta = () => {
        if (content.meta && typeof content.meta.title === "string") {
            document.title = content.meta.title;
        }

        if (content.meta && typeof content.meta.description === "string") {
            const descriptionMeta = document.querySelector('meta[name="description"]');
            if (descriptionMeta) {
                descriptionMeta.setAttribute("content", content.meta.description);
            }
        }

        if (content.meta && typeof content.meta.themeColor === "string") {
            const themeMeta = document.querySelector('meta[name="theme-color"]');
            if (themeMeta) {
                themeMeta.setAttribute("content", content.meta.themeColor);
            }
        }
    };

    const applyNavigation = () => {
        const nav = document.getElementById("mainNav");
        if (!nav || !Array.isArray(content.navigation)) {
            return;
        }

        nav.innerHTML = content.navigation
            .map(item => `<a href="${item.href}">${item.label}</a>`)
            .join("");
    };

    const applyHeaderAndHero = () => {
        const headerWhatnotButton = document.getElementById("headerWhatnotButton");
        const heroLiveBadge = document.getElementById("heroLiveBadge");
        const heroTitle = document.getElementById("heroTitle");
        const heroDescription = document.getElementById("heroDescription");
        const heroPrimaryButton = document.getElementById("heroPrimaryButton");
        const liveSectionButton = document.getElementById("liveSectionButton");

        if (typeof content.whatnotUrl === "string") {
            [headerWhatnotButton, heroPrimaryButton, liveSectionButton].forEach(link => {
                if (link) {
                    link.setAttribute("href", content.whatnotUrl);
                }
            });
        }

        if (headerWhatnotButton && typeof content.headerButtonLabel === "string") {
            headerWhatnotButton.textContent = content.headerButtonLabel;
        }

        if (heroLiveBadge && content.hero && typeof content.hero.liveBadge === "string") {
            heroLiveBadge.textContent = content.hero.liveBadge;
        }

        if (heroTitle && content.hero) {
            const top = content.hero.titleTop || "";
            const accent = content.hero.titleAccent || "";
            const bottom = content.hero.titleBottom || "";
            heroTitle.innerHTML = `${top} <span>${accent}</span> ${bottom}`.trim();
        }

        if (heroDescription && content.hero && typeof content.hero.description === "string") {
            heroDescription.textContent = content.hero.description;
        }

        if (heroPrimaryButton && content.hero && typeof content.hero.buttonLabel === "string") {
            heroPrimaryButton.textContent = content.hero.buttonLabel;
        }
    };

    const applyStats = () => {
        const statsSection = document.getElementById("statsSection");
        if (!statsSection || !Array.isArray(content.stats)) {
            return;
        }

        statsSection.innerHTML = content.stats.map(item => `
            <div class="card">
                <h2
                    class="counter"
                    data-target="${Number(item.target) || 0}"
                    data-suffix="${typeof item.suffix === "string" ? item.suffix : ""}"
                    ${typeof item.label === "string" && /(follower|bewertung|rating)/i.test(item.label) ? 'data-skip-intro-animation="true"' : ""}
                >0</h2>
                <p>${item.label || ""}</p>
            </div>
        `).join("");
    };

    const applyAbout = () => {
        const aboutTitle = document.getElementById("aboutTitle");
        const aboutDescription = document.getElementById("aboutDescription");

        if (aboutTitle && content.about) {
            const prefix = content.about.titlePrefix || "";
            const accent = content.about.titleAccent || "";
            aboutTitle.innerHTML = `${prefix} <span>${accent}</span>`.trim();
        }

        if (aboutDescription && content.about && typeof content.about.description === "string") {
            aboutDescription.textContent = content.about.description;
        }
    };

    const applySimpleText = (id, value) => {
        const element = document.getElementById(id);
        if (element && typeof value === "string") {
            element.textContent = value;
        }
    };

    const renderHits = hits => {
        if (!Array.isArray(hits) || !hits.length || !hitsGrid) {
            return;
        }

        hitsGrid.innerHTML = hits.map(hit => `
            <div class="hitCardWrap">
                <article class="hitCard" data-rarity="${hit.rarity}">
                    <div class="shine"></div>
                    <div class="hitImage"
                        data-lightbox-src="${hit.image}"
                        data-lightbox-caption="${hit.title}"
                        role="button"
                        tabindex="0"
                        aria-label="Karte vergrößern: ${hit.title}">
                        <img src="${hit.image}" alt="${hit.title}" loading="lazy" decoding="async">
                    </div>
                    <div class="rarity ${hit.rarity}">${hit.label}</div>
                    <h3>${hit.title}</h3>
                    <div class="hitDescription">${hit.description || hit.text || ""}</div>
                </article>
            </div>
        `).join("");
    };

    const applyFeatures = () => {
        const featureGrid = document.getElementById("featureGrid");
        if (!featureGrid || !Array.isArray(content.features)) {
            return;
        }

        featureGrid.innerHTML = content.features.map(feature => `
            <div class="feature">
                <div class="icon">${feature.icon || ""}</div>
                <h3>${feature.title || ""}</h3>
                <p>${feature.description || ""}</p>
            </div>
        `).join("");
    };

    const applyLiveSection = () => {
        if (!content.liveSection) {
            return;
        }

        applySimpleText("liveSectionBadge", content.liveSection.badge);
        applySimpleText("liveSectionTitle", content.liveSection.title);
        applySimpleText("liveSectionDescription", content.liveSection.description);
        applySimpleText("liveSectionButton", content.liveSection.buttonLabel);
    };

    const applyFaq = () => {
        const faqContainer = document.getElementById("faqContainer");
        if (!faqContainer || !Array.isArray(content.faq)) {
            return;
        }

        faqContainer.innerHTML = content.faq.map(item => `
            <div class="faqItem">
                <button type="button">${item.question || ""}</button>
                <div class="answer">${item.answer || ""}</div>
            </div>
        `).join("");
    };

    const applyFooter = () => {
        applySimpleText("footerBrandTitle", content.footer && content.footer.brandTitle);
        applySimpleText("footerCopyright", content.footer && content.footer.copyright);

        const footerLinks = document.getElementById("footerLinks");
        if (!footerLinks || !content.footer || !Array.isArray(content.footer.legalLinks)) {
            return;
        }

        footerLinks.innerHTML = content.footer.legalLinks.map(link => `
            <button type="button" class="footerLinkButton" data-modal="${link.key}">${link.label}</button>
        `).join("");
    };

    const applyContent = () => {
        applyMeta();
        applyNavigation();
        applyHeaderAndHero();
        applyStats();
        applyAbout();

        applySimpleText("hitsSectionEyebrow", content.hitsSection && content.hitsSection.eyebrow);
        applySimpleText("hitsSectionTitle", content.hitsSection && content.hitsSection.title);
        renderHits(content.hits);

        applySimpleText("featuresSectionEyebrow", content.featuresSection && content.featuresSection.eyebrow);
        applySimpleText("featuresSectionTitle", content.featuresSection && content.featuresSection.title);
        applyFeatures();

        applyLiveSection();

        applySimpleText("faqSectionEyebrow", content.faqSection && content.faqSection.eyebrow);
        applySimpleText("faqSectionTitle", content.faqSection && content.faqSection.title);
        applyFaq();

        applyFooter();
    };

    const liveFollowersConfig = content.liveFollowers || {};
    const liveRatingsConfig = content.liveRatings || {};
    const followerNumberLocale = typeof liveFollowersConfig.locale === "string"
        ? liveFollowersConfig.locale
        : "de-DE";

    const resolveWhatnotUsername = () => {
        if (typeof liveFollowersConfig.username === "string" && liveFollowersConfig.username.trim()) {
            return liveFollowersConfig.username.trim();
        }

        if (typeof content.whatnotUrl !== "string") {
            console.error("Whatnot URL missing: cannot resolve username for follower sync.");
            return null;
        }

        const match = content.whatnotUrl.match(/\/user\/([^/?#]+)/i);
        if (!match || !match[1]) {
            console.error("Could not extract Whatnot username from URL:", content.whatnotUrl);
            return null;
        }

        return decodeURIComponent(match[1]);
    };

    const parseFollowerValue = value => {
        const digitsOnly = String(value).replace(/[^\d]/g, "");
        if (!digitsOnly) {
            return null;
        }

        const parsed = Number.parseInt(digitsOnly, 10);
        return Number.isNaN(parsed) ? null : parsed;
    };

    const extractFollowerCountFromHtml = html => {
        const htmlMatches = Array.from(
            html.matchAll(/<strong[^>]*>\s*([\d.,\s]+)\s*<\/strong>\s*Follower(?:n|s)?/gi)
        );
        const values = htmlMatches
            .map(match => parseFollowerValue(match[1]))
            .filter(value => Number.isInteger(value));

        if (values.length > 0) {
            return Math.max(...values);
        }

        const fallbackMatch = html.match(/\*\*([\d.,\s]+)\*\*\s*Follower(?:n|s)?/i);
        if (!fallbackMatch) {
            return null;
        }

        return parseFollowerValue(fallbackMatch[1]);
    };

    const extractSellerRatingFromHtml = html => {
        const ratingMatch = html.match(/"sellerRating":\s*(null|[0-9]+(?:\.[0-9]+)?)/i);
        if (!ratingMatch) {
            return null;
        }

        if (ratingMatch[1] === "null") {
            return null;
        }

        const rating = Number.parseFloat(ratingMatch[1]);
        return Number.isNaN(rating) ? null : rating;
    };

    const getFollowerStatIndex = () => {
        if (Number.isInteger(liveFollowersConfig.statIndex) && liveFollowersConfig.statIndex >= 0) {
            return liveFollowersConfig.statIndex;
        }

        if (!Array.isArray(content.stats)) {
            console.error("Stats configuration missing: cannot map follower counter.");
            return 0;
        }

        const discoveredIndex = content.stats.findIndex(stat =>
            typeof stat.label === "string" && /follower/i.test(stat.label)
        );

        if (discoveredIndex === -1) {
            console.error("No follower stat label found. Falling back to first stat card.");
            return 0;
        }

        return discoveredIndex;
    };

    const getRatingStatIndex = () => {
        if (Number.isInteger(liveRatingsConfig.statIndex) && liveRatingsConfig.statIndex >= 0) {
            return liveRatingsConfig.statIndex;
        }

        if (!Array.isArray(content.stats)) {
            console.error("Stats configuration missing: cannot map rating counter.");
            return 1;
        }

        const discoveredIndex = content.stats.findIndex(stat =>
            typeof stat.label === "string" && /(bewertung|rating)/i.test(stat.label)
        );

        if (discoveredIndex === -1) {
            console.error("No rating stat label found. Falling back to second stat card.");
            return 1;
        }

        return discoveredIndex;
    };

    const updateStatCounter = (statIndex, targetValue, displayValue) => {
        const statsSection = document.getElementById("statsSection");
        if (!statsSection) {
            console.error("Stats section not found: cannot update stat counter.");
            return;
        }

        const cards = statsSection.querySelectorAll(".card");
        if (!cards[statIndex]) {
            console.error("Stat card index out of range:", statIndex);
            return;
        }

        const counter = cards[statIndex].querySelector(".counter");
        if (!counter) {
            console.error("Counter element not found in stat card.");
            return;
        }

        counter.dataset.target = String(targetValue);
        counter.dataset.skipIntroAnimation = "true";

        if (typeof displayValue === "string") {
            counter.dataset.displayValue = displayValue;
            counter.textContent = displayValue;
            return;
        }

        delete counter.dataset.displayValue;
        counter.textContent = targetValue.toLocaleString(followerNumberLocale);
    };

    const updateFollowerCounter = count => {
        const statIndex = getFollowerStatIndex();
        if (Array.isArray(content.stats) && content.stats[statIndex]) {
            content.stats[statIndex].target = count;
        }

        updateStatCounter(statIndex, count);
    };

    const updateRatingCounter = rating => {
        if (liveRatingsConfig.enabled === false) {
            return;
        }

        const statIndex = getRatingStatIndex();
        const hasNumericRating = Number.isFinite(rating);
        const roundedRating = hasNumericRating ? Math.round(rating * 10) / 10 : 0;
        const suffix = liveRatingsConfig.showStar === false ? "" : "★";
        const emptyLabel = typeof liveRatingsConfig.emptyLabel === "string" && liveRatingsConfig.emptyLabel
            ? liveRatingsConfig.emptyLabel
            : "Neu";
        const displayValue = hasNumericRating
            ? `${roundedRating.toFixed(1).replace(".", ",")}${suffix}`
            : emptyLabel;

        if (Array.isArray(content.stats) && content.stats[statIndex]) {
            content.stats[statIndex].target = roundedRating;
        }

        updateStatCounter(statIndex, roundedRating, displayValue);
    };

    const fetchWhatnotProfileStats = async () => {
        const response = await fetch(`./whatnot-stats.json?t=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Whatnot stats request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const followers = parseFollowerValue(payload.followers);
        if (!Number.isInteger(followers)) {
            throw new Error("Follower count not found in stats file.");
        }

        const sellerRating = Number.isFinite(Number(payload.sellerRating))
            ? Number(payload.sellerRating)
            : null;
        return { followers, sellerRating };
    };

    const setupLiveFollowerSync = () => {
        if (liveFollowersConfig.enabled === false) {
            return;
        }

        const username = resolveWhatnotUsername();
        if (!username) {
            return;
        }

        const refreshIntervalRaw = Number(liveFollowersConfig.refreshIntervalMs);
        const refreshIntervalMs = Number.isFinite(refreshIntervalRaw) && refreshIntervalRaw >= 30000
            ? refreshIntervalRaw
            : 120000;
        let requestRunning = false;

        const syncFollowers = async () => {
            if (requestRunning) {
                return;
            }

            requestRunning = true;
            try {
                const profileStats = await fetchWhatnotProfileStats();
                updateFollowerCounter(profileStats.followers);
                updateRatingCounter(profileStats.sellerRating);
            } catch (error) {
                console.error("Could not refresh Whatnot followers:", error);
            } finally {
                requestRunning = false;
            }
        };

        syncFollowers();
        window.setInterval(syncFollowers, refreshIntervalMs);
    };

    applyContent();
    setupLiveFollowerSync();
    forceUnlockPageScroll();
    window.setTimeout(forceUnlockPageScroll, 250);

    let scrollTicking = false;
    const syncScrollUi = () => {
        const doc = document.documentElement;
        const currentScrollY = window.scrollY || doc.scrollTop || 0;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const progressPercent = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0;

        if (progress) {
            progress.style.width = `${progressPercent}%`;
        }

        if (scrollBtn) {
            scrollBtn.classList.toggle("show", currentScrollY > 500);
        }

        if (header) {
            const isTop = currentScrollY < 80;
            header.classList.toggle("headerHidden", !isTop);
        }
    };

    const onScroll = () => {
        if (scrollTicking) {
            return;
        }

        scrollTicking = true;
        requestAnimationFrame(() => {
            syncScrollUi();
            scrollTicking = false;
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", forceUnlockPageScroll);
    window.addEventListener("focus", forceUnlockPageScroll);
    syncScrollUi();

    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (glow) {
        if (prefersReducedMotion) {
            glow.style.display = "none";
        } else {
            let pointerX = 0;
            let pointerY = 0;
            let glowTicking = false;

            const updateGlow = () => {
                glow.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
                glowTicking = false;
            };

            document.addEventListener("mousemove", event => {
                pointerX = event.clientX;
                pointerY = event.clientY;

                if (glowTicking) {
                    return;
                }

                glowTicking = true;
                requestAnimationFrame(updateGlow);
            }, { passive: true });
        }
    }

    const formatCounterValue = (counter, value) => {
        const suffix = typeof counter.dataset.suffix === "string" ? counter.dataset.suffix : "";
        return `${value}${suffix}`;
    };

    const startCounterAnimation = counter => {
        const target = Number(counter.dataset.target) || 0;
        const duration = 1200;
        let startTime;

        const tick = timestamp => {
            if (!startTime) {
                startTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            const progressValue = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(target * progressValue);

            counter.textContent = formatCounterValue(counter, currentValue);

            if (progressValue < 1) {
                requestAnimationFrame(tick);
                return;
            }

            counter.textContent = formatCounterValue(counter, target);
        };

        requestAnimationFrame(tick);
    };

    const counters = document.querySelectorAll(".counter");
    if (counters.length) {
        if (!prefersReducedMotion && "IntersectionObserver" in window) {
            const counterObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    if (entry.target.dataset.skipIntroAnimation === "true") {
                        if (typeof entry.target.dataset.displayValue === "string" && entry.target.dataset.displayValue) {
                            entry.target.textContent = entry.target.dataset.displayValue;
                        } else {
                            const targetValue = Number(entry.target.dataset.target) || 0;
                            entry.target.textContent = formatCounterValue(
                                entry.target,
                                targetValue.toLocaleString(followerNumberLocale)
                            );
                        }
                        counterObserver.unobserve(entry.target);
                        return;
                    }

                    startCounterAnimation(entry.target);
                    counterObserver.unobserve(entry.target);
                });
            }, { threshold: 0.4 });

            counters.forEach(counter => counterObserver.observe(counter));
        } else {
            counters.forEach(counter => {
                const targetValue = Number(counter.dataset.target) || 0;
                counter.textContent = formatCounterValue(counter, targetValue);
            });
        }
    }

    document.querySelectorAll(".faqItem button").forEach(button => {
        button.setAttribute("aria-expanded", "false");

        button.addEventListener("click", () => {
            const item = button.closest(".faqItem");

            if (!item) {
                return;
            }

            const isActive = item.classList.toggle("active");
            button.setAttribute("aria-expanded", String(isActive));
        });
    });

    const sections = document.querySelectorAll("section");
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        sections.forEach(section => {
            section.classList.add("reveal");
            revealObserver.observe(section);
        });
    } else {
        sections.forEach(section => section.classList.add("active"));
    }

    if (!prefersReducedMotion) {
        document.querySelectorAll(".breakCard,.hitCard").forEach(card => {
            let rafId = 0;
            let rotateX = 0;
            let rotateY = 0;

            const applyTilt = () => {
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                rafId = 0;
            };

            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                rotateY = ((x / rect.width) - 0.5) * 18;
                rotateX = ((y / rect.height) - 0.5) * -18;

                if (rafId) {
                    return;
                }

                rafId = requestAnimationFrame(applyTilt);
            });

            card.addEventListener("mouseleave", () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = 0;
                }

                card.style.transform = "";
            });
        });
    }

    const modal = document.getElementById("legalModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    const openModal = page => {
        const contentText = legalTexts[page];

        if (!modal || !modalTitle || !modalBody || !contentText) {
            console.error("Modal could not be opened for page:", page);
            return;
        }

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        modalTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
        modalBody.innerHTML = contentText;
        forceUnlockPageScroll();
    };

    const closeModal = () => {
        if (!modal) {
            console.error("Modal element is missing.");
            return;
        }

        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        forceUnlockPageScroll();
    };

    document.querySelectorAll("[data-modal]").forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("data-modal");

            if (!page) {
                console.error("Missing data-modal attribute on legal link button.");
                return;
            }

            openModal(page);
        });
    });

    const closeModalButton = document.querySelector(".closeModal");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeModal);
    }

    window.addEventListener("click", event => {
        if (modal && event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("keydown", event => {
        if (!modal || !modal.classList.contains("show")) {
            return;
        }

        if (event.key === "Escape") {
            closeModal();
        }
    });

    // ============================================================
    // LIGHTBOX (Punkt 4)
    // ============================================================

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxCloseButton = document.querySelector(".lightboxClose");

    const openLightbox = (src, caption) => {
        if (!lightbox || !lightboxImg) {
            return;
        }

        lightboxImg.src = src;
        lightboxImg.alt = caption || "";

        if (lightboxCaption) {
            lightboxCaption.textContent = caption || "";
        }

        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
        forceUnlockPageScroll();
        if (lightboxCloseButton) {
            lightboxCloseButton.focus();
        }
    };

    const closeLightbox = () => {
        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("show");
        lightbox.setAttribute("aria-hidden", "true");
        forceUnlockPageScroll();
    };

    if (hitsGrid) {
        hitsGrid.addEventListener("click", event => {
            if (!(event.target instanceof Element)) {
                return;
            }
            const hitImage = event.target.closest(".hitImage[data-lightbox-src]");
            if (!hitImage) {
                return;
            }

            openLightbox(hitImage.dataset.lightboxSrc, hitImage.dataset.lightboxCaption);
        });

        hitsGrid.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            if (!(event.target instanceof Element)) {
                return;
            }
            const hitImage = event.target.closest(".hitImage[data-lightbox-src]");
            if (!hitImage) {
                return;
            }

            event.preventDefault();
            openLightbox(hitImage.dataset.lightboxSrc, hitImage.dataset.lightboxCaption);
        });
    }

    if (lightboxCloseButton) {
        lightboxCloseButton.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    window.addEventListener("keydown", event => {
        if (event.key === "Escape" && lightbox && lightbox.classList.contains("show")) {
            closeLightbox();
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            forceUnlockPageScroll();
        }
    });
    forceUnlockPageScroll();

    // ============================================================
    // SCROLL-SPY (Item 6)
    // ============================================================

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const spyLinks = document.querySelectorAll('#mainNav a[href^="#"]');

        if (spyLinks.length) {
            const spySections = Array.from(spyLinks)
                .map(a => document.getElementById(a.getAttribute("href").slice(1)))
                .filter(Boolean);

            const spyObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    spyLinks.forEach(a => {
                        a.classList.toggle("navActive", a.getAttribute("href") === `#${entry.target.id}`);
                    });
                });
            }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

            spySections.forEach(s => spyObserver.observe(s));
        }
    }

    // ============================================================
    // HERO SCROLL INDICATOR (Item 10)
    // ============================================================

    const heroScroll = document.getElementById("heroScroll");
    if (heroScroll) {
        heroScroll.addEventListener("click", () => {
            const statsSection = document.getElementById("statsSection");
            const target = statsSection || document.querySelector("section.stats");

            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

});
