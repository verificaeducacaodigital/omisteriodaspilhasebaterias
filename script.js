
const perguntas = [
    {
        pergunta: "1. Qual tipo de bateria é mais utilizado nos celulares atuais?",
        alternativas: [
            "Bateria de chumbo-ácido",
            "Bateria de íons de lítio",
            "Bateria de zinco-carbono",
            "Bateria de níquel-ferro"
        ],
        correta: 1,
        explicacao: "As baterias de íons de lítio são muito utilizadas em celulares por sua alta densidade de energia e possibilidade de recarga."
    },
    {
        pergunta: "2. Como a bateria transforma energia química em elétrica?",
        alternativas: [
            "Por meio de reações de oxidação e redução",
            "Por meio da evaporação do lítio",
            "Por meio da combustão dos eletrodos",
            "Por meio do aquecimento do eletrólito"
        ],
        correta: 0,
        explicacao: "As reações de oxidação e redução permitem a transferência de elétrons, gerando corrente elétrica."
    },
    {
        pergunta: "3. O que acontece com a bateria quando envelhece?",
        alternativas: [
            "Ela produz mais lítio",
            "Ela aumenta sua capacidade",
            "Ela perde parte de sua capacidade de armazenamento",
            "Ela deixa de possuir reações químicas"
        ],
        correta: 2,
        explicacao: "Reações secundárias e alterações nos eletrodos reduzem a quantidade de lítio disponível e a capacidade da bateria."
    },
    {
        pergunta: "4. Qual fator acelera o envelhecimento da bateria?",
        alternativas: [
            "Manter o celular em temperatura adequada",
            "Expor a bateria frequentemente a temperaturas elevadas",
            "Utilizar o modo de economia de energia",
            "Diminuir o brilho da tela"
        ],
        correta: 1,
        explicacao: "Temperaturas elevadas aceleram reações químicas indesejadas e a degradação dos componentes."
    },
    {
        pergunta: "5. Qual é a função do eletrólito?",
        alternativas: [
            "Impedir a movimentação dos íons",
            "Produzir energia por combustão",
            "Transportar elétrons pelo circuito externo",
            "Permitir a movimentação de íons entre os eletrodos"
        ],
        correta: 3,
        explicacao: "O eletrólito permite o transporte de íons de lítio entre os eletrodos. Os elétrons percorrem o circuito externo."
    }
];

let indice = 0;
let pontos = 0;
let respondeu = false;

const textoPergunta = document.getElementById("textoPergunta");
const alternativas = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");
const proximo = document.getElementById("proximo");
const quiz = document.getElementById("pergunta");
const resultado = document.getElementById("resultado");

function mostrarPergunta() {
    respondeu = false;

    feedback.textContent = "";
    proximo.style.display = "none";

    textoPergunta.textContent = perguntas[indice].pergunta;
    alternativas.innerHTML = "";

    perguntas[indice].alternativas.forEach((alternativa, i) => {

        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.classList.add("opcao");

        botao.onclick = () => verificarResposta(i, botao);

        alternativas.appendChild(botao);
    });
}

function verificarResposta(escolha, botaoEscolhido) {

    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[indice].correta;
    const botoes = document.querySelectorAll(".opcao");

    botoes.forEach((botao, i) => {
        botao.disabled = true;

        if (i === correta) {
            botao.classList.add("correta");
        }
    });

    if (escolha === correta) {
        pontos++;
        feedback.textContent = "✅ Correto! " + perguntas[indice].explicacao;
        feedback.style.color = "#37edb0";
    } else {
        botaoEscolhido.classList.add("errada");

        feedback.textContent = "❌ Não foi dessa vez! " +
            perguntas[indice].explicacao;

        feedback.style.color = "#ff8585";
    }

    proximo.style.display = "inline-block";
}

function proximaPergunta() {

    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {

    quiz.style.display = "none";
    resultado.style.display = "block";

    document.getElementById("pontuacao").textContent =
        "Você acertou " + pontos + " de " +
        perguntas.length + " perguntas!";

}

function reiniciarQuiz() {

    indice = 0;
    pontos = 0;

    resultado.style.display = "none";
    quiz.style.display = "block";

    mostrarPergunta();
}

mostrarPergunta();
