// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to delete a cookie by name
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999; path=/";
}

let openGamesInNewTab = false;
let tabCloakGames = false;

// Function to toggle the open games in new tab setting
function ToggleOpenGamesInNewTab() {
  openGamesInNewTab = !openGamesInNewTab; // Toggle the setting
  setCookie("openGamesInNewTab", openGamesInNewTab, 30); // Save to cookie
  updateOpenGamesInNewTabToggleButton();
}
// Update button text based on setting
function updateOpenGamesInNewTabToggleButton() {
  const button = document.getElementById("openGamesInNewTabToggleButton");
  button.innerText = openGamesInNewTab
    ? "Open games & changes in new tab: Enabled"
    : "Open games & changes in new tab: Disabled";
  button.className = openGamesInNewTab
    ? "settingsButton settingsButtonEnabled"
    : "settingsButton settingsButtonDisabled";
}

function ToggleTabCloakGames() {
  tabCloakGames = !tabCloakGames; // Toggle the setting
  setCookie("tabCloakGames", tabCloakGames, 30); // Save to cookie
  updateTabCloakGamesToggleButton();
}

function updateTabCloakGamesToggleButton() {
  const button = document.getElementById("tabCloakGamesToggleButton");
  button.innerText = tabCloakGames
    ? "Tab cloak games & changes: Enabled"
    : "Tab cloak games & changes: Disabled";
  button.className = tabCloakGames
    ? "settingsButton settingsButtonEnabled"
    : "settingsButton settingsButtonDisabled";
}

// Load settings when the page is loaded
window.onload = function () {
  const savedSetting1 = getCookie("openGamesInNewTab");
  const savedSetting2 = getCookie("tabCloakGames");
  if (savedSetting1 !== null) {
    openGamesInNewTab = savedSetting1 === "true"; // Convert string to boolean
  }
  if (savedSetting2 !== null) {
    tabCloakGames = savedSetting2 === "true"; // Convert string to boolean
  }
  updateOpenGamesInNewTabToggleButton(); // Update button based on saved setting
  updateTabCloakGamesToggleButton();
};

function OpenInBlank(url) {
  // Open a new tab with about:blank
  let newTab = window.open("about:blank", "_blank");

  // Check if the tab was successfully opened
  if (newTab) {
    // Get the current URL
    let currentUrl = "";
    if (url == null) {
      currentUrl = window.location.href;
    } else {
      currentUrl = url;
    }

    // Inject an iframe into the new tab to load the real URL

    newTab.document.write(`
            <html>
            <head>
                <style>
                    /* Make body and html take full height */
                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                    }
                    /* Ensure the iframe takes full width and height */
                    iframe {
                        width: 100%;
                        height: 100%;
                        border: none; /* Remove any border */
                    }
                </style>
            </head>
            <body>
                <iframe src="${currentUrl}"></iframe>
            </body>
            </html>
            `);
  }
}

//GAME DISPLAY HANDLING
let playingGame = false;
if (playingGame) {
  document.getElementById("MenuBarContainer").style.display = "none";
  document.getElementById("regular-footer").style.display = "none";
  document.getElementById("ButtonsContainer").style.display = "none";
  document.getElementById("GamesContainer").style.display = "none";
  document.getElementById("MenuBarContainer").style.display = "none";
  //document.getElementById("Logo").style.display = 'none';
} else {
  document.getElementById("game-display-container").style.display = "none";
}

function LoadGame(url, redirect) {
  if (!redirect && !openGamesInNewTab) {
    document.getElementById("MenuBarContainer").style.display = "none";
    document.getElementById("regular-footer").style.display = "none";
    document.getElementById("ButtonsContainer").style.display = "none";
    document.getElementById("GamesContainer").style.display = "none";
    document.getElementById("MenuBarContainer").style.display = "none";
    document.getElementById("game-display-container").style.display = "flex";
    document.getElementById("game-display-iframe").src = url;
    document.getElementById("audioSource").volume = 0;
  } else if (redirect || openGamesInNewTab) {
    if (!tabCloakGames) {
      window.open(window.location.href + url, "_blank");
    } else if (tabCloakGames) {
      OpenInBlank(window.location.href + url);
    }
  }
}

//CHANGE DISPLAY HANDLING
let showingChanges = false;
if (showingChanges) {
  document.getElementById("MenuBarContainer").style.display = "none";
  document.getElementById("regular-footer").style.display = "none";
  document.getElementById("ButtonsContainer").style.display = "none";
  document.getElementById("GamesContainer").style.display = "none";
  document.getElementById("ChangesContainer").style.display = "none";
  document.getElementById("MenuBarContainer").style.display = "none";
  //document.getElementById("Logo").style.display = 'none';
} else {
  document.getElementById("change-display-container").style.display = "none";
}

function LoadChange(url) {
  if (!openGamesInNewTab) {
    document.getElementById("MenuBarContainer").style.display = "none";
    document.getElementById("regular-footer").style.display = "none";
    document.getElementById("ButtonsContainer").style.display = "none";
    document.getElementById("GamesContainer").style.display = "none";
    document.getElementById("ChangesContainer").style.display = "none";
    document.getElementById("MenuBarContainer").style.display = "none";
    document.getElementById("game-display-container").style.display = "none";
    document.getElementById("game-display-iframe").src = "";
    document.getElementById("change-display-container").style.display = "flex";
    document.getElementById("change-display-iframe").src = url;
    document.getElementById("audioSource").volume = 0;
  } else if (openGamesInNewTab) {
    if (!tabCloakGames) {
      window.open(window.location.href + url, "_blank");
    } else if (tabCloakGames) {
      OpenInBlank(window.location.href + url);
    }
  }
}

function ExitGame() {
  document.getElementById("MenuBarContainer").style.display = "flex";
  document.getElementById("regular-footer").style.display = "none";
  document.getElementById("ButtonsContainer").style.display = "none";
  document.getElementById("GamesContainer").style.display = "flex";
  document.getElementById("ChangesContainer").style.display = "none";
  document.getElementById("game-display-container").style.display = "none";
  document.getElementById("game-display-iframe").src = "";
  document.getElementById("changes-display-iframe").src = "";
  document.getElementById("audioSource").volume = 1;
}

function FullscreenGame() {
  const iframe = document.getElementById("game-display-iframe");
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.mozRequestFullScreen) {
    // Firefox
    iframe.mozRequestFullScreen();
  } else if (iframe.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    // IE/Edge
    iframe.msRequestFullscreen();
  }
  iframe;
}

function ExitChange() {
  document.getElementById("MenuBarContainer").style.display = "flex";
  document.getElementById("regular-footer").style.display = "none";
  document.getElementById("ButtonsContainer").style.display = "none";
  document.getElementById("GamesContainer").style.display = "none";
  document.getElementById("ChangesContainer").style.display = "flex";
  document.getElementById("game-display-container").style.display = "none";
  document.getElementById("change-display-container").style.display = "none";
  document.getElementById("game-display-iframe").src = "";
  document.getElementById("changes-display-iframe").src = "";
  document.getElementById("audioSource").volume = 1;
}

function FullscreenChange() {
  const iframe = document.getElementById("change-display-iframe");
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.mozRequestFullScreen) {
    // Firefox
    iframe.mozRequestFullScreen();
  } else if (iframe.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    // IE/Edge
    iframe.msRequestFullscreen();
  }
  iframe;
}

let audioPlayed = false; // Flag to check if the audio has already played

function initiateAudioCheck() {
  const audioElement = document.getElementById("audioSource");
  const checkInterval = setInterval(function () {
    if (!audioPlayed) {
      try {
        audioElement
          .play()
          .then(() => {
            audioPlayed = true;
            clearInterval(checkInterval);
          })
          .catch(function () {
            console.log("Autoplay blocked, retrying...");
          });
      } catch (error) {
        console.log("Error occurred: ", error);
      }
    }
  }, 1000);
}

initiateAudioCheck(); // 10/29/24 8:59:00 AM - I just realized that the audio was not working because the function was never called lmao

function hideChangelog() {
  const popup = document.getElementById("center-container");
  if (popup) {
    popup.style.display = "none"; // Hide the popup
  }
}

