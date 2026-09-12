import { DiscardEntityBase } from '../DiscardEntityBase';
import type { DiscardSDK } from '../DiscardSDK';
import type { Control } from '../types';
import type { AiChat, AiChatCreateData } from '../DiscardTypes';
declare class AiChatEntity extends DiscardEntityBase<AiChat> {
    constructor(client: DiscardSDK, entopts: any);
    make(this: AiChatEntity): AiChatEntity;
    create(this: any, reqdata?: AiChatCreateData, ctrl?: Control): Promise<AiChatEntity>;
}
export { AiChatEntity };
