alert("JS is connected!");

const pages = document.querySelectorAll(".page");
const hearts = document.querySelector(".hearts");

const paperRings = document.getElementById("paperRings");
const birthdayMusic = document.getElementById("birthdayMusic");

const pageBirthday = document.getElementById("pageBirthday");
const pagePhyu = document.getElementById("pagePhyu");
const pageShwe = document.getElementById("pageShwe");
const pageWish = document.getElementById("pageWish");
const pageCelebrate = document.getElementById("pageCelebrate");
const pageBirthdayCountdown = document.getElementById("pageBirthdayCountdown");

const countdownText = document.getElementById("countdownText");
const wishMessage = document.getElementById("wishMessage");


// ================= PAGE SWITCH =================
function showPage(page) {
    pages.forEach(p => p.classList.remove("active"));
    page.classList.add("active");

    // If countdown page, start countdown
    if (page.id === "pageBirthdayCountdown") {
        startCountdown();
    }
}


// ================= BACKGROUND MUSIC =================
// Play Paper Rings after first click (browser requirement)
document.addEventListener("click", function () {
    if (paperRings.paused) {
        paperRings.play().catch(() => {});
    }
}, { once: true });


// ================= HEART EFFECT =================
function openGallery(page) {
    showPage(page);
    startHearts();
}

function closeGallery() {
    hearts.innerHTML = "";
    showPage(pageBirthday);
}

function startHearts() {
    hearts.innerHTML = "";
    setInterval(() => {
        const h = document.createElement("div");
        h.className = "heart";
        h.innerHTML = "❤";
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = 14 + Math.random() * 20 + "px";
        hearts.appendChild(h);
        setTimeout(() => h.remove(), 4000);
    }, 300);
}


// ================= BUTTONS =================
// Select the YES button
const yesBtn = document.getElementById('yesBtn');
let yesClickCount = 0; // Initialize a counter for the YES button clicks

// Function to move the YES button around
function moveYesButton() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Generate random positions
    const randomX = Math.random() * (viewportWidth - 150); // Adjust for button width
    const randomY = Math.random() * (viewportHeight - 50); // Adjust for button height

    // Move the YES button to the new random position
    yesBtn.style.position = 'absolute'; // Ensure it's positioned absolutely
    yesBtn.style.left = `${randomX}px`;
    yesBtn.style.top = `${randomY}px`;
  
    // Increment the click count
    yesClickCount++;

    // If clicked more than 2 times, hide the YES button and show only NO
    if (yesClickCount > 2) {
        yesBtn.style.display = 'none'; // Hide YES button
    }
}

document.getElementById("noBtn").onclick = () => {
    showPage(document.getElementById("pageNo"));
};

document.getElementById("backBtn").onclick = () => {
    showPage(document.getElementById("pageYes"));
};

document.getElementById("toCelebrate").onclick = () => {
    showPage(pageCelebrate);
};

document.getElementById("toBirthday").onclick = () => {
    showPage(pageBirthday);
};

document.getElementById("celebrateBtn").onclick = () => {
    showPage(pageBirthdayCountdown);
};


// ================= COUNTDOWN =================
function startCountdown() {

    // Stop background music
    paperRings.pause();
    paperRings.currentTime = 0;

    let count = 3;
    countdownText.style.display = "block";
    wishMessage.style.display = "none";

    const interval = setInterval(() => {
        countdownText.textContent = count;
        count--;

        if (count < 0) {
            clearInterval(interval);
            countdownText.style.display = "none";
            startBirthday();
        }
    }, 1000);
}


// ================= BIRTHDAY ANIMATION =================
function startBirthday() {

    birthdayMusic.play();

    const lyricBox = document.getElementById("singleLyric");
    const flame = document.querySelector(".flame");

    lyricBox.textContent = "";

    // Fireworks
    for (let i = 0; i < 10; i++) {
        createFirework();
    }

    // Lyrics timing
    setTimeout(() => {
        lyricBox.textContent = "祝你生日快乐!";
    }, 0);

    setTimeout(() => {
        lyricBox.textContent = "祝你生日快乐!";
    }, 3500);

    setTimeout(() => {
        lyricBox.textContent = "祝你天天都快乐!";
    }, 7500);

    setTimeout(() => {
        lyricBox.textContent = "";
        wishMessage.style.display = "block";
        wishMessage.textContent = "Make a wish, girls!";
    }, 12000);

    setTimeout(() => {
        flame.style.display = "none";
        wishMessage.textContent = "Wishes come true!!";
    }, 15000);

    setTimeout(() => {
        wishMessage.style.display = "none";
    }, 18000);
}


// ================= FIREWORK =================
function createFirework() {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = Math.random() * 100 + "vw";
    firework.style.top = Math.random() * 100 + "vh";
    document.body.appendChild(firework);

    setTimeout(() => {
        firework.remove();
    }, 1500);
}
