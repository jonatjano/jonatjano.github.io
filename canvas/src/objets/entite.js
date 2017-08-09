(function(global) {
	'use strict';
	global.entite = {};

	function entiteError(message){
	    this.message = message;
	}
	function createEntite() {
		return Object.create(Object.prototype, {
			coord: {},
			health: {},
			maxHealth: {},
			damage: {},
			image: {}
		}
	}
	function createPlayer() {
	    return Object.create(createEntite(), {
		    spell: {},
			selectedSpellList: {},
			globalSpellList: {},
		    AttackPoint: {},
			MovementPoint: {}
	    });
	}
	function createMonster() {
	    return Object.create(createEntite(), {
		    attackSpeed: {},
		    attackRange: {},
			movementSpeed: {}
	    });
	}
}
