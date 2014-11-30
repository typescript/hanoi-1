
/*
 * "Classe" Torre
 */

// Método Construtor
function Torre(context, x_haste, y_haste, comprimento_haste, altura_haste, qtd_discos) {

	this.context = context;
	this.qtd_discos = qtd_discos;

	this.haste = {
		x: x_haste,
		y: y_haste,
		comprimento: comprimento_haste,
		altura: altura_haste
	};
	
	this.base = {
		// Centraliando a base da torre
		x: this.haste["x"] - (((this.haste["altura"] * 0.8) - this.haste["comprimento"])/2),
		
		y: this.haste["y"] + this.haste["altura"],

		// 80% da altura da haste
		comprimento: this.haste["altura"] * 0.8,
		
		altura: this.haste["comprimento"] * 1.5
	};
}

// Métodos
Torre.prototype = {
	
	desenhar: function() {

		/*
		 * Estilizando as hastes
		 */
		var rect_gradiente = this.context.createLinearGradient(
			this.haste["x"], 
			this.haste["y"], 
			this.haste["x"] + this.haste["comprimento"],
			this.haste["y"] + this.haste["altura"]
		);

		rect_gradiente.addColorStop(0, "#5f3c24");
		rect_gradiente.addColorStop(1, "#bc8764");

		this.context.fillStyle = rect_gradiente;

		this.context.fillRect(
			this.haste["x"], 
			this.haste["y"], 
			this.haste["comprimento"],
			this.haste["altura"]
		);

		/*
		 * Estilizando as bases
		 */
		this.context.fillStyle = '#5f3c24';

		this.context.fillRect(
			this.base["x"],
			this.base["y"],
			this.base["comprimento"],
			this.base["altura"]
		);
	}

}