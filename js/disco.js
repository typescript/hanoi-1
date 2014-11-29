
/*
 * "Classe" Torre
 */

// Método Construtor
function Disco(context, x, y, comprimento, altura, cor, vel_x, vel_y) {

	this.context = context;
	this.x = x;
	this.y = y;
	this.comprimento = comprimento;
	this.altura = altura;
	this.cor = cor;
	this.vel_x = vel_x;
	this.vel_y = vel_y;

}

// Métodos
Disco.prototype = {

	desenhar: function(context) {

		this.context.fillStyle = this.cor;

		this.context.fillRect(
			this.x,
			this.y,
			this.comprimento,
			this.altura
		);

	}
	
}