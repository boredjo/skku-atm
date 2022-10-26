const account = JSON.parse(localStorage.getItem("currentAccount"));
let transactions = JSON.parse(localStorage.getItem("transactions"));

let filteredTransactions = transactions.filter((transaction) => {
    return transaction.accountNumber == account.accountNumber
});

let amount = 0;


function addNumber(number) {
    const inputLine = document.getElementById("inputLine");
    if (number == ".") {
        document.getElementById("numberpadDot").style.backgroundColor = "dimgray";
        if (inputLine.value.indexOf('.') > -1 ) {
            return;
        }
        else if (inputLine.value.length == 0) {
            inputLine.value = "0."
            return;
        }
    } else if (inputLine.value.indexOf('.') > -1 && inputLine.value.indexOf('.') + 2 < inputLine.value.length ) {
        return;
    }

    inputLine.value += number.toString();
}

function deleteNumber() {
    const inputLine = document.getElementById("inputLine");
    if(inputLine.value.length > 0){
        inputLine.value = inputLine.value.slice(0, inputLine.value.length - 1);
    }
    if (inputLine.value.indexOf('.') == -1 ) {
        document.getElementById("numberpadDot").style.backgroundColor = "lightgray";
    }
}

function enterNumber() {
    const floatNumber = parseFloat(document.getElementById("inputLine").value);
    if(floatNumber == 0 || isNaN(floatNumber))
    {
        alert("The amount can\'t be empty" )
    }

    amount = floatNumber;
    document.getElementById("numberpad").style.display = "none";
    document.getElementById("confiramtion").style.display = "block";
    document.getElementById("task").innerHTML = "Are you sure you want to deposit the amount specified?"
    document.getElementById("balance").innerHTML= "$" + amount + "?"
}

function writeTransaction() {
    let newTransaction = {
        accountNumber: account.accountNumber,
        date: new Date(),
        fundsOut: 0,
        fundsIn: amount,
        balance: filteredTransactions[filteredTransactions.length - 1].balance + amount
    }
    transactions.push(newTransaction);
    localStorage.setItem("transactions",JSON.stringify(transactions));

    document.getElementById("confiramtion").style.display = "none";
    document.getElementById("task").innerHTML = "Money has been deposited"
    document.getElementById("success").style.display = "block";
    
}