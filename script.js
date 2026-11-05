// ==========================================================================
// Assignment 4.1: Foundational JavaScript Core Exercises
// ==========================================================================

// 1. Reverse a String
function reverseString(str) {
    return str.split("").reverse().join("");
}

// 2. Check for Palindrome
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cleanStr === cleanStr.split("").reverse().join("");
}

// 3. Find the Largest Number in an Array
function findLargestNumber(arr) {
    return Math.max(...arr);
}

// 4. Count Vowels in a String
function countVowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

// 5. Calculate a Factorial
function calculateFactorial(num) {
    if (num < 0) return undefined;
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
}

// 6. Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// 7. Produce FizzBuzz
function fizzBuzz(limit) {
    let outputs = [];
    for (let i = 1; i <= limit; i++) {
        if (i % 3 === 0 && i % 5 === 0) outputs.push("FizzBuzz");
        else if (i % 3 === 0) outputs.push("Fizz");
        else if (i % 5 === 0) outputs.push("Buzz");
        else outputs.push(i);
    }
    return outputs;
}

// 8. Remove Duplicates from an Array
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// 9. Sum Every Even Number in an Array
function sumEvenNumbers(arr) {
    return arr.reduce((sum, num) => num % 2 === 0 ? sum + num : sum, 0);
}

