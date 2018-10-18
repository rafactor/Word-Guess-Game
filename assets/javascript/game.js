//
// const element = document.getElementById('wrapper');


// Add arrays with word lists
var wordList = new Array();
wordList[0] = new Array('animals', 'alligator', 'ant', 'bear', 'bee', 'bird', 'camel', 'cat', 'cheetah', 'chicken', 'chimpanzee', 'cow', 'crocodile', 'deer', 'dog', 'dolphin', 'duck', 'eagle', 'elephant', 'fish', 'fly', 'fox', 'frog', 'giraffe', 'goat', 'goldfish', 'hamster', 'hippopotamus', 'horse', 'kangaroo', 'kitten', 'leopard', 'lion', 'lizard', 'lobster', 'monkey', 'octopus', 'ostrich', 'otter', 'owl', 'oyster', 'panda', 'parrot', 'pelican', 'pig', 'pigeon', 'porcupine', 'puppy', 'rabbit', 'rat', 'reindeer', 'rhinoceros', 'rooster', 'scorpion', 'seal', 'shark', 'sheep', 'shrimp', 'snail', 'snake', 'sparrow', 'spider', 'squid', 'squirrel', 'swallow', 'swan', 'tiger', 'toad', 'tortoise', 'turtle', 'vulture', 'walrus', 'weasel', 'whale', 'wolf', 'zebra');
wordList[1] = new Array('body', 'ankle', 'arm', 'back', 'beard', 'blood', 'body', 'bone', 'brain', 'cheek', 'chest', 'chin', 'ear', 'ears', 'elbow', 'eye', 'eyes', 'face', 'feet', 'finger', 'fingers', 'flesh', 'foot', 'hair', 'hand', 'hands', 'head', 'heart', 'hip', 'knee', 'knees', 'leg', 'legs', 'lip', 'moustache', 'mouth', 'muscle', 'nail', 'neck', 'nose', 'shoulder', 'shoulders', 'skin', 'stomach', 'teeth', 'throat', 'thumb', 'thumbs', 'toe', 'toes', 'tongue', 'tooth', 'wrist');
wordList[2] = new Array('cosmetics', 'aftershave', 'body lotion', 'cream', 'deodorant', 'eyeliner', 'foundation', 'fragrance', 'lipstick', 'makeup', 'mask', 'perfume', 'shampoo', 'soap');

var player = new Array();
var categories = new Array();
var playerTurn = 0;
var status = 'initial';
var mode = 'group'; //group or individual
var nPlayers = null;
var remainingTotal = 10; 
var elements = {
    body: document.querySelector('body'),
    wrapper: document.getElementById('wrapper'),
    player0: document.getElementById('boxP0'),
};

