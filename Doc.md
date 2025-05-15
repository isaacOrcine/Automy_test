## Escreva aqui sua documentação

## Autor
- Nome: Isaac Orcine
- CPF: 019.439.946-09
- Email: isaacorcine@outlook.com
- Número: (37) 9 8837-8882


## Funcionalidades
1. **Autenticação**
   - Endpoint: `https://appsaccess.automy.com.br/login`
   - Método: `POST`
   - Parâmetros:
     - `username`: Nome de usuário para autenticação.
     - `password`: Senha para autenticação.
   - Retorna: Token JWT para autenticação nas demais requisições.

2. **Consulta**
   - Endpoint: `https://appsaccess.automy.com.br/api/api/desafio/custom/do/query`
   - Método: `POST`
   - Parâmetros:
     - `query`: Query SQL para buscar os dados.
     - `db`: Nome do banco de dados (`desafio`).
   - Cabeçalho:
     - `Authorization`: Bearer Token JWT.
   - Retorna: Dados das baterias associadas ao email fornecido.

3. **Filtragem**
   - Separa as baterias em:
     - **Agendadas**: Com data e hora no futuro.
     - **Passadas**: Com data e hora no passado.

4. **Geração de Mensagem**
   - Cria uma mensagem personalizada com as baterias agendadas, incluindo data, horário e quantidade de pessoas.

5. **Orquestração**
   - Coordena a execução das funções para autenticar, consultar, filtrar e exibir os dados.

## Exemplo de Uso
1. Instalar axios: 
2. ```bash
   npm install axios express dotenv
3. Execute o arquivo `request.js` no terminal:
   ```bash
   node request.js
