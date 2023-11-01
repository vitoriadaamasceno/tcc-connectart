# ART_CONNECT

### PASTAS - projeto

    |-- src

      |-- config
  
      |-- controllers
  
      |-- middlewares
  
      |-- models
  
      |-- routes

      |-- views

      |-- public
  
      |-- server.js

- Explicando cada pasta:

1. **`src`**:
   Esta é a pasta principal onde todo o código-fonte da aplicação está localizado. É uma prática comum ter uma pasta chamada "src" (abreviação de "source") para organizar todos os arquivos relacionados à lógica da aplicação.

2. **`config`**:
   Essa pasta geralmente contém arquivos de configuração para diferentes ambientes, variáveis de ambiente e outras configurações relacionadas ao ambiente de desenvolvimento, teste ou produção da aplicação. Isso pode incluir configurações de banco de dados, configurações de servidor, etc.

3. **`controllers`**:
   Nesta pasta, você normalmente encontra controladores ou handlers para diferentes rotas e funcionalidades da sua aplicação. Os controladores são responsáveis por receber as requisições HTTP, processá-las e enviar as respostas adequadas.

4. **`middlewares`**:
   Aqui é onde você armazena os middlewares da sua aplicação. Os middlewares são funções que têm acesso ao objeto de requisição (req), objeto de resposta (res) e à próxima função de middleware no ciclo de solicitação-resposta do Express. Eles podem executar código, modificar a requisição e resposta, encerrar o ciclo de solicitação-resposta ou chamar a próxima função de middleware.

5. **`models`**:
   Nesta pasta, você geralmente armazena os modelos de dados da sua aplicação. Os modelos representam a estrutura dos dados que a aplicação usa, e muitas vezes estão relacionados ao banco de dados que está sendo utilizado.

6. **`routes`**:
   Aqui estão os arquivos que definem as rotas da aplicação. Cada arquivo pode conter rotas relacionadas a uma funcionalidade específica da aplicação. As rotas são responsáveis por associar as URLs às ações que devem ser executadas quando um usuário acessa determinados caminhos.

7. **`views`**:
   Arquivo html(ejs)

7. **`views`**:
   Arquivos css, js, imagens

9. **`server.js`**:
   Este é o arquivo principal onde o servidor é inicializado. Normalmente, ele contém a configuração do servidor, a definição das rotas, o uso de middlewares e a escuta de portas para lidar com as requisições dos clientes.



## Prisma

Para iniciar o projeto, clone e abra a pasta do projeto no vscode, depois, acesse o terminal e instale as dependências usando preferencialmente o NPM.
Instale usando o comando:

    npm install

Após instalar as depedências, lembre de criar o arquivo .env, seguindo o exemplo em .env.example.

Volte ao terminal e utilize o comando para criar o banco de dados local (sqlite).

    npx prisma migrate reset

O comando `npx prisma migrate reset` irá criar o banco de dados e as tabelas, de acordo com o que foi definido no arquivo `schema.prisma`.

O prisma client é gerado junto ao comando de migrate, mas caso não seja gerado, utilize o comando:

    npx prisma generate

O Prisma Client é responsável por fazer a conexão e as operações com o banco de dados, e deve ser gerado sempre que ocorre alguma migration (o PrismaClient é criado dentro da pasta node_modules, pela própria lib do prisma).

Feito esses passos, para rodar o projeto utilize o comando.

    node server.js
