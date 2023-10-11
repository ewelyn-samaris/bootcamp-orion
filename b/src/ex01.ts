// Funções interativa do formulário
function load(): void{
    let msg = document.getElementById('msg') as HTMLElement
    let img = document.getElementById('imagem') as HTMLImageElement
    let warning = document.getElementById('warn') as HTMLElement
    let data = new Date();
    //let hora = data.getHours();

    let hora = 16
  
    if (hora >= 0 && hora < 12) {
      img.src = 'fotomanha.png';
      msg.innerHTML = `Bom dia!`;
      document.body.style.background = '#F1DECD';
    } else if (hora >= 12 && hora < 18) {
      img.src = 'fototarde.png';
      msg.innerHTML = `Boa tarde!`;
      document.body.style.background = '#9B582E';
    } else {
      img.src = 'fotonoite.png';
      msg.innerHTML = `Boa noite!`;
      document.body.style.background = '#3A3E4A';
    }
  }


function countVowels(): void{
    // Função countVowels utiliza de regex por meio do método match para verifica a string recebida e retornar 
    // a quantidade de vogais presentes
    let res = 0
    let line = document.getElementById('input') as HTMLInputElement
    let mensagem = document.getElementById('msg') as HTMLElement
    let word = line.value.split(" ")[0]
    const vowels = word.match(/[aeiouáéíóúâêîôûà]/ig)
    if(vowels){
        res = vowels.length
    }else{
        res = 0
    }
    mensagem.innerHTML = `A palavra <strong><span style="color: red">${word}</span></strong> tem ${res} vogais`
    line.value=''
    line.focus()
}