document.getElementById("GamesContainer").style.display = "none";
document.getElementById("ChangesContainer").style.display = "none";
document.getElementById("MenuBarContainer").style.display = "none";
document.getElementById("SettingsContainer").style.display = "none";
let showGames = false;
function ToggleGames() {
  showGames = !showGames;
  if (showGames) {
    //show games
    document.getElementById("MenuBarContainer").style.display = "flex";
    document.getElementById("regular-footer").style.display = "none";
    document.getElementById("ButtonsContainer").style.display = "none";
    document.getElementById("GamesContainer").style.display = "flex";
    document.getElementById("ChangesContainer").style.display = "none";
    document.getElementById("searchInput").onkeyup = searchGames;
    document.getElementById("menu-bar-changes-button-a").onclick =
      ToggleChanges;
    document.getElementById("menu-bar-changes-button-text").innerHTML =
      "Changes";
    showChanges = false;
    showSettings = false;
    document.title = "Games | Obsidians Unblocked";
  }

  if (!showGames) {
    //dont show games
    document.getElementById("MenuBarContainer").style.display = "none";
    document.getElementById("Logo").style.display = "flex";
    document.getElementById("regular-footer").style.display = "block";
    document.getElementById("ButtonsContainer").style.display = "flex";
    document.getElementById("GamesContainer").style.display = "none";
  }
}

let showChanges = false;
function ToggleChanges() {
  showChanges = !showChanges;
  if (showChanges) {
    //show changes
    document.getElementById("MenuBarContainer").style.display = "flex";
    document.getElementById("regular-footer").style.display = "none";
    document.getElementById("ButtonsContainer").style.display = "none";
    document.getElementById("GamesContainer").style.display = "none";
    document.getElementById("ChangesContainer").style.display = "flex";
    document.getElementById("searchInput").onkeyup = searchChanges;
    document.getElementById("menu-bar-changes-button-a").onclick = ToggleGames;
    document.getElementById("menu-bar-changes-button-text").innerHTML = "Games";
    showGames = false;
    showSettings = false;
    document.title = "Changes | Obsidians Unblocked";
  }

  if (!showChanges) {
    //dont show changes
    document.getElementById("MenuBarContainer").style.display = "none";
    document.getElementById("Logo").style.display = "flex";
    document.getElementById("regular-footer").style.display = "block";
    document.getElementById("ButtonsContainer").style.display = "flex";
    document.getElementById("GamesContainer").style.display = "none";
    document.getElementById("ChangesContainer").style.display = "none";
  }
}

function GoHome() {
  document.getElementById("MenuBarContainer").style.display = "none";
  document.getElementById("regular-footer").style.display = "flex";
  document.getElementById("ButtonsContainer").style.display = "flex";
  document.getElementById("GamesContainer").style.display = "none";
  document.getElementById("ChangesContainer").style.display = "none";
  document.title = "Home | Obsidians Unblocked";
  showGames = false;
  showChanges = false;
  showSettings = false;
}

let showSettings = false;
function ToggleSettings() {
  if (!showSettings) {
    document.getElementById("MenuBarContainer").style.display = "none";
    document.getElementById("Logo").style.display = "flex";
    document.getElementById("regular-footer").style.display = "none";
    document.getElementById("ButtonsContainer").style.display = "none";
    document.getElementById("GamesContainer").style.display = "none";
    document.getElementById("ChangesContainer").style.display = "none";
    document.getElementById("SettingsContainer").style.display = "flex";
    showSettings = true;
    document.title = "Settings | Obsidians Unblocked";
  } else if (showSettings) {
    if (showGames) {
      document.getElementById("MenuBarContainer").style.display = "flex";
      document.getElementById("regular-footer").style.display = "none";
      document.getElementById("ButtonsContainer").style.display = "none";
      document.getElementById("GamesContainer").style.display = "flex";
      document.getElementById("ChangesContainer").style.display = "none";
      document.getElementById("SettingsContainer").style.display = "none";
      document.title = "Games | Obsidians Unblocked";
    } else if (!showGames && !showChanges) {
      document.getElementById("MenuBarContainer").style.display = "none";
      document.getElementById("Logo").style.display = "flex";
      document.getElementById("regular-footer").style.display = "block";
      document.getElementById("ButtonsContainer").style.display = "flex";
      document.getElementById("GamesContainer").style.display = "none";
      document.getElementById("ChangesContainer").style.display = "none";
      document.getElementById("SettingsContainer").style.display = "none";
      document.title = "Home | Obsidians Unblocked";
    } else if (!showGames && showChanges) {
      document.getElementById("MenuBarContainer").style.display = "flex";
      document.getElementById("Logo").style.display = "flex";
      document.getElementById("regular-footer").style.display = "none";
      document.getElementById("ButtonsContainer").style.display = "none";
      document.getElementById("GamesContainer").style.display = "none";
      document.getElementById("ChangesContainer").style.display = "flex";
      document.getElementById("SettingsContainer").style.display = "none";
      document.title = "Changes | Obsidians Unblocked";
    }
    showSettings = false;
  }
}

