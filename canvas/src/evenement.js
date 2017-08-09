function finCombat()
{
	for (var i = 0; i < listInterval.length; i++) {
		window.clearInterval(listInterval[i])
	}
	for (var i = 0; i < joueur.length; i++) {
		map[joueur[i][0]][joueur[i][1]][1] = Math.abs(map[joueur[i][0]][joueur[i][1]][1]);
	}
	for (var i = 0; i < monstreCombat.length; i++) {
		map[monstreCombat[i][0]][monstreCombat[i][1]][1] = Math.abs(map[monstreCombat[i][0]][monstreCombat[i][1]][1]);
	}
	monstreCombat = [];
	affichageTerrain(mode);
	affichageRecapitulatif();
	mode = 1;
	textCanvas[1] = "Balade";
	affichageTerrain(mode);
}

function debutCombat(idGroupe)
{
	mode = 0;
	textCanvas[1] = "Combat"
	nombreEntite[1] = 0;
	for (var i = 0; i < monstreBalade.length; i++) {
		if (monstreBalade[i][5] == idGroupe) {
			var idMonstre = monstreCombat.length;
			monstreCombat[idMonstre] = []
			for (var cpt = 0; cpt < monstreBalade[i].length; cpt++) {
				monstreCombat[idMonstre][cpt] = monstreBalade[i][cpt];
			}
		}
	}
	nombreEntite[1] = monstreCombat.length;
	joueur[0][0] = 16;
	joueur[0][1] = 1;
	for (var i = 0; i < monstreCombat.length; i++) {
		listInterval[2 * i] = window.setInterval(attaqueMonstre, 500, i);
		listInterval[2 * i + 1] = window.setInterval(mouvementMonstre, 500 - 50 * i, i);
	}
}

function mouvementjoueur(changement, idJoueur)
{
	if (map[joueur[idJoueur][0] + changement[0]][joueur[idJoueur][1] + changement[1]][1] >= 0 && mode == 0) {
		map[joueur[idJoueur][0]][joueur[idJoueur][1]][1] = Math.abs(map[joueur[idJoueur][0]][joueur[idJoueur][1]][1]);
		joueur[idJoueur][0] += changement[0];
		joueur[idJoueur][1] += changement[1];
		map[joueur[idJoueur][0]][joueur[idJoueur][1]][1] = -map[joueur[idJoueur][0]][joueur[idJoueur][1]][1];
	} else if (mode == 1) {
		joueur[idJoueur][0] += changement[0];
		joueur[idJoueur][1] += changement[1];
		for (var i = 0; i < monstreBalade.length; i++) {
			if (monstreBalade[i][0] == joueur[idJoueur][0] && monstreBalade[i][1] == joueur[idJoueur][1]) {
				debutCombat(monstreBalade[i][5]);
			}
		}
	}
	affichageTerrain(mode);
}

function attaqueJoueur(coordAttaque, idJoueur)
{
	if (joueur[idJoueur][6] == 1 && mode == 0){
		var val = attaque.length
		attaque[val] = [joueur[idJoueur][0] + coordAttaque[0] / 2, joueur[idJoueur][1] + coordAttaque[1] / 2, sort[idJoueur][joueur[idJoueur][4]][2] - 1, sort[idJoueur][joueur[idJoueur][4]][3], sort[idJoueur][joueur[idJoueur][4]][0]];//x, y, portee, degat, image sur terrain
		attaqueInterval[val] = window.setInterval(function(){
			attaque[val][0] += coordAttaque[0] / 2;
			attaque[val][1] += coordAttaque[1] / 2;
			attaque[val][2] -= 0.5;
			if (map[attaque[val][0]][attaque[val][1]][1] < 0 || attaque[val][2] <= 0) {
				clearInterval(attaqueInterval[val]);
				for (var i = 0; i < joueur.length; i++) {
					if (attaque[val][0] == joueur[i][0] && attaque[val][1] == joueur[i][1]) {
						joueur[i][2] -= (joueur[i][2] - attaque[val][3] > 0)? attaque[val][3] : mortJoueur(i);
						affichageRecapitulatif();
					}
				}
				for (var i = 0; i < monstreCombat.length; i++) {
					if (attaque[val][0] == monstreCombat[i][0] && attaque[val][1] == monstreCombat[i][1]) {
						monstreCombat[i][2] -= (monstreCombat[i][2] - attaque[val][3] > 0)? attaque[val][3] : mortMonstre(i);
						affichageRecapitulatif();
					}
				}
				attaque[val] = [0, 0, 0, 0, 0]
			}
			affichageTerrain(mode);
		}, 20);
		joueur[idJoueur][6] = 0;
		window.setTimeout(function(){joueur[idJoueur][6] = 1; }, 200);
	}
}

function mortJoueur(idJoueur)
{
	if (nombreEntite[0] == 1) {
		finCombat();
		return joueur[0][2] - joueur[0][3];
	} else {
		nombreEntite[0]--
		map[joueur[idJoueur][0]][joueur[idJoueur][1]][1] = Math.abs(map[joueur[idJoueur][0]][joueur[idJoueur][1]][1]);
		joueur[idJoueur][0] = 0;
		joueur[idJoueur][1] = 0;
	}
}

