
window.onload=function(){
  const selectOptions: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement
  const sectionView: HTMLElement = document.getElementById("dataViewSection") as HTMLElement
  sectionView.style.display = "none" 
  nameList(lista, selectOptions)
}

type Giants = {
  id: number
  name: string
  bio: string
}

let lista: Giants[] = [
    {"id" : 1, "name": "Ada Lovelace", "bio" : "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina"},
    {"id" : 2, "name": "Alan Turing", "bio" : "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial"},
    {"id" : 3, "name": "Nikola Tesla", "bio" : "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada."},
    {"id" : 4, "name": "Nicolau Copérnico", "bio": "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar"}
]


function nameList(lista:Giants[], selectOptions:HTMLSelectElement): void{
  for(let i:number=1; i<=lista.length; ++i){
    selectOptions.options[i].value = String(i)
    selectOptions.options[i].text = lista[i-1].name
  }
}

function viewData(): void{
  const selectOptions: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement
  const index: number = Number(selectOptions.value)
  const viewDiv: HTMLElement = document.getElementById("dataViewDiv") as HTMLElement
  const sectionView: HTMLElement = document.getElementById("dataViewSection") as HTMLElement 

  if(index){
    const giant: Giants = lista[index-1]
    // [ID] lista.name : <b><br>bio.
    viewDiv.innerHTML=`[${index}] ${giant.name}: <br><br>${giant.bio}.`
    sectionView.style.display = "block"
  }else{
    sectionView.style.display = "none"
  }
}


function editCall(): void{
  const viewDiv: HTMLElement = document.getElementById("dataViewDiv") as HTMLElement
  const selectOptions: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement
  const index: number = Number(selectOptions.value)

  if(index){
    viewDiv.style.height="50px";
    viewDiv.innerHTML='O que deseja fazer?<br><br>'
    const editButton: HTMLElement = document.createElement("button")
    editButton.innerText="Editar"
    const excludeButton: HTMLElement = document.createElement("button")
    excludeButton.innerText="Excluir"

    viewDiv.appendChild(editButton)
    viewDiv.appendChild(excludeButton)

    viewDiv.style.display="inline-block"

    editButton.addEventListener("click", function(){whatToEdit(index)})
    excludeButton.addEventListener("click", exclude)

  }else{
    const sectionView: HTMLElement = document.getElementById("dataViewSection") as HTMLElement
    sectionView.style.display="none"
    window.alert('Selecione uma opção válida e tente novamente!')
  }

}


function whatToEdit(index: number):void{
    const viewDiv: HTMLElement = document.getElementById("dataViewDiv") as HTMLElement
    let giant: Giants = lista[index-1]
    viewDiv.innerHTML=`O que deseja alterar em <strong>${giant.name}</strong>?<br><br>`
    const radioName: HTMLInputElement = document.createElement("input")
    const radioBio: HTMLInputElement = document.createElement("input")

    radioBio.type="radio"
    radioBio.id="bio"
    radioBio.name="optionToEdit"
    
    radioName.type="radio"
    radioName.id="name"
    radioName.name="optionToEdit"

    const labelName: HTMLLabelElement = document.createElement("label")
    labelName.htmlFor = "name"
    labelName.textContent="Nome "

    const labelbio: HTMLLabelElement = document.createElement("label")
    labelbio.htmlFor = "bio"
    labelbio.textContent="Bio "

    viewDiv.appendChild(radioName)
    viewDiv.appendChild(labelName)
    viewDiv.appendChild(radioBio)
    viewDiv.appendChild(labelbio)

    let addspace: HTMLBRElement = document.createElement("br")
    viewDiv.appendChild(addspace)

    const send: HTMLInputElement = document.createElement("button") as HTMLInputElement
    send.id = "send"
    send.textContent="Enviar"
    send.style.marginTop="20px"
    viewDiv.appendChild(send)

    send.addEventListener("click", function editValue(this, optionToEdit){})
}


// function editValue(send:HTMLInputElement, nameGroup:MouseEvent):void{

//     // editButton.addEventListener("click", function(){editValues(index)})

//     //viewDiv.innerHTML=''
    
//     const inputNewAtribute: HTMLInputElement = document.createElement("input") as HTMLInputElement
//     inputNewAtribute.type = "text"
//     inputNewAtribute.id = "newValue"
//     const labelNewAtribute = document.createElement("label")
    
//     // criar botao enviar ******************************
//     let editNome: HTMLInputElement = document.getElementsByName("optionToEdit")[0] as HTMLInputElement
//     if(editNome && editNome.checked){ // se enviar e checked
//       labelNewAtribute.htmlFor = "Nome: "
//       // if(enviar)giant.name = inputNewAtribute.value

//     }else{
//       labelNewAtribute.htmlFor = "Bio: "
//       giant.bio = inputNewAtribute.value
//     }
// }

  function exclude():void{

  }

  


// *a) **Crie uma função que retorne a bio do id passado **************
// *b)* Crie uma função que retorne o name do id passado **************
// *c)* Crie uma função que apague um item da lista a partir de um id passado
// *d)* Crie uma função que altere a bio ou o name a partir de um id passado
// *e)* Demonstre todas as funções com o paradigma funcional e com o imperativo

// funcao edit
// funcao view OK
// funcao del