const gamesData = [
  {
    name: "Super Mario 64",
    img: "assets/sm64.webp",
    url: "games/sm64/index.html",
    redirect: false,
  },
  {
    name: "Super Mario 64 DS",
    img: "assets/supermariods.webp",
    url: "games/sm64ds/emulator-sm64ds.html",
    redirect: false,
  },
  {
    name: "Slope",
    img: "assets/slope.png",
    url: "games/slope/index.html",
    redirect: false,
  },
  {
    name: "1v1.lol",
    img: "assets/1v1lol.avif",
    url: "games/1v1lol/1v1lol/index.html",
    redirect: false,
  },
  {
    name: "Bitlife",
    img: "assets/bitlife.jpg",
    url: "games/bitlife/bitlife.html",
    redirect: false,
  },
  {
    name: "Alien Hominid",
    img: "assets/alienhominid.jfif",
    url: "games/alienhominid/alienhominid.html",
    redirect: false,
  },
  {
    name: "Eaglercraft 1.5.2",
    img: "assets/eaglercraftold.jpg",
    url: "games/eaglercraft/eaglercraft.1.5.2.html",
    redirect: true,
  },
  {
    name: "Eaglercraft 1.8.8",
    img: "assets/eaglercraft.jpg",
    url: "games/eaglercraftmulti/eaglercraft.1.8.8.html",
    redirect: true,
  },
  {
    name: "Cookie Clicker",
    img: "assets/cookieclicker.jpg",
    url: "games/cookieclicker/index.html",
    redirect: false,
  },
  {
    name: "Bloxorz",
    img: "assets/bloxorz.jfif",
    url: "games/bloxorz/bloxorz.html",
    redirect: false,
  },
  {
    name: "RetroArch",
    img: "assets/retroarch.png",
    url: "games/webretro-v6.5/index.html",
    redirect: false,
  },
  {
    name: "Emulator JS",
    img: "assets/emulatorjs.jpeg",
    url: "../../EmulatorJS-main/index.html",
    redirect: false,
  },
  {
    name: "Diggy",
    img: "assets/diggy.avif",
    url: "games/diggy/diggy.html",
    redirect: false,
  },
  {
    name: "Doom",
    img: "assets/doom.jpg",
    url: "games/doom/emulator-doom.html",
    redirect: false,
  },
  {
    name: "Doom64",
    img: "assets/doom64.jpg",
    url: "games/doom64/emulator-doom64.html",
    redirect: false,
  },
  {
    name: "Doodlejump",
    img: "assets/doodlejump.jpg",
    url: "games/doodlejump/index.html",
    redirect: false,
  },
  {
    name: "Friday Night Funkin'",
    img: "assets/fnf.png",
    url: "games/fnf/index.html",
    redirect: false,
  },
  {
    name: "Pico's School",
    img: "assets/picosschool.png",
    url: "games/picosschool/picosschool.html",
    redirect: false,
  },
  {
    name: "Ducklife",
    img: "assets/ducklife.webp",
    url: "games/ducklife/ducklife.html",
    redirect: false,
  },
  {
    name: "Ducklife 2",
    img: "assets/ducklife2.jfif",
    url: "games/ducklife2/ducklife2.html",
    redirect: false,
  },
  {
    name: "Ducklife 3 Evolution",
    img: "assets/ducklife3.png",
    url: "games/ducklife3/ducklife3.html",
    redirect: false,
  },
  {
    name: "Ducklife 4",
    img: "assets/ducklife4.png",
    url: "games/ducklife4/ducklife4.html",
    redirect: false,
  },
  {
    name: "Ducklife 5",
    img: "assets/ducklife5.png",
    url: "games/ducklife5/index.html",
    redirect: false,
  },
  {
    name: "Ducklife 6",
    img: "assets/ducklife6.png",
    url: "games/ducklife6/index.html",
    redirect: false,
  },
  {
    name: "Riddle School",
    img: "assets/riddleschool.webp",
    url: "games/riddleschool/riddleschool.html",
    redirect: false,
  },
  {
    name: "Riddle School 2",
    img: "assets/riddleschool2.webp",
    url: "games/riddleschool2/riddleschool2.html",
    redirect: false,
  },
  {
    name: "Riddle School 3",
    img: "assets/riddleschool3.webp",
    url: "games/riddleschool3/riddleschool3.html",
    redirect: false,
  },
  {
    name: "Riddle School 4",
    img: "assets/riddleschool4.webp",
    url: "games/riddleschool4/riddleschool4.html",
    redirect: false,
  },
  {
    name: "Riddle School 5",
    img: "assets/riddleschool5.webp",
    url: "games/riddleschool5/riddleschool5.html",
    redirect: false,
  },
  {
    name: "Riddle School Transfer",
    img: "assets/riddletransfer.webp",
    url: "games/riddleschooltransfer/riddleschooltransfer.html",
    redirect: false,
  },
  {
    name: "Riddle School Transfer 2",
    img: "assets/riddletransfer2.webp",
    url: "games/riddleschooltransfer2/riddleschooltransfer2.html",
    redirect: false,
  },
  {
    name: "Retro Bowl",
    img: "assets/retrobowl.jpg",
    url: "games/retrobowl/retrobowl/index.html",
    redirect: false,
  },
  {
    name: "Ultra-Violet Proxy",
    img: "assets/ultraviolet.png",
    url: "UV-Static-main/static/index.html",
    redirect: false,
  },
  {
    name: "Raft Wars",
    img: "assets/raftwars.jpg",
    url: "games/raftwars/raftwars.html",
    redirect: false,
  },
  {
    name: "Raft Wars 2",
    img: "assets/raftwars2.webp",
    url: "games/raftwars2/raftwars2.html",
    redirect: false,
  },
  {
    name: "Tetris",
    img: "assets/tetris.webp",
    url: "games/tetris/index.html",
    redirect: false,
  },
  {
    name: "Tony Hawk's Pro Skater 2",
    img: "assets/tonyhawkproskater2.jpg",
    url: "games/tonysproskater2/emulator-tonysproskater2.html",
    redirect: false,
  },
  {
    name: "The Impossible Quiz",
    img: "assets/theimpossiblequiz.jfif",
    url: "games/theimpossiblequiz/theimpossiblequiz.html",
    redirect: false,
  },
  {
    name: "The Impossible Quiz 2",
    img: "assets/theimpossiblequiz2.png",
    url: "games/theimpossiblequiz2/theimpossiblequiz2.html",
    redirect: false,
  },
  {
    name: "Super Smash Flash",
    img: "assets/supersmashflash.png",
    url: "games/supersmashflash/supersmashflash.html",
    redirect: false,
  },
  {
    name: "Run",
    img: "assets/run.jpg",
    url: "games/run/index.html",
    redirect: false,
  },
  {
    name: "Run 2",
    img: "assets/run2.jpg",
    url: "games/run2/index.html",
    redirect: false,
  },
  {
    name: "Run 3",
    img: "assets/run3.jpg",
    url: "games/run3/index.html",
    redirect: false,
  },
  {
    name: "Run 3 Plus",
    img: "assets/run3.jpg",
    url: "games/run3plus/index.html",
    redirect: false,
  },
  {
    name: "Portal Flash",
    img: "assets/portalflash.png",
    url: "games/portalflash/portalflash.html",
    redirect: false,
  },
  {
    name: "Pokemon Red",
    img: "assets/pokemonred.jfif",
    url: "games/pokemonred/emulator-pokemonred.html",
    redirect: false,
  },
  {
    name: "Pokemon Blue",
    img: "assets/pokemonblue.jpg",
    url: "games/pokemonblue/emulator-pokemonblue.html",
    redirect: false,
  },
  {
    name: "Pokemon Ruby",
    img: "assets/pokemonruby.jfif",
    url: "games/pokemonruby/emulator-pokemonruby.html",
    redirect: false,
  },
  {
    name: "Pokemon Emerald",
    img: "assets/pokemonemerald.jfif",
    url: "games/pokemonemerald/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Fire Red",
    img: "assets/pokemonfirered.jfif",
    url: "games/pokemonfirered/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Leaf Green",
    img: "assets/pokemonleafgreen.jpg",
    url: "games/pokemonleafgreen/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Sapphire",
    img: "assets/pokemonsapphire.jpg",
    url: "games/pokemonsapphire/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Diamond",
    img: "assets/pokemondiamond.jfif",
    url: "games/pokemondiamond/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Platinum",
    img: "assets/pokemonplatinum.png",
    url: "games/pokemonplatinum/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Soul Silver",
    img: "assets/pokemonsoulsilver.jpg",
    url: "games/pokemonsoulsilver/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Unbound",
    img: "assets/pokemonunbound.png",
    url: "games/pokemonunbound/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Stadium",
    img: "assets/pokemonstadium.webp",
    url: "games/pokemonstadium/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Snap",
    img: "assets/pokemonsnap.webp",
    url: "games/pokemonsnap/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Yellow",
    img: "assets/pokemonyellow.png",
    url: "games/pokemonyellow/index.html",
    redirect: false,
  },
  {
    name: "Lego Star Wars",
    img: "assets/legostarwarsgba.jpg",
    url: "games/legostarwars/emulator-legostarwars.html",
    redirect: false,
  },
  {
    name: "Learn To Fly",
    img: "assets/learntofly.avif",
    url: "games/learntofly/learntofly.html",
    redirect: false,
  },
  {
    name: "Learn To Fly 2",
    img: "assets/learntofly2.jpg",
    url: "games/learntofly2/learntofly2.html",
    redirect: false,
  },
  {
    name: "Learn To Fly 3",
    img: "assets/learntofly3.jpg",
    url: "games/learntofly3/learntofly3.html",
    redirect: false,
  },
  {
    name: "Bloons TD",
    img: "assets/bloonstowerdefense.jpg",
    url: "games/bloonstd/bloonstd.html",
    redirect: false,
  },
  {
    name: "Bloons TD 2",
    img: "assets/btd2.webp",
    url: "games/btd2/index.html",
    redirect: false,
  },
  {
    name: "Bloons TD 3",
    img: "assets/btd3.jfif",
    url: "games/btd3/index.html",
    redirect: false,
  },
  {
    name: "Bloons TD 4",
    img: "assets/btd4.webp",
    url: "games/btd4/index.html",
    redirect: false,
  },
  {
    name: "Getaway Shootout",
    img: "assets/getawayshootout.webp",
    url: "games/getawayshootout/GetawayShootout-master/index.html",
    redirect: false,
  },
  {
    name: "Rooftop Snipers",
    img: "assets/rooftopsnipers.avif",
    url: "games/rooftopsnipers/rooftopsnipers-master/index.html",
    redirect: false,
  },
  {
    name: "Wolfenstein 3D",
    img: "assets/wolfenstein3d.jpg",
    url: "games/wolfenstein3d/wolfenstein3d/index.html",
    redirect: false,
  },
  {
    name: "Gun Mayhem",
    img: "assets/gunmayhem.avif",
    url: "games/gunmayhem/gunmayhem.html",
    redirect: false,
  },
  {
    name: "Gun Mayhem 2",
    img: "assets/gunmayhem2.png",
    url: "games/gunmayhem2/gunmayhem2.html",
    redirect: false,
  },
  {
    name: "Gun Mayhem Redux",
    img: "assets/gunmayhemredux.webp",
    url: "games/gunmayhemredux/gunmayhemredux.html",
    redirect: false,
  },
  {
    name: "Minesweeper",
    img: "assets/minesweeper.jfif",
    url: "games/minesweeper/minesweeper-master/index.html",
    redirect: false,
  },
  {
    name: "Moto X3M",
    img: "assets/motox3m.png",
    url: "games/motox3m/motox3m.html",
    redirect: false,
  },
  {
    name: "Moto X3M 2",
    img: "assets/motox3m2.jpg",
    url: "games/motox3m2/motox3m2.html",
    redirect: false,
  },
  {
    name: "Super Smash Bros",
    img: "assets/supersmashbros.jpg",
    url: "games/supersmashbros/index.html",
    redirect: false,
  },
  {
    name: "Subway Surfers",
    img: "assets/subwaysurfers.webp",
    url: "games/subwaysurfers/index.html",
    redirect: false,
  },
  {
    name: "Crossy Road",
    img: "assets/crossyroad.avif",
    url: "games/crossyroad/index.html",
    redirect: false,
  },
  {
    name: "Jetpack Joyride",
    img: "assets/jetpackjoyride.webp",
    url: "games/jetpackjoyride/index.html",
    redirect: false,
  },
  {
    name: "Chrome Dino Game",
    img: "assets/chromedinogame.avif",
    url: "games/chromedinogame/index.html",
    redirect: false,
  },
  {
    name: "Papa's Pizzaria",
    img: "assets/papaspizzaria.png",
    url: "games/papaspizzaria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Burgeria",
    img: "assets/papasburgeria.jfif",
    url: "games/papasburgeria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Hotdoggeria",
    img: "assets/papashotdoggeria.jfif",
    url: "games/papashotdoggeria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Pancakeria",
    img: "assets/papaspancakeria.webp",
    url: "games/papaspancakeria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Freezeria",
    img: "assets/papasfreezeria.webp",
    url: "games/papasfreezeria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Scooperia",
    img: "assets/papasscooperia.jpg",
    url: "games/papasscooperia/index.html",
    redirect: false,
  },
  {
    name: "Papa's Sushiria",
    img: "assets/papassushiria.jfif",
    url: "games/papassushiria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Wingeria",
    img: "assets/papaswingeria.jfif",
    url: "games/papaswingeria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Donuteria",
    img: "assets/papasdonuteria.jfif",
    url: "games/papasdonuteria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Cheeseria",
    img: "assets/papascheeseria.jfif",
    url: "games/papascheeseria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Cupcakeria",
    img: "assets/papascupcakeria.jpg",
    url: "games/papascupcakeria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Bakeria",
    img: "assets/papasbakeria.jpg",
    url: "games/papasbakeria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Pastaria",
    img: "assets/papaspastaria.jfif",
    url: "games/papaspastaria/index.html",
    redirect: false,
  },
  {
    name: "Papa's Tacomia",
    img: "assets/papastacomia.png",
    url: "games/papastacomia/index.html",
    redirect: false,
  },
  {
    name: "Fruit Ninja",
    img: "assets/fruitninja.avif",
    url: "games/fruitninja/index.html",
    redirect: false,
  },
  {
    name: "2048",
    img: "assets/2048.png",
    url: "games/2048/index.html",
    redirect: false,
  },
  {
    name: "Fancy Pants Adventure",
    img: "assets/fancypantsadventure.png",
    url: "games/fancypantsadventure/index.html",
    redirect: false,
  },
  {
    name: "Fancy Pants Adventure 2",
    img: "assets/fancypantsadventure2.avif",
    url: "games/fancypantsadventure2/index.html",
    redirect: false,
  },
  {
    name: "Fancy Pants Adventure 3",
    img: "assets/fancypantsadventure3.avif",
    url: "games/fancypantsadventure3/index.html",
    redirect: false,
  },
  {
    name: "Happy Wheels",
    img: "assets/happywheels.png",
    url: "games/happywheels/index.html",
    redirect: false,
  },
  {
    name: "Paper.io 2",
    img: "assets/paperio2.jfif",
    url: "games/paperio2/index.html",
    redirect: false,
  },
  {
    name: "Superhot",
    img: "assets/superhot.png",
    url: "games/superhot/index.html",
    redirect: false,
  },
  {
    name: "The Binding of Isaac",
    img: "assets/thebindingofisaac.jpg",
    url: "games/thebindingofisaac/index.html",
    redirect: false,
  },
  {
    name: "Townscaper",
    img: "assets/townscaper.avif",
    url: "games/townscaper/index.html",
    redirect: false,
  },
  {
    name: "Tunnel Rush",
    img: "assets/tunnelrush.webp",
    url: "games/tunnelrush/index.html",
    redirect: false,
  },
  {
    name: "Theme Hotel",
    img: "assets/themehotel.png",
    url: "games/themehotel/index.html",
    redirect: false,
  },
  {
    name: "Breaking The Bank",
    img: "assets/breakingthebank.png",
    url: "games/breakingthebank/index.html",
    redirect: false,
  },
  {
    name: "Escaping The Prison",
    img: "assets/escapingtheprison.jfif",
    url: "games/escapingtheprison/index.html",
    redirect: false,
  },
  {
    name: "Stealing The Diamond",
    img: "assets/stealingthediamond.jpg",
    url: "games/stealingthediamond/index.html",
    redirect: false,
  },
  {
    name: "Infiltrating The Airship",
    img: "assets/infiltratingtheairship.png",
    url: "games/infiltratingtheairship/index.html",
    redirect: false,
  },
  {
    name: "Fleeing The Complex",
    img: "assets/fleeingthecomplex.jpg",
    url: "games/fleeingthecomplex/index.html",
    redirect: false,
  },
  {
    name: "Solitaire",
    img: "assets/solitaire.jfif",
    url: "games/solitaire/index.html",
    redirect: false,
  },
  {
    name: "Drift Hunters",
    img: "assets/drifthunters.png",
    url: "games/drifthunters/index.html",
    redirect: false,
  },
  {
    name: "Vex",
    img: "assets/vex.png",
    url: "games/vex/index.html",
    redirect: false,
  },
  {
    name: "Vex 2",
    img: "assets/vex2.webp",
    url: "games/vex2/index.html",
    redirect: false,
  },
  {
    name: "Vex 3",
    img: "assets/vex3.png",
    url: "games/vex3/index.html",
    redirect: false,
  },
  {
    name: "Vex 4",
    img: "assets/vex4.png",
    url: "games/vex4/index.html",
    redirect: false,
  },
  {
    name: "Vex 5",
    img: "assets/vex5.webp",
    url: "games/vex5/index.html",
    redirect: false,
  },
  {
    name: "Vex 6",
    img: "assets/vex6.jpg",
    url: "games/vex6/index.html",
    redirect: false,
  },
  {
    name: "Vex 7",
    img: "assets/vex7.jpg",
    url: "games/vex7/index.html",
    redirect: false,
  },
  {
    name: "Among Us",
    img: "assets/amongus.webp",
    url: "games/amongus/index.html",
    redirect: false,
  },
  {
    name: "Edge Surf",
    img: "assets/edgesurf.jpg",
    url: "games/edgesurf/index.html",
    redirect: false,
  },
  {
    name: "Five Nights At Freddy's",
    img: "assets/fnaf.webp",
    url: "games/fnaf/fnaf.html",
    redirect: false,
  },
  {
    name: "Five Nights At Freddy's 2",
    img: "assets/fnaf2.webp",
    url: "games/fnaf2/fnaf2.html",
    redirect: false,
  },
  {
    name: "Five Nights At Freddy's 3",
    img: "assets/fnaf3.jpg",
    url: "games/fnaf3/fnaf3.html",
    redirect: false,
  },
  {
    name: "Five Nights At Freddy's 4",
    img: "assets/fnaf4.webp",
    url: "games/fnaf4/fnaf4.html",
    redirect: false,
  },
  {
    name: "Drift Boss",
    img: "assets/driftboss.jfif",
    url: "games/driftboss/index.html",
    redirect: false,
  },
  {
    name: "Pacman",
    img: "assets/pacman.jfif",
    url: "games/pacman/index.html",
    redirect: false,
  },
  {
    name: "Baldi's Basics",
    img: "assets/baldisbasics.webp",
    url: "games/baldisbasics/index.html",
    redirect: false,
  },
  {
    name: "Bob The Robber 2",
    img: "assets/bobtherobber2.webp",
    url: "games/bobtherobber2/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Bros",
    img: "assets/supermariobros.webp",
    url: "games/supermariobros/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Bros 2",
    img: "assets/supermariobros2.webp",
    url: "games/supermariobros2/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Bros 3",
    img: "assets/supermariobros3.jfif",
    url: "games/supermariobros3/index.html",
    redirect: false,
  },
  {
    name: "New Super Mario Bros",
    img: "assets/newsupermariobros.webp",
    url: "games/newsupermariobros/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Kart",
    img: "assets/supermariokart.jpg",
    url: "games/supermariokart/index.html",
    redirect: false,
  },
  {
    name: "Super Mario World",
    img: "assets/supermarioworld.webp",
    url: "games/supermarioworld/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Land",
    img: "assets/supermarioland.png",
    url: "games/supermarioland/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Land 2",
    img: "assets/supermarioland2.jpg",
    url: "games/supermarioland2/index.html",
    redirect: false,
  },
  {
    name: "There Is No Game",
    img: "assets/thereisnogame.jpg",
    url: "games/thereisnogame/index.html",
    redirect: false,
  },
  {
    name: "Worlds Hardest Game",
    img: "assets/theworldshardestgame.png",
    url: "games/worldshardestgame/index.html",
    redirect: false,
  },
  {
    name: "Worlds Hardest Game 2",
    img: "assets/theworldshardestgame2.jpg",
    url: "games/worldshardestgame2/index.html",
    redirect: false,
  },
  {
    name: "Worlds Hardest Game 3",
    img: "assets/theworldshardestgame3.png",
    url: "games/worldshardestgame3/index.html",
    redirect: false,
  },
  {
    name: "Castlevania",
    img: "assets/castlevania.jpg",
    url: "games/castlevania/index.html",
    redirect: false,
  },
  {
    name: "Castlevania III Dracula's Curse",
    img: "assets/castlevania3.png",
    url: "games/castlevaniaiii/index.html",
    redirect: false,
  },
  {
    name: "Castlevania Aria Of Sorrow",
    img: "assets/castlevaniaariaofsorrow.jfif",
    url: "games/castlevaniaariaofsorrow/index.html",
    redirect: false,
  },
  {
    name: "Castlevania Dawn Of Sorrow",
    img: "assets/castlevaniadawnofsorrow.jpg",
    url: "games/castlevaniadawnofsorrow/index.html",
    redirect: false,
  },
  {
    name: "Castlevania Order Of Ecclesia",
    img: "assets/castlevaniaorderofecclesia.jpg",
    url: "games/castlevaniaorderofecclesia/index.html",
    redirect: false,
  },
  {
    name: "Donkey Kong",
    img: "assets/donkeykong.webp",
    url: "games/donkeykong/index.html",
    redirect: false,
  },
  {
    name: "Dr. Mario",
    img: "assets/drmario.jpg",
    url: "games/drmario/index.html",
    redirect: false,
  },
  {
    name: "Metroid",
    img: "assets/metroid.webp",
    url: "games/metroid/index.html",
    redirect: false,
  },
  {
    name: "The Legend Of Zelda",
    img: "assets/thelegendofzelda.webp",
    url: "games/thelegendofzelda/index.html",
    redirect: false,
  },
  {
    name: "WarioWare",
    img: "assets/warioware.jpg",
    url: "games/warioware/index.html",
  },
  {
    name: "Yoshi's Island",
    img: "assets/yoshisisland.webp",
    url: "games/yoshisisland/index.html",
    redirect: false,
  },
  {
    name: "Donkey Kong Land",
    img: "assets/donkeykongland.png",
    url: "games/donkeykongland/index.html",
    redirect: false,
  },
  {
    name: "Kirby's Dream Land",
    img: "assets/kirbysdreamland.png",
    url: "games/kirbysdreamland/index.html",
    redirect: false,
  },
  {
    name: "Kirby's Dream Land 2",
    img: "assets/kirbysdreamland2.png",
    url: "games/kirbysdreamland2/index.html",
    redirect: false,
  },
  {
    name: "Doge Miner",
    img: "assets/dogeminer.avif",
    url: "games/dogeminer/index.html",
    redirect: false,
  },
  {
    name: "Tanuki Sunset",
    img: "assets/tanukisunset.jfif",
    url: "games/tanukisunset/index.html",
    redirect: false,
  },
  {
    name: "Aqua Slides",
    img: "assets/aquaslides.png",
    url: "games/aquaparkslides/index.html",
    redirect: false,
  },
  {
    name: "Color Switch",
    img: "assets/colorswitch.webp",
    url: "games/colorswitch/index.html",
    redirect: false,
  },
  {
    name: "Bomberman",
    img: "assets/bomberman.jpg",
    url: "games/bomberman/index.html",
    redirect: false,
  },
  {
    name: "Fire Emblem",
    img: "assets/fireemblem.jpg",
    url: "games/fireemblem/index.html",
    redirect: false,
  },
  {
    name: "Ice Climber",
    img: "assets/iceclimber.webp",
    url: "games/iceclimber/index.html",
    redirect: false,
  },
  {
    name: "Mario Kart Super Circuit",
    img: "assets/mariokartsupercircuit.jpg",
    url: "games/mariokartsupercircuit/index.html",
    redirect: false,
  },
  {
    name: "Super Star Saga",
    img: "assets/superstarsaga.jpg",
    url: "games/superstarsaga/index.html",
    redirect: false,
  },
  {
    name: "A Dance of Fire and Ice",
    img: "assets/adofai.png",
    url: "games/adofai/index.html",
    redirect: false,
  },
  {
    name: "Super Meat Boy",
    img: "assets/supermeatboy.jpg",
    url: "games/supermeatboy/index.html",
    redirect: false,
  },
  {
    name: "Stickman Hook",
    img: "assets/stickmanhook.jpg",
    url: "games/stickmanhook/index.html",
    redirect: false,
  },
  {
    name: "Defend The Tank",
    img: "assets/defendthetank.jfif",
    url: "games/defendthetank/index.html",
    redirect: false,
  },
  {
    name: "Sort The Court",
    img: "assets/sortthecourt.png",
    url: "games/sortthecourt/index.html",
    redirect: false,
  },
  {
    name: "This is the Only Level",
    img: "assets/thisistheonlylevel.jpg",
    url: "games/thisistheonlylevel/index.html",
    redirect: false,
  },
  {
    name: "Battle Ships",
    img: "assets/battleships.avif",
    url: "games/battleships/index.html",
    redirect: false,
  },
  {
    name: "Line Rider",
    img: "assets/linerider.jpg",
    url: "games/linerider/index.html",
    redirect: false,
  },
  {
    name: "Mario Combat",
    img: "assets/mariocombat.jpg",
    url: "games/mariocombat/index.html",
    redirect: false,
  },
  {
    name: "Space Invaders",
    img: "assets/spaceinvaders.jpg",
    url: "games/spaceinvaders/index.html",
    redirect: false,
  },
  {
    name: "Animal Crossing Wild World",
    img: "assets/animalcrossing.png",
    url: "games/animalcrossingwildworld/index.html",
    redirect: false,
  },
  {
    name: "Mario Kart DS",
    img: "assets/mariokartds.jpg",
    url: "games/mariokartds/index.html",
    redirect: false,
  },
  {
    name: "Nintendogs",
    img: "assets/nintendogs.png",
    url: "games/nintendogs/index.html",
    redirect: false,
  },
  {
    name: "Roof Top Snipers 2",
    img: "assets/rooftopsnipers2.jpg",
    url: "games/rooftop2/index.html",
    redirect: false,
  },
  {
    name: "Fire Boy And Water Girl",
    img: "assets/fireboyandwatergirl.png",
    url: "games/fireboywatergirl/index.html",
    redirect: false,
  },
  {
    name: "Chibi Knight",
    img: "assets/chibiknight.jpg",
    url: "games/chibiknight/index.html",
    redirect: false,
  },
  {
    name: "Cluster Rush",
    img: "assets/clusterrush.png",
    url: "games/clusterrush/index.html",
    redirect: false,
  },
  {
    name: "Doodle Defender",
    img: "assets/doodledefender.png",
    url: "games/doodledefender/index.html",
    redirect: false,
  },
  {
    name: "Unfair Mario",
    img: "assets/unfairmario.jpg",
    url: "games/unfairmario/index.html",
    redirect: false,
  },
  {
    name: "Boxing Physics 2",
    img: "assets/boxingphysics2.jpg",
    url: "games/boxingphysics2/index.html",
    redirect: false,
  },
  {
    name: "Ace Attorney",
    img: "assets/aceattorney.png",
    url: "games/aceattorney/index.html",
    redirect: false,
  },
  {
    name: "Metal Gear Solid",
    img: "assets/metalgearsolid.jpg",
    url: "games/metalgearsolid/index.html",
    redirect: false,
  },
  {
    name: "Mother 3",
    img: "assets/mother3.jpg",
    url: "games/mother3/index.html",
    redirect: false,
  },
  {
    name: "Advance Wars",
    img: "assets/advancewars.jpg",
    url: "games/advancewars/index.html",
    redirect: false,
  },
  {
    name: "Advance Wars 2",
    img: "assets/advancewars2.jpg",
    url: "games/advancewars2/index.html",
    redirect: false,
  },
  {
    name: "Advance Wars Days Of Ruin",
    img: "assets/advancewarsdaysofruin.jpg",
    url: "games/advancewarsdaysofruin/index.html",
    redirect: false,
  },
  {
    name: "Banjo Pilot",
    img: "assets/banjopilot.jpg",
    url: "games/banjopilot/index.html",
    redirect: false,
  },
  {
    name: "Super Monkey Ball Jr",
    img: "assets/supermonkeyballjr.png",
    url: "games/supermonkeyballjr/index.html",
    redirect: false,
  },
  {
    name: "Tiny Fishing",
    img: "assets/tinyfishing.png",
    url: "games/tinyfishing/index.html",
    redirect: false,
  },
  {
    name: "Big Red Button",
    img: "assets/bigredbutton.jpg",
    url: "games/bigredbutton/index.html",
    redirect: false,
  },
  {
    name: "Achievement Unlocked",
    img: "assets/achievementunlocked.jpg",
    url: "games/achievementunlocked/index.html",
    redirect: false,
  },
  {
    name: "Achievement Unlocked 2",
    img: "assets/achievementunlocked2.jpg",
    url: "games/achievementunlocked2/index.html",
    redirect: false,
  },
  {
    name: "Achievement Unlocked 3",
    img: "assets/achievementunlocked3.jpg",
    url: "games/achievementunlocked3/index.html",
    redirect: false,
  },
  {
    name: "Kirby Mass Attack",
    img: "assets/kirbymassattack.jpg",
    url: "games/kirbymassattack/index.html",
    redirect: false,
  },
  {
    name: "Sonic Advance",
    img: "assets/sonicadvance.jpg",
    url: "games/sonicadvance/index.html",
    redirect: false,
  },
  {
    name: "Sonic Advance 2",
    img: "assets/sonicadvance2.png",
    url: "games/sonicadvance2/index.html",
    redirect: false,
  },
  {
    name: "Worms World Party",
    img: "assets/wormsworldparty.jpg",
    url: "games/wormsworldparty/index.html",
    redirect: false,
  },
  {
    name: "Bad Ice Cream",
    img: "assets/badicecream.jpg",
    url: "games/badicecream/index.html",
    redirect: false,
  },
  {
    name: "Bad Ice Cream 2",
    img: "assets/badicecream2.jpg",
    url: "games/badicecream2/index.html",
    redirect: false,
  },
  {
    name: "Bad Ice Cream 3",
    img: "assets/badicecream3.png",
    url: "games/badicecream3/index.html",
    redirect: false,
  },
  {
    name: "Adventure Capitalist",
    img: "assets/adventurecapitalist.jpg",
    url: "games/adventurecapitalist/index.html",
    redirect: false,
  },
  {
    name: "Monkey Mart",
    img: "assets/monkeymart.png",
    url: "games/monkeymart/index.html",
    redirect: false,
  },
  {
    name: "Banjo Kazooie",
    img: "assets/banjokazooie.jpg",
    url: "games/banjokazooie/index.html",
    redirect: false,
  },
  {
    name: "Donkey Kong 64",
    img: "assets/donkeykong64.jpg",
    url: "games/donkeykong64/index.html",
    redirect: false,
  },
  {
    name: "F-Zero",
    img: "assets/fzero.jpg",
    url: "games/fzero/index.html",
    redirect: false,
  },
  {
    name: "F-Zero X",
    img: "assets/fzerox.jpg",
    url: "games/fzerox/index.html",
    redirect: false,
  },
  {
    name: "Kirby 64",
    img: "assets/kirby64.jpg",
    url: "games/kirby64/index.html",
    redirect: false,
  },
  {
    name: "Mario Kart 64",
    img: "assets/mariokart64.jpg",
    url: "games/mariokart64/index.html",
    redirect: false,
  },
  {
    name: "Mario Party",
    img: "assets/marioparty.jpg",
    url: "games/marioparty/index.html",
    redirect: false,
  },
  {
    name: "Mario Party 2",
    img: "assets/marioparty2.jpg",
    url: "games/marioparty2/index.html",
    redirect: false,
  },
  {
    name: "Mario Party 3",
    img: "assets/marioparty3.jpg",
    url: "games/marioparty3/index.html",
    redirect: false,
  },
  {
    name: "Mario Party Advance",
    img: "assets/mariopartyadvance.jpg",
    url: "games/mariopartyadvance/index.html",
    redirect: false,
  },
  {
    name: "Mario Party DS",
    img: "assets/mariopartyds.jpg",
    url: "games/mariopartyds/index.html",
    redirect: false,
  },
  {
    name: "Ocarina Of Time",
    img: "assets/ocarinaoftime.jpg",
    url: "games/ocarinaoftime/index.html",
    redirect: false,
  },
  {
    name: "Star Fox 64",
    img: "assets/starfox64.jpg",
    url: "games/starfox64/index.html",
    redirect: false,
  },
  {
    name: "Street Fighter 2",
    img: "assets/streetfighter.jpg",
    url: "games/streetfighter2/index.html",
    redirect: false,
  },
  {
    name: "Rabbit Samurai",
    img: "assets/rabbitsamurai.jpg",
    url: "games/rabbitsamurai/index.html",
    redirect: false,
  },
  {
    name: "Professor Layton",
    img: "assets/professorlayton.jpg",
    url: "games/professorlayton/index.html",
    redirect: false,
  },
  {
    name: "Scribblenauts",
    img: "assets/scribblenauts.jpg",
    url: "games/scribblenauts/index.html",
    redirect: false,
  },
  {
    name: "Harvest Moon",
    img: "assets/harvestmoon.jpg",
    url: "games/harvestmoon/index.html",
    redirect: false,
  },
  {
    name: "Mario Tennis",
    img: "assets/mariotennis.png",
    url: "games/mariotennis/index.html",
    redirect: false,
  },
  {
    name: "Mega Man Zero",
    img: "assets/megamanzero.jpg",
    url: "games/megamanzero/index.html",
    redirect: false,
  },
  {
    name: "Pokemon Mystery Dungeon",
    img: "assets/pokemonmysterydungeon.jpg",
    url: "games/pokemonmysterydungeon/index.html",
    redirect: false,
  },
  {
    name: "Factory Balls",
    img: "assets/factoryballs.png",
    url: "games/factoryballs/index.html",
    redirect: false,
  },
  {
    name: "Sky Wire",
    img: "assets/skywire.jpg",
    url: "games/skywire/index.html",
    redirect: false,
  },
  {
    name: "Sky Wire 2",
    img: "assets/skywire2.jpg",
    url: "games/skywire2/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Flash",
    img: "assets/supermarioflash.jpg",
    url: "games/supermarioflash/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Flash 2",
    img: "assets/supermarioflash2.png",
    url: "games/supermarioflash2/index.html",
    redirect: false,
  },
  {
    name: "Golden Sun",
    img: "assets/goldensun.jpg",
    url: "games/goldensun/index.html",
    redirect: false,
  },
  {
    name: "Metroid Fusion",
    img: "assets/metroidfusion.jpg",
    url: "games/metroidfusion/index.html",
    redirect: false,
  },
  {
    name: "DBZ: Supersonic Warriors",
    img: "assets/dbzsupersonicwarriors.jpg",
    url: "games/dbzsupersonicwarriors/index.html",
    redirect: false,
  },
  {
    name: "Wario Land 4",
    img: "assets/warioland4.png",
    url: "games/warioland4/index.html",
    redirect: false,
  },
  {
    name: "Electric Man 2",
    img: "assets/electricman2.jpg",
    url: "games/electricman2/index.html",
    redirect: false,
  },
  {
    name: "Portal 2",
    img: "assets/portal2.jpg",
    url: "games/portal2/index.html",
    redirect: false,
  },
  {
    name: "Boxing Random",
    img: "assets/boxingrandom.png",
    url: "games/boxingrandom/index.html",
    redirect: false,
  },
  {
    name: "Cell Machine",
    img: "assets/cellmachine.png",
    url: "games/cellmachine/index.html",
    redirect: false,
  },
  {
    name: "Stickman Boost",
    img: "assets/stickmanboost.jpg",
    url: "games/stickmanboost/index.html",
    redirect: false,
  },
  {
    name: "Skibidi Toilet 1v100",
    img: "assets/skibidi1v100.jpg",
    url: "games/skibidi1v100/index.html",
    redirect: false,
  },
  {
    name: "Golden Eye 007",
    img: "assets/goldeneye007.jpg",
    url: "games/goldeneye007/index.html",
    redirect: false,
  },
  {
    name: "Majora's Mask",
    img: "assets/majorasmask.jpg",
    url: "games/majorasmask/index.html",
    redirect: false,
  },
  {
    name: "Paper Mario",
    img: "assets/papermario.jpg",
    url: "games/papermario/index.html",
    redirect: false,
  },
  {
    name: "Mario Golf",
    img: "assets/mariogolf.png",
    url: "games/mariogolf/index.html",
    redirect: false,
  },
  {
    name: "Excite Bike 64",
    img: "assets/excitebike64.jpg",
    url: "games/excitebike64/index.html",
    redirect: false,
  },
  {
    name: "Bowsers Inside Story",
    img: "assets/bowsersinsidestory.jpg",
    url: "games/bowsersinsidestory/index.html",
    redirect: false,
  },
  {
    name: "Spirit Tracks",
    img: "assets/spirittracks.jpg",
    url: "games/spirittracks/index.html",
    redirect: false,
  },
  {
    name: "The Sims 2",
    img: "assets/thesims2.jpg",
    url: "games/thesims2/index.html",
    redirect: false,
  },
  {
    name: "The Sims 3",
    img: "assets/thesims3.jpg",
    url: "games/thesims3/index.html",
    redirect: false,
  },
  {
    name: "Tetris DS",
    img: "assets/tetrisds.png",
    url: "games/tetrisds/index.html",
    redirect: false,
  },
  {
    name: "Sonic Rush",
    img: "assets/sonicrush.png",
    url: "games/sonicrush/index.html",
    redirect: false,
  },
  {
    name: "Super Princess Peach",
    img: "assets/superprincesspeach.jpg",
    url: "games/superprincesspeach/index.html",
    redirect: false,
  },
  {
    name: "Lego Batman",
    img: "assets/legobatman.jpg",
    url: "games/legobatman/index.html",
    redirect: false,
  },
  {
    name: "Doom 2",
    img: "assets/doom2.png",
    url: "games/doom2/index.html",
    redirect: false,
  },
  {
    name: "Duke Nukem Advance",
    img: "assets/dukenukemadvance.jpg",
    url: "games/dukenukemadvance/index.html",
    redirect: false,
  },
  {
    name: "Mario Pinball Land",
    img: "assets/mariopinballland.jpg",
    url: "games/mariopinballland/index.html",
    redirect: false,
  },
  {
    name: "Pacman World",
    img: "assets/pacmanworld.jpg",
    url: "games/pacmanworld/index.html",
    redirect: false,
  },
  {
    name: "Rayman 3",
    img: "assets/rayman3.jpg",
    url: "games/rayman3/index.html",
    redirect: false,
  },
  {
    name: "Shrek 2",
    img: "assets/shrek2.jpg",
    url: "games/shrek2/index.html",
    redirect: false,
  },
  {
    name: "Sim City 2000",
    img: "assets/simcity.jpg",
    url: "games/simcity2000/index.html",
    redirect: false,
  },
  {
    name: "Simpsons Road Rage",
    img: "assets/simpsonsroadrage.jpg",
    url: "games/simpsonsroadrage/index.html",
    redirect: false,
  },
  {
    name: "Diddy Kong Racing",
    img: "assets/diddykongracing.jpg",
    url: "games/diddykongracing/index.html",
    redirect: false,
  },
  {
    name: "Wave Race 64",
    img: "assets/waverace64.jpg",
    url: "games/waverace64/index.html",
    redirect: false,
  },
  {
    name: "Quest 64",
    img: "assets/quest64.jpg",
    url: "games/quest64/index.html",
    redirect: false,
  },
  {
    name: "Gex 64",
    img: "assets/gex64.png",
    url: "games/gex64/index.html",
    redirect: false,
  },
  {
    name: "Duke Nukem 64",
    img: "assets/dukenukem64.jpg",
    url: "games/dukenukem64/index.html",
    redirect: false,
  },
  {
    name: "Mortal Kombat 4",
    img: "assets/mortalKombat4.jpg",
    url: "games/mortalKombat4/index.html",
    redirect: false,
  },
  {
    name: "Bad Piggies",
    img: "assets/badpiggies.png",
    url: "games/badpiggies/index.html",
    redirect: false,
  },
  {
    name: "Swords And Sandals",
    img: "assets/swordsandsandals.png",
    url: "games/swordsandsandals/index.html",
    redirect: false,
  },
  {
    name: "Swords And Sandals 2",
    img: "assets/swordsandsandals2.png",
    url: "games/swordsandsandals2/index.html",
    redirect: false,
  },
  {
    name: "Wordle",
    img: "assets/wordle.png",
    url: "games/wordle/index.html",
    redirect: false,
  },
  {
    name: "Stack",
    img: "assets/stack.png",
    url: "games/stack/index.html",
    redirect: false,
  },
  {
    name: "Skibidi Toilet Attack",
    img: "assets/skibiditoiletattack.jpg",
    url: "games/skibiditoiletattack/index.html",
    redirect: false,
  },
  {
    name: "Moto X3M Pool",
    img: "assets/motox3mpool.jpg",
    url: "games/motox3mpool/index.html",
    redirect: false,
  },
  {
    name: "Offline Paradise",
    img: "assets/offlineparadise.png",
    url: "games/offlineparadise/index.html",
    redirect: false,
  },
  {
    name: "Link To The Past",
    img: "assets/linktothepast.jpg",
    url: "games/linktothepast/index.html",
    redirect: false,
  },
  {
    name: "Donkey Kong Country",
    img: "assets/donkeykongcountry.png",
    url: "games/donkeykongcountry/index.html",
    redirect: false,
  },
  {
    name: "Donkey Kong Country 2",
    img: "assets/donkeykongcountry2.jpg",
    url: "games/donkeykongcountry2/index.html",
    redirect: false,
  },
  {
    name: "Donkey Kong Country 3",
    img: "assets/donkeykongcountry3.jpg",
    url: "games/donkeykongcountry3/index.html",
    redirect: false,
  },
  {
    name: "Super Bomberman",
    img: "assets/superbomberman.png",
    url: "games/superbomberman/index.html",
    redirect: false,
  },
  {
    name: "Mario Paint",
    img: "assets/mariopaint.jpg",
    url: "games/mariopaint/index.html",
    redirect: false,
  },
  {
    name: "Mega Man X",
    img: "assets/megamanx.png",
    url: "games/megamanx/index.html",
    redirect: false,
  },
  {
    name: "Super Mario Rpg",
    img: "assets/supermariorpg.jpg",
    url: "games/supermariorpg/index.html",
    redirect: false,
  },
  {
    name: "Super Tennis",
    img: "assets/supertennis.jpg",
    url: "games/supertennis/index.html",
    redirect: false,
  },
  {
    name: "Wario's Woods",
    img: "assets/warioswoods.jpg",
    url: "games/warioswoods/index.html",
    redirect: false,
  },
  {
    name: "Bubble Tanks 2",
    img: "assets/bubbletanks2.png",
    url: "games/bubbletanks2/index.html",
    redirect: false,
  },
  {
    name: "Choose Your Weapon",
    img: "assets/chooseyourweapon.png",
    url: "games/chooseyourweapon/index.html",
    redirect: false,
  },
  {
    name: "Choose Your Weapon 2",
    img: "assets/chooseyourweapon.png",
    url: "games/chooseyourweapon2/index.html",
    redirect: false,
  },
  {
    name: "Choose Your Weapon 3",
    img: "assets/chooseyourweapon.png",
    url: "games/chooseyourweapon3/index.html",
    redirect: false,
  },
  {
    name: "Connect 4",
    img: "assets/connect4.png",
    url: "games/connect4/index.html",
    redirect: false,
  },
  {
    name: "Electric Box",
    img: "assets/electricbox.png",
    url: "games/electricbox/index.html",
    redirect: false,
  },
  {
    name: "MC Tower Defence 2",
    img: "assets/mctowerdefence.jpg",
    url: "games/mctowerdefence2/index.html",
    redirect: false,
  },
  {
    name: "Cars 2",
    img: "assets/nologo.png",
    url: "games/cars2/index.html",
    redirect: false,
  },
];
// need to fix mgs, and run games

