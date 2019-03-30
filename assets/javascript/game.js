
var original;

var obiWan = $("#ObiRow");
var anakin = $("#AniRow");
var darthMaul = $("#MaulRow");
var darthSidious = $("#SidRow");

var ObiWan = {
    name: "Obi Wan",
    health: 120,
    attackPower: 6,
    attackPoints: 6,
    counterAttack: 6,
    element: $("#ObiRow")
}

var Anakin = {
    name: "Anakin",
    health: 100,
    attackPower: 7,
    attackPoints: 7,
    counterAttack: 7,
    element: $("#AniRow")
}

var DarthMaul = {
    name: "Darth Maul",
    health: 180,
    attackPower: 4,
    attackPoints: 4,
    counterAttack: 4,
    element: $("#MaulRow")
}

var DarthSidious = {
    name: "Darth Sidious",
    health: 150,
    attackPower: 5,
    attackPoints: 5,
    counterAttack: 5,
    element: $("#SidRow")
}


var isPlayer = false;
var isEnemy = false;

var player;
var enemy;
var playerScore = 0;
var enemyScore = 0;

$(document).ready(function() {
    original = $("#main").clone();

    $(obiWan).on("click", function() {
        if (!isPlayer) {
            
            startGame(this, [anakin, darthMaul, darthSidious], ObiWan);
        }
        
    });
    $(anakin).on("click", function() {
        if (!isPlayer) {
            
            startGame(this, [obiWan, darthMaul, darthSidious], Anakin);
        }
    });
    $(darthMaul).on("click", function() {
       if (!isPlayer) {
        
        startGame(this, [anakin, obiWan, darthSidious], DarthMaul);
       }
    });
    $(darthSidious).on("click", function() {
        if (!isPlayer) {
            
            startGame(this, [anakin, darthMaul, obiWan], DarthSidious);
        }
    });

    $("#btn").on("click", function() {
       
        if(isPlayer && isEnemy) {
            playGame();
        }
    })

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
        console.log(player);
        console.log(enemy);
    }

    function resetGame() {
        $("#main").replaceWith(original.clone());

    }   