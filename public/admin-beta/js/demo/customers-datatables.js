$(document).ready(function () {
  $('#dataTable').DataTable({
    columns: [
      { data: 'name' },
      { data: 'acn' },
      { data: 'total' },
      { data: 'min' },
      { data: 'date' },
      { data: 'current' },
      { data: 'status' }
    ],
    oSearch: { "sSearch": "Running" },
    ajax: {
      url: '/api/account?type=for-table-date',
      dataSrc: ''
    }
  });
});