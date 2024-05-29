class TokenData {
    public userId: number
    public email: string | null
    public role: string | null

    constructor(userId: number, email: string | null,  role: string | null) {
        this.userId = userId
        this.email = email
        this.role = role
    }
}