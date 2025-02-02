let cards = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
let suits = ["spades", "clubs", "hearts", "diamonds"];

let deck = [];

// Criar o baralho
suits.forEach(suit => {
    cards.forEach(card => {
        deck.push({ card, suit });
    });
});

// Função para renderizar as cartas
function renderCards(deck) {
    let cardGrid = document.querySelector(".card-grid");
    
    deck.forEach(({ card, suit }) => {
        let cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.id = card + "_of_" + suit;
        cardDiv.setAttribute("data-value", card + "_of_" + suit);
        cardDiv.style.backgroundImage = `url('images/${card}_of_${suit}.png')`;
        cardGrid.appendChild(cardDiv);
    });
}

// Função para ordenar por número
function sortByNumber() {
    let cardOrder = { ace: 1, jack: 11, queen: 12, king: 13 };
    deck.sort((a, b) => {
        let valueA = cardOrder[a.card] || parseInt(a.card);
        let valueB = cardOrder[b.card] || parseInt(b.card);
        return valueA - valueB;
    });
    renderCards(deck);
}

// Função para ordenar por naipe
function sortBySuit() {
    deck.sort((a, b) => suits.indexOf(a.suit) - suits.indexOf(b.suit));
    renderCards(deck);
}

// Inicializar o baralho
window.onload = () => {
    sortByNumber();
    initiateDeckScript();
};