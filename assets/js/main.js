const inputTarefa = document.querySelector('.input-tarefa');
const botaoTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function teclaEnter(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
})

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    li.appendChild(botaoApagar);
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa.');
}

document.addEventListener('click', function apagarTarefa(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }

    if (el.classList.contains('editar')) {
        const li= el.parentElement;
        const textoAtual = li.firstChild.textContent.trim()
        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = textoAtual;
        inputEdit.setAttribute('class','input-salvo')

        const botaoSalvar = document.createElement('button');
        botaoSalvar.innerText = 'Salvar';
        botaoSalvar.classList.add('salvar');

        li.innerHTML = '';
        li.appendChild(inputEdit);
        li.appendChild(botaoSalvar);
    }
    if (el.classList.contains('salvar')) {
        const li = el.parentElement;
        const novoTexto = li.querySelector('input').value;

        li.innerHTML = novoTexto;
        salvarTarefas();
        criaBotaoApagar(li);
        criaBotaoEditar(li);
    }
})


function criaBotaoEditar(li) {
    const botaoEditar = document.createElement('button');
    botaoEditar.innerHTML = 'Editar';
    li.appendChild(botaoEditar);
    botaoEditar.setAttribute('class', 'editar');
    botaoEditar.setAttribute('title', 'Editar tarefa');
}



function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
    criaBotaoEditar(li)
}

botaoTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').replace('Editar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas) || [];

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }

}

adicionaTarefasSalvas();
