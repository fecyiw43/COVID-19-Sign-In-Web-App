
router.post('/account', function(req,res,next){
    req.pool.getConnection(function(err,connection){
        if(err){
           res.sendStatus(500);
          next();
        }
        var ID = req.body.session.ID;
        var query = "SELECT * FROM User WHERE userID = ?";
        connection.query(query,ID, function(err,row,fields){
        document.getElementById('Firstname').placeholder = row.firstname;
        document.getElementById('Lastname').placeholder = row.lastname;
        document.getElementById('phoneNumber').placeholder = row.phoneNumber;
        document.getElementById('Email').placeholder = row.email;
        });
    });
});


function onUpdate(){
    var Firstname = document.getElementById('Firstname').value;
    var Lastname = document.getElementById('Lastname').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var Email = document.getElementById('Email').value;

    router.post('/account', function(req,res,next){
       req.pool.getConnection(function(err,connection){
           if(err){
               res.sendStatus(500);
               return;
           }
           var ID = req.body.session.ID;
           var query = "UPDATE User SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE userID = ?";
           connection.query(query,[Firstname, Lastname, phoneNumber, Email, ID], function(err, row, fields){
               connection.release();
                if(err){
                    res.sendStatus(500);
                    return;
                }
                res.json(rows);

           });
       });

    });

}