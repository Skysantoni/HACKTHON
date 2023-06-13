const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const conn = require('./db/conn');
const Register = require("./models/registers");
const hbs = require('hbs');
const auth = require('./middleware/auth');

const electricitydb = require('../electricity');
const waterdb = require('../water');
const lightdb = require('../light');
const airdb = require('../air');

const static_path = path.join(__dirname, "../assets");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render("pages-login");
});

app.get('/dashboard', (req, res) => {
    var Eweek = electricitydb.processWeek('2023-04-01', '2023-04-07');
    res.render("index", {
        eweek: Eweek.eweekdata,
        eweekdate: Eweek.eweekdate
    });
});


app.post('/dashboard', (req, res) => {
    var Eweek = electricitydb.processWeek(req.body.start_date, req.body.end_date);
    res.render("index", {
        eweek: Eweek.eweekdata,
        eweekdate: Eweek.eweekdate
    });

})

app.post('/processTotalElectricityWeek', (req, res) => {
    var totalweek;

    (async () => {
        try {
            totalweek = await electricitydb.processTotal(req.query.selectedOption);
            console.log(totalweek);
            res.send(totalweek.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
})
app.post('/processTotalElectricitymonth', (req, res) => {
    var totalmonth;

    (async () => {
        try {
            totalmonth = await electricitydb.processTotal(req.query.selectedOptionmonth);
            console.log(totalmonth);
            res.send(totalmonth.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
})


app.get('/water', (req, res) => {
    
    (async () => {
        try {
          const result = await waterdb.processWeek('2023-04-01', '2023-04-07');
          res.render("components-water", {
                eweek: result.eweekdata,
                eweekdate: result.eweekdate
            });

        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      })();

});


app.post('/water', (req, res) => {
 
    (async () => {
        try {
          const result = await waterdb.processWeek(req.body.start_date, req.body.end_date);
          res.render("components-water", {
                eweek: result.eweekdata,
                eweekdate: result.eweekdate
            });

        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      })();
})

app.post('/processTotalwaterWeek', (req, res) => {
    var totalweek;

    (async () => {
        try {
            totalweek = await waterdb.processTotal(req.query.selectedOption);
            console.log(totalweek);
            res.send(totalweek.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
})
app.post('/processTotalwatermonth', (req, res) => {
    var totalmonth;

    (async () => {
        try {
            totalmonth = await waterdb.processTotal(req.query.selectedOptionmonth);
            console.log(totalmonth);
            res.send(totalmonth.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
})

app.get('/light', (req, res) => {
    
    (async () => {
        try {
          const result = await lightdb.processWeek('2023-04-01', '2023-04-07');
          res.render("components-Light", {
                eweek: result.eweekdata,
                eweekdate: result.eweekdate
            });

        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      })();

});


app.post('/light', (req, res) => {
 
    (async () => {
        try {
          const result = await lightdb.processWeek(req.body.start_date, req.body.end_date);
          res.render("components-Light", {
                eweek: result.eweekdata,
                eweekdate: result.eweekdate
            });

        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      })();
})

app.post('/processTotallightWeek', (req, res) => {
    var totalweek;

    (async () => {
        try {
            totalweek = await lightdb.processTotal(req.query.selectedOption);
            console.log(totalweek);
            res.send(totalweek.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
})
app.post('/processTotallightmonth', (req, res) => {
    var totalmonth;

    (async () => {
        try {
            totalmonth = await lightdb.processTotal(req.query.selectedOptionmonth);
            console.log(totalmonth);
            res.send(totalmonth.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
});

app.get('/airquality', (req, res) => {
    
    (async () => {
        try {
          const result = await airdb.processWeek('2023-04-01', '2023-04-07');
          res.render("components-airquality", {
                eweek: result.eweekdata,
                eweekdate: result.eweekdate
            });

        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      })();

});


app.post('/airquality', (req, res) => {
 
    (async () => {
        try {
          const result = await airdb.processWeek(req.body.start_date, req.body.end_date);
          res.render("components-airquality", {
                eweek: result.eweekdata,
                eweekdate: result.eweekdate
            });

        } catch (error) {
          // Handle any errors
          console.error(error);
        }
      })();
})

app.post('/processTotalairWeek', (req, res) => {
    var totalweek;

    (async () => {
        try {
            totalweek = await airdb.processTotal(req.query.selectedOption);
            console.log(totalweek);
            res.send(totalweek.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
})
app.post('/processTotalairmonth', (req, res) => {
    var totalmonth;

    (async () => {
        try {
            totalmonth = await airdb.processTotal(req.query.selectedOptionmonth);
            console.log(totalmonth);
            res.send(totalmonth.toString());
            return;
        } catch (error) {
            console.error(error);
        }
    })();
});













app.get('/pages-register', (req, res) => {
    res.render("pages-register");
});
app.get('/components-electricity', (req, res) => {
    res.render("components-electricity");
});
app.get('/components-water', (req, res) => {
    res.render("components-water");
});
app.get('/components-airquality', (req, res) => {
    res.render("components-airquality");
});
app.get('/components-Light', (req, res) => {
    res.render("components-Light");
});


// Creating  a new user in our database 
app.post('/pages-register', async (req, res) => {
    try {
        const registerUser = new Register({
            firstname: req.body.firstname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        const registered = await registerUser.save();

        res.render("pages-login");

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/pages-login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userEMail = await Register.findOne({ email: email });
        if (userEMail.password == password) {
            res.render("index");
        }

    } catch (error) {
        res.send("Invalid");
    }
});

app.get('/logout', async (req, res) => {

    // try{
    //     res.clearCookie("jwt");
    //     await req.user.save();
    res.render("pages-login");

    // }catch(error){
    //     res.status(500).send(error);
    // }

})

app.listen(port, () => {
    console.log(`Server is running at port no ${port} `);
})