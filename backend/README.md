# Projeto
Projeto VUTTR desenvolvido a título de teste em Backend para a Bossabox, com deploy realizado na Digital Ocean.

Para acessar o projeto em produção, basta acessar: https://api.vuttr.gusflopes.dev
Para acessar a documentação, basta acessar: https://docs.vuttr.gusflopes.dev
*A versão do frontend ainda não foi desenvolvida*

## Instalando o Projeto
Para iniciar o desenvolvimento será necessário fazer algumas configurações iniciais.

## Instalação

### Ambiente de Desenvolvimento
O Ambiente de desenvolvimento é o ambiente padrão do projeto. Nele será possível rodar todo o projeto em Containers Docker, simplificando a instalação e utilização.

`docker-compose up --build`
Esse comando será executado para fazer toda a instalação do ambiente de desenvolvimento, que inclui um container Node.js e outro com Postgres. Para encerrar, basta apertar `Ctrl+C`

### Ambiente de Testes
O ambiente de testes **depende do Ambiente de Desenvolvimento**, sendo que irá utilizar o mesmo container do Posgres, mas em database diferente. Se ainda não rodou o comando anterior, execute antes desses:

`yarn test:setup`
Com esse script criamos o banco de dados a ser utilizado durante nossos testes. Os testes serão realizados no Postgres, no mesmo container que usamos em desenvolvimento, mas em Banco de Dados distinto.

## Utilizando o Projeto

### Executar Projeto em Ambiente de Desenvolvimento
Para rodar o projeto, basta executar: `docker-compose up` e usar Ctrl+C para parar.

Caso prefira, é possível rodar em modo detached:
Iniciar: `docker-compose start`
Parar: `docker-compose stop`

### Executar os testes
Após a instalação do projeto, tanto do Ambiente de Desenvolvimento quanto do Ambiente de Testes, é possível rodar os testes que ficarão rodando e ouvindo eventuais alterações nos arquivos, facilitando o desenvolvimento.

Para iniciar, basta usar: `yarn test`

Esse script vai iniciar o container com o banco de dados e executar todos os testes. Os testes permanecerão em execução permitindo ouvir eventuais alterações para rodar novos testes.
Ao final (Ctrl+C), todas as migrations serão revertidas deixando o banco de dados de teste limpo, além de parar o Container rodando o Postgres.

## Deploy
Este projeto foi configurado para permitir CI/CD, sendo que a princípio o mesmo está sendo mantido em https://api.vuttr.gusflopes.dev e hospedado em uma máquina virtual na Digital Ocean.

São utilizadas no processo: Buddy.works e DigitalOcean

### Configurações do Projeto (Produção)
Alterar para o ambiente `production` nas variáveis de ambiente

Rodar `docker-compose up --build``

Os mesmos passos serão executados, mas será feita a build para a pasta `dist` e o Projeto será iniciado com o script `start`, utilizando em ambiente de produção.

### Configurações do Servidor

### Outros


## Troubleshooting
### Não utilizar Container Node.js
É possível modificar o projeto para utilizar o Docker apenas para o banco de dados. Nesse caso, a variável de ambiente `DB_HOST` precisa ser alterada para `localhost` tal como ocorre no ambiente de testes.

### Outros

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
