import { loadFeature, defineFeature } from 'jest-cucumber';
import { ProductUseCase } from '../../src/core/domain/application/usecases/Product/ProductUseCase';
import Product from '../core/domain/entities/Prodcuts/Product'
import { IProductRepository } from '../../src/core/domain/repositories/IProductRepository';

const feature = loadFeature('src/tests/features/product.feature');

let productUseCase: ProductUseCase;
let mockProductRepository: jest.Mocked<IProductRepository>;
let createdProduct: Product | null = null;
let productCategory: string;

defineFeature(feature, (test) => {
  test('Create a product and verify it by category', ({ given, and, when, then }) => {
    jest.setTimeout(15000); // Ajusta timeout, se necessário

    given('a product category "Category A"', () => {
      productCategory = 'Category A';

      mockProductRepository = {
        createProduct: jest.fn(),
        deleteProduct: jest.fn(),
        updateProduct: jest.fn(),
        findProductById:jest.fn(),
        findProductByCategory: jest.fn(),
      };

      productUseCase = new ProductUseCase(mockProductRepository);
    });

    and('the following product details:', (table) => {
      const { name, category, value, active } = table[0]; // Pega a primeira linha da tabela como objeto
      createdProduct = new Product(
        '1',
        name,
        category,
        parseFloat(value),
        active === 'true'
      );

      mockProductRepository.createProduct.mockResolvedValue(createdProduct);
    });

    when('the product is created', async () => {
      if (!createdProduct) throw new Error('Product not defined');

      const result = await productUseCase.createProduct(
        createdProduct.name,
        createdProduct.category,
        createdProduct.value,
        createdProduct.active
      );

      expect(mockProductRepository.createProduct).toHaveBeenCalledWith(
        expect.any(Product)
      );
      expect(result).toEqual(createdProduct);
    });

    then('the product should be retrievable by its category', async () => {
      mockProductRepository.findProductByCategory.mockResolvedValue([createdProduct!]);

      const products = await productUseCase.findProductByCategory(productCategory);

      expect(mockProductRepository.findProductByCategory).toHaveBeenCalledWith(
        productCategory
      );
      expect(products).toContainEqual(createdProduct);
    });
  });
});
