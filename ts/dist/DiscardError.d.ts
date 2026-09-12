import { Context } from './Context';
declare class DiscardError extends Error {
    isDiscardError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { DiscardError };
