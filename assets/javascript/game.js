// Add arrays with word lists
var wordList = new Array();
wordList[0] = new Array('animals', 'alligator', 'ant', 'bear', 'bee', 'bird', 'camel', 'cat', 'cheetah', 'chicken', 'chimpanzee', 'cow', 'crocodile', 'deer', 'dog', 'dolphin', 'duck', 'eagle', 'elephant', 'fish', 'fly', 'fox', 'frog', 'giraffe', 'goat', 'goldfish', 'hamster', 'hippopotamus', 'horse', 'kangaroo', 'kitten', 'leopard', 'lion', 'lizard', 'lobster', 'monkey', 'octopus', 'ostrich', 'otter', 'owl', 'oyster', 'panda', 'parrot', 'pelican', 'pig', 'pigeon', 'porcupine', 'puppy', 'rabbit', 'rat', 'reindeer', 'rhinoceros', 'rooster', 'scorpion', 'seal', 'shark', 'sheep', 'shrimp', 'snail', 'snake', 'sparrow', 'spider', 'squid', 'squirrel', 'swallow', 'swan', 'tiger', 'toad', 'tortoise', 'turtle', 'vulture', 'walrus', 'weasel', 'whale', 'wolf', 'zebra');
wordList[1] = new Array('body', 'ankle', 'arm', 'back', 'beard', 'blood', 'body', 'bone', 'brain', 'cheek', 'chest', 'chin', 'ear', 'ears', 'elbow', 'eye', 'eyes', 'face', 'feet', 'finger', 'fingers', 'flesh', 'foot', 'hair', 'hand', 'hands', 'head', 'heart', 'hip', 'knee', 'knees', 'leg', 'legs', 'lip', 'moustache', 'mouth', 'muscle', 'nail', 'neck', 'nose', 'shoulder', 'shoulders', 'skin', 'stomach', 'teeth', 'throat', 'thumb', 'thumbs', 'toe', 'toes', 'tongue', 'tooth', 'wrist');
wordList[2] = new Array('cosmetics', 'aftershave', 'body lotion', 'cream', 'deodorant', 'eyeliner', 'foundation', 'fragrance', 'lipstick', 'makeup', 'mask', 'perfume', 'shampoo', 'soap');

var player = new Array();
var activePlayers = [];
var categories = new Array();
var playerTurn = 0;
var status = 'initial';
var guessedLetter = 'unvalid' //valid or unvalid
var mode = 'group'; //group or individual
var nPlayers = null;
var remainingTotal = 3;
var elements = {
    body: document.querySelector('body'),
    wrapper: document.getElementById('wrapper'),
    player0: document.getElementById('boxP0'),
};

