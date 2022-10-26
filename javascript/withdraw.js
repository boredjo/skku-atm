const account = JSON.parse(localStorage.getItem("currentAccount"));
let transactions = JSON.parse(localStorage.getItem("transactions"));

let filteredTransactions = transactions.filter((transaction) => {
    return transaction.accountNumber == account.accountNumber
});

let amount = 0;



function withdraw(selectedAmount) {
    amount = selectedAmount;
    document.getElementById("quick-links").style.display = "none";
    document.getElementById("task").innerHTML = "Are you sure you want to withdraw the amount specified?"
    document.getElementById("balance").innerHTML= "$" + amount + "?"
    document.getElementById("confiramtion").style.display = "block";
}
 
function addNumber(number) {
    const inputLine = document.getElementById("inputLine");
    if(parseFloat(inputLine.value) + number  <= 500 && parseFloat(inputLine.value) + number >= 0){
        inputLine.value = parseFloat(inputLine.value) + number;
    }
}

function enterNumber() {
    let inputAmount = parseFloat(document.getElementById("inputLine").value);
    if (inputAmount == 0) { return;}
    else if (inputAmount <= 500 && inputAmount > 0){
        withdraw(inputAmount);
    } else {
        alert("The maximum withdraw is $500.");
    }
}


function writeTransaction() {


    if(filteredTransactions[filteredTransactions.length - 1].balance < amount){
        alert("Not enough funds");
        amount = 0;
        document.getElementById("quick-links").style.display = "block";
        document.getElementById("confiramtion").style.display = "none";
        document.getElementById("task").innerHTML = "Enter the amount to withdraw:"
        document.getElementById("success").style.display = "none";
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
    localStorage.setItem("transactions",JSON.stringify(transactions));

    document.getElementById("confiramtion").style.display = "none";
    document.getElementById("task").innerHTML = "Money has been withdrawn."
    document.getElementById("success").style.display = "block";
}