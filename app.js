let listaDeNumerosSorteados = [];
let numeroLimite = prompt('Até qual número, dentro do intervalo dos Interiosm você quer adivinhar?');
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//sendo essa a mensagem que vai aparecer na pagina, função se encontra na linha 64
mensagemInicial();

//função que vai verificar se o chute foi correto ou não, então tomando uma decisão do que fazer após
function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);
    
    if (chute == numeroSecreto){
        exibirTexto('h1', "Acertou!");
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentaivas = `Você descobriu!!! ${numeroSecreto} era o número secreto. Achou com ${tentativas} ${palavraTentativas}`;
        exibirTexto('p', mensagemTentaivas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else{
        if(chute > numeroSecreto){
            exibirTexto('p', `O número é menor que ${chute}`);
        }else{
            exibirTexto('p', `O número é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

//Função que gera o número secreto, importante ver que usamos uma lista para que não se sortei o mesmo número
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosListas = listaDeNumerosSorteados.length;

    if(quantidadeElementosListas == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }  
}

//função feita para exibir os textos, assim minimizando linhas de código, devido as repetições
function exibirTexto(tag, texto){
    let campo= document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

//Sendo a etapa final da função "exibir texto"
function mensagemInicial(){
    exibirTexto('h1', 'Enigma Numérico');
    exibirTexto('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

//Usada para limpar o campo de digitação toda vez que errar
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//Caso acerte essa função vai reiniciar o jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
