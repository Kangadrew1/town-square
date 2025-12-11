console.log("The Scribe is ready.");

// 1. SELECT ELEMENTS
// We grab the HTML elements by their IDs so we can control them
const scribeBtn = document.getElementById('scribe-btn');
const scribeDisplay = document.getElementById('scribe-display');

// 2. DEFINE THE ACTION
// We add an "Event Listener" to listen for the 'click' event
scribeBtn.addEventListener('click', async () => {
    
    // A. Show loading state (so the user knows something is happening)
    scribeDisplay.innerHTML = '<p>Consulting the scrolls...</p>';

    try {
        // --- NEW MAGIC LINE ---
        // await: "Pause execution here"
        // new Promise: Create a timer
        // setTimeout: Wait 1500 milliseconds (1.5 seconds)
        await new Promise(resolve => setTimeout(resolve, 500));
        // B. FETCH DATA
        // "await" means: "Pause here and wait for the internet to reply"
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        
        // C. CONVERT TO JSON
        // The internet sends raw text; we convert it to a JavaScript Object
        const data = await response.json();

        // D. UPDATE THE PAGE
        // We inject new HTML into the display box using the data we got
        scribeDisplay.innerHTML = 
        `
            <p><strong>${data.setup}</strong></p>
            <p style="margin-top: 5px;"><em>${data.punchline}</em></p>
        `;

    } catch (error) {
        // E. HANDLE ERRORS
        // If the internet is down or the API is broken, tell the user
        scribeDisplay.innerHTML = '<p style="color: red;">The scrolls are burnt! (Connection Error)</p>';
        console.error(error);
    }
});