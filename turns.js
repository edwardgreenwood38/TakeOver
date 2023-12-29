
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


    // sets territory you are attacking to 
    // if player has selected his own first
    if (attackFrom != 0 && terrNum.substring(9) != attackFrom) {
        
        const north = parseInt(attackFrom) - 5;
        const east = parseInt(attackFrom) + 1;
        const south = parseInt(attackFrom) + 5;
        const west = parseInt(attackFrom) - 1;
        const tn = parseInt(terrNum.substring(9));
        //console.log(`Territory: ${terrNum} ::: attackFrom: ${number}`)
        if (tn === north || tn === east || tn === south || tn === west) {
            t1.style.border = "2px dashed red";
            attackTo = terrNum.substring(9);
        }
        else {
            //console.log(`Territory: ${terrNum} -- attackFrom: ${number}`)
            illegalMove('You can not reach that territory', 3000);
        }
        

        //console.log(`From: ${attackFrom}.  Set To: ${attackTo}`)
    } 


    // mark territory selected (if same as current palyer)
    if (data.owner === currentPlayer && attackFrom == 0 && attackTo == 0) {
        t1.style.border = "2px solid red";
        attackFrom = terrNum.substring(9);

        //console.log(`Set From: ${attackFrom}.  To: ${attackTo}`)
    }
    

    //console.log(`From: ${attackFrom}.  To: ${attackTo}.   TerrNum: ${terrNum}`)
    
    
    // if from and to are different owners then attack.
    if (attackFrom != 0 && attackTo != 0){
        let ca = document.getElementById("turnResults");

        // check if enough troops to attack
        if (mapTerritories[attackFrom - 1].troops >= 4) {
            if (mapTerritories[attackFrom - 1].owner != mapTerritories[attackTo - 1].owner) {                
                ca.innerHTML += `<div>Attacking ${mapTerritories[attackTo - 1].name} from ${mapTerritories[attackFrom - 1].name}</div>`;
                ca.innerHTML += `<div>${attackResults()}</div>`; 
                ca.scrollTop = ca.scrollHeight;
                
                swordSound.play();
    
                // clear display
                territories.forEach(t => {
                    t.style.border = "2px solid black";
                });
    
                attackFrom = 0;
                attackTo = 0;
            }
        }
        else if (mapTerritories[attackFrom - 1].owner != mapTerritories[attackTo - 1].owner) {
            ca.innerHTML += `<div>You do not have enough troops in ${mapTerritories[attackFrom - 1].name} to attack.</div>`;
            ca.scrollTop = ca.scrollHeight;

            illegalMove('You do not have enough troops to attack.', 2000);

            // clear display
            territories.forEach(t => {
                t.style.border = "2px solid black";
            });

            attackFrom = 0;
            attackTo = 0;
        }

        
    }
    

    // if from and to are same owner then move troop
    if (attackFrom != 0 && attackTo != 0) {
        let ca = document.getElementById("turnResults");

        // check if more than one troop is available for movement
        if (mapTerritories[attackFrom - 1].troops > 1) {
            if (mapTerritories[attackFrom - 1].owner == mapTerritories[attackTo - 1].owner &&
                attackFrom != attackTo) {
                
                ca.innerHTML += `<div>Moving troop from ${mapTerritories[attackFrom - 1].name} to ${mapTerritories[attackTo - 1].name}</div>`;
                ca.scrollTop = ca.scrollHeight;
    
                march(1500);
        
                mapTerritories[attackFrom - 1].troops -= 1;
                mapTerritories[attackTo - 1].troops += 1;
        
                attackFrom = 0;
                attackTo = 0;
    
                // clear display
                territories.forEach(t => {
                    t.style.border = "2px solid black";
                });
            }
        }
        else if (mapTerritories[attackFrom - 1].owner == mapTerritories[attackTo - 1].owner && attackFrom != attackTo) {
            ca.innerHTML += `<div>You do not have enough troops in ${mapTerritories[attackFrom - 1].name} to fortify with.`;
            ca.scrollTop = ca.scrollHeight;

            illegalMove('You do not have enought troops to fortify with.', 2000);

            attackFrom = 0;
            attackTo = 0;

            // clear display
            territories.forEach(t => {
                t.style.border = "2px solid black";
            });
        }
        
    }


    // unselect territory
    // if (document.getElementById(terrNum).style.border == '2px solid red') {
    //     attackFrom = 0;
    //     document.getElementById(terrNum).style.border = '2px solid black';
    // }

    updateDisplay();
}


