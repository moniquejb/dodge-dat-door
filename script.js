let pinkDoor = document.getElementById("pink-door");
let blueDoor = document.getElementById("blue-door");
let purpleDoor = document.getElementById("purple-door");
let orangeDoor = document.getElementById("orange-door");
let button = document.getElementById("button");
let toggleInstructions = document.getElementById("instructions-button");
let closeInstructions = document.getElementById("close-btn");
let currScore = document.getElementById("score1");
let highScore = document.getElementById("score2");

let newPinkDoor, newBlueDoor, newPurpleDoor, newOrangeDoor;
let hasClickedPink = false;
let hasClickedBlue = false;
let hasClickedPurple = false;
let hasClickedOrange = false;
let level = 1;
let scoreCount = 0;
let highCount = 0;

const togglePopup = () => {
    document.getElementById("popup").classList.toggle("active");
}

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const setLevel = (arr) => {
    let shuffledArr = shuffleArray(arr);
    newPinkDoor = `./images/pink-${shuffledArr[0]}.png`;
    newBlueDoor = `./images/blue-${shuffledArr[1]}.png`;
    newPurpleDoor = `./images/purple-${shuffledArr[2]}.png`;
    newOrangeDoor = `./images/orange-${shuffledArr[3]}.png`;
};

const resetDoors = () => {
    pinkDoor.src = "./images/pink-closed.png";
    blueDoor.src = "./images/blue-closed.png";
    purpleDoor.src = "./images/purple-closed.png";
    orangeDoor.src = "./images/orange-closed.png";
    hasClickedPink = false;
    hasClickedBlue = false;
    hasClickedPurple = false;
    hasClickedOrange = false;
    // button.style.width = "180px";
    // button.style.height = "45px";
    button.style.borderColor = "#615658";
    button.style.color = "#f8cf72";

    if(button.innerHTML === "Restart" || button.innerHTML === "Game Over") {
        scoreCount = 0;
        currScore.innerHTML = scoreCount;
    }

    if(button.innerHTML === "Level up!" || button.innerHTML === "Game Over" || button.innerHTML === "YOU WIN! Start again?"){
        button.innerHTML = "Restart"
        button.classList.remove('animate__animated', 'animate__heartBeat', 'animate__headShake', 'animate__slower', 'animate__tada');
    }
};

const resartOrLevelUp = () => {
    if(button.innerHTML === "Level up!" && level === 2){
        resetDoors();
        setLevel(["open", "spook", "lounge", "open-2"]);
    } else if(button.innerHTML === "Level up!" && level === 3){
        resetDoors();
        setLevel(["open", "spook", "bedroom", "open-2"]);
    } else if(button.innerHTML === "Level up!" && level === 4){
        resetDoors();
        setLevel(["open", "spook", "bathroom", "open-2"]);
    } else if(button.innerHTML === "Level up!" && level === 5){
        resetDoors();
        setLevel(["open", "spook", "hills", "open-2"]);
    }  else {
        level = 1;
        resetDoors();
        setLevel(["open", "spook", "kitchen", "open-2"]);
    }
};

const checkGameOver = (color) => {
    let setColor, setNewColor, setHasClicked;
    color === "pink" ? setColor = pinkDoor : color === "blue" ? setColor = blueDoor : color === "orange" ? setColor = orangeDoor : setColor = purpleDoor;
    color === "pink" ? setNewColor = newPinkDoor : color === "blue" ? setNewColor = newBlueDoor : color === "orange" ? setNewColor = newOrangeDoor : setNewColor = newPurpleDoor;
    color === "pink" ? setHasClicked = hasClickedPink : color === "blue" ? setHasClicked = hasClickedBlue : color === "orange" ? setHasClicked = hasClickedOrange : setHasClicked = hasClickedPurple;

    if(setNewColor === `./images/${color}-spook.png` && setHasClicked){
        setColor.src = `./images/spook-gameover.png`;
    } else if(setNewColor === `./images/${color}-open.png` && setHasClicked){
        setColor.src = `./images/open-gameover.png`;
    } else if(setNewColor === `./images/${color}-open-2.png` && setHasClicked){
        setColor.src = `./images/open-gameover.png`;
    } else {
        setColor.src = `./images/${color}-gameover.png`;
        color === "pink" ? hasClickedPink = true : color === "blue" ? hasClickedBlue = true : color === "orange" ? hasClickedOrange = true : hasClickedPurple = true;
    }
};

const gameOver = () => {
    button.innerHTML = "Game Over"
    // button.style.width = "180px";
    button.classList.add('animate__animated', 'animate__headShake', 'animate__slower');
    button.style.borderColor = "#ba2025";
    button.style.color = "white";

    checkGameOver('pink');
    checkGameOver('blue');
    checkGameOver('purple');
    checkGameOver('orange');
};

