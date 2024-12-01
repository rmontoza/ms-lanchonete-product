import { injectable } from "inversify";
import Product from "../../../../core/domain/entities/Prodcuts/Product";
import { IProductRepository } from "../../../../core/domain/repositories/IProductRepository";
import mongoose from "mongoose";

const ProductModel = mongoose.model('Product', new mongoose.Schema({
    name: String,
    category: String,
    value: Number,
    active: Boolean,
  }));

@injectable()
export class ProductRepository implements IProductRepository{

    async createProduct(product: Product): Promise<Product> {
       
        const newProduct = await ProductModel.create({
            name: product.name,
            category: product.category,
            value: product.value,
            active: product.active
        });
        return new Product(newProduct._id.toString(), newProduct.name!, newProduct.category!, newProduct.value!, newProduct.active!);

    }
    async updateProduct(product: Product): Promise<void> {
        await ProductModel.findByIdAndUpdate(product.id, {
            name: product.name,
            category: product.category,
            value: product.value,
            active: product.active
        });


    }
   async deleteProduct(id: string): Promise<void> {
        await ProductModel.findByIdAndDelete(id);
    }
   async  findProductByCategory(category: string): Promise<Product[]> {
    
    const products = await ProductModel.find({category}).exec();
    const productsArray = new Array<Product>();

    products.forEach((product) => {
        productsArray.push(new Product(product._id.toString(), product.name!, product.category!, product.value!, product.active!));
    }) 

    return productsArray;

    }

    async findProductById(id: string): Promise<Product | null> {
        const product = await ProductModel.findById(id);
        return product != null ? new Product(product.id, product.name!, product.category!, product.value!, product.active!) : null;
    }

    
}