
// Add a click event listener to territories
// territories.forEach(territory => {
//     territory.addEventListener('click', () => {
//         if (territory.getAttribute('data-owner') === null) {
//             // If territory is unclaimed
//             territory.setAttribute('data-owner', currentPlayer);
//             if (currentPlayer === 1) {
//                 territory.style.backgroundColor = 'lightblue';
//             } else {
//                 territory.style.backgroundColor = 'lightgreen';
//             }
//             currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch turns
//         } else if (parseInt(territory.getAttribute('data-owner')) === currentPlayer) {
//             // If territory belongs to the current player
//             // Implement logic for player actions (e.g., reinforce, attack)
//             // For simplicity, change territory color on click for demonstration
//             territory.style.backgroundColor = currentPlayer === 1 ? 'blue' : 'red';
//         }
//     });
// });



function territoryAction(element) {
    const t1 = document.getElementById(element);
    
    // player 1
    if (t1.style.backgroundColor === "lightblue" && currentPlayer === 1) {
        t1.style.border = "2px solid red";
    }
    

}


function endTurn() {
    const checkTurn = document.getElementById("playerTurn").textContent;

    if (checkTurn === "Player 1")
    {
        document.getElementById("playerTurn").textContent = "Player 2";
        document.getElementById("playerTurn").style.backgroundColor = "lightgreen";
        currentPlayer = 2;

        // get and place new troops

    }
    else {
        // back to player 1
        document.getElementById("playerTurn").textContent = "Player 1";
        document.getElementById("playerTurn").style.backgroundColor = "lightblue";
        currentPlayer = 1;

        // get and place new troops
        placeTroops(currentPlayer);
    }
}

// get new troops and palce in home base
function placeTroops(cp) {
    for (let i = 1; i <= mapTerritories.length; i++) {
        let mt = mapTerritories[i];
        //console.log(mt);
        if (mt.owner === "Player" + i && mt.homeBase === 1) {
            mt.troops = mt.troop + 3;
        }

        let troopId = "troop" + i;
        document.getElementById(troopId).innerText = mt.troops;
    }


}
