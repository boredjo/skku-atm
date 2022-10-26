generateData();
window.location.href = '/html/landing-page.html';


function generateData(){
    const accounts = [
        {
            accountNumber: 1234567890123456,
            pin: 1234
        },{
            accountNumber: 9826351492635492,
            pin: 2345
        }
    ];

    const transactions = [
        {
            accountNumber: 1234567890123456,
            date: new Date(),
            fundsOut: 0,
            fundsIn: 0,
            balance: 2000
        },{
            accountNumber: 9826351492635492,
            date: new Date(),
            fundsOut: 0,
            fundsIn: 0,
            balance: 20000
        }
    ];

    localStorage.setItem("accounts", JSON.stringify(accounts));
    localStorage.setItem("transactions", JSON.stringify(transactions));
}