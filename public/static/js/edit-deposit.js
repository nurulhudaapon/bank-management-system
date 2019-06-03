
let contentp;
var customer = document.getElementById('customer');
var account = document.getElementById('account');
var deposit = document.getElementById('deposit');
var total = document.getElementById('total');
var lastDeposit = document.getElementById('last-deposit-time');



async function run2() {

    let result = await fetch('/api/statistics');
    let info = await result.json();

    // console.log(info);

    // let cdate = Date.now()
    // let ldate = new Date(info.deposits[info.deposits.length - 1].date).getTime();

    function dhm(t) {
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor((t - d * cd) / ch),
            m = Math.round((t - d * cd - h * ch) / 60000),
            pad = function (n) { return n < 10 ? '0' + n : n; };
        if (m === 60) {
            h++;
            m = 0;
        }
        if (h === 24) {
            d++;
            h = 0;
        }
        return [d+' Days '+ pad(h)+' Hours '+ pad(m)+' Minutes'];
    }

    // console.log(dhm(3 * 24 * 60 * 60 * 1000));

    total.innerText = info.total;
    customer.innerText = info.customer;
    account.innerText = info.accountCount;
    deposit.innerText = info.depositCount;
    // lastDeposit.innerText = dhm(cdate - ldate);
    // - info.deposits[info.deposits.length - 1].date
    // console.log(info.deposits[info.deposits.length - 1]);

    // contentp =document.getElementById('content').innerHTML

}
run2();


// function changeTo(c) {
//     // w3_close();
//     document.getElementById('content').innerHTML = `<iframe width="100%" height="873px" frameborder='no' src=/${c}>`
// }

// // function changeToP() {
// //     document.getElementById('content').innerHTML = contentp;
// // }

// // let tr = document.getElementById('tr');
// // function changeToD() {

// //     editDeposit();
// // }

// // --------------------------------------------



















async function editDeposit(params) {
    let res = await fetch('/api/deposit');
    let json = await res.json();
    // console.log(json);
    json.forEach((e, i) => {

        // list.innerHTML += '<li>'+i+ e.name+'<li>'
        // tr.innerHTML +=
        //  `
        //                     <form id='dpsEdit-${i}' onsubmit='sendDepositData(this)' action='/api/deposit/test'>
        //                         <input name='_id' hidden value='${e._id}'>
        //                         <input name='acn' name='acn' readonly value='${e.acn}'>
        //                         <input name='name' readonly value='${e.name}'>
        //                         <input name='dBy' class='dpsEdit-${i}' readonly value='${e.dBy}'>
        //                         <input name='dBy' class='dpsEdit-${i}' readonly value='${e.dTo}'>
        //                         <input name='dTo' class='dpsEdit-${i}' readonly type='date' value='${e.date.split('T')[0]}'>
        //                         <input name='amount' class='dpsEdit-${i}' readonly value='${e.amount}'>
        //                         <input type='button' value='Edit' onclick="removeReadonly('dpsEdit-${i}')">
        //                         <input type='submit' value='Submit'>
        //                     </form><br>

        // `
        tr.innerHTML += `
                            <form id='dpsEdit-${i}' onsubmit='sendDepositData(this)' action='/api/deposit/test'>
                                <input name='_id' hidden value='${e._id}'>
                                <input name='acn' name='acn' readonly value='${e.acn}'>
                                <input name='name' readonly value='${e.name}'>
                                <input name='dTo' class='dpsEdit-${i}' readonly type='date' value='${e.date.split('T')[0]}'>
                                <input name='amount' class='dpsEdit-${i}' readonly value='${e.amount}'>
                                <button type='button' onclick="removeReadonly('dpsEdit-${i}')"><i class="fa fa-edit fa-fw"></i></button>
                            </form><br>

        `
        // console.log(e.name);


    });
    document.getElementById('content').innerHTML = document.getElementById('tr').innerHTML;

}

function removeReadonly(className) {
    let elements = document.getElementsByClassName(className);
    for (let i = 0; elements.length > i; i++) {
        console.log(elements);
        elements[i].style.border = '1px solid black';
        elements[1].focus();

        elements[i].removeAttribute('readonly');
        
    }
    elements.innerHTML +=   `<button type='button'><i class="fa fa-edit fa-fw">fgdf</i></button>` 
}
