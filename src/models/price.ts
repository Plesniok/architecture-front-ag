class Price {
    public id: number
    public productId: number | null
    public value: number | null
    public validFrom: Date | null
    public validTo: Date | null

    constructor(
        id: number, 
        productId: number | null,
        value: number | null,
        validFrom: Date | null,
        validTo: Date | null,
    ) {
        this.id = id
        this.productId = productId
        this.value = value
        this.validFrom = validFrom
        this.validTo = validTo
    }
}