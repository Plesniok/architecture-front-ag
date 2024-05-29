export class ProductLabel extends Product {
  public category: Category | null
  public price: Price | null

  constructor(
    id: number,
    name: string | null,
    categoryId: number,
    upc: string | null,
    category: Category | null,
    price: Price | null
  ) {
    super(id, name, categoryId , upc);
    this.category = category
    this.price = price
  }
}