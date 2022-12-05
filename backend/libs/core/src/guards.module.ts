import { Module } from '@nestjs/common';
import { Reflector } from "@nestjs/core";

import { JwtAuthGuard, LocalAuthGuard } from "./guards";


@Module({
    imports: [Reflector],
    providers: [JwtAuthGuard, LocalAuthGuard],
    exports: [JwtAuthGuard, LocalAuthGuard],
})
export class GuardsModule {}