var app = {

    /* IX: A - GET A RANDON CATEGORY */
    setRandomCategory: () => {
        let n = Math.floor((Math.random() * wordList.length));
        return wordList[n][0].toUpperCase()
    },

    /* IX: B - GET A RANDON WORD */
    setRandomWord: (category) => {
        let catArrayNo = categories.indexOf(category);
        let length = wordList[catArrayNo].length;
        let n = Math.floor((Math.random() * length - 1) + 1);
        let word = wordList[catArrayNo][n].toUpperCase();
        return word;
    },

    /* IX: C - CREATE THE WORD TEMPLATE */
    setTemplate: (word) => {
        let j = 0;
        let arr = [];
        for (let i of word) {
            arr[j] = '_';
            j++;
        }
        return arr
    },

    /* XI - CHECK PLAYER TURN */
    checkPlayerTurn() {
        console.log('Player Turn:' + playerTurn)
        let p = activePlayers.indexOf(playerTurn)

        if (p===-1) {
            
            console.log(activePlayers)
            console.log('not found')
        } else {
            console.log('found');
            player[playerTurn].elements.box.classList.remove('off');
            // 
        }

    },        

    nextPlayer() {
        let result;
        console.log('next');
        player[playerTurn].elements.box.classList.add('off');
        if (playerTurn === activePlayers[activePlayers.length -1 ]) {
            result = activePlayers[0]
        } else {
            let n = activePlayers.indexOf(playerTurn);
            result = activePlayers[n + 1];
        }
        player[result].elements.box.classList.remove('off');


        return result;
    },

    /* XII - CHECK USER INPUT
        a. Validate if the input key is a letter
        b. Check if the letter was guessed before
        c. Update the template with right letters
        d. Get the list of guessed letters
    */
    checkInput(key) {
        // app.checkPlayerTurn();
        if (app.validateInput(key) === true) {
            if (app.addGuessList(key, playerTurn) === true) {
                app.getTemplate(playerTurn);
                app.getList(playerTurn);

                
                playerTurn = app.nextPlayer();

              

            } else {
                console.log('This letter was guessed before')
            }
            // app.addGuessList(key, playerTurn);
            // console.log(app.addGuessList(key, playerTurn));

        };
    },

    getTemplate: (playerNo) => {
        let arr = player[playerNo].word.template;
        let template = ''
        arr.forEach(element => {
            template += element;
        });
        // console.log(template);
        player[playerNo].elements.template.innerHTML = template;
        return template
    },
    getList: (playerNo) => {
        let arr = player[playerNo].word.guessedList;
        let list = ' '
        arr.forEach(element => {
            list += element + ' '
        })

        player[playerNo].elements.guessedList.innerHTML = list
    },
    validateInput: (key) => {
        if ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z") && (app.getSpecialChar(key) === false))
            return true;
    },
    getSpecialChar: (key) => {
        let modifierKeys = ['CONTROL', 'SHIFT', 'ALTGRAPH', 'CAPSLOCK', 'FN', 'ALT', 'META'];
        let specialKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWwrong', 'ARROWRIGHT', 'ENTER', ' ', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'];
        let functionalKeys = ['AUDIOVOLUMEUP', 'AudioVolumeDown', 'AudioVolumeUp', 'NumLock', 'ScrollLock', , 'Home', 'Backspace', 'End', 'Escape', 'Dead', 'PageUp', 'PageDown'];

        let x = (modifierKeys.indexOf(key));
        let y = (specialKeys.indexOf(key));
        let z = (functionalKeys.indexOf(key));

        let check = (x + y + z);

        if (x > -1 || y > -1 || z > -1) {
            return true;
        } else {
            return false;
        }
    },
    addGuessList: (key, playerNo) => {
        let arr = player[playerNo].word.guessedList;
        let n = arr.indexOf(key);
        // console.log('guess');

        if (n === -1) {
            // console.log('player' + playerNo + ':' + key + ' - true');
            arr.push(key);
            guessedLetter = 'valid'
            app.checkGuess(key, playerNo);

            return true;
        } else {
            // console.log('player' + playerNo + ':' + key + ' - false');

            guessedLetter = 'unvalid';
            return false;
        }

        // player[playerNo].elements.guessedList.innerHTML = arr;
        // console.log(player[playerNo].elements.list)

    },
    checkGuess: (key, playerNo) => {
        let n = 0;
        let count = 0;
        let arr = player[playerNo].word.selected;
        for (let l of arr) {

            if (l === key) {
                player[playerNo].word.template[n] = key;
                count += 1
            }
            n++;
        }

        if (count > 0) {
            app.addRight(playerNo, 1)
            return true;
        } else {
            app.addWrong(playerNo, 1);
            return false;
        }
    },
    addWrong: (playerNo, p) => {
        player[playerNo].score.wrong += p;
        player[playerNo].elements.wrong.innerHTML = player[playerNo].score.wrong;

        app.updateGuesses(playerNo);
        app.changeLife(playerNo, 1);
    },
    addRight: (playerNo, p) => {
        player[playerNo].score.right += p;
        player[playerNo].elements.right.innerHTML = player[playerNo].score.right;

        app.updateGuesses(playerNo);
    },
    updateGuesses: (playerNo) => {
        player[playerNo].score.guesses = player[playerNo].score.right + player[playerNo].score.wrong;
    },
    changeLife: (playerNo, p) => {
        player[playerNo].score.remaining -= p; 
        player[playerNo].elements.remaining.innerHTML = player[playerNo].score.remaining;

        app.getGameOver(playerNo);
    },
    getGameOver: (playerNo) => {
        console.log('gameover');
        console.log('playerNo:' + playerNo)
        console.log(playerTurn);
        if (player[playerNo].score.remaining === 0) {
            player[playerNo].status = 'stop';
            let box = player[playerNo].elements.box
            box.classList.add('gameOver');
            box.innerHTML = "<div class='gameOver'>Sorry, you lose!</div>";
        }
    },
}

