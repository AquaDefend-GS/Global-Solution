// Lógica do Quiz AquaDefend
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const quizInicio = document.getElementById('quiz-inicio');
    const quizPerguntasContainer = document.getElementById('quiz-perguntas');
    const quizResultados = document.getElementById('quiz-resultados');
    const perguntaTexto = document.getElementById('pergunta-texto');
    const quizOpcoes = document.querySelector('.quiz-opcoes');
    const quizFeedback = document.querySelector('.quiz-feedback');
    const quizFeedbackTexto = document.querySelector('.quiz-feedback-texto');
    const proximaPerguntaBtn = document.getElementById('proxima-pergunta');
    const perguntaAtualEl = document.getElementById('pergunta-atual');
    const totalPerguntasEl = document.getElementById('total-perguntas');
    const progressoBarra = document.querySelector('.quiz-progresso-barra');
    const pontuacaoValor = document.getElementById('pontuacao-valor');
    const pontuacaoTotal = document.getElementById('pontuacao-total');
    const pontuacaoMensagem = document.getElementById('pontuacao-mensagem');
    const quizResumoLista = document.getElementById('quiz-resumo-lista');
    const iniciarQuizBtn = document.getElementById('iniciar-quiz');
    const reiniciarQuizBtn = document.getElementById('reiniciar-quiz');

    // Importar perguntas do quiz
    import('./quiz-perguntas.js')
        .then(module => {
            const quizPerguntas = module.default;
            inicializarQuizLogica(quizPerguntas);
        })
        .catch(error => {
            console.error('Erro ao carregar perguntas do quiz:', error);
        });

    // Função para inicializar a lógica do quiz
    function inicializarQuizLogica(quizPerguntas) {
        // Variáveis de estado do quiz
        let perguntaAtual = 0;
        let pontuacao = 0;
        let respostasUsuario = [];
        let perguntasEmbaralhadas = [];

        // Inicializar o quiz
        function inicializarQuiz() {
            // Embaralhar as perguntas para cada tentativa
            perguntasEmbaralhadas = [...quizPerguntas].sort(() => Math.random() - 0.5);
            
            // Resetar variáveis
            perguntaAtual = 0;
            pontuacao = 0;
            respostasUsuario = [];
            
            // Atualizar elementos de UI
            totalPerguntasEl.textContent = perguntasEmbaralhadas.length;
            pontuacaoTotal.textContent = perguntasEmbaralhadas.length;
            
            // Mostrar a primeira pergunta
            mostrarPergunta();
            
            // Esconder tela inicial e mostrar perguntas
            quizInicio.style.display = 'none';
            quizPerguntasContainer.style.display = 'block';
            quizResultados.style.display = 'none';
        }

        // Mostrar a pergunta atual
        function mostrarPergunta() {
            // Atualizar número da pergunta e progresso
            perguntaAtualEl.textContent = perguntaAtual + 1;
            progressoBarra.style.width = `${((perguntaAtual + 1) / perguntasEmbaralhadas.length) * 100}%`;
            
            // Obter a pergunta atual
            const pergunta = perguntasEmbaralhadas[perguntaAtual];
            
            // Atualizar texto da pergunta
            perguntaTexto.textContent = pergunta.pergunta;
            
            // Limpar opções anteriores
            quizOpcoes.innerHTML = '';
            
            // Adicionar opções
            pergunta.opcoes.forEach((opcao, index) => {
                const opcaoEl = document.createElement('div');
                opcaoEl.classList.add('quiz-opcao');
                opcaoEl.dataset.index = index;
                
                const letra = String.fromCharCode(65 + index); // A, B, C, D...
                
                opcaoEl.innerHTML = `
                    <div class="quiz-opcao-letra">${letra}</div>
                    <div class="quiz-opcao-texto">${opcao}</div>
                `;
                
                opcaoEl.addEventListener('click', () => selecionarOpcao(index));
                quizOpcoes.appendChild(opcaoEl);
            });
            
            // Esconder feedback e botão de próxima pergunta
            quizFeedback.style.display = 'none';
            proximaPerguntaBtn.style.display = 'none';
        }

        // Selecionar uma opção
        function selecionarOpcao(index) {
            // Verificar se já respondeu
            if (quizFeedback.style.display !== 'none') return;
            
            const pergunta = perguntasEmbaralhadas[perguntaAtual];
            const opcoes = document.querySelectorAll('.quiz-opcao');
            
            // Marcar a opção selecionada
            opcoes.forEach(opcao => opcao.classList.remove('selecionada'));
            opcoes[index].classList.add('selecionada');
            
            // Verificar se está correta
            const estaCorreta = index === pergunta.resposta;
            
            // Atualizar pontuação
            if (estaCorreta) {
                pontuacao++;
            }
            
            // Salvar resposta do usuário
            respostasUsuario.push({
                pergunta: pergunta.pergunta,
                opcaoSelecionada: index,
                opcaoCorreta: pergunta.resposta,
                estaCorreta: estaCorreta,
                explicacao: pergunta.explicacao
            });
            
            // Mostrar feedback
            mostrarFeedback(estaCorreta, pergunta.explicacao);
            
            // Marcar visualmente as opções corretas e incorretas
            opcoes.forEach((opcao, i) => {
                if (i === pergunta.resposta) {
                    opcao.classList.add('correta');
                } else if (i === index && !estaCorreta) {
                    opcao.classList.add('incorreta');
                }
            });
            
            // Mostrar botão de próxima pergunta
            proximaPerguntaBtn.style.display = 'block';
        }

        // Mostrar feedback após resposta
        function mostrarFeedback(estaCorreta, explicacao) {
            quizFeedback.style.display = 'flex';
            quizFeedback.className = 'quiz-feedback ' + (estaCorreta ? 'correto' : 'incorreto');
            
            const icone = estaCorreta ? '✅' : '❌';
            const mensagem = estaCorreta ? 'Correto!' : 'Incorreto!';
            
            quizFeedbackTexto.innerHTML = `
                <strong>${icone} ${mensagem}</strong><br>
                ${explicacao}
            `;
        }

        // Avançar para a próxima pergunta ou mostrar resultados
        function proximaPergunta() {
            perguntaAtual++;
            
            if (perguntaAtual < perguntasEmbaralhadas.length) {
                mostrarPergunta();
            } else {
                mostrarResultados();
            }
        }

        // Mostrar tela de resultados
        function mostrarResultados() {
            quizPerguntasContainer.style.display = 'none';
            quizResultados.style.display = 'block';
            
            // Atualizar pontuação
            pontuacaoValor.textContent = pontuacao;
            
            // Definir mensagem baseada na pontuação
            const percentual = (pontuacao / perguntasEmbaralhadas.length) * 100;
            let mensagem = '';
            
            if (percentual === 100) {
                mensagem = 'Excelente! Você é um especialista em prevenção de enchentes!';
            } else if (percentual >= 80) {
                mensagem = 'Muito bom! Você tem um ótimo conhecimento sobre o tema!';
            } else if (percentual >= 60) {
                mensagem = 'Bom trabalho! Você conhece bem o assunto, mas ainda pode aprender mais.';
            } else if (percentual >= 40) {
                mensagem = 'Você tem algum conhecimento, mas precisa estudar mais sobre o tema.';
            } else {
                mensagem = 'Parece que você precisa aprender mais sobre prevenção de enchentes. Explore o site para mais informações!';
            }
            
            pontuacaoMensagem.textContent = mensagem;
            
            // Criar resumo das respostas
            quizResumoLista.innerHTML = '';
            
            respostasUsuario.forEach((resposta, index) => {
                const resumoItem = document.createElement('div');
                resumoItem.classList.add('quiz-resumo-item');
                
                const pergunta = perguntasEmbaralhadas[index];
                const letraCorreta = String.fromCharCode(65 + pergunta.resposta);
                const letraSelecionada = String.fromCharCode(65 + resposta.opcaoSelecionada);
                
                resumoItem.innerHTML = `
                    <div class="quiz-resumo-pergunta">${index + 1}. ${resposta.pergunta}</div>
                    <div class="quiz-resumo-resposta ${resposta.estaCorreta ? 'correta' : 'incorreta'}">
                        Sua resposta: ${letraSelecionada}. ${pergunta.opcoes[resposta.opcaoSelecionada]}
                        ${!resposta.estaCorreta ? `<br>Resposta correta: ${letraCorreta}. ${pergunta.opcoes[pergunta.resposta]}` : ''}
                    </div>
                    <div class="quiz-resumo-explicacao">${resposta.explicacao}</div>
                `;
                
                quizResumoLista.appendChild(resumoItem);
            });
        }

        // Event Listeners
        if (iniciarQuizBtn) {
            iniciarQuizBtn.addEventListener('click', inicializarQuiz);
        }
        
        if (proximaPerguntaBtn) {
            proximaPerguntaBtn.addEventListener('click', proximaPergunta);
        }
        
        if (reiniciarQuizBtn) {
            reiniciarQuizBtn.addEventListener('click', inicializarQuiz);
        }
    }
});
