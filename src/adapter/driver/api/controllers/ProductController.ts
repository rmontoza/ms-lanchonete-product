import express, { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../../types";
import { IProductUseCase } from "../../../../core/domain/application/usecases/Product/IProductUseCase";
import { HandleError } from "./errors/HandleError";

const err = new HandleError();

@injectable()
export class ProductController {
    private router = express.Router();

    constructor(
        @inject(TYPES.ProductUseCase) private readonly productUseCase: IProductUseCase,
        ) {
        this.initializeRoutes();
        }

        private initializeRoutes() {
        this.router.post('/api/products', this.createProduct.bind(this));
        this.router.put('/api/products', this.updateProduct.bind(this));
        this.router.delete('/api/products', this.deleteProduct.bind(this));
        this.router.get('/api/products/:category', this.getProductByCategory.bind(this));



        }

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Operações relacionadas ao Produto
 */

  /**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Product]
 *     summary: Cria um novo produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               value:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 value:
 *                   type: number
 *                 active:
 *                   type: boolean
 *       500:
 *         description: Erro interno do servidor
 */
      private async createProduct(req: Request, res: Response) {
        try {
          const { name, category, value, active } = req.body;
          const product = await this.productUseCase.createProduct( name, category, value, active);
          res.status(201).json(product);
        } catch (error) {
          console.error('Erro ao criar o produto:', error);
          err.handleError(res, error);
        }
      }

  /**
 * @swagger
 * /api/products:
 *   put:
 *     tags: [Product]
 *     summary: Atualiza um produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               value:
 *                 type: number
 *               active:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro interno do servidor
 */
      private async updateProduct(req: Request, res: Response) {
        try {
          const {id, name, category, value, active } = req.body;
          await this.productUseCase.updateProduct(id, name, category, value, active);
          res.status(204).json(null);
        } catch (error) {
          console.error('Erro ao atualizar o produto:', error);
          err.handleError(res, error);
        }
      }

       /**
 * @swagger
 * /api/products:
 *   delete:
 *     tags: [Product]
 *     summary: Delete um produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       204:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Erro interno do servidor
 */
      private async deleteProduct(req: Request, res: Response) {
        try {
          const {id} = req.body;
          await this.productUseCase.deleteProduct (id);
          res.status(204).json(null);
        } catch (error) {
          console.error('Erro ao deletar o produto:', error);
          err.handleError(res, error);
        }
      }
/**
 * @swagger
 *  /api/products/{category}:
 *    get:
 *      summary: Obtém um pedido pelo número
 *      tags: [Product]
 *      parameters:
 *        - in: path
 *          name: category
 *          schema:
 *            type: string
 *          required: true
 *          description: Nome da Categoria
 *      responses:
 *        "200":
 *          description: Produtos encontrados
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 category:
 *                   type: string
 *                 value:
 *                   type: number
 *                 active:
 *                   type: boolean
 *        "404":
 *          description: Pedido não encontrado
 */
      private async getProductByCategory(req: Request, res: Response){
        try {

          const { category } = req.params;

          const orders = await this.productUseCase.findProductByCategory(category);
          res.status(200).json(orders);
        } catch (error) {
          console.error('Erro ao consultar produtos por categoria: ', error);
          err.handleError(res, error);
        }
      }

      public getRouter() {
        return this.router;
      }
    
}