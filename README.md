# Gamification	Just Digital
### Projeto do Hackaton de Invações

Gamification é aplicativo feito em [Meteor.js](https://meteor.com) pelo time "BR'OZ" durante o Hackathon de Inovações em [Node.js](https://nodejs.org).

#### Objetivos

- Automatizar um processo manual que é feito na empresa.
- Ser simples e facil de usar.
- Ser uma ferramenta em que todos colabore.
- Pode ser moderavel.
- Funcionar bem em aparelhos mobile e em desktops.
- Rapidez

#### Instalação e utilização
Primeiro instale o Meteor.js
```sh
$ curl https://install.meteor.com/ | sh
```
Navegue até a pasta da aplicação e rode o comando "meteor"
```sh
$ meteor
```
Abrir o browser e utilizar o aplicativo em [localhost:3000](http://localhost:3000)


#### Time

O time consiste nos 4 desenvolvedores escolhidos aleatoriamente durante o evento:
####### Caio Lima #######
####### Lucas Oliveira #######
####### Murilo Bastos #######
####### Rodrigo Santos #######

#### Pacotes

O [Meteor.js](https://meteor.com) oferece um repositorio enorme de pacotes chamado [Atmosphere](atmospherejs.com).

Os pacotes utilizados no projeto foram:
- [mquandalle:jade](https://atmospherejs.com/mquandalle)
- [stylus](https://atmospherejs.com/meteor/stylus)
- [materialize:materialize](https://atmospherejs.com/materialize/materialize)
- [iron:router](https://atmospherejs.com/iron/router)
- [useraccounts:iron-routing](https://atmospherejs.com/useraccounts/iron-routing)
- [accounts-password](https://atmospherejs.com/meteor/accounts-password)
- [jquery](https://atmospherejs.com/meteor/jquery)
- [cfs:standard-packages](https://atmospherejs.com/cfs/standard-packages)
- [cfs:filesystem](https://atmospherejs.com/cfs/filesystem)
- [cfs:dropbox](https://atmospherejs.com/cfs/dropbox)
- [momentjs:moment](https://atmospherejs.com/momentjs/moment)
- [wollardj:timeago](https://atmospherejs.com/wollardj/timeago)
- [rzymek:moment-locale-pt-br](https://atmospherejs.com/rzymek/moment-locale-pt-br)
- [danappelxx:eggjs](https://atmospherejs.com/danappelxx/eggjs)

#### TO DO

- Adicionar botão de remover justeleca enviada
	- O usuario so poderá deletar a propria justeleca.
	- O usuario so poderá deletar a justeleca se ela ainda não estiver aprovada.
- Adicionar pacote para mudar a tag TITLE para cada página
	- Cada página tera uma tag title diferente que será definida nas rotas
- Montar o "ranking" (devemos mudar o nome)
	- Separar por "temporada" (tambem precisamos pensar num nome)
	- Criar um painel administrativo pra genrenciar estas "temporadas" e quando será liberado os dados da nova "temporada"
- Adicionar filtros nas páginas que listam justelecas
	- Filtros:
		- Data
		- Pessoa
		- "Temporada"
		- Categoria
- Crop de imagem (Avatar)
- Transformar config em uma imagem de Engrenagem
- Login server-side
- Interface admin: Faazer operações em massa
