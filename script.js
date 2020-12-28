const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// + sign is function as converter from string to number like parseInt()

let ticketPrice = +movieSelect.value

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) =>{
    localStorage.setItem('SelectedMovieIndex', movieIndex);
    localStorage.setItem('SelectedMoviePrice', moviePrice);
}

// Update total and count
const updateSelectedCount = () =>{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    // Copy selected seats into arr
    // Map thru array
    // return a new array indexes
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

    // Save to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    // Set count
    count.innerText = selectedSeatsCount;
    // Set total
    total.innerText = selectedSeatsCount * ticketPrice;
};

// Load saved data from local storage and populate to ui
const populateUI = ()=>{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('SelectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    const selectedMoviePrice = localStorage.getItem('SelectedMoviePrice');
    if (selectedMoviePrice !== null) {
        ticketPrice = +selectedMoviePrice;
    }
};

// Event listener
// Movie select event - Recount total price based on the changing ticket price
movieSelect.addEventListener('change', e=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});
// Seat click event - Select seat, count seat and total up price
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')

        updateSelectedCount();
    }
})
// Initial UI with saved data (if any), count and total
populateUI();
updateSelectedCount();
