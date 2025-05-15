const axios = require('axios'); // Importar biblioteca para requisições HTTP
const readline = require('readline'); // Importar módulo para entrada do usuário

// 1. Autenticação
async function getToken() {
  try {
    const response = await axios.post('https://appsaccess.automy.com.br/login', {
      username: 'fldoaogopdege',
      password: 'ygalepsm'
    });
    return response.data.token;
  } catch (error) {
    console.error('Erro na autenticação:', error.response?.data || error.message);
    return null;
  }
}

// 2. Consulta
async function fetchBaterias(email, token) {
  const query = `SELECT * FROM desafio.cadastro_baterias_desafio WHERE email = '${email}'`;
  try {
    const response = await axios.post(
      'https://appsaccess.automy.com.br/api/api/desafio/custom/do/query',
      { query, db: "desafio" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Erro na consulta:', error.response?.data || error.message);
    return [];
  }
}

// 3. Query
function filtrarBaterias(dados) {
  const agora = new Date();
  return dados.reduce((acc, bateria) => {
    // Supondo que data_agendamento seja no formato "DD/MM/YYYY"
    const [dia, mes, ano] = bateria.data_agendamento.split('/');
    const dataBateria = new Date(`${ano}-${mes}-${dia}T${bateria.horario_agendamento.replace('h', '')}:00:00`);
    if (dataBateria >= agora) acc.agendadas.push(bateria);
    else acc.passadas.push(bateria);
    return acc;
  }, { agendadas: [], passadas: [] });
}

function gerarMensagem(baterias) {
    let mensagem = `Olá! Você tem ${baterias.agendadas.length} baterias agendadas:\n`;
  
    // Listar baterias agendadas
    baterias.agendadas.forEach((b, i) => {
      mensagem += `${i + 1}. Em ${b.data_agendamento} às ${b.horario_agendamento} para ${b.qtde_pessoas} pessoas.\n`;
    });
  
    // Adicionar opção para visualizar baterias passadas
    if (baterias.passadas.length > 0) {
      mensagem += `\nCaso deseje, você pode visualizar ${baterias.passadas.length} baterias passadas. Digite "Ver" para visualizar.`;
    }
  
    return mensagem;
  }
  
 // Orquestração
  async function main() {
    const token = await getToken();
    if (!token) return;
  
    const dados = await fetchBaterias('john.doe@gmail.com', token);
    const baterias = filtrarBaterias(dados);
  
    // Gera mensagem inicial
    console.log(gerarMensagem(baterias));
  
    // Verificar se o cliente deseja visualizar baterias passadas
    if (baterias.passadas.length > 0) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
  
      rl.question('\nDigite sua resposta: ', (resposta) => {
        if (resposta.toLowerCase() === 'ver') {
          console.log('\nBaterias passadas:');
          baterias.passadas.forEach((b, i) => {
            console.log(`${i + 1}. Em ${b.data_agendamento} às ${b.horario_agendamento} para ${b.qtde_pessoas} pessoas.`);
          });
        } else {
          console.log('Ok, não exibiremos as baterias passadas.');
        }
        rl.close();
      });
    }
  }
  
  main();