
/*
 * "Classe" Torre
 */

// Método Construtor
function Disco(comprimento_disco, altura_disco, x_atual, y_atual, cor) {

	this.comprimento = comprimento_disco,
	this.altura = altura_disco,
	this.x_atual = x_atual,
	this.y_atual = y_atual,
	this.cor = cor

}

// Métodos
Disco.prototype = {

	desenhar: function(context) {

		context.fillStyle = this.cor;

		context.fillRect(
			this.x_atual,
			this.y_atual,
			this.comprimento,
			this.altura
		);
	}
	
}