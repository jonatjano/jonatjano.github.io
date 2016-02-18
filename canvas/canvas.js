var canvas = document.getElementById("monCanvas").getContext("2d");
var audio = document.getElementById("audio");
canvas.font = "20px serif";
var listInterval = [];// 1)I attaqueMonstre 2)I mouvementMonstre
var joueur = [[8, 1, 10, 10, 0, 1, 1]/*, [10, 3, 10, 10, 1, 1, 0]*/];//  $1) peutattaquer    attaque sortselect
var monstreCombat = [[15, 22, 10, 10, 1, 0, 0], [16, 20, 10, 10, 1, 0, 4]];// $1) nombre de fois eclaté
// posX, posY, vieDepart, vieMax, attaque, $1, index image
var sort = [[[5, 5, 1, 1], [0, 2, 2, 2], [1, 2, 3, 3], [2, 2, 4, 4], [3, 2, 5, 5], [4, 2, 6, 6]]]//image sur terrain, image raccourci, portée, degat
var imgMonstre = [[new Image(), 35, 44], [new Image(), 25, 33], [new Image(), 25, 33], [new Image(), 72, 48], [new Image(), 72, 48], [new Image(), 72, 72], [new Image(), 72, 72]];
for (var i = 0; i < imgMonstre.length; i++) {
	imgMonstre[i][0].src = "monstre/Monstre00" + (i + 1) + ".png"
}
var imgJoueur = [[new Image(), 26, 34], [new Image(), 72, 72], [new Image(), 72, 72]];
for (var i = 0; i < imgJoueur.length; i++) {
	imgJoueur[i][0].src = "personnage/Perso00" + (i + 1) + ".png"
}
var textCanvas = [];// 0: pseudo, 1: etat(combat, balade...)
textCanvas[0] = "pseudo"//prompt("comment tu t'appelle?");
textCanvas[1] = "Balade";
var imgArme = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
imgArme[0].src = "arme/epeefeu.png";
imgArme[1].src = "arme/epeeair.png";
imgArme[2].src = "arme/epeeeau.png";
imgArme[3].src = "arme/epeenormale.png";
imgArme[4].src = "arme/epeeterre.png";
imgArme[5].src = "arme/bombe.png";
var imgSort = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
imgSort[0].src = "arme/bouledefeu.png";
imgSort[1].src = "arme/bouledair.png";
imgSort[2].src = "arme/bouledeau.png";
imgSort[3].src = "arme/bombe.png";
imgSort[4].src = "arme/bouledeterre.png";

var attaque = [];//x, y, portee - 1, degat
var attaqueInterval = [];
affichageRecapitulatif();
var imgCase = [new Image(), new Image()];
imgCase[1].src = "case.jpg";
imgCase[0].src = "vide.png";
imgCase[0].onload = affichageTerrainCombat();