var app = {
    hide: (key) => {
        let selectedElement = document.querySelector('.title');
        selectedElement.classList.add('hide');

        for (let i = 0; i < 4; i++) {
            selectedElement = document.getElementById(1+i)
            selectedElement.innerHTML = '';
        }
        
       


    },
    createPlayer: (key) => {
        for (let i = 0; i < key; i++) {
            player[i] = new playerBuider(i);
        }
        build.divPlayer(key);
        status = 'started';
    },
    setCategories: () => {
        for (let i = 0; i < wordList.length; i++) {
            categories[i] = wordList[i][0].toUpperCase();
        }
    },
    setRandomCategory: () => {
        let n = Math.floor((Math.random() * wordList.length));
        return wordList[n][0].toUpperCase()
    },
    setRandomWord: (category) => {
        let catArrayNo = categories.indexOf(category);
        let length = wordList[catArrayNo].length;
        let n = Math.floor((Math.random() * length - 1) + 1);
        let word = wordList[catArrayNo][n].toUpperCase();
        return word;
    },
    setRandomStart: (key) => {
        for (let i = 0; i < key; i++) {
            player[i].word.category = app.setRandomCategory();
            player[i].word.selected = app.setRandomWord(player[i].word.category);
            player[i].word.template = app.setTemplate(player[i].word.selected);
            // app.populateTemplate(i);
            console.log('Player ' + i + ':' + 'Category: ' + player[i].word.category + '; word: ' + player[i].word.selected);
            // console.log(player[i].word.template);
        }
    },
    setTemplate: (word) => {
        let j = 0;
        let arr = [];
        for (let i of word) {
            arr[j] = '_';
            j++;
        }
        return arr
    },
    getTemplate: (playerNo) => {
        let arr = player[playerNo].word.template;
        let template = ' '
        arr.forEach(element => {
            template += element;
        });

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
        let specialKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'ENTER', ' ', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7'];
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
        // console.log(n);

        if (n === -1) {
            // console.log('player' + playerNo + ':' + key + ' - true');
            arr.push(key);
            app.checkGuess(key, playerNo);
            return true;
        } else {
            // console.log('player' + playerNo + ':' + key + ' - false');
            return false;
        }

        // player[playerNo].elements.list.innerHTML = arr;
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



        // console.log(player[playerNo].word.template)
    },
    addWrong: (playerNo, p) => {
        player[playerNo].score.wrong += p;
        player[playerNo].elements.wrong.innerHTML = player[playerNo].score.wrong;

        // addTotal(playerNo);
        // player[playerNo].score.guesses = player[playerNo].score.right + player[playerNo].score.wrong;
        // player[playerNo].elements.guesses.innerHTML = player[playerNo].score.guesses;
        app.updateGuesses(playerNo);
        app.changeLife(playerNo,1);
    },
    addRight: (playerNo, p) => {
        player[playerNo].score.right += p;
        player[playerNo].elements.right.innerHTML = player[playerNo].score.right;

        app.updateGuesses(playerNo);
        // // addTotal(playerNo);
        // player[playerNo].score.guesses = player[playerNo].score.right + player[playerNo].score.wrong;
        // player[playerNo].elements.guesses.innerHTML = player[playerNo].score.guesses;
    },
    updateGuesses: (playerNo) => {
        player[playerNo].score.guesses = player[playerNo].score.right + player[playerNo].score.wrong;
        player[playerNo].elements.guesses.innerHTML = player[playerNo].score.guesses;
    },
    changeLife: (playerNo, p) => {
        player[playerNo].score.remaining -= p;  //= player[playerNo].score.remaining + 1;
        // let n = player[playerNo].score.remaining;
        // console.log('apos ' + n)
        player[playerNo].elements.remaining.innerHTML = player[playerNo].score.remaining;

        app.getGameOver(playerNo);
    },
    getGameOver: (playerNo) => {
        if (player[playerNo].score.remaining === 0) {
            // let selectedElement = document.querySelectorAll('.box.p'+playerNo+'>.inner-wrapper');
            // selectedElement.innerHTML = "game over";
            console.log('game-over')
        }
    },

}

