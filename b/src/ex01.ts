// Funções interativa do formulário
function load(): void{
    let msg: HTMLElement = document.getElementById('msg') as HTMLElement
    let img: HTMLImageElement = document.getElementById('imagem') as HTMLImageElement
    let data: Date = new Date()
    let hora: number = data.getHours()

    if ( hora < 12) {
      img.src = 'fotomanha.png'
      msg.innerHTML = `Bom dia!`
      document.body.style.background = '#F1DECD'
    } else if (hora < 18) {
      img.src = 'fototarde.png'
      msg.innerHTML = `Boa tarde!`
      document.body.style.background = '#9B582E'
    } else {
      img.src = 'fotonoite.png'
      msg.innerHTML = `Boa noite!`
      let changeh1color: HTMLElement = document.querySelector('header h1') as HTMLElement
      changeh1color.style.color = 'white'
      let changeFootercolor: HTMLElement = document.querySelector('footer') as HTMLElement
      changeFootercolor.style.color = 'white'
      document.body.style.background = '#3A3E4A'
    }
  }


function countVowels(): void{
    // Função countVowels utiliza de regex por meio do método match para verifica a string recebida e retornar 
    // a quantidade de vogais presentes
    let res: number = 0  
    let line: HTMLInputElement = document.getElementById('input') as HTMLInputElement
    let mensagem: HTMLElement = document.getElementById('msg') as HTMLElement
    let word: string = line.value.split(" ")[0]
    const vowels: RegExpMatchArray | null = word.match(/[aeiouáéíóúâêîôûà]/ig)
    if(vowels){
        res = vowels.length
    }else{
        res = 0
    }
    mensagem.innerHTML = `A palavra <strong><span style="color: red">${word}</span></strong> tem ${res} vogais`
    line.value=''
    line.focus()
}