let rows = 0;
let collumns = 0;
function renderGames(games) {
  const gamesContainer = document.getElementById("GamesContainer");
  gamesContainer.innerHTML = ""; // Clear previous content

  rows = 0; // Reset row count for every render
  collumns = 0; // Reset column count for every render

  games.forEach((game) => {
    const gameButton = document.createElement("button");
    gameButton.type = "button";
    gameButton.innerHTML = `
      <img src="${game.img}" width="200px" height="200px">
      <p><strong>${game.name}</strong></p>
    `;
    gameButton.onclick = function () {
      LoadGame(game.url, game.redirect);
    }; // Redirect to game URL

    if (collumns === 0 || collumns === 4) {
      if (collumns === 4) collumns = 0; // Reset columns after 4th item

      // Create a new row
      const gameRow = document.createElement("div");
      rows += 1;
      gameRow.className = "games-row";
      gameRow.id = "games-row" + rows;
      gamesContainer.appendChild(gameRow);
    }

    // Append the button to the last created row
    document.getElementById("games-row" + rows).appendChild(gameButton);
    collumns += 1; // Increment column count
  });
}

const changesData = [
  {
    version: "2.1.7",
    url: "changes/2.1.7.html",
  },
  {
    version: "2.1.6",
    url: "changes/2.1.6.html",
  },
  {
    version: "2.1.5",
    url: "changes/2.1.5.html",
  },
  {
    version: "2.1.0",
    url: "changes/2.1.0.html",
  },
  {
    version: "2.0.0",
    url: "changes/2.0.0.html",
  },
];

