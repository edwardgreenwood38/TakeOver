
while(winner) {

    



    // Add a click event listener to territories
    territories.forEach(territory => {
        territory.addEventListener('click', () => {
            if (territory.getAttribute('data-owner') === null) {
                // If territory is unclaimed
                territory.setAttribute('data-owner', currentPlayer);
                if (currentPlayer === 1) {
                    territory.style.backgroundColor = 'lightblue';
                } else {
                    territory.style.backgroundColor = 'lightgreen';
                }
                currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch turns
            } else if (parseInt(territory.getAttribute('data-owner')) === currentPlayer) {
                // If territory belongs to the current player
                // Implement logic for player actions (e.g., reinforce, attack)
                // For simplicity, change territory color on click for demonstration
                territory.style.backgroundColor = currentPlayer === 1 ? 'blue' : 'red';
            }
        });
    });
}


function territoryAction(element) {
    const t1 = document.getElementById(element);
    
    // player 1
    if (t1.style.backgroundColor === "lightblue" && currentPlayer === 1) {
        t1.style.border = "2px solid red";
    }
    

}