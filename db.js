
//Database Connection
const pg = require('pg');
const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'testusersdb',
password: '338899',
port: '5432'});
//Quary commands
let sql = 
'select * from users'
//Quary Dayabase
pool.query(sql, (err, res) => {
console.log(err, res.rows);
pool.end();
});
// Result {
//   command: 'SELECT',
//   rowCount: 1,
//   oid: null,
//   rows:
//    [ { id: 1,
//        name: 'Nurul Huda\n',
//        email: 'e@t.com',
//        password: '111222' } ],
//   fields:
//    [ Field {
//        name: 'id',
//        tableID: 32770,
//        columnID: 1,
//        dataTypeID: 23,
//        dataTypeSize: 4,
//        dataTypeModifier: -1,
//        format: 'text' },
//      Field {
//        name: 'name',
//        tableID: 32770,
//        columnID: 4,
//        dataTypeID: 25,
//        dataTypeSize: -1,
//        dataTypeModifier: -1,
//        format: 'text' },
//      Field {
//        name: 'email',
//        tableID: 32770,
//        columnID: 5,
//        dataTypeID: 25,
//        dataTypeSize: -1,
//        dataTypeModifier: -1,
//        format: 'text' },
//      Field {
//        name: 'password',
//        tableID: 32770,
//        columnID: 6,
//        dataTypeID: 25,
//        dataTypeSize: -1,
//        dataTypeModifier: -1,
//        format: 'text' } ],
//   _parsers:
//    [ [Function: parseInteger],
//      [Function: noParse],
//      [Function: noParse],
//      [Function: noParse] ],
//   RowCtor: null,
//   rowAsArray: false,
//   _getTypeParser: [Function: bound ] }