import { ProductUseCase } from '../core/domain/application/usecases/Product/ProductUseCase';
import { IProductRepository } from '../core/domain/repositories/IProductRepository';
import Product from '../core/domain/entities/Prodcuts/Product'
;import { NotFoundError } from '../core/domain/erros/DomainErros';


describe('ProductUseCase', () => {
  let productUseCase: ProductUseCase;
  let mockProductRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockProductRepository = {
      createProduct: jest.fn(),
      deleteProduct: jest.fn(),
      updateProduct: jest.fn(),
      findProductById:jest.fn(),
      findProductByCategory: jest.fn(),
    };

    productUseCase = new ProductUseCase(mockProductRepository);
  });

  it('should create a new product', async () => {
    const product = new Product('1', 'Product A', 'Category A', 100, true);

    mockProductRepository.createProduct.mockResolvedValue(product);

    const result = await productUseCase.createProduct(
      'Product A',
      'Category A',
      100,
      true
    );

    expect(mockProductRepository.createProduct).toHaveBeenCalledWith(
      expect.any(Product)
    );
    expect(result).toEqual(product);
  });

  it('should find products by category', async () => {
    const category = 'Category A';
    const products = [
      new Product('1', 'Product A', category, 100, true),
      new Product('2', 'Product B', category, 200, true),
    ];

    mockProductRepository.findProductByCategory.mockResolvedValue(products);

    const result = await productUseCase.findProductByCategory(category);

    expect(mockProductRepository.findProductByCategory).toHaveBeenCalledWith(category);
    expect(result).toEqual(products);
  });

  it('should throw an error when no products are found for a category', async () => {
    const category = 'Category Z';

    mockProductRepository.findProductByCategory.mockResolvedValue([]);

    await expect(productUseCase.findProductByCategory(category)).rejects.toThrow(
      new NotFoundError('products not found')
    );

    expect(mockProductRepository.findProductByCategory).toHaveBeenCalledWith(category);
  });

});
