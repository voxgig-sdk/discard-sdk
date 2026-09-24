"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscardError = void 0;
class DiscardError extends Error {
    isDiscardError = true;
    sdk = 'Discard';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.DiscardError = DiscardError;
//# sourceMappingURL=DiscardError.js.map