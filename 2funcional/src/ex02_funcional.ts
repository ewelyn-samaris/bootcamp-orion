
// Utilizei type e não class para não fugir do paradadigma funcional
type Giants = {
  id: number;
  name: string;
  bio: string;
};


// Como a aplicação exige alteração dos valores do array, esse foi declarado globalmente, contudo apenas as funções de edição e exclusão o acessam diretamente
// as demais funções acessam a lista por meio da função pura list(), contribuindo à propriedade determinística
let lista: Giants[] = [
  {"id" : 1, "name": "Ada Lovelace", "bio" : "Ada Lovelace, foi uma matemática e escritora inglesa reconhecida por ter escrito o primeiro algoritmo para ser processado por uma máquina"},
  {"id" : 2, "name": "Alan Turing", "bio" : "Alan Turing foi um matemático, cientista da computação, lógico, criptoanalista, filósofo e biólogo teórico britânico, ele é amplamente considerado o pai da ciência da computação teórica e da inteligência artificial"},
  {"id" : 3, "name": "Nikola Tesla", "bio" : "Nikola Tesla foi um inventor, engenheiro eletrotécnico e engenheiro mecânico sérvio, mais conhecido por suas contribuições ao projeto do moderno sistema de fornecimento de eletricidade em corrente alternada."},
  {"id" : 4, "name": "Nicolau Copérnico", "bio" : "Nicolau Copérnico foi um astrônomo e matemático polonês que desenvolveu a teoria heliocêntrica do Sistema Solar"}
];


