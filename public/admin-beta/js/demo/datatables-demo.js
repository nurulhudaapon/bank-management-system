// Call the dataTables jQuery plugin
async function getAccounts() {
  const accounts = await fetch('/api/account?type=for-table-date');
  const accountList = await accounts.json();
  console.log(accountList);
  

$(document).ready(function () {
  $('#dataTable').DataTable({
    data: accountList,
    columns: [
        { data: 'name' },
        { data: 'acn' },
        { data: 'total' },
        { data: 'min' },
        { data: 'date' },
        { data: 'current' }
    ]

  }
  );
});
}
getAccounts()