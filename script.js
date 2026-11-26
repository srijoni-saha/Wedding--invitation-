
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

function createRosePetals() {
  const rain = document.createElement("div");
  rain.className = "petal-rain";
  rain.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 42; i++) {
    const petal = document.createElement("span");
    petal.className = "rose-petal";
    petal.style.setProperty("--left", Math.random() * 100 + "vw");
    petal.style.setProperty("--duration", (3.5 + Math.random() * 3) + "s");
    petal.style.setProperty("--delay", (Math.random() * 1.8) + "s");
    petal.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
    rain.appendChild(petal);
  }

  document.body.appendChild(rain);
  setTimeout(() => rain.remove(), 7500);
}

envelopeArea.addEventListener("click", () => {

  if (envelopeOpened) return;

  envelopeOpened = true;

  envelope.classList.add("open");
  createRosePetals();

  openHint.textContent = "আমন্ত্রণটি খুলে গেছে ♥";

  // Let the card rise first, then slowly fade away the envelope shell.
  setTimeout(() => {
    envelope.classList.add("shell-fade");
  }, 1350);

  // Unlock scrolling after the envelope has faded and the card is visible.
  setTimeout(() => {
    document.body.classList.remove("invitation-locked");
    document.documentElement.classList.remove("invitation-locked");
  }, 3300);

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
// YOUTUBE MUSIC + WELCOME SCREEN
// ==================================

const musicBtn = document.getElementById("musicBtn");
const enterInvitation = document.getElementById("enterInvitation");
const loadingScreen = document.getElementById("loadingScreen");
const youtubePlayerBox = document.getElementById("youtubeMusicPlayer");

let youtubePlayer = null;
let youtubeReady = false;
let startMusicWhenReady = false;
let musicPlaying = false;

window.onYouTubeIframeAPIReady = function () {
  youtubePlayer = new YT.Player("youtubeMusicPlayer", {
    videoId: "E3IXa9h-WIo",
    playerVars: {
      playsinline: 1,
      controls: 1,
      rel: 0
    },
    events: {
      onReady: function () {
        youtubeReady = true;
        if (startMusicWhenReady) {
          youtubePlayer.playVideo();
          musicPlaying = true;
          musicBtn.textContent = "♫ Music: On";
        }
      },
      onStateChange: function (event) {
        if (event.data === YT.PlayerState.PLAYING) {
          musicPlaying = true;
          musicBtn.textContent = "♫ Music: On";
        } else if (event.data === YT.PlayerState.PAUSED ||
                   event.data === YT.PlayerState.ENDED) {
          musicPlaying = false;
          musicBtn.textContent = "♫ Music: Off";
        }
      }
    }
  });
};

const youtubeApi = document.createElement("script");
youtubeApi.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(youtubeApi);

enterInvitation.addEventListener("click", function () {
  startMusicWhenReady = true;
  youtubePlayerBox.classList.add("visible");

  if (youtubeReady && youtubePlayer) {
    youtubePlayer.playVideo();
  }

  loadingScreen.classList.add("leaving");
  setTimeout(() => loadingScreen.remove(), 900);
});

musicBtn.addEventListener("click", function () {
  if (!youtubeReady || !youtubePlayer) return;

  if (musicPlaying) {
    youtubePlayer.pauseVideo();
  } else {
    youtubePlayer.playVideo();
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
                          
