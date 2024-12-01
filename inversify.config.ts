import 'reflect-metadata';
import { Container } from 'inversify';
import { MongoDatabase } from './src/adapter/driven/infra/databases/MongoDataBase';
import { IDatabase } from './src/adapter/driven/infra/interfaces/IDatabase';
import { TYPES } from './types'
import { IProductUseCase } from './src/core/domain/application/usecases/Product/IProductUseCase';
import { ProductUseCase } from './src/core/domain/application/usecases/Product/ProductUseCase';
import { IProductRepository } from './src/core/domain/repositories/IProductRepository';
import { ProductRepository } from './src/adapter/driven/infra/repositories/ProductRepository';
import { ProductController } from './src/adapter/driver/api/controllers/ProductController';
import dotenv from 'dotenv';
dotenv.config();

const container = new Container();

// Bindings
//Use Cases

container.bind<IProductUseCase>(TYPES.ProductUseCase).to(ProductUseCase);

//Repositorys

container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);

//Controllers

container.bind<ProductController>(TYPES.ProductController).to(ProductController);

//Databases
container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase(`${process.env.MONGODB_URI}`));

export { container };

