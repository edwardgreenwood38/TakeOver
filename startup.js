
//  initial setup 
const territories = document.querySelectorAll('.territory');

// Add a click event listener to territories
territories.forEach(territory => {
    territory.addEventListener('click', () => {
        // Simulate claiming territory on click
        territory.style.backgroundColor = 'blue';
        // Add logic to claim territory and handle player turns
    });
});


// random placement of start point
function playerStartPlacement() {
    document.getElementById("start").style.display = "none";
    let id = Math.floor(Math.random() * 16);

    let name = 'territory' + id;
    const territory = document.getElementById(name);
    //territory.innerHTML = "Player 1";
    territory.style.backgroundColor = "lightblue";
    //console.log(territory);

}



