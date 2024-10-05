
// Function for responsive submenu
function myFunction() {
    var x = document.getElementById("TopNav");
    var menuIcon = document.getElementById("menuIcon");
    var dark = document.getElementById("dark");
    var cart = document.getElementById("cart");
    
    // Toggle the responsive class for the navbar
    if (x.className === "topnav") {
        x.className += " responsive";
        menuIcon.src = "img/CloseIcon.png"; // Change to the close icon
        document.getElementById("dark").style.paddingLeft = "16px"; // Adjust padding
        document.getElementById("cart").style.paddingLeft = "16px";
    } else {
        x.className = "topnav";
        menuIcon.src = "img/Hamburger%20Menu%20Icon2.png"; // Change back to the hamburger icon
        document.getElementById("dark").style.paddingLeft = "1px"; // Adjust padding
        document.getElementById("cart").style.paddingLeft = "3px";
    }
}