### Model

São as classes das entidades presentes. Gera o ID UUID pelo constructor e possui a estrutura da entidade. Ex: Categoria que possui nome: string, data: Date, etc.

É necessário sempre exportar a classe com { classe } para que a rota ou o repositório possam utilizar.

### Routes

Determina quais são as rotas e o que vão ocorrer nestas rotas. Por exemplo, Get vai ler um registro, Post vai inserir o registro. Toda a conexão com a estrutura de dados e banco de dados não é feito por aqui, e sim pelos Repositories.

No final com o Repositories, a rota de Post deve dar um repositories.create(dados do request.body). O Post vai criar um novo registro dentro da CategoriesRepository, onde se encontra a lista de categorias.

Não vai trazer Retorno por JSON.

### Repositories

Responsável pela parte de dados, conexão com banco, arquivos JSON, então é por onde transita a informação que é alimentada em cada uma das rotas.

Será feita uma nova classe que vai instanciar a lista de dados, por exemplo class CategoriesRepository que vai instanciar um const array de Categories, ou Category[] importada do modelo Category.ts. 

O Constructor deve fazer a lista de categorias receber um array vazio, então vamos adicionar uma nova categoria direto pelo repository, com um método Create(), que vai instanciar uma new Category, alimentando os dados com Object.assign e dar o PUSH no final na lista de categorias. 

Create() é uma função sem retorno, que o tipo do retorno é VOID.

List() deve retornar this.categories para puxar na rota GET e listar no JSON.

### server.js

Vai servir apenas para utilizar o express e instanciar a aplicação, deve ser feito um app.use(express.json()) para funcionar. Depois disso vamos importar cada uma das rotas para que o server tenha acesso. O server também vai direcionar as rotas para que não precise ser feito pelos arquivos de routes, por ex: 

app.use('/categories', categoriesRoutes);

Para que não precise passar o /categories em todos os routes dentro de categories.routes.ts, passamos apenas o / lá dentro e passamos o caminho pelo server e lá apenas as subrotas.

### Regras de Negócio -> ONDE?

As funções de FindByName / FindByID, devem ser todas criadas no CategoriesRepository dentro da classe. Então a Rota executar passando só o dado passado no request.