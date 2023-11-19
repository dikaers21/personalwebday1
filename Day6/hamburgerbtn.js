function hamburgerBtn() {
    const itemNavbar = document.getElementById("navbar-mobile");

    if (itemNavbar.style.display === "flex") {
        itemNavbar.style.display = "none";
    } else {
        itemNavbar.style.display = "flex";
    }
}