<template>
    <div class="content-wrapper">
        <div class="gradient-border">
            <h1 style="color:white;">{{ title }}</h1>
            <b>
                <p v-if="username.length != 0" style="color:lime;">Logged in as: {{username}}</p> <!-- Showing of set username -->
            </b>
        </div>
        
        <p><button class="button-link" id="start" @click="start()" v-if="hasStarted === false">Start</button></p>

        <br v-if="hasStarted === true"/> <!-- No point for these tags -- Just need to make the CSS work well -->

        <h3 v-html="randomBooleanQuestion" style="color: blue"></h3>

        <button class="button-link" id="true" @click="trueClicked()" onclick="window.location.href='#nameSection';">True</button>
        <button class="button-link" id="false" @click="falseClicked()" onclick="window.location.href='#nameSection';">False</button>

        <p><button class="button-link" id="start" @click="getRandomQuestion()" v-if="hasStarted === true">Get a new question</button></p>

        <!-- Results with v-if conditioning -->
        <h2>Results</h2>
        <h3 v-if="this.newQuestion == false" v-html="rewardMessage"  :style="[userCorrect ? {'color': 'lime'} : {'color': 'red'}]"></h3> <!-- Correct/Incorrect message for user || with conditional styling -->
        <p v-if="correctAnwsers > 0">Correct Anwsers: {{correctAnwsers}}</p>  <!-- Cant user v- html as only the value would display without text content -->
        <p v-if="incorrectAnwsers > 0">Incorrect Anwsers: {{incorrectAnwsers}}</p>  <!-- Cant user v- html as only the value would display without text content -->

        <!-- Debugging for API anwsers -->
        <h2>Debugging</h2>
        <p v-html="randomBooleanAnwser"></p>
    </div>
</template>

<style>
/* Gradient color specific to game.html */
    .gradient-border { background-image: linear-gradient(135deg, #36d1dc, #5b86e5, #2a27fd); box-shadow: 0 4px 15px 0 rgba(5, 48, 122, 0.76); }
    #start { background-image: linear-gradient(135deg, #ec38bc, #7303c0); box-shadow: 0 4px 15px 0 rgba(122, 5, 102, 0.76); }
    #true { background-image: linear-gradient(135deg, #5aff15, #00b712); box-shadow: 0 4px 15px 0 rgba(4, 135, 52, 0.76); }
    #false { background-image: linear-gradient(135deg, #fd1d1d, #b82738); box-shadow: 0 4px 15px 0 rgba(131, 0, 18, 0.76); }
</style>

<script>
    export default {
        setup() {
            let username = Vue.ref(localStorage.getItem('username')); //Get value of username from localStorage
            console.log(`Current set username: ${username.value}`); //Log username

            // Data variables
            let title = Vue.ref('True/False Question');
            let randomBooleanQuestion = Vue.ref(String(`Click above to start`));
            let rewardMessage = Vue.ref(String(``));
            let randomBooleanAnwser = Vue.ref();
            let hasStarted = Vue.ref(false);
            let correctAnwsers = Vue.ref(0);
            let incorrectAnwsers = Vue.ref(0);
            let newQuestion = Vue.ref(false);
            let userCorrect = Vue.ref();

            // Random question on aysnc promise
            let getRandomQuestion = async function() {
                this.randomBooleanQuestion = ("Fetching question...")
                let response = await fetchURL("https://opentdb.com/api.php?amount=1&type=boolean"); // API url on asycn await
                let question = response.results[0].question; // Get value of question
                let answer = response.results[0].correct_answer; // Get value of anwser
                this.randomBooleanQuestion = (question); // Set question for reative update of HTML
                this.randomBooleanAnwser = (`Anwser: ${answer}`); // Set anwser for debug
                console.log(`Question: ${this.randomBooleanQuestion}`); //Log quesition
                console.log(`Answer: ${answer}`); //Log anwser
                this.newQuestion = true; // Allow anwsering of questions so button cant be spammed
            }   

            // Start setup of API
            let start = function() {
                this.randomBooleanQuestion = (`Fetching question...`);
                this.hasStarted = true;
                this.getRandomQuestion();
                console.log(`Has started game: ${this.hasStarted}`);
            }
            
            // @click false anwser button
            let falseClicked = function() {
                if(this.randomBooleanAnwser == (`Anwser: False`) && this.newQuestion == true) {
                    this.userCorrect = true;
                    this.newQuestion = false;
                    this.correctAnwsers += 1;
                    this.rewardMessage = (`Congrats you guessed correctly!`)
                    console.log(`User: ${this.username}, anwsered: false, correct anwser: ${this.randomBooleanAnwser}`)
                } else if(this.randomBooleanAnwser == (`Anwser: True`) && this.newQuestion == true){
                    this.userCorrect = false;
                    this.newQuestion = false;
                    this.incorrectAnwsers += 1;
                    this.rewardMessage = (`Better luck next time...`)
                    console.log(`User: ${this.username}, anwsered: false, correct anwser: ${this.randomBooleanAnwser}`)
                }
            }

            // @click true anwser button
            let trueClicked = function() {
                if(this.randomBooleanAnwser == (`Anwser: True`) && this.newQuestion == true) {
                    this.userCorrect = true;
                    this.newQuestion = false;
                    this.correctAnwsers += 1;
                    this.rewardMessage = (`Congrats you guessed correctly!`)
                    console.log(`User: ${this.username}, anwsered: true, correct anwser: ${this.randomBooleanAnwser}`)
                } else if(this.randomBooleanAnwser == (`Anwser: False`) && this.newQuestion == true){
                    this.userCorrect = false;
                    this.newQuestion = false;
                    this.incorrectAnwsers += 1;
                    this.rewardMessage = (`Better luck next time...`)
                    console.log(`User: ${this.username}, anwsered: true, correct anwser: ${this.randomBooleanAnwser}`)
                }
            }

            // Return variables, computed properties and methods
            return {
                title, username, randomBooleanQuestion, randomBooleanAnwser, hasStarted, correctAnwsers, incorrectAnwsers, userCorrect, newQuestion, rewardMessage,  // Data variables
                getRandomQuestion, start, falseClicked, trueClicked, // Methods
            }
        }
    }
</script>