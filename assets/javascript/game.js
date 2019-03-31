
var original;

var obiWan = $("#ObiRow");
var anakin = $("#AniRow");
var darthMaul = $("#MaulRow");
var darthSidious = $("#SidRow");

var elementArray = [obiWan, anakin, darthMaul, darthSidious];

var attatckPromt = $("#attack");
var defendPromt = $("#defend");

var ObiWan = {
    name: "Obi Wan",
    health: 120,
    attackPower: 1.5,
    attackPoints: 4.5,
    counterAttack: 12,
    element: obiWan
}

var Anakin = {
    name: "Anakin",
    health: 100,
    attackPower: 2,
    attackPoints: 5,
    counterAttack: 14,
    element: anakin
}

var DarthMaul = {
    name: "Darth Maul",
    health: 180,
    attackPower: 1.75,
    attackPoints: 3,
    counterAttack: 8,
    element: darthMaul
}

var DarthSidious = {
    name: "Darth Sidious",
    health: 150,
    attackPower: 1.5,
    attackPoints: 2,
    counterAttack: 10,
    element: darthSidious
}


var isPlayer = false;
var isEnemy = false;


var playerDefeated = false;
var enemyDefeated = false;

var player;
var enemy;
var playerScore = 0;
var enemyScore = 0;

$(document).ready(function() {
    original = $("#main").clone();

    $(obiWan).on("click", function() {
        if (!isPlayer) {
       
            var index = elementArray.indexOf(obiWan);

            elementArray.splice(index,1);

            startGame(this, elementArray, ObiWan);
        }
        
    });
    $(anakin).on("click", function() {
        if (!isPlayer) {

            var index = elementArray.indexOf(anakin);

            elementArray.splice(index,1);

            startGame(this, elementArray, Anakin);
        }
    });
    $(darthMaul).on("click", function() {
       if (!isPlayer) {

        var index = elementArray.indexOf(darthMaul);

        elementArray.splice(index,1);

        startGame(this, elementArray, DarthMaul);
       }
    });
    $(darthSidious).on("click", function() {
        if (!isPlayer) {

            var index = elementArray.indexOf(darthSidious);

            elementArray.splice(index,1);

            startGame(this, elementArray, DarthSidious);
        }
    });

    $("#btn").on("click", function() {
       
        if(isPlayer && isEnemy && (!playerDefeated || !enemyDefeated)) {
            playGame();
        }
    });

    

});

    function startGame(fighter, enemies, object) {
        isPlayer = true;

        $("#myCharacter").append(fighter);
        player = object;
        playerScore = $(fighter).find("p.score").text();
        $("fighter").off("click");

        enemies.forEach(element => {
            $(element).css("background-color", "red");
            $(element).css("border-color", "black");
            $("#enemies").append(element);
        });

        enemies.forEach(element => {
            $(element).on("click", function() {
                if(!isEnemy) {
                    $("#defender").append(element);

                    enemy = (element).attr("id");
                    enemyScore = $(element).find("p.score").text();

                    $(element).css("background-color", "green");

                    enemies.forEach(element => {
                        $(element).off("click");
                    });
                    isEnemy = true;

                    switch(enemy){
                        case "MaulRow":
                        enemy = DarthMaul;
                        break;

                        case "ObiRow":
                        enemy = ObiWan;
                        break;

                        case "AniRow":
                        enemy = Anakin;
                        break;

                        case "SidRow":
                        enemy = DarthSidious;
                        break;
                    }
                }
            });
        });
        
    }

    function playGame() {
        
        player.health -= enemy.counterAttack;
        enemy.health -= player.attackPoints;

        player.attackPoints = player.attackPower * player.attackPoints;

        $(player.element).find("p.score").text(player.health);
        $(enemy.element).find("p.score").text(enemy.health);

        if(player.health < 1) {

            $(attatckPromt).text("");
            $(defendPromt).text("You are defeated");
           
            playerDefeated = true;

            $("#fight").prop("disabled","true");

            $("#main").append("<button id='reset'>Reset</button>");
            $("#reset").on("click", function() {
                resetGame();
                location.reload();
            });
        
            
        }
        else if (enemy.health < 1) {

            $(attatckPromt).text("");
            $(defendPromt).text("You are Victorious. Select a new challenger!");

            var index = elementArray.indexOf(enemy.element);
            $(enemy.element).remove();
            

            elementArray.splice(index,1);

            enemyDefeated = true;
            isEnemy = false;

            if(elementArray.length === 0) {
                $("#main").append("<button id='reset'>Reset</button>");
                $(defendPromt).text("You are Victorious. Try again!");

                $("#reset").on("click", function() {
                    resetGame();
                    location.reload();
                });
            }
            else {
                startGame(player.element,elementArray, player);
            }
            
        }

        else {
            $(attatckPromt).text("You attacked for "+ player.attackPoints + " damage");
            $(defendPromt).text(enemy.name + " counter attacked for " + enemy.counterAttack + " damage");
        }
        
    }

    function resetGame() {
        $("#main").replaceWith(original.clone());

    }   