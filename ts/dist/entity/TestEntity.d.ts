import { DiscardEntityBase } from '../DiscardEntityBase';
import type { DiscardSDK } from '../DiscardSDK';
import type { Control } from '../types';
import type { Test, TestLoadMatch, TestCreateData, TestUpdateData, TestRemoveMatch } from '../DiscardTypes';
declare class TestEntity extends DiscardEntityBase<Test> {
    constructor(client: DiscardSDK, entopts: any);
    make(this: TestEntity): TestEntity;
    load(this: any, reqmatch?: TestLoadMatch, ctrl?: Control): Promise<TestEntity>;
    create(this: any, reqdata?: TestCreateData, ctrl?: Control): Promise<TestEntity>;
    update(this: any, reqdata?: TestUpdateData, ctrl?: Control): Promise<TestEntity>;
    remove(this: any, reqmatch?: TestRemoveMatch, ctrl?: Control): Promise<TestEntity>;
}
export { TestEntity };
