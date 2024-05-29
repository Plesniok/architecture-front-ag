class Product {
    public id: number
    public name: string | null
    public categoryId: number | null
    public upc: string | null

    constructor(id: number, name: string | null, categoryId: number | null, upc: string | null) {
        this.id = id
        this.name = name
        this.categoryId = categoryId
        this.upc = upc
    }
}