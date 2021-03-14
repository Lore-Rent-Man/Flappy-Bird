function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let randomNumber = getRandomInt(10) + 1;

let guess = prompt("Guess a number between 1 through 10");

if(randomNumber == guess){
    console.log("Good Work");
}
else
{
    console.log("Not matched");
}