let accounts = JSON.parse(localStorage.getItem("accounts"));
localStorage.removeItem("currentAccount");
let currentAccount = null;
let pinTrials = 0;


function addNumber(number) {
    const inputLine = document.getElementById("inputLine");
    if(inputLine.value.length < 16){
        inputLine.value += number.toString();
    }
}

function deleteNumber() {
    const inputLine = document.getElementById("inputLine");
    if(inputLine.value.length > 0){
        inputLine.value = inputLine.value.slice(0, inputLine.value.length - 1);
    }
}

function enterNumber() {
    const inputLine = document.getElementById("inputLine");
    if(currentAccount == null) {
        if(inputLine.value.length != 16) {
            alert("The account number has to be 16 digits.");
            return;
        }
        for(let account of accounts) {
            if(account.accountNumber == inputLine.value) {
                currentAccount = account;
                pinTrials = 3;
                inputLine.value = "";
                document.getElementById("task").innerText = "Enter your 4 digit PIN:";
                document.getElementById("returnButton").style.display = "block";
            }
        }
        if(currentAccount == null) {
            alert("This account number is not valid");
            return;
        }
    } else {
        if(inputLine.value.length != 4) {
            alert("The PIN has to be 4 digits.");
            return;
        }
        if(inputLine.value == currentAccount.pin) {
            localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
            window.location.href = '/html/main-menu.html';
        } else {
            if( pinTrials > 1) {
                pinTrials -= 1;
                inputLine.value = "";
                alert("Wrong PIN. " + pinTrials + " attempts left.")
            } else {
                currentAccount = null;
                document.getElementById("task").innerText = "Enter your 16 digit account number or insert your card below:";
                inputLine.value = ""
                alert("Too many atempts. Card is rejected");
            }
        }
    }

}