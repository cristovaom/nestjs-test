const { PrismaClient }  = require('@prisma/client');
const { faker } = require('@faker-js/faker/locale/en');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  console.log('Starting seed...');
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: `email${i}@gmail.com`,
        password: bcrypt.hashSync('senha', 10),
        role: i === 0 ? 'ADMIN' : 'CLIENT',
      },
    });
    users.push(user);
    console.log(`Created user: ${user.name}`);
  }


  const stores = [];
  for (let i = 0; i < 3; i++) {
    const store = await prisma.store.create({
      data: {
        name: faker.company.name(),
        ownerId: users[i].id,
        secretKey: bcrypt.hashSync(`secretKey${i}`, 10),
      },
    });
    stores.push(store);
    console.log(`Created store: ${store.name}`);
  }


  const products = [];
  for (const store of stores) {
    for (let i = 0; i < 5; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
          stock: faker.number.int({ min: 5, max: 100 }),
          status: 'ACTIVE',
          storeId: store.id,
        },
      });
      products.push(product);
      console.log(`Created product: ${product.name}`);
    }
  }


  for (let i = 1; i < users.length; i++) {
    const storeIndex = faker.number.int({ min: 0, max: stores.length - 1 });
    const store = stores[storeIndex];


    const storeProducts = products.filter(p => p.storeId === store.id);


    const itemCount = faker.number.int({ min: 1, max: 3 });
    const orderItems = [];
    let totalPrice = 0;

    for (let j = 0; j < itemCount; j++) {
      const productIndex = faker.number.int({ min: 0, max: storeProducts.length - 1 });
      const product = storeProducts[productIndex];
      const quantity = faker.number.int({ min: 1, max: 5 });
      const price = parseFloat(product.price.toString());

      orderItems.push({
        productId: product.id,
        quantity,
        price,
      });

      totalPrice += price * quantity;
    }

    const order = await prisma.order.create({
      data: {
        userId: users[i].id,
        storeId: store.id,
        totalPrice,
        status: faker.helpers.arrayElement(['PENDING', 'ACTIVE', 'FINISHED']),
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: true,
      },
    });

    console.log(`Created order for user ${users[i].name} with ${order.orderItems.length} items`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    console.log('Seed failed');

    console.log('Continuing despite seed failure');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
