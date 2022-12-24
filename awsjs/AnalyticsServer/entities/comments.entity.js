"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const typeorm_1 = require("typeorm");
const books_entity_1 = require("./books.entity");
const commons_fields_entity_1 = require("./commons-fields.entity");
const users_entity_1 = require("./users.entity");
let Comments = class Comments extends commons_fields_entity_1.CommonsFields {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
], Comments.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'bookId',
        type: 'int',
        nullable: false,
    })
], Comments.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'text',
        type: 'text',
        nullable: false,
    })
], Comments.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => books_entity_1.Books, (books) => books.comments),
    (0, typeorm_1.JoinColumn)({ name: 'bookId' })
], Comments.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (users) => users.comments),
    (0, typeorm_1.JoinColumn)({ name: 'userId' })
], Comments.prototype, "user", void 0);
Comments = __decorate([
    (0, typeorm_1.Entity)()
], Comments);
exports.Comments = Comments;
//# sourceMappingURL=comments.entity.js.map