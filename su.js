const http = require('http');
const { parse } = require('querystring');


let dbw = () => {
                 //Database Connection
const pg = require('pg');
const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'testusersdb',
password: '338899',
port: '5432'});
//Quary commands
let sql = `INSERT INTO users (name, email) VALUES (${result.fname}, ${result.age})`
//Quary Dayabase
pool.query(sql, (err, res) => {
// console.log(err, res.rows);
pool.end();
});
};






const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            dbw();
            console.log(result);

            res.end(`Parsed data belonging to ${result.fname}`);
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="fname" /><br />
                    <input type="number" name="age" /><br />
                    <input type="text" name="photo" /><br />
                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}