
function Animacao(context) {

	this.context = context;
	this.sprites = [];
	this.rodando = false;

}

Animacao.prototype = {

	addSprite: function(sprite) {

		this.sprites.push(sprite);

	},

	rodar: function() {

		this.rodando = true;
		this.proximoFrame();

	},

	pararAnimacao: function() {
		this.ligado = false;
	},

	proximoFrame: function() {

		if (!rodando) return false;

		this.limparTela();

		for (var i in this.sprites) {
			this.sprites[i].atualizar();
		}

		for (var i in this.sprites) {
			this.sprites[i].desenhar();
		}

		var animacao = this;

		requestAnimationFrame(function(){
			animacao.proximoFrame();
		});

	},

	limparTela: function() {
		var context = this.context;
		context.clearRect(0, 0, hanoi_canvas.width, hanoi_canvas.height); // se der erro, volte aqui.
	}
};