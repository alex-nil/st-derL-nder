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
    stadH1.innerHTML = "Städer i Sverige";
    for (var i = 0; i <städer.length; i++){
        if (städer[i].countryid ===1) {
            stadLista.innerHTML += "<li><button onclick=\"stadInfo()\" class=\"btn btn-success\" id=\"" + städer[i].id + "\">" + städer[i].stadname + "</button></li>";
        }
    }
    
});


function clickMe(e) {
for(var i = 0; i<städer.length; i++) {
    if (document.getElementsByTagName("button").value === städer[i].stadname) {
        console.log("yes");
    }
    }
}