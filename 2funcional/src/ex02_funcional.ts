

window.onload=load;


function load():any{
  const selectList: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement
  let reloadedSelectList: HTMLSelectElement = reloadSelect(selectList) as HTMLSelectElement
  const sectionView: HTMLElement = document.getElementById("dataViewSection") as HTMLElement
  sectionView.style.display = "none" 
  listData(lista, reloadedSelectList)
};


// Dividi a função load em duas para modularizá-la
function reloadSelect(select: HTMLSelectElement): HTMLSelectElement{
  select.selectedIndex = 0
  select.focus()
  return select
}


// Utilizei type e não class para não fugir do paradadigma
type Giants = {
  id: number
  name: string
  bio: string
};


let lista: Giants[] = [
    {"id" : 1, "name": "Ada Lovelace", "bio" : "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina"},
    {"id" : 2, "name": "Alan Turing", "bio" : "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial"},
    {"id" : 3, "name": "Nikola Tesla", "bio" : "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada."},
    {"id" : 4, "name": "Nicolau Copérnico", "bio": "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar"}
];


function listData(lista:Giants[], selectList:HTMLSelectElement): void{
  for(let i:number=1; i<=lista.length; ++i){
    selectList.options[i].value = String(i)
    selectList.options[i].text = lista[i-1].name
  }
};


// Exibe Id, Nome e bio do objeto selecionado
function viewData(): void{
  const selectList: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement
  const index: number = Number(selectList.value)
  const viewDiv: HTMLElement = document.getElementById("dataViewDiv") as HTMLElement
  const sectionView: HTMLElement = document.getElementById("dataViewSection") as HTMLElement 

  if(index){
    viewDiv.innerHTML=`[${index}] ${lista[index-1].name}: <br><br>${lista[index-1].bio}.`
    sectionView.style.display = "block"
  }else{
    sectionView.style.display = "none"
  }
};


// Garante edicao para option(select) != 0
// Cria dinamicamente interface para indicar o tipo de edição (edição | exclusão)
function editCall(): void{
  const viewDiv: HTMLElement = document.getElementById("dataViewDiv") as HTMLElement
  const selectList: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement
  const index: number = Number(selectList.value)

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

    editButton.addEventListener("click", function(){editInterface(index, viewDiv)})
    excludeButton.addEventListener("click", function(){excludeListItem(index, viewDiv)})

  }else{
    const sectionView: HTMLElement = document.getElementById("dataViewSection") as HTMLElement
    sectionView.style.display="none"
    window.alert('Selecione uma opção válida e tente novamente!')
    load()
  }
};


// Cria dinamicamente interface de edição (name | bio)
function editInterface(index: number, viewDiv: HTMLElement):void{
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

    const labelBio: HTMLLabelElement = document.createElement("label")
    labelBio.htmlFor = "bio"
    labelBio.textContent="Bio "

    viewDiv.appendChild(radioName)
    viewDiv.appendChild(labelName)
    viewDiv.appendChild(radioBio)
    viewDiv.appendChild(labelBio)

    let addBR: HTMLBRElement = document.createElement("br")
    viewDiv.appendChild(addBR)

    const confirmEdit: HTMLInputElement = document.createElement("button") as HTMLInputElement
    confirmEdit.id = "confirmEdit"
    confirmEdit.textContent="Confirmar"
    confirmEdit.style.marginTop="20px"
    viewDiv.appendChild(confirmEdit)

    confirmEdit.addEventListener("click", function(){
      editValue(radioName.name, index, viewDiv)
    })
};


// cria dinamicamicamente caixa de input text para entrada do usuário para edição de dados
// Verifica input se válido. Confirma e implementa edição após envio do input pelo usuário
function editValue(nameRadiogroup:string, index: number, viewDiv: HTMLElement):void{

  const giant: Giants = lista[index-1];
    
  const inputBox: HTMLInputElement = document.createElement("input") as HTMLInputElement
  inputBox.type = "text"
  inputBox.id = "newValue"
  const labelInputBox: HTMLLabelElement = document.createElement("label")
  
  let editNome: HTMLInputElement = document.getElementsByName(nameRadiogroup)[0] as HTMLInputElement
  let attributeToEdit: string

  if(editNome.checked){
    attributeToEdit = "name"
    labelInputBox.innerText = "Nome: "
  }else{
    attributeToEdit = "bio"
    labelInputBox.innerText = "Bio: "
  }

  viewDiv.innerHTML=''

  viewDiv.appendChild(labelInputBox)
  viewDiv.appendChild(inputBox)

  const addBR: HTMLBRElement = document.createElement("br")
  viewDiv.appendChild(addBR)

  const sendButton: HTMLInputElement = document.createElement("button") as HTMLInputElement
  sendButton.id = "sendButton"
  sendButton.textContent="Enviar"
  sendButton.style.marginTop="20px"

  viewDiv.appendChild(sendButton)

  sendButton.addEventListener("click", function(){
    if(inputBox.value){
      if(window.confirm('Deseja continuar?')){
        if(attributeToEdit === 'name'){
          giant.name = inputBox.value
        }else{
          giant.bio = inputBox.value
        }
      }
    }else{
      window.alert('Informe uma alteração válida!')
    }
    load()
  })
};


// Confirma exclusão
// Faz shift dos itens na lista para remover item e atualiza options do select
function excludeListItem(indexSelect:number, viewDiv:HTMLElement):void{
  const indexItemList: number = indexSelect - 1
  const penultItem: number = lista.length-1

  if(window.confirm('Deseja continuar?')){
    for(let i: number = indexItemList; i<penultItem; ++i){
      lista[i] = lista[i+1]
    }
  
    const selectList: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement
    const lastOption: number = lista.length--
    selectList.options[lastOption].text = ''
    selectList.options[lastOption].value = ''
    --length
  }
  load()
};