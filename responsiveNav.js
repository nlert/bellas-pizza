const bars = document.getElementById('bars');
const closeNav = document.getElementById('close');
const nav = document.getElementById('navbar');

bars.addEventListener('click', () => {
    bars.classList.remove('grid');
    closeNav.classList.add('grid');
    nav.classList.remove('hide-mobile');

    document.querySelectorAll('.menu-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeNavMenu();
        });
    });
    
});

closeNav.addEventListener('click', () => {
    closeNavMenu();
});

function closeNavMenu() {
    closeNav.classList.remove('grid');
    bars.classList.add('grid');
    nav.classList.add('hide-mobile');
}
