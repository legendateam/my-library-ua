"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    }),
    __metadata("design:type", Number)
], Ratings.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'userId',
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Ratings.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'bookId',
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Ratings.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => books_entity_1.Books, (books) => books.ratings),
    (0, typeorm_1.JoinColumn)({ name: 'bookId' }),
    __metadata("design:type", books_entity_1.Books)
], Ratings.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.ratings),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", users_entity_1.Users)
], Ratings.prototype, "user", void 0);
Ratings = __decorate([
    (0, typeorm_1.Entity)()
], Ratings);
exports.Ratings = Ratings;
//# sourceMappingURL=ratings.entity.js.map