function mouvementMonstre(idMonstre)
{
	var cible = [0, 10000];
	for (var i = 0; i < joueur.length; i++) {
		var distance = ((joueur[i][0] - monstreCombat[idMonstre][0]) * (joueur[i][0] - monstreCombat[idMonstre][0]) + (joueur[i][1] - monstreCombat[idMonstre][1]) * (joueur[i][1] - monstreCombat[idMonstre][1]));
		if (distance < cible[1]) {
			cible = [i, distance];
		}
	}
	//alert(cible[0] + " " + cible[1])
	if (cible[1] != 1) {//le monstre ne colle pas le joueur
		var changement = [[0, 1, 10000], [0,-1, 10000], [1, 0, 10000], [-1, 0, 10000]];
		for (var i = 0; i < changement.length; i++) {
			if (map[monstreCombat[idMonstre][0] + changement[i][0]][monstreCombat[idMonstre][1] + changement[i][1]][1] >= 0) {
				changement[i][2] = (monstreCombat[idMonstre][0] - joueur[cible[0]][0] + changement[i][0]) * (monstreCombat[idMonstre][0] - joueur[cible[0]][0] + changement[i][0]) + (monstreCombat[idMonstre][1] - joueur[cible[0]][1] + changement[i][1]) * (monstreCombat[idMonstre][1] - joueur[cible[0]][1] + changement[i][1]);
			}
		}
		var caseCible = [0 ,10000];
		for (var i = 0; i < changement.length; i++) {
			if (changement[i][2] < caseCible[1]){
				caseCible = [i, changement[i][2]];
			}
		}
		//alert(caseCible[0] + "" + changement[caseCible[0]][0] + changement[caseCible[0]][1] + changement[caseCible[0]][2])
		map[monstreCombat[idMonstre][0]][monstreCombat[idMonstre][1]][1] = Math.abs(map[monstreCombat[idMonstre][0]][monstreCombat[idMonstre][1]][1]);
		monstreCombat[idMonstre][0] += changement[caseCible[0]][0];
		monstreCombat[idMonstre][1] += changement[caseCible[0]][1];
		map[monstreCombat[idMonstre][0]][monstreCombat[idMonstre][1]][1] = -(map[monstreCombat[idMonstre][0]][monstreCombat[idMonstre][1]][1]);
	}
	affichageTerrain(mode);//et on actualise le terrain parceque sinon ca sert a rien ;)
}

function attaqueMonstre(idMonstre)
{
	for (var i = 0; i < joueur.length; i++) {
		if ((joueur[i][0] - monstreCombat[idMonstre][0])*(joueur[i][0] - monstreCombat[idMonstre][0]) + (joueur[i][1] - monstreCombat[idMonstre][1])*(joueur[i][1] - monstreCombat[idMonstre][1]) == 1) {
			joueur[i][2] -= (joueur[i][2] - monstreCombat[idMonstre][4] > 0)? monstreCombat[idMonstre][4] : mortJoueur(i);
			break;
		}
	}
	affichageTerrain(mode);
	affichageRecapitulatif();
}

function mortMonstre(idMonstre)
{
	if (nombreEntite[1] == 1) {
		finCombat();
		return 0;
	} else {
		nombreEntite[1]--
		map[monstreCombat[idMonstre][0]][monstreCombat[idMonstre][1]][1] = Math.abs(map[monstreCombat[idMonstre][0]][monstreCombat[idMonstre][1]][1]);
		monstreCombat[idMonstre][0] = 0;
		monstreCombat[idMonstre][1] = 0;
		affichageTerrain(mode);
		affichageRecapitulatif();
		return 0;
	}
}

document.addEventListener('keydown', function(event) {
	//joueur 1
	if(event.keyCode == 37) {
		mouvementjoueur([ 0, -1], 0);
	}
	else if(event.keyCode == 39) {
		mouvementjoueur([ 0,  1], 0);
	}
	else if(event.keyCode == 38) {
		mouvementjoueur([ 1,  0], 0);
	}
	else if(event.keyCode == 40) {
		mouvementjoueur([-1,  0], 0);
	}
	else if(event.keyCode == 81) {
		attaqueJoueur([ 0, -1], 0);
	}
	else if(event.keyCode == 68) {
		attaqueJoueur([ 0,  1], 0);
	}
	else if(event.keyCode == 90) {
		attaqueJoueur([ 1,  0], 0);
	}
	else if(event.keyCode == 83) {
		attaqueJoueur([-1,  0], 0);
	}
	else if(event.keyCode == 65) {
		joueur[0][4] = (joueur[0][4] - 1 >= 0)? joueur[0][4] - 1 : sort[0].length - 1;
		affichageRecapitulatif();
	}
	else if(event.keyCode == 69) {
		joueur[0][4] = (joueur[0][4] + 1 < sort[0].length)? joueur[0][4] + 1 : 0;
		affichageRecapitulatif();
	}

	//joueur 2
	else if(event.keyCode == 71) {
		mouvementjoueur([0,-1], 1);
	}
	else if(event.keyCode == 74) {
		mouvementjoueur([0, 1], 1);
	}
	else if(event.keyCode == 89) {
		mouvementjoueur([1,0], 1);
	}
	else if(event.keyCode == 72) {
		mouvementjoueur([-1, 0], 1);
	}
	else if(event.keyCode == 97) {
		attaqueJoueur([0,-1], 1);
	}
	else if(event.keyCode == 99) {
		attaqueJoueur([ 0, 1], 1);
	}
	else if(event.keyCode == 101) {
		attaqueJoueur([1,0], 1);
	}
	else if(event.keyCode == 98) {
		attaqueJoueur([-1, 0], 1);
	}

	//triche
	else if(event.keyCode == 77) {
		joueur[0][2] = 10000000000;
		joueur[0][3] = 10000000000;
		affichageRecapitulatif();
	}
	else if(event.keyCode == 80) {
		joueur[0][2] = 10;
		joueur[0][3] = 10;
		affichageRecapitulatif();
	}
	else {
		//alert(event.keyCode);
	}
})
