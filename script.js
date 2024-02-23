//DARK MODE
function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

//Text reveal section
document.addEventListener('DOMContentLoaded', function() {
    var reveals = document.querySelectorAll('.reveal');

    function revealElements() {
        for (var i = 0; i < reveals.length; i++) {
            var reveal = reveals[i];
            if (isElementInViewport(reveal)) {
                reveal.classList.add('revealed');
            }
        }
    }

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('scroll', revealElements);
    revealElements();
});


// Sidenav
const openModalBtn = document.getElementById('openModalBtn');
const modalContainer = document.getElementById('modalContainer');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtn.addEventListener('click', function() {
modalContainer.style.display = 'flex';
setTimeout(() => {
    modalContainer.style.opacity = 1;
    document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
}, 10);
});

closeModalBtn.addEventListener('click', function() {
modalContainer.style.opacity = 0;
setTimeout(() => {
    modalContainer.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactiver le défilement du body
}, 300);
});

