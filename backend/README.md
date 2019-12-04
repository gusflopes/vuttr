# Projeto

## Instalando o Projeto
Para iniciar o desenvolvimento será necessário fazer algumas configurações iniciais.

## Primeira Instalação

`docker-compose up --build`
Esse comando será executado para fazer toda a instalação do ambiente de desenvolvimento, que inclui um container Node.js e outro com Postgres.

### Rodando o projeto
Para rodar o projeto, basta executar: `docker-compose up` e usar Ctrl+C para parar.
Caso prefira, é possível rodar em modo detached:
Iniciar: `docker-compose up -d`
Parar: `docker-compose down`

### Configurando ambiente de testes
O ambiente de testes depende da primeira instalação, sendo que irá utilizar o mesmo container do Posgres, mas em database diferente. Se ainda não rodou o comando anterior, execute antes desses:

`yarn test:setup`
Com esse script criamos o banco de dados a ser utilizado durante nossos testes. Os testes serão realizados no Postgres, no mesmo container que usamos em desenvolvimento, mas em Banco de Dados distinto.

`yarn test`
Esse script vai iniciar o container com o banco de dados e executar todos os testes. Os testes permanecerão em execução permitindo ouvir eventuais alterações para rodar novos testes.
Ao final (Ctrl+C), todas as migrations serão revertidas deixando o banco de dados de teste limpo, além de parar o Container rodando o Postgres.




### Setup Inicial
Instalar as dependências usando `yarn install`

### Container Postgres

### Criar o Banco de Dados
Criar um banco de dados com Sequelize: `yarn sequelize db:create`

### Realizar as migrations
`yarn sequelize db:migrate``

### Seeds
You can run the seed to create a user (email: gusflopes86@gmail.com / password: 123456)
`yarn sequelize db:seed`
