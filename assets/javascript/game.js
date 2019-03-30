
var original;

var obiWan = $("#ObiRow");
var anakin = $("#AniRow");
var darthMaul = $("#MaulRow");
var darthSidious = $("#SidRow");


$(document).ready(function() {
//    original = $("#main").clone();

    $(obiWan).on("click", function() {
        console.log("obiwan");
        startGame(this);
    });
    $(anakin).on("click", function() {
        console.log("anakin");
        startGame(this);
    });
    $(darthMaul).on("click", function() {
        console.log("Darth Maul");
        startGame(this);
    });
    $(darthSidious).on("click", function() {
        console.log("Darth Sidious");
        startGame(this);
    });


});

function startGame(fighter) {
    console.log(fighter);
    $("#myCharacter").append(fighter);
}