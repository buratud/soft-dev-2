const fs = require('fs')
const mysql = require('serverless-mysql');

const serverCa = [fs.readFileSync("./DigiCertGlobalRootCA.crt.pem", "utf8")];
const db = mysql({
    config: {
        host: 'mysqlmyfridge.mysql.database.azure.com',
        user: 'myfridge',
        password: 'Mysql1234',
        database: 'myFridge',
        port: '3306',
        ssl: {
            rejectUnauthorized: true,
            ca: serverCa
        }
    }
})

module.exports = {
    db,
    executeQuery: async function ({ query, values }) {
        try {
            const results = await db.query(query, values);
            await db.end();
            return results;
        } catch (error) {
            let errMsg = error.message.toString();
            let friendlyMessage = 'There are problem talking to database.';

            if (errMsg.includes('Error: connect ECONNREFUSED')) {
                friendlyMessage += ' (ECONNREFUSED)';
            } else if (errMsg.includes('Error: connect ENOENT')) {
                friendlyMessage += ' (ENOENT)';
            } else if (errMsg.includes('ER_EMPTY_QUERY')) {
                return [];
            } else if (errMsg.includes('ER_DUP_ENTRY')) {
                friendlyMessage = 'Data already exists!';
            } else if (errMsg.includes('ER_PARSE_ERROR: You have an error in your SQL syntax;')) {
                friendlyMessage += ' (SQL Syntax Error ):)';
            } else if (errMsg.includes('ER_BAD_NULL_ERROR')) {
                friendlyMessage += ' (Data cannot be NULL!)';
            }

            error.userError = friendlyMessage;
            console.error(error);
            return { error };
        }
    }
}