var build = {
    // I. 1 - create the landing page with 4 player selectors
    playerSelector: () => {

        // create the title tile and append it to the main wrapper
        let divTitle = document.createElement('div');
        divTitle.classList.add('title');
        divTitle.innerHTML = '<h1>Wo_d Gu_ss G_me</h1>' +
            '<p>Select the number of players</p>';
        elements.wrapper.append(divTitle)

        // create 4 buttons for player selection
        for (let i = 0; i < 4; i++) {
            let newElement = document.createElement('button');
            newElement.classList.add('btnP' + i);
            newElement.id = (i + 1);

            let divWrapper = document.createElement('div');
            divWrapper.classList.add('inner-wrapper', 'selector');
            if ((i + 1) === 1) {
                divWrapper.innerHTML = (i + 1) + ' Player'
            } else {
                divWrapper.innerHTML = (i + 1) + ' Players'
            }
            newElement.append(divWrapper);

            elements.wrapper.append(newElement);
        }
    },

    /* II - Get the user selection
        check if the app status is its initial status
        Each button id reflect the number of players (1 - 4)
        call the next function when selecting a number of players
    */
    clickSelect() {
        if (status === 'initial') {
            n = this.id * 1;
            // console.log((n) + typeof(n));
            build.selectPlayers(n);
            // selectPlayersKey(n);
        }
    },

    /* III - Get the user selection by typing
        if the entered key is a number from 1 - 4 AND the status = initial,
        call the function selectPlayers
        Else, check if user is trying to guess a letter.
        */
    typingSelect() {
        var key = event.key.toUpperCase();
        if (status === 'initial') {
            if (key >= 1 && key <= 4) {
                build.selectPlayers(key);
            }
        } else {
            app.checkInput(key);
        }
    },

    /* IV - HIDE THE LANDING PAGE AND BUILD ALL PLAYERS CONATINERS */

    selectPlayers(key) {
        build.hide(key);
        build.divPlayer(key);
        build.createPlayer(key);
        build.setCategories();
        build.setRandomStart(key);
        build.blankTemplate(key);
        app.checkPlayerTurn();
    },

    /* V - HIDE THE TITLE TILE AND REMOVE SELECTION BUTTONS*/
    hide: (key) => {
        let selectedElement = document.querySelector('.title');
        selectedElement.classList.add('hide');

        for (let i = 0; i < 4; i++) {
            selectedElement = document.getElementById(1 + i)
            selectedElement.remove();
        }
    },

    /* VI - BUILD THE PAGE HTML */
    divPlayer: (key) => {
        for (let i = 0; i < key; i++) {

            // add players numbers into the active player list
            activePlayers[i] = i;
        

            let newElement = document.createElement('div');
            newElement.classList.add('boxP' + i, 'off');
            newElement.id = 'BoxP' + i;

            let divAvatar = document.createElement('div');
            divAvatar.classList.add('avatar');
            divAvatar.id = 'avatar-P' + i;
            divAvatar.innerHTML = 'avatar'
            newElement.append(divAvatar);

            let divRight = document.createElement('div');
            divRight.classList.add('right');
            divRight.id = 'right-P' + i;
            divRight.innerHTML = "<div class='label'>Right<br>Guesses:</div>" +
                "<div class='score' id='scoreRightP" + i + "'>0</div>"
            newElement.append(divRight);

            let divWrong = document.createElement('div');
            divWrong.classList.add('wrong');
            divWrong.id = 'wrong-P' + i;
            divWrong.innerHTML = "<div class='label'>Wrong <br> Guesses:</div>" +
                "<div class='score' id='scoreWrongP" + i + "'>0</div>"
            newElement.append(divWrong);

            let divRemaining = document.createElement('div');
            divRemaining.classList.add('remaining');
            divRemaining.id = 'remaining-P' + i;
            divRemaining.innerHTML = "<div class='label'>Remaining <br> Guesses:</div>" +
                "<div class='score' id='scoreRemainingP" + i + "'>0</div>"
            newElement.append(divRemaining);

            let divPoints = document.createElement('div');
            divPoints.classList.add('points');
            divPoints.id = 'points-P' + i;
            divPoints.innerHTML = "<div class='label'>Total <br> Points:</div>" +
                "<div class='score' id='scorePointsP" + i + "'>0</div>"
            newElement.append(divPoints);

            let divWins = document.createElement('div');
            divWins.classList.add('wins');
            divWins.id = 'wins-P' + i;
            divWins.innerHTML = "<div class='label'>Matches <br> Wins:</div>" +
                "<div class='score' id='scoreWinsP" + i + "'>0</div>"
            newElement.append(divWins);

            //Create the element displays the template of the selected word
            let divTemplate = document.createElement('div');
            divTemplate.classList.add('template');
            divTemplate.id = 'template' + i;
            newElement.append(divTemplate);

            //Create the element displays the template of the selected word
            let divList = document.createElement('div');
            divList.classList.add('list');
            divList.innerHTML = "<p>Guessed Letters:<br><span id='list" + i + "'></span></p>"
            newElement.append(divList);

            elements.wrapper.append(newElement);
        }
    },

    /* VII - CREATE PLAYER USING THE PLAYERS CONSTRUCTOR  AND CHANGE THE 
    STATUS TO STARTED */
    createPlayer: (key) => {
        for (let i = 0; i < key; i++) {
            player[i] = new playerBuilder(i);
        }
        status = 'started';
    },

    /* VIII - GET THE FIRST ITEM FOR EACH ARRAY TO CREATE THE CATEGORIES ARRAY*/
    setCategories: () => {
        for (let i = 0; i < wordList.length; i++) {
            categories[i] = wordList[i][0].toUpperCase();
        }
    },

    /* IX - SELECT A RANDOM WORD FOR EACH PLAYER */
    setRandomStart: (key) => {
        for (let i = 0; i < key; i++) {
            player[i].word.category = app.setRandomCategory();
            player[i].word.selected = app.setRandomWord(player[i].word.category);
            player[i].word.template = app.setTemplate(player[i].word.selected);

            console.log('Player ' + i + ':' + 'Category: ' + player[i].word.category + '; word: ' + player[i].word.selected);
        }
    },

    /* X - POPULATE THE SCREEN WITH THE WORD TEMPLATE _ _ _ */
    blankTemplate: (key) => {
        for (let i = 0; i < key; i++) {
            document.getElementById('template' + i).textContent = app.getTemplate(i);
        }
    },







}