// 10. Capitalize Every Word in a Sentence
function capitalizeWords(sentence) {
    return sentence
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// ==========================================================================
// EXECUTION AND CONSOLE LOG TESTING TRACES
// ==========================================================================
console.log("--- 4.1 Algorithm Challenge Verifications ---");
console.log("Reverse 'hello' ->", reverseString("hello"));
console.log("Is 'racecar' a palindrome? ->", isPalindrome("racecar"));
console.log("Largest number in array [10, 5, 23, 14] ->", findLargestNumber([10, 5, 23, 14]));
console.log("Vowel count in 'Adakole' ->", countVowels("Adakole"));
console.log("Factorial of 5 ->", calculateFactorial(5));
console.log("30°C in Fahrenheit ->", celsiusToFahrenheit(30));
console.log("FizzBuzz first 15 numbers ->", fizzBuzz(15));
console.log("Clean array without duplicates [1, 2, 2, 3, 4, 4] ->", removeDuplicates([1, 2, 2, 3, 4, 4]));
console.log("Sum of evens in array [1, 2, 3, 4, 5, 6] ->", sumEvenNumbers([1, 2, 3, 4, 5, 6]));
console.log("Capitalized sentence ->", capitalizeWords("learning code is awesome"));

// ==========================================================================
// Assignment 4.2: Number Guessing Game Engine (Console Only)
// ==========================================================================

function runNumberGuessingGame(simulatedGuesses) {
    // 1. The computer picks a secret number between 1 and 100
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let gameOver = false;

    console.log("\n--- 🎮 Starting a New Number Guessing Game (1-100) ---");
    // For testing visibility, uncomment the next line if you want to see the target:
    // console.log("(Psst... The secret number is: " + secretNumber + ")");

    // 2. Process our list of guesses step-by-step
    for (let i = 0; i < simulatedGuesses.length; i++) {
        let currentGuess = simulatedGuesses[i];
        attempts++;
        
        console.log("Attempt #" + attempts + " | User guessed: " + currentGuess);

        if (currentGuess === secretNumber) {
            console.log("🎉 CORRECT! The secret number was indeed " + secretNumber + ".");
            console.log("🏆 It took you a total of " + attempts + " attempts to win the game!");
            gameOver = true;
            break;
        } else if (currentGuess < secretNumber) {
            console.log("❌ Too LOW! Try a higher number.");
        } else {
            console.log("❌ Too HIGH! Try a lower number.");
        }
    }

    if (!gameOver) {
        console.log("⚠️ Game Over! You ran out of your simulated guesses list before finding " + secretNumber + ".");
    }
}

// ==========================================================================
// RUN THE GAME WITH A SIMULATED USER USER INPUT ROW
// ==========================================================================
// Let's simulate a user making adjustments to narrow down a guess:
const myTestGuesses =;
runNumberGuessingGame(myTestGuesses);

// ==========================================================================
// Assignment 4.3: Student Grade Manager (Modern ES6 Array Methods)
// ==========================================================================

// 1. Defining the Core Dataset Array using Student Objects
const studentDataset = [
    { name: "Adakole", scores: [88, 92, 95, 90] },
    { name: "Sarah", scores: [76, 85, 80, 88] },
    { name: "Michael", scores: [95, 98, 92, 96] },
    { name: "Blessing", scores: [82, 79, 85, 84] },
    { name: "David", scores: [68, 72, 75, 70] }
];

// 2. Compute individual student averages using .reduce()
function calculateStudentAverages(students) {
    return students.map(student => {
        const totalSum = student.scores.reduce((sum, score) => sum + score, 0);
        const average = totalSum / student.scores.length;
        return { name: student.name, averageScore: Math.round(average * 10) / 10 };
    });
}

// 3. Find the absolute top performing student using .reduce()
function findTopStudent(studentsWithAverages) {
    return studentsWithAverages.reduce((topStudent, currentStudent) => {
        return currentStudent.averageScore > topStudent.averageScore ? currentStudent : topStudent;
    });
}

// 4. Find all students above the total class average using .filter() and .reduce()
function getStudentsAboveClassAverage(studentsWithAverages) {
    // Calculate total combined score average for the whole classroom block
    const grandTotal = studentsWithAverages.reduce((sum, student) => sum + student.averageScore, 0);
    const classAverage = grandTotal / studentsWithAverages.length;
    
    console.log("Global Class Average Baseline:", Math.round(classAverage * 10) / 10);
    
    // Filter out only students who match or beat the metric line
    return studentsWithAverages.filter(student => student.averageScore > classAverage);
}

// ==========================================================================
// RUN LOG OPERATIONS FOR CORE TESTING EVALUATION
// ==========================================================================
console.log("\n--- 📊 Starting Student Grade Manager Execution ---");

// Step A: Map out names side-by-side with calculated averages
const averagesList = calculateStudentAverages(studentDataset);
console.log("Calculated Student Averages:", averagesList);

// Step B: Extract the single highest matching record
const championStudent = findTopStudent(averagesList);
console.log(`🏆 Top Performing Student: ${championStudent.name} with an average of ${championStudent.averageScore}`);

// Step C: Filter lists downward to filter out elite tier nodes
const honorsList = getStudentsAboveClassAverage(averagesList);
console.log("Students Scoring Above Class Average:", honorsList);

// ==========================================================================
// Assignment 4.4: Rock, Paper, Scissors Game (5-Round Match)
// ==========================================================================

function playRockPaperScissors() {
    const choices = ["rock", "paper", "scissors"];
    let userScore = 0;
    let computerScore = 0;

    console.log("\n--- 🥊 Starting Rock, Paper, Scissors Match (Best of 5 Rounds) ---");

    for (let round = 1; round <= 5; round++) {
        // 1. Simulate a random choice for the user and computer for console testing
        const userChoice = choices[Math.floor(Math.random() * choices.length)];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        console.log(`\n--- Round ${round} ---`);
        console.log(`User Choice: ${userChoice.toUpperCase()} vs Computer Choice: ${computerChoice.toUpperCase()}`);

        // 2. Evaluate round results
        if (userChoice === computerChoice) {
            console.log("Result: It's a tie for this round!");
        } else if (
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            console.log("Result: You win this round! 🎉");
            userScore++;
        } else {
            console.log("Result: Computer wins this round! ❌");
            computerScore++;
        }

        // Display current running tally score
        console.log(`Current Score -> User: ${userScore} | Computer: ${computerScore}`);
    }

    // 3. Declare the absolute ultimate match winner after 5 rounds
    console.log("\n=================================");
    console.log("       FINAL MATCH RESULT        ");
    console.log("=================================");
    console.log(`Final Tally -> User: ${userScore} | Computer: ${computerScore}`);

    if (userScore === computerScore) {
        console.log("🏁 Overall Match Result: The entire game is a dead tie!");
    } else if (userScore > computerScore) {
        console.log("🏆 Overall Match Result: Congratulations! You beat the computer! 🏆");
    } else {
        console.log("💀 Overall Match Result: The computer wins the match. Better luck next time!");
    }
}

// ==========================================================================
// RUN THE GAME AUTOMATICALLY FOR CONSOLE INSPECTION
// ==========================================================================
playRockPaperScissors();
