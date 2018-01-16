<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/">
		<html>
			<head>
				<link rel="stylesheet" href="preview.css"/>
				<script>
					<!-- le timeout est nécessaire car le xsl prend un peu de temps à générer la page -->
					window.setTimeout(function()
					{
						<!-- on recupere la date d'aujourd'hui -->
						var today = new Date();
						<!-- on recupère tous les objets date -->
						var listDate = document.getElementsByClassName("date");
						for(var i = 0; i != listDate.length; i++)
						{
							<!-- on leur met comme valeur la date en enlevant la fin qui correspond au fuseau horraire -->
							listDate[i].value = today.toJSON().slice(0, 10);
						}
					}, 100)
				</script>
				<xsl:apply-templates select="form/fenetre" mode="head"/>
				<xsl:apply-templates select="form/window" mode="head"/>
			</head>
			<body>
				<xsl:apply-templates select="form/fenetre" mode="body"/>
				<xsl:apply-templates select="form/window" mode="body"/>
			</body>
		</html>
	</xsl:template>

	<!-- ajout du style position : absolute si tous les elements ont une coordonnée x et y -->
	<xsl:template match="window|fenetre" mode="head">
		<xsl:if test="count(*[@x]) = count(*) and count(*[@y]) = count(*)">
			<style>
				.element
				{
					position : absolute
				}
			</style>
			<title><xsl:value-of select="./@titre"/><xsl:value-of select="./@title"/></title>
		</xsl:if>
	</xsl:template>


	<xsl:template match="window|fenetre" mode="body">
		<div id="mainDiv" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<xsl:apply-templates/>
		</div>
	</xsl:template>


	<xsl:template match="label">
		<div class="element" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<xsl:value-of select="./@label"/>
		</div>
	</xsl:template>


	<xsl:template match="texte|text">
		<div class="element" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<table>
				<tr>
					<td class="label">
						<xsl:value-of select="./@label"/> : 
					</td>
					<td style="height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
						<xsl:variable name="type"><xsl:value-of select="@type"/></xsl:variable>

						<!-- Création de l'élément en fonction du type -->
						<xsl:choose>
							<xsl:when test="$type='int' or $type='entier'">
								<input type="number" value="0" step="1" />
							</xsl:when>
							<xsl:when test="$type='double'">
								<input type="number" value="0" step="0.1" />
							</xsl:when>
							<xsl:when test="$type='string' or $type='chaine'">
								<input type="text" />
							</xsl:when>
							<xsl:when test="$type='char' or $type='caractere'">
								<input type="text" maxlength="1" />
							</xsl:when>
						</xsl:choose>
					</td>
				</tr>
			</table>
		</div>
	</xsl:template>


	<xsl:template match="menu|dropdown">
		<div class="element" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<table>
				<tr>
					<td class="label">
						<xsl:value-of select="./@label"/> : 
					</td>
					<td style="height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
						<select name="{@label}">
							<xsl:apply-templates select="choice"/>
						</select>
					</td>
				</tr>
			</table>
		</div>
	</xsl:template>

	<xsl:template match="choice">
			<option><xsl:value-of select="@label"/></option>
	</xsl:template>

	<xsl:template match="case|checkbox">
		<div class="element" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<table>
				<tr>
					<td class="label">
						<xsl:value-of select="./@label"/> : 
					</td>
					<td style="height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
						<input type="checkbox"/>
					</td>
				</tr>
			</table>
		</div>
	</xsl:template>


	<xsl:template match="tableau|array">
		<div class="element" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<xsl:value-of select="./@label"/>
			<xsl:text> :</xsl:text>
			<xsl:variable name="type"><xsl:value-of select="@type"/></xsl:variable>

			<table>
				<!-- Création des variables -->
				<xsl:variable name="nbR">
					<xsl:choose>
						<xsl:when test="@nb_row &gt; 5 or @nb_lig &gt; 5">5</xsl:when>
						<xsl:otherwise>
								<xsl:value-of select="@nb_row"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>

				<xsl:variable name="nbC">
					<xsl:choose>
						<xsl:when test="@nb_col &gt; 5">5</xsl:when>
						<xsl:otherwise>
								<xsl:value-of select="@nb_col"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>



				<!-- Boucle de création du tableau en fonction du nombre de lignes et de colonnes -->
				<xsl:call-template name="loopLigne">
					<xsl:with-param name="nbR">
						<xsl:number value="$nbR" />
					</xsl:with-param>
					<xsl:with-param name="nbC">
						<xsl:number value="$nbC" />
					</xsl:with-param>
					<xsl:with-param name="type" select="@type"/>
					<xsl:with-param name="nbLoopR">0</xsl:with-param>
				</xsl:call-template>


				<!-- Affichage des labels de colonnes -->
				<tr>
					<td> </td>
					<!-- Création des colonnes -->
					<xsl:call-template name="loopLabelColonne">
						<xsl:with-param name="nbC">
							<xsl:number value="$nbC" />
						</xsl:with-param>
						<xsl:with-param name="nbLoopC">0</xsl:with-param>
					</xsl:call-template>
				</tr>
			</table>
		</div>
	</xsl:template>


	<xsl:template match="boutons|buttons">
		<div class="element" id="RADIO" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<xsl:value-of select="./@label"/>
			<table>
				<xsl:apply-templates select="button">
					<xsl:sort select="@ordinal"/>
				</xsl:apply-templates>
			</table>
		</div>
	</xsl:template>

	<xsl:template match="button|bouton">
		<tr>
			<td><xsl:value-of select="."/></td>
			<td><input type="radio" name="{../@label}"/></td>
		</tr>
	</xsl:template>

	<xsl:template match="calendrier|calendar">
		<div class="element" style="top: {@y}px; left: {@x}px; height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
			<table>
				<tr>
					<td class="label">
						<xsl:value-of select="./@label"/> : 
					</td>
					<td style="height: {@longueur}{@length}px; width: {@largeur}{@width}px;">
						<input class="date" type="date"/>
					</td>
				</tr>
			</table>
		</div>
	</xsl:template>



	<!-- Boucle créant les lignes -->
	<xsl:template name="loopLigne">
		<xsl:param name="nbR"></xsl:param>
		<xsl:param name="nbC"></xsl:param>
		<xsl:param name="nbLoopR"></xsl:param>
		<xsl:param name="type"></xsl:param>
	
		<xsl:choose>
			<xsl:when test="$nbR &gt; 0">
				<tr>
					<!-- Création des colonnes -->
					<xsl:call-template name="loopColonne">
						<xsl:with-param name="nbC">
							<xsl:number value="$nbC" />
						</xsl:with-param>
						<xsl:with-param name="nbR">
							<xsl:number value="$nbR" />
						</xsl:with-param>
						<xsl:with-param name="nbLoopC">0</xsl:with-param>
						<xsl:with-param name="nbLoopR">
							<xsl:number value="$nbLoopR" />
						</xsl:with-param>
					</xsl:call-template>

					<!-- Affichage de l'élément -->
					<xsl:if test="$nbLoopR='0'">
						<xsl:choose>
							<xsl:when test="$type='boolean' or $type='booleen'">
								<td>Valeur : <input type="checkbox"/></td>
							</xsl:when>
							<xsl:otherwise>
								<td>Valeur : <input type="text"/></td>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
				</tr>


				<!--<xsl:text>&#xa;</xsl:text> --><!-- newline -->
				<xsl:call-template name="loopLigne">
					<xsl:with-param name="nbR">
						<xsl:number value="number($nbR)-1" />
					</xsl:with-param>
					<xsl:with-param name="nbC">
						<xsl:number value="$nbC" />
					</xsl:with-param>
					<xsl:with-param name="nbLoopR">
						<xsl:number value="number($nbLoopR)+1" />
					</xsl:with-param>
					<xsl:with-param name="type" select="@type"/>
				</xsl:call-template>
			</xsl:when>
		</xsl:choose>
	</xsl:template>


	<!-- Boucle créant les colonnes -->
	<xsl:template name="loopColonne">
		<xsl:param name="nbC"></xsl:param>
		<xsl:param name="nbR"></xsl:param>
		<xsl:param name="nbLoopC"></xsl:param>
		<xsl:param name="nbLoopR"></xsl:param>

		<xsl:choose>
			<xsl:when test="$nbC &gt; 0">
				<xsl:if test="$nbLoopC='0'">
					<td><xsl:value-of select="$nbR - 1" /></td>
				</xsl:if>

				<td><input type="button" name="zzz" value=" "/></td>


				<!--<xsl:text>&#xa;</xsl:text> --><!-- newline -->
				<xsl:call-template name="loopColonne">
					<xsl:with-param name="nbC">
						<xsl:number value="number($nbC)-1" />
					</xsl:with-param>
					<xsl:with-param name="nbLoopC">
						<xsl:number value="number($nbLoopC)+1" />
					</xsl:with-param>
				</xsl:call-template>
			</xsl:when>
		</xsl:choose>
	</xsl:template>


	<!-- Boucle créant les labels des colonnes -->
	<xsl:template name="loopLabelColonne">
		<xsl:param name="nbC"></xsl:param>
		<xsl:param name="nbLoopC"></xsl:param>

		<xsl:choose>
			<xsl:when test="$nbC &gt; 0">
				<td>&#160;&#160;<xsl:value-of select="$nbLoopC" /></td>


				<!--<xsl:text>&#xa;</xsl:text> --><!-- newline -->
				<xsl:call-template name="loopLabelColonne">
					<xsl:with-param name="nbC">
						<xsl:number value="number($nbC)-1" />
					</xsl:with-param>
					<xsl:with-param name="nbLoopC">
						<xsl:number value="number($nbLoopC)+1" />
					</xsl:with-param>
				</xsl:call-template>
			</xsl:when>
		</xsl:choose>
	</xsl:template>

</xsl:stylesheet>
