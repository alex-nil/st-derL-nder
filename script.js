var städer;
var land;
var stadH1 = document.getElementById("stad");
var stadLista = document.getElementById("stadLista");


//Hämtar json med fetch
fetch("land.json")
.then(function(data){
    return data.json();
})
.then(function(myJson){
    land = myJson;
})
.catch(error => console.log(error));
fetch("stad.json")
.then(function(data){
    return data.json();
})
.then(function(myJson){
    städer = myJson;
})
.catch(error => console.log(error));



//Hämtar knappar för länder

var sverige = document.getElementById("sverige");
var finland = document.getElementById("finland");
var norge = document.getElementById("norge");


//Eventlistener för Sverige
sverige.addEventListener("click", function() {
    stadLista.innerHTML = "<h1>Städer i Sverige</h1>";
    for (var i = 0; i <städer.length; i++){
        if (städer[i].countryid ===1) {
            
            stadLista.innerHTML += "<li><button onclick=\"stadInfo(this)\" value=\"" + städer[i].id + "\" class=\"btn btn-success\" id=\"" + städer[i].id + "\">" + städer[i].stadname + "</button></li>";
        }
    }
    
    
});


function stadInfo(objButton) {
   var knappID = Number(objButton.value);
    for(var i = 0; i<städer.length; i++) {
        if (knappID === städer[i].id) {
            document.getElementById("info").innerHTML = "<h1>" + städer[i].stadname + "</h1>";
            document.getElementById("info").innerHTML += "<h3>Population:</h3>";
            document.getElementById("info").innerHTML += "<p>" + städer[i].population + "</p>";

            document.getElementById("besökt").innerHTML = "<button onclick=\"spara(this)\" value=\"" + städer[i].id + "\" class=\"btn btn-success\">Spara Stad</button>";
        }
    }
}
var personer = 0;

function spara(objButton) {
    var knappID = Number(objButton.value);
    for(var i = 0; i<städer.length; i++) {
        if (knappID === städer[i].id) {
            personer += städer[i].population;
            localStorage.setItem(JSON.stringify(städer[i].id), JSON.stringify(städer[i].stadname));
            localStorage.setItem("personer", JSON.stringify(personer));
        }
    }
}