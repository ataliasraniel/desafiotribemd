# 🧠 Desafio Técnico – Vue.js + Backend JWT

## 🚀 Sobre o projeto
IdeaLab é uma aplicação construída para usuários compartilharem suas ideias, assim como reagirem a ideia de outros usuários.
O app conta com um mural de ideias, no qual cada usuário pode interagir com outra ideia, curtindo-a. 

## 🏗️ Stack utilizada
- Frontend: Vue.js 3 + TypeScript + Tailwind
- Backend: Laravel
- Banco de dados: Mysql

## 🔧 Como executar

### Pré-requisitos:

PHP ≥ 8.1
MySQL
Composer
Node.js + npm

### Backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Login padrão (opcional)
Não há um user padrão. Porém, na raiz deste projeto tem o arquivo "manipulate.rest" 
que contém todas as rotas da API (criaçao de user já está mockado), basta rodar, substituir o token 
e consumir as rotas. Esse arquivo contém uma documentação de uso direto dos endpoints. 
## Disclaimer
Por falta de tempo (precisei me ausentar no sábado por questões pessoais), não fiz as aplicaçoes do modo que desejava 100%.
Tive que aprender em uma única tarde, tanto o VueJS tanto o Laravel, em ambos nunca peguei, porém como tenho base em outros frameworks/libraries component based e backend, consegui avançar. O front carece de um pouco mais de atenção principalmente em sua arquitetura, creio que falta-lhe detalhes de enviroment como configurações globais de estilo, de services etc.

## 🧩 Observações
- Com base no pouco tempo que tive, escolhi separar as pages de forma simples, componentizando ao máximo e, para cada página/feature, colocar um hook para separar a lógica de negócios da UI, dessa forma, faz-se um tipo MVVM simplificado (praticamente um VIEW-CONTROLLER).
- No Laravel o trabalho foi bem straight forward porque, embora não conhecesse a ferramenta, vi que seu modo de trabalho faz abstrair-se muito boilerplate de outras frameworks atuais. A dificuldade que tive foi para entender sua estrutura olhando a documentação. Também tive um pouco de dificuldade para aprender a sintaxe, mas agora está bem fixado na mente.
- Sim, foi usado IA no projeto. Os usos foram para fazer e agilizar partes de trabalho repetitivas como criação de telas que são parecidas como login, register (são telas com formularios etc). Usei também para estudar tanto o Vue tanto o Laravel, entendendo suas key features e também para iniciar o projeto, configurações iniciais, requisitos etc. Também foi usada para gerar parte da documentação que foi escrita as rotas no backend no arquivo manipulate.rest.

## 💡 Melhorias futuras
- No backend, configurar responses globais para erros, success etc. Padronizando as responses para algo mais esclarecedor
- No front, também configurar os types (models) das responses para que fique mais fácil de debugar e acessar os dados
- Fazer um pequeno sistema de notifications quando um user dar like em alguma ideia>usuário é notificado tanto por email tanto no próprio client (app)
- Fazer mais uma separaçao para além do controller, usar repositories para tratar dados vindos do backend
- Melhorias de interface, fazendo refetch mais fluído sem ter de recarregar todos de uma vez
- Fazer e implementar bibliotecas de feedbacks visuais como loaders, validators, modals etc para aprimorar a experiencia do usuário
- Estilizar melhor o app para ficar visualmente agradável
