router.post('/venue-info', function(req,res,next){
    req.pool.getConnection(function(err,connection){
        if(err){
           res.sendStatus(500);
          next();
        }
        var ID = req.body.session.ID;
        var query = "SELECT * FROM Venue WHERE venueCode = ?";
        connection.query(query,ID, function(err,row,fields){
        document.getElementById('venueName').placeholder = row.venueName;
        document.getElementById('GPSLocation').placeholder = row.GPSLocation;
        document.getElementById('capacity').placeholder = row.capacity;
        });
    });
});

router.post('/check-in-history', function(req,res,next){
    req.pool.getConnection(function(err,connection){
        if(err){
           res.sendStatus(500);
           return;
        }
        var ID = req.body.session.ID;
        var query = "SELECT * FROM Check_In_History, Venue WHERE ID = ?";
        connection.query(query,ID, function(err,row,fields){
        document.getElementById('time').placeholder = row.time;
        document.getElementById('')
        });
    });
});