// A declaração async function define uma função assíncrona e o operador await é utilizado para esperar por uma Promise.
async function buscaEndereco(cep) { 
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';

    try {    // try e catch usados para tratamento de erros                           
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`) // consumindo API com o método fetch
        const consultaCepConvertida = await consultaCep.json(); // converte o resultado da requisição em json 
        if(consultaCepConvertida.erro) {
            throw Error('CEP não não existe!'); // interrompe e exibe mensagem em caso de erro
        }
        const cidade = document.getElementById('cidade')
        const logradouro = document.getElementById('endereco')
        const estado = document.getElementById('estado')
        const bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;

        console.log(consultaCepConvertida);
        return consultaCepConvertida;

    }catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Favor verifique</p>`
    }

}

const cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value)); //evento focusout (quando o usuário clica fora do campo)

