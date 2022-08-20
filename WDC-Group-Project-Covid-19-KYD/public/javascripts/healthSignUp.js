

function CheckIfNewID(){
    var xhttp =  new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
        }else if(this.readyState == 4 && this.status >= 400){
            alert("failed");
        }
    };
    var num = Math.floor((Math.random() * 99999) + 10000);
    num ="H"+num;

    xhttp.open("POST", "/NewIDChecker", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({Numb:num}));

    return num;

}

