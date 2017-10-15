
$(document).ready(function() {
	var characters = {
		"Yoda": {
			name: "Yoda",
			health: 120,
			attack: 11,
			imageUrl: "assets/images/yoda.png",
			enemyAttackBack: 15
		},
		"R2D2": {
			name: "R2D2",
			health: 100,
			attack: 8,
			imageUrl: "assets/images/r2d2.jpg",
			enemyAttackBack: 20
		},
		"Alien": {
			name: "Alien",
			health: 150,
			attack: 9,
			imageUrl: "assets/images/alien.jpg",
			enemyAttackBack: 10
		},
		"Chewy": {
			name: "Chewy",
			health: 180,
			attack: 10,
			imageUrl: "assets/images/chewy.jpg",
			enemyAttackBack: 12
		},
		"Storm Trooper": {
			name: "Storm Trooper",
			health: 200,
			attack: 7,
			imageUrl: "assets/images/storm_trooper.jpg",
			enemyAttackBack: 25
		}
	};

	console.log(characters);

	var cursorSelectedCharacter;
	var combatants = [];
	var currDefender;
	var turnCounter = 1;
	var killCount = 0;

	var renderOne = function(character, renderArea, charStatus) {
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character.image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class='character-health'>").text(character.health);
		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);
		console.log("character name: " , character.name);

		//if character is an enemy or defender
		if (charStatus === "enemy") {
			$("charDiv").addClass("enemy");
		}
		else if (charStatus === "defend") {
			currDefender = character;
			console.log(currDefender);
			$(charDiv).addClass("target-enemy");
		}

	};

	var displayCharacters = function(charObj, areaRender) {
		if (areaRender === "#character-section") {
			$(areaRender).empty();

			for (var key in charObj) {
				if(charObj.hasOwnProperty(key)) {
					renderOne(charObj[key], areaRender, "");
				}
			}
		}
	
		if (areaRender === "#selected-character") {			
			renderOne(charObj, areaRender, "");
		
		}

		if (areaRender === "#enemies-to-attack") {
			for(var i=0; i<charObj.length; i++) {
				renderOne(charObj[i], areaRender, "enemy");
			}


			$(document).on("click", ".enemy", function() {
			console.log("this clicked 2");
				var name = $(this).attr("data-name");
				
					if($("#defend").children().length ===0) {
						displayCharacters(name,"#defend");
						$(this).hide();
					}
			
			});

		}

		
		//Display "active opponent"
		if (areaRender === "#defend") {
			$(areaRender).empty();
				for(var i=0; i<combatants.length; i++) {
					if(combatants[i].name ===charObj) {
						renderOne(combatants[i], areaRender, "defend");
					}
				}
		}

		//Re-display defender when attacked.
		if (areaRender === "playerDamage") {
			$("#defend").empty();
			renderOne(charObj, "#defend", "defend");
			
		}

		//Re-render player when attacked.
		if (areaRender === "enemyDamage") {
			$("selected-character").empty();
			renderOne(charObj, "#selected-character", "");
		}

		//Remove defeated enemy.
		if (areaRender === "enemyDefeated") {
			$("#defend").empty();
		}


	};

	var restartGame = function (inputEndGame) {
		var restart = $("<button>Restart</button>").click(function () {
			location.reload();
		});

		var gameState = $("<div>").text(inputEndGame);

		$("body").append(gameState);
		$("body").append(restart);
	};

	// Display characters when game starts
	displayCharacters(characters, "#character-section");

	//Select character
	$(document).on("click", ".character", function() {
		var name = $(this).attr("data-name");

	// If a player character has not yet been chosen
	if (!cursorSelectedCharacter) {
		cursorSelectedCharacter = characters[name];
		for (var key in characters) {
			if (key !== name) {
				combatants.push(characters[key]);
			}
		// else {cursorSelectedCharacter = characters[key]};

		$("#pick").hide();
		}

		
		console.log("combatants: " + combatants);

		// Hide character select div.
		$("#character-section").hide();


		displayCharacters(cursorSelectedCharacter, "#selected-character");
		displayCharacters(combatants, "#enemies-to-attack");

		}
	});

	$("#attack-button").on("click"), function() {
			if($("#defend").children().length !==0) {
				currDefender.health -= (cursorSelectedCharacter.attack = turnCounter);

				if (currDefender.health > 0) {

					// Reduce enemy's updated character card
					displayCharacters(currDefender,"playerDamage");

					// Reduce your health by opponent's attack value
					cursorSelectedCharacter.health -+ currDefender.enemyAttackBack;

					// Render the player's updated character card.
					displayCharacters(cursorSelectedCharacter, "enemyDamage");

					if(cursorSelectedCharacter.health <= 0) {
						renderMessage("clearMessage");
						restartGame("You have been defeated.");
						$("#attack-button").unbind("click");
					}
				}
				else {
			//Remove opponent's character card.
					displayCharacters(currDefender, "enemyDefeated");
					killCount++;
					if (killCount >= 3) {
						renderMessage("clearMessage");
						restartGame("You won!");
					}
				}
		}

		turnCounter++;
	

	};
});
