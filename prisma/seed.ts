// import { PrismaClient } from '@prisma/client';
// import { faker } from '@faker-js/faker';
// import * as bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   // Clear existing data
//   await prisma.orderItem.deleteMany({});
//   await prisma.order.deleteMany({});
//   await prisma.product.deleteMany({});
//   await prisma.store.deleteMany({});
//   await prisma.user.deleteMany({});

//   console.log('Seeding database...');

//   // Create users
//   const adminPassword = await bcrypt.hash('admin123', 10);
//   const admin = await prisma.user.create({
//     data: {
//       name: 'Admin User',
//       email: 'admin@example.com',
//       password: adminPassword,
//       role: 'ADMIN',
//     },
//   });

//   const storeOwnerPassword = await bcrypt.hash('owner123', 10);
//   const storeOwner = await prisma.user.create({
//     data: {
//       name: 'Store Owner',
//       email: 'owner@example.com',
//       password: storeOwnerPassword,
//       role: 'ADMIN',
//     },
//   });

//   // Create 5 regular clients
//   const clients = [];
//   for (let i = 0; i < 5; i++) {
//     const clientPassword = await bcrypt.hash('client123', 10);
//     const client = await prisma.user.create({
//       data: {
//         name: faker.person.fullName(),
//         email: faker.internet.email(),
//         password: clientPassword,
//         role: 'CLIENT',
//       },
//     });
//     clients.push(client);
//   }

//   // Create store for the store owner
//   const store = await prisma.store.create({
//     data: {
//       name: faker.company.name(),
//       ownerId: storeOwner.id,
//     },
//   });

//   // Create 10 products for the store
//   const products = [];
//   for (let i = 0; i < 10; i++) {
//     const product = await prisma.product.create({
//       data: {
//         name: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
//         stock: faker.number.int({ min: 5, max: 100 }),
//         storeId: store.id,
//       },
//     });
//     products.push(product);
//   }

//   // Create orders for clients
//   for (const client of clients) {
//     // Each client has 1-3 orders
//     const orderCount = faker.number.int({ min: 1, max: 3 });

//     for (let i = 0; i < orderCount; i++) {
//       // Select 1-5 random products for this order
//       const orderProductCount = faker.number.int({ min: 1, max: 5 });
//       const selectedProducts = faker.helpers.arrayElements(products, orderProductCount);

//       let totalPrice = 0;
//       const orderItems = [];

//       for (const product of selectedProducts) {
//         const quantity = faker.number.int({ min: 1, max: 5 });
//         const price = parseFloat(product.price.toString());
//         totalPrice += price * quantity;

//         orderItems.push({
//           productId: product.id,
//           quantity,
//           price,
//         });
//       }

//       // Create the order
//       const order = await prisma.order.create({
//         data: {
//           userId: client.id,
//           storeId: store.id,
//           totalPrice,
//           status: faker.helpers.arrayElement(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED']),
//           orderItems: {
//             create: orderItems,
//           },
//         },
//       });
//     }
//   }

//   console.log('Database seeded successfully!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
