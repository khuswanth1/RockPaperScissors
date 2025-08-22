let userScore = 0;
let computerScore = 0;
let roundCount = 0;
let gameHistory = [];

const choices = document.querySelectorAll('.choice');
const userScorePara = document.querySelector('#user-score');
const computerScorePara = document.querySelector('#computer-score');
const msg = document.querySelector('#msg');
const historyBody = document.querySelector('#history-body');
const clearHistoryBtn = document.querySelector('#clear-history');

const getComputerChoice = () => {
    const option = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return option[randomIdx];
}

const drawGame = (userChoice, computerChoice) => {
    console.log("It's a tie!");
    msg.innerText = `It's a tie! Both chose ${userChoice}`;
    msg.style.backgroundColor = "rgba(136, 165, 197, 1)";

    // Add to history
    addToHistory(userChoice, computerChoice, "Draw");

    // Add animation to choices
    document.getElementById(userChoice).classList.add('pulse');
    setTimeout(() => {
        document.getElementById(userChoice).classList.remove('pulse');
    }, 500);
}

const showWinner = (userWin, userChoice, computerChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        userScorePara.classList.add('score-update');
        setTimeout(() => userScorePara.classList.remove('score-update'), 500);

        console.log("You win!");
        msg.innerText = `You win! ${userChoice} beats ${computerChoice}`;
        msg.style.backgroundColor = "green";

        // Add to history
        addToHistory(userChoice, computerChoice, "Win");

        // Add animation to winning choice
        document.getElementById(userChoice).classList.add('pulse');
        setTimeout(() => {
            document.getElementById(userChoice).classList.remove('pulse');
        }, 500);
    } else {
        computerScore++;
        computerScorePara.innerText = computerScore;
        computerScorePara.classList.add('score-update');
        setTimeout(() => computerScorePara.classList.remove('score-update'), 500);

        console.log("You lose!");
        msg.innerText = `You lose! ${computerChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";

        // Add to history
        addToHistory(userChoice, computerChoice, "Lose");

        // Add animation to computer's winning choice
        document.getElementById(computerChoice).classList.add('pulse');
        setTimeout(() => {
            document.getElementById(computerChoice).classList.remove('pulse');
        }, 500);
    }
}

const addToHistory = (userChoice, computerChoice, result) => {
    roundCount++;
    const historyEntry = {
        round: roundCount,
        userChoice: userChoice,
        computerChoice: computerChoice,
        result: result
    };

    gameHistory.push(historyEntry);
    updateHistoryTable();
}

const updateHistoryTable = () => {
    // Clear the table body
    historyBody.innerHTML = '';

    // Add rows for each history entry
    gameHistory.forEach(entry => {
        const row = document.createElement('tr');

        // Determine CSS class based on result
        let resultClass = '';
        if (entry.result === 'Win') resultClass = 'win';
        else if (entry.result === 'Lose') resultClass = 'lose';
        else resultClass = 'draw';

        row.innerHTML = `
                    <td>${entry.round}</td>
                    <td>${capitalizeFirstLetter(entry.userChoice)}</td>
                    <td>${capitalizeFirstLetter(entry.computerChoice)}</td>
                    <td class="${resultClass}">${entry.result}</td>
                `;

        historyBody.appendChild(row);
    });

    // Scroll to the bottom of the history table
    historyBody.parentElement.scrollTop = historyBody.parentElement.scrollHeight;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const clearHistory = () => {
    gameHistory = [];
    roundCount = 0;
    updateHistoryTable();
}

const playGame = (userChoice) => {
    console.log("user choice:", userChoice);

    // Add click animation
    document.getElementById(userChoice).style.transform = "scale(0.95)";
    setTimeout(() => {
        document.getElementById(userChoice).style.transform = "scale(1.05)";
    }, 100);

    // Computer choice
    const computerChoice = getComputerChoice();
    console.log("computer choice:", computerChoice);

    if (userChoice === computerChoice) {
        // Draw
        drawGame(userChoice, computerChoice);
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = computerChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = computerChoice === "scissors" ? false : true;
        } else {
            userWin = computerChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, computerChoice);
    }
};

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Reset animations on mouse leave
choices.forEach(choice => {
    choice.addEventListener('mouseleave', () => {
        choice.style.transform = "scale(1)";
    });
});

// Clear history button event listener
clearHistoryBtn.addEventListener('click', clearHistory);