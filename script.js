let pinkDoor = document.getElementById("pink-door");
let blueDoor = document.getElementById("blue-door");
let purpleDoor = document.getElementById("purple-door");
let orangeDoor = document.getElementById("orange-door");
let button = document.getElementById("button");
let toggleInstructions = document.getElementById("instructions-button");
let closeInstructions = document.getElementById("close-btn");
let currScore = document.getElementById("score1");
let highScore = document.getElementById("score2");
let doorsArr = document.getElementById('door-group').children;

let newPinkDoor, newBlueDoor, newPurpleDoor, newOrangeDoor;
let hasClickedPink = false;
let hasClickedBlue = false;
let hasClickedPurple = false;
let hasClickedOrange = false;
let gameoverDoors = ["", "", "", ""];
let levelUpDoors = ["", "", "", ""];
let level = 1;
let scoreCount = 0;
let highCount = 0;

// Image preloader
const preloadAndSet = async (images) => {
    let load = images.map(async a => {
        let img = new Image();
        img.src = a;
        return await new Promise(res => {
            img.onload = () => res(img);
        }) 
    })
        
    const results = await Promise.all(load);

    for (var i = 0; i < doorsArr.length; i++) {
        doorsArr[i].setAttribute("src", images[i]);
        }
}

// Toggle instructions pop up window
const togglePopup = () => {
    document.getElementById("popup").classList.toggle("active");
}

// Randomise selection
const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

// Place randomised selection according to door color and level
const setLevel = (arr) => {
    let shuffledArr = shuffleArray(arr);
    newPinkDoor = `./images/pink-${shuffledArr[0]}.png`;
    newBlueDoor = `./images/blue-${shuffledArr[1]}.png`;
    newPurpleDoor = `./images/purple-${shuffledArr[2]}.png`;
    newOrangeDoor = `./images/orange-${shuffledArr[3]}.png`;
};

