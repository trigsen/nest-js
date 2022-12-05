import {ApplicationConfigurationInterface} from "./application-configuration.interfaces";

export const applicationConfiguration = (): ApplicationConfigurationInterface => ({
    application: {
        port: parseInt(process.env.PORT!, 10),
    }
})