import { inject, injectable } from "inversify";
import Product from "../../../entities/Prodcuts/Product";
import { IProductUseCase } from "./IProductUseCase";
import { TYPES } from "../../../../../../types";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { DatabaseError, NotFoundError, ValidationError } from "../../../erros/DomainErros";

import 'reflect-metadata';

@injectable()
export class ProductUseCase implements IProductUseCase {

    constructor(
        @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
      ) {}

    async createProduct(name: string, category: string, value: number, active: boolean): Promise<Product> {

        try {
            const newProduct = new Product('', name, category, value, active);
            return await this.productRepository.createProduct(newProduct);
            
        } catch (error) {
            console.log(error);
            throw new DatabaseError("Internal error server - Failed to create product ");
        }

    }
    async updateProduct(id: string, name: string, category: string, value: number, active: boolean): Promise<null> {

        if(id == null || id.length == 0){
            throw new ValidationError("the {id} field is required");
        }

        if(await this.productRepository.findProductById(id) == null){
            throw new ValidationError("Invalid {id} product");
        }

        try {

            const updateProduct = new Product(id, name, category, value, active);
            await this.productRepository.updateProduct(updateProduct);

            return null;
            
        } catch (error) {
            console.log(error);
            throw new DatabaseError("Internal error server - Failed to update product ");
        }
    }
    async deleteProduct(id: string): Promise<null> {
        if(id == null || id.length == 0){
            throw new ValidationError("the {id} field is required");
        }

        if(await this.productRepository.findProductById(id) == null){
            throw new ValidationError("Invalid {id} product");
        }

        try {
            await this.productRepository.deleteProduct(id);
            return null;
            
        } catch (error) {
            console.log(error);
            throw new DatabaseError("Internal error server - Failed to delete product ");
        }
    }
    async findProductByCategory(category: string): Promise<Product[]> {
        let product = null;
        try {
             product = await this.productRepository.findProductByCategory(category);

        } catch (error) {
            console.log(error);
            throw new DatabaseError("Internal error server - Failed to get list products by category ");

        }

        if(product!.length == 0 ){
            throw new NotFoundError("products not found");
        }
        
        return product!;
    }

}