// O array global "lista" foi definido como retorno de uma função a fim de definir uma função pura e evitar efeitos colaterais para as funções que a utilizam
function list():Giants[]{
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


window.onload = load;


// Defini as implementações de mudança de estado como funções dentro da aplicação, afim de que tenhamos sempre o mesmo retorno para os mesmos argumentos
// considerando propriedade deterministica
function hide(element:HTMLElement):string{
  return element.style.display="none";
}


// Defini as implementações de mudança de estado como funções dentro da aplicação, afim de que tenhamos sempre o mesmo retorno para os mesmos argumentos
// considerando propriedade deterministica
function reload(element:HTMLElement | HTMLSelectElement):string{
  return element.innerHTML='';
}


// Defini as implementações de mudança de estado como funções dentro da aplicação, afim de que tenhamos sempre o mesmo retorno para os mesmos argumentos
// considerando propriedade deterministica
function show(element:HTMLElement):string{
  return element.style.display = "block";
}


// Defini as implementações de mudança de estado como funções dentro da aplicação, afim de que tenhamos sempre o mesmo retorno para os mesmos argumentos
// considerando propriedade deterministica
function height(element:HTMLElement, value:number){
  return element.style.height=`${value}px`;
}


// * Elementos externos à função são acessados a partir de funções puras e as mudanças de estado implementadas a partir de funções determinísticas
// considerando atendimento ao princípio determinístico, onde elementos globais externos não são acessados diretamente pela função.
// * Criação dinâmica de elementos na selectList, evitando a modificação direta dos elementos, evitando mudanças de estado e efeitos colaterais.
// * Função de retorno ao evento load
function load():void{

  hide(dataViewSection());
  reload(selectList());

  const optionPlaceHolder: HTMLOptionElement = document.createElement("option");
  optionPlaceHolder.value = '';
  optionPlaceHolder.innerText = 'Escolha seu gigante....';
  optionPlaceHolder.disabled = true;

  selectList().appendChild(optionPlaceHolder);

  lista.forEach((item, index)=>{
    const option: HTMLOptionElement = document.createElement("option");
    option.value = (index).toString();
    option.innerText = item.name;
    selectList().appendChild(option);
  })
  
  selectList().selectedIndex = 0;
  selectList().focus();
};


// * Exibe Id, Nome e bio do objeto selecionado
// * Utilização de funções puras e mudanças de estado a partir de funções determinísticas
function viewData(): void{
  const optionSelected: number = parseInt(selectList().value);
  const giantSelected = list()[optionSelected];
  height(dataViewDiv(), 100);

  show(dataViewSection());
  dataViewDiv().innerHTML=`[${giantSelected.id}] ${giantSelected.name}: <br><br>${giantSelected.bio}.`;
};


// * Modulariza função de retorno ao evento de clique no botão editar
// * Garante edição apenas para seleção válida
function editCall(): void{
  const itemSelected: string = selectList().value;

  if(itemSelected !==''){
    editOrDeleteInterface(parseInt(itemSelected));
  }else{
    hide(dataViewSection());
    window.alert('Selecione uma opção válida e tente novamente!');
    load();
  }
};


// * Cria dinamicamente interface para indicação do tipo de edição (edição | exclusão)
// * Substitui div de exibição de resultados por div com botões de indicação do tipo de edição afim de evitar mudanças de estado
// contribuindo à propriedade de imutabilidade
// * Utilização de funções puras e mudanças de estado a partir de funções determinísticas
function editOrDeleteInterface(giantIndex: number):void{

    const div:HTMLElement = dataViewDiv();
    dataViewSection().removeChild(div);
    
    const newDiv: HTMLElement = document.createElement("div");
    newDiv.id="dataViewDiv";
    height(newDiv, 50)
    newDiv.innerHTML='O que deseja fazer?<br><br>';
    dataViewSection().appendChild(newDiv)

    const editButton: HTMLElement = document.createElement("button");
    editButton.innerText="Editar";

    const excludeButton: HTMLElement = document.createElement("button");
    excludeButton.innerText="Excluir";

    dataViewDiv().appendChild(editButton);
    dataViewDiv().appendChild(excludeButton);

    show(dataViewDiv());

    editButton.addEventListener("click", function(){editInterface(giantIndex);});
    excludeButton.addEventListener("click", function(){excludeListItem(giantIndex);});
};


// * Cria dinamicamente interface de escolha do tipo de edição (name | bio)
// * Substitui div de exibição de resultados por div com botões de indicação do tipo de edição afim de evitar mudanças de estado
// contribuindo à propriedade de imutabilidade
// * Utilização de funções puras e mudanças de estado a partir de funções determinísticas
function editInterface(giantIndex: number):void{

    const div:HTMLElement = dataViewDiv();
    dataViewSection().removeChild(div);
    
    const newDiv: HTMLElement = document.createElement("div");
    newDiv.id="dataViewDiv";
    const giant:Giants = list()[giantIndex];
    newDiv.innerHTML=`O que deseja alterar em <strong>${giant.name}</strong>?<br><br>`;
    dataViewSection().appendChild(newDiv);

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

    newDiv.appendChild(radioName);
    newDiv.appendChild(labelName);
    newDiv.appendChild(radioBio);
    newDiv.appendChild(labelBio);

    let addBR: HTMLBRElement = document.createElement("br");
    newDiv.appendChild(addBR);

    const confirmEdit: HTMLInputElement = document.createElement("button") as HTMLInputElement;
    confirmEdit.id = "confirmEdit";
    confirmEdit.textContent="Confirmar";
    confirmEdit.style.marginTop="20px";
    newDiv.appendChild(confirmEdit);

    confirmEdit.addEventListener("click", function(){
      editValue(radioName, giantIndex);
    })
};


// cria dinamicamicamente caixa de input text para entrada do usuário para edição de dados
// Verifica input se válido. Confirma e implementa edição após envio do input pelo usuário
function editValue(radioName:HTMLInputElement, giantIndex: number):void{
    
  const inputBox: HTMLInputElement = document.createElement("input") as HTMLInputElement;
  inputBox.type = "text";
  inputBox.id = "newValue";
  inputBox.width = 200;
  const labelInputBox: HTMLLabelElement = document.createElement("label");
  
  let attributeToEdit: string;

  if(radioName.checked){
    attributeToEdit = "name";
    labelInputBox.innerText = "Nome: ";
  }else{
    attributeToEdit = "bio";
    labelInputBox.innerText = "Bio: ";
  }

  reload(dataViewDiv());

  dataViewDiv().appendChild(labelInputBox);
  dataViewDiv().appendChild(inputBox);

  const addBR: HTMLBRElement = document.createElement("br");
  dataViewDiv().appendChild(addBR);

  const sendButton: HTMLInputElement = document.createElement("button") as HTMLInputElement;
  sendButton.id = "sendButton";
  sendButton.textContent="Enviar";
  sendButton.style.marginTop="20px";

  dataViewDiv().appendChild(sendButton);

  sendButton.addEventListener("click", function(){
    if(inputBox.value){
      if(window.confirm('Deseja continuar?')){
        editListItem(attributeToEdit, inputBox.value, giantIndex);
      }else{
        window.alert('Informe uma alteração válida!');
      }
      load();
    }
  });
};


// Implementa edição de name / bio na lista
// Apenas as funções de edição da lista (editListItem e excludeListItem) acessam diretamente o array para atualizar os valores
function editListItem(attributeToEdit:string, value:string, giantIndex:number):void{
  if (attributeToEdit === 'name') {
    lista[giantIndex].name = value;
  } else if (attributeToEdit === 'bio') {
    lista[giantIndex].bio = value;
  }
}


// Confirma e implementa exclusão de item na lista
// Filtra os itens na lista para remover o item selecionado e atualiza options do select
// Apenas as funções de edição da lista (editListItem e excludeListItem) acessam diretamente o array para atualizar os valores
function excludeListItem(indexSelect:number):void{

  if(window.confirm('Deseja continuar?')){
    selectList().remove(indexSelect);

    lista = lista.filter((item, index)=>index !== indexSelect);
    selectList().value= (indexSelect -1).toString();
  }
  load();
};
