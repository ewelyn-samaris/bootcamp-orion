function countVowels(st: string): number{
    // Função countVowels utiliza de regex por meio do método match para verificar a 1ª palavra recebida e retornar 
    // a quantidade de vogais presentes
    let phrase: string = st.split(" ")[0]
    const vowels: RegExpMatchArray | null = phrase.match(/[aeiouáéíóúâêîôûà]/ig)
    if(vowels){
        return vowels.length
    }else{
        return 0
    }
}

console.log(`The word has ${countVowels("wôUrdi&*-+.!,l¬")} vowels`)