let txtn = document.querySelector('#tarefa')
let tab = document.querySelector('.lista')
let lista = []

function isValue(text) {
    if (!text) {
        return false
    }
    return true
}

function inLista(text, list) {
    if (list.indexOf(`${text}`) != -1) {
        return true
    }
    return false
}

function verifAndAdd() {
    if (isValue(txtn.value) && !inLista(txtn.value, lista)) {
        addTarefa(txtn.value)
    } else {
        alert('Essa tarefa já existe ou é inválida.')
        txtn.focus()
        txtn.value = ''
    }
}

txtn.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        verifAndAdd();
    }
})

function addTarefa(textoInput) {
    let texto = textoInput
    let item = document.createElement('li')
    item.innerHTML = `${texto}`
    tab.appendChild(item)
    addButton(item)
    salvarTarefas()
    txtn.focus()
    txtn.value = ''
}

function addButton(li) {
    let button = document.createElement('input')
    button.value = 'Apagar'
    button.type = 'button'
    button.setAttribute('class', 'buttonApagar')
    li.appendChild(button)
}

document.addEventListener('click', function delTarefa(e) {
    const el = e.target
    if (el.classList.contains('buttonApagar')) {
        el.parentElement.remove()
        const index = lista.indexOf(txtn.value)
        lista.splice(index)
        salvarTarefas()
    }
})

function salvarTarefas() {
    const tarefas = tab.querySelectorAll('li');
    lista = []
    for (let tarefa of tarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        lista.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(lista)
    localStorage.setItem('tarefas', tarefasJSON)
}


function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    console.log(listaDeTarefas)
    if (listaDeTarefas) {
        for (let tarefa of listaDeTarefas) {
            addTarefa(tarefa)
        }
    }
}
adicionaTarefasSalvas();