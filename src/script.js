$(document).ready(function(){
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    var tamanhoTabuleiro = 10;
    var corpo;
    var fruta;
    var x;
    var y;
    var direcao;
    var velocidade;
    var timer;
    var start; //Inicia e para o timer

    montaTabuleiro();
    iniciar();

    function montaTabuleiro(){
        let tabuleiro = document.getElementById('tabuleiro');
        var tabela = `
            <table border="6" class="tabuleiro">
        `;
        for(let linha = 0; linha < tamanhoTabuleiro; linha++){
            tabela = tabela + `
                <tr>
            `;
            for(let coluna = 0; coluna < tamanhoTabuleiro; coluna++){
                tabela = tabela + `
                    <td id="${linha}${coluna}"></td>
                `;
            }
            tabela = tabela + `
                </tr>
            `;
        }
        tabela = tabela + `
            </table>
        `;
        tabuleiro.innerHTML = tabela;
    }

    function iniciar(){
        corpo = ['21', '20'];
        fruta = '13';
        direcao = RIGHT;
        velocidade = 500;
        if(start == 1) window.clearInterval(timer);
        start = 0;
        x = 1;
        y = 2;
        mostrar();
    }

    document.querySelector('body').addEventListener('keydown', function(event) {
        let tecla = event.keyCode;
        
        //Se for a primeira tecla após o início, inicia o timer
        if(start == 0){timer = window.setInterval(function(){andar(direcao)}, velocidade); start = 1;}

        if(tecla != direcao) andar(event.keyCode);
    });

    function andar(tecla){
        switch(tecla){
            case LEFT:
                if(x > 0){
                    if(direcao != RIGHT){x--; direcao = tecla; atualizar();}
                }
                else iniciar(); break;
            case UP:
                if(y > 0){
                    if(direcao != DOWN){y--; direcao = tecla; atualizar();}
                }
                else iniciar(); break;
            case RIGHT:
                if(x < (tamanhoTabuleiro - 1)){
                    if(direcao != LEFT){x++; direcao = tecla; atualizar();}
                }
                else iniciar(); break;
            case DOWN:
                if(y < (tamanhoTabuleiro - 1)){
                    if(direcao != UP){y++; direcao = tecla; atualizar();}
                }
                else iniciar(); break;
        }
    }

    function atualizar(){
        corpo.unshift(y.toString() + x.toString()); //Atualiza o vetor do corpo

        if(corpo[0] != fruta){ //Se não pegar a fruta
            corpo.pop(); //Remove o final do corpo

            if(corpo.filter(y => y === corpo[0]).length > 1){ //Verifica colisão com o próprio corpo
                iniciar(); //Reinicia o game
            }
        }
        else{
            novaFruta();
        }
        mostrar();
    }

    function mostrar(){
        $('.tabuleiro td').css({backgroundColor: "white" }); //"limpa" o tabuleiro
        let coord_fruta = '#' + fruta.toString();
        $(coord_fruta).css({backgroundColor: "red" });

        for(let i = 0; i < corpo.length; i++){
            let coord = '#' + corpo[i]; //coordenada
            $(coord).css({backgroundColor: "darkgreen" });
        }

    }

    function novaFruta(){
        //não deixa criar uma nova fruta com coordenadas já ocupadas pelo corpo.
        while(corpo.filter(y => y === fruta).length > 0){
            let y = Math.floor(Math.random() * 10);
            let x = Math.floor(Math.random() * 10);
            fruta = y.toString() + x.toString();
        }

        velocidade *= 0.99; //velocidade aumenta 1% a cada fruta comida
    }

});