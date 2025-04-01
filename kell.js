/*
Prompt-group: Starting point
    Chat-GPT-le esitatud promptid:
    "Kujunda elektroonilise kella näide, mahutades kella täisekraanile, et saaks kasutada lauakella või ekraanisäästja asemel. Selleks, et see sobiks paljudele ekraanidele, kasuta kujunduse loomisel protsendilisi väärtusi (nt width: 100%; ). Näitab kella, kuupäeva, nädalapäeva ja aastat. Autori ees- ja perenimi on lehel välja toodud (Mattias Tamm). Lehel on viide rakenduse repositooriumile (Jäta koht HTML-i faili koht kuhu saan hiljem lisada lingi)."

Prompt-group: Game selection
    ChatGPT-le esitatud promptid: 
    "Muuda rakendust selliselt, et lehe laadimisel pakutakse kasutajale valik 3-st erinevast mängust näidates talle nende logosid, millel klõpsates, laetakse selle mängu teemaline kella rakendus. Kella vaates peaks olema ülal vasakul näha kõikide muude mängude logod, mis algul kasutajale näidati ning nendele vajutamine peaks teostama ümberlülituse vastava mängu teemasse. Teemaga peaks muutuma font, tekstivärv ja taustapilt."
    Lisasin järgneva, sest algse püstituse tulemusel olid mängude logod fikseeritud suurustega, mis moonutas pilte liialt palju ning ei olnud päris see, mida silmas pidasin.
    "Modify it so that there is just a single 'Game selection' button in the top left of the page which then drops a sheet onto the page with the game logos in their original ratios."

    Koodijupid, mis selle tulemusest võtsin: 
    1. games array mudel (andmed muutsin endale sobivaks);
    2. switchTheme funktsioon;
    3. loadGameSelection funktsioon;
    4. toggleGameSelection funktsioon;
    5. HTML-i ja CSS-i osad, mis on märgitud vastavalt HTML ja CSS failis kommentaaridega. (Märkisin ka siin kommentaariga eraldi veel need js osad, mis selle tulemusena võtsin.)
*/

/*
Prompt-group: Modify
    ChatGPT-le esitatud promptid:
    "Below the game selection button add a 'modify' button which presents the user with options for changing the font size, adjusting the clock position, the clock language and timezone."
    "The font size selection is good. Let's remove the clock position selection and instead make it so that the clock can be moved with the arrow keys. The language selection should be the deciding attribute for whether or not the clock has AM/PM in it or not."
    "The clock is shown over the modify and game selection menus because of position: absolute but that is needed for it to be moveable. Are there any workarounds for this?"
*/

//Prompt: Modify
let currentTimezone = 'Europe/Tallinn';

// Prompt: Game selection
const games = [ 
    {
        name: "Elden Ring",
        background: "https://images8.alphacoders.com/118/1186452.jpg",
        font: "Mantinia Regular",
        color: "#F9C043",
        logo: "https://www.pngmart.com/files/23/Elden-Ring-Logo-PNG-Photo.png"
    },
    {
        name: "Dark Souls",
        background: "https://wallpapercave.com/wp/wp3756449.jpg",
        font: "OptimusPrinceps",
        color: "#F4EFDE",
        logo: "https://static.wikia.nocookie.net/vsdebating/images/d/dd/Dark_Souls_Logo.png"
    },
    {
        name: "Bloodborne",
        background: "https://wallpapercave.com/wp/wp1835112.jpg",
        font: "serif",
        color: "#B0D1EA",
        logo: "https://www.pngall.com/wp-content/uploads/12/Bloodborne-Logo-PNG-File.png"
    }
];

//ChatGPT poolt loodud koodis olid HTML elementide küljes onclick ja onchange eventid. Lõpu poole, kui koodi erladi failidesse tõstsin, siis asendasin need eventListeneridega javascripti failis.
document.querySelector(".game-button").addEventListener("click", toggleGameSelection);
document.querySelector(".modify-button").addEventListener("click", toggleSettingsPanel);
document.querySelector(".close-button").addEventListener("click", toggleGameSelection);
document.querySelector(".close-settings").addEventListener("click", toggleSettingsPanel);
fontSizeSlider = document.querySelector("#font-size-slider");
fontSizeSlider.addEventListener("change", ()=>updateFontSize(fontSizeSlider.value));
languageSelector = document.querySelector("#language");
languageSelector.addEventListener("change", ()=>{
    updateLanguage(languageSelector.value)
    updateClock();
});
timezoneSelector = document.querySelector("#timezone");
timezoneSelector.addEventListener("change", ()=>{
    updateTimezone(timezoneSelector.value)
    updateClock();
});

// Prompt: Game selection
function switchTheme(game) { 
    document.body.style.backgroundImage = `url('${game.background}')`;
    document.body.style.color = game.color;
    document.body.style.fontFamily = game.font;
    toggleGameSelection();
}

// Prompt: Game selection
function loadGameSelection() { 
    const gameSelector = document.getElementById('game-selection');
    games.forEach(game => {
        const img = document.createElement('img');
        img.src = game.logo;
        img.addEventListener('click', () => switchTheme(game));
        gameSelector.appendChild(img);
    });
    switchTheme(games[1]);
}

// Prompt: Game selection
function toggleGameSelection() { 
    const selection = document.getElementById('game-selection');
    selection.style.display = selection.style.display === 'flex' ? 'none' : 'flex';
}

// Prompt: Modify
function toggleSettingsPanel() {
    const panel = document.getElementById('settings-panel');
    panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
}

// Prompt: Modify
function updateFontSize(value) {
    console.log(value);
    document.querySelector('.time').style.fontSize = value + 'vw';
    document.querySelector('.date').style.fontSize = value/4 + 'vw';
}

// Prompt: Modify
function updateLanguage(lang) {
    const now = new Date();
    document.getElementById('date').textContent = now.toLocaleDateString(lang, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// Prompt: Modify
function updateTimezone(timezone) {
    currentTimezone = timezone;
}

// Prompt: Modify
document.addEventListener('keydown', function(event) {
    const clock = document.getElementById('clock-container');
    const step = 10;
    let top = clock.offsetTop;
    let left = clock.offsetLeft;
    if (event.key === 'ArrowUp') clock.style.top = (top - step) + 'px';
    if (event.key === 'ArrowDown') clock.style.top = (top + step) + 'px';
    if (event.key === 'ArrowLeft') clock.style.left = (left - step) + 'px';
    if (event.key === 'ArrowRight') clock.style.left = (left + step) + 'px';
});

// Alguses Prompt: Starting Point, kuid teiste muudatuste käigus kuju muutus. Lõppkuju saavutati Prompt: Modify käigus.
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('time').innerHTML = `
        <span>${hours[0]}</span><span>${hours[1]}</span>:
        <span>${minutes[0]}</span><span>${minutes[1]}</span>:
        <span>${seconds[0]}</span><span>${seconds[1]}</span>
    `;
}


setInterval(updateClock, 1000);
updateClock();
updateLanguage("et-EE");
loadGameSelection();