# 📚 Documentação da API GraphQL E-commerce



## 🌟 Visão Geral
Esta é uma API GraphQL para uma plataforma de e-commerce que gerencia usuários, lojas, produtos e pedidos. A API utiliza autenticação JWT e inclui controle de acesso baseado em funções.


## 🚀 Começando
1. Clone o repositório
2. Copie as variaveis de ambiente do .env.example e crie um arquivo chamado no .env e cole igual no .env.example , pois assim o banco já estará configurado
3. Execute o Docker com docker-compose --up

## 🔧 Variáveis de Ambiente
Certifique-se de configurar estas variáveis de ambiente:
```env
DATABASE_URL="sqlserver://..."
JWT_SECRET="seu-segredo-jwt"
```

### Deploy:
A Imagem do dockerfile do back-end está no dockerhub , e estou utilizando o nginx para fazer proxy-reverso da porta 3000 para 8080 , também poderia usar para https.

## ⚠️ Contas para Teste
Todos os dados de teste são gerados usando Faker.js. Use estas contas para teste:
- **Conta de Administrador**:
  - Email: email0@gmail.com
  - Função: ADMIN
- **Contas de Cliente**:
  - Emails: email1@gmail.com até email4@gmail.com
  - Função: CLIENT
- **Senha para todas as contas**: senha

### URL: http://localhost:8080/graphql

### LEMBRE SEMPRE DE TROCAR Os UserIds,StoreIds e ProductIds , OrderIds para o do seu banco , já que foi gerado usando fakerJs é aleatorio, então de uma olhada no seu Banco de dados.

## 🔐 Autenticação

### Login
```graphql
mutation Login {
  login(loginInput: {
    email: "email0@gmail.com"
    password: "senha"
  }) {
    access_token
  }
}
```

### Registrar Novo Usuário
```graphql
mutation Registrar {
  register(user: {
    email: "novousuario@exemplo.com"
    name: "Novo Usuário"
    password: "senha123"
    role: "CLIENT"  # Opcional, padrão é "CLIENT"
  }) {
    id
    name
    email
    role
    createdAt
    updatedAt
  }
}
```

## 📦 Produtos

### Adicionar Novo Produto
```graphql
mutation AdicionarProduto {
  addProduct(input: {
    name: "Nome do Produto"
    description: "Descrição do Produto"
    price: 99.99
    stock: 100
    storeId: "id-da-loja"
  }) {
    id
    name
    description
    price
    stock
    createdAt
    updatedAt
  }
}
```

### Obter Produtos Disponíveis
```graphql
query ObterProdutos {
  getAvailableProducts {
    id
    name
    description
    price
    stock
    createdAt
    updatedAt
  }
}
```

## 🛍️ Pedidos

- Esse endpoint verifica se tem estoque desse pedido dísponivel,
- Após o pedido ser feito ele dá baixa automaticamente do estoque
- E basta colocar a quantidade que ele vai somar automaticamente

### Fazer Novo Pedido
```graphql
mutation FazerPedido {
  placeOrder(createOrderDto: {
    userId: "id-do-usuario"
    storeId: "id-da-loja"
    orderItems: [
      {
        productId: "id-do-produto"
        quantity: 2
      }
    ]
  }) {
    id
    totalPrice
    status
    items {
      productId
      quantity
      price
    }
    createdAt
    updatedAt
  }
}
```

### Obter Pedidos do Usuário
```graphql
query ObterPedidosUsuario {
  getUserOrders {
    id
    totalPrice
    status
    items {
      productId
      quantity
      price
    }
    createdAt
    updatedAt
  }
}
```

### Obter Pedido Específico
```graphql
query ObterPedido {
  getOrderById(orderId: "id-do-pedido") {
    id
    userId
    storeId
    totalPrice
    status
    items {
      productId
      quantity
      price
    }
    createdAt
    updatedAt
  }
}
```

### Atualizar Status do Pedido
```graphql
mutation AtualizarStatusPedido {
  updateOrderStatus(
    orderId: "id-do-pedido"
    status: "COMPLETED"
  ) {
    id
    status
    updatedAt
  }
}
```

## 🏪 Loja
Basta copiar a chave secretKey da tabela , ela pode estar hasheada mas é pegar ela e colar no lugar da chave-secreta e vai funcionar!
### Obter Estatísticas da Loja
```graphql
query ObterEstatisticasLoja {
  ecommerceState(secretKey: "chave-secreta-da-loja") {
    id
    name
    totalProducts
    totalOrders
    totalRevenue
    products {
      id
      name
      price
    }
    orders {
      id
      totalPrice
      status
    }
  }
}
```

