<template>
    <div class="content-wrapper">
        <div class="gradient-border">
            <h1 style="color:white;">{{ title }}</h1>
            <b>
                <p v-if="username.length != 0" style="color:lime;">Logged in as: {{username}}</p> <!-- Showing of set username -->
            </b>
        </div>

        <!-- Start buttons and new question -->
        <p><button class="button-link" id="start" @click="start()" v-if="hasStarted === false">Start</button></p>
        <p><button class="button-link" id="start" @click="getRandomQuestion()" v-if="hasStarted === true">Get a new question</button></p>

        <p v-if="hasStarted === true" v-html="question"></p>
        <p><input type="number" v-model="guess" v-if="hasStarted === true"/></p>
        <button @click="checkGuess()" class="button-link" id="guess" v-if="hasStarted === true">Make Guess</button>
        <!-- Debugging section -->

        <!-- Results with v-if conditioning -->
        <h2>Results</h2>
        <h3 v-if="this.newQuestion == false" v-html="rewardMessage"  :style="[userCorrect ? {'color': 'lime'} : {'color': 'red'}]"></h3> <!-- Correct/Incorrect message for user || with conditional styling -->
        
        <h2>Debugging</h2>
        <p>
            <strong>Answer: </strong>{{answerOf}}<br/>
            <strong>Previous guesses: </strong>{{previousGuesses }}<br/>
            <strong>Is the guess valid? </strong>{{ validGuess }}<br/>
            <strong>Has it already been guessed? </strong>{{ alreadyGuessed }}<br/>
            <strong>Message to display: </strong>{{ message }}<br/>
        </p>
    </div>
</template>

<style>
/* Gradient color specific to game.html */
    .gradient-border { background-image: linear-gradient(135deg, #4568DC, #C95FCB, #FF67A2, #FF8E77, #FFC45E, #F9F871) }
    #start { background-image: linear-gradient(135deg, #4568DC, #C95FCB, #FF67A2, #FF8E77); box-shadow: 0 4px 15px 0 rgba(122, 5, 102, 0.76); }
    #guess { background-image: linear-gradient(135deg, #5aff15, #00b712); box-shadow: 0 4px 15px 0 rgba(4, 135, 52, 0.76); }
</style>

<script>
    export default {
        setup() {
            // Username setup
            let username = Vue.ref(localStorage.getItem('username')); //Get value of username from localStorage
            console.log("Current set username: " + username.value);

            // Data variables
            let max = Vue.ref();
            let title = Vue.ref('Guess the anwser');
            let answer = Vue.ref(0);
            let guess = Vue.ref();
            let previousGuesses = Vue.ref([]);
            let hasStarted = Vue.ref(false);
            let newQuestion = Vue.ref(false);
            let correctAnwsers = Vue.ref(0);
            let incorrectAnwsers = Vue.ref(0);
            let rewardMessage = Vue.ref(String(``));
            let userCorrect = Vue.ref(false);
            let message = Vue.ref("");
            let quesition = Vue.ref("");
            let randQuest = Vue.ref();
            let randAnws = Vue.ref();
            let answerOf = Vue.ref();
            let question = Vue.ref();

            // Computed properties
            let validGuess = Vue.computed(function() {
                if (guess.value >=0 && guess.value <= max.value) {
                    return true;
                } else {
                    return false;
                }
            });

            let alreadyGuessed = Vue.computed(function() {
                console.log("valid")
                if (previousGuesses.value.includes(guess.value)) {
                    return true;
                } else {
                    return false;
                }
            });

            let messageReaponase = function() {
                if (!validGuess.value) {
                    previousGuesses.value.push(guess.value);
                    this.userCorrect = false;
                    this.rewardMessage = (`Please enter a valid guess between 1 and ${max.value}`);
                } else if (this.alreadyGuessed.value) {
                    previousGuesses.value.push(guess.value);
                    this.userCorrect = false;
                    this.rewardMessage = (`You have already guessed this number!`);
                } else if (this.answerOf > guess.value) {
                    previousGuesses.value.push(guess.value);
                    this.userCorrect = false;
                    this.rewardMessage = (`higher...`);
                } else if (this.answerOf < guess.value){
                    previousGuesses.value.push(guess.value);
                    this.userCorrect = false;
                    this.rewardMessage = (`lower...`);
                } else {
                    this.rewardMessage = (`Congrats you guessed correctly!`);
                    this.userCorrect = true;
                }
            };

            let start = function() {
                this.newQuestion == true;
                this.hasStarted = true;
                this.getRandomQuestion();
                console.log(`Has started game: ${this.hasStarted}`);
            }

            let getRandomQuestion = function() {
                this.message = "";
                guess.value = 0;
                previousGuesses.value = [];
                let dataList = Vue.ref(["In the bible, how many Plagues of Egypt were there?", 10, "Which number Apollo mission was the spaceflight that landed the first two men on the Moon?", 4, "Which number Pennsylvania Avenue is the formal address of the White House?", 1600, "Charles Atlas marketed his fitness program for the 'how many' pound weakling?", 97, "How much is in a Baker's Dozen?", 13, "If an internet user follows a broken or dead link, they will typically find an error page with which number error message?", 404, "How how many landlocked countries are there in South America?", 2, "On most phones, what number key also features the letters M, N, and O?", 6,
                    "In inches, how high is a table tennis net?", 6, "What do the sum of all the numbers on a roulette wheel add up to?", 666,
                    "How many yards are there in a mile?", 1760, "President Obama was what number President of the United States?", 44, "What is an ogdoad?", 8, "The EU Flag consists of a circle of how many golden stars?", 12
                ]);
                console.log(dataList.value)
                answer.value = Math.floor( Math.random() * 27 / 2 ) * 2; // Halves range to get even .No

                this.question = dataList.value[(answer.value)]; // Get value of question
                this.answerOf = dataList.value[(answer.value + 1)]; // Get value of anwser
                console.log(`Question: ${this.question}`); //Log quesition
                this.max = (this.answerOf + 10);
                console.log(`Answer: ${this.answerOf}`); //Log anwser
                this.newQuestion = true;
            }

            let checkGuess = function () {
                if (validGuess.value && !alreadyGuessed.value) {
                    this.message = (`You have guessed ${guess.value}. The answer is ${this.answerOf}`);
                    this.messageReaponase();
                    console.log("value of new question: " + this.newQuestion)
                    this.newQuestion = false;
                }
            }

        // Return variables, computed properties and methods
        return {
            title, max, answer, guess, previousGuesses, username, hasStarted, correctAnwsers, incorrectAnwsers, newQuestion, rewardMessage, userCorrect, quesition, randQuest, randAnws, question, answerOf, // Data variables
            validGuess, alreadyGuessed, messageReaponase, message, // Computed properties
            start, checkGuess, getRandomQuestion // Methods
        }
        } 
    }
</script>