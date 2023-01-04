export interface JwtConfigurationInterface {
    jwt: {
        accessExpiringMs: number,
        accessSecret: string,
        refreshExpiringMs: number
        refreshSecret: string,
    }
}