import '../inversify.config';
import express, { Express } from 'express';
import { container } from '../inversify.config';
import { setupSwagger } from './swagger';
import { ProductController } from './adapter/driver/api/controllers/ProductController';

import { TYPES } from '../types';
import { IDatabase } from './adapter/driven/infra/interfaces/IDatabase';

const app: Express = express();
const PORT = process.env.PORT || 3000;

const database = container.get<IDatabase>(TYPES.Database);
database.connect();

app.use(express.json());

setupSwagger(app);

const productController = container.get<ProductController>(TYPES.ProductController);

app.use(productController.getRouter());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
