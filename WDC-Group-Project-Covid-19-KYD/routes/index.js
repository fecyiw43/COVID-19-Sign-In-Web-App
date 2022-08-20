var express = require('express');
const path = require('path');
var router = express.Router();

const CLIENT_ID = '1010270953000-l383tlip3oq53eplgnvmsn3ebs4qp8pe.apps.googleusercontent.com';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
// var argon2 = require('argon2');

//ADD NEW USER/VENUE TO THE DATABASE.
router.post('/accountRegister', function(req,res,next){

    req.pool.getConnection(function(err,connection){

        if(err){
            res.sendStatus(500);
            return;
        }

        if(req.body.isUser == 1)
        {
            var userID = "u"+Math.floor((Math.random() * 99999) + 10000);
            var uQuery = "INSERT INTO User (userID, firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?, SHA2(?,224));";

            connection.query(uQuery,[userID,req.body.firstName,req.body.lastName,req.body.email,req.body.phoneNum,req.body.password], function(err,fields){
                if (err) throw err;
            });
        }
        else if(req.body.isVenue == 1)
        {
            var venueID = "v"+Math.floor((Math.random() * 99999) + 10000);
            var vQuery = "INSERT INTO Venue (venueCode, firstName, lastName, email, phoneNumber, password) VALUES (?, ?, ?, ?, ?, SHA2(?,224));";

            connection.query(vQuery,[venueID,req.body.firstName,req.body.lastName,req.body.email,req.body.phoneNum,req.body.password], function(err,fields){
                if (err) throw err;
            });
        }

    });

    res.send();
});


router.post('/login', function(req, res, next) {
     if( 'user' in req.body && 'pass' in req.body) {
        req.pool.getConnection( function(err,connection) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(req.body.user_clicked);
            console.log(req.body.venue_clicked);
            if(req.body.user_clicked == 1){
                console.log("testing 1");
                var query = `SELECT userID,firstName,lastName,email,phoneNumber
                                FROM User WHERE email = ? AND password = SHA2(?,224);`;
            }else if(req.body.venue_clicked == 1){
                console.log("testing 2");
                 query = `SELECT venueCode,firstName,lastName,email,phoneNumber
                                FROM Venue WHERE email = ? AND password = SHA2(?,224);`;
            }else if(req.body.health_off_clicked==1){
                 query = `SELECT healthID,firstName,lastName,email,phoneNumber
                                FROM Health_Official WHERE email = ? AND password = SHA2(?,224);`;
            }
            connection.query(query,[req.body.user,req.body.pass], function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(rows.length > 0){
                  req.session.user = rows[0];
                  res.json(rows[0]);
              } else {
                  res.sendStatus(401);
              }
            });
        });
    }
    // else if( 'token' in req.body ) {
    //     async function verify() {
    //       const ticket = await client.verifyIdToken({
    //              idToken: req.body.token,
    //           audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    //           // Or, if multiple clients access the backend:
    //           //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    //       });
    //       console.log("G-TEXT3");
    //       const payload = ticket.getPayload();
    //       req.pool.getConnection( function(err,connection) {
    //             if (err) {
    //                 console.log("G-TEST4");
    //                 console.log(err);
    //                 res.sendStatus(500);
    //                 return;
    //             }
    //             var query = `SELECT userID,firstName,lastName,email,phoneNumber
    //                             FROM User WHERE email = ?;`;
    //             connection.query(query,[payload['email']], function(err, rows, fields) {
    //               connection.release(); // release connection
    //               console.log("G-TEST5");
    //               if (err) {
    //                   console.log("G-TEST6");
    //                 console.log(err);
    //                 res.sendStatus(500);
    //                 return;
    //               }
    //               if(rows.length > 0){
    //                   req.session.user = rows[0];
    //                   res.json(rows[0]);
    //               } else {
    //                   res.sendStatus(401);
    //               }
    //             });
    //         });
    //     }
    //     verify().catch(function(){res.sendStatus(401);});
     else {
        res.sendStatus(400);
    }
});

// router.post('/login', function(req, res, next) {

//      console.log(req.body.user);
//      console.log(req.body.pass);

