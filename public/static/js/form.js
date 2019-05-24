function toggle(checkboxID, toggleID) {
    var checkbox = document.getElementById(checkboxID);
    var toggle = document.getElementById(toggleID);
    updateToggle = checkbox.checked ? toggle.disabled = false : toggle.disabled = true;
}










const accountListContainer = document.querySelector('#account');
document.querySelector('#nav-home-tab').addEventListener('click', getAccounts);
document.querySelector('#nav-profile-tab').addEventListener('click', getCustomers);

async function getAccounts() {
    const accounts = await fetch('/api/account?type=short');
    const accountList = await accounts.json();
    accountListContainer.innerHTML = '<option hidden selected disabled>Choose account</option>'
    accountList.forEach(element => {
        accountListContainer.innerHTML += `<option>${element.name} - ${element.acn}</option>`
    });
}

async function getCustomers() {
    const customerListContainer = document.querySelector('#customer');
    const customers = await fetch('/api/customer');
    const customerList = await customers.json();
    customerListContainer.innerHTML = '<option hidden selected disabled>Choose account</option>'
    customerList.forEach(element => {
        customerListContainer.innerHTML += `<option>${element.name} - ${element.id}</option>`
    });
}
async function getCustomers2() {
    const customerListContainer = document.querySelector('#customer-edit');
    const customers = await fetch('/api/customer');
    const customerList = await customers.json();
    customerListContainer.innerHTML = '<option hidden selected disabled>Choose account</option>'
    customerList.forEach(element => {
        customerListContainer.innerHTML += `<option value='${element.id}'>${element.name} - ${element.id}</option>`
    });
}


getAccounts();

async function prefillCustomerEdit() {
    const customerId = document.querySelector('#customer-edit').value;
    console.log(customerId);
    const req = await fetch('/api/customer/'+customerId);
    const customerInfo = await req.json();
    console.log(customerInfo);

    document.getElementById('name').value = customerInfo.name;
    document.getElementById('address').value = customerInfo.address;
    document.getElementById('phone').value = customerInfo.phone;
    document.getElementById('email').value = customerInfo.email;
    document.getElementById('ccdate').value = customerInfo.date.split('T')[0];
    console.log(customerInfo.date.split('T')[0]);
    
    
    

    
}