
//  initial setup 
const territories = document.querySelectorAll('.territory');
let currentPlayer = 1;
let winner = false;
document.getElementById("turn").style.display = "none";

// map setup
let mapTerritories = [];



// Add a click event listener to territories
territories.forEach(territory => {
    territory.addEventListener('click', function() {
        territoryAction(this.id);
    });
});

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


// random placement of start point
function playerStartPlacement() {
    document.getElementById("start").style.display = "none";
    document.getElementById("turn").style.display = "block";
    document.getElementById("playerTurn").textContent = "Player 1";
    document.getElementById("playerTurn").style.backgroundColor = "lightblue";
    
    // player one
    let id = Math.floor(Math.random() * 16);
    placement(id, 'lightblue');
    let mt = mapTerritories[id];
    mt.owner = "Player 1";
    mt.homeBase = 1;
    

    // player two
    id = Math.floor(Math.random() * 16);
    placement(id, 'lightgreen');
    mt = mapTerritories[id];
    console.log(mt);
    mt.owner = "Player 2";
    mt.homeBase = 1;
   
}

function placement(num, playerColor) {
    let name = 'territory' + num;
    let territory = document.getElementById(name);
    //console.log(territory);
    territory.style.backgroundColor = playerColor;
}


