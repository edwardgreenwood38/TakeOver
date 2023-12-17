
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
    
    let terrNum = t1.id;
    //console.log(terrNum.substring(9));

    // data is attack from
    let data = mapTerritories[terrNum.substring(9) - 1];
    //console.log(data);
    if (data.owner === currentPlayer) {
        t1.style.border = "2px solid red";
        attackFrom = terrNum.substring(9);
    }
    
    //console.log(`From: ${attackFrom}.  To: ${attackTo}`)
    if (attackFrom != 0 && data.owner !== currentPlayer) {
        t1.style.border = "2px dashed red";
        attackTo = terrNum.substring(9);
    } 
    
    if (attackFrom != 0 && attackTo != 0) {
        let ca = document.getElementById("currentAction");
        ca.textContent = `Attacking ${attackTo} from ${attackFrom}`;

        ca.textContent += `\n\r${attackResults()}`;

        attackFrom = 0;
        attackTo = 0;
    }

    updateDisplay();
}


function endTurn() {
    if (currentPlayer === 1) {
        currentPlayer = 2;

        // add new troops to home base
        placeTroops(currentPlayer);
    } 
    else {
        currentPlayer = 1;
        placeTroops(currentPlayer);
    }

    // clear display
    territories.forEach(t => {
        t.style.border = "1px solid black";
    })

    updateDisplay()
}

// get new troops and palce in home base
function placeTroops(cp) {
    for (let i = 1; i <= mapTerritories.length; i++) {
        let mt = mapTerritories[i-1];
        //console.log(mt);
        if (mt.owner === cp && mt.homeBase === 1) {
            //console.log(mt.troops);
            let num = mt.troops + 3;
            mt.troops = num;
            //console.log(mt.troops);
        }

    }
}



// refresh screen to show updates
function updateDisplay() {

    for (let i = 1; i <= mapTerritories.length; i++) {
        
        // display player background
        let t = "territory" + i;
        let pt = document.getElementById(t);
        //console.log(pt)
        let mapOwner = mapTerritories[i-1];
        //console.log(mapOwner)

        if (mapOwner.owner === 1) {
            pt.style.backgroundColor = "lightblue";
        }
        if (mapOwner.owner === 2) {
            pt.style.backgroundColor = "lightgreen";
        }
        
        // display territory title
        let mt = "territoryTitle" + i;
        let mapTitle = document.getElementById(mt);
        mapTitle.textContent = "Territory " + i;

        // dispaly nmber of troops
        mt = "troop" + i;
        //console.log(mt)
        let mapTroop = document.getElementById(mt);
        let tr = mapTerritories[i-1];
        //console.log(tr)
        mapTroop.textContent = tr.troops;


        // display curernt player
        let turn = document.getElementById("playerTurn");
        if (currentPlayer === 1) {
            turn.textContent = "Player 1";
            turn.style.backgroundColor = "lightblue";
        }
        if (currentPlayer === 2) {
            turn.textContent = "Player 2";
            turn.style.backgroundColor = "lightgreen";
        }

    }
}


function attackResults() {
    let attackResults = "";
    let af = Math.floor(Math.random() * 10);
    let at = Math.floor(Math.random() * 10);

    if (af > at) {
        //  subtract one from attackTo
        mapTerritories[attackTo - 1].troops -= 1;
        attackResults = "You won this round.";
    }
    else {
        // substract one from attckFrom
        mapTerritories[attackFrom - 1].troops -= 1;
        attackResults = "You lost this round.";
    }

    return attackResults;
}