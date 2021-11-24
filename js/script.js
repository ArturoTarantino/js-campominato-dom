/* CONSEGNA
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49

PART 1 
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba
e la cella si colora di rosso terminando la partita.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

PART 2
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato 
su una cella che non era una bomba.
BONUS : 1)quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
        2)quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste */

document.getElementById('play').addEventListener('click', startGame);


// FUNCTIONS 

// function : start game 
// scatena l'evento al click del play button 
function startGame () {

    // aggiungo classe hidden h2 nel main 
    const introText = document.getElementById('intro-text');
    introText.classList.add('hidden');

    // n bombe presenti nel campo minato
    const bombsAmount = 16;

    // verifica difficoltà scelta utente 
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
    
    // creaimo le bombe presenti nel campo minato 
    const bombsArray = createBombs(numberOfSquares, bombsAmount );
    console.log(bombsArray);

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
    
    // FUNCTIONS DOM 

    // verifica se il numero contenuto nella cella selezionata, appartiene a bombsArray.  
    function handleSquareClick() {
        
        // l'utente clicca la cella e ne leggo il contenuto
        const clickedElement = parseInt(this.querySelector('span').textContent);
        // console.log(clickedElement);

            // if true = cella colore rosso e termina partita
            // altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare 
        if ( bombsArray.includes(clickedElement) ) {
            this.classList.add('bomb');
        } else {
            this.classList.add('active');
        }     
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

/*function : createBombs
    crea un array di numeri non ripetuti che rappresentano le nostre bombe
        - maxRange = limite max del range di numeri 
        - numbersOfBombs = numero di elementi nell'array
    return : array */
function createBombs(maxRange, numbersOfBombs) {

    const bombsArray = [];
    while (bombsArray.length < numbersOfBombs) {
        // genera un numero random 
        const randomNumber = createRandomNumber(1, maxRange );

        // verifica se n contenuto in array se non è contenuto lo inseriamo all'interno
        if (!bombsArray.includes(randomNumber)) {
            bombsArray.push(randomNumber);
        }
    }
    
    return bombsArray;
}


/*function : createRandomNumber 
    Generare un numero random da min a max 
         - numero
    return numero random */
function createRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
