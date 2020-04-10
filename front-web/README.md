# Treina1Web

## Ferramentas

As principais ferramentas utilizadas serão:
* NodeJS
* npm
* angular-cli
* Visual Studio Code

### NodeJS

Node.js é um runtime JavaScript desenvolvido com o Chrome's V8 JavaScript engine. É um interpretador de JavaScript assíncrono com código aberto orientado a eventos.

Site: https://nodejs.org/pt-br/

#### Instalação

Para este treinamento deve-se utilizar a versão 10 ou uma de suas releases.

* Instalador Windows: https://nodejs.org/dist/v10.16.3/node-v10.16.3-x64.msi

* Linux Ubuntu: https://github.com/nodesource/distributions/blob/master/README.md#debinstall

```
# Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
``` 

Após instalar, para verificar a versão do node utiliza-se o comando:
```
node -v
```

Resultado deve ser semelhante a:
```
v10.16.3
```

### NPM

Npm é o gerenciador de pacotes e ele já é instalado juntamente com o NodeJS. A versão utilizada neste treinamento deverá ser igual ou superior a 6.

Site: https://www.npmjs.com/
<br>
Documentação: https://docs.npmjs.com/cli-documentation/

Para verificar a versão do npm utiliza-se o comando:
```
npm -v
```

Resultado deve ser semelhante a:
```
6.9.0
```

### Angular-CLI

A CLI Angular é uma ferramenta de interface da linha de comandos que você usa para inicializar, desenvolver e manter aplicativos Angular. Você pode usar a ferramenta diretamente em uma interface de comando ou indiretamente por meio de uma interface do usuário interativa, como o Visual Studio Code.

Sites: 
* https://angular.io/cli
* https://cli.angular.io/

#### Instalação

A instalação global do angular-cli é realizada através do npm:
```
npm install -g @angular/cli
```

Ao instalar o angular-cli, as bibliotecas básicas para desenvolvimento com o Angular já são instaladas.

Após a instalação, deve-se checar a versão do angular-cli com o comando:
```
ng version
```

O resultado deve ser semelhante a:
```
Angular CLI: 8.3.6
Node: 10.16.3
OS: linux x64
Angular: 
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.803.6
@angular-devkit/core         8.3.6
@angular-devkit/schematics   8.3.6
@schematics/angular          8.3.6
@schematics/update           0.803.6
rxjs                         6.4.0
```

### Visual Studio Code

O Visual Studio Code é a IDE utilizada para desenvolvimento.

Site: https://code.visualstudio.com/

#### Instalação

Para instalar o Visual Studio Code deve-se baixar o instalador referente ao seu sistema operacional diratamente pelo site do produto.

## Sobre este projeto

### Baixar os códigos fontes

> Opção 1 - Download do Github: 
https://codeload.github.com/ordnaelmedeiros/ids-treina1/zip/api-pessoa

> Opção 2 - Clonar repositório utilizando o GIT: 
https://git-scm.com/download
    
Após instalado o GIT, pode-se clonar o repositório através do comando:
```
git clone https://github.com/ordnaelmedeiros/ids-treina1
```

Dentro do repositório está tanto o projeto da API (Java) quanto o do front-end (Angular).

### Executar projeto

Após baixar os fontes, é necessário instalar as dependências utilizando o `npm`. 

#### Instalar dependências

Para isso abra uma janela de terminal e navegue até o diretório do projeto Angular (treina1-web) e execute o comando:
```
npm install
```

Aguarde a instalação das dependências...
<br>Pode demorar um pouco...
<br>Mas pode demorar bastante...

Em alguns casos podem ocorrer erros dependendo dos privilégios de acesso do usuário do sistema operacional.
No caso do Windows, se utilizar o PowerShell pode-se evitar alguns desses problemas.
No caso do Linux, pode ser necessário utilizar o comando `sudo`.

`Importante:`
Este projeto já possuí algumas bibliotecas adicionais como dependências:

* PrimeNG - Biblioteca de Componentes Angular (https://www.primefaces.org/primeng/#/setup)
* Prime Icons - Biblioteca de Ícones (https://www.primefaces.org/primeng/#/icons)
* Animações - Biblioteca de animações do Angular
* Angular CDK - Conjunto de ferramentas que o PrimeNG depende

A definição de todas dependências do projeto estão no arquivo: `package.json`

#### Executar

Para executar o projeto em modo desenvolvimento, execute o comando:
```
ng serve
```

O resultado deste comando no console, deve exibir algo semelhante a:
```
100% building 3/3 modules 0 activeℹ ｢wds｣: Project is running at http://localhost:4200/webpack-dev-server/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: 404s will fallback to //index.html

chunk {main} main.js, main.js.map (main) 49.5 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 264 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.15 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 9.73 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 4.08 MB [initial] [rendered]
Date: 2019-10-11T03:32:25.335Z - Hash: 61dce5284f412f1491b0 - Time: 7181ms
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
ℹ ｢wdm｣: Compiled successfully.
```

Para acessar a aplicação, abra o navegador com a URL:
```
http://localhost:4200/
```

## Dúvidas?

Primeiramente, tente pesquisar no Google...
<br>É importante aprender a encontrar as respostas...

Se o problema persistir, entre em contato: eduardo.bastian@gmail.com
