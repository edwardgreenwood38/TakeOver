
//  initial setup 
const territories = document.querySelectorAll('.territory');
let currentPlayer = 1;
let winner = false;


// Add a click event listener to territories
territories.forEach(territory => {
    territory.addEventListener('click', function() {
        territoryAction(this.id);
    })
});


// random placement of start point
function playerStartPlacement() {
    document.getElementById("start").style.display = "none";
    
    // player one
    let id = Math.floor(Math.random() * 16);
    placement(id, 'lightblue');
    

    // player two
    id = Math.floor(Math.random() * 16);
    placement(id, 'lightgreen');
   
}

function placement(num, playerColor) {
    let name = 'territory' + num;
    let territory = document.getElementById(name);
    //console.log(territory);
    territory.style.backgroundColor = playerColor;
}


//  turn loop
while(winner) {
    let turn = document.getElementById("turn");
    turn.textContent = "Player 1";
}