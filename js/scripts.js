
var canvas_container = $('#canvas_container');
var hanoi_canvas = $('#hanoi_canvas')[0];
var hanoi_context = hanoi_canvas.getContext('2d');

var comprimento_haste;
var altura_haste;
var x_haste_A;
var y_haste_A;

var cor_branca = Math.pow(256, 3) - 1;
var cor;
var altura_disco;

var discos = [];

var n_discos = 5;

var movimentos = [];

var hanoi = new Hanoi(hanoi_canvas);

window.addEventListener('resize', configurarHanoi, false);

function configurarHanoi() {

	hanoi.context.clearRect(0, 0, hanoi.canvas.width, hanoi.canvas.height);
	hanoi.torres = [];
	hanoi.discos = [];

	hanoi.context.canvas.width = $('#canvas_container').width();
	hanoi.context.canvas.height = hanoi.context.canvas.width * 0.5625;

	altura_haste = hanoi.context.canvas.height / 2;
	comprimento_haste = altura_haste * 0.05;
	x_haste_A = (hanoi.context.canvas.width - (comprimento_haste * 3)) / 4;
	y_haste_A = altura_haste / 2;

	// torre A
	hanoi.torres.push(
		new Torre(
			hanoi.context,
			x_haste_A,
			y_haste_A,		
			comprimento_haste,
			altura_haste,
			n_discos
		)
	);

	// torre B
	hanoi.torres.push(
		new Torre(
			hanoi.context,
			(2 * x_haste_A) + comprimento_haste,
			y_haste_A,		
			comprimento_haste,
			altura_haste,
			0
		)
	);

	// torre C
	hanoi.torres.push(
		new Torre(
			hanoi.context,
			(3 * x_haste_A) + (2 * comprimento_haste),
			y_haste_A,
			comprimento_haste,
			altura_haste,
			0
		)
	);

	altura_disco = (n_discos <= 10) ? ((hanoi.torres[0].haste["altura"] * 0.95) / 10) :
									  ((hanoi.torres[0].haste["altura"]) / n_discos);

	for (var i = n_discos-1; i >= 0; i--) {

		cor = Math.floor((cor_branca / n_discos) * i);
			
		while(cor.length < 6) {
	    	cor = "0" + color;
	    }

	    if (cor == '0') {
	    	cor = "000000";
	    }

	    cor = "#" + cor.toString(16);
	    var x_disco = hanoi.torres[0].base["x"] + (((hanoi.torres[0].base["comprimento"] / n_discos)*(i)) / 2);
	    var y_disco = hanoi.torres[0].base["y"] - ((i+1) * altura_disco); //+ (i+1);

		hanoi.discos.push(
			new Disco(
				hanoi.context,
				x_disco,
				y_disco,
				(hanoi.torres[0].base["comprimento"] / n_discos) * (n_discos-i),
				altura_disco,
				cor,
				0,
				0
			)
		);
	}

	hanoi.desenharObjetos();
}

configurarHanoi();

document.getElementById('form_hanoi').onsubmit = function() {
	return false;
}

document.getElementById('btn_n_discos').onclick = function() {
	n_discos = document.getElementsByName('in_n_discos')[0].value;
	configurarHanoi();
}

function resolverTorres(n, inicio, fim, auxiliar) {

	if (n == 1) {
		movimentos.push({disco: 1, torre_inicio: inicio, torre_fim: fim});
		console.log("Disco 1 de " + inicio + " para " + fim);
		return;
	}

	resolverTorres(n-1, inicio, auxiliar, fim);
	movimentos.push({disco: n, torre_inicio: inicio, torre_fim: fim});
	console.log("Disco " + n + " de " + inicio + " para " + fim);

	resolverTorres(n-1, auxiliar, fim, inicio);
}

function animar(i, movimentos) {

	if ( i < movimentos.length ) {

		hanoi.discos[movimentos[i].disco-1].sair(
			hanoi.torres[movimentos[i].torre_inicio],
			hanoi.torres[movimentos[i].torre_fim],
			hanoi.torres,
			hanoi.discos, 
			function() { animar(i+1, movimentos); }
		);

	}
}