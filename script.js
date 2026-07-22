/* ===========================================================
   RSCollectiblesDE
   Premium Script
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Hit Cards
    ========================================== */

    const hitsGrid = document.getElementById("hitsGrid");

    const renderHits = hits => {

        if (!Array.isArray(hits) || !hits.length || !hitsGrid) {
            return;
        }

        hitsGrid.innerHTML = hits.map(hit => `

            <div class="hitCardWrap">

                <article class="hitCard" data-rarity="${hit.rarity}">

                    <div class="shine"></div>

                    <div class="hitImage">
                        <img src="${hit.image}" alt="${hit.title}">
                    </div>

                    <div class="rarity ${hit.rarity}">${hit.label}</div>

                    <h3>${hit.title}</h3>

                    <div class="hitDescription">
                        ${hit.description || hit.text || ""}
                    </div>

                </article>

            </div>

        `).join("");

    };

    const loadHitsData = async () => {

        if (Array.isArray(window.hitsData) && window.hitsData.length) {
            return window.hitsData;
        }

        try {

            const response = await fetch("hits-content.json", {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("Fetch failed");
            }

            const data = await response.json();

            if (Array.isArray(data) && data.length) {
                return data;
            }

        } catch {

            return [];

        }

        return [];

    };

    loadHitsData().then(renderHits).catch(() => renderHits([]));

    /* ==========================================
       Scroll Progress
    ========================================== */

    const progress = document.getElementById("progressBar");

    if (progress) {

        window.addEventListener("scroll", () => {

            const winScroll =
                document.documentElement.scrollTop;

            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const scrolled = (winScroll / height) * 100;

            progress.style.width = scrolled + "%";

        });

    }

    /* ==========================================
       Cursor Glow
    ========================================== */

    const glow = document.querySelector(".cursorGlow");

    if (glow) {

        document.addEventListener("mousemove", e => {

            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";

        });

    }

    /* ==========================================
       Counter
    ========================================== */

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const update = () => {

            const target =
                Number(counter.dataset.target);

            const current =
                Number(counter.innerText);

            const increment =
                Math.ceil(target / 80);

            if (current < target) {

                counter.innerText =
                    current + increment;

                requestAnimationFrame(update);

            } else {

                counter.innerText = target;

            }

        };

        update();

    });

    /* ==========================================
       FAQ
    ========================================== */

    const faqItems =
        document.querySelectorAll(".faqItem");

    faqItems.forEach(item => {

        item.querySelector("button")
            .addEventListener("click", () => {

                item.classList.toggle("active");

            });

    });

    /* ==========================================
       Scroll To Top
    ========================================== */

    const scrollBtn =
        document.getElementById("scrollTop");

    if (scrollBtn) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                scrollBtn.classList.add("show");

            } else {

                scrollBtn.classList.remove("show");

            }

        });

        scrollBtn.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       Reveal Animation
    ========================================== */

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        }, {

            threshold: .15

        });

    document.querySelectorAll("section")
        .forEach(section => {

            section.classList.add("reveal");

            observer.observe(section);

        });

    /* ==========================================
       3D Cards
    ========================================== */

    document.querySelectorAll(".breakCard,.hitCard")
        .forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - .5) * 18;

                const rotateX =
                    ((y / rect.height) - .5) * -18;

                card.style.transform =
                    `rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    /* ==========================================
       Navbar Blur
    ========================================== */

    const header =
        document.querySelector("header");

    const updateHeader = () => {

        const isTop = window.scrollY < 100;

        header.classList.toggle("headerHidden", !isTop);

        if (window.scrollY > 100) {

            header.style.background =
                "rgba(8,10,18,.85)";

        } else {

            header.style.background =
                "rgba(15,17,25,.65)";

        }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader);

    /* ==========================================
       Live Badge Animation
    ========================================== */

    const badge =
        document.querySelector(".liveBadge");

    if (badge) {

        setInterval(() => {

            badge.style.opacity = ".5";

            setTimeout(() => {

                badge.style.opacity = "1";

            }, 450);

        }, 1000);

    }

});

const legalTexts = {

impressum: `
<p><strong>Impressum</strong></p>

<p>
Name:<br>
RBN Collectibles<br>
Robin Smit<br>
Johannesstraße 68<br>
46240 Bottrop<br>
</p>

<p>
E-Mail: info@rscollectibles.de
</p>
`,

datenschutz: `
<p> </p>
`,

versand: `
<p>

Versand erfolgt innerhalb von 1 bis 3 Werktagen nach Zahlungseingang.

</p>
`

};

function openModal(page){

document.getElementById("legalModal").classList.add("show");

document.getElementById("modalTitle").innerHTML=
page.charAt(0).toUpperCase()+page.slice(1);

document.getElementById("modalBody").innerHTML=
legalTexts[page];

}

function closeModal(){

document.getElementById("legalModal").classList.remove("show");

}

window.addEventListener("click",(e)=>{

const modal=document.getElementById("legalModal");

if(e.target===modal){

closeModal();

}

});
