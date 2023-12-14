
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


