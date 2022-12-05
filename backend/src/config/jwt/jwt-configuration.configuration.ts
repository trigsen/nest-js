import {JwtConfigurationInterface} from "./jwt-configuration.interfaces";

export const jwtConfiguration = (): JwtConfigurationInterface => ({
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET_KEY!,
        expiringMs: parseInt(process.env.ACCESS_TOKEN_EXPIRING_MS!, 10),
    }
})