import {IsNumber, IsString} from "class-validator";

export class EnvironmentVariables {
    @IsNumber()
    ACCESS_TOKEN_EXPIRING_MS: number

    @IsString()
    ACCESS_TOKEN_SECRET_KEY: string;

    @IsString()
    MONGO_DB_CONNECT_LINK: string

    @IsNumber()
    PORT: number
}