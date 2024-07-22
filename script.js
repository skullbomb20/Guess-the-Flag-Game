document.addEventListener('DOMContentLoaded', function () {
    const flagImg = document.getElementById('flag-img');
    const guessInput = document.getElementById('guess-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultMsg = document.getElementById('result');

    // Fetch a random country flag
    function fetchRandomFlag() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const flagUrl = data[randomIndex].flags.png;
                const countryName = data[randomIndex].name.common;
                flagImg.src = flagUrl;
                flagImg.dataset.country = countryName;

            })
            .catch(error => console.log('Error fetching data: ', error));
    }

    // Check the user's guess
    function checkGuess() {
        const userGuess = guessInput.value.trim().toLowerCase();
        const correctAnswer = flagImg.dataset.country.toLowerCase();

        console.log(userGuess, correctAnswer);

        if (userGuess === correctAnswer) {
            resultMsg.textContent = 'Correct!';
            resultMsg.style.color = 'green';
        } else {
            resultMsg.textContent = 'Incorrect. Try again.';
            resultMsg.style.color = 'red';
        }

        // Clear the input after checking the guess
        guessInput.value = '';

        // Fetch a new random flag for the next round
        fetchRandomFlag();
    }

    // Event listener for the submit button
    submitBtn.addEventListener('click', checkGuess);

    // Fetch a random flag when the page loads
    fetchRandomFlag();
});