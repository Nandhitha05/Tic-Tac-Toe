console.log("Welcome!");

let music = new Audio("gamebeg.mp3");
let click = new Audio("bing.mp3");
let click2 = new Audio("click.mp3");
let end = new Audio("gameend.mp3");
let turn = "X";
let isgameover = false;
click2.play();

const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

const check = () => {
    let textbox = document.getElementsByClassName('textbox');
    let won = [
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135],
    ];

    won.forEach(e => {
        if((textbox[e[0]].innerText === textbox[e[1]].innerText) && 
           (textbox[e[2]].innerText === textbox[e[1]].innerText) && 
           (textbox[e[0]].innerText !== "")) 
        {
            document.querySelector('.msg').innerText = textbox[e[0]].innerText + " WON";
            isgameover = true;
            document.querySelector('.img img').style.width = "200px";
            music.play();

            Array.from(boxes).forEach(box => {
                box.removeEventListener('click', handleClick);
            });
        }
    });
};

const resetGame = () => {
    let textboxs = document.querySelectorAll('.textbox');
    Array.from(textboxs).forEach(element => {
        element.innerText = "";
    });
    end.play();
    turn = "X";
    isgameover = false;
    document.getElementsByClassName("msg")[0].innerText = "Turn: " + turn;
    document.querySelector('.img img').style.width = "0px";
};

document.getElementById('reset').addEventListener('click', () => {
    resetGame();
});

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let textbox = element.querySelector('.textbox');
    element.addEventListener('click', () => {
        if (!isgameover && textbox.innerText === '') {
            textbox.innerText = turn;
            turn = changeTurn(); 
            click.play();
            check(); 
            document.getElementsByClassName("msg")[0].innerText = "Turn: " + turn;
        }
    });
});
