import Product from "../entities/Prodcuts/Product";

export interface IProductRepository {

    createProduct(product: Product): Promise<Product>;
    updateProduct(product: Product): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    findProductByCategory(category: string): Promise<Product[]>;
    findProductById(id: string): Promise<Product | null>;
  
  }
  