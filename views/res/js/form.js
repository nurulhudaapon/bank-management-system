function submitter (url, data) {
  const bc = document.querySelector('#body-content');
  bc.innerHTML = '<div class="loader" style="margin-left:38%"></div>'
  const option = {method: 'POST', body: JSON.stringify(data),headers:{'content-type': 'application/json'}}
  // fetch(url, option)
  // .then(res => res.text())
  // .then(res => bc.innerText = res)
  // .catch(error => console.error('Error:', error));
  fetch(url, option)
  .then(res => {if (res.ok){bc.innerText= 'SUCCESS!'} else {return res}})
  .then(res => res.text())
  .then(res => bc.innerText = res)
  .catch(error => console.error('Error:', error));
}

function postForm(ep) {
  $('#exampleModal').modal('show');
  let name = document.querySelector('#name').value;
  let phone = document.querySelector('#phone').value;
  let address = document.querySelector('#address').value;
  let date = document.querySelector('#date').value;
  let id = document.querySelector('#id').value;
  let formData = {name, phone, address, id, date};
  var url = '/api/'+ep;
  data = formData;
submitter(url, data)
}

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
