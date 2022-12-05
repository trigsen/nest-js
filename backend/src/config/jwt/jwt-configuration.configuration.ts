import {JwtConfigurationInterface} from "./jwt-configuration.interfaces";

export const jwtConfiguration = (): JwtConfigurationInterface => ({
    jwt: {
        secret: process.env.JWT_SECRET_KEY!,
        expiringMs: parseInt(process.env.JWT_EXPIRING_MS!, 10),
    }
})