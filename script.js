document.addEventListener('DOMContentLoaded', () => {
    const portfolioStack = document.querySelector('.portfolio-stack');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const actionButtons = document.querySelectorAll('.action-button');
    const backButtons = document.querySelectorAll('.back-to-home');
    const navDots = document.querySelectorAll('.nav-dot');
    const cardOrder = Array.from(portfolioCards).map(card => card.id);
    const setActiveCard = (cardId) => {
        portfolioCards.forEach(card => {
            card.classList.toggle('active', card.id === cardId);
        });
        navDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.targetCard === cardId);
        });
    };
    const setupEventListeners = () => {
        actionButtons.forEach(button => {
            button.addEventListener('click', () => setActiveCard(button.dataset.targetCard));
        });
        backButtons.forEach(button => {
            button.addEventListener('click', () => setActiveCard(button.dataset.targetCard));
        });
        navDots.forEach(dot => {
            dot.addEventListener('click', () => setActiveCard(dot.dataset.targetCard));
        });
    };
    const setupSwipe = () => {
        let touchStartX = 0;
        let touchEndX = 0;
        portfolioStack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        portfolioStack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        const handleSwipe = () => {
            const currentCard = document.querySelector('.portfolio-card.active');
            if (!currentCard) return;
            const currentIndex = cardOrder.indexOf(currentCard.id);
            if (touchEndX < touchStartX - 50 && currentIndex < cardOrder.length - 1) {
                setActiveCard(cardOrder[currentIndex + 1]);
            }
            if (touchEndX > touchStartX + 50 && currentIndex > 0) {
                setActiveCard(cardOrder[currentIndex - 1]);
            }
        };
    };
    setupEventListeners();
    setupSwipe();
    setActiveCard('intro-card');
});