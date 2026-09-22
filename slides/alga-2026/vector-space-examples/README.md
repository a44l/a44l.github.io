# Vetor · Espaços vetoriais

Página de prática em português para o primeiro semestre de Álgebra Linear. Funciona sem instalação, sem serviços externos e sem ligação à Internet.

Abra **`index.html`** num navegador. Para servir por HTTP:

```sh
python3 -m http.server 8010
```

Visite `http://127.0.0.1:8010/`.

## Conteúdo e interação

- 24 exercícios: 11 exemplos exploratórios, 9 desafios dos axiomas e 4 testes de fecho.
- Dois botões, **Sim** e **Não**, por propriedade, na ordem dos axiomas da página 14 das notas. Cada clique avalia apenas essa propriedade e mostra imediatamente a explicação completa, tanto nas respostas certas como nas erradas. Uma propriedade sem resposta ainda não foi avaliada.
- 168 explicações com demonstrações e contraexemplos passo a passo, incluindo as contas intermédias e a razão de cada igualdade. As explicações aparecem abertas e podem ser recolhidas após a leitura. Há também pistas opcionais e resolução completa.
- A adição abstrata escreve-se **#**. A conjugação em A5 usa um traço superior contínuo. O exemplo A1 compara produtos de coordenadas, sem determinantes.
- Oito quase-exemplos genuínos, que falham apenas um axioma. Cobrem A1, A3, A5, A6, A7 e A8; um exemplo adicional explora a dependência entre A2 e A3. O antigo exemplo A4 foi retirado. A referência conserva os oito axiomas e uma demonstração completa da dependência de A4. Veja [MATHEMATICS.md](MATHEMATICS.md).
- Nos exercícios de fecho, o teste termina quando uma operação não toma valores no conjunto. Não se tratam expressões fora do domínio como se fossem operações internas válidas.
- Pesquisa sem distinção de acentos, filtro de exercícios por resolver, ligações diretas como `index.html#a6`, referência dos axiomas e exploração de uma combinação de seno e cosseno.
- Respostas e progresso guardados no navegador. O progresso da versão anterior é migrado: respostas já verificadas são preservadas; caixas desmarcadas ainda não verificadas passam a estar por responder. Consultar a resolução não ganha progresso. «Tentar sem a resolução» apaga as respostas mostradas; «Recomeçar» reinicia apenas o exercício atual. Sem armazenamento disponível, a prática funciona durante a sessão.
- Interface adaptada a computador e telemóvel; botões e diálogos operáveis por teclado; erros identificados por texto, símbolos e cor.

Os exemplos seguem as páginas 14–23 de `../slides/ALGAI_M1010_2627pdf.pdf`. Uma cópia integral do PDF fornecido está em `assets/lecture-notes.pdf`, para a ligação às notas funcionar também numa publicação autónoma. Não foram usados recursos de rede no carregamento da página; a referência académica externa é apenas uma ligação opcional.

## Ficheiros

- `index.html`, `styles.css`, `app.js`: apresentação e interação, sem framework.
- `content.js`: enunciados, gabaritos, avaliação de respostas e migração do progresso; a numeração dos axiomas é a das notas.
- `proofs.js`: demonstrações completas de cada propriedade, provas de fecho e explicações das dependências entre axiomas.
- `assets/`: tipo de letra local e PDF da aula.
- `tests/math.test.js`: modelos aritméticos independentes, contraexemplos, avaliação de todas as combinações de respostas, respostas parciais e migração do progresso.
- `scripts/test_browser.py`: testes de interação no Chromium e capturas para inspeção visual.
- `verification/`: capturas e relatório da última verificação em navegador.

## Verificação

```sh
npm test
```

O teste não precisa de instalar pacotes npm e funciona com Node 12 ou posterior. As verificações finitas não substituem as demonstrações universais: estas constam das resoluções e de `MATHEMATICS.md`.

Para os testes de navegador, use `websocket-client` em Python e um Chromium descartável:

```sh
chromium --headless --no-sandbox --disable-gpu \
  --remote-debugging-port=9270 --remote-allow-origins='*' \
  --user-data-dir=/tmp/vector-space-chromium about:blank
python3 scripts/test_browser.py
```

O servidor HTTP deve estar ativo na porta 8010. O script aceita URL e endereço de depuração como argumentos. Os testes criam uma aba própria e apagam apenas o progresso desta página no perfil de teste.
