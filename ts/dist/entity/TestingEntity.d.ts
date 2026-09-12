import { DiscardEntityBase } from '../DiscardEntityBase';
import type { DiscardSDK } from '../DiscardSDK';
import type { Control } from '../types';
import type { Testing, TestingLoadMatch, TestingCreateData } from '../DiscardTypes';
declare class TestingEntity extends DiscardEntityBase<Testing> {
    constructor(client: DiscardSDK, entopts: any);
    make(this: TestingEntity): TestingEntity;
    load(this: any, reqmatch?: TestingLoadMatch, ctrl?: Control): Promise<TestingEntity>;
    create(this: any, reqdata?: TestingCreateData, ctrl?: Control): Promise<TestingEntity>;
}
export { TestingEntity };