// Reset door images, has clicked status, styles and buttons
const resetDoors = () => {
    let initialDoorImages = ["./images/pink-closed.png", "./images/blue-closed.png", "./images/orange-closed.png", "./images/purple-closed.png"];
    preloadAndSet(initialDoorImages);
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

// Check if reset or level up scenario and either reset or set up & move to next level
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

// Check status of each door to determine which gameover image to set
const checkGameOver = (color) => {
    let setColor, setNewColor, setHasClicked, colorIndex;
    
    color === "pink" ? setColor = pinkDoor : color === "blue" ? setColor = blueDoor : color === "orange" ? setColor = orangeDoor : setColor = purpleDoor;
    color === "pink" ? setNewColor = newPinkDoor : color === "blue" ? setNewColor = newBlueDoor : color === "orange" ? setNewColor = newOrangeDoor : setNewColor = newPurpleDoor;
    color === "pink" ? setHasClicked = hasClickedPink : color === "blue" ? setHasClicked = hasClickedBlue : color === "orange" ? setHasClicked = hasClickedOrange : setHasClicked = hasClickedPurple;
    color === "pink" ? colorIndex = 0 : color === "blue" ? colorIndex = 1 : color === "orange" ? colorIndex = 2 : colorIndex = 3;

    if(setNewColor === `./images/${color}-spook.png` && setHasClicked){
        gameoverDoors[colorIndex] = `./images/spook-gameover.png`;
    } else if(setNewColor === `./images/${color}-open.png` && setHasClicked){
        gameoverDoors[colorIndex] = `./images/open-gameover.png`;
    } else if(setNewColor === `./images/${color}-open-2.png` && setHasClicked){
        gameoverDoors[colorIndex] = `./images/open-gameover.png`;
    } else {
        gameoverDoors[colorIndex] = `./images/${color}-gameover.png`;
        color === "pink" ? hasClickedPink = true : color === "blue" ? hasClickedBlue = true : color === "orange" ? hasClickedOrange = true : hasClickedPurple = true;
    }
};

// Initiate gameover routine
const gameOver = () => {
    checkGameOver('pink');
    checkGameOver('blue');
    checkGameOver('orange');
    checkGameOver('purple');
    preloadAndSet(gameoverDoors);

    button.innerHTML = "Game Over"
    button.classList.add('animate__animated', 'animate__headShake', 'animate__slower');
    button.style.borderColor = "#ba2025";
    button.style.color = "white";
};

// Increment score
const addToScore = () => {
    scoreCount++;
    currScore.innerHTML = scoreCount;

    if(highCount < scoreCount) {
        highCount = scoreCount;
        highScore.innerHTML = highCount;
    }
};

// Check status of each door to determine which level up image to set
const checkClearedLevel = (color) => {
    let setColor, setNewColor, setHasClicked, colorIndex;
    color === "pink" ? setColor = pinkDoor : color === "blue" ? setColor = blueDoor : color === "orange" ? setColor = orangeDoor : setColor = purpleDoor;
    color === "pink" ? setNewColor = newPinkDoor : color === "blue" ? setNewColor = newBlueDoor : color === "orange" ? setNewColor = newOrangeDoor : setNewColor = newPurpleDoor;
    color === "pink" ? setHasClicked = hasClickedPink : color === "blue" ? setHasClicked = hasClickedBlue : color === "orange" ? setHasClicked = hasClickedOrange : setHasClicked = hasClickedPurple;
    color === "pink" ? colorIndex = 0 : color === "blue" ? colorIndex = 1 : color === "orange" ? colorIndex = 2 : colorIndex = 3;

    if(setNewColor == `./images/${color}-kitchen.png` && setHasClicked){
        levelUpDoors[colorIndex] = `./images/kitchen-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-lounge.png` && setHasClicked){
        levelUpDoors[colorIndex] = `./images/lounge-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-bedroom.png` && setHasClicked){
        levelUpDoors[colorIndex] = `./images/bedroom-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-bathroom.png` && setHasClicked){
        levelUpDoors[colorIndex] = `./images/bathroom-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-hills.png` && setHasClicked){
        levelUpDoors[colorIndex] = `./images/hills-levelup.png`;
        addToScore();
    } else if(setNewColor == `./images/${color}-open.png` && setHasClicked){
        levelUpDoors[colorIndex] = `./images/open-levelup.png`;
    } else if(setNewColor === `./images/${color}-open-2.png` && setHasClicked){
        levelUpDoors[colorIndex] = `./images/open-levelup.png`;
    } else {
        levelUpDoors[colorIndex] = `./images/${color}-levelup.png`;
        color === "pink" ? hasClickedPink = true : color === "blue" ? hasClickedBlue = true :  color === "orange" ? hasClickedOrange = true : hasClickedPurple = true;
    }
};

// Check if level was cleared but game not completed
const clearedNotWon = () => {
    button.innerHTML = "Level up!";
    button.style.borderColor = "#7dc35f";
    button.style.color = "white";
    button.classList.add('animate__animated', 'animate__heartBeat');
    level++;
};

// Initiate cleared level routine
const clearedLevel = () => {
    checkClearedLevel('pink');
    checkClearedLevel('blue');
    checkClearedLevel('purple');
    checkClearedLevel('orange');
    preloadAndSet(levelUpDoors);
};

// Initiate game completed routine
const winGame = () => {
    button.classList.add('animate__animated', 'animate__tada');
    button.style.borderColor = "#f8cf72";
    button.innerHTML = "YOU WIN! Start again?";
};

// Determine what happens when a door is clicked
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
        } else if([`./images/${color}-kitchen.png`, `./images/${color}-lounge.png`, `./images/${color}-bedroom.png`, `./images/${color}-bathroom.png`].includes(setNewColor)) {
            clearedLevel();
            clearedNotWon();
        } else if (setNewColor === `./images/${color}-hills.png`){
            clearedLevel();
            winGame();
        }
    }
};

// Set correct door types for first level
setLevel(["open", "spook", "kitchen", "open-2"]);

// -- Event listeners --
// Toggle instructions pop up window
toggleInstructions.addEventListener("click", togglePopup);
closeInstructions.addEventListener("click", togglePopup);

// Reset on click
button.addEventListener("click", resartOrLevelUp);


// Individual door event listeners
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
