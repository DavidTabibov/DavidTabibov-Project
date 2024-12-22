document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll('.custom-project-card');

    projectCards.forEach((card) => {
        const overlay = card.querySelector('.custom-overlay');

        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });
    });
});

; (parentElement.addChild(child