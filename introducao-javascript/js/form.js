var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function (event){
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");
    // Extraindo informações do paciente do form
    var paciente = obtemPacienteDoFormulario(form);

    // Cria a tr e td do paciente
    var pacienteTr = montaTr(paciente);

    var erros = validaPaciente(paciente);

    if(erros.length> 0){
    exibeMensagemDeErro(erros);
    return;
    }

    // Adicionando paciente na tabela
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    form.reset();
    var mensagensDeErro = document.querySelector("#mensagens-erro");
    mensagensDeErro.innerHTML = "";
});

function obtemPacienteDoFormulario(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd (dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente){

    var erros = [];
    if(paciente.nome.length == 0) erros.push("Nome obrigatório");
    if(!validaPeso(paciente.peso)) erros.push("Peso é inválido");
    if(!validaAltura(paciente.altura)) erros.push("Altura é inválida");
    if(paciente.gordura.length == 0) erros.push("Gordura obrigatória")

    
    return erros;
}

function exibeMensagemDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

