const account = JSON.parse(localStorage.getItem("currentAccount"));

let transactions = JSON.parse(localStorage.getItem("transactions"));

transactions = transactions.filter((transaction) => {
    return transaction.accountNumber == account.accountNumber
});


window.onload = function() {
    const balanceTable = document.getElementById("balanceTable");
    const tbody = balanceTable.getElementsByTagName("tbody")[0];
  
    for (const transaction of transactions) {
        let row = document.createElement("tr");
        let dateCell= document.createElement("td");
        let fundsOutCell = document.createElement("td");
        let fundsInCell = document.createElement("td");
        let balanceCell = document.createElement("td");
        let transactionDate = new Date(transaction.date);
        dateCell.innerHTML = transactionDate.toDateString() + ", " + transactionDate.toTimeString();
        fundsOutCell.innerHTML = transaction.fundsOut;
        fundsInCell.innerHTML = transaction.fundsIn;
        balanceCell.innerHTML = transaction.balance;
        row.appendChild(dateCell);
        row.appendChild(fundsOutCell);
        row.appendChild(fundsInCell);
        row.appendChild(balanceCell);
        tbody.appendChild(row);  
    }

    document.getElementById("balance").innerHTML =
        "Current Balance: $" + transactions[transactions.length - 1].balance;
}




/*
const objectComparisonCallback = (arrayItemA, arrayItemB) => {
    if (arrayItemA.apples < arrayItemB.apples) {
      return -1
    }
  
    if (arrayItemA.apples > arrayItemB.apples) {
      return 1
    }
  
    return 0
  }
  
  arrayOfObjects.sort(objectComparisonCallback)*/




/*
const tbody = table.getElementsByTagName("tbody")[0];
  
for (const transaction of transactions) {
    let row = document.createElement("tr");
    let dateCell= document.createElement("td");
    let fundsOutCell = document.createElement("td");
    let fundsInCell = document.createElement("td");
    let balanceCell = document.createElement("td");
    dateCell.innerHTML = transaction.date;
    fundsOutCell.innerHTML = transaction.fundsOut;
    fundsInCell.innerHTML = transaction.fundsIn;
    balanceCell.innerHTML = transaction.balance;
    row.appendChild(dateCell);
    row.appendChild(fundsOutCell);
    row.appendChild(fundsInCell);
    row.appendChild(balanceCell);
    tbody.appendChild(row);  
  }*/