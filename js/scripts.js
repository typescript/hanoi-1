
var canvas_container = document.getElementById('canvas_container');
var hanoi_canvas = document.getElementById('window_hanoi');
var hanoi_context = hanoi_canvas.getContext('2d');

var comprimento_haste_torre;
var altura_haste_torre;
var d_haste_torre_topo;
var d_haste_torre_esquerda;

var n_discos = 0;

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

/*
 * alterando a altura e largura do quadro de desenho dinamicamente a cada
 * redimensionamento de tela (incompleto)
 */
function resizeCanvas() {

	hanoi_canvas.width = document.getElementById('canvas_container').offsetWidth;

	// definindo altura do quadro por proporção 16:9
	hanoi_canvas.height = hanoi_canvas.width * 0.5625;

	altura_haste_torre = hanoi_canvas.height / 2;
	comprimento_haste_torre = altura_haste_torre * 0.05;
	d_haste_torre_topo = altura_haste_torre / 2;
	d_haste_torre_esquerda = (hanoi_canvas.width - (comprimento_haste_torre * 3)) / 4;

	desenharObjetos();
}

function desenharObjetos() {

	hanoi_context.clearRect(0, 0, hanoi_canvas.width, hanoi_canvas.height);

	var torreA = new Torre(
		comprimento_haste_torre,
		altura_haste_torre,
		d_haste_torre_topo,
		d_haste_torre_esquerda
	);
	torreA.desenhar(hanoi_context);

	var torreB = new Torre(
		comprimento_haste_torre,
		altura_haste_torre,
		d_haste_torre_topo,
		(2*d_haste_torre_esquerda) + comprimento_haste_torre
	);
	torreB.desenhar(hanoi_context);

	var torreB = new Torre(
		comprimento_haste_torre,
		altura_haste_torre,
		d_haste_torre_topo,
		(3*d_haste_torre_esquerda) + (2*comprimento_haste_torre)
	);
	torreB.desenhar(hanoi_context);

	// testeeeess dos discos

	var cor_branca = Math.pow(256, 3) - 1;
	var cor;
	var discos = [];
	var altura_disco;

	if (n_discos <= 10) {
		altura_disco = (torreA.haste["altura"]*0.95) / 10;
	} else {
		altura_disco = (torreA.haste["altura"]*0.95) / n_discos;
	}

	for (var i = 0; i < n_discos; i++) {

		cor = Math.floor((cor_branca / n_discos) * i);
		
		while(cor.length < 6) {
	    	cor = "0" + color;
	    }

	    cor = "#" + cor.toString(16);

		discos[i] = new Disco(
			(torreA.base["comprimento"] / n_discos) * (n_discos-i),
			altura_disco,
			150,
			torreA.base["d_topo"] - (i+1) * altura_disco,
			cor
		);

		discos[i].desenhar(hanoi_context);
	}


	// testeeeess				
}

document.getElementById('form_hanoi').onsubmit = function() {
	return false;
}

document.getElementById('btn_n_discos').onclick = function() {
	n_discos = document.getElementsByName('in_n_discos')[0].value;
	desenharObjetos();
}