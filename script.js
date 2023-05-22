const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.querySelector('.restart-button');
const distanceInfo = document.querySelector('.distancia');

let loop;
let distance = 0;
let distances = JSON.parse(localStorage.getItem('distances')) || [];

const pulo = () => {
    mario.classList.add('pulo');

    setTimeout(() => {
        mario.classList.remove('pulo');
    }, 500);
};

const startLoop = () => {
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        console.log(marioPosition);

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            clearInterval(loop);
            restartButton.style.display = 'block';
            distanceInfo.style.display = 'block';

            // Exibir a distância percorrida quando o Mario morrer
            distanceInfo.textContent = `Distância percorrida: ${distance}`;

            // Reiniciar o jogo chamando restartGame() e recarregar a página
            restartButton.addEventListener('click', () => {
                restartGame();
                location.reload();
            });
        }
        distances.push(1);
        distance += 1; // Atualizar a distância percorrida

        // Exibir a distância no console
        console.log('Distância:', distance);
        localStorage.setItem('distances', JSON.stringify(distances));
    }, 10);
};

const restartGame = () => {
    mario.src = 'mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';

    // Redefinir posição inicial do pipe
    pipe.style.left = '100%';

    restartButton.style.display = 'none';

    // Reiniciar a variável de distância
    distance = 0;

    // Limpar o texto da distância percorrida
    distanceInfo.textContent = '';
    
};

document.addEventListener('keydown', pulo);
restartButton.addEventListener('click', restartGame);

startLoop();
