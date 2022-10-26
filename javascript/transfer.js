const account = JSON.parse(localStorage.getItem("currentAccount"));
let transactions = JSON.parse(localStorage.getItem("transactions"));
let otherAccounts = JSON.parse(localStorage.getItem("accounts"));

otherAccounts = otherAccounts.filter((otherAccount) => {
    return otherAccount.accountNumber != account.accountNumber;
});

let filteredTransactions = transactions.filter((transaction) => {
    return transaction.accountNumber == account.accountNumber;
});

let amount = 0;

window.onload = function() {
    addOptions();
}

function addOptions() {
    const fromSelect = document.getElementById("fromSelect");
    const toSelect = document.getElementById("toSelect");

    let addOption = document.createElement('option');
    addOption.value = account.accountNumber;
    addOption.innerHTML = account.accountNumber;
    fromSelect.append(addOption);

    for(const otherAccount of otherAccounts) {
        let addOption = document.createElement('option');
        addOption.value = otherAccount.accountNumber;
        addOption.innerHTML = otherAccount.accountNumber;
        toSelect.append(addOption);
    }
}

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
    const fromAccount = document.getElementById("fromSelect").value;
    const toAccount = document.getElementById("toSelect").value;

    if(floatNumber == 0 || isNaN(floatNumber))
    {
        alert("The amount can\'t be empty" )
    } else if(fromAccount == "" || toAccount == "") {
        alert("Please selcet the accounts")

    } else {
        amount = floatNumber;
        document.getElementById("numberpad").style.display = "none";
        document.getElementById("confiramtion").style.display = "block";

        document.getElementById("task").innerHTML = "Are the details correct?";
        document.getElementById("balance").innerHTML= "$" + amount;
        document.getElementById("fromAccount").innerHTML = "From: " + fromAccount;
        document.getElementById("toAccount").innerHTML = "To: " + toAccount;
    }
}

function writeTransaction() {
    const toAccount = document.getElementById("toSelect").value;
    let otherTransactions = transactions.filter((transaction) => {
        return transaction.accountNumber == toAccount;
    });

    if(filteredTransactions[filteredTransactions.length - 1].balance < amount){
        alert("Not enough funds");
        window.location.href = '/html/transfer.html';
        return;
    }

    let newTransaction = {
        accountNumber: account.accountNumber,
        date: new Date(),
        fundsOut: amount,
        fundsIn: 0,
        balance: filteredTransactions[filteredTransactions.length - 1].balance - amount
    }
    transactions.push(newTransaction);

    newTransaction = {
        accountNumber: parseInt(toAccount),
        date: new Date(),
        fundsOut: 0,
        fundsIn: amount,
        balance: otherTransactions[otherTransactions.length - 1].balance + amount
    }
    transactions.push(newTransaction)
    localStorage.setItem("transactions",JSON.stringify(transactions));

    document.getElementById("confiramtion").style.display = "none";
    document.getElementById("task").innerHTML = "Money has been withdrawn."
    document.getElementById("success").style.display = "block";
}