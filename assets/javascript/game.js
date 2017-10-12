
$(document).ready(function() {
	var character = {
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
	console.log(character);

	var renderOne = function(character, renderArea) {
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character.image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class='character-health'>").text(character.health);
		charDiv.append(charName).append(charImage).append(charHealth);
		$("renderArea").append(charDiv);

	}

	var displayCharacters = function(charObj, areaRender) {
		if (areaRender === "#character-section") {
			$(areaRender).empty();
			for (var key in charObj) {
				if(charObj.hasOwnProperty(key)) {
						renderOne(charObj[key], areaRender);
				}
			}
		}
	}
	displayCharacters(character, "#character-section");
});