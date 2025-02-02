let selectedCard = null;

function initiateDeckScript(){
    // Add click handlers to deck cards
document.querySelectorAll('.card-grid .card').forEach(card => {
    card.addEventListener('click', () => {
        // If a card was previously selected, remove its selection
        if (selectedCard) {
            selectedCard.classList.remove('selected');
        }
        
        // Select the new card
        card.classList.add('selected');
        selectedCard = card;
    });
});

// Add click handlers to table and hand cards
document.querySelectorAll('[data-placement]').forEach(targetCard => {
    targetCard.addEventListener('click', () => {
        if (targetCard.getAttribute('data-placement') === "table" && table.length > 4) return;
        if (targetCard.getAttribute('data-placement') === "hand" && hand.length > 1) return;
        if (selectedCard) {
            // Get the background image of the selected card
            const backgroundImage = window.getComputedStyle(selectedCard).backgroundImage;
            // Set the background image to the target card
            targetCard.style.backgroundImage = backgroundImage;
            // Copy the data-value attribute from the selected card to the target card
            const dataValue = selectedCard.getAttribute('data-value');
            targetCard.setAttribute('data-value', dataValue);
            targetCard.classList.add('filled');
            
            // Remove the selection from the deck card
            selectedCard.classList.remove('selected');
            selectedCard.classList.add('used');
            if (targetCard.classList.contains('table-card')) {
                updateTableCards();
            } else if (targetCard.classList.contains('hand-card')) {
                updateHandCards();
            }
            checkHand();
            selectedCard = null;
        }
    });
});
}

let table = [];

let hand = [];

function updateTableCards(){
    const tableCard = document.querySelectorAll('.table-card.filled');
    table = [];
    tableCard.forEach(card => {
        table.push(card.getAttribute('data-value'));
    });
}

function updateHandCards(){
    const handCard = document.querySelectorAll('.hand-card.filled');
    hand = [];
    handCard.forEach(card => {
        hand.push(card.getAttribute('data-value'));
    });
}

