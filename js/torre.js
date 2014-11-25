
/*
 * "Classe" Torre
 */

// Método Construtor
function Torre(context, comprimento_torre, altura_haste_torre, d_haste_torre_topo, d_haste_torre_esquerda, qtd_discos) {

	this.context = context,
	this.qtd_discos = qtd_discos,

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
	
	desenhar: function() {

		/*
		 * Estilizando as hastes
		 */
		var rect_gradiente = this.context.createLinearGradient(
			this.haste["d_esquerda"], 
			this.haste["d_topo"], 
			this.haste["d_esquerda"] + this.haste["comprimento"],
			this.haste["d_topo"] + this.haste["altura"]
		);

		rect_gradiente.addColorStop(0, "#5f3c24");
		rect_gradiente.addColorStop(1, "#bc8764");

		this.context.fillStyle = rect_gradiente;

		this.context.fillRect(
			this.haste["d_esquerda"], 
			this.haste["d_topo"], 
			this.haste["comprimento"],
			this.haste["altura"]
		);

		/*
		 * Estilizando as bases
		 */
		this.context.fillStyle = '#5f3c24';

		this.context.fillRect(
			this.base["d_esquerda"],
			this.base["d_topo"],
			this.base["comprimento"],
			this.base["altura"]
		);
	}

};