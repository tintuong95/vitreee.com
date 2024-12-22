"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDetailDTO = exports.AccountDetail = void 0;
const common_1 = require("@nestjs/common");
exports.AccountDetail = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
class AccountDetailDTO {
}
exports.AccountDetailDTO = AccountDetailDTO;
//# sourceMappingURL=account.decorator.js.map