import { ConfigService } from '@nestjs/config';
declare const JwtStrategyProvider_base: new (...args: any[]) => any;
export declare class JwtStrategyProvider extends JwtStrategyProvider_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
