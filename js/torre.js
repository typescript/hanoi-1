
/*
 * "Classe" Torre
 */

// Método Construtor
function Torre(comprimento_torre, altura_haste_torre, d_haste_torre_topo, d_haste_torre_esquerda) {

	this.haste = {
		comprimento: comprimento_torre,
		altura: altura_haste_torre,
		d_topo: d_haste_torre_topo,
		d_esquerda: d_haste_torre_esquerda,
	},
	
	this.base = {
		comprimento: this.haste["altura"] * 0.8,
		altura: this.haste["comprimento"] * 1.5,
		d_topo: this.haste["d_topo"] + this.haste["altura"],
		d_esquerda: this.haste["d_esquerda"] - (((this.haste["altura"] * 0.8) - this.haste["comprimento"])/2)
	}
}

// Métodos
Torre.prototype = {
	
	desenhar: function(context) {

		/*
		 * Estilizando as hastes
		 */
		var rect_gradiente = context.createLinearGradient(
			this.haste["d_esquerda"], 
			this.haste["d_topo"], 
			this.haste["d_esquerda"] + this.haste["comprimento"],
			this.haste["d_topo"] + this.haste["altura"]
		);

		rect_gradiente.addColorStop(0, "#5f3c24");
		rect_gradiente.addColorStop(1, "#bc8764");

		context.fillStyle = rect_gradiente;

		context.fillRect(
			this.haste["d_esquerda"], 
			this.haste["d_topo"], 
			this.haste["comprimento"],
			this.haste["altura"]
		);

		/*
		 * Estilizando as bases
		 */
		context.fillStyle = '#5f3c24';

		context.fillRect(
			this.base["d_esquerda"],
			this.base["d_topo"],
			this.base["comprimento"],
			this.base["altura"]
		);
	}

};