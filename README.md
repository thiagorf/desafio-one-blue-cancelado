# One Blue

## Como rodar

### Docker

Com o docker instalado o processo de instalação do projeto é simplificado, basta garantir que todas as migrations foram criadas com o comando `yarn create:migrations`, caso esteja tudo ok basta rodar o comando `yarn docker:dev` e esperar os containers serem inicializados.

Entre em http://localhost:8000

Apos os testes serem concluídos, você pode parar todos os containers com o comando `yarn container:stop`

### Local

> É necessário a versão do node 16, postgres e redis

Altere o arquivo .env para refletir as configurações de seu ambiente de desenvolvimento, garanta a criação das migrations com o comando `yarn dev:migration`, instale todas as dependências com `yarn` ou `npm install`,execute `yarn dev`

Entre em http://localhost:8000

## Swagger

Com o projeto em execução entre em http://localhost:8000/api-docs para observar a documentação da api

### Observações

-   tirando a rota do swagger, todos os endpoinst tem o versionamento especificado (/v1)
-   o cookie de sessão está definido para durar 2 (dois) minutos
-   tentei usar uma maneira mais funcional do que orientado a objetos (que eu normalmente utilizo)

## Testes

> It needs to run twice to work(I don't know why)

unitários: `yarn test`

integração: `yarn test:int`

coverage: `yarn test:cov`
