export type Language = "en" | "es" | "fr" | "de";

export interface Translations {
  // Navigation
  nav: {
    work: string;
    expertise: string;
    about: string;
    contact: string;
  };

  // Hero Section
  hero: {
    availableForProjects: string;
    greeting: string;
    role: string;
    description: string;
    viewWork: string;
    getInTouch: string;
    discover: string;
  };

  // About Section
  about: {
    title: string;
    intro: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    openForProjects: string;
  };

  // Stats
  stats: {
    yearsExperience: string;
    projectsDelivered: string;
    clientSatisfaction: string;
    technologiesMastered: string;
  };

  // Projects Section
  projects: {
    featuredProject: string;
    myWork: string;
    personalProjects: string;
    viewMore: string;
    viewLess: string;
    visitSite: string;
    projectsSubtitle: string;
    viewProject: string;
    sideProjectsSubtitle: string;
    
    // Project descriptions
    xenosDescription: string;
    myrasDescription: string;
    hookedDescription: string;
    xtraBioDescription: string;
  };

  // Expertise Section
  expertise: {
    title: string;
    subtitle: string;
    grid: string;
    carousel: string;
    cards: string;
    viewAllTechnologies: string;
  };

  // Contact Section
  contact: {
    availableForWork: string;
    letsTalk: string;
    description: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    messageSent: string;
    thankYou: string;
    letsConnect: string;
    preferQuickChat: string;
    joinDiscordServer: string;
    or: string;
    discordUsername: string;
    discordPlaceholder: string;
    send: string;
    connecting: string;
  };

  // Footer
  footer: {
    quickLinks: string;
    status: string;
    availableForWork: string;
    availableDescription: string;
    allRightsReserved: string;
    builtWith: string;
  };

  // Settings
  settings: {
    title: string;
    accentColor: string;
    customColor: string;
    language: string;
    resetToDefaults: string;
    colorPicker: string;
    clickToChoose: string;
    hexCode: string;
    apply: string;
    quickPresets: string;
    preview: string;
    hue: string;
  };