var build = {
    //create the basic template for 4 players
    background: () => {
        for (let i = 0; i < 4; i++) {
            let newElement = document.createElement('button');
            newElement.classList.add('boxP' + i);
            newElement.id = (i + 1);

            let divWrapper = document.createElement('div');
            divWrapper.classList.add('inner-wrapper','selector');
            if ((i + 1)=== 1) {
                divWrapper.innerHTML = (i + 1) + ' Player'
            } else {
                divWrapper.innerHTML = (i + 1) + ' Players'
            }
             //+ (i===1)?' Player':;
            newElement.append(divWrapper);

            

            elements.wrapper.append(newElement);
        }
    },

    divPlayer: (key) => {
        for (let i = 0; i < key; i++) {
            let div = document.getElementById('boxP' + i);











            // let newElement = document.createElement('div');
            // newElement.classList.add('box', 'p' + i);

            // let divWrapper = document.createElement('div');
            // divWrapper.classList.add('inner-wrapper');
            // newElement.append(divWrapper);

            // let divTop = document.createElement('div');
            // divTop.classList.add('top-p' + i);
            // divTop.innerHTML = (i + 1) + ' Player';

            // divWrapper.append(divTop);

            // //Create the element displays the template of the selected word
            // let divMid1 = document.createElement('div');
            // divMid1.classList.add('middle-p' + i, 'template');
            // divWrapper.append(divMid1);

            // //Create the element that shows the label for the list of guessed letters
            // let guessedList = document.createElement('div');
            // guessedList.classList.add('middle-p' + i);
            // guessedList.innerHTML = 'Guessed Letters:'
            // divWrapper.append(guessedList);

            // //Create the element that shows list of guessed letters
            // let guessedListSpan = document.createElement('span');
            // guessedListSpan.classList.add('middle-p' + i, 'guessed-list');
            // guessedListSpan.innerHTML = ''
            // guessedList.append(guessedListSpan);

            // //Create the element that shows the number of right guesses
            // let divRight = document.createElement('div');
            // divRight.classList.add('ScoreP' + i,'label');
            // divRight.innerHTML = 'Right Guesses: ';
            // divWrapper.append(divRight);

            // let divRightSpan = document.createElement('span');
            // divRightSpan.classList.add('ScoreP' + i, 'right');
            // divRight.append(divRightSpan);

            // //Create the element that shows the number of wrong guesses
            // let divWrong = document.createElement('div');
            // divWrong.classList.add('ScoreP' + i,'label');
            // divWrong.innerHTML = 'Wrong Guesses: ';
            // divWrapper.append(divWrong);

            // let divWrongSpan = document.createElement('span');
            // divWrongSpan.classList.add('ScoreP' + i, 'wrong');
            // divWrong.append(divWrongSpan);

            // //Create the element that shows the number of total guesses
            // let divTotal = document.createElement('div');
            // divTotal.classList.add('ScoreP' + i,'label');
            // divTotal.innerHTML = 'Total Guesses: ';
            // divWrapper.append(divTotal);

            // let divTotalSpan = document.createElement('span');
            // divTotalSpan.classList.add('ScoreP' + i, 'total');
           
            // divTotal.append(divTotalSpan);

            // //Create the element that shows the number of remaining guesses
            // let divRemaining = document.createElement('div');
            // divRemaining.classList.add('ScoreP' + i,'label');
            // divRemaining.innerHTML = 'Remaining Guesses: ';
            // divWrapper.append(divRemaining);

            // let divRemainingSpan = document.createElement('span');
            // divRemainingSpan.classList.add('ScoreP' + i, 'remaining');
            // // divRemainingSpan.innerHTML = p;
            // divRemaining.append(divRemainingSpan);

            // let divBottom = document.createElement('div');
            // divBottom.classList.add('bottom-p' + i);

            // divWrapper.append(divBottom);

            // elements.wrapper.append(newElement);
        }
    },


    divTitle: () => {
        let newElement = document.createElement('div');
        newElement.classList.add('title');
        newElement.innerHTML = '<h1>Wo_d Gu_ss G_me</h1>' +
            '<p>Select the number of players</p>';

        elements.wrapper.append(newElement)
    },
    blankTemplate: (key) => {
        for (let i = 0; i < key; i++) {
            let selectedElement = document.querySelector('.middle-p' + i);
            // console.log(document.querySelector('.middle-p' + i))
            selectedElement.innerHTML = app.getTemplate(i)
        }
    }




}

function playerBuider(n) {
    this.name = 'Player ' + n;
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
        remaining: 10,
        points: 0,

    }
    this.elements = {
        wrong: document.querySelector('.ScoreP' + n + '.wrong'),
        right: document.querySelector('.ScoreP' + n + '.right'),
        guesses: document.querySelector('.ScoreP' + n + '.total'),
        guessedList: document.querySelector('.middle-p' + n + '.guessed-list'),
        remaining: document.querySelector('.ScoreP' + n + '.remaining'),
        points: null,
        template: document.querySelector('.middle-p' + n + '.template'),
    }

}

function clickSelect() {
    n = this.id * 1;
    // console.log((n) + typeof(n));
    selectPlayers(n);
    // selectPlayersKey(n);
}

function typingSelect() {
    var key = event.key.toUpperCase();
    if (status === 'initial') {
        if (key >= 1 && key <= 4) {
            selectPlayers(key);
            
        }
    } else {
        if (app.validateInput(key) === true) {

            console.log('other');
        };
    }
}


function selectPlayers(key) {
            console.log('player '+key);
            app.hide(key);
            app.createPlayer(key);
            // app.setCategories();
            // app.setRandomStart(key);
            // build.blankTemplate(key);
            // nPlayers = key;

            // console.log(status);
        // }
    // } else {
    //     if (app.validateInput(key) === true) {
    //         // app.addGuessList(key, playerTurn);
    //         // app.getTemplate(playerTurn);
    //         // app.getList(playerTurn);
    //         if (playerTurn === (nPlayers - 1)) {
    //             playerTurn = 0;
    //         } else {
    //             playerTurn++;
    //         }
    //     };
    // }
}



// Listerners
// var elements.keyPressed = document.querySelector('body');
// const initial = document.getElementById('initial');
// const player1 = 


build.background();
// build.divPlayer(4);
build.divTitle();

document.getElementById('1').addEventListener('click', clickSelect);
document.getElementById('2').addEventListener('click', clickSelect);
document.getElementById('3').addEventListener('click', clickSelect);
document.getElementById('4').addEventListener('click', clickSelect);



elements.body.addEventListener('keyup', typingSelect, false); 

