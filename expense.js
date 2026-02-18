let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(){
    let text = document.getElementById("text").value;
    let incomeVal = document.getElementById("incomeInput").value;
    let expenseVal = document.getElementById("expenseInput").value;

    if(text==="") return;

    let amount = 0;
    if(incomeVal !== "") amount = +incomeVal;
    else if(expenseVal !== "") amount = -expenseVal;
    else return alert("Enter income or expense");

    transactions.push({ id: Date.now(), text, amount });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    document.getElementById("text").value="";
    document.getElementById("incomeInput").value="";
    document.getElementById("expenseInput").value="";

    updateUI();
}

function deleteTransaction(id){
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}

function updateUI(){
    let list = document.getElementById("list");
    list.innerHTML="";
    let income=0, expense=0;

    transactions.forEach(t=>{
        let li=document.createElement("li");
        li.className = t.amount>0 ? "plus" : "minus";
        li.innerHTML = `${t.text} ₹${Math.abs(t.amount)}
        <button class="deleteBtn" onclick="deleteTransaction(${t.id})">X</button>`;
        list.appendChild(li);

        if(t.amount>0) income+=t.amount;
        else expense+=t.amount;
    });

    document.getElementById("income").innerText="₹"+income;
    document.getElementById("expense").innerText="₹"+Math.abs(expense);
    document.getElementById("balance").innerText="₹"+(income+expense);
}

updateUI();
