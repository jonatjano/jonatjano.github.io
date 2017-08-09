function affichageTerrain(etat)
{
	switch (etat) {
		case 0:
			affichageTerrainCombat();
		break;
		case 1:
			affichageTerrainBalade();
		break;
		case 2:

		break;
		default:
	}
}

function affichageTerrainCombat()
{
	for (var cpt = 0; cpt < map.length; cpt++) {
		for (var i = 0; i < map[cpt].length; i++) {
			canvas.drawImage(imgCase[map[cpt][i][0]], ((cpt + i - 17) * 36), (cpt + i - (2 * cpt - 15)) * 18);	//var map est initialisée dans map.js
		}
	}

	for(var cpt = 0;cpt < joueur.length; cpt++){
		canvas.drawImage(imgJoueur[joueur[cpt][5]][0], ((joueur[cpt][0] + joueur[cpt][1] - 17) * 36), (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 13)) * 18);	//le joueur
		canvas.fillStyle = "#000";	//couleur noire
		canvas.strokeRect(((joueur[cpt][0] + joueur[cpt][1] - 17) * 36) + 18, (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 13)) * 18 - 7, 36, 5);	//cadre de la vie joueur
		canvas.fillStyle = "#F00";	//couleur rouge
		canvas.fillRect(((joueur[cpt][0] + joueur[cpt][1] - 17) * 36) + 19, (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 13)) * 18 - 6, (34 * (joueur[cpt][2] / joueur[cpt][3])), 3);		//barre de vie joueur
	}
	for(var cpt = 0;cpt < monstreCombat.length; cpt++){
		canvas.drawImage(imgMonstre[monstreCombat[cpt][6]], ((monstreCombat[cpt][0] + monstreCombat[cpt][1] - 17) * 36), (monstreCombat[cpt][0] + monstreCombat[cpt][1] - (2 * monstreCombat[cpt][0] - 13)) * 18);//Le monstre
		canvas.fillStyle = "#000";	//couleur noire
		canvas.strokeRect(((monstreCombat[cpt][0] + monstreCombat[cpt][1] - 17) * 36) + 18, (monstreCombat[cpt][0] + monstreCombat[cpt][1] - (2 * monstreCombat[cpt][0] - 13)) * 18 + 11, 36, 5);	//cadre de la vie monstre
		canvas.fillStyle = "#F00";	//couleur rouge
		canvas.fillRect(((monstreCombat[cpt][0] + monstreCombat[cpt][1] - 17) * 36) + 19, (monstreCombat[cpt][0] + monstreCombat[cpt][1] - (2 * monstreCombat[cpt][0] - 13)) * 18 + 12, (34 * (monstreCombat[cpt][2] / monstreCombat[cpt][3])), 3);//barre de vie monstre
	}
	var valeur = 0;
	for (var i = 0; i < attaque.length; i++) {
		if (attaque[i][0] == 0 && attaque[i][1] == 0) {
			valeur++
		}
	}
	if (valeur == attaque.length){
		attaque = [];
	}
	for (var cpt = 0; cpt < attaque.length; cpt++) {
		canvas.drawImage(imgArme[attaque[cpt][4]], (attaque[cpt][0] + attaque[cpt][1] - 17) * 36, (attaque[cpt][0] + attaque[cpt][1] - (2 * attaque[cpt][0] - 13)) * 18 + 30);
	}
}