//      if( 'user' in req.body && 'pass' in req.body) {
//         req.pool.getConnection( function(err,connection) {
//             if (err) {
//                 console.log(err);
//                 res.sendStatus(500);
//                 return;
//             }
//             var query = `SELECT userID,firstName,lastName,email,phoneNumber,password
//                             FROM User WHERE email = ? AND password = SHA2(?,255);`;
//             connection.query(query,[
//                 req.body.user,
//                 req.body.pass
//                 ], function(err, rows, fields) {
//               connection.release(); // release connection
//               console.log(rows);
//               console.log("test5");
//               if (err) {
//                   console.log("test6");
//                 console.log(err);
//                 res.sendStatus(500);
//                 return;
//               }
//               if(rows.length > 0){
//                   console.log("test7");
//                   req.session.user = rows[0];
//                   res.json(rows[0]);
//               } else {
//                   res.sendStatus(401);
//               }
//             });
//         });
//     }else {
//         res.sendStatus(400);
//     }
// });

// router.post('/googlelogin',function(req,res,next){
//      if( 'token' in req.body ) {
//         async function verify() {
//           const ticket = await client.verifyIdToken({
//               idToken: req.body.token,
//               audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//               // Or, if multiple clients access the backend:
//               //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//           });
//           const payload = ticket.getPayload();
//           req.pool.getConnection( function(err,connection) {
//                 if (err) {
//                     console.log(err);
//                     res.sendStatus(500);
//                     return;
//                 }
//                 var query = `SELECT userID,firstName,lastName,email,phoneNumber
//                                 FROM User WHERE email = ?;`;
//                 connection.query(query,[payload['email']], function(err, rows, fields) {
//                   connection.release(); // release connection
//                   if (err) {
//                     console.log(err);
//                     res.sendStatus(500);
//                     return;
//                   }
//                   if(rows.length > 0){
//                       req.session.user = rows[0];
//                       res.json(rows[0]);
//                   } else {
//                       res.sendStatus(401);
//                   }
//                 });
//             });
//         }
//         verify().catch(function(){res.sendStatus(401);});
//      }else {
//         res.sendStatus(400);
//     }
// });

//CHECK A LOGGED IN USER'S ID.
router.get('/GettingId', function(req, res, send){
        var ID = req.session.ID;
        console.log(ID);
        res.send(JSON.stringify({ID:ID}));
});


router.post('/setSessionID', function(req, res, next) {
  // console.log("called");
    var email= req.body.email;
  // console.log(email);
    req.pool.getConnection( function(err,connection){
        if(err){
            console.log("sad");
        }
        console.log(req.body.Isuser);
        console.log(req.body.Isvenue);
        console.log(req.body.Ishealth);
        if(req.body.Isuser == 1){
            var query='SELECT userID FROM User WHERE email = ?;';
            connection.query(query,email, function(err,rows,fields){
                connection.release();
                if(err){
                    console.log("bad");
                }else{
                    req.session.ID=rows[0].userID;
                    req.session.save();

                console.log(req.session.ID);
                }
                    res.send();
            });
        }else if(req.body.Isvenue == 1){
            var query= 'SELECT venueCode FROM Venue WHERE email = ?;';
            connection.query(query,email, function(err,rows,fields){
                connection.release();
                if(err){
                    console.log("bad");
                }else{
                    req.session.ID=rows[0].venueCode;
                    req.session.save();

                console.log(req.session.ID);
                }
                res.send();
            });
        }else if(req.body.Ishealth == 1){
            var query='SELECT healthID FROM Health_Official WHERE email = ?;';
            connection.query(query,email, function(err,rows,fields){
                connection.release();
                if(err){
                    console.log("bad");
                }else{
                    req.session.ID=rows[0].healthID;
                    req.session.save();

                console.log(req.session.ID);
                }
                res.send();
            });
        }
    })

});


// router.use(function(req, res, next)
// {
//     console.log(req.session.user);
//     if ('user' in req.session)
//     {
//         console.log("works");
//         next() ;
//     }
//     else
//     {
//         res.sendStatus(401) ;
//     }
// });


router.get('/loadUp', function(req, res, send){
    var userID = req.session.ID;
    console.log(userID);

    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query = "SELECT Venue.venueName, Venue.longitude, Venue.latitude FROM Venue INNER JOIN Check_In_History ON Check_In_History.venueCode = Venue.venueCode WHERE Check_In_History.userID = ?;";
        connection.query(query, userID, function(err, rows, fields){
            connection.release();
            if (err) throw err;

            res.send(JSON.stringify(rows));
        });
    });
});


