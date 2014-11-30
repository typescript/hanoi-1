
/*
 * "Classe" Disco
 */

// Método Construtor
function Disco(context, x, y, comprimento, altura, cor) {

	this.context = context;
	this.x = x;
	this.y = y;
	this.comprimento = comprimento;
	this.altura = altura;
	this.cor = cor;
	this.vel_x;
	this.vel_y;
	this.destino_x;
	this.destino_y;
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

	},

	desenharTudo: function(torres, discos) {
		for (var i = 0; i < torres.length; i++) {
			torres[i].desenhar();
		}

		for (var i = 0; i < discos.length; i++) {
			discos[i].desenhar();
		}
	},

	mover2: function(torre_inicio, torre_fim, torres, discos) {

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		if (this.destino_y == undefined) {
			this.vel_y = -5;
			this.destino_y = (torre_inicio.haste["y"] - this.altura);
		}

		if (this.y > this.destino_y) {
			this.y += this.vel_y;
		} else {
			this.vel_y = 0;
			this.desenharTudo(torres, discos);
			return;
		}

		this.desenharTudo(torres, discos);

		var disco = this;

		requestAnimationFrame(function(){
			disco.mover2(torre_inicio, torre_fim, torres, discos);
		});

	},

	sair: function(torre_inicio, torre_fim, torres, discos) {

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		if (this.destino_y == undefined) {
			this.vel_y = -5;
			this.destino_y = (torre_inicio.haste["y"] - this.altura) - this.vel_y;
		}

		if (this.y > this.destino_y) {
			this.y += this.vel_y;
		} else {
			this.vel_y = 0;
			this.mover(torre_inicio, torre_fim, torres, discos);
			return;
		}

		this.desenhar();

		for (var i = 0; i < torres.length; i++) {
			torres[i].desenhar();
		}

		for (var i = 0; i < discos.length; i++) {
			discos[i].desenhar();
		}

		var disco = this;

		requestAnimationFrame(function(){
			disco.sair(torre_inicio, torre_fim, torres, discos);
		});
	},

	mover: function(torre_inicio, torre_fim, torres, discos) {

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		if (this.destino_x == undefined) {
			if (torre_fim.base["x"] > this.x) {
				this.vel_x = 5;
				this.destino_x = torre_fim.base["x"] + (this.x - torre_inicio.base["x"]);
			} else {
				this.vel_x = -5;
			}
		}

		if (this.vel_x > 0) {
			if (this.x < this.destino_x) {
				this.x += this.vel_x;
			} else {
				this.vel_x = 0;
				this.entrar(torre_inicio, torre_fim, torres, discos);
				return;
			}
		}

		for (var i = 0; i < torres.length; i++) {
			torres[i].desenhar();
		}

		for (var i = 0; i < discos.length; i++) {
			discos[i].desenhar();
		}

		var disco = this;

		requestAnimationFrame(function(){
			disco.mover(torre_inicio, torre_fim, torres, discos);
		});
	},
	
	entrar: function(torre_inicio, torre_fim, torres, discos) {

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		if (this.vel_y == 0) {
			this.destino_y = torre_fim.base["y"] - (this.altura * torre_fim.qtd_discos) - this.altura;
			this.vel_y = 10;
		}

		if (this.y < this.destino_y) {
			this.y += this.vel_y;
		} else {
			this.vel_y = 0;

			for (var i = 0; i < torres.length; i++) {
				torres[i].desenhar();
			}

			for (var i = 0; i < discos.length; i++) {
				discos[i].desenhar();
			}

			torre_fim.qtd_discos++;

			return;
		}

		for (var i = 0; i < torres.length; i++) {
			torres[i].desenhar();
		}

		for (var i = 0; i < discos.length; i++) {
			discos[i].desenhar();
		}

		var disco = this;

		requestAnimationFrame(function(){
			disco.entrar(torre_inicio, torre_fim, torres, discos);
		});
	}

}