function endTurn() {
    const turnResults = document.getElementById("turnResults");
    turnResults.innerHTML += `<div>Player ${currentPlayer} ended thier turn.</div>`;
    turnResults.scrollTop = turnResults.scrollHeight;
    attackFrom = 0;
    attackTo = 0;

    if (currentPlayer === 1) {
        currentPlayer = 2;

        // add new troops to home base
        placeTroops(currentPlayer);
        computerPlayer();
    } 
    else {
        currentPlayer = 1;
        placeTroops(currentPlayer);
    }

    // clear display
    territories.forEach(t => {
        t.style.border = "2px solid black";
    })

    updateDisplay()
}

// get new troops and palce in home base
function placeTroops(cp) {
    for (let i = 1; i <= mapTerritories.length; i++) {
        let mt = mapTerritories[i-1];
        //console.log(mt);
        if (mt.owner === cp && mt.homeBase === 1) {
            let num = 3;
            let tCount = 0;
            //console.log(mt);

            // calculate number of troops to get based on number of territorites owned
            for (let j = 0; j < mapTerritories.length; j++) {
                if (mapTerritories[j].owner === cp) {
                    tCount++;
                }

                //console.log(tCount);
            }

            // grant troops
            if (tCount >= 12) {
                num += 4;
            }
            else if (tCount >= 8) {
                num += 2;
            }
            else if (tCount >= 4) {
                num += 1;
            }


            let ca = document.getElementById("turnResults");
            ca.innerHTML += `<div>Player ${cp} gained ${num} troops.`;
            ca.scrollTop = ca.scrollHeight;

            mt.troops += num;
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

        // mark home base
        if (mapOwner.homeBase === 1) {
            const base = "troop" + i;
            const hb = document.getElementById(base);
            hb.style.fontWeight = "bold";
            hb.style.fontSize = "1.2em";
            hb.style.border = "2px solid yellow";
        }
        
        // display territory title
        let mt = "territoryTitle" + i;
        let mapTitle = document.getElementById(mt);
        mapTitle.textContent = mapTerritories[i - 1].name;

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

        // check if take over territory
        if (mapTerritories[attackTo - 1].troops <= 0) {
            mapTerritories[attackTo - 1].owner = currentPlayer;
            winSound.play();

            if (mapTerritories[attackTo - 1].homeBase === 1 && mapTerritories[attackTo - 1].troops <= 0) {
                winGame();
            }

            // move troops into new territory
            mapTerritories[attackFrom - 1].troops -= 3;
            mapTerritories[attackTo - 1].troops += 3;
        }
        attackResults = "You won this round.";
    }
    else {
        // substract one from attckFrom
        mapTerritories[attackFrom - 1].troops -= 1;
        attackResults = "You lost this round.";
    }

    return attackResults;
}


function winGame() {
    document.getElementById("turn").style.display = "none";
    

    document.getElementById("winGame").style.display = "block";
    if (currentPlayer === 1) {
        document.getElementById("winGameText").style.backgroundColor = "lightblue";
    } 
    else {
        document.getElementById("winGameText").style.backgroundColor = "lightgreen";
    }

    let win = document.getElementById("winGameText")
    win.textContent = `Player ${currentPlayer} has won by taking the other player home base.`;
}

function illegalMove(msg, duration) {
    const el = document.createElement("div");
    el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;font-size:1.5em;");
    el.innerHTML = msg;
    setTimeout(function(){
     el.parentNode.removeChild(el);
    },duration);
    document.body.appendChild(el);
}

function march(time){
    let marching = new Audio("./sounds/Person Walking On Gravel.mp3");
    marching.play();
    setTimeout(() => {
        marching.pause();
    }, time);
}


function computerPlayer() {
    let ownedTerrritories = [];
    cav = [];

    // decide which territory to attack from
    for (let i = 0; i < mapTerritories.length; i++) {
        // find owned territories
        if (mapTerritories[i].owner == currentPlayer) {
            ownedTerrritories.push(i);
            
        }
    }

    //console.log(ownedTerrritories);

    // get list of territories can attack from/to
    let attackList = getCPlist(ownedTerrritories);


    if (attackList.length > 0) {
        // select which attack to perform
        let r = Math.floor(Math.random() * parseInt(attackList.length));
        //console.log(`num: ${r}. || attackList: ${attackList}`)
        attack = attackList[r];

        //console.log(attack);

        // process selected attack
        attackFrom = attack.af + 1;
        attackTo = attack.at + 1;

        let ca = document.getElementById("turnResults");
        ca.innerHTML += `<div>Attacking ${mapTerritories[attackTo - 1].name} from ${mapTerritories[attackFrom - 1].name}</div>`;
        ca.innerHTML += `<div>${attackResults()}</div>`; 
        ca.scrollTop = ca.scrollHeight;

        swordSound.play();

        // clear display
        territories.forEach(t => {
            t.style.border = "2px solid black";
        });

        attackFrom = 0;
        attackTo = 0;
    }
    

    updateDisplay();


    // fortify troops
    let fortifyList = [];
    ownedTerrritories = [];
    // get owned territories
    for (let i = 0; i < mapTerritories.length; i++) {
        // find owned territories
        if (mapTerritories[i].owner == currentPlayer && mapTerritories[i].troops >= 2) {
            ownedTerrritories.push(i);
        }
    }

    if (ownedTerrritories.length > 0){
        // get list of territories allowed to fortify from
        fortifyList = fortifyFrom(ownedTerrritories);
        // console.log(ownedTerrritories);
        // console.log(fortifyList);
    }
    
    if (fortifyList.length > 0) {
        let r = Math.floor(Math.random() * parseInt(fortifyList.length));

        let ff = fortifyList[r].mf;
        mapTerritories[ff].troops -= 1;
        let ft = fortifyList[r].mt;
        mapTerritories[ft].troops += 1;


        let ca = document.getElementById("turnResults");
        ca.innerHTML += `<div>Moving troop from ${mapTerritories[ff].name} to ${mapTerritories[ft].name}</div>`;
        //ca.innerHTML += `<div>${attackResults()}</div>`; 
        ca.scrollTop = ca.scrollHeight;

        march(1500);

        // clear display
        territories.forEach(t => {
            t.style.border = "2px solid black";
        });

        attackFrom = 0;
        attackTo = 0;
    }


    // end of computer turn
    endTurn();
}


// check if adjacent territory is owned by currentplayer
function getCPlist(owned) {
    for (let i = 0; i < owned.length; i++) {
        let cpa = {af: 0, at: 0, av: 0}

        // check adjacent territories
        let ot = owned[i];

        if (ot - 1 >= 0) {
            if (mapTerritories[ot].owner != mapTerritories[ot - 1].owner && mapTerritories[ot].troops > 3) {
                if (mapTerritories[ot].troops > mapTerritories[ot - 1].troops) {
                    cpa = {af: ot, at: ot - 1, av: 1};
    
                    cav.push(cpa);
                }
            }
        }
        

        if (ot - 5 >= 0) {
            if (mapTerritories[ot].owner != mapTerritories[ot - 5].owner && mapTerritories[ot].troops > 3) {
                if (mapTerritories[ot].troops > mapTerritories[ot - 5].troops) {
                    cpa = {af: ot, at: ot - 5, av: 1};
    
                    cav.push(cpa);
                }
            }
        }
        

        if (ot + 1 < 25) {
            if (mapTerritories[ot].owner != mapTerritories[ot + 1].owner && mapTerritories[ot].troops > 3) {
                if (mapTerritories[ot].troops > mapTerritories[ot + 1].troops) {
                    cpa = {af: ot, at: ot + 1, av: 1};
    
                    cav.push(cpa);
                }
            }
        }


        if (ot + 5 < 25) {
            if (mapTerritories[ot].owner != mapTerritories[ot + 5].owner && mapTerritories[ot].troops > 3) {
                if (mapTerritories[ot].troops > mapTerritories[ot + 5].troops) {
                    cpa = {af: ot, at: ot + 5, av: 1};
    
                    cav.push(cpa);
                }
            }
        }
        
    }

    return cav;
}


// gets possible sources to move from
function fortifyFrom(owned) {
    let cpf = {};
    cfv = [];

    for (let i = 0; i < owned.length; i++) {
        let cpf = {};

        if (owned[i] -1 > - 1) {
            if (mapTerritories[owned[i]].troops > mapTerritories[owned[i] - 1].troops && 
                mapTerritories[owned[i] - 1].owner == currentPlayer && owned[i] - 1 > -1) {
                cpf = {mf: owned[i], mt: owned[i] - 1, mv: 1};
    
                cfv.push(cpf);
            }
        }  


        if (owned[i] - 5 > -1) {
            if (mapTerritories[owned[i]].troops > mapTerritories[owned[i] - 5].troops && 
                mapTerritories[owned[i] - 5].owner == currentPlayer && owned[1] - 5 > -1) {
                cpf = {mf: owned[i], mt: owned[i] - 5, mv: 1};
    
                cfv.push(cpf);
            }
        }


        if (owned[i] + 1 < 25) {
            if (mapTerritories[owned[i]].troops > mapTerritories[owned[i] + 1].troops && 
                mapTerritories[owned[i] + 1].owner == currentPlayer && owned[i] + 1 < 25) {
                cpf = {mf: owned[i], mt: owned[i] + 1, mv: 1};
    
                cfv.push(cpf);
            }
        }
        

        if (owned[i] + 5 < 25) {
            if (mapTerritories[owned[i]].troops > mapTerritories[owned[i] + 5].troops && 
                mapTerritories[owned[i] + 5].owner == currentPlayer) {
                cpf = {mf: owned[i], mt: owned[i] + 5, mv: 1};
    
                cfv.push(cpf);
            }
        }
        
    }

    return cfv;
}