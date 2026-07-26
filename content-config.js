window.siteContent = {
    // ===== SEO / Meta =====
    meta: {
        title: "RSCollectiblesDE",
        description: "Live Casebreaks auf Whatnot. Topps, Panini und weitere Sammelkarten. Faire Breaks, schneller Versand und transparente Livestreams.",
        themeColor: "#8b5cff"
    },

    // ===== Navigation =====
    navigation: [
        { href: "#about", label: "ÜBER UNS" },
        { href: "#hits", label: "HITS" },
        { href: "#faq", label: "FAQ" }
    ],

    // ===== Globale Links / CTA =====
    whatnotUrl: "https://www.whatnot.com/de-DE/user/rscollectiblesde",
    headerButtonLabel: "LIVE auf Whatnot",

    // ===== Hero =====
    hero: {
        liveBadge: "● LIVE CASEBREAKS",
        titleTop: "TOPPS &",
        titleAccent: "PANINI",
        titleBottom: "CASEBREAKS",
        description: "Premium Live Casebreaks für Topps- und Panini-Sammelkarten. Faire Preise, sichere Verpackung und transparente Breaks.",
        buttonLabel: "Zum Stream"
    },

    // ===== Stats / Counter =====
    stats: [
        { target: 0, label: "Whatnot Follower" },
        { target: 0, label: "Whatnot Bewertung" },
        { target: 100, label: "Zuverlässigkeit", suffix: "%" }
    ],

    // ===== Live-Follower Sync =====
    liveFollowers: {
        enabled: true,
        locale: "de-DE",
        refreshIntervalMs: 300000
    },
    liveRatings: {
        enabled: true,
        statIndex: 1,
        showStar: true,
        emptyLabel: "Neu"
    },

    // ===== About =====
    about: {
        titlePrefix: "Willkommen bei",
        titleAccent: "RSCollectiblesDE",
        description: "Bei RSCollectiblesDE dreht sich alles um hochwertige Topps- und Panini-Produkte. Unsere Live-Streams auf Whatnot bieten faire Casebreaks, professionelle Abwicklung und einen sicheren Versand aller gezogenen Karten."
    },

    // ===== Hits Sektion =====
    hitsSection: {
        eyebrow: "Unsere Community",
        title: "Letzte Highlights"
    },

    // ===== Hits Karten =====
    // Werden aus hits-data.json geladen (Fallback bleibt leer)
    hits: [],

    // ===== Features Sektion =====
    featuresSection: {
        eyebrow: "Warum RSCollectiblesDE?",
        title: "Darauf kannst du dich verlassen"
    },

    // ===== Features Karten =====
    features: [
        {
            icon: "⚡",
            title: "Live & Transparent",
            description: "Alle Breaks werden live durchgeführt – ohne Ausnahmen."
        },
        {
            icon: "📦",
            title: "Sicherer Versand",
            description: "Alle Karten werden sorgfältig geschützt und schnell verschickt."
        },
        {
            icon: "🏆",
            title: "Originalprodukte",
            description: "Topps- und Panini-Produkte von seriösen Händlern."
        },
        {
            icon: "💜",
            title: "Community",
            description: "Faire Breaks und entspannte Streams mit Leidenschaft."
        }
    ],

    // ===== Live CTA Sektion =====
    liveSection: {
        badge: "● LIVE",
        title: "Sei beim nächsten Casebreak dabei",
        description: "Folge RSCollectiblesDE auf Whatnot und verpasse keinen Stream.",
        buttonLabel: "Zu Whatnot"
    },

    // ===== FAQ Sektion =====
    faqSection: {
        eyebrow: "FAQ",
        title: "Häufige Fragen"
    },

    // ===== FAQ Einträge =====
    faq: [
        {
            question: "Wie funktionieren Casebreaks?",
            answer: "Du kaufst einen Spot und erhältst alle Karten, die deinem gezogenen Team oder Slot entsprechen."
        },
        {
            question: "Wann wird versendet?",
            answer: "Normalerweise innerhalb von 1–3 Werktagen nach dem Stream."
        },
        {
            question: "Sind alle Produkte original?",
            answer: "Ja. Wir verwenden ausschließlich originale Produkte von Topps und Panini."
        }
    ],

    // ===== Footer =====
    footer: {
        brandTitle: "RSCollectiblesDE",
        legalLinks: [
            { key: "impressum", label: "Impressum" },
            { key: "datenschutz", label: "Datenschutz" },
            { key: "versand", label: "Versand" }
        ],
        copyright: "© 2026 RSCollectiblesDE. Alle Rechte vorbehalten."
    },

    // ===== Rechtstexte werden in legal-content.js gepflegt =====
    legalTexts: {}
};
