
function main(url, id) {
    async function submitter(url, data) {
        const bc = document.querySelector('#body-content');
        $('#exampleModal').modal('show');
        bc.innerHTML = "<div style='margin-left: 38%;' class='loader'></div>"

        const option = { method: 'POST', body: data }
        try {
            const res = await fetch(url, option);
            if (res.ok) {
                const json = await res.json();
                if (json.amount) return bc.innerHTML = 'SUCCESS! Amount Added: ' + json.amount + ' Taka';
                if (json.acn) return bc.innerHTML = 'SUCCESS! Your ACN: ' + json.acn;
                if (json.id) return bc.innerHTML = 'SUCCESS! Your ID: ' + json.id;
            }
            bc.innerHTML = await res.text();
        }
        catch (err) { bc.innerHTML = "Error, can't load: " + err }
    }
    if (!document.getElementById(id)) return;
    document.getElementById(id).addEventListener('submit', function sender(e) {
        e.preventDefault();
        const formData = new FormData(this);
        submitter(url, formData)
    });
}

main('/api/account', 'account-form')
main('/api/customer', 'customer-form')
main('/api/deposit', 'deposit-form')
