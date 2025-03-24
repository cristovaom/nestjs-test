# 📚 Documentação da API GraphQL E-commerce



## 🌟 Visão Geral
Esta é uma API GraphQL para uma plataforma de e-commerce que gerencia usuários, lojas, produtos e pedidos. A API utiliza autenticação JWT e inclui controle de acesso baseado em funções.

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

## 📊 Modelos de Dados

### Usuário
- id: UUID
- name: String (Nome)
- email: String (único)
- password: String (criptografado)
- role: String (ADMIN ou CLIENT)
- createdAt: DateTime (Data de Criação)
- updatedAt: DateTime (Data de Atualização)

### Loja
- id: UUID
- name: String (Nome)
- ownerId: UUID (referência ao Usuário)
- secretKey: UUID (Chave Secreta)
- createdAt: DateTime (Data de Criação)
- updatedAt: DateTime (Data de Atualização)

### Produto
- id: UUID
- name: String (Nome)
- description: String (Descrição)
- price: Decimal (Preço)
- stock: Integer (Estoque)
- status: String (Status)
- storeId: UUID (ID da Loja)
- createdAt: DateTime (Data de Criação)
- updatedAt: DateTime (Data de Atualização)

### Pedido
- id: UUID
- userId: UUID (ID do Usuário)
- storeId: UUID (ID da Loja)
- totalPrice: Decimal (Preço Total)
- status: String (Status)
- createdAt: DateTime (Data de Criação)
- updatedAt: DateTime (Data de Atualização)

## 🚀 Começando
1. Clone o repositório
2. Copie as variaveis de ambiente do .env.example e cole igual no .env , pois assim o banco já estará configurado
3. Execute o Docker com docker-compose --up

## 🔧 Variáveis de Ambiente
Certifique-se de configurar estas variáveis de ambiente:
```env
DATABASE_URL="sqlserver://..."
JWT_SECRET="seu-segredo-jwt"
```
