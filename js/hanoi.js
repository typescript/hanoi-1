
function Hanoi(canvas, torres, discos, qtd) {

	this.canvas = canvas;
	this.context = this.canvas.getContext('2d');
	this.torres = torres;
	this.discos = discos;

}

Hanoi.prototype = {

	desenharObjetos: function() {

		for (var i in this.torres) {
			this.torres[i].desenhar();
		}

		for (var i in this.discos) {
			this.discos[i].desenhar();
		}

	}

}