  // Button
  button: {
    learnMore: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      work: "Work",
      expertise: "Expertise",
      about: "About",
      contact: "Contact",
    },
    hero: {
      availableForProjects: "Available for projects",
      greeting: "Hey, I'm xtra",
      role: "Frontend Developer",
      description: "Building fast, modern websites with clean code and smooth animations.",
      viewWork: "View Work",
      getInTouch: "Get in Touch",
      discover: "Discover",
    },
    about: {
      title: "About Me",
      intro: "I'm xtra, a frontend developer who builds stuff for the web.",
      paragraph1: "I use React, Next.js, and whatever else makes sense for the project. My focus is on clean animations, fast performance, and interfaces that just work.",
      paragraph2: "Whether it's cool animations or just making sure everything feels smooth, I keep things simple and polished. Good code shouldn't be complicated.",
      paragraph3: "When I'm not working, I'm usually playing with new tech or contributing to open source.",
      openForProjects: "Open for projects",
    },
    stats: {
      yearsExperience: "Years of Experience",
      projectsDelivered: "Projects Delivered",
      clientSatisfaction: "Client Satisfaction",
      technologiesMastered: "Technologies Mastered",
    },
    projects: {
      featuredProject: "Featured Project",
      myWork: "Recent Work",
      personalProjects: "Personal Projects",
      viewMore: "View More",
      viewLess: "View Less",
      visitSite: "Visit Site",
      projectsSubtitle: "Some of my recent work building modern websites",
      viewProject: "View Project",
      sideProjectsSubtitle: "Side projects and experiments",
      
      xenosDescription: "A gaming community website with Discord bot features, live member stats, and smooth animations. Built for speed and great user experience.",
      myrasDescription: "A modern portfolio website with cool 3D effects, smooth scrolling, and eye catching animations. Features interactive cursor and parallax effects.",
      hookedDescription: "An interactive gaming platform with live server status and animated cards. Super fast loading with smart performance optimizations.",
      xtraBioDescription: "My personal bio page with all my links and info",
    },
    expertise: {
      title: "What I Use",
      subtitle: "Tools and technologies I work with daily",
      grid: "Grid",
      carousel: "Carousel",
      cards: "Cards",
      viewAllTechnologies: "View all technologies",
    },
    contact: {
      availableForWork: "Available for Work",
      letsTalk: "Let's Talk",
      description: "Ready to bring your project to life? Let's build something amazing together.",
      fullName: "Full Name",
      fullNamePlaceholder: "Your Name",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      message: "Your Message",
      messagePlaceholder: "Tell me about your project...",
      sendMessage: "Send Message",
      sending: "Sending...",
      messageSent: "Message sent!",
      thankYou: "Thanks for reaching out. I'll get back to you soon!",
      letsConnect: "Let's Connect",
      preferQuickChat: "Prefer a quick chat?",
      joinDiscordServer: "Join Discord Server",
      or: "or",
      discordUsername: "Discord Username",
      discordPlaceholder: "Enter your Discord username",
      send: "Send",
      connecting: "Connecting...",
    },
    footer: {
      quickLinks: "Quick Links",
      status: "Status",
      availableForWork: "Available for Work",
      availableDescription: "Currently accepting freelance projects and collaborations",
      allRightsReserved: "All rights reserved.",
      builtWith: "Built with Next.js & Framer Motion",
    },
    settings: {
      title: "Settings",
      accentColor: "Accent Color",
      customColor: "Custom Color",
      language: "Language",
      resetToDefaults: "Reset to Defaults",
      colorPicker: "Color Picker",
      clickToChoose: "Click to choose a color",
      hexCode: "Hex Code",
      apply: "Apply",
      quickPresets: "Quick Presets",
      preview: "Preview",
      hue: "Hue",
    },
    button: {
      learnMore: "Learn More",
    },
  },
  es: {
    nav: {
      work: "Proyectos",
      expertise: "Habilidades",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      availableForProjects: "Disponible para nuevos proyectos",
      greeting: "Hola, soy xtra",
      role: "Desarrollador Frontend",
      description: "Creando sitios web rápidos y modernos con código limpio y animaciones fluidas.",
      viewWork: "Ver Proyectos",
      getInTouch: "Hablemos",
      discover: "Descubre",
    },
    about: {
      title: "Sobre Mí",
      intro: "Soy xtra, desarrollador frontend especializado en crear experiencias web excepcionales.",
      paragraph1: "Trabajo con React, Next.js y las herramientas más modernas para cada proyecto. Mi enfoque está en animaciones fluidas, rendimiento óptimo e interfaces intuitivas.",
      paragraph2: "Ya sea creando animaciones impactantes o asegurando una experiencia fluida, mantengo todo simple y refinado. El código de calidad no tiene por qué ser complicado.",
      paragraph3: "Cuando no estoy programando, me gusta experimentar con nuevas tecnologías y contribuir a proyectos de código abierto.",
      openForProjects: "Disponible para proyectos",
    },
    stats: {
      yearsExperience: "Años de Experiencia",
      projectsDelivered: "Proyectos Completados",
      clientSatisfaction: "Satisfacción del Cliente",
      technologiesMastered: "Tecnologías Dominadas",
    },
    projects: {
      featuredProject: "Proyecto Destacado",
      myWork: "Últimos Proyectos",
      personalProjects: "Proyectos Personales",
      viewMore: "Ver Más",
      viewLess: "Ver Menos",
      visitSite: "Visitar Sitio",
      projectsSubtitle: "Algunos de mis trabajos recientes creando sitios web modernos",
      viewProject: "Ver Proyecto",
      sideProjectsSubtitle: "Proyectos paralelos y experimentos",
      
      xenosDescription: "Un sitio web de comunidad gaming con funciones de bot de Discord, estadísticas de miembros en vivo y animaciones fluidas. Construido para velocidad y excelente experiencia de usuario.",
      myrasDescription: "Un portafolio moderno con efectos 3D impresionantes, desplazamiento suave y animaciones llamativas. Cuenta con cursor interactivo y efectos parallax.",
      hookedDescription: "Una plataforma de gaming interactiva con estado del servidor en vivo y tarjetas animadas. Carga super rápida con optimizaciones inteligentes de rendimiento.",
      xtraBioDescription: "Mi página bio personal con todos mis enlaces e información",
    },
    expertise: {
      title: "Tecnologías que Uso",
      subtitle: "Herramientas y tecnologías con las que trabajo a diario",
      grid: "Cuadrícula",
      carousel: "Carrusel",
      cards: "Tarjetas",
      viewAllTechnologies: "Ver todas las tecnologías",
    },
    contact: {
      availableForWork: "Disponible para Trabajar",
      letsTalk: "Hablemos",
      description: "¿Listo para dar vida a tu proyecto? Creemos algo increíble juntos.",
      fullName: "Nombre Completo",
      fullNamePlaceholder: "Tu Nombre",
      email: "Correo Electrónico",
      emailPlaceholder: "tu@email.com",
      message: "Tu Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      sendMessage: "Enviar Mensaje",
      sending: "Enviando...",
      messageSent: "¡Mensaje enviado!",
      thankYou: "Gracias por contactarme. ¡Te responderé pronto!",
      letsConnect: "Conectemos",
      preferQuickChat: "¿Prefieres un chat rápido?",
      joinDiscordServer: "Unirse al servidor de Discord",
      or: "o",
      discordUsername: "Usuario de Discord",
      discordPlaceholder: "Introduce tu usuario de Discord",
      send: "Enviar",
      connecting: "Conectando a Discord...",
    },
    footer: {
      quickLinks: "Enlaces Rápidos",
      status: "Estado",
      availableForWork: "Disponible para Trabajar",
      availableDescription: "Actualmente aceptando proyectos freelance y colaboraciones",
      allRightsReserved: "Todos los derechos reservados.",
      builtWith: "Construido con Next.js y Framer Motion",
    },
    settings: {
      title: "Ajustes",
      accentColor: "Color de Acento",
      customColor: "Color Personalizado",
      language: "Idioma",
      resetToDefaults: "Restablecer a Valores Predeterminados",
      colorPicker: "Selector de Color",
      clickToChoose: "Haz clic para elegir un color",
      hexCode: "Código Hex",
      apply: "Aplicar",
      quickPresets: "Ajustes Rápidos",
      preview: "Vista Previa",
      hue: "Matiz",
    },
    button: {
      learnMore: "Saber Más",
    },
  },
  fr: {
    nav: {
      work: "Projets",
      expertise: "Compétences",
      about: "À propos",
      contact: "Contact",
    },
    hero: {
      availableForProjects: "Disponible pour de nouveaux projets",
      greeting: "Salut, je suis xtra",
      role: "Développeur Frontend",
      description: "Je crée des sites web rapides et modernes avec un code propre et des animations fluides.",
      viewWork: "Voir les Projets",
      getInTouch: "Parlons-en",
      discover: "Découvrir",
    },
    about: {
      title: "À Propos",
      intro: "Je suis xtra, développeur frontend spécialisé dans la création d'expériences web exceptionnelles.",
      paragraph1: "Je travaille avec React, Next.js et les outils les plus modernes pour chaque projet. Mon expertise réside dans les animations fluides, les performances optimales et les interfaces intuitives.",
      paragraph2: "Qu'il s'agisse de créer des animations impressionnantes ou d'assurer une expérience fluide, je garde tout simple et raffiné. Un code de qualité n'a pas besoin d'être compliqué.",
      paragraph3: "Quand je ne programme pas, j'aime expérimenter avec de nouvelles technologies et contribuer à des projets open source.",
      openForProjects: "Ouvert aux projets",
    },
    stats: {
      yearsExperience: "Années d'Expérience",
      projectsDelivered: "Projets Réalisés",
      clientSatisfaction: "Satisfaction Client",
      technologiesMastered: "Technologies Maîtrisées",
    },
    projects: {
      featuredProject: "Projet Phare",
      myWork: "Derniers Projets",
      personalProjects: "Projets Personnels",
      viewMore: "Voir Plus",
      viewLess: "Voir Moins",
      visitSite: "Visiter le Site",
      projectsSubtitle: "Quelques-uns de mes travaux récents créant des sites web modernes",
      viewProject: "Voir le Projet",
      sideProjectsSubtitle: "Projets secondaires et expérimentations",
      
      xenosDescription: "Un site web de communauté gaming avec fonctionnalités de bot Discord, statistiques de membres en direct et animations fluides. Conçu pour la vitesse et une excellente expérience utilisateur.",
      myrasDescription: "Un portfolio moderne avec des effets 3D impressionnants, défilement fluide et animations captivantes. Doté d'un curseur interactif et d'effets parallaxe.",
      hookedDescription: "Une plateforme gaming interactive avec statut du serveur en direct et cartes animées. Chargement ultra-rapide avec optimisations de performance intelligentes.",
      xtraBioDescription: "Ma page bio personnelle avec tous mes liens et infos",
    },
    expertise: {
      title: "Technologies Utilisées",
      subtitle: "Outils et technologies que j'utilise quotidiennement",
      grid: "Grille",
      carousel: "Carrousel",
      cards: "Cartes",
      viewAllTechnologies: "Voir toutes les technologies",
    },
    contact: {
      availableForWork: "Disponible pour Travailler",
      letsTalk: "Discutons",
      description: "Prêt à donner vie à votre projet ? Créons quelque chose d'exceptionnel ensemble.",
      fullName: "Nom Complet",
      fullNamePlaceholder: "Votre Nom",
      email: "Adresse Email",
      emailPlaceholder: "votre@email.com",
      message: "Votre Message",
      messagePlaceholder: "Parlez-moi de votre projet…",
      sendMessage: "Envoyer le Message",
      sending: "Envoi...",
      messageSent: "Message envoyé !",
      thankYou: "Merci pour votre message. Je vous répondrai bientôt !",
      letsConnect: "Restons Connectés",
      preferQuickChat: "Vous préférez discuter rapidement ?",
      joinDiscordServer: "Rejoindre le serveur Discord",
      or: "ou",
      discordUsername: "Nom d'utilisateur Discord",
      discordPlaceholder: "Entrez votre nom Discord",
      send: "Envoyer",
      connecting: "Connexion à Discord…",
    },
    footer: {
      quickLinks: "Liens Rapides",
      status: "Statut",
      availableForWork: "Disponible pour Travailler",
      availableDescription: "Actuellement ouvert aux projets freelance et collaborations",
      allRightsReserved: "Tous droits réservés.",
      builtWith: "Construit avec Next.js & Framer Motion",
    },
    settings: {
      title: "Paramètres",
      accentColor: "Couleur d'Accent",
      customColor: "Couleur Personnalisée",
      language: "Langue",
      resetToDefaults: "Réinitialiser",
      colorPicker: "Sélecteur de Couleur",
      clickToChoose: "Cliquez pour choisir une couleur",
      hexCode: "Code Hex",
      apply: "Appliquer",
      quickPresets: "Préréglages Rapides",
      preview: "Aperçu",
      hue: "Teinte",
    },
    button: {
      learnMore: "En Savoir Plus",
    },
  },
  de: {
    nav: {
      work: "Projekte",
      expertise: "Fähigkeiten",
      about: "Über mich",
      contact: "Kontakt",
    },
    hero: {
      availableForProjects: "Verfügbar für neue Projekte",
      greeting: "Hey, ich bin xtra",
      role: "Frontend-Entwickler",
      description: "Ich entwickle schnelle, moderne Websites mit sauberem Code und flüssigen Animationen.",
      viewWork: "Projekte ansehen",
      getInTouch: "Kontakt aufnehmen",
      discover: "Entdecken",
    },
    about: {
      title: "Über Mich",
      intro: "Ich bin xtra, ein Frontend-Entwickler spezialisiert auf außergewöhnliche Web-Erlebnisse.",
      paragraph1: "Ich arbeite mit React, Next.js und den modernsten Tools für jedes Projekt. Mein Fokus liegt auf flüssigen Animationen, optimaler Performance und intuitiven Interfaces.",
      paragraph2: "Ob beeindruckende Animationen oder nahtlose Benutzererfahrung – ich halte alles einfach und elegant. Qualitätscode muss nicht kompliziert sein.",
      paragraph3: "Wenn ich nicht programmiere, experimentiere ich gerne mit neuen Technologien und trage zu Open-Source-Projekten bei.",
      openForProjects: "Offen für Projekte",
    },
    stats: {
      yearsExperience: "Jahre Erfahrung",
      projectsDelivered: "Abgeschlossene Projekte",
      clientSatisfaction: "Kundenzufriedenheit",
      technologiesMastered: "Beherrschte Technologien",
    },
    projects: {
      featuredProject: "Hauptprojekt",
      myWork: "Neueste Projekte",
      personalProjects: "Persönliche Projekte",
      viewMore: "Mehr anzeigen",
      viewLess: "Weniger anzeigen",
      visitSite: "Website besuchen",
      projectsSubtitle: "Einige meiner neuesten Arbeiten beim Erstellen moderner Websites",
      viewProject: "Projekt ansehen",
      sideProjectsSubtitle: "Nebenprojekte und Experimente",
      
      xenosDescription: "Eine Gaming-Community-Website mit Discord-Bot-Funktionen, Live-Mitgliederstatistiken und flüssigen Animationen. Entwickelt für Geschwindigkeit und großartige Benutzererfahrung.",
      myrasDescription: "Ein modernes Portfolio mit coolen 3D-Effekten, sanftem Scrollen und beeindruckenden Animationen. Mit interaktivem Cursor und Parallax-Effekten.",
      hookedDescription: "Eine interaktive Gaming-Plattform mit Live-Serverstatus und animierten Karten. Superschnelles Laden mit intelligenten Performance-Optimierungen.",
      xtraBioDescription: "Meine persönliche Bio-Seite mit allen meinen Links und Infos",
    },
    expertise: {
      title: "Verwendete Technologien",
      subtitle: "Tools und Technologien, mit denen ich täglich arbeite",
      grid: "Raster",
      carousel: "Karussell",
      cards: "Karten",
      viewAllTechnologies: "Alle Technologien ansehen",
    },
    contact: {
      availableForWork: "Verfügbar für Arbeit",
      letsTalk: "Lass uns reden",
      description: "Bereit, dein Projekt zum Leben zu erwecken? Lass uns gemeinsam etwas Großartiges bauen.",
      fullName: "Vollständiger Name",
      fullNamePlaceholder: "Dein Name",
      email: "E-Mail-Adresse",
      emailPlaceholder: "deine@email.com",
      message: "Deine Nachricht",
      messagePlaceholder: "Erzähl mir von deinem Projekt...",
      sendMessage: "Nachricht senden",
      sending: "Senden...",
      messageSent: "Nachricht gesendet!",
      thankYou: "Danke für deine Nachricht. Ich melde mich bald!",
      letsConnect: "Lass uns verbinden",
      preferQuickChat: "Bevorzugst du einen schnellen Chat?",
      joinDiscordServer: "Discord-Server beitreten",
      or: "oder",
      discordUsername: "Discord-Username",
      discordPlaceholder: "Gib deinen Discord-Usernamen ein",
      send: "Absenden",
      connecting: "Verbinde mit Discord...",
    },
    footer: {
      quickLinks: "Schnelllinks",
      status: "Status",
      availableForWork: "Verfügbar für Arbeit",
      availableDescription: "Aktuell offen für Freelance-Projekte und Kooperationen",
      allRightsReserved: "Alle Rechte vorbehalten.",
      builtWith: "Gebaut mit Next.js & Framer Motion",
    },
    settings: {
      title: "Einstellungen",
      accentColor: "Akzentfarbe",
      customColor: "Benutzerdefinierte Farbe",
      language: "Sprache",
      resetToDefaults: "Auf Standard zurücksetzen",
      colorPicker: "Farbwähler",
      clickToChoose: "Zum Auswählen klicken",
      hexCode: "Hex-Code",
      apply: "Anwenden",
      quickPresets: "Schnell-Presets",
      preview: "Vorschau",
      hue: "Farbton",
    },
    button: {
      learnMore: "Mehr erfahren",
    },
  },
};
