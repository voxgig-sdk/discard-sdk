import { AiChatEntity } from './entity/AiChatEntity';
import { TestEntity } from './entity/TestEntity';
import { TestingEntity } from './entity/TestingEntity';
export type * from './DiscardTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DiscardEntityBase } from './DiscardEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class DiscardSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AiChat(entopts?: Record<string, any>): AiChatEntity;
    Test(entopts?: Record<string, any>): TestEntity;
    Testing(entopts?: Record<string, any>): TestingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DiscardSDK;
    tester(testopts?: any, sdkopts?: any): DiscardSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DiscardSDK;
export { stdutil, config, BaseFeature, DiscardEntityBase, DiscardSDK, SDK, };
