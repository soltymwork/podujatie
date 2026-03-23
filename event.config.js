// ============================================================
// KONFIGURACIA EVENTU — zmeniť pri každom novom podujatí
// ============================================================
window.EVENT = {

  // Základné info
  name:          "Názov Vášho Podujatia",
  edition:       "X. ročník",
  year:          "2026",
  dateCountdown: "October 10, 2026 09:00:00",   // formát: "Month DD, YYYY HH:MM:SS"
  dateDisplay:   "10. októbra 2026",
  location:      "Miesto Konania",

  // Registrácia
  registrationUrl: "#",

  // Google Analytics ID — zmeniť aj v <head> v index.html !
  analyticsId: "",

  // Sociálne siete
  social: {
    facebook:  "#",
    instagram: "#"
  },

  // YouTube videá — ID z URL (youtube.com/watch?v=TOTO_JE_ID)
  // Príklad: "dQw4w9WgXcQ" pre youtube.com/watch?v=dQw4w9WgXcQ
  youtube: [
    // "ID_VIDEA_1",
    // "ID_VIDEA_2"
  ],

  // Kontakt
  contact: {
    organizer: "Názov Organizátora",
    email:     "email@vasepodujatie.sk",
    phone:     "0900 000 000"
  },

  // Výsledky minulých ročníkov (môže byť prázdne)
  results: [
    // { year: "2025", url: "https://vysledky.sportsoft.cz/race/XXX" }
  ],

  // Sponzori a partneri
  sponsors: [
    "Hlavný Partner", "Generálny Sponzor", "Mediálny Partner",
    "Technický Partner", "Obec / Mesto", "Lokálny Sponzor"
  ]

};
