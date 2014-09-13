
function Velha (nomeJogadorX, nomeJogadorO) {
	this.nomeJogadorX = nomeJogadorX;
	this.nomeJogadorO = nomeJogadorO;
	this.placarJogadorX = 0;
	this.placarJogadorX = 0;
	this.jogadorDaVez = null;
	this.jogar = function (jogadorDaVez) {
	};
};

//var jogo = new Velha(nomeJogadorX, nomeJogadorO);

// Gerar o DOM
function gerarDom() {
	var tabuleiro = document.getElementById("tabuleiro");
	var corpo = document.getElementsByTagName("body")[0];
	var cabecalho = document.createElement("div");
	cabecalho.setAttribute("id", "cabecalho");

	var lateral = document.createElement("div");
	lateral.id = "lateral";

	var score = document.createElement("div");
	score.id = "score";

	var botoes = document.createElement("div");
	botoes.id = "botoes";

	var popup = document.createElement("div");
	popup.id = "pop";

	var botaoX = document.createElement("button");
	botaoX.id = "botaoX";

	var botaoO = document.createElement("button");
	botaoO.id = "botaoO";

	var fundo = document.createElement("div");
	fundo.id = "fundo";

	corpo.appendChild(cabecalho);
	corpo.appendChild(lateral);
	corpo.appendChild(score);
	corpo.appendChild(botoes);
	popup.appendChild(botaoX);
	popup.appendChild(botaoO);
	corpo.appendChild(popup);
	corpo.appendChild(fundo);



	var tbl = document.createElement("table");
	for (var i = 0; i < 3; i++) {
		var row = document.createElement("tr");
		for (var j = 0; j < 3; j++) {
			var cell = document.createElement("td");
			cell.setAttribute("id", "b" + i + j);
			cell.setAttribute("onClick", "marcar(this.id);");
			row.appendChild(cell);
		}
		tbl.appendChild(row);
	}
	tabuleiro.appendChild(tbl);

}

// Cria matriz e zera os dados nos TDs
function createMatrix(acao, x, y) {
	if (acao == true) {
		matriz = new Array();
		for (var i = 0; i < x; i++) {
			matriz[i] = new Array();
			for (var j = 0; j < y; j++) {
				matriz[i][j] = -1;
				var ide = "b" + i + j;
				document.getElementById(ide).className = 'none';
			}
		}
	} else if (acao == false) {
		matriz = new Array();
		for (var i = 0; i < x; i++) {
			matriz[i] = new Array();
			for (var j = 0; j < y; j++) {
				matriz[i][j] = 10;
				var ide = "b" + i + j;
				document.getElementById(ide).className = 'none';
			}
		}
	}
	return matriz;
}

// Verifica qual o proximo elemento a se jogar
function checarProximo() {
	if (anterior == false) {
		anterior = true;
		return proximo;
	} else if (proximo == "X") {
		proximo = "O";
	}
	else {
		proximo = "X";
	}
	return proximo;
}

function trocarCor(arr) {
	for (var i = 0; i < arr.length; i++)
		if (arr[i] == proximo)
			document.getElementbyId("b" + i).class;
}

// Verifica se algum jogador ganhou ou se terminou sem ganhadores.
function checarFinal() {

	var cout = 0;

	// Verificar resultado nas linhas
	for (var i = 0; i < 3; i++) {
		if (matriz[i][0] == proximo && matriz[i][1] == proximo && matriz[i][2] == proximo) {
			if (proximo == "X") {
				return confirm(nomeX + " venceu o jogo.\nDeseja jogar novamente?");
			} else {
				return confirm(nomeO + " venceu o jogo.\nDeseja jogar novamente?");
			}
		}
	}

	// Verificar resultado nas colunas
	for (var i = 0; i < 3; i++) {
		if (matriz[0][i] == proximo && matriz[1][i] == proximo && matriz[2][i] == proximo) {
			if (proximo == "X") {
				return confirm(nomeX + " venceu o jogo.\nDeseja jogar novamente?");
			} else {
				return confirm(nomeO + " venceu o jogo.\nDeseja jogar novamente?");
			}
		}
	}

	// Verificar resultado na diagonal secundária
	var count = 0;
	for (var i = 0; i < 3; i++) {
		if (i == i)
			if (matriz[i][i] == proximo) {
				count++;
			}
	}

	// Se a soma de cout for 3, alguem ganhou
	if (count == 3) {
		if (proximo == "X") {
			return confirm(nomeX + " venceu o jogo.\nDeseja jogar novamente?");
		} else {
			return confirm(nomeO + " venceu o jogo.\nDeseja jogar novamente?");
		}
	}

	// Verificar resultado na diagonal principal
	var count = 0;
	for (var i = 0; i < 3; i++) {
	// Se a soma de cout for 3, alguem ganhou
		for (var j = 0; j < 3; j++) {
			if ((i + j) == 2) {
				if (matriz[i][j] == proximo) {
					count++;
				}
			}
		}
	}

	// Se a soma de cout for 3, alguem ganhou
	if (count == 3) {
		if (proximo == "X") {
			return confirm(nomeX + " venceu o jogo.\nDeseja jogar novamente?");
		} else {
			return confirm(nomeO + " venceu o jogo.\nDeseja jogar novamente?");
		}
	}
	var count = 0;
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (matriz[i][j] !== -1)
				count++;
		}
	}
	if (count == 9) {
		return confirm("Não houve ganhadores.\nDeseja jogar novamente?");
	}
}

// Retorna numeros, remove string

function soNumero(str) {
	str = str.toString();
	return str.replace(/\D/g, '');
}

// Marcar a proxima, tratando as possibilidades.

function marcar(referencia) {
	var ide = soNumero(referencia);
	var x = ide[0];
	var y = ide[1];
	// Checamos se o campo ainda nao foi marcado
	if (matriz[x][y] == -1) {
		// Checamos qual o proximo elemento
		if (checarProximo() == "X") {
			document.getElementById(referencia).className = "x_dourado";
			document.getElementById("fundo").innerHTML = "O";
		} else {
			document.getElementById(referencia).className = "o_dourado";
			document.getElementById("fundo").innerHTML = "X";
		}
		matriz[x][y] = proximo;
		// Checamos se alguem ganhou
		if (checarFinal()) {
			anterior = false;
			matriz = createMatrix(true, 3, 3);
			document.getElementById("fundo").innerHTML = proximo;
		} else {
			anterior = false;
			matriz = createMatrix(false, 3, 3);
			document.getElementById("fundo").innerHTML = "?";
		}
	} else {
		alert("Este campo já foi marcado previamente.");
	}
}

// Gerenciar pontuação

var contadorX = 0;
var contadorO = 0;
function inserirPonto(acao) {
	if (acao == "pontuar") {
		document.getElemetById("score");
	}

}

// Inicia o código.

function principal(check) {
	if (check == undefined) {
		anterior = false;
		gerarDom();
		matriz = createMatrix(false, 3, 3);
		document.getElementById("fundo").innerHTML = "?";
	} else {
		nomeX = prompt("Qual o nome do jogador X?");
		nomeO = prompt("Qual o nome do jogador O?");
		anterior = false;
		matriz = createMatrix(true, 3, 3);
		proximo = check;
		document.getElementById("fundo").innerHTML = check;
	}
}
