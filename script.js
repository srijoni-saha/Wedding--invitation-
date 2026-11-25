
// ==================================
// WEDDING INFORMATION
// পরে শুধু এই অংশের তথ্য পরিবর্তন করবে
// ==================================

const wedding = {
  bride: "কনের নাম",
  groom: "বরের নাম",

  // Date format: YYYY-MM-DD
  date: "",

  time: "সময় পরে জানানো হবে",

  venue: "অনুষ্ঠানস্থলের নাম",
  address: "ঠিকানা পরে জানানো হবে",

  // Google Maps link
  map: "",

  contactName: "যোগাযোগের ব্যক্তির নাম",
  contact: ""
};


// ==================================
// DISPLAY WEDDING INFORMATION
// ==================================

document.getElementById("brideName").textContent = wedding.bride;
document.getElementById("groomName").textContent = wedding.groom;

document.getElementById("weddingTime").textContent = wedding.time;
document.getElementById("venueName").textContent = wedding.venue;
document.getElementById("venueAddress").textContent = wedding.address;
document.getElementById("contactName").textContent = wedding.contactName;

const dateElement = document.getElementById("weddingDate");

if (wedding.date) {
  const date = new Date(wedding.date + "T00:00:00");

  dateElement.textContent = date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
} else {
  dateElement.textContent = "তারিখ পরে জানানো হবে";
}

const mapLink = document.getElementById("mapLink");

if (wedding.map) {
  mapLink.href = wedding.map;
} else {
  mapLink.hidden = true;
}

const contactLink = document.getElementById("contactNumber");

if (wedding.contact) {
  contactLink.href = "tel:" + wedding.contact;
  contactLink.textContent = wedding.contact;
} else {
  contactLink.hidden = true;
}


// ==================================
// ENVELOPE ANIMATION
// ==================================

const envelope = document.getElementById("envelope");
const envelopeArea = document.getElementById("envelopeArea");
const openHint = document.getElementById("openHint");

let envelopeOpened = false;

envelopeArea.addEventListener("click", () => {

  if (envelopeOpened) return;

  envelopeOpened = true;

  envelope.classList.add("open");

  openHint.textContent = "আমন্ত্রণটি খুলে গেছে ♥";

  setTimeout(() => {
    document.getElementById("invitation").scrollIntoView({
      behavior: "smooth"
    });
  }, 1200);

});


// ==================================
// BENGALI / ENGLISH LANGUAGE SWITCH
// ==================================

let currentLanguage = "bn";

const languageBtn = document.getElementById("languageBtn");

languageBtn.addEventListener("click", () => {

  currentLanguage = currentLanguage === "bn" ? "en" : "bn";

  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-bn]").forEach(element => {

    const translation = element.getAttribute(
      "data-" + currentLanguage
    );

    if (translation) {
      element.textContent = translation;
    }

  });

  languageBtn.textContent =
    currentLanguage === "bn" ? "English" : "বাংলা";

});


// ==================================
// WEDDING COUNTDOWN
// ==================================

function updateCountdown() {

  if (!wedding.date) return;

  const targetDate = new Date(wedding.date + "T00:00:00").getTime();

  if (Number.isNaN(targetDate)) return;

  const now = Date.now();
  const difference = targetDate - now;

  if (difference <= 0) {

    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "0";
    });

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==================================
// BACKGROUND MUSIC
// ==================================

const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {

  if (!musicPlaying) {

    try {
      await music.play();
      musicPlaying = true;
      musicBtn.textContent = "♫ Music: On";
    } catch (error) {
      musicBtn.textContent = "Add music.mp3 first";
    }

  } else {

    music.pause();
    musicPlaying = false;
    musicBtn.textContent = "♫ Music: Off";

  }

});


// ==================================
// SCROLL ANIMATIONS
// ==================================

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }

  });

}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(section => {
  observer.observe(section);
});
                          
