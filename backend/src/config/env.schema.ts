import {IsNumber, IsString} from "class-validator";

export class EnvironmentVariables {
    @IsNumber()
    JWT_EXPIRING_MS: number

    @IsString()
    JWT_SECRET_KEY: string;

    @IsString()
    MONGO_DB_CONNECT_LINK: string

    @IsNumber()
    PORT: number
}