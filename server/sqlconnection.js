const { Pool } = require('pg'); //had to npm install pg

const PG_URI = 'postgres://xryqbhgj:bssNj-4w1ttykBuzhXd0ZMjHeuR7EKCs@mahmud.db.elephantsql.com/xryqbhgj';

//connecting to pool to keep this one open constantly (opening/closing takes resources)
const pool = new Pool({
    connectionString: PG_URI
});


//pool.query "exported" in this way so that we can call query method. read the read.me?
//code did not respond to direct pool.query export. 
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}