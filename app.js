let joueur1 = true;
let gameOver = false;
let tour = 0;

let iaCheck = document.querySelector('#ia');
let newGame = document.querySelector('#newGame');
let morpionBtn = document.querySelectorAll('.mp-btn');
let morpionTableWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
    [2, 1, 0],
    [5, 4, 3],
    [8, 7, 6],
    [8, 4, 0],
    [6, 3, 0],
    [6, 4, 2],
    [7, 4, 1],
    [6, 3, 0],
    [8, 5, 2]
];




function playMorpion(element) {
    if (iaCheck.checked == true) {
        playerOne(element);
    } else {
        if (joueur1 == true) {
            playerOne(element);
        } else {
            playerTwo(element);
        }
    }
    whoWon();
}


function playerOne(element) {
    if (gameOver == false && joueur1 == true) {
        if (iaCheck.checked == true) {
            newGame.innerHTML = "Au tour de l'IA";
        } else {
            newGame.innerHTML = "Au tour du joueur 2";
        }
        element.innerHTML = "X";
        element.disabled = true;
        console.log(tour);
        tour++;
        joueur1 = false;
        whoWon();
        if (iaCheck.checked == true && tour < 8) {
            setTimeout("playerIAHard()", 1000);
        }
    }
}


function playerTwo(element) {
    if (gameOver == false) {
        newGame.innerHTML = "Au tour du joueur 1";
        element.innerHTML = "O";
        element.disabled = true;
        console.log(tour);
        tour++;
        joueur1 = true;
    }
}


function playerIAEasy() {
    if (gameOver == false) {
        let arrayIA = [];
        for (let i = 0; i < morpionBtn.length; i++) {
            if (morpionBtn[i].innerHTML == "") {
                arrayIA.push(i);
            }
        }
        let rand = getRandom(0, arrayIA.length - 1);
        newGame.innerHTML = "Au tour du joueur 1";
        morpionBtn[arrayIA[rand]].innerHTML = "O";
        morpionBtn[arrayIA[rand]].disabled = true;
        tour++;
        joueur1 = true;
        whoWon();
    }
}

function playerIAHard() {
    if (gameOver == false) {
        let arrayIA = [];
        for (let i = 0; i < morpionBtn.length; i++) {
            if (morpionBtn[i].innerHTML == "") {
                arrayIA.push(i);
            }
        }
        for (let j = 0; j < morpionTableWin.length; j++) {
            const case1 = morpionBtn[morpionTableWin[j][0]].innerHTML;
            const case2 = morpionBtn[morpionTableWin[j][1]].innerHTML;
            const case3 = morpionBtn[morpionTableWin[j][2]].innerHTML;
            if (case1 == "O" && case2 == "") {
                morpionBtn[morpionTableWin[j][1]].innerHTML = "O";
                console.log("l'ia place un second jeton");
                infoIA();
                break;
            }
            if (case2 == case3 && case2 == "O" && case1 == "") {
                morpionBtn[morpionTableWin[j][0]].innerHTML = "O";
                console.log("l'ia tente de gagner");
                infoIA();
                break;
            } else {
                if (case2 == case3 && case2 == "X" && case1 == "") {
                    morpionBtn[morpionTableWin[j][0]].innerHTML = "O";
                    console.log("l'ia tente de m'empecher de gagner");
                    infoIA();
                    break;
                }
            }
            if (case1 == case3 && case1 == "O" && case2 == "") {
                morpionBtn[morpionTableWin[j][1]].innerHTML = "O";
                console.log("l'ia tente de gagner");
                infoIA();
                break;
            } else {
                if (case1 == case3 && case1 == "X" && case2 == "") {
                    morpionBtn[morpionTableWin[j][1]].innerHTML = "O";
                    console.log("l'ia tente de m'empecher de gagner");
                    infoIA();
                    break;
                }
            } 
            if (case1 == case2 && case1 == "O" && case3 == "") {
                morpionBtn[morpionTableWin[j][2]].innerHTML = "O";
                console.log("l'ia tente de gagner");
                infoIA();
                break;
            }else {
                if (case1 == case2 && case1 == "X" && case3 == "") {
                    morpionBtn[morpionTableWin[j][2]].innerHTML = "O";
                    console.log("l'ia tente de m'empecher de gagner");
                    infoIA();
                    break;
                }
            } 
            
            
        } if (joueur1 == false) {
            console.log("l'ia fais un random");
            let rand = getRandom(0, arrayIA.length - 1);
            morpionBtn[arrayIA[rand]].innerHTML = "O";
            morpionBtn[arrayIA[rand]].disabled = true;
            infoIA();
        }

    }
}


function infoIA() {
    newGame.innerHTML = "Au tour du joueur 1";
    tour++;
    joueur1 = true;
    whoWon();
}


function whoWon() {
    for (let i = 0; i < morpionTableWin.length; i++) {
        const case1 = morpionBtn[morpionTableWin[i][0]].innerHTML;
        const case2 = morpionBtn[morpionTableWin[i][1]].innerHTML;
        const case3 = morpionBtn[morpionTableWin[i][2]].innerHTML;
        if (case1 === case2 && case2 === case3) {
            if (case1 === "X") {
                newGame.innerHTML = "Partie terminée - Joueur X gagne"
                gameOver = true;
                document.querySelector('#info-btn').innerHTML = "<button onClick='window.location.reload();'> Rejouer </button>";
                break;
            } else if (case1 === "O") {
                if (iaCheck.checked == true) {
                    newGame.innerHTML = "Partie terminée - L'IA O gagne"
                } else {
                    newGame.innerHTML = "Partie terminée - Joueur O gagne"
                }
                gameOver = true;
                document.querySelector('#info-btn').innerHTML = "<button onClick='window.location.reload();'> Rejouer </button>";
                break;
            }

        } if (tour == 9 && case1 !== case2) {
            newGame.innerHTML = "Partie terminée - Égalité"
            gameOver = true;
            document.querySelector('#info-btn').innerHTML = "<button onClick='window.location.reload();'> Rejouer </button>";
        }

    }


}


function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