## 🔑 Requisitos de Autenticação

- Todas as mutations e queries (exceto login e registro) requerem um token JWT válido
- O token deve ser incluído no cabeçalho Authorization:
  ```
  Authorization: Bearer <seu-token-jwt>
  ```

## 📊 Modelo de Dados

> Os dados abaixo representam a estrutura da aplicação e estão diretamente alinhados ao banco de dados modelado via Prisma e armazenado no SQL Server.

---

### 🧑‍💼 Usuário (`User`)

| Campo     | Tipo     | Descrição                                 |
|-----------|----------|---------------------------------------------|
| `id`      | UUID     | Identificador único do usuário              |
| `name`    | String   | Nome completo                               |
| `email`   | String   | Email do usuário (único)                    |
| `password`| String   | Senha criptografada                         |
| `role`    | String   | Papel do usuário (`ADMIN` ou `CLIENT`)      |
| `createdAt` | DateTime | Data de criação do registro              |
| `updatedAt` | DateTime | Data da última atualização               |

**Relacionamentos:**
- 1:1 com `Store` (um usuário pode ser dono de uma loja)
- 1:N com `Order` (um usuário pode ter vários pedidos)

---

### 🏬 Loja (`Store`)

| Campo      | Tipo     | Descrição                                 |
|------------|----------|---------------------------------------------|
| `id`       | UUID     | Identificador único da loja                 |
| `name`     | String   | Nome da loja                                |
| `ownerId`  | UUID     | Referência ao `User` dono da loja           |
| `secretKey`| UUID     | Chave secreta para autenticação da loja     |
| `createdAt`| DateTime | Data de criação do registro                 |
| `updatedAt`| DateTime | Data da última atualização                  |

**Relacionamentos:**
- 1:1 com `User` (dono)
- 1:N com `Product` (produtos da loja)
- 1:N com `Order` (pedidos realizados na loja)

---

### 📦 Produto (`Product`)

| Campo        | Tipo     | Descrição                                 |
|--------------|----------|---------------------------------------------|
| `id`         | UUID     | Identificador único do produto              |
| `name`       | String   | Nome do produto                             |
| `description`| String   | Descrição detalhada do produto              |
| `price`      | Decimal  | Preço do produto (2 casas decimais)         |
| `stock`      | Int      | Quantidade em estoque                       |
| `status`     | String   | Status do produto (`ACTIVE`, etc)           |
| `storeId`    | UUID     | Referência à loja proprietária              |
| `createdAt`  | DateTime | Data de criação do registro                 |
| `updatedAt`  | DateTime | Data da última atualização                  |

**Relacionamentos:**
- N:1 com `Store`
- 1:N com `OrderItem` (produto pode estar em vários pedidos)

---

### 🧾 Pedido (`Order`)

| Campo        | Tipo     | Descrição                                 |
|--------------|----------|---------------------------------------------|
| `id`         | UUID     | Identificador único do pedido               |
| `userId`     | UUID     | Referência ao usuário que fez o pedido      |
| `storeId`    | UUID     | Referência à loja onde o pedido foi feito  |
| `totalPrice` | Decimal  | Valor total do pedido                       |
| `status`     | String   | Status do pedido (`PENDING`, etc)           |
| `createdAt`  | DateTime | Data de criação do pedido                   |
| `updatedAt`  | DateTime | Data da última atualização                  |

**Relacionamentos:**
- N:1 com `User`
- N:1 com `Store`
- 1:N com `OrderItem`

---

### 📦 Item do Pedido (`OrderItem`)

| Campo        | Tipo     | Descrição                                 |
|--------------|----------|---------------------------------------------|
| `id`         | UUID     | Identificador único do item                 |
| `orderId`    | UUID     | Referência ao pedido                        |
| `productId`  | UUID     | Referência ao produto comprado              |
| `quantity`   | Int      | Quantidade do produto no pedido             |
| `price`      | Decimal  | Preço unitário do produto                   |
| `createdAt`  | DateTime | Data de criação do item                     |
| `updatedAt`  | DateTime | Data da última atualização                  |

**Relacionamentos:**
- N:1 com `Order`
- N:1 com `Product`

---