const addToScore = () => {
    scoreCount++;
    currScore.innerHTML = scoreCount;

    if(highCount < scoreCount) {
        highCount = scoreCount;
        highScore.innerHTML = highCount;
    }
};

const checkClearedLevel = (color) => {
    let setColor, setNewColor, setHasClicked;
    color === "pink" ? setColor = pinkDoor : color === "blue" ? setColor = blueDoor : color === "orange" ? setColor = orangeDoor : setColor = purpleDoor;
    color === "pink" ? setNewColor = newPinkDoor : color === "blue" ? setNewColor = newBlueDoor : color === "orange" ? setNewColor = newOrangeDoor : setNewColor = newPurpleDoor;
    color === "pink" ? setHasClicked = hasClickedPink : color === "blue" ? setHasClicked = hasClickedBlue : color === "orange" ? setHasClicked = hasClickedOrange : setHasClicked = hasClickedPurple;

    if(setNewColor == `./images/${color}-kitchen.png` && setHasClicked){
        setColor.src = `./images/kitchen-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-lounge.png` && setHasClicked){
        setColor.src = `./images/lounge-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-bedroom.png` && setHasClicked){
        setColor.src = `./images/bedroom-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-bathroom.png` && setHasClicked){
        setColor.src = `./images/bathroom-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-hills.png` && setHasClicked){
        setColor.src = `./images/hills-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-open.png` && setHasClicked){
        setColor.src = `./images/open-levelup.png`;
    } else if(setNewColor === `./images/${color}-open-2.png` && setHasClicked){
        setColor.src = `./images/open-levelup.png`;
    } else {
        setColor.src = `./images/${color}-levelup.png`;
        color === "pink" ? hasClickedPink = true : color === "blue" ? hasClickedBlue = true :  color === "orange" ? hasClickedOrange = true : hasClickedPurple = true;
    }
};

const clearedNotWon = () => {
    button.innerHTML = "Level up!";
    button.style.borderColor = "#7dc35f";
    button.style.color = "white";
    button.classList.add('animate__animated', 'animate__heartBeat');
    level++;
};

const clearedLevel = () => {
    checkClearedLevel('pink');
    checkClearedLevel('blue');
    checkClearedLevel('purple');
    checkClearedLevel('orange');
};

const winGame = () => {
    button.classList.add('animate__animated', 'animate__tada');
    // button.style.width = "300px";
    button.style.borderColor = "#f8cf72";
    button.innerHTML = "YOU WIN! Start again?";
};

const clickColor = (color) => {
    let setColor, setNewColor, setHasClicked;
    color === "pink" ? setColor = pinkDoor : color === "blue" ? setColor = blueDoor : color === "orange" ? setColor = orangeDoor : setColor = purpleDoor;
    color === "pink" ? setNewColor = newPinkDoor : color === "blue" ? setNewColor = newBlueDoor : color === "orange" ? setNewColor = newOrangeDoor : setNewColor = newPurpleDoor;
    color === "pink" ? setHasClicked = hasClickedPink : color === "blue" ? setHasClicked = hasClickedBlue : color === "orange" ? setHasClicked = hasClickedOrange : setHasClicked = hasClickedPurple;

    if(!setHasClicked){
        setColor.src = setNewColor;
        color === "pink" ? hasClickedPink = true : color === "blue" ? hasClickedBlue = true : color === "orange" ? hasClickedOrange = true : hasClickedPurple = true;
        if(setNewColor === `./images/${color}-spook.png`){
            gameOver();
        } else if([`./images/${color}-kitchen.png`, `./images/${color}-lounge.png`, `./images/${color}-bedroom.png`, `./images/${color}-bathroom.png`].includes(setNewColor))
           /* setNewColor === `./images/${color}-kitchen.png` ||
            setNewColor === `./images/${color}-lounge.png` ||
            setNewColor === `./images/${color}-bedroom.png` ||
            setNewColor === `./images/${color}-bathroom.png`)*/{
            clearedLevel();
            clearedNotWon();
        } else if (setNewColor === `./images/${color}-hills.png`){
            clearedLevel();
            winGame();
        }
    }
};

setLevel(["open", "spook", "kitchen", "open-2"]);

button.addEventListener("click", resartOrLevelUp);

toggleInstructions.addEventListener("click", togglePopup);

closeInstructions.addEventListener("click", togglePopup);

pinkDoor.addEventListener("click", function clickPink() {
    clickColor('pink');
});
blueDoor.addEventListener("click", function clickBlue() {
    clickColor('blue');
});
purpleDoor.addEventListener("click", function clickPurple() {
    clickColor('purple');
});
orangeDoor.addEventListener("click", function clickOrange() {
    clickColor('orange');
});