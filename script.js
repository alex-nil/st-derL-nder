
//Deklarerar variabler

var städer;
var land;
var sparadStad = [];

//Hämtar id för div
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


//Eventlistener för länder
//Hämtar value för den knapp man tryckt på, kollar om det stämmer överrens med land id.
function landKnapp(objButton) {
    document.getElementById("besökt").innerHTML = "";
    var knappID = Number(objButton.value);
    
     for(var i = 0; i<land.length; i++) {
        if (knappID === land[i].id) {
            stadLista.innerHTML = "<h1>Städer i " + land[i].countryname + "</h1>";
         }
    }
     for(var x = 0; x<städer.length; x++) {
         if (städer[x].countryid ===knappID) {
            stadLista.innerHTML += "<li><button onclick=\"stadInfo(this)\" value=\"" + städer[x].id + "\" class=\"btn btn-success\" id=\"" + städer[x].id + "\">" + städer[x].stadname + "</button></li>";
         }
    }
 }




//funktion för att skapa info om stad
//Hämtar value för knapp. Kollar om knapp = städer ID
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
//hämtar value för knapp. Slänger in det som man har sparat in i en Array.
//Lägger sedan in det i localstorage
function spara(objButton) {

    var knappID = Number(objButton.value);
    for(var i = 0; i<städer.length; i++) {  
        if (knappID === städer[i].id) {
            sparadStad.push(städer[i].id);
            localStorage.setItem("id", JSON.stringify(sparadStad));
        }
    }
}




//Funktion för att skriva ut sparad data, samt lägga till en "radera"-knapp
function sparadData() {
    document.getElementById("info").innerHTML = "";     //Rensar upp på sidan
    document.getElementById("stadLista").innerHTML = "";
    var folkmängd = 0;
    var minaStäder = JSON.parse(localStorage.getItem("id"));    //hämtar de ID som man sparat och lägger till i en array
    document.getElementById("besökt").innerHTML = "<hr><h1>Städer du har besökt:</h1>";
    

    //Går igenom minaStäder array och skirver ut varje index till value
    minaStäder.forEach(myFunction);
    function myFunction(value) {
        

        //Om value = städer ID, hämta det sparade json datan för stad och population
        for (var i = 0; i<städer.length; i++) {
            if (städer[i].id === value) {
            document.getElementById("besökt").innerHTML += "<h4>" + städer[i].stadname + "</h4>";
            folkmängd += städer[i].population; 
            }                    
        }  
      }
    document.getElementById("besökt").innerHTML += "<h4>Personer du har sett: " + folkmängd +  "</h4>";
    document.getElementById("besökt").innerHTML += "<button onclick=\"radera()\" class=\"btn btn-warning\">Radera Städer</button>";
  }
    //Funktion för att radera sina besökta städer
    //Nollställer localstorage, nollställer den array som man sparat i.
    function radera() {
        localStorage.clear();
        document.getElementById("besökt").innerHTML = "<h2>Stadlista Raderad</h2>";
        sparadStad = [];
  }