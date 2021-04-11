//curso Alura
// Iuri Barreto

const moment = require('moment')

const pacientes = [
  {id: 1, nome: "Maria", dataNasc: '1980-08-20'},
  {id: 2, nome: "Joao", dataNasc: '1994-06-15'},
  {id: 3, nome: "Jose", dataNasc: '1985-02-22'}
];

function buscarPaciente(id){
  return pacientes.find(paciente => paciente.id == id)
}

function calcIdade (paciente){
  const hoje = moment()
  const nasc = moment(paciente.dataNasc, 'YYYY-MM-DD')
  return hoje.diff(nasc, 'years')
}

exports.handler = async (event) => {
  console.log('Paciente informado: ' + event.pacienteID)

  let pacienteEncontrado // pesquisar oq é o let

  if(event.pacienteID){
    pacienteEncontrado = buscarPaciente(event.pacienteID)
    pacienteEncontrado.idade = calcIdade(pacienteEncontrado)

    return{
      statusCode: 200,
      body: JSON.stringify(pacienteEncontrado)
    }
  }

  const todosPacientes = pacientes.map(p=>({...p, idade: calcIdade(p)}))

  return{
    statusCode:200,
    body: JSON.stringify(todosPacientes)
  }

};

