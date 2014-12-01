
/*
 * "Classe" Disco
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
	this.destino_x;
	this.destino_y;
}

// Métodos
Disco.prototype = {

	desenhar: function(context) {

		this.context.fillStyle = this.cor;
		//this.context.strokeStyle = "blue";
    	//this.context.lineWidth   = 1;

    	this.context.fillRect(
		//this.context.strokeRect(
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

	sair: function(torre_inicio, torre_fim, torres, discos, callback) {

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		if (this.vel_y == 0) {
			this.vel_y = -5;
			this.destino_y = (torre_inicio.haste["y"] - this.altura);
		}

		if (this.y >= this.destino_y) {
			this.y += this.vel_y;
		} else {
			this.vel_y = 0;
			this.y = this.destino_y;
			torre_inicio.qtd_discos--;
			this.mover(torre_inicio, torre_fim, torres, discos, callback);
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
			disco.sair(torre_inicio, torre_fim, torres, discos, callback);
		});
	},

	mover: function(torre_inicio, torre_fim, torres, discos, callback) {

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		if (this.vel_x == 0) {
			if (torre_fim.base["x"] > this.x) {
				this.vel_x = 5;
			} else {
				this.vel_x = -5;
			}
			this.destino_x = torre_fim.base["x"] + (this.x - torre_inicio.base["x"]);
		}

		if (this.vel_x > 0) {
			if (this.x <= this.destino_x) {
				this.x += this.vel_x;
			} else {
				this.vel_x = 0;
				this.x = this.destino_x;
				this.entrar(torre_inicio, torre_fim, torres, discos, callback);
				return;
			}
		}

		if (this.vel_x < 0) {
			if (this.x >= this.destino_x) {
				this.x += this.vel_x;
			} else {
				this.vel_x = 0;
				this.x = this.destino_x;
				this.entrar(torre_inicio, torre_fim, torres, discos, callback);
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
			disco.mover(torre_inicio, torre_fim, torres, discos,callback);
		});
	},
	
	entrar: function(torre_inicio, torre_fim, torres, discos,callback) {

		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		if (this.vel_y == 0) {
			this.destino_y = torre_fim.base["y"] - (this.altura * torre_fim.qtd_discos) - this.altura;
			this.vel_y = 5;
		}

		if (this.y <= this.destino_y) {
			this.y += this.vel_y;
		} else {
			this.vel_y = 0;
			this.y = this.destino_y;

			for (var i = 0; i < torres.length; i++) {
				torres[i].desenhar();
			}

			for (var i = 0; i < discos.length; i++) {
				discos[i].desenhar();
			}

			torre_fim.qtd_discos++;
			callback();
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
			disco.entrar(torre_inicio, torre_fim, torres, discos,callback);
		});
	}

}