let rowsChanges = 0;
let collumnsChanges = 0;
function renderChanges(changes) {
  const changesContainer = document.getElementById("ChangesContainer");
  changesContainer.innerHTML = ""; // Clear previous content

  rowsChanges = 0; // Reset row count for every render
  collumnsChanges = 0; // Reset column count for every render

  changes.forEach((change) => {
    const changeButton = document.createElement("button");
    changeButton.type = "button";
    changeButton.style.width = "200px";
    changeButton.style.height = "200px";
    changeButton.innerHTML = `
      <h1><strong>${change.version}</strong></h1>
    `;
    changeButton.onclick = function () {
      LoadChange(change.url);
    }; // Redirect to change URL

    if (collumnsChanges === 0 || collumnsChanges === 4) {
      if (collumnsChanges === 4) collumnsChanges = 0; // Reset columns after 4th item

      // Create a new row
      const changeRow = document.createElement("div");
      rowsChanges += 1;
      changeRow.className = "changes-row";
      changeRow.id = "changes-row" + rowsChanges;
      changesContainer.appendChild(changeRow);
    }

    // Append the button to the last created row
    document
      .getElementById("changes-row" + rowsChanges)
      .appendChild(changeButton);
    collumnsChanges += 1; // Increment column count
  });
}

let alreadyFixed = false;

