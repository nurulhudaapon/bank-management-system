async function submitter (url, data) {
  const bc = document.querySelector('#body-content');
  $('#exampleModal').modal('show');
  bc.innerHTML = `<div style='margin-left: 38%;' class='loader'></div>`
  
  const option = {method: 'POST', body: data}
  try {
		const res = await fetch(url, option);
    const text =  await res.text();
    if (res.ok) return bc.innerHTML = 'SUCCESS';
		bc.innerHTML = text;
	}
	catch(err) {bc.innerHTML = "Error, can't load: " + err}
}


const customerForm = document.querySelector('#customer-form').addEventListener('submit', function sender(e){
  e.preventDefault();
  const formData = new FormData(this);
  submitter('/api/customer', formData)
  });
const accountForm = document.querySelector('#account-form').addEventListener('submit', function sender(e){
  e.preventDefault();
  const formData = new FormData(this);
  submitter('/api/customer', formData)
  });


// for account
function postAccount() {
  $('#exampleModal').modal('show');
  let customer = document.querySelector('#customer').value;
  let min = document.querySelector('#min').value;
  let total = document.querySelector('#total').value;
  let acn = document.querySelector('#acn').value;
  let date = document.querySelector('#date').value;

  let name = customer.split(' - ')[0]
  let id = customer.split(' - ')[1]
  let data = {name, id, total, min, date};
  var url = '/api/account';
submitter(url, data)
}

// for deposit
function postDeposit() {
  $('#exampleModal').modal('show');
  let account = document.querySelector('#account').value;
  let amount = document.querySelector('#amount').value;
  let date = document.querySelector('#date').value;
  let dBy = document.querySelector('#d-by').value;
  let dTo = document.querySelector('#d-to').value;

  let name = account.split(' - ')[0]
  let acn = account.split(' - ')[1]
  let data = {name, date, amount, acn, dBy, dTo};

  var url = '/api/deposit';
submitter(url, data)
}
