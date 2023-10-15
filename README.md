# Documentação Contador de Vogais

O código-fonte foi desenvolvido em TypeScript. Tem a função principal de resolver o desafio abaixo descrito.

>1 - Criar uma função que retorne a quantidade de vogais da palavra passada.
>a) Dar um exemplo de uso com uma palavra recebida via parâmetro da função.
>b) Dar um exemplo de uso com uma palavra recebida via input no formulário.

Para a letra b, além da funcionalidade requerida, foi acrescentado ao formulário HTML uma funcionalidade interativa, definindo saudação, imagem e cor do background a partir da hora capturada. 



## Funções

### load

A função **load** é responsável capturar a hora em que o formulário está sendo visualizado e carregar no formulário as imagens, definir saudação e cor do background, com base no horário verificado.

É apresentada mensagem de saudção (Bom dia, Boa tarde ou Boa noite), exibida imagens correspondentes e alterado a cor do background para cores mais claras ou escuras a depender do horário verificado.

A função não requer parâmetros para execução e não possui retorno. É acioanada a partir do evento DOM 'onload' associado ao elemento 'body' do formulário.


### countVowels

A função **countVowels** é responsável por:

* Capturar a palavra passada pelo usuário no formulário HTML (letra b) ou recebido como exemplo dentro do próprio script (letra a), e contar o número de vogais existentes, considerando maiúsculas, minúsculas e vogais acentuadas. Para identificação dos caracteres que constituem vogais, utilizou-se expressão regular que abrangesse todas as possibilidades de interesse (_aeiouáéíóúâêîôûà_) e modificadores que permitissem considerar tanto maiúsculas quanto minúsculas (_i_), bem como a correspondência em toda a string (_g_) e não apenas retornasse após identificar a primeira correspondência;

* Garantir que seja verificada apenas uma palavra, conforme enunciado. Utilizou-se para isso a função split para dividir a string do input em um array de substrings com base no separador espaço (" ") e capturando apenas a substring de índice zero;

* Devolver o retorno ao formulário do número de vogais encontradas, aplicando estilos para destacar resultado, removendo texto da caixa do input após verificação e aplicar foco ao cursor do mouse para facilitar novas verificações e melhorar experiência do usuário.
 
A função não requer parâmetros para execução e não possui retorno. É acioanada a partir do evento DOM 'onclick' associado ao elemento 'button' de verificação da string do formulário.



## Análise Assintótica

### Complexidade de Espaço

A complexidade de espaço requerida em notação Big-O para os códigos-fonte fornecidos é dada por **O(1)**, constante. O espaço adicional requerido para avaliação da string de entrada é constante e utilizado para armazenar as variáveis *phrase* e *vowel* que armazenam a string inicialmente passada e a primeira palavra passada, respectivamente.


### Complexidade de Tempo

A complexidade de tempo requerida para o pior cenário, em notação Big-O, para os códigos-fonte fornecidos é dada por uma função **O(n)**, sendo *n* o tamanho da string incialmente passada, uma vez que a função split percorre toda a string inicialmente passada em busca do caracter indicado como separador, para que possa fazer a divisão desta em substrings.
