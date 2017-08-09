var canvas = document.getElementById("monCanvas").getContext("2d");
var audio = document.getElementById("audio");
canvas.font = "20px serif";
var listInterval = [];
var joueur = [[16, 1, 10, 10, 0, 1, 1]/*, [10, 3, 10, 10, 1, 1, 0]*/];//  $1) peutattaquer    attaque sortselect
var monstreCombat = [[15, 30, 10, 10, 1, 0, 0], [14, 29, 10, 10, 1, 0, 4]];// $1) inutilise
var monstreBalade = [[15, 30, 10, 10, 1, 0, 0], [14, 29, 10, 10, 1, 1, 1], [13, 28, 10, 10, 1, 1, 2], [12, 27, 10, 10, 1, 2, 3], [11, 26, 10, 10, 1, 2, 4], [10, 25, 10, 10, 1, 2, 5], [9, 24, 10, 10, 1, 3, 6]];
// posX, posY, vieDepart, vieMax, attaque, index image, $1
var nombreEntite = [joueur.length, monstreCombat.length, 0] //nb joueur, nb monstre, nb invoc
var sort = [[[5, 5, 10, 1], [0, 2, 2, 2], [1, 2, 3, 3], [2, 2, 4, 4], [3, 2, 5, 5], [4, 2, 6, 6]]]//image sur terrain, image raccourci, portée, degat
var imgMonstre = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
for (var i = 0; i < imgMonstre.length; i++) {
	imgMonstre[i].src = "monstre/Monstre00" + (i + 1) + ".png"
}
var imgJoueur = [[new Image(), 26, 34], [new Image(), 72, 72], [new Image(), 72, 72]];
for (var i = 0; i < imgJoueur.length; i++) {
	imgJoueur[i][0].src = "personnage/Perso00" + (i + 1) + ".png"
}
var textCanvas = [];// 0: pseudo, 1: etat(combat, balade...)
textCanvas[0] = "pseudo"//prompt("comment tu t'appelle?");
textCanvas[1] = "Combat";
var mode = 0//0 = combat          1 = balade          2 = inventaire
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
var imgCase = [new Image(), new Image(), new Image(), new Image(), new Image()];
imgCase[4].src = "map/case4.jpg";
imgCase[3].src = "map/case3.jpg";
imgCase[2].src = "map/case2.jpg";
imgCase[1].src = "map/case.jpg";
imgCase[0].src = "map/vide.png";
imgCase[0].onload = affichageTerrain(textCanvas[1]);

//combat


	for (var i = 0; i < monstreCombat.length; i++) {
		listInterval[2 * i] = window.setInterval(attaqueMonstre, 500, i);
		listInterval[2 * i + 1] = window.setInterval(mouvementMonstre, 500 - 50 * i, i);
	}



//balade