/*********************************
 *          CONSTRUCTOR
 **********************************/

function playerBuilder(n) {
    this.name = 'Player ' + n;
    this.status = 'playing';
    this.word = {
        selected: null,
        category: null,
        length: null,
        template: new Array(),
        guessedList: new Array(),
    }
    this.score = {
        wrong: 0,
        right: 0,
        guesses: 0,
        remaining: remainingTotal,
        points: 0,

    }
    this.elements = {
        wrong: document.getElementById('scoreWrongP' + n),
        right: document.getElementById('scoreRightP' + n),
        wins: document.getElementById('scoreWinsP' + n),
        guessedList: document.getElementById('list' + n),
        remaining: document.getElementById('scoreRemainingP' + n),
        points: document.getElementById('scorePointsP' + n),
        template: document.getElementById('template' + n),
        box: document.getElementById('BoxP' + n)
    }

}

/************************************************************************************* */


// Listerners

/**************************************
 *  I - BUILD THE LANDING PAGE 
 * ************************************/

build.playerSelector();
// build.divPlayer(4);

/*  II - GET THE USER SELECTION ABOUT THE NUMBER OF PLAYERS  */
document.getElementById('1').addEventListener('click', build.clickSelect);
document.getElementById('2').addEventListener('click', build.clickSelect);
document.getElementById('3').addEventListener('click', build.clickSelect);
document.getElementById('4').addEventListener('click', build.clickSelect);


/* III - GET THE USER INPUT TO SELECT THE NUMBER OF PLAYERS
    OR TO GUESS A LETTER */
elements.body.addEventListener('keyup', build.typingSelect, false);
