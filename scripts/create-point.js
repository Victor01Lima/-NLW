function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res=>res.json() ).then(states =>{

    for(state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }

  })


}

populateUFs()


function getCities(event){

  const citySelect = document.querySelector("[name=city]")
  const ufValue = event.target.value

  const stateSelect = document.querySelector("[name=state]")
  const indexofSelectedState =  event.target.selectedIndex
  stateSelect.value = event.target.options[indexofSelectedState].text

  citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
  citySelect.disabled=true

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url).then(res=>res.json() ).then(cities =>{

      for(const city of cities){
          citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false

    })
}


document.querySelector("select[name=uf]").addEventListener("change",getCities) 

//itens de coleta ( grid)

 const itemsToCollet = document.querySelectorAll(".items-grid li")

 for(const item of itemsToCollet){
   item.addEventListener("click",handleSelectedItem)
 }


const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){

   const itemLi= event.target

   // adicionar ou remover uma classe com JS
  itemLi.classList.toggle("selected")
   const itemId = event.target.dataset.id
    // verifica quais itens estão slecionados e pegar os itens selecionados




  const alreadySelected = selectedItems.findIndex(function(item){
    const itemFound = item == itemId  
    return itemFound
  })
  //se já estiver selecionado, remove seleção
    if(alreadySelected >=0 ){
      //remove seleção
      const filteredItems = selectedItems.filter(item=>{
        const itemIsDifferent = item != itemId
        return itemIsDifferent
      })

      selectedItems = filteredItems
    }else{
      // se não estiver selecionado, adiciona a seleção
      selectedItems.push(itemId)
    }

    console.log(selectedItems)


    // adiciona a seleção caso não haja nehum selecionado

    collectedItems.value = selectedItems
 }