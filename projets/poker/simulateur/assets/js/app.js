'use strict';

class Cartes {
	constructor() {
		this.couleurs = [1, 2, 3, 4]; // PIQUE, COEUR, TREFLE, CARREAU
		this.valeurs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // A, 2, 3, 4, 5, 6, 7, 8, 9, 10, V, D, R
		this.jeu = [];
		this.init();
	}
	init() {
		this.jeu = [];
		var indexCouleur = 0;
		while (indexCouleur < this.couleurs.length) {
			var indexValeur = 0;
			while (indexValeur < this.valeurs.length) {
				var carte = {
					"couleur" : this.couleurs[indexCouleur],
					"valeur" : this.valeurs[indexValeur]
				};
				this.jeu.push(carte);
				indexValeur++;
			}
			indexCouleur++;
		}
		this.melanger(this.jeu);
	}
	melanger(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;
	  while (0 !== currentIndex) {
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
}

var mesCartes = null;

window.onload = function() {
	mesCartes = new Cartes();
}