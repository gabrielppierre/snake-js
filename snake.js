//configura o canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//configura as variáveis do jogo
let pontuacao = 0;
let gameLoop;
let cobra = [{
        x: 10,
        y: 10
    },
    {
        x: 9,
        y: 10
    },
    {
        x: 8,
        y: 10
    }
];
let direcao = 'direita';
let comida = {
    x: Math.floor(Math.random() * 40),
    y: Math.floor(Math.random() * 40)
};

//configura as funções do jogo
function iniciarJogo() {
    pontuacao = 0;
    cobra = [{x: 10, y: 10},{x: 9, y: 10},{x: 8,y: 10}
    ];
    direcao = 'direita';
    comida = {
        x: Math.floor(Math.random() * 40),
        y: Math.floor(Math.random() * 40)
    };
    document.getElementById('botao-reinicio').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';
    gameLoop = setInterval(atualizar, 100);
}

function atualizar() {
    //move a cobra
    const cabeca = {
        x: cobra[0].x,
        y: cobra[0].y
    };
    switch (direcao) {
        case 'cima':
            cabeca.y--;
            break;
        case 'baixo':
            cabeca.y++;
            break;
        case 'esquerda':
            cabeca.x--;
            break;
        case 'direita':
            cabeca.x++;
            break;
    }
    cobra.unshift(cabeca);

    //verifica se houve colisão com a comida
    if (cabeca.x === comida.x && cabeca.y === comida.y) {
        pontuacao++;
        comida = {
            x: Math.floor(Math.random() * 40),
            y: Math.floor(Math.random() * 40)
        };
    } else {
        cobra.pop();
    }

    //verifica se houve colisão com as paredes ou com o próprio corpo
    if (cabeca.x < 0 || cabeca.x >= 40 || cabeca.y < 0 || cabeca.y >= 40 || cobra.slice(1).some(segmento => segmento.x === cabeca.x && segmento.y === cabeca.y)) {
        clearInterval(gameLoop);
        document.getElementById('pontuacao-final').innerText = pontuacao;
        document.getElementById('botao-reinicio').style.display = 'block';
        document.getElementById('game-over').style.display = 'block';
    }

    //atualiza a pontuação
    document.getElementById('pontuacao').innerText = `Pontuação: ${pontuacao}`;

    //limpa o canvas e desenha a cobra e a comida
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000';
    cobra.forEach(segmento => {
        ctx.fillRect(segmento.x * 10, segmento.y * 10, 10, 10);
    });
    ctx.fillStyle = '#f00';
    ctx.fillRect(comida.x * 10, comida.y * 10, 10, 10);
}

//configura o loop do jogo
iniciarJogo();

//configura as teclas do teclado
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direcao !== 'baixo') direcao = 'cima';
            break;
        case 'ArrowDown':
            if (direcao !== 'cima') direcao = 'baixo';
            break;
        case 'ArrowLeft':
            if (direcao !== 'direita') direcao = 'esquerda';
            break;
        case 'ArrowRight':
            if (direcao !== 'esquerda') direcao = 'direita';
            break;
    }
});

//configura o botão de reinício
document.getElementById('botao-reinicio').addEventListener('click', iniciarJogo);

//configura o botão de reinício do game over
document.getElementById('game-over-restart-button').addEventListener('click', iniciarJogo);

//mostra o botão de início quando o jogo acabar
document.getElementById('canvas').addEventListener('click', () => {
    if (document.getElementById('botao-reinicio').style.display === 'block') {
        document.getElementById('botao-reinicio').style.display = 'none';
        document.getElementById('game-over').style.display = 'none';
        iniciarJogo();
    }
});