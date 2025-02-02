const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'jack': 11, 'queen': 12, 'king': 13, 'ace': 14
};

let handName;

function checkHand() {
    const actualDeck = table.concat(hand);
    const straightFlush = findStraightFlush(actualDeck);
    if (straightFlush) {
        handName = 'straight flush';
        highlightCards(straightFlush)
        return;
    } 

    const fourOfAKind = findFourOfAKind(actualDeck);
    if (fourOfAKind.length) {
       handName = 'four of a kind';
       highlightCards(fourOfAKind)
        return;
    } 


    const fullHouse = findHighestPair(actualDeck) && findThreeOfAKind(actualDeck).length
    if (fullHouse) {
        handName = 'full house';
        highlightCards(fullHouse)
        return;
    }

    const flush = findFlush(actualDeck);
    if (flush) {
        handName = 'flush';
        highlightCards(flush)
        return;
    } 

    const straight = findStraight(actualDeck);
    if (straight) {
        handName = 'straight';
        highlightCards(straight)
        return;
    } 

    const threeOfAKind = findThreeOfAKind(actualDeck);
    if (threeOfAKind.length) {
        handName = 'three of a kind';
        highlightCards(threeOfAKind)
        return;
    } 


    const pairs = findTwoHighestPairs(actualDeck);
    if (pairs.length === 4) {
        handName = 'two pairs';
        highlightCards(pairs)
        return;
    } 

    const pair = findHighestPair(actualDeck);
    if (pair) {
        handName = 'pair';
        highlightCards(pair)
        return;
    } 

    const highestCard = getHighestCard(actualDeck);
    handName = 'high card';
    highlightCards(highestCard)
}

function getHighestCard(cards) {
    return cards.reduce((highest, card) => {
        const cardName = card.split('_of_')[0];
        return cardValues[cardName] > cardValues[highest.split('_of_')[0]] ? card : highest;
    });
}

function findHighestPair(cards) {
    const counts = {};
    let highestPair = null;

    for (const card of cards) {
        const cardName = card.split('_of_')[0];
        counts[cardName] = (counts[cardName] || 0) + 1;
    }

    for (const card in counts) {
        if (counts[card] === 2) {
            if (!highestPair || cardValues[card] > cardValues[highestPair]) {
                highestPair = card;
            }
        }
    }

    return highestPair ? cards.filter(card => card.startsWith(highestPair)) : null;
}

function findTwoHighestPairs(cards) {
    const counts = {};
    const pairs = [];

    for (const card of cards) {
        const cardName = card.split('_of_')[0];
        counts[cardName] = (counts[cardName] || 0) + 1;
    }

    for (const card in counts) {
        if (counts[card] === 2) {
            pairs.push(card);
        }
    }

    pairs.sort((a, b) => cardValues[b] - cardValues[a]);
    
    return pairs.slice(0, 2).map(pair => cards.filter(card => card.startsWith(pair))).flat();
}

function findThreeOfAKind(cards) {
    const counts = {};
    const threeOfAKind = [];

    // Contar as ocorrências de cada valor de carta
    for (const card of cards) {
        const cardName = card.split('_of_')[0];
        counts[cardName] = (counts[cardName] || 0) + 1;
    }

    // Procurar por trincas
    for (const card in counts) {
        if (counts[card] === 3) {
            threeOfAKind.push(card);
        }
    }

    // Se houver trinca, retornar todas as cartas dessa trinca
    return threeOfAKind.map(three => cards.filter(card => card.startsWith(three))).flat();
}

function findStraight(cards) {
    // Extrair os valores das cartas e converter para números
    const cardNumbers = cards.map(card => {
        const cardName = card.split('_of_')[0];
        return cardValues[cardName];
    });

    // Remover duplicatas ao mapear para valores únicos
    const uniqueCardNumbers = [...new Set(cardNumbers)];

    // Ordenar as cartas em ordem crescente
    uniqueCardNumbers.sort((a, b) => a - b);

    // Verificar se existe uma sequência de 5 cartas consecutivas
    for (let i = 0; i <= uniqueCardNumbers.length - 5; i++) {
        const subArray = uniqueCardNumbers.slice(i, i + 5);
        if (subArray[subArray.length - 1] - subArray[0] === 4) {
            // Encontrou uma sequência
            // Garantir que só a primeira carta de cada valor seja considerada
            const sequence = [];
            for (const num of subArray) {
                // Adicionar a primeira ocorrência de cada número
                const card = cards.find(c => cardValues[c.split('_of_')[0]] === num);
                sequence.push(card);
            }
            return sequence;
        }
    }

    return null;
}

function findFlush(cards) {
    // Agrupar cartas pelo naipe
    const suits = {};

    for (const card of cards) {
        const suit = card.split('_of_')[1]; // Extrai o naipe da carta
        if (!suits[suit]) {
            suits[suit] = [];
        }
        suits[suit].push(card);
    }

    // Procurar por um naipe com pelo menos 5 cartas
    for (const suit in suits) {
        if (suits[suit].length >= 5) {
            return suits[suit].slice(0, 5); // Retorna as 5 primeiras cartas desse naipe
        }
    }

    return null;
}

function findFourOfAKind(cards) {
    const counts = {};
    const fourOfAKind = [];

    // Contar as ocorrências de cada valor de carta
    for (const card of cards) {
        const cardName = card.split('_of_')[0];
        counts[cardName] = (counts[cardName] || 0) + 1;
    }

    // Procurar por quadras (4 cartas do mesmo valor)
    for (const card in counts) {
        if (counts[card] === 4) {
            fourOfAKind.push(card);
        }
    }

    // Se houver quadra, retornar todas as cartas dessa quadra
    return fourOfAKind.map(four => cards.filter(card => card.startsWith(four))).flat();
}

function findStraightFlush(cards) {
    // Agrupar as cartas pelo naipe
    const suits = {};

    for (const card of cards) {
        const [cardName, suit] = card.split('_of_');
        if (!suits[suit]) {
            suits[suit] = [];
        }
        suits[suit].push(cardValues[cardName]);
    }

    // Verificar se há um straight flush
    for (const suit in suits) {
        const suitCards = suits[suit];
        if (suitCards.length >= 5) {
            suitCards.sort((a, b) => a - b); // Ordenar as cartas por valor

            // Verificar se há uma sequência de 5 cartas consecutivas
            for (let i = 0; i <= suitCards.length - 5; i++) {
                const subArray = suitCards.slice(i, i + 5);
                if (subArray[4] - subArray[0] === 4) {
                    // Encontrou um straight flush, retornando as cartas
                    return subArray.map(value => cards.find(card => cardValues[card.split('_of_')[0]] === value && card.includes(suit)));
                }
            }
        }
    }

    return null;
}

function highlightCards(cards){
    document.querySelector('.hand-value').innerHTML = handName;
}