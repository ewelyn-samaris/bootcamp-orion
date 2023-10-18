

// Utilizei type e não class para não fugir do paradadigma funcional
type Giants = {
  id: number;
  name: string;
  bio: string;
};


// O array global "lista" foi definido dentro de uma função a fim de definir uma função pura e evitar efeitos colaterais para as funções que a utilizam
function list():Giants[]{
  let lista: Giants[] = [
    {"id" : 1, "name": "Ada Lovelace", "bio" : "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina"},
    {"id" : 2, "name": "Alan Turing", "bio" : "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial"},
    {"id" : 3, "name": "Nikola Tesla", "bio" : "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada."},
    {"id" : 4, "name": "Nicolau Copérnico", "bio" : "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar"}
  ];
  return lista;
}


// O elemento html glogal #dataViewSection foi definido como retorno de uma função pura, evitando efeitos colaterais para as funções que o utilizam
function dataViewSection():HTMLElement{
  return document.getElementById("dataViewSection") as HTMLElement;
}


// O elemento html glogal #selecao foi definido como retorno de uma função pura, evitando efeitos colaterais para as funções que o utilizam
function selectList():HTMLSelectElement{
  return document.getElementById("selecao") as HTMLSelectElement;
}


// O elemento html glogal #dataViewDiv foi definido como retorno de uma função pura, evitando efeitos colaterais para as funções que o utilizam
function dataViewDiv():HTMLElement{
  return document.getElementById("dataViewDiv") as HTMLElement;
}


// Modulariza a função de retorno ao evento load
// Deixa claro quais elementos globais externos são utilizados pela função a partir das funções puras
window.onload = () =>{
  load(dataViewSection(), selectList(), list());
};


// * Elementos externos acessados são passados como parâmetro para a função, evitando repetição de código e
// considerando atendimento ao princípio determinístico, onde elementos globais externos não são acessados diretamente pela função.
// * Criação dinâmica de elementos na selectList, evitando a modificação direta dos elementos, evitando mudanças de estado e efeitos colaterais.
function load(dataViewSection: HTMLElement, selectList: HTMLSelectElement, lista:Giants[]):void{
  dataViewSection.style.display = "none";

  selectList.innerHTML = '';

  const optionPlaceHolder: HTMLOptionElement = document.createElement("option");
  optionPlaceHolder.value = '';
  optionPlaceHolder.innerText = 'Escolha seu gigante....';
  optionPlaceHolder.disabled = true;
  selectList.appendChild(optionPlaceHolder);

  lista.forEach((item)=>{
    const option: HTMLOptionElement = document.createElement("option");
    option.value = (item.id-1).toString();
    option.innerText = item.name;
    selectList.appendChild(option);
  })
  
  selectList.selectedIndex = 0;
  selectList.focus();
};


// * Exibe Id, Nome e bio do objeto selecionado
// * Elementos externos acessados são passados como parâmetro para a função, considerando atendimento ao princípio determinístico,
// onde elementos globais externos não são acessados diretamente pela função.
function viewData(): void{
  const optionSelected: number = parseInt(selectList().value);
  const giantSelected = list()[optionSelected];

  dataViewSection().style.display = "block";
  dataViewDiv().innerHTML=`[${giantSelected.id}] ${giantSelected.name}: <br><br>${giantSelected.bio}.`;
};

/******************************************************************************************************************************** */

// Cria dinamicamente interface para indicar o tipo de edição (edição | exclusão)
function editCall(): void{
  const viewDiv: HTMLElement = document.getElementById("dataViewDiv") as HTMLElement;
  const selectList: HTMLSelectElement = document.getElementById("selecao") as HTMLSelectElement;
  const item: number = Number(selectList.value);

  if(item){
    viewDiv.style.height="50px";
    viewDiv.innerHTML='O que deseja fazer?<br><br>';

    const editButton: HTMLElement = document.createElement("button")
    editButton.innerText="Editar";

    const excludeButton: HTMLElement = document.createElement("button")
    excludeButton.innerText="Excluir";

    viewDiv.appendChild(editButton);
    viewDiv.appendChild(excludeButton);

    viewDiv.style.display="inline-block";

    editButton.addEventListener("click", function(){editInterface(item, viewDiv)});
    excludeButton.addEventListener("click", function(){excludeListItem(item)});

  }else{
    (document.getElementById("dataViewSection") as HTMLElement).style.display="none";
    window.alert('Selecione uma opção válida e tente novamente!');
    load();
  }
};


