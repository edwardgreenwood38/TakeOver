
//  initial setup 
let currentPlayer = 0;
let winner = false;
document.getElementById("turn").style.display = "none";
document.getElementById("winGame").style.display = "none";
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




// random placement of start point
function startGame() {
    document.getElementById("currentAction").textContent = "";
    document.getElementById("start").style.display = "none";
    document.getElementById("gameInfo").style.display = "none";
    document.getElementById("winGame").style.display = "none";
    document.getElementById("map").style.display = "block";
    document.getElementById("turn").style.display = "block";

    territories.forEach(t => {
        t.style.backgroundColor = "";
    })
    mapTerritories = [];

    // map setup
    for (let i = 1; i <= 25; i++) {
        let mt = {
            name: "Territory" + i,
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
    //placement(id, 'lightblue');
    let mt = mapTerritories[id];
    mt.owner = 1;
    mt.homeBase = 1;
    mt.troops = 9;
    //console.log(mt)


    // player two
    id = Math.floor(Math.random() * 25);
    //placement(id, 'lightgreen');
    mt = mapTerritories[id];
    //console.log(mt);
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


