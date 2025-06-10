# Tutorial: ORM com Sequelize e PostgreSQL no Node.js

Este tutorial guiará você desde a configuração do ambiente até a criação de um modelo, sincronização com o banco de dados e operações CRUD básicas usando Sequelize.

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- **Node.js e NPM (Node Package Manager)**  
  Baixe e instale a versão LTS em [https://nodejs.org](https://nodejs.org)

- **PostgreSQL**  
  - **Windows:** Baixe o instalador em [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/). Siga as instruções, certificando-se de instalar o **pgAdmin**.
  - **macOS:**  
    ```bash
    brew install postgresql  
    brew services start postgresql
    ```
  - **Linux (Debian/Ubuntu):**  
    ```bash
    sudo apt install postgresql postgresql-contrib
    ```

---

## 🛠️ Parte 1: Configuração do Banco de Dados PostgreSQL

Vamos criar um novo banco de dados e um usuário específico para nossa aplicação.

### Opção 1: Usando pgAdmin (Recomendado para iniciantes)

1. **Abra o pgAdmin.**  
   Insira a senha mestra configurada na instalação.

2. **Acesse o servidor PostgreSQL:**  
   No painel esquerdo, expanda **Servers** e clique em **PostgreSQL** (versão). Insira a senha do usuário `postgres`.

3. **Criar um novo Usuário/Role:**
   - Clique com o botão direito em **Login/Group Roles** → **Create** → **Login/Group Role...**
   - Aba **General:** Nome (ex: `devuser`)
   - Aba **Definition:** Senha forte (ex: `devpassword`)
   - Aba **Privileges:** Marque **Can login?** e **Create databases?**
   - Clique em **Save**

4. **Criar um novo Banco de Dados:**
   - Clique com o botão direito em **Databases** → **Create** → **Database...**
   - Aba **General:** Nome do banco (ex: `sequelize_tutorial_db`)
   - Aba **Owner:** Selecione o usuário criado (ex: `devuser`)
   - Clique em **Save**

---

## 📦 Parte 2: Configuração do Projeto Node.js

Vamos criar o projeto e instalar as dependências necessárias.

### Passos:

```bash
mkdir sequelize-tutorial
cd sequelize-tutorial
npm init -y
npm install sequelize pg
```

- `sequelize`: ORM principal
- `pg`: Cliente PostgreSQL

---

## 🚀 Parte 4: Executando o Código

Coloque o arquivo `app.js` na raiz desse repositorio, no mesmo nivel das dependencias do note (arquivo `.\node_modles`).

---

## 🚀 Parte 4: Executando o Código

Salve o arquivo `app.js` e execute: 

```bash
node app.js
```

Você verá no console a execução de todas as operações CRUD.

---

## 📚 O que você aprendeu:

- Como configurar um banco de dados PostgreSQL
- Como criar um projeto Node.js e instalar dependências
- Como conectar o Sequelize ao PostgreSQL
- Como definir um modelo Sequelize
- Como sincronizar modelos com o banco de dados
- Como executar operações CRUD:
  - `create`
  - `findAll`
  - `findByPk`
  - `findOne`
  - `update`
  - `destroy`
- A utilidade de `.toJSON()` para visualizar dados
- O uso de operadores (`Sequelize.Op.gt`)
- A importância do `try...catch` para tratar erros
- Quando e por que usar `force: true` com cuidado

---

> 💡 *Esse tutorial é uma introdução. Explore as associações, validações, migrations e outras funcionalidades do Sequelize para projetos mais robustos.*
