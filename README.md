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

As funções de FindByName / FindByID, devem ser todas criadas no CategoriesRepository dentro da classe. Quem executa a função da regra de negócio é o SERVIÇO CreateService, com o throw new error, ele retorna um erro, senão ele passa e retorna o response na rota.

FindByName deve retornar Category ou undefined, ficando assim:

findByName(name: string): Category | undefined {}

Se não estiver assim, vai dar erro.

### Services

São pequenas classes responsáveis por processar o request recebido pela rota e retornar alguma coisa para a rota. O service CreateCategoryServices não precisa conhecer o repositório de categorias.

Os erros são gerados diretamente por esta classe, com o throw new Error do Javascript.

Dentro de cada service deve-se dizer para ela quais são os dados que receberá no request. É criada uma interface IRequest que vai dizer qual os types que a função execute vai receber, então no fim a função deve ficar execute({ description, name }: IRequest)

Pelo constructor da classe do Service, devo receber um parâmetro de qual repositório ele vai acessar, portanto dentro dele deve existir:

constructor(private categoriesRepository: ICategoriesRepository)

Para que na rota fique assim:

    const categoriesRepository = new PostgresCategoriesRepository();

    app.post(etc)
    {
    {} = request
    const createCategoryService = new CreateCategoryService(
        categoriesRepository,
    );
    response
    }

    createCategoryService.execute({ name, description });

então foi instanciado passando categoriesRepository e depois executado passando os dados do request

### Liskov

Deve existir um ICategoriesRepository que é uma classe genérica que deve conter duas interfaces, a DTO ICreateCategoryDTO que serão os dados que serão recebidos da requisição, e a interface ICategoriesRepository, que deve apenas listar quais funções devem existir quando esta função for implementada por outra classe.

O serviço agora no constructor vai receber na instância o tipo ICategoriesRepository, que poderá ser qualquer Classe que implementa ICategoriesRepository.

interface ICategoriesRepository {
    findByName(name: string): Category | undefined;
    list(): Category[] | null;
    create({ name, description }: ICreateCategoryDTO): void;
}

Então se CategoriesRepository implements ICategoriesRepository, eu devo dentro do CategoriesRepository dizer o que cada uma destas funções faz dentro dele.

Se outra classe tipo PostgresRepository implementar ICategoriesRepository, eu devo dizer também o que cada uma desta função faz dentro do postgres.

Desta maneira, o Serviço irá executar funções padronizadas de acordo com o ICategoriesRepository. Sendo que a classe que implementa (CategoriesRepository) deve ser instanciada dentro da rota, como um new CategoriesRepository() ou new PostgresRepository(). Desta forma nós podemos utilizar a mesma estrutura para executar funções completamente diferentes desde que recebam e retornem os mesmos dados. (inclusive este ICategoriesRepository é um schema, ou seja, estrutura padrão de entradas, funções e saídas)

### Controller e UseCases

O responsável por realizar o recebimento da request e response e passar para o service não é a rota, e sim um arquivo Controller. Este arquivo controler deve exportar uma classe chamada por exemplo CreateCategoryController, que recebe o service pelo constructor que agora possui o nome de UseCase, e tudo isso é instanciado por um arquivo index dentro da pasta para aquela ação específica. O index instancia o repositório que é passado para dentro do useCase, e o useCase é passado para dentro do Controller, e o controller é exportado para ser utilizado nas rotas. o Handle do controller deve sempre retornar o response.status, portanto na rota apenas é rodado no post 

return createCategoryController(request, response);

Portanto toda a responsabilidade de trabalhar com a request e a response fica com para o controller especificamente

### Conceito Singleton

Um repositório é instanciado dentro do próprio arquivo de repositório utilizando uma variável private static INSTANCE que vai ser a instância do repositório. Todos os Index vão passar a rodar um método chamado getInstance() que, caso o repositório nunca tenha sido instanciado, ele vai instanciar ele na variável INSTANCE. se ela já foi instanciada, só retorna INSTANCE.

### Qual é a sequência??

Iniciar o Projeto:

1 - Deve ser criado o modelo de objeto que queremos trabalhar. Por exemplo Category.ts. Deve exportar uma classe que possui a estrutura do objeto que queremos trabalhar. Devemos montar com todos os dados esperados e passar o ID opcional. No constructor devemos dizer: Caso não tenha ID, cria um com this.id = uuidv4().

Com o modelo pronto, passaremos a utilizá-lo.

Criar uma rota, por exemplo POST de objeto:

A rota post deve receber os parâmetros, rodar um serviço que crie uma lista de Categorias e retornar se deu certo. Caso ocorra erro, deve ser validado dentro do serviço.

Para isso deve seguir alguns passos:

1 - A rota deve receber os parâmetros via request e passar estes parâmetros para dentro do execute de um serviço

2 - O serviço deve ter um construtor private genérico do tipo Interface criada dentro de repository. Também deve conter uma Interface IRequest que vai ser desestruturada no Execute. Este IRequest deve ser um espelho dos parâmetros recebidos no request.

3- Antes de executar o serviço devemos dar um const serviço = new Service(classe que implementa Interface)

4 - A classe que implementa a Interface genérica, CategoriesRepository (nome de exemplo), deve conter um constructor que vai criar o array que vai receber os dados, assim como todas as funções que serão executadas pelo serviço. Por exemplo: create (para post), list (para get), findByName (para validação). A validação, criação e listagem deve ser feita toda no SERVIÇO, mas quem fornece os dados é o repositório.

5 - O repositório deve implementar uma Interface padrão chamada ICategoriesRepository (nome de exemplo) deve exportar 2 interfaces, uma DTO contendo novamente os parâmetros recebidos pelo request, e a própria classe ICategoriesRepository que vai listar todos os métodos que serão obrigatoriamente implementados dentro de CategoriesRepository. Como no exemplo:

interface ICategoriesRepository {
    findByName(name: string): Category | undefined;
    list(): Category[] | null;
    create({ name, description }: ICreateCategoryDTO): void;
}

6 - O repositório também deve importar as duas interfaces para que seja utilizada como interface DTO para os métodos Create e interface que vai ser implementada pela própria classe repositório.

7 - O serviço deverá utilizar como base para os dados recebidos, a Interface Genérica, para que qualquer Classe implementada a partir dela seja compatível com aquele serviço. Deve-se dar um import no IRepository.

8 - Na Rota, depois de iniciar o router, deve-se instanciar os repositórios, dando um repository = new Repository().

9 - O serviço que vai executar dentro da rota deve ser instanciado passando como parâmetro o repositório. service = new Service(repository)

10 - Após instanciar, é necessário executar a ação para qual aquele serviço foi projetado, utilizando um service.execute(dados do request)