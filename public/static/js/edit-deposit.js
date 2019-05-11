
let tr = document.getElementById('tr');
async function editDeposit(params) {
    let res = await fetch('/api/deposit');
    let json = await res.json();
    // console.log(json);
    json.forEach((e, i) => {

        // list.innerHTML += '<li>'+i+ e.name+'<li>'
        tr.innerHTML += `
                            <form id='dpsEdit-${i}' onsubmit='sendDepositData(this)' action='/api/deposit/test'>
                                <input name='_id' hidden value='${e._id}'>
                                <input name='acn' name='acn' readonly value='${e.acn}'>
                                <input name='name' readonly value='${e.name}'>
                                <input name='dBy' class='dpsEdit-${i}' readonly value='${e.dBy}'>
                                <input name='dBy' class='dpsEdit-${i}' readonly value='${e.dTo}'>
                                <input name='dTo' class='dpsEdit-${i}' readonly type='date' value='${e.date.split('T')[0]}'>
                                <input name='amount' class='dpsEdit-${i}' readonly value='${e.amount}'>
                                <input type='button' value='Edit' onclick="removeReadonly('dpsEdit-${i}')">
                                <input type='submit' value='Submit'>
                            </form><br>

        `
        // console.log(e.name);


    });
}

function removeReadonly(className) {
    let elements = document.getElementsByClassName(className);
    for (let i = 0; elements.length > i; i++) {
        console.log(elements);
        elements[i].style.border = '1px solid black';
        elements[3].focus();

        elements[i].removeAttribute('readonly');
    }
}
editDeposit();