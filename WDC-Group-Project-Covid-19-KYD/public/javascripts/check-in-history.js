var checkInData, tableBody;

router.get('/check-in-history', function(req,res,next){
  req.pool.getConnection(function(err,connection){
      if(err){
         res.sendStatus(500);
         return;
      }
      var ID = req.body.session.ID;
      var query = `SELECT CONCAT('[', curly_brackets, ']') AS square_brackets FROM
                    (
                      SELECT GROUP_CONCAT('{', section1, '}' SEPARATOR ',') AS curly_brackets FROM
                      (
                        SELECT
                          CONCAT
                          (
                            '"time":', '"', Check_In_History.time, '"', ','
                            '"venueName":', '"', Venue.venueName, '"', ','
                            '"isHotspot":', '"', Venue.isHotspot, '"', ','
                          ) AS section1
                        FROM Check_In_History INNER JOIN Venue ON Check_In_History.venueCode = Venue.venueCode  WHERE Check_In_History.userID = ?
                      ) AS json_stuff
                    ) AS more_json_stuff;`;
      connection.query(query,ID, function(err,rows,fields){

        checkInData = rows;

      });

      tableBody = document.createElement('tbody');

      var i;
      for(i = 0; i < time.length; i++){
      // var v_name = "SELECT venueName FROM Venue INNER HotspotLocation ON Venue.venueCode = HotspotLocation.venueCode;";
          //Create Elements.
          var row = document.createElement('tr');
          var col1 = document.createElement('th');
          var col2 = document.createElement('td');
          var col3 = document.createElement('td');
          var col4 = document.createElement('td');

          //Insert data
          col1.innerText = i+1;
          col2.innerText = checkInData.time[i];
          col3.innerText = checkInData.venueName[i];
          col4.innerText = checkInData.isHotspot[i];

          //Append columns to row.
          row.appendChild(col1);
          row.appendChild(col2);
          row.appendChild(col3);
          row.appendChild(col4);

          //Append row to tableBody.
          tableBody.appendChild(row);
      }
  });

  res.send(tableBody);

});
