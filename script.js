const pages = document.querySelectorAll(".page");
const hearts = document.querySelector(".hearts");
const bgMusic = document.getElementById("bgMusic");

// Define page variables for easy access
const pageBirthday = document.getElementById('pageBirthday');
const pagePhyu = document.getElementById('pagePhyu');
const pageShwe = document.getElementById('pageShwe');
const pageWish = document.getElementById('pageWish');

function showPage(page) {
    pages.forEach(p => p.classList.remove("active"));
    page.classList.add("active");
}

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

// Event listener for the YES button
yesBtn.onclick = () => {
    moveYesButton(); // Move button on click
};

// Event listener for the NO button
const noBtn = document.getElementById('noBtn');
noBtn.onclick = () => showPage(pageNo);

// Event listener for the back button in the NO page
const backBtn = document.getElementById('backBtn');
backBtn.onclick = () => showPage(pageYes);

// Event listener for the Celebrate button
const toCelebrate = document.getElementById('toCelebrate');
toCelebrate.onclick = () => showPage(pageCelebrate);

// Event listener for the Phyu Sin button (clicking the photo)
const phyuBtn = document.querySelector('#pageBirthday .photo-card:nth-child(1)'); // Phyu Sin button
phyuBtn.onclick = () => openGallery(pagePhyu); // Open Phyu gallery

// Event listener for the Shwe Sin button (clicking the photo)
const shweBtn = document.querySelector('#pageBirthday .photo-card:nth-child(2)'); // Shwe Sin button
shweBtn.onclick = () => openGallery(pageShwe); // Open Shwe gallery

// Event listener for the Birthday Wish button
const wishBtn = document.querySelector('#pageBirthday .next'); // Birthday Wish button
wishBtn.onclick = () => showPage(pageWish); // Navigate to Birthday Wish page

// Ensure the music plays when navigating to the birthday page
const toBirthday = document.getElementById('toBirthday');
toBirthday.onclick = () => { 
    bgMusic.play(); 
    showPage(pageBirthday); 
};

// Event listener for the Time for Celebration button
const celebrateBtn = document.getElementById('celebrateBtn');
celebrateBtn.onclick = () => {
    // Add your celebration logic here (e.g., navigate to a celebration page or show a message)
    alert("Let the celebration begin! 🎉");
};

// Event listener for the Time for Celebration button
const paperRings = document.getElementById("paperRings");
const birthdayMusic = document.getElementById("birthdayMusic");

const pageBirthdayCountdown = document.getElementById("pageBirthdayCountdown");
const countdownText = document.getElementById("countdownText");
const lyricsContainer = document.getElementById("lyricsContainer");
const wishMessage = document.getElementById("wishMessage");

// 🔵 Play Alone when entering site
window.addEventListener("click", () => {
    aloneMusic.play();
}, { once: true });

// 🔵 When clicking Ready -> Birthday page
toBirthday.onclick = () => { 
    showPage(pageBirthday); 
};

// 🔵 When clicking Celebrate button -> Go to countdown page
celebrateBtn.onclick = () => {
    showPage(pageBirthdayCountdown);
    startCountdown();
};

function startCountdown() {
    aloneMusic.pause(); // STOP Alone music
    aloneMusic.currentTime = 0;

    let count = 3;
    countdownText.style.display = "block";
    lyricsContainer.style.display = "none";
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

function startBirthday() {
    birthdayMusic.play();

    const lyricBox = document.getElementById("singleLyric");
    const countdownText = document.getElementById("countdownText");
    const wishMessage = document.getElementById("wishMessage");
    const flame = document.querySelector(".flame");

    countdownText.style.display = "none";

    // Clear the lyric box
    lyricBox.textContent = "";

    // Create fireworks at the start of the birthday song
    for (let i = 0; i < 10; i++) { // Adjust the number of fireworks
        createFirework();
    }

    // Layer-by-layer cake animation
    const layers = [
        { element: document.createElement("div"), delay: 0 },
        { element: document.createElement("div"), delay: 1000 }, // First layer appears after 1 second
        { element: document.createElement("div"), delay: 2000 }, // Second layer appears after 2 seconds
    ];
    
    layers[0].element.className = "cake-layer layer1"; // Add class for first layer
    layers[1].element.className = "cake-layer layer2"; // Add class for second layer
    layers[2].element.className = "cake-layer layer3"; // Add class for third layer

    document.querySelector(".birthday-cake").appendChild(layers[0].element);
    
    setTimeout(() => {
        document.querySelector(".birthday-cake").appendChild(layers[1].element);
    }, layers[1].delay);
    
    setTimeout(() => {
        document.querySelector(".birthday-cake").appendChild(layers[2].element);
    }, layers[2].delay);

    // Show the first lyric
    setTimeout(() => {
        lyricBox.textContent = "祝你生日快樂!";
    }, 0);

    // Continue with the lyrics
    setTimeout(() => {
        lyricBox.textContent = "祝你生日快樂!";
    }, 3500);

    setTimeout(() => {
        lyricBox.textContent = "祝你天天都快乐!";
    }, 7500);

    // After 12 seconds, hide the lyrics and show the wish message
    setTimeout(() => {
        lyricBox.textContent = "";
        wishMessage.style.display = "block";
        wishMessage.textContent = "Make a wish, girls!";
    }, 18000);

    // After 3 seconds, hide wishMessage and show "Wishes come true!"
    setTimeout(() => {
        wishMessage.style.display = "none";
        flame.style.display = "none"; // Hide the flame
        wishMessage.textContent = "Wishes come true!!";
        wishMessage.style.display = "block";
    }, 15000);

    // Hide "Wishes come true!!" after 3 seconds
    setTimeout(() => {
        wishMessage.style.display = "none";
    }, 18000);
}

function createFirework() {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = Math.random() * 100 + "vw"; // Random horizontal position
    firework.style.top = Math.random() * 100 + "vh"; // Random vertical position
    document.body.appendChild(firework);
    
    // Remove the firework after the animation ends
    setTimeout(() => {
        firework.remove();
    }, 1500); // Match this duration with your CSS animation duration
}