function searchGames() {
  if (!document.getElementById("searchInput").value.toLowerCase() == "") {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredGames = gamesData.filter((game) =>
      game.name.toLowerCase().includes(query)
    );
    renderGames(filteredGames);
    alreadyFixed = false;
  } else {
    renderGames(gamesData);
    alreadyFixed = true;
  }
}

const checkInterval = setInterval(function () {
  if (
    document.getElementById("searchInput").value.toLowerCase() == "" &&
    alreadyFixed == false
  ) {
    // Initial render of all games
    renderGames(gamesData);
    alreadyFixed = true;
  }
}, 500);

let alreadyFixedChanges = false;

function searchChanges() {
  if (!document.getElementById("searchInput").value.toLowerCase() == "") {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredChanges = changesData.filter((change) =>
      change.version.toLowerCase().includes(query)
    );
    renderChanges(filteredChanges);
    alreadyFixedChanges = false;
  } else {
    renderChanges(changesData);
    alreadyFixedChanges = true;
  }
}

const checkIntervalChanges = setInterval(function () {
  if (
    document.getElementById("searchInput").value.toLowerCase() == "" &&
    alreadyFixedChanges == false
  ) {
    // Initial render of all games
    renderChanges(changesData);
    alreadyFixedChanges = true;
  }
}, 500);

