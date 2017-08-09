/**
 * @var {number} tempsDebutPression la valeur des seconde inscrite sur le compteur au debut de la pression du bouton
 * @var {string[]} buttonMots liste contenant tous les mots posible sur les boutons
 * @var {array} buttonCouleur liste contenant les couleurs des bouton en valeur hexadecimal sous le format : [non appuyé, appuyé]
 */
var tempsDebutPression = 0;
var buttonMots = ["   Press", "   Hold", "Detonate", " BOOM"];
//                    blanc             rouge             jaune             vert              bleu
var buttonCouleur = [["#FFF", "#CCC"], ["#F00", "#C00"], ["#FF0", "#CC0"], ["#0F0", "#0C0"], ["#22F", "#22C"]];

//la case de modules correspondante a un bouton ressemble à : modules[i] = [2, couleur, idMot, clefTourne]

/**
 * il s'agit de la fonction qui dessine les boutons
 * @param {number} id l'id du canvas sur lequel on dessine le bouton
 * @param {number} pression = 1 si le bouton est pressé sinon = 0
 */
function drawBoutton(id, pression){
	canvas[id].fillStyle = "black";
	canvas[id].fillRect(11, 11, 229, 229);//on fait le fond noir
	canvas[id].fillStyle = "#F0BB15";//on prend la couleur de la clef
	if (modules[id][3] == false) {//si la clef n'est pas activée
		canvas[id].fillRect(160, 50, 60, 10);//on fait le rectangle horizontal
		canvas[id].fillStyle = "#999";
		canvas[id].beginPath();
	    canvas[id].arc(220, 100, 12, 0, Math.PI * 2, true);//on dessine le contour de la diode
		canvas[id].fill();
		canvas[id].fillStyle = "#050";
		canvas[id].beginPath();
	    canvas[id].arc(220, 100, 10, 0, Math.PI * 2, true);//on dessine une diode eteinte (vert foncé)
		canvas[id].fill();
	} else {//si la clef est tournée
		canvas[id].fillRect(185, 25, 10, 60);//on fait le rectangle vertical
		canvas[id].fillStyle = "#999";
		canvas[id].beginPath();
	    canvas[id].arc(220, 100, 12, 0, Math.PI * 2, true);//on dessine le contour de la diode
		canvas[id].fill();
		canvas[id].fillStyle = "#0F0";
		canvas[id].beginPath();
	    canvas[id].arc(220, 100, 10, 0, Math.PI * 2, true);//on dessine une diode allumée (vert clair)
		canvas[id].fill();
	}
	canvas[id].fillStyle = buttonCouleur[modules[id][1]][pression];//on prend la couleur correspondante à la couleur du bouton et a son etat (appuyé ou non)
	canvas[id].beginPath();
    canvas[id].arc(100, 150, 75, 0, Math.PI * 2, true);//on dessine le disque correspondant au bouton
	//pos x, pos y, rayon, angle initial, angle final, sens (true = inverse aiguille montre)
	canvas[id].fill();
	canvas[id].fillStyle = "black";
	canvas[id].font = "25px serif";
	canvas[id].fillText(buttonMots[modules[id][2]], 55, 155);//on ecrit ensuite le mot dedans
}

/**
 * il s'agit de la fonction qui donne la solution du bouton (le temps a appuyé et l'etat de la clef)
 * @param {number} id l'id du canvas sur lequel on test le bouton
 */
function getSolutionButton(id) {
	var couleur = modules[id][1];
	var mot = modules[id][2];
	var serie = numeroSerie[0];

	if (couleur == 4 && mot == 1) {//si le bouton est bleu avec le mot est HOLD
		modules[id][4] = 0;//on fait un clique rapide
		modules[id][5] = 0;//sans tourner la clef
	} else if (mot == 3) {//si le mot est BOOM
		if ((serie >= 254689 && serie <= 369813) || (serie >= 564813 && serie <= 794656)) {//avec un numero de serie correspondant a ceci
			modules[id][4] = 1;//on tourne la clef
		} else {//avec un autre numero de serie
			modules[id][4] = 0;//sans tourner la clef
		}
		modules[id][5] = 5;//il faut appuyer 5 seconde
	} else if (mot == 0) {//si le mot est PRESS
		if (couleur == 3 || couleur == 4) {//avec la couleur bleu ou vert
			modules[id][4] = 1;//on tourne la clef
		} else {//avec une autre couleur
			modules[id][4] = 0;//on ne tourne pas la clef
		}
		modules[id][5] = 3;//on appuie 3 secondes
	} else if (couleur == 1 && mot == 1) {//Rouge et DETONATE
		modules[id][4] = 1;//on tourne la clef
		if (serie >= 135984 && serie <= 531468) {//avec un numero de serie entre 135984 et 531468
			modules[id][5] = 3;//on appui 3 seconde
		} else {//avec un autres numero de serie
			modules[id][5] = 5;//on appuie 5 secondes
		}
	} else if ((couleur == 1 || couleur == 2) && mot == 1) {//couleur rouge ou jaune avec le mot HOLD
		modules[id][4] = 1;//on tourne la clef
		modules[id][5] = 3;//on appui 3 seconde
	} else {//si aucune condition n'est respecté jusque là
		modules[id][4] = 0;//on ne tourne pas la clef
		modules[id][5] = buttonMots[mot].length;//on appuie autant de seconde qu'il y a de lettres dans le mot
	}
}

/**
 * il s'agit de la fonction appellée lorsque l'on clique sur un bouton
 * @param {number} id l'id du canvas sur lequel on test le bouton
 * @param {number} posX la position horizontale relative au canvas
 * @param {number} posY la position verticale relative au module
 * @param {number} etat si on appui ou relache le bouton
 */
function pressButton(id, posX, posY, etat){
	var pression = 0;
	var tempsPression = 0;
	//on regarde l'etat de la clef
	var clefTourne = modules[id][3];
	//si on appuie sur la clef alors on la tourne
	if (posX >= 160 && posX <= 220 && clefTourne == false && posY >= 50 && posY <= 60 && etat == "down") {
		modules[id][3] = true;
	} else if (posX >= 185 && posX <= 195 && clefTourne == true && posY >= 25 && posY <= 85 && etat == "down"){
		modules[id][3] = false;
	}

	//si on appuie sur le bouton : la condition est un calcul de distance par rapport au centre du bouton
	if (Math.sqrt((posX - 100) * (posX - 100) + (posY - 150) * (posY - 150)) <= 75 && etat == "down" && etatModules[id] == 0) {
		pression = 1;
		tempsDebutPression = temps[1];
	}

	//si on relache le bouton
	if (Math.sqrt((posX - 100) * (posX - 100) + (posY - 150) * (posY - 150)) <= 75 && etat == "up" && etatModules[id] == 0) {
		pression = 0;
		if (tempsDebutPression - temps[1] >= 0) {//si le temps de pression est superieur a 0
			tempsPression = tempsDebutPression - temps[1];//on le prend
		} else {//sinon on a changé de minute (exemple on commence a appuyer a 1:02:00 et on relache a 0:58:00) le temps de pression est alors de 2 - 58 = -56
			tempsPression = (60 + tempsDebutPression) - temps[1]//alors on rajoute 60 qui permet d'obtenir la bonne durée (dans l'exemple -56 + 60 = 4)
		}

		//si la difference temps de pression et le temps demandé est inferieur a 1 seconde et que la clef est dans la bonne position
		if (Math.abs(tempsPression - modules[id][5]) <= 1 && clefTourne == modules[id][4]) {
			etatModules[id] = 1;//on a reussi
		} else {
			etatModules[id] = -1;//sinon on a perdu
			getVies();//on appelle la fonction enlevant une vie
		}
	}

	//les lignes suivante sont toujours executées
	avance();//on appelle la fonction qui verifie si on a gagné
	//on redessine le boutton
	drawEtat(id);
	drawBoutton(id, pression);
}
