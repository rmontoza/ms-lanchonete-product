import Product from '../../../entities/Prodcuts/Product';

export interface IProductUseCase{

    createProduct(name: string, category: string, value: number, active: boolean): Promise<Product>;
    updateProduct(id: string, name: string, category: string, value: number, active: boolean): Promise<null>;
    deleteProduct(id: string): Promise<null>;
    findProductByCategory(category: string): Promise<Product[]>;
}