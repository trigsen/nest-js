export interface JwtConfigurationInterface {
    jwt: {
        expiringMs: number,
        secret: string,
    }
}