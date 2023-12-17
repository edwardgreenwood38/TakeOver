
//  initial setup 
const territories = document.querySelectorAll('.territory');
let currentPlayer = 0;
let winner = false;
document.getElementById("turn").style.display = "none";
let mapTerritories = [];


// map setup
for (let i = 1; i <= 16; i++) {
    let mt = {
        name: "Territory" + i,
        owner: "Barbarian",
        troops: 1,
        homeBase: 0
    }

    //console.log(mt);
    mapTerritories.push(mt);
}
//console.log(mapTerritories);



// Add a click event listener to territories
territories.forEach(territory => {
    territory.addEventListener('click', function() {
        territoryAction(this.id);
    });
});




// player one
let id = Math.floor(Math.random() * 16);
//placement(id, 'lightblue');
let mt = mapTerritories[id];
mt.owner = 1;
mt.homeBase = 1;
mt.troops = 6;
//console.log(mt)


// player two
id = Math.floor(Math.random() * 16);
//placement(id, 'lightgreen');
mt = mapTerritories[id];
//console.log(mt);
mt.owner = 2;
mt.homeBase = 1;
mt.troops = 6;



updateDisplay();


// random placement of start point
function startGame() {
    document.getElementById("start").style.display = "none";
    document.getElementById("turn").style.display = "block";
    currentPlayer = 1;

    updateDisplay()
}

function placement(num, playerColor) {
    let name = 'territory' + num;
    let territory = document.getElementById(name);
    //console.log(territory);
    territory.style.backgroundColor = playerColor;
}