router.post('/forward', function(req, res, send){
    var latitude;
    var longitude;
    var location;
    var STRING_long;
    var STRING_lat;
    var sum = req.body.Address;
    var invalid = 'false';
    const request = require('request');
    var ACCESS_TOKEN = "pk.eyJ1IjoiYW5pbmRhNDAwIiwiYSI6ImNrbzg5dnNqOTEydTIycXF3Nzg5cTBoMHYifQ.z054yhzvwNzT5_D3EmWW_g";

    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
		+ encodeURIComponent(sum) + '.json?access_token='
		+ ACCESS_TOKEN + '&limit=1';

	request({ url: url, json: true }, function (error, response) {
		if (error) {
			callback('Unable to connect to Geocode API', undefined);
		} else if (response.body.features.length == 0) {
// 			callback('Unable to find location. Try to '
// 					+ 'search another location.');
		} else {

			longitude = response.body.features[0].center[0];
			latitude = response.body.features[0].center[1];
			location = response.body.features[0].place_name;

// 			console.log("Latitude :", latitude);
// 			console.log("Longitude :", longitude);
// 			console.log("Location :", location);
            STRING_long = longitude.toString();
            STRING_lat = latitude.toString();
            // console.log(STRING_long);
            // console.log(STRING_lat);
            // var total = "Longitude :" + STRING_long + " Latitude :" + STRING_lat;

            var vals = {
                longitude: longitude,
                latitude: latitude
            }

            res.send(JSON.stringify(vals));
		}
	});
});


router.post('/addToDatabase', function(req, res, send)
{
    var longitude = req.body.Longitude;
    var latitude = req.body.Latitude;

    console.log(longitude);
    console.log(latitude);

    var useID = req.session.ID;
    // var code;

    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query1 = "SELECT Venue.venueCode FROM Venue WHERE longitude = ? AND latitude = ?;";
        connection.query(query1,[longitude,latitude], function(err, rows, fields){
             connection.release();
             if (err) throw err;
             // console.log(rows);
             code = rows[0].venueCode;
             var daita = {
                code: rows[0].venueCode
             };
             // console.log(code);
             res.send(JSON.stringify(daita));
        });
    });
});

router.post('/final', function(req, res, send){

    var code = req.body.VenueCode;
    var useID = req.session.ID;

    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query2 = "INSERT INTO Check_In_History (userID, venueCode, time) VALUES (?,?,now());";
        connection.query(query2, [useID, code], function(err, rows, fields){
             if (err) throw err;
        });
        res.send();
    });
});





router.post('/reverse', function(req, res, send){
    var address;
    var longitude = req.body.Longitude;
    var latitude = req.body.Latitude;

    const request = require('request');
    var ACCESS_TOKEN = "pk.eyJ1IjoiYW5pbmRhNDAwIiwiYSI6ImNrbzg5dnNqOTEydTIycXF3Nzg5cTBoMHYifQ.z054yhzvwNzT5_D3EmWW_g";

    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
            + longitude + ', ' + latitude
            + '.json?access_token=' + ACCESS_TOKEN;
    request({ url: url, json: true }, function (error, response) {
        if (error) {
            callback('Unable to connect to Geocode API');
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try to'
                        + ' search another location.');
        } else {
            address = response.body.features[0].place_name;
            console.log("Address :", address);
            res.send(address);
        }
    });
});


//GER A USER'S CHECK-IN HISTORY.
router.get('/getCheckInData', function(req, res, send){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }

        var ID = req.session.ID;

        var query = `SELECT Check_In_History.time, Venue.venueName, Venue.isHotspot FROM Check_In_History INNER JOIN Venue ON Check_In_History.venueCode = Venue.venueCode  WHERE Check_In_History.userID = ?;`;

        connection.query(query,ID, function(err,rows,fields){

            res.send(JSON.stringify(rows));
        });
    });
});

//GER A USER'S CHECK-IN HISTORY (USED FOR HEALTH OFFICIAL MANAGEMENT PAGE).
router.post('/getCheckInData2', function(req, res, send){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }

        var ID = req.body.searchID;

        var query = `SELECT Check_In_History.time, Venue.venueName, Venue.isHotspot FROM Check_In_History INNER JOIN Venue ON Check_In_History.venueCode = Venue.venueCode  WHERE Check_In_History.userID = ?;`;

        connection.query(query,ID, function(err,rows,fields){

            res.send(JSON.stringify(rows));
        });
    });
});

//GET A VENUE'S CHECK-IN HISTORY.
router.get('/getVenueCheckIns', function(req, res, send){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }

        var venueCode = req.session.ID;

        var query = `SELECT User.userID, User.firstName, User.lastName, Check_In_History.time FROM Check_In_History INNER JOIN User ON Check_In_History.userID = User.userID WHERE Check_In_History.venueCode = ?;`;

        connection.query(query,venueCode, function(err,rows,fields){

            res.send(JSON.stringify(rows));
        });
    });
});

//GET A VENUE'S CHECK-IN HISTORY.
router.post('/getVenueCheckIns2', function(req, res, send){
    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }

        var venueCode = req.body.searchID;

        var query = `SELECT User.userID, User.firstName, User.lastName, Check_In_History.time FROM Check_In_History INNER JOIN User ON Check_In_History.userID = User.userID WHERE Check_In_History.venueCode = ?;`;

        connection.query(query,venueCode, function(err,rows,fields){

            res.send(JSON.stringify(rows));
        });
    });
});

router.get('/hotspotMarkers', function(req, res){
    var userID = req.session.ID;
    // console.log(userID);

    req.pool.getConnection(function(err,connection){
        if(err){
            res.sendStatus(500);
            return;
        }
        var query = "SELECT Venue.venueName, Venue.longitude, Venue.latitude FROM Venue INNER JOIN HotspotLocation ON Venue.venueCode = HotspotLocation.venueCode;";
        connection.query(query, userID, function(err, rows){
            connection.release();
            if (err) throw err;

            res.send(JSON.stringify(rows));
        });
    });
});

//ADD NEW HEALTH OFFICIAL TO THE DATABASE.
router.post('/healthSignUp', function(req,res,next){

    req.pool.getConnection(function(err,connection){

        if(err){
            res.sendStatus(500);
            return;
        }

        var ID = "h"+Math.floor((Math.random() * 99999) + 10000);
        var query = "INSERT INTO Health_Official (healthID, firstName, lastName, email, phoneNumber, password, healthCode) VALUES (?, ?, ?, ?, ?, SHA2(?,224), ?);";

        connection.query(query,[ID,req.body.firstName,req.body.lastName,req.body.email,req.body.phoneNum,req.body.password,req.body.healthCode], function(err,fields){
            if (err) throw err;
        });

    });

    res.send();
});

//GET VENUE DETAILS (address and capacity, we already have venueCode):
router.get('/getVenueInfo', function(req, res, next){

    var venID = req.session.ID;

    req.pool.getConnection(function(err, connection){
        if(err){
            res.sendStatus(500);
            return;
        }

        var query = 'SELECT Venue.address, Venue.capacity, Venue.venueName FROM Venue WHERE Venue.venueCode = ?;';

        connection.query(query,venID, function(err,rows,fields){
            if (err) throw (err);

            var venueData = {
                venueCode: venID,
                address: rows[0].address,
                capacity: rows[0].capacity,
                venueName: rows[0].venueName
            }

            res.send(JSON.stringify(venueData));
        });
    });
});

//UPDATE VENUE INFORMATION.
router.post('/updateVenueInfo', function(req, res, next){

    req.pool.getConnection(function(err,connection){

        if(err){
            res.sendStatus(500);
            return;
        }

        var venueCode = req.session.ID;

        // console.log(req.body.venueName);
        // console.log(req.body.capacity);
        // console.log(req.body.address);
        // console.log(req.body.longitude);
        // console.log(req.body.latitude);

        //Only add provided values to the database.
        if(req.body.venueName == 'NULL' && req.body.capacity == 'NULL' && req.body.address == 'NULL') //Don't update any values.
        {
            console.log("Nothing to change");
        }
        if(req.body.venueName != 'NULL') //Only update capacity.
        {
            var query1 = "UPDATE Venue SET venueName = ? WHERE venueCode = ?;";
            connection.query(query1,[req.body.venueName, venueCode], function(err,fields){
                if (err) throw err;
            });
        }
        if(req.body.capacity != 'NULL') //Only update venueName.
        {
            var query2 = "UPDATE Venue SET capacity = ? WHERE venueCode = ?;";
            connection.query(query2,[req.body.capacity, venueCode], function(err,fields){
                if (err) throw err;
            });
        }
        if(req.body.address != 'NULL') //Only update address.
        {
            var query3 = "UPDATE Venue SET address = ? WHERE venueCode = ?;";
            connection.query(query3,[req.body.address, venueCode], function(err,fields){
                if (err) throw err;
            });

            // longitude and latitude would be automatically updated when the address is updated.
            var query4 = "UPDATE Venue SET longitude = ? WHERE venueCode = ?;";
            connection.query(query4,[req.body.longitude, venueCode]), function(err, fields){
                if (err) throw err;
            }

            var query5 = "UPDATE Venue SET latitude = ? WHERE venueCode = ?;";
            connection.query(query5,[req.body.latitude, venueCode]), function(err, fields){
                if (err) throw err;
            }
        }
    });

    res.send();
});

//UPDATE USER ACCOUNT INFORMATION.
//UPDATE USER ACCOUNT INFORMATION.
router.post('/updateAccountInfo', function(req,res,next){

    req.pool.getConnection(function(err,connection){

        if(err){
            res.sendStatus(500);
            return;
        }

        var userID = req.session.ID;

        //CHECK IF THE ACCOUNT TO BE MODIFIED IS A NORMAL USER.
        if(userID.includes("u"))
        {
            //Only add provided values to the database.
            if(req.body.firstName == 'NULL' && req.body.lastName == 'NULL' && req.body.phoneNumber == 'NULL' && req.body.email == 'NULL' && req.body.password == 'NULL') //Don't update any values.
            {
                console.log("Nothing to change");
            }
            if(req.body.firstName != 'NULL') //Only update first name.
            {
                var query1 = "UPDATE User SET firstName = ? WHERE userID = ?;";
                connection.query(query1,[req.body.firstName, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.lastName != 'NULL') //Only update last name.
            {
                var query2 = "UPDATE User SET lastName = ? WHERE userID = ?;";
                connection.query(query2,[req.body.lastName, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.phoneNumber != 'NULL') //Only update phone number.
            {
                var query3 = "UPDATE User SET phoneNumber = ? WHERE userID = ?;";
                connection.query(query3,[req.body.phoneNumber, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.email != 'NULL') //Only update email.
            {
                var query4 = "UPDATE User SET email = ? WHERE userID = ?;";
                connection.query(query4,[req.body.email, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.password != 'NULL') //Only update password.
            {
                var query4 = "UPDATE User SET password = SHA2(?,224) WHERE userID = ?;";
                connection.query(query4,[req.body.password, userID], function(err,fields){
                    if (err) throw err;
                });
            }
        }
        //CHECK IF THE ACCOUNT TO BE MODIFIED IS A VENUE.
        else if(userID.includes("v"))
        {
            //Only add provided values to the database.
            if(req.body.firstName == 'NULL' && req.body.lastName == 'NULL' && req.body.phoneNumber == 'NULL' && req.body.email == 'NULL' && req.body.password == 'NULL') //Don't update any values.
            {
                console.log("Nothing to change");
            }
            if(req.body.firstName != 'NULL') //Only update first name.
            {
                var query1 = "UPDATE Venue SET firstName = ? WHERE venueCode = ?;";
                connection.query(query1,[req.body.firstName, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.lastName != 'NULL') //Only update last name.
            {
                var query2 = "UPDATE Venue SET lastName = ? WHERE venueCode = ?;";
                connection.query(query2,[req.body.lastName, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.phoneNumber != 'NULL') //Only update phone number.
            {
                var query3 = "UPDATE Venue SET phoneNumber = ? WHERE venueCode = ?;";
                connection.query(query3,[req.body.phoneNumber, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.email != 'NULL') //Only update email.
            {
                var query4 = "UPDATE Venue SET email = ? WHERE venueCode = ?;";
                connection.query(query4,[req.body.email, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.password != 'NULL') //Only update password.
            {
                var query4 = "UPDATE Venue SET password = SHA2(?,224) WHERE venueCode = ?;";
                connection.query(query4,[req.body.password, userID], function(err,fields){
                    if (err) throw err;
                });
            }
        }
        //CHECK IF THE ACCOUNT TO BE MODIFIED IS A HEALTH OFFICIAL.
        else if(userID.includes("h"))
        {
            //Only add provided values to the database.
            if(req.body.firstName == 'NULL' && req.body.lastName == 'NULL' && req.body.phoneNumber == 'NULL' && req.body.email == 'NULL' && req.body.password == 'NULL') //Don't update any values.
            {
                console.log("Nothing to change");
            }
            if(req.body.firstName != 'NULL') //Only update first name.
            {
                var query1 = "UPDATE Health_Official SET firstName = ? WHERE healthID = ?;";
                connection.query(query1,[req.body.firstName, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.lastName != 'NULL') //Only update last name.
            {
                var query2 = "UPDATE Health_Official SET lastName = ? WHERE healthID = ?;";
                connection.query(query2,[req.body.lastName, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.phoneNumber != 'NULL') //Only update phone number.
            {
                var query3 = "UPDATE Health_Official SET phoneNumber = ? WHERE healthID = ?;";
                connection.query(query3,[req.body.phoneNumber, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.email != 'NULL') //Only update email.
            {
                var query4 = "UPDATE Health_Official SET email = ? WHERE healthID = ?;";
                connection.query(query4,[req.body.email, userID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.password != 'NULL') //Only update password.
            {
                var query4 = "UPDATE Health_Official SET password = SHA2(?,224) WHERE healthID = ?;";
                connection.query(query4,[req.body.password, userID], function(err,fields){
                    if (err) throw err;
                });
            }
        }

    });

    res.send();
});
//ROUTE USED TO TO UPDATE ACCOUNT INFO AS A HEALTH OFFICIAL.
router.post('/updateAccountInfo2', function(req,res,send){

    req.pool.getConnection(function(err,connection){

        if(err){
            res.sendStatus(500);
            return;
        }

        var searchID = req.body.searchID;

        //CHECK IF THE ACCOUNT TO BE MODIFIED IS A NORMAL USER.
        if(searchID.includes("u"))
        {
            //Only add provided values to the database.
            if(req.body.firstName == 'NULL' && req.body.lastName == 'NULL' && req.body.phoneNumber == 'NULL' && req.body.email == 'NULL' && req.body.password == 'NULL') //Don't update any values.
            {
                console.log("Nothing to change");
            }
            if(req.body.firstName != 'NULL') //Only update first name.
            {
                var query1 = "UPDATE User SET firstName = ? WHERE userID = ?;";
                connection.query(query1,[req.body.firstName, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.lastName != 'NULL') //Only update last name.
            {
                var query2 = "UPDATE User SET lastName = ? WHERE userID = ?;";
                connection.query(query2,[req.body.lastName, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.phoneNumber != 'NULL') //Only update phone number.
            {
                var query3 = "UPDATE User SET phoneNumber = ? WHERE userID = ?;";
                connection.query(query3,[req.body.phoneNumber, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.email != 'NULL') //Only update email.
            {
                var query4 = "UPDATE User SET email = ? WHERE userID = ?;";
                connection.query(query4,[req.body.email, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.password != 'NULL') //Only update password.
            {
                var query4 = "UPDATE User SET password = ? WHERE userID = ?;";
                connection.query(query4,[req.body.password, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
        }
        //CHECK IF THE ACCOUNT TO BE MODIFIED IS A VENUE.
        else if(searchID.includes("v"))
        {
            //Only add provided values to the database.
            if(req.body.firstName == 'NULL' && req.body.lastName == 'NULL' && req.body.phoneNumber == 'NULL' && req.body.email == 'NULL' && req.body.password == 'NULL'
                && req.body.venueName == 'NULL' && req.body.venueCapacity == 'NULL' && req.body.venueLocation == 'NULL') //Don't update any values.
            {
                console.log("Nothing to change");
            }
            if(req.body.firstName != 'NULL') //Only update first name.
            {
                var query1 = "UPDATE Venue SET firstName = ? WHERE venueCode = ?;";
                connection.query(query1,[req.body.firstName, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.lastName != 'NULL') //Only update last name.
            {
                var query2 = "UPDATE Venue SET lastName = ? WHERE venueCode = ?;";
                connection.query(query2,[req.body.lastName, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.phoneNumber != 'NULL') //Only update phone number.
            {
                var query3 = "UPDATE Venue SET phoneNumber = ? WHERE venueCode = ?;";
                connection.query(query3,[req.body.phoneNumber, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.email != 'NULL') //Only update email.
            {
                var query4 = "UPDATE Venue SET email = ? WHERE venueCode = ?;";
                connection.query(query4,[req.body.email, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.password != 'NULL') //Only update password.
            {
                var query5 = "UPDATE Venue SET password = ? WHERE venueCode = ?;";
                connection.query(query5,[req.body.password, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.venueName != 'NULL') //Only update venueName.
            {
                var query6 = "UPDATE Venue SET venueName = ? WHERE venueCode = ?;";
                connection.query(query6,[req.body.venueName, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.capacity != 'NULL') //Only update venueName.
            {
                var query7 = "UPDATE Venue SET capacity = ? WHERE venueCode = ?;";
                connection.query(query7,[req.body.capacity, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
            if(req.body.venueLocation != 'NULL') //Only update venueName.
            {
                var query8 = "UPDATE Venue SET address = ? WHERE venueCode = ?;";
                connection.query(query8,[req.body.venueLocation, searchID], function(err,fields){
                    if (err) throw err;
                });
            }
        }
        //If an invalid account ID is received.
        else
        {
            console.log("Invalid user")
        }
    });

    res.send();
});
//CHECK THAT A GIVEN VENUE EXISTS.
router.post('/venueExist', function(req,res,send){

    req.pool.getConnection(function(err,connection){

        var query = "SELECT * FROM Venue WHERE venueCode = ?;";

        connection.query(query,req.body.venueCode, function(err,row,fields){
            if (err) throw err;

            //Send 0 if not found
            if(row.length == 0)
            {
                res.send('Invalid venue');
            }
            else
            {
                res.send('Yeah, this one exists');
            }
        });
    });
});

//USER CHECK IN WITH A VENUE CODE.
router.post('/checkInWithCode', function(req,res,send){

    var userID = req.session.ID;

    req.pool.getConnection(function(err,connection){

        var query = "INSERT INTO Check_In_History (userID, venueCode, time) VALUES (?, ?, now());";

        connection.query(query,[userID, req.body.venueCode], function(err,row,fields){
            if (err) throw err;

        });
    });

    res.send();
});

//CREATE A HOTSPOT (as a health official).
router.post('/createHotspot', function(req,res,send){

    var healthID = req.session.ID;

    req.pool.getConnection(function(err,connection){

        var query = 'INSERT INTO HotspotLocation (healthID, venueCode, time) VALUES (?,?,now());';

        connection.query(query,[healthID, req.body.venueCode], function(err,rows,fields){
            if (err) throw (err);
        });
    });

    res.send();
});


//UPDATE ISHOTSPOT IN VENUE
router.post('/setIsHotspot', function(req,res){

    req.pool.getConnection(function(err,connection){

        var query = 'UPDATE Venue SET isHotspot = 1 WHERE venueCode = ?;';

        connection.query(query,req.body.venueCode, function(err,rows,fields){
            if (err) throw (err);
        });
    });

    res.send();
});

router.post('/removeIsHotspot', function(req,res){

    req.pool.getConnection(function(err,connection){

        var query = 'UPDATE Venue SET isHotspot = 0 WHERE venueCode = ?;';

        connection.query(query,req.body.venueCode, function(err,rows,fields){
            if (err) throw (err);
        });
    });

    res.send();
});


//DELETE A HOTSPOT (As a health official).
router.post('/deleteHotspot', function(req,res,send){

    req.pool.getConnection(function(err,connection){

        var query = 'DELETE FROM HotspotLocation WHERE venueCode = ?;';

        connection.query(query,req.body.venueCode, function(err,fields){
            if (err) throw (err);
        });
    });

    res.send();
});


router.post('/logout', function(req, res, next) {

    delete req.session.user;
    //req.session.ID = 0;
    res.send();

});

module.exports = router;