// Cria dinamicamente interface de edição (name | bio)
function editInterface(index: number, viewDiv: HTMLElement):void{
    let giant: Giants = lista[index-1];
    viewDiv.innerHTML=`O que deseja alterar em <strong>${giant.name}</strong>?<br><br>`;
    const radioName: HTMLInputElement = document.createElement("input");
    const radioBio: HTMLInputElement = document.createElement("input");

    radioBio.type="radio";
    radioBio.id="bio";
    radioBio.name="optionToEdit";
    
    radioName.type="radio";
    radioName.id="name";
    radioName.name="optionToEdit";

    const labelName: HTMLLabelElement = document.createElement("label");
    labelName.htmlFor = "name";
    labelName.textContent="Nome ";

    const labelBio: HTMLLabelElement = document.createElement("label");
    labelBio.htmlFor = "bio";
    labelBio.textContent="Bio ";

    viewDiv.appendChild(radioName);
    viewDiv.appendChild(labelName);
    viewDiv.appendChild(radioBio);
    viewDiv.appendChild(labelBio);

    let addBR: HTMLBRElement = document.createElement("br");
    viewDiv.appendChild(addBR);

    const confirmEdit: HTMLInputElement = document.createElement("button") as HTMLInputElement;
    confirmEdit.id = "confirmEdit";
    confirmEdit.textContent="Confirmar";
    confirmEdit.style.marginTop="20px";
    viewDiv.appendChild(confirmEdit);

    confirmEdit.addEventListener("click", function(){
      editValue(radioName.name, index, viewDiv);
    })
};


// cria dinamicamicamente caixa de input text para entrada do usuário para edição de dados
// Verifica input se válido. Confirma e implementa edição após envio do input pelo usuário
function editValue(nameRadiogroup:string, index: number, viewDiv: HTMLElement):void{
    
  const inputBox: HTMLInputElement = document.createElement("input") as HTMLInputElement;
  inputBox.type = "text";
  inputBox.id = "newValue";
  const labelInputBox: HTMLLabelElement = document.createElement("label");
  
  let attributeToEdit: string;

  if((document.getElementsByName(nameRadiogroup)[0]as HTMLInputElement).checked){
    attributeToEdit = "name";
    labelInputBox.innerText = "Nome: ";
  }else{
    attributeToEdit = "bio";
    labelInputBox.innerText = "Bio: ";
  }

  viewDiv.innerHTML='';

  viewDiv.appendChild(labelInputBox);
  viewDiv.appendChild(inputBox);

  const addBR: HTMLBRElement = document.createElement("br");
  viewDiv.appendChild(addBR);

  const sendButton: HTMLInputElement = document.createElement("button") as HTMLInputElement;
  sendButton.id = "sendButton";
  sendButton.textContent="Enviar";
  sendButton.style.marginTop="20px";

  viewDiv.appendChild(sendButton);
  const giant: Giants = lista[index-1];

  sendButton.addEventListener("click", function(){
    if(inputBox.value){
      if(window.confirm('Deseja continuar?')){
        if(attributeToEdit === 'name'){
          giant.name = inputBox.value;
        }else{
          giant.bio = inputBox.value;
        }
      }
    }else{
      window.alert('Informe uma alteração válida!');
    }
    load();
  })
};


// Confirma exclusão
// Faz shift dos itens na lista para remover item e atualiza options do select
function excludeListItem(indexSelect:number):void{

  if(window.confirm('Deseja continuar?')){
    let selectList = document.getElementById("selecao") as HTMLSelectElement;
    selectList.remove(indexSelect);
    lista.splice(indexSelect, 1);
  }
  load();
};
