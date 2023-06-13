const mysql = require('mysql');
const moment = require('moment');
const con = mysql.createConnection({
    host: 'localhost',
    user: "saanvi",
    password: "root",
    database: "projectdata"
});

con.connect((err) => {
    if (err) {
        console.warn(err);
    }
    else {
        console.warn("conected");
    }
})

function processWeek(wstartdate, wenddate) {
    return new Promise((resolve, reject) => {
        var eweekresult = [];
        var edate = [];
        var startdate = wstartdate;
        var enddate = wenddate;

        var query = `SELECT airqualityindex FROM dataset WHERE date BETWEEN "${startdate}" AND "${enddate}";`;
        con.query(query, (err, results) => {
            if (err) {
                console.log('Error executing MySQL query:', err);
                reject(err);
            } else {
               
               
                eweek = JSON.parse(JSON.stringify(results));
               
                for (var i in eweek) {
                    eweekresult.push(eweek[i].airqualityindex);
                }
               
                var query2 = `SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date from dataset where date BETWEEN '${startdate}' AND '${enddate}';`;
                con.query(query2, (err, results) => {
                    if (err) {
                        console.error('Error executing MySQL query:', err);
                        reject(err);
                    } else {
                        global.edatedata = JSON.parse(JSON.stringify(results));
                        for (var i in edatedata) {
                            edate.push(edatedata[i].date);
                        }}
                        resolve({
                            eweekdata: eweekresult,
                            eweekdate: edate
                        });
                    
                });
            }
        });
    });
}

function processTotal(choice) {
    return new Promise((resolve, reject) => {
        var query;
        if (choice == "This week") {
            query = "SELECT SUM(airqualityindex) AS Total FROM dataset WHERE YEAR(date) = YEAR(CURDATE())  AND WEEK(date) = WEEK(CURDATE());";
        } else if (choice == "Previous week") {
            query = "SELECT SUM(airqualityindex) AS Total FROM dataset WHERE YEAR(date) = YEAR(CURDATE())  AND WEEK(date) = WEEK(CURDATE())-1;";
        } else if (choice == "This Month") {
            query = "SELECT SUM(airqualityindex) AS Total FROM dataset WHERE YEAR(date) = YEAR(CURDATE())  AND Month(date) = Month(CURDATE());";
        } else {
            query = "SELECT SUM(airqualityindex) AS Total FROM dataset WHERE YEAR(date) = YEAR(CURDATE())  AND Month(date) = Month(CURDATE())-1;";
        }

        con.query(query, (err, results) => {
            if (err) {
                console.error('Error executing MySQL query:', err);
                reject(err); // Reject the promise with the error
                return;
            }

            const ans = JSON.parse(JSON.stringify(results))[0].Total;
            resolve(ans); // Resolve the promise with the result
        });
    });
};



processTotal("This week");
module.exports = {
    processWeek: processWeek,
    processTotal: processTotal
};