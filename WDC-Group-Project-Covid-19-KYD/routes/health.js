var express = require('express');
var router = express.Router();

router.post('/healthSignUp.html', function(req,res,next){
        req.pool.getConnection(function(err,connection){
            if(err){
                res.sendStatus(500);
                return;
            }

            var ID = Math.floor((Math.random() * 99999) + 10000);
            var Firstname = req.body.Firstname;
            var Lastname = req.body.LastName;
            var phoneNumber = req.body.phoneNumber;
            var Email = req.body.Email;
            var password = req.body.password;
            var HealthCode = req.body.HealthCode;

            var query = "INSERT INTO Health_Official (healthID, firstName, lastName, email, phoneNumber, password, healthCode) VALUES ("+ID+",'"+req.body.Firstname+"','"+req.body.LastName+"','"+req.body.Email+"',"+req.body.phoneNumber+",'"+req.body.password+"','"+req.body.HealthCode+"');";
            connection.query(query,function(err,row,fields){
                connection.release();
                if(err){
                    res.sendStatus(500);
                    return;
                }
                res.send("ok");

            });

        });
    });

    router.post('/NewIDChecker', function(req,res,next){
        req.pool.getConnection(function(err,connection){
            if(err){
                res.sendStatus(500);
                return;
            }
            var num = req.body.Numb;

            var query = "SELECT firstname from Health_Official WHERE healthID = ?";
            connection.query(query,[num],function(err,row,fields){
                connection.release();
                if(row[0]!=""){
                    CheckIfNewID();
                }
            });

        });
    });

    module.exports = router;