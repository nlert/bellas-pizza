const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    scrollY !== 0 ? header.classList.add("box-shadow") : header.classList.remove("box-shadow")
});