//combat
	function affichageTerrainCombat()
	{
		for (var cpt = 0; cpt < map.length; cpt++) {
			for (var i = 0; i < map[cpt].length; i++) {
				canvas.drawImage(imgCase[map[cpt][i][0]], ((cpt + i - 9) * 36), (cpt + i - (2 * cpt - 7)) * 36);	//var map est initialisée dans map.js
				//alert("a")
				//canvas.fillText(((joueur[0][0] - cpt) * (joueur[0][0] - cpt) + (joueur[0][1] - i) * (joueur[0][1] - i)), ((cpt + i - 9) * 36 + 36), ((cpt + i - (2 * cpt - 7)) * 36 + 36));
			}
		}

		for(var cpt = 0;cpt < joueur.length; cpt++){
			canvas.drawImage(imgJoueur[joueur[cpt][6]][0], ((joueur[cpt][0] + joueur[cpt][1] - 9) * 36), (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 7)) * 36);	//le joueur
			canvas.fillStyle = "#000";	//couleur noire
			canvas.strokeRect(((joueur[cpt][0] + joueur[cpt][1] - 9) * 36) + 18, (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 7)) * 36 - 7, 36, 5);	//cadre de la vie joueur
			canvas.fillStyle = "#F00";	//couleur rouge
			canvas.fillRect(((joueur[cpt][0] + joueur[cpt][1] - 9) * 36) + 19, (joueur[cpt][0] + joueur[cpt][1] - (2 * joueur[cpt][0] - 7)) * 36 - 6, (34 * (joueur[cpt][2] / joueur[cpt][3])), 3);		//barre de vie joueur
		}
		for(var cpt = 0;cpt < monstreCombat.length; cpt++){
			canvas.drawImage(imgMonstre[monstreCombat[cpt][6]][0], ((monstreCombat[cpt][0] + monstreCombat[cpt][1] - 9) * 36), (monstreCombat[cpt][0] + monstreCombat[cpt][1] - (2 * monstreCombat[cpt][0] - 7)) * 36);//Le monstre
			canvas.fillStyle = "#000";	//couleur noire
			canvas.strokeRect(((monstreCombat[cpt][0] + monstreCombat[cpt][1] - 9) * 36) + 18, (monstreCombat[cpt][0] + monstreCombat[cpt][1] - (2 * monstreCombat[cpt][0] - 7)) * 36 + 11, 36, 5);	//cadre de la vie monstre
			canvas.fillStyle = "#F00";	//couleur rouge
			canvas.fillRect(((monstreCombat[cpt][0] + monstreCombat[cpt][1] - 9) * 36) + 19, (monstreCombat[cpt][0] + monstreCombat[cpt][1] - (2 * monstreCombat[cpt][0] - 7)) * 36 + 12, (34 * (monstreCombat[cpt][2] / monstreCombat[cpt][3])), 3);//barre de vie monstre
		}
		for (var cpt = 0; cpt < attaque.length; cpt++) {
			canvas.drawImage(imgArme[attaque[cpt][4]], (attaque[cpt][0] + attaque[cpt][1] - 9) * 36 + 12, (attaque[cpt][0] + attaque[cpt][1] - (2 * attaque[cpt][0] - 7)) * 36 + 12);
		}
		var valeur = 0;
		for (var i = 0; i < attaque.length; i++) {
			if (attaque[i][0] == 0 && attaque[i][1] == 0) {
				valeur++
			}
		}
		if (valeur == attaque.length)
			attaque = [];
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
	}

	function mouvementjoueur(changement, idJoueur)
	{
		if (map[joueur[idJoueur][0] + changement[0]][joueur[idJoueur][1] + changement[1]][1] >= 0) {
			map[joueur[idJoueur][0]][joueur[idJoueur][1]][1] = Math.abs(map[joueur[idJoueur][0]][joueur[idJoueur][1]][1]);
			joueur[idJoueur][0] += changement[0];
			joueur[idJoueur][1] += changement[1];
			map[joueur[idJoueur][0]][joueur[idJoueur][1]][1] = -map[joueur[idJoueur][0]][joueur[idJoueur][1]][1];
		}
		affichageTerrainCombat();
	}

	function attaqueJoueur(coordAttaque, idJoueur)
	{
		if (joueur[idJoueur][5] == 1){
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
							joueur[i][2] -= (joueur[i][2] - attaque[val][3] > 0)? attaque[val][3] : mortJoueur();
							affichageRecapitulatif();
						}
					}
					for (var i = 0; i < monstreCombat.length; i++) {
						if (attaque[val][0] == monstreCombat[i][0] && attaque[val][1] == monstreCombat[i][1]) {
							monstreCombat[i][2] -= (monstreCombat[i][2] - attaque[val][3] > 0)? attaque[val][3] : mortMonstre();
							affichageRecapitulatif();
						}
					}
					attaque[val] = [0, 0, 0, 0, 0]
				}
				affichageTerrainCombat();
			}, 20);
			joueur[idJoueur][5] = 0;
			window.setTimeout(function(){joueur[idJoueur][5] = 1; }, 200);
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
		affichageTerrainCombat();//et on actualise le terrain parceque sinon ca sert a rien ;)
	}

	function attaqueMonstre(idMonstre)
	{
		for (var i = 0; i < joueur.length; i++) {
			if ((joueur[i][0] - monstreCombat[idMonstre][0])*(joueur[i][0] - monstreCombat[idMonstre][0]) + (joueur[i][1] - monstreCombat[idMonstre][1])*(joueur[i][1] - monstreCombat[idMonstre][1]) == 1) {
				joueur[i][2] -= (joueur[i][2] - monstreCombat[idMonstre][4] > 0)? monstreCombat[idMonstre][4] : mortJoueur();
				break;
			}
		}
		affichageTerrainCombat();
		affichageRecapitulatif();
	}

	function mortJoueur()
	{
		for(cpt = 0; cpt < listInterval.length; cpt++){
			window.clearInterval(listInterval[cpt])
		}
		alert("t'es mort, tu auras plus de chance la prochaine fois");
		alert("tu as reussi a tuer " + monstreCombat[0][5] + " monstres")
		for (var i = 0; i < joueur.length; i++) {
			map[joueur[i][0]][joueur[i][1]][1] = Math.abs(map[joueur[i][0]][joueur[i][1]][1]);
		}
		for (var i = 0; i < monstreCombat.length; i++) {
			map[monstreCombat[i][0]][monstreCombat[i][1]][1] = Math.abs(map[monstreCombat[i][0]][monstreCombat[i][1]][1]);
		}
		monstreCombat = [];
		affichageTerrainCombat();
		affichageRecapitulatif();
		return joueur[0][2] - joueur[0][3];
	}

	function mortMonstre()
	{
		for(cpt = 0; cpt < listInterval.length; cpt++){
			window.clearInterval(listInterval[cpt])
		}
		for (var i = 0; i < joueur.length; i++) {
			map[joueur[i][0]][joueur[i][1]][1] = Math.abs(map[joueur[i][0]][joueur[i][1]][1]);
		}
		for (var i = 0; i < monstreCombat.length; i++) {
			map[monstreCombat[i][0]][monstreCombat[i][1]][1] = Math.abs(map[monstreCombat[i][0]][monstreCombat[i][1]][1]);
		}
		monstreCombat = [];
		affichageTerrainCombat();
		affichageRecapitulatif();
		return 0;
	}

	for (var i = 0; i < monstreCombat.length; i++) {
		listInterval[2 * i] = window.setInterval(attaqueMonstre, 500, i);
		listInterval[2 * i + 1] = window.setInterval(mouvementMonstre, 500 - 50 * i, i);
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

		//joueur 2

//	 		89       101
//		 71 72 74 97 98 99
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
	    }
		else if(event.keyCode == 80) {
			joueur[0][2] = 10;
			joueur[0][3] = 10;
			alert(-sort[0].length + joueur[0][4] + 2);
			alert(-sort[0].length + joueur[0][4] + 1);
		}
		else if(event.keyCode == 65) {
			joueur[0][4] = (joueur[0][4] - 1 >= 0)? joueur[0][4] - 1 : sort[0].length - 1;
			affichageRecapitulatif();
		}
		else if(event.keyCode == 69) {
			joueur[0][4] = (joueur[0][4] + 1 < sort[0].length)? joueur[0][4] + 1 : 0;
			affichageRecapitulatif();
		}
		else {
			alert(event.keyCode);
		}
	})

//balade
