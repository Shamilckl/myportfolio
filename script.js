
// Display a welcome message in the browser console
console.log("Welcome to Shamil's Portfolio!");

// Highlight navigation link when clicked
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navigating to: " + link.textContent);
    });
});