// Particle system and other logic
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const particles = new THREE.BufferGeometry();
const particleCount = 10000;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

let particleColors = [
  0xff00ff, 0xffffff, 0x40c44c, 0x68e9e5, 0x695dcf, 0xbba803, 0xf6b3bf,
];

function hexToRGB(hex) {
  return {
    r: ((hex >> 16) & 255) / 255,
    g: ((hex >> 8) & 255) / 255,
    b: (hex & 255) / 255,
  };
}

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 1000;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

  const color =
    particleColors[Math.floor(Math.random() * particleColors.length)];
  const rgb = hexToRGB(color);

  colors[i * 3] = rgb.r;
  colors[i * 3 + 1] = rgb.g;
  colors[i * 3 + 2] = rgb.b;
}

particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const coloredMaterial = new THREE.PointsMaterial({
  size: 2,
  vertexColors: true,
});

const whiteMaterial = new THREE.PointsMaterial({
  size: 2,
  color: 0xffffff,
  vertexColors: false,
});

let particleSystem = new THREE.Points(particles, whiteMaterial);
scene.add(particleSystem);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  particleSystem.rotation.x += 0.001;
  particleSystem.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

let isColored = false;
function toggleParticleColors() {
  isColored = !isColored;
  scene.remove(particleSystem);
  particleSystem = new THREE.Points(
    particles,
    isColored ? coloredMaterial : whiteMaterial
  );
  scene.add(particleSystem);
  const imageSrc = isColored
    ? "assets/particle-colored.png"
    : "assets/particle.png";
  document.getElementById("particleColorToggleButton").src = imageSrc;
  document.getElementById("particleColorToggleButton2").src = imageSrc;
}

window.addEventListener("resize", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
