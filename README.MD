# Sistema Lista de Tarefas

Este é um sistema web desenvolvido como parte de um processo seletivo. O projeto consiste em um sistema de **Lista de Tarefas**, com funcionalidades para cadastro, edição, exclusão, reordenação e exibição de tarefas armazenadas em um banco de dados.

## 🚀 Funcionalidades

### 1. **Lista de Tarefas**
- Página principal que exibe todas as tarefas cadastradas.
- Exibe os campos: **Identificador**, **Nome da Tarefa**, **Custo (R$)** e **Data Limite**.
- Tarefas são exibidas em ordem baseada no campo "Ordem de Apresentação".
- Tarefas com custo maior ou igual a **R$ 1.000,00** são destacadas com um fundo amarelo.
- Botões de **Editar** e **Excluir** disponíveis ao lado de cada tarefa.
- Botão de **Incluir** localizado ao final da listagem.

### 2. **Excluir**
- Exclui uma tarefa selecionada.
- Exibe uma mensagem de confirmação para evitar exclusões acidentais.

### 3. **Editar**
- Permite editar os campos **Nome da Tarefa**, **Custo (R$)** e **Data Limite**.
- Valida se o novo nome da tarefa já existe, impedindo duplicidade.
- Edição pode ser feita:
  - Diretamente na lista de tarefas.
  - Através de uma tela ou popup.

### 4. **Incluir**
- Adiciona novas tarefas preenchendo os campos **Nome da Tarefa**, **Custo (R$)** e **Data Limite**.
- **Identificador** e **Ordem de Apresentação** são gerados automaticamente.
- Impede a inclusão de tarefas com nomes duplicados.

### 5. **Reordenação das Tarefas**
- Usuário pode alterar a ordem de apresentação:
  - Usando **drag-and-drop**.
  - Através de botões para "subir" ou "descer" a tarefa.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [hello-pangea/dnd](https://github.com/hello-pangea/dnd) (para drag-and-drop)

### **Backend**
- [Express](https://expressjs.com/)
- [Cors](https://www.npmjs.com/package/cors)
- [TypeScript](https://www.typescriptlang.org/)
- [Nodemon](https://nodemon.io/)

### **Banco de Dados**
- [MySQL](https://www.mysql.com/)

### **Deploy**
- Frontend: [Vercel](https://vercel.com/)
- API: [Vercel](https://vercel.com/)
- Banco de Dados: [Railway](https://railway.app/)

---

## 🌐 Links do Projeto

- **Frontend:** [To-Do List Frontend](https://to-do-list-git-main-pietro-buckers-projects.vercel.app/)
- **API:** [To-Do List API](https://to-do-list-zvcz.vercel.app/)

---

## ⚙️ Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js instalado em sua máquina.
- MySQL configurado para o banco de dados.

### Instruções

1. **Clone o repositório do projeto.**

2. **Frontend:**
   ```bash
   cd <diretorio-do-projeto>/Front
   npm install
   npm start

3. **Backend:**
   ```bash
   cd <diretorio-do-projeto>/Back
   npm install
   npm start
