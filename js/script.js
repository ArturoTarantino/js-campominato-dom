/* CONSEGNA
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba
e la cella si colora di rosso terminando la partita.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato 
su una cella che non era una bomba.
BONUS : 1)quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
        2)quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */

document.getElementById('play').addEventListener('click', startGame);

// FUNCTIONS DOM 
// aggiunge classe active allo square cliccato 
function handleSquareClick() {
    this.classList.add('active');
}

// FUNCTIONS 

// function : start game 
// scatena l'evento al click del play button 
function startGame () {

    // aggiungo classe hidden h2 nel main 
    const introText = document.getElementById('intro-text');
    introText.classList.add('hidden');

    // verifica scelta utente 
    let numberOfSquares;
    const levelSelected = parseInt(document.getElementById('levels-game').value);
    if (levelSelected === 0) {
        numberOfSquares = 100;
        cellDimension = 10;
    } else if (levelSelected === 1) {
        numberOfSquares = 81;
        cellDimension = 9;
    } else if (levelSelected === 2) {
        numberOfSquares = 49;
        cellDimension = 7;
    }
    

    //tolgo classe hidden alla main grid e  creo n celle in main grid per n squares
    const mainGrid = document.querySelector('.game-grid');
    mainGrid.classList.remove('hidden');
    // reset main grid dopo ciclo for 
    mainGrid.innerHTML = '';
    for (let i = 1; i <= numberOfSquares; i++ ){

        const newSquareCreated = createCells(i, cellDimension);

        // evento click per classe active alla cella 
        newSquareCreated.addEventListener('click', handleSquareClick);

        mainGrid.appendChild(newSquareCreated);
    }
}

/* function : createCells
    Creare un elemento della grid
        - number

    return : elemento html */
function createCells(number, cellDimension) {

    const newSquare = document.createElement('div');
    newSquare.classList.add('square');
    newSquare.innerHTML = `<span>${number}</span>`;
    newSquare.style.width = `calc(100% / ${cellDimension})`;
    newSquare.style.height = `calc(100% / ${cellDimension})`;
    return newSquare;
}

/*function : createCellsNumbers
    crea un array di numeri random non ripetuti
        - limite max del range di numeri 

    return : array */
function createCellsNumbers(numberOfSquares) {

    const numbersArray = [];
    while (numbersArray.length < numberOfSquares) {
        // genera un numero random 
        const randomNumber = createRandomNumber(1, numberOfSquares );

        // verifica se n contenuto in array se non è contenuto lo inseriamo all'interno
        if (!numbersArray.includes(randomNumber)) {
            numbersArray.push(randomNumber);
        }
    }
    // console.log(numbersArray);
    return numbersArray;
}


/*function : createRandomNumber 
    Generare un numero random da min a max 
         - numero
    return numero random */
function createRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
