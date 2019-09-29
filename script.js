var städer;
var land;
var sparadStad = [];
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



/*Hämtar knappar för länder

var sverige = document.getElementById("sverige");
var finland = document.getElementById("finland");
var norge = document.getElementById("norge");*/


//Eventlistener för länder
function landKnapp(objButton) {
    var knappID = Number(objButton.value);
    
     for(var i = 0; i<land.length; i++) {
        if (knappID === land[i].id) {
            stadLista.innerHTML = "<h1>Städer i " + land[i].countryname + "</h1>";
         }
    }
     for(var x = 0; x<städer.length; x++) {
         console.log(x);
         if (städer[x].countryid ===knappID) {
            stadLista.innerHTML += "<li><button onclick=\"stadInfo(this)\" value=\"" + städer[x].id + "\" class=\"btn btn-success\" id=\"" + städer[x].id + "\">" + städer[x].stadname + "</button></li>";
         }
    }
 }

//funktion för att skapa info om stad
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
//funktion för att spara stad i localstorage
function spara(objButton) {

    var knappID = Number(objButton.value);
    for(var i = 0; i<städer.length; i++) {  
        if (knappID === städer[i].id) {
            sparadStad.push(städer[i].stadname);
            localStorage.setItem("stad", JSON.stringify(sparadStad));
        }
    }
}


//Funktion för att skriva ut sparad data 
function sparadData() {
    document.getElementById("info").innerHTML = localStorage.getItem("stad");
}
