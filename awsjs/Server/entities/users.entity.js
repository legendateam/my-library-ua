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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const commons_fields_entity_1 = require("./commons-fields.entity");
const enums_1 = require("../enums");
const already_read_entity_1 = require("./already-read.entity");
const comments_entity_1 = require("./comments.entity");
const ratings_entity_1 = require("./ratings.entity");
const favorites_entity_1 = require("./favorites.entity");
const will_read_entity_1 = require("./will-read.entity");
let Users = class Users extends commons_fields_entity_1.CommonsFields {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'nickName',
        type: 'varchar',
        unique: true,
        width: 50,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'password',
        type: 'varchar',
        width: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        type: 'varchar',
        unique: true,
        width: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role',
        type: 'varchar',
        width: 5,
        nullable: true,
        default: enums_1.RoleEnum.USER,
    }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'avatar',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], Users.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => already_read_entity_1.AlreadyRead, (alreadyRead) => alreadyRead.user),
    __metadata("design:type", Array)
], Users.prototype, "alreadyRead", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.Comments, (comments) => comments.user),
    __metadata("design:type", Array)
], Users.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ratings_entity_1.Ratings, (ratings) => ratings.user),
    __metadata("design:type", Array)
], Users.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favorites_entity_1.Favorites, (favorites) => favorites.user),
    __metadata("design:type", Array)
], Users.prototype, "favorites", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => will_read_entity_1.WillRead, (willRead) => willRead.user),
    __metadata("design:type", Array)
], Users.prototype, "willRead", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.Users = Users;
//# sourceMappingURL=users.entity.js.map