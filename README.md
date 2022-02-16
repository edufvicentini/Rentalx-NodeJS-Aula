### Model

São as classes das entidades presentes. Gera o ID UUID pelo constructor e possui a estrutura da entidade. Ex: Categoria que possui nome: string, data: Date, etc.

É necessário sempre exportar a classe com { classe } para que a rota ou o repositório possam utilizar.

### Routes

Determina quais são as rotas e o que vão ocorrer nestas rotas. Por exemplo, Get vai ler um registro, Post vai inserir o registro. Toda a conexão com a estrutura de dados e banco de dados não é feito por aqui, e sim pelos Repositories.

No final com o Repositories, a rota de Post deve dar um repositories.create(dados do request.body). O Post vai criar um novo registro dentro da CategoriesRepository, onde se encontra a lista de categorias.

Não vai trazer Retorno por JSON.

As Rotas devem apenas: Receber requisição -> Processar -> Retornar.
Pelo princípio S do Solid, as rotas não podem validar. Valida em uma outra classe.

Quem faz a validação e criação da categoria não é a rota, ela apenas chama um serviço(SERVICE) chamado CreateCategoryService.execute() que processa os dados e retorna.

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

FindByName deve retornar Category ou undefined, ficando assim:

findByName(name: string): Category | undefined {}

Se não estiver assim, vai dar erro.

### Services

São pequenas classes responsáveis por processar o request recebido pela rota e retornar alguma coisa para a rota. O service CreateCategoryServices não precisa conhecer o repositório de categorias.

Os erros são gerados diretamente por esta classe, com o throw new Error do Javascript.

Dentro de cada service deve-se dizer para ela quais são os dados que receberá no request. É criada uma interface IRequest que vai dizer qual os types que a função execute vai receber, então no fim a função deve ficar execute({ description, name }: IRequest)

Pelo constructor da classe do Service, devo receber um parâmetro de qual repositório ele vai acessar, portanto dentro dele deve existir:

constructor(private categoriesRepository: CategoriesRepository)

Para que na rota fique assim:

    const createCategoryService = new CreateCategoryService(
        categoriesRepository,
    );

    createCategoryService.execute({ name, description });

então foi instanciado passando categoriesRepository e depois executado passando os dados do request