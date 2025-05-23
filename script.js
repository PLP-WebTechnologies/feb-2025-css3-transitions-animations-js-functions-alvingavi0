// --- DOM Elements ---
const animatedImage = document.getElementById('animatedImage');
const toggleAnimationBtn = document.getElementById('toggleAnimationBtn');
const autoPlayAnimationCheckbox = document.getElementById('autoPlayAnimationCheckbox');
const clearPreferencesBtn = document.getElementById('clearPreferencesBtn');
const localStorageStatus = document.getElementById('localStorageStatus');

// --- Local Storage Keys ---
const PREF_AUTO_PLAY = 'autoPlayAnimation';

// --- Functions ---

/**
 * Toggles the 'animated' CSS class on the image element,
 * starting or stopping the animation.
 */
function toggleImageAnimation() {
    animatedImage.classList.toggle('animated');
    if (animatedImage.classList.contains('animated')) {
        toggleAnimationBtn.textContent = 'Stop Image Animation';
    } else {
        toggleAnimationBtn.textContent = 'Start Image Animation';
    }
}

/**
 * Saves the current state of the autoplay checkbox to localStorage.
 */
function savePreferences() {
    const shouldAutoPlay = autoPlayAnimationCheckbox.checked;
    localStorage.setItem(PREF_AUTO_PLAY, JSON.stringify(shouldAutoPlay)); // Store boolean as string "true" or "false"
    updateLocalStorageStatus('Preferences saved!');
}

/**
 * Loads user preferences from localStorage and applies them.
 */
function loadPreferences() {
    const storedAutoPlay = localStorage.getItem(PREF_AUTO_PLAY);

    if (storedAutoPlay !== null) { // Check if preference exists
        // JSON.parse converts "true"/"false" strings back to boolean true/false
        const shouldAutoPlay = JSON.parse(storedAutoPlay);
        autoPlayAnimationCheckbox.checked = shouldAutoPlay;

        // Trigger animation if auto-play is enabled
        if (shouldAutoPlay) {
            animatedImage.classList.add('animated');
            toggleAnimationBtn.textContent = 'Stop Image Animation';
        }
        updateLocalStorageStatus('Preferences loaded.');
    } else {
        updateLocalStorageStatus('No preferences saved yet.');
    }
}

/**
 * Clears all specific preferences from localStorage.
 */
function clearAllPreferences() {
    localStorage.removeItem(PREF_AUTO_PLAY);
    autoPlayAnimationCheckbox.checked = false; // Reset checkbox
    animatedImage.classList.remove('animated'); // Stop animation if running
    toggleAnimationBtn.textContent = 'Start Image Animation'; // Reset button text
    updateLocalStorageStatus('Preferences cleared!');
}

/**
 * Updates the status message on the page for localStorage actions.
 * @param {string} message The message to display.
 */
function updateLocalStorageStatus(message) {
    localStorageStatus.textContent = `Status: ${message}`;
}


// --- Event Listeners ---

// 1. Animation Trigger
toggleAnimationBtn.addEventListener('click', toggleImageAnimation);

// 2. Local Storage - Save Preference on checkbox change
autoPlayAnimationCheckbox.addEventListener('change', savePreferences);

// 3. Local Storage - Clear Preferences
clearPreferencesBtn.addEventListener('click', clearAllPreferences);

// --- Initial Load Logic ---
// Load preferences when the page first loads
document.addEventListener('DOMContentLoaded', loadPreferences);

// You can also add more complex animations or transitions based on other events
// Example: A simple transition on hover for a different element (not required by assignment, but good to know)
const header = document.querySelector('header');
if (header) { // Check if header exists
    header.addEventListener('mouseover', () => {
        header.style.backgroundColor = '#d1e7dd'; // Light green
        header.style.transform = 'scale(1.01)';
    });
    header.addEventListener('mouseout', () => {
        header.style.backgroundColor = '#e0f2f7'; // Original light blue
        header.style.transform = 'scale(1)';
    });
    // Add transition to header in style.css for these properties:
    // header { transition: background-color 0.3s ease, transform 0.3s ease; }
}
