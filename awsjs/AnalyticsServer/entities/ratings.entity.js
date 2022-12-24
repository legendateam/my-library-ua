"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ratings = void 0;
const typeorm_1 = require("typeorm");
const books_entity_1 = require("./books.entity");
const commons_fields_entity_1 = require("./commons-fields.entity");
const users_entity_1 = require("./users.entity");
let Ratings = class Ratings extends commons_fields_entity_1.CommonsFields {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'rate',
        type: 'float',
        nullable: false,
    })
], Ratings.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
], Ratings.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'bookId',
        type: 'int',
        nullable: false,
    })
], Ratings.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => books_entity_1.Books, (books) => books.ratings),
    (0, typeorm_1.JoinColumn)({ name: 'bookId' })
], Ratings.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.ratings),
    (0, typeorm_1.JoinColumn)({ name: 'userId' })
], Ratings.prototype, "user", void 0);
Ratings = __decorate([
    (0, typeorm_1.Entity)()
], Ratings);
exports.Ratings = Ratings;
//# sourceMappingURL=ratings.entity.js.map