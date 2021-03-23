/**
 * ESQUERDA = 37
 * CIMA = 38
 * DIREITA = 39
 * BAIXO = 40
 */
$(document).ready(function(){

    var tabuleiro = [[00,01,02],[10,11,12],[20,21,22]];
    var tamanho = 1;
    var lista = ['01', '00'];
    console.log(lista.length)
    //var ultimo = lista[lista.length];
    var x = 1;
    var y = 0;
    mostrar();

    document.querySelector('body').addEventListener('keydown', function(event) {

        var tecla = event.keyCode;

        //console.log(tecla);
        switch(tecla){
            case 37: //ESQUERDA
                if(x > 0) x--; break;
            case 38: //CIMA
                if(y > 0) y--; break;
            case 39: //DIREITA
                if(x < 2) x++; break;
            case 40: //BAIXO
                if(y < 2) y++; break;   
        }

        //console.log(tabuleiro[y][x]);
        console.log(y);
        console.log(x);
        atualizar();
    });

    function atualizar(){
        lista.pop();
        lista.unshift(y.toString() + x.toString());
        mostrar();
    }

    function mostrar(){
        $('.table td').css({backgroundColor: "white" });

        for(let i = 0; i < lista.length; i++){
            //console.log(lista[i]);
            let coord = '#' + lista[i];
            $(coord).css({backgroundColor: "red" });
        }
        //let coord = '#' + y + x;
        //$(coord).css({backgroundColor: "red" });
        //lista.push(x+y);
        //lista.pop;
    }

});