function affichageTerrainBalade()
{
	for (var cpt = 0; cpt < map.length; cpt++) {
		for (var i = 0; i < map[cpt].length; i++) {
			canvas.drawImage(imgCase[map[cpt][i][0]], ((cpt + i - 17) * 36), (cpt + i - (2 * cpt - 15)) * 18);	//var map est initialisée dans map.js
		}
	}
	for(var cpt = 0;cpt < joueur.length; cpt++){
		canvas.drawImage(imgJoueur[joueur[cpt][5]][0], ((joueur[cpt][0] + joueur[cpt][1] - 17) * 36), (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 13)) * 18);	//le joueur
		canvas.fillStyle = "#000";	//couleur noire
		canvas.strokeRect(((joueur[cpt][0] + joueur[cpt][1] - 17) * 36) + 18, (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 13)) * 18 - 7, 36, 5);	//cadre de la vie joueur
		canvas.fillStyle = "#F00";	//couleur rouge
		canvas.fillRect(((joueur[cpt][0] + joueur[cpt][1] - 17) * 36) + 19, (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 13)) * 18 - 6, (34 * (joueur[cpt][2] / joueur[cpt][3])), 3);		//barre de vie joueur
	}
	for(var cpt = 0;cpt < monstreBalade.length; cpt++){
		canvas.drawImage(imgMonstre[monstreBalade[cpt][6]], ((monstreBalade[cpt][0] + monstreBalade[cpt][1] - 17) * 36), (monstreBalade[cpt][0] + monstreBalade[cpt][1] - (2 * monstreBalade[cpt][0] - 13)) * 18);//Le monstre
		canvas.fillStyle = "#000";	//couleur noire
		canvas.strokeRect(((monstreBalade[cpt][0] + monstreBalade[cpt][1] - 17) * 36) + 18, (monstreBalade[cpt][0] + monstreBalade[cpt][1] - (2 * monstreBalade[cpt][0] - 13)) * 18 + 11, 36, 5);	//cadre de la vie monstre
		canvas.fillStyle = "#F00";	//couleur rouge
		canvas.fillRect(((monstreBalade[cpt][0] + monstreBalade[cpt][1] - 17) * 36) + 19, (monstreBalade[cpt][0] + monstreBalade[cpt][1] - (2 * monstreBalade[cpt][0] - 13)) * 18 + 12, (34 * (monstreBalade[cpt][2] / monstreBalade[cpt][3])), 3);//barre de vie monstre
	}
}

function affichageRecapitulatif()
{
	canvas.fillStyle = "#D08742"
	canvas.fillRect(1101, 1, 194, 574);
	canvas.fillStyle = "#F00"
	canvas.strokeRect(1111, 90 , 174, 22);	//cadre de la vie joueur
	//canvas.strokeRect(1111, 150, 174, 22);	//cadre de la vie monstre
	canvas.fillRect(1112, 91 , (172 * (joueur[0][2] / joueur[0][3])), 20);		//barre de vie joueur recapitulatif
	//canvas.fillRect(1112 ,151, (172 * (monstreCombat[0][2] / monstreCombat[0][3])), 20);//barre de vie monstre recapitulatif
	canvas.fillStyle = "#000";
	canvas.strokeRect(1100, 0, 196, 576);
	canvas.fillText(textCanvas[1], 1111, 30);//etat (balade, combat...)
	canvas.fillText(textCanvas[0], 1111, 80);//pseudo joueur
	canvas.fillText(joueur[0][2] + "/" + joueur[0][3], 1112, 109);
	//canvas.fillText(monstreCombat[0][2] + "/" + monstreCombat[0][3], 1112, 169);
	for (var idJoueur = 0; idJoueur < joueur.length; idJoueur++) {
		(joueur[0][4] - 2 < 0)? canvas.drawImage(imgArme[sort[idJoueur][sort[idJoueur].length + joueur[0][4] - 2][0]], 1111 + 0 * 58, 125) : canvas.drawImage(imgArme[sort[idJoueur][joueur[0][4] - 2][0]], 1111 + 0 * 58, 125);
		(joueur[0][4] + 2 >= sort[idJoueur].length)? canvas.drawImage(imgArme[sort[idJoueur][-sort[idJoueur].length + joueur[0][4] + 2][0]], 1111 + 2 * 58, 125) : canvas.drawImage(imgArme[sort[idJoueur][joueur[0][4] + 2][0]], 1111 + 2 * 58, 125);
		(joueur[0][4] - 1 < 0)? canvas.drawImage(imgArme[sort[idJoueur][sort[idJoueur].length + joueur[0][4] - 1][0]], 1111 + 0.35 * 58, 130) : canvas.drawImage(imgArme[sort[idJoueur][joueur[0][4] - 1][0]], 1111 + 0.35 * 58, 130);
		(joueur[0][4] + 1 >= sort[idJoueur].length)? canvas.drawImage(imgArme[sort[idJoueur][-sort[idJoueur].length + joueur[0][4] + 1][0]], 1111 + 1.65 * 58, 130) : canvas.drawImage(imgArme[sort[idJoueur][joueur[0][4] + 1][0]], 1111 + 1.65 * 58, 130);
		canvas.drawImage(imgArme[sort[idJoueur][joueur[0][4]][0]], 1111 + 1 * 58, 140);
	}

	canvas.fillText("Move using arrows", 1111, 400);
	canvas.fillText("use Z, Q, S and D to attack", 1111, 450);
	canvas.fillText("use A and E to change weapon", 1111, 500);
	canvas.fillText("each weapon has it's range and power", 1111, 550);
	canvas.fillText("have fun :p", 1111, 600);
}
