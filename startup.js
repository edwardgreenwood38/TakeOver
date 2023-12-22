
//  initial setup 
let currentPlayer = 0;
let winner = false;
document.getElementById("turn").style.display = "none";
document.getElementById("winGame").style.display = "none";
document.getElementById("mainView").style.display = "none";
let mapTerritories = [];
let attackFrom = 0;
let attackTo = 0;


// Add a click event listener to territories
const territories = document.querySelectorAll('.territory');
territories.forEach(territory => {
    territory.addEventListener('click', function() {
        territoryAction(this.id);
    });
});

//  potential list of country names
const fantasyCountryNames = [
    "Novaris",
    "Astravia",
    "Eldorium",
    "Emberia",
    "Solsticea",
    "Arcadia",
    "Sylvanoria",
    "Crystalyn",
    "Thornwood",
    "Zephyrith",
    "Celestalis",
    "Aerilon",
    "Shadowlyn",
    "Mythralia",
    "Valerian Reach",
    "Phoenixia",
    "Drakewood",
    "Meridianos",
    "Seraphine Dominion",
    "Frostspire",
    "Azurea",
    "Midgardia",
    "Verdanthia",
    "Starhaven",
    "Emberfall",
    "Luminae",
    "Galea",
    "Havencrest",
    "Obsidian Reach",
    "Wyvernstead",
    "Ardentia",
    "Moonshroud",
    "Mythrendor",
    "Titan's Hold",
    "Glimmerfall",
    "Edenwood",
    "Eclipsia",
    "Sablestone",
    "Astralyn",
    "Wildermark",
    "Stormwatch",
    "Ironreach",
    "Aurora Vale",
    "Silverglade",
    "Eternalis",
    "Thundoria",
    "Riftwood",
    "Zenithia",
    "Driftwood Isles",
    "Radiantia"
  ];


// random placement of start point
function startGame() {
    document.getElementById("turnResults").textContent = "";
    document.getElementById("start").style.display = "none";
    document.getElementById("gameInfo").style.display = "none";
    document.getElementById("winGame").style.display = "none";
    document.getElementById("mainView").style.display = "flex";
    document.getElementById("turn").style.display = "block";


    territories.forEach(t => {
        t.style.backgroundColor = "";
    })

    for (let i = 1; i <= 25; i++) {
        let s = "troop" + i;
        let sp = document.getElementById(s)
        sp.style.border = "";
        sp.style.fontWeight = "";
        sp.style.fontSize = ".9em";
    }

    mapTerritories = [];

    // map setup
    for (let i = 1; i <= 25; i++) {
        let num = Math.floor(Math.random() * 50);
        let cn = fantasyCountryNames[num];

        let mt = {
            name: cn,
            owner: "Barbarian",
            troops: 1,
            homeBase: 0
        }

        //console.log(mt);
        mapTerritories.push(mt);
    }
    currentPlayer = 1;

    // player one
    let id = Math.floor(Math.random() * 25);
    let mt = mapTerritories[id];
    mt.owner = 1;
    mt.homeBase = 1;
    mt.troops = 9;
    //console.log(mt)


    // player two
    id = Math.floor(Math.random() * 25);
    mt = mapTerritories[id];
    //console.log(mt);
    if (mt.owner === 1) {
        id = Math.floor(Math.random() * 25);
        mt = mapTerritories[id];
    }

    mt.owner = 2;
    mt.homeBase = 1;
    mt.troops = 6;
    
    
    updateDisplay()
}


function placement(num, playerColor) {
    let name = 'territory' + num;
    let territory = document.getElementById(name);
    //console.log(territory);
    territory.style.backgroundColor = playerColor;
}


