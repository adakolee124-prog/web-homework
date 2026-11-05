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
