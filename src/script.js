$(document).ready(function(){
    var tamanhoTabuleiro = 10;
    var corpo;
    var fruta;
    var x;
    var y;

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
        //var tabuleiro = [[00,01,02],[10,11,12],[20,21,22]];
        //var tamanho = 2;
        corpo = ['21', '20'];
        fruta = '13';
        console.log(corpo.length);
        x = 1;
        y = 2;
        mostrar();
    }

    document.querySelector('body').addEventListener('keydown', function(event) {

        var tecla = event.keyCode;

        switch(tecla){
            case 37: //ESQUERDA
                if(x > 0){ x--; atualizar();} break;
            case 38: //CIMA
                if(y > 0){ y--; atualizar();} break;
            case 39: //DIREITA
                if(x < (tamanhoTabuleiro - 1)){ x++; atualizar();} break;
            case 40: //BAIXO
                if(y < (tamanhoTabuleiro - 1)){ y++; atualizar();} break;   
        }
        
    });

    function atualizar(){
        corpo.unshift(y.toString() + x.toString());
        console.log(corpo);

        if(corpo[0] != fruta){
            corpo.pop();

            if(corpo.filter(y => y === corpo[0]).length > 1){
                console.log("DEU RUIM");
                iniciar();
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
            //console.log(corpo[i]);
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
    }

});