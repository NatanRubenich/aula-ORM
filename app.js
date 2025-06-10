// app.js

// Importa as classes Sequelize e DataTypes do pacote 'sequelize'.
// Sequelize é a classe principal para gerenciar a conexão com o banco de dados.
// DataTypes é um objeto que contém os tipos de dados disponíveis para as colunas do modelo (e.g., STRING, INTEGER, BOOLEAN).
const { Sequelize, DataTypes } = require('sequelize');

// --- 1. Configuração da Conexão com o Banco de Dados ---
// Cria uma nova instância do Sequelize para estabelecer a conexão.
// Os parâmetros são: database, username, password, e um objeto de opções.
// ATENÇÃO: Substitua 'sequelize_tutorial_db', 'devuser', 'devpassword' e 'localhost'
// pelos dados do banco de dados e do usuário que você criou na Parte 1.
const sequelize = new Sequelize('sequelize_tutorial_db', 'devuser', '123', {
  host: 'localhost',    // Endereço do servidor do banco de dados (pode ser um IP ou domínio).
  port: 5432,           // Porta padrão do PostgreSQL. Altere se você usa outra porta.
  dialect: 'postgres',  // Define o dialeto do banco de dados (obrigatório).
                        // Pode ser 'mysql', 'sqlite', 'mssql', etc.
  logging: false,       // Define se o Sequelize deve logar as queries SQL geradas no console.
                        // 'false' desabilita, 'true' habilita, ou você pode passar uma função para customizar o log.
  define: {
    timestamps: true,   // Adiciona automaticamente as colunas `createdAt` e `updatedAt` aos modelos.
                        // É uma boa prática para rastrear a criação e última atualização dos registros.
    underscored: true   // Converte nomes de atributos CamelCase em snake_case para nomes de colunas no DB.
                        // Ex: 'firstName' vira 'first_name'. Boa prática para convenção de nomes de DB.
  }
});

// --- 2. Definição do Modelo (Representa uma Tabela no Banco de Dados) ---
// Um 'Modelo' no Sequelize é uma abstração que representa uma tabela no seu banco de dados.
// Ele define o nome da tabela (implicitamente) e as colunas (atributos).
// O Sequelize automaticamente pluraliza o nome do modelo para o nome da tabela.
// Ex: Modelo 'User' => Tabela 'Users' no banco de dados.

const User = sequelize.define('User', {
  // Atributos do modelo (colunas da tabela 'Users')
  id: {
    type: DataTypes.INTEGER,    // Tipo de dado: Número inteiro
    autoIncrement: true,        // Aumenta automaticamente (ID sequencial)
    primaryKey: true,           // Define como chave primária da tabela
  },
  firstName: {
    type: DataTypes.STRING,     // Tipo de dado: String (VARCHAR por padrão no PG)
    allowNull: false,           // Não permite valores nulos para esta coluna
    unique: false,              // Não exige que o valor seja único
  },
  lastName: {
    type: DataTypes.STRING,     // Tipo de dado: String
    allowNull: true,            // Permite valores nulos (true é o padrão, mas é bom explicitar)
  },
  email: {
    type: DataTypes.STRING,     // Tipo de dado: String
    allowNull: false,           // Não permite valores nulos
    unique: true,               // Exige que o valor seja único para cada registro (não pode haver dois usuários com o mesmo email)
  },
  age: {
    type: DataTypes.INTEGER,    // Tipo de dado: Número inteiro
    allowNull: true,            // Permite valores nulos
    defaultValue: 18,           // Valor padrão se não for fornecido na criação
  }
  // createdAt e updatedAt são adicionados automaticamente por `timestamps: true` nas opções do Sequelize
}, {
  // Opções adicionais para este modelo específico
  tableName: 'users', // Define explicitamente o nome da tabela no banco de dados como 'users'.
                       // Se omitido, o Sequelize pluralizaria 'User' para 'users' de qualquer forma.
  freezeTableName: false, // Define se o Sequelize deve impedir a pluralização automática do nome da tabela.
                           // Se `true`, a tabela seria 'User'. Usamos `false` aqui para a pluralização padrão.
});

// --- 3. Função Principal para Gerenciar a Conexão e Operações ---
// Usamos uma função assíncrona para lidar com as operações do banco de dados,
// pois todas as interações com o Sequelize são baseadas em Promises.
async function runDatabaseOperations() {
  try {
    // 3.1 Testar a Conexão
    // Tenta autenticar (conectar) com o banco de dados usando as credenciais fornecidas.
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');

    // 3.2 Sincronizar o Modelo com o Banco de Dados
    // Isso verifica o estado atual do banco de dados e realiza as operações necessárias
    // para garantir que a tabela 'users' corresponda à definição do modelo 'User'.
    // `force: true`: Se a tabela 'users' já existir, ela será DROPADA (excluída)
    // e recriada do zero. Isso significa que todos os dados existentes nela serão perdidos.
    // Útil para desenvolvimento/testes, mas NUNCA use `force: true` em ambiente de produção
    // sem um backup ou estratégia de migração de dados!
    await User.sync({ force: true });
    console.log('✅ Tabela de Usuários sincronizada (e recriada se já existia)!');

    // --- 4. Operações CRUD (Create, Read, Update, Delete) ---

    // 4.1 CREATE (Criar um novo registro)
    console.log('\n--- Criando Usuários ---');
    const user1 = await User.create({
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice.smith@example.com',
      age: 30
    });
    console.log('Usuário 1 criado:', user1.toJSON()); // .toJSON() é útil para ver os dados "limpos" do objeto.

    const user2 = await User.create({
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      // 'age' será 18 por padrão, pois não foi fornecido e tem defaultValue.
    });
    console.log('Usuário 2 criado:', user2.toJSON());

    const user3 = await User.create({
      firstName: 'Charlie',
      lastName: 'Brown',
      email: 'charlie.brown@example.com',
      age: 25
    });
    console.log('Usuário 3 criado:', user3.toJSON());

    // 4.2 READ (Ler/Buscar registros)
    console.log('\n--- Buscando Usuários ---');

    // Buscar todos os usuários
    const allUsers = await User.findAll();
    console.log('Todos os usuários no DB:');
    allUsers.forEach(user => console.log(`- ${user.firstName} ${user.lastName} (${user.email})`));

    // Buscar um usuário pelo ID (chave primária)
    const userById = await User.findByPk(user1.id);
    if (userById) {
      console.log('\nUsuário encontrado pelo ID (Alice):', userById.toJSON());
    } else {
      console.log('\nUsuário com ID ' + user1.id + ' não encontrado.');
    }

    // Buscar um usuário por uma condição específica (e.g., email)
    const bobUser = await User.findOne({
      where: {
        email: 'bob.johnson@example.com'
      }
    });
    if (bobUser) {
      console.log('\nUsuário encontrado pelo email (Bob):', bobUser.toJSON());
    } else {
      console.log('\nUsuário Bob não encontrado.');
    }

    // Buscar usuários com uma condição mais complexa (e.g., idade > 20)
    const usersOlderThan20 = await User.findAll({
      where: {
        age: {
          [Sequelize.Op.gt]: 20 // Operador 'gt' (greater than - maior que)
        }
      },
      order: [
        ['firstName', 'ASC'] // Ordena pelo nome em ordem crescente
      ]
    });
    console.log('\nUsuários com mais de 20 anos:');
    usersOlderThan20.forEach(user => console.log(`- ${user.firstName} (Idade: ${user.age})`));

    // 4.3 UPDATE (Atualizar um registro)
    console.log('\n--- Atualizando Usuários ---');

    if (bobUser) {
      bobUser.lastName = 'Williams'; // Modifica o atributo
      await bobUser.save();          // Salva as mudanças no banco de dados
      console.log('Usuário Bob atualizado:', bobUser.toJSON());
    }

    // Atualizar vários registros de uma vez (ex: todos com sobrenome "Smith")
    const [numberOfAffectedRows, affectedRows] = await User.update({
      age: 35 // Novo valor para a idade
    }, {
      where: {
        lastName: 'Smith' // Condição de atualização
      },
      returning: true // Retorna os registros atualizados (PostgreSQL)
    });
    console.log(`\nAtualizou ${numberOfAffectedRows} usuário(s) com sobrenome Smith. Novo registro:`);
    if (affectedRows && affectedRows.length > 0) {
      console.log(affectedRows[0].toJSON());
    }


    // 4.4 DELETE (Excluir um registro)
    console.log('\n--- Excluindo Usuários ---');

    // Excluir um usuário específico (Charlie)
    const charlieUser = await User.findOne({
      where: { email: 'charlie.brown@example.com' }
    });

    if (charlieUser) {
      await charlieUser.destroy(); // Exclui o registro do banco de dados
      console.log('Usuário Charlie excluído.');
    } else {
      console.log('Usuário Charlie não encontrado para exclusão.');
    }

    // Verificar os usuários restantes
    const remainingUsers = await User.findAll();
    console.log('\nUsuários restantes no DB após exclusão:');
    remainingUsers.forEach(user => console.log(`- ${user.firstName} ${user.lastName} (${user.email})`));


  } catch (error) {
    // Captura e exibe qualquer erro que ocorra durante o processo
    console.error('❌ Erro ao conectar ou operar com o banco de dados:', error);
  } finally {
    // Garante que a conexão com o banco de dados seja fechada após as operações.
    // É importante fechar a conexão em aplicações de script ou de uso único.
    // Em uma aplicação de servidor (como uma API Express), você não fecharia a conexão aqui,
    // pois ela precisa permanecer aberta para lidar com as requisições.
    await sequelize.close();
    console.log('\n✔️ Conexão com o banco de dados fechada.');
  }
}

// Inicia a execução da função principal
runDatabaseOperations();