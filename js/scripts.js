
var canvas_container = document.getElementById('canvas_container');
var hanoi_canvas = document.getElementById('window_hanoi');
var hanoi_context = hanoi_canvas.getContext('2d');

var comprimento_haste;
var altura_haste;
var x_haste_A;
var y_haste_A;

var n_discos = 5;

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

/*
 * alterando a altura e largura do quadro de desenho dinamicamente a cada
 * redimensionamento de tela
 */
function resizeCanvas() {

	hanoi_canvas.width = document.getElementById('canvas_container').offsetWidth;

	// definindo altura do quadro por proporção 16:9
	hanoi_canvas.height = hanoi_canvas.width * 0.5625;

	// torres que se adaptam
	altura_haste = hanoi_canvas.height / 2;
	comprimento_haste = altura_haste * 0.05;
	x_haste_A = (hanoi_canvas.width - (comprimento_haste * 3)) / 4;
	y_haste_A = altura_haste / 2;

	desenharObjetos();
}

function desenharObjetos() {

	hanoi_context.clearRect(0, 0, hanoi_canvas.width, hanoi_canvas.height);

	var torreA = new Torre(
		hanoi_context,
		x_haste_A,
		y_haste_A,		
		comprimento_haste,
		altura_haste
	);
	torreA.desenhar();

	var torreB = new Torre(
		hanoi_context,
		(2 * x_haste_A) + comprimento_haste,
		y_haste_A,		
		comprimento_haste,
		altura_haste
	);
	torreB.desenhar();

	var torreC = new Torre(
		hanoi_context,
		(3 * x_haste_A) + (2 * comprimento_haste),
		y_haste_A,
		comprimento_haste,
		altura_haste		
	);
	torreC.desenhar();

	var cor_branca = Math.pow(256, 3) - 1;
	var cor;
	var discos = [];
	var altura_disco;

	if (n_discos <= 10) {
		altura_disco = (torreA.haste["altura"]*0.95) / 10;
	} else {
		if (n_discos > 15) { n_discos = 15; }
		altura_disco = (torreA.haste["altura"]*0.95) / n_discos;
	}

	for (var i = 0; i < n_discos; i++) {

		cor = Math.floor((cor_branca / n_discos) * i);
		
		while(cor.length < 6) {
	    	cor = "0" + color;
	    }

	    if (cor == '0') {
	    	cor = "000000";
	    }

	    cor = "#" + cor.toString(16);
	    var x = torreA.base["x"] + (((torreA.base["comprimento"] / n_discos)*(i)) / 2);
	    var y = torreA.base["y"] - ((i+1) * altura_disco);

		discos[i] = new Disco(
			hanoi_context,
			x,
			y,
			(torreA.base["comprimento"] / n_discos) * (n_discos-i),
			altura_disco,
			cor
		);

		discos[i].desenhar();
	}
			
}

document.getElementById('form_hanoi').onsubmit = function() {
	return false;
}

document.getElementById('btn_n_discos').onclick = function() {
	n_discos = document.getElementsByName('in_n_discos')[0].value;
	desenharObjetos();
}