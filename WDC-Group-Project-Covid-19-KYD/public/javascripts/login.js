


// function Register(){
//     var Firstname = document.getElementById('Firstname').value;
//     var Lastname = document.getElementById('Lastname').value;
//     var phoneNumber = document.getElementById('phoneNumber').value;
//     var Email = document.getElementById('Email').value;
//     var password = document.getElementById('password').value;


//     router.post('/login', function(req,res,next){
//         req.pool.getConnection(function(err,connection){
//             if(err){
//                 res.sendStatus(500);
//                 return;
//             }
//             if(user_tick==true){
//                 var ID = CheckIfNewID();

//                 var query = "INSERT INTO User VALUES userID = ?, firstName = ?, lastName = ?, email = ?, phoneNumber = ?, password = ?";
//                 connection.query(query,[ID, Firstname, Lastname, Email, phoneNumber, password, HealthCode],function(err,row,fields){
//                     connection.release();
//                     if(err){
//                         res.sendStatus(500);
//                         return;
//                     }
//                 });
//             }else if(venue_tick==true){
//               var ID = "V"+CheckIfNewID();
//                 var query = "INSERT INTO Venue VALUES venueCode = ?, firstName = ?, lastName = ?, email = ?, phoneNumber = ?, password = ?";
//                 connection.query(query,[ID, Firstname, Lastname, Email, phoneNumber, password, HealthCode],function(err,row,fields){
//                     connection.release();
//                     if(err){
//                         res.sendStatus(500);
//                         return;
//                     }
//                 });
//             }else{
//                 alert("you messed up, pick a user or a venue manager");
//             }

//         });
//     });

// }

// function CheckIfNewID(personType){
//     router.post('/login', function(req,res,next){
//         req.pool.getConnection(function(err,connection){
//             if(err){
//                 res.sendStatus(500);
//                 return;
//             }

//             var newID = Math.floor((Math.random() * 99999) + 10000);

//             if(personType=="User"){
//                 newID="U"+newID;
//             var query = "SELECT firstname from User WHERE userID = ?";
//             connection.query(query,[newID],function(err,row,fields){
//                 if(!row){
//                     return newID;
//                 }else{
//                   CheckIfNewID();
//                 }
//             });
//             }else{
//                 newID="V"+newID;
//              var query = "SELECT firstname from User WHERE venueCode = ?";
//             connection.query(query,[newID],function(err,row,fields){
//                 if(!row){
//                     return newID;
//                 }else{
//                   CheckIfNewID();
//                 }
//             });
//             }
//         });

//     });
// }

// function login(){

//     let user = {
//         user: document.getElementById('EmailAddresslogin').value,
//         pass: document.getElementById('inputPasswordlogin').value
//     };


//     // Create AJAX Request
//     var xmlhttp = new XMLHttpRequest();

//     // Define function to run on response
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             alert("Welcome "+this.responseText);
//         } else if (this.readyState == 4 && this.status >= 400) {
//             alert("Login failed");
//         }
//     };


//     location.replace= "https://ide-3f676d17ef4b45a3bff14f4454896056-8080.cs50.ws/kyd.html";

//     // Open connection to server & send the post data using a POST request
//     // We will cover POST requests in more detail in week 8
//     xmlhttp.open("POST", "/kyd.html", true);
//     xmlhttp.setRequestHeader("Content-type", "application/json");
//     xmlhttp.send(JSON.stringify(user));

// }


        //   firstName: document.getElementById('FirstName_login').value,
        //   lastName: document.getElementById('LastNameLogin').value,
        //   email: document.getElementById('inputEmail').value,
        //   phoneNum: document.getElementById('phone_number').value,
        //   password: document.getElementById('inputPassword').value,



// router.post('/login', function(req, res, next) {
//   if('token' in req.body){
//       async function verify() {
//           const ticket = await client.verifyIdToken({
//               idToken: req.body.token,
//               audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//               // Or, if multiple clients access the backend:
//               //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//           });
//           const payload = ticket.getPayload();
//           if(User){
//           req.session.userID = payload['email'];
//           res.send(req.session.userID);
//           }else if(Venue){
//               req.session.venueCode = payload['email'];
//               res.send(req.session.venueCode);
//           }
//           //user needs to be changed

//           // If request specified a G Suite domain:
//           // const domain = payload['hd'];
//         }
//         verify().catch(function()res.sendStatus(401));
// });

// Verify a user is logged in before processing further routes


function logout(){

    // Create AJAX Request
    var xmlhttp = new XMLHttpRequest();

    // Define function to run on response
    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         alert("Welcome "+this.responseText);
    //     } else if (this.readyState == 4 && this.status >= 400) {
    //         alert("Login failed");
    //     }
    // };

    // Open connection to server & send the post data using a POST request
    // We will cover POST requests in more detail in week 8
    xmlhttp.open("POST", "/logout", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send();
}


/**
 *
 * Put any routes DO require authentication here
 *
 *
 */


module.exports = router ;