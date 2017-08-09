var filsBc = [0];
var filsRg = [0];
var filsJn = [0];
var filsVt = [0];
var filsBe = [0];

function drawFils(id) {

	canvas[id].fillStyle = "black";
	canvas[id].fillRect(11, 11, 229, 229)

    canvas[id].beginPath();
    canvas[id].moveTo(50, 40);
    canvas[id].lineTo(50, 210);
    canvas[id].lineTo(25, 225);
    canvas[id].lineTo(25, 25);
    canvas[id].fillStyle = "#404040";
    canvas[id].fill();

    canvas[id].moveTo(200, 210);
    canvas[id].lineTo(200, 40);
    canvas[id].lineTo(225, 25);
    canvas[id].lineTo(225, 225);
    canvas[id].fillStyle = "#404040";
    canvas[id].fill();

//dessin des bornes des fils
   for (var colonne = 0; colonne < 2; colonne++){ // colonne => colonne des carrés (droite et gauche)
    	var rectnub = 1;
    	for (rectnub = 1; rectnub < 6; rectnub++) { //Dessine de haut en bas les petits carrés d'accroche des fils
    		canvas[id].fillStyle = "black";
			canvas[id].fillRect(38 + (colonne * 170), (38 + (rectnub * 28)), 4, 4);
    	}
    }

	getFils(id);
//dessin des fils
	for (var i = 1; i < filsBc.length; i++) {
			canvas[id].beginPath();
			if (modules[id][filsBc[i] + 2][1] == true) { //Si fil non coupé
				canvas[id].moveTo(40, 68 + (28 * (filsBc[i])));
				canvas[id].lineTo(210, 68 + (28 * (filsBc[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'white';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			} else { //sinon si fil coupé
				canvas[id].moveTo(40, 68 + (28 * (filsBc[i])));
				canvas[id].lineTo(80, 55 + (28 * (filsBc[i])));
				canvas[id].lineTo(100, 72 + (28 * (filsBc[i])));
				canvas[id].moveTo(210, 68 + (28 * (filsBc[i])));
				canvas[id].lineTo(195, 60 + (28 * (filsBc[i])));
				canvas[id].lineTo(150, 78 + (28 * (filsBc[i])));
				canvas[id].lineTo(125, 55 + (28 * (filsBc[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'white';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			}
	}
	for (var i = 1; i < filsRg.length; i++) {
			canvas[id].beginPath();
			if (modules[id][filsRg[i] + 2][1] == true) { //Si fil non coupé
				canvas[id].moveTo(40, 68 + (28 * (filsRg[i])));
				canvas[id].lineTo(210, 68 + (28 * (filsRg[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'red';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			} else { //sinonn si fil coupé
				canvas[id].moveTo(40, 68 + (28 * (filsRg[i])));
				canvas[id].lineTo(80, 55 + (28 * (filsRg[i])));
				canvas[id].lineTo(100, 72 + (28 * (filsRg[i])));
				canvas[id].moveTo(210, 68 + (28 * (filsRg[i])));
				canvas[id].lineTo(195, 60 + (28 * (filsRg[i])));
				canvas[id].lineTo(150, 78 + (28 * (filsRg[i])));
				canvas[id].lineTo(125, 55 + (28 * (filsRg[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'red';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			}
	}
	for (var i = 1; i < filsJn.length; i++) {
			canvas[id].beginPath();
			if (modules[id][filsJn[i] + 2][1] == true) { //Si fil non coupé
				canvas[id].moveTo(40, 68 + (28 * (filsJn[i])));
				canvas[id].lineTo(210, 68 + (28 * (filsJn[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'yellow';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			} else { //sinonn si fil coupé
				canvas[id].moveTo(40, 68 + (28 * (filsJn[i])));
				canvas[id].lineTo(80, 55 + (28 * (filsJn[i])));
				canvas[id].lineTo(100, 72 + (28 * (filsJn[i])));
				canvas[id].moveTo(210, 68 + (28 * (filsJn[i])));
				canvas[id].lineTo(195, 60 + (28 * (filsJn[i])));
				canvas[id].lineTo(150, 78 + (28 * (filsJn[i])));
				canvas[id].lineTo(125, 55 + (28 * (filsJn[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'yellow';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			}
	}
	for (var i = 1; i < filsVt.length; i++) {
			canvas[id].beginPath();
			if (modules[id][filsVt[i] + 2][1] == true) { //Si fil non coupé
				canvas[id].moveTo(40, 68 + (28 * (filsVt[i])));
				canvas[id].lineTo(210, 68 + (28 * (filsVt[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'green';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			} else { //sinonn si fil coupé
				canvas[id].moveTo(40, 68 + (28 * (filsVt[i])));
				canvas[id].lineTo(80, 55 + (28 * (filsVt[i])));
				canvas[id].lineTo(100, 72 + (28 * (filsVt[i])));
				canvas[id].moveTo(210, 68 + (28 * (filsVt[i])));
				canvas[id].lineTo(195, 60 + (28 * (filsVt[i])));
				canvas[id].lineTo(150, 78 + (28 * (filsVt[i])));
				canvas[id].lineTo(125, 55 + (28 * (filsVt[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'green';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			}
	}
	for (var i = 1; i < filsBe.length; i++) {
			canvas[id].beginPath();
			if (modules[id][filsBe[i] + 2][1] == true) { //Si fil non coupé
				canvas[id].moveTo(40, 68 + (28 * (filsBe[i])));
				canvas[id].lineTo(210, 68 + (28 * (filsBe[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'blue';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			} else { //sinonn si fil coupé
				canvas[id].moveTo(40, 68 + (28 * (filsBe[i])));
				canvas[id].lineTo(80, 55 + (28 * (filsBe[i])));
				canvas[id].lineTo(100, 72 + (28 * (filsBe[i])));
				canvas[id].moveTo(210, 68 + (28 * (filsBe[i])));
				canvas[id].lineTo(195, 60 + (28 * (filsBe[i])));
				canvas[id].lineTo(150, 78 + (28 * (filsBe[i])));
				canvas[id].lineTo(125, 55 + (28 * (filsBe[i])));
				canvas[id].lineCap = 'round';
				canvas[id].strokeStyle = 'blue';
				canvas[id].lineWidth = 6;
				canvas[id].stroke();
			}
	}
	canvas[id].closePath();
}
//assignation des positions des fils dans des listes en fonction des couleurs
function getFils(id){
	filsBc = [0];
	filsRg = [0];
	filsJn = [0];
	filsVt = [0];
	filsBe = [0];
	for (var i = 2; i < 7; i++) { //assigne listes avec nb fils et leur positions, on obtient une liste du type [3;position1;position2;position3]
		switch (modules[id][i][0]) {
			case 0:
				filsBc[0]++;
				filsBc[filsBc.length] = i - 2;
				break;
			case 1:
				filsRg[0]++;
				filsRg[filsRg.length] = i - 2;
				break;
			case 2:
				filsJn[0]++;
				filsJn[filsJn.length] = i - 2;
				break;
			case 3:
				filsVt[0]++;
				filsVt[filsVt.length] = i - 2;
				break;
			case 4:
				filsBe[0]++;
				filsBe[filsBe.length] = i - 2;
				break;
			default:
		}
	}
}
//Assignation des solutions
function getSolutionFils(id){
	getFils(id);
	/*
	alert("Blanc" + filsBc);
	alert("Rouges" + filsRg);
	alert("Jaunes" + filsJn);
	alert("Verts" + filsVt);
	alert("Bleus" + filsBe);
	*/
	switch (modules[id][1]) { //nb fils du module
		case 2:
			if (filsRg[0] == 1) { // 1 fil rouge
			 	if (filsRg[1] == 0) {
			 		modules[id][7] = 1; // fil rouge en position 0 => couper l'autre fil, celui en position 1
			 	}
				else {
			 		modules[id][7] = 0; // fil rouge en position 1 => couper l'autre fil, celui en position 0
			 	}
			}

			else if ((modules[id][2][0] == modules[id][3][0]) && numeroSerie[0]%2==0) {//couleur des deux fils identique et nu série pair
				modules[id][7] = 0; //premier fil
			}

			else if (filsRg[0] == 0 && filsBc[0] == 1) { //Pas de rouges et 1 blanc
				modules[id][7] = 0; // couper le premier
			}
			else {
				modules[id][7] = 1; // si rien n'est respecté, couper le deuxième
			}
			break;

		case 3:
			if (filsJn[0] == 1) { //1 fil jaune
				modules[id][7] = 2; // couper le dernier (le troisième)
			}
			else if (filsVt[0] >= 1) {//si plusieurs fils verts
				modules[id][7] = filsVt[1]; // couper le premier fil vert
			}
			else if (filsJn[0] > 1) { //si plusieurs fils jaunes
				modules[id][7] = 1; // couper celui du milieu: position 1
			}
			else {
				modules[id][7] = 0; //  si rien n'est respecté, couper le premier
			}
			break;

		case 4:
			if (filsBe[0] == 1 && filsBc[0] == 2) { // Si un fil bleu et 2 blancs
				modules[id][7] = filsBe[1]; // Couper le bleu
			} else if (filsBe[0] > 1 && filsBc[0] == 2) { // Si plusierus fils bleu et 2 blancs
				modules[id][7] = filsBc[1]; // Couper le 1er blanc
			} else if (filsBe[0] == 1) { // Si 1 fil bleu
				modules[id][7] = filsBe[1] - 1; // Couper fil du dessus
				if (modules[id][7] == -1) { // Si fil bleu est en premier donc position solution = -1
					modules[id][7] = 3; // Couper dernier
				}
			} else {
				modules[id][7] = 1; // Si rien n'est respecté, couper 2eme
			}
			break;

		case 5:
			if ((filsBc[0] == 1) && (filsRg[0] == 1) && (filsJn[0] == 1) && (filsVt[0] == 1) && (filsBe[0] == 1)) { // Si tout fils st différents: 1 de chaque
				modules[id][7] = filsBe[1]; // Couper fil bleu
			}
			else if (filsBc[0] == 0) { // Si pas de fil blanc
				modules[id][7] = 3; // Couper 4eme
			}

			else if (filsVt[0] == 1 && filsRg[0] == 0) {//1 fil vert et pas de rouges
					modules[id][7] = filsVt[1]; //couper fil vert
			}

			else if ((filsBc[0] == 5) || (filsRg[0] == 5) || (filsJn[0] == 5) || (filsVt[0] == 5) || (filsBe[0] == 5)) { // Si tout les fils st de même couleur: l'une des couleurs apparait 5 fois
				modules[id][7] = 2; // Couper le 3eme
			}
			else {
				modules[id][7] = 4; // couper dernier
			}
			break;

		default:
	}

}

function cutFils(id, posX, posY){
	if (posX > 50 && posX < 200 && etatModules[id] == 0) { //on clique et souris pointe les fils et module encore neutre
		switch (true) {
			case (posY > 60 && posY < 74): //souris pointe 1er fil
				modules[id][2][1] = false; //change état du fil dans liste du module
				if (modules[id][7] == 0) { //si solution est 1er fil
					etatModules[id] = 1; //module réussi
				} else {
					etatModules[id] = -1; //sinon module échoué
					getVies(); //si échoué, on perd une vie
				}
			break;

			case (posY > 88 && posY < 102):
				modules[id][3][1] = false;
				if (modules[id][7] == 1) {
					etatModules[id] = 1;
				} else {
					etatModules[id] = -1;
					getVies();
				}
			break;

			case (posY > 116 && posY < 130 && modules[id][1] >= 3):
				modules[id][4][1] = false;
				if (modules[id][7] == 2) {
					etatModules[id] = 1;
				} else {
					etatModules[id] = -1;
					getVies();
				}
			break;

			case (posY > 144 && posY < 158 && modules[id][1] >= 4):
				modules[id][5][1] = false;
				if (modules[id][7] == 3) {
					etatModules[id] = 1;
				} else {
					etatModules[id] = -1;
					getVies();
				}
			break;

			case (posY > 173 && posY < 187 && modules[id][1] >= 5):
				modules[id][6][1] = false;
				if (modules[id][7] == 4) {
					etatModules[id] = 1;
				} else {
					etatModules[id] = -1;
					getVies();
				}
			break;

			default:
		}
	affichage(id);
	avance();
	}
}
