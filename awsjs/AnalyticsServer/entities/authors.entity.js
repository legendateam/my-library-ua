"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authors = void 0;
const typeorm_1 = require("typeorm");
const commons_fields_entity_1 = require("./commons-fields.entity");
const genres_entity_1 = require("./genres.entity");
const books_entity_1 = require("./books.entity");
let Authors = class Authors extends commons_fields_entity_1.CommonsFields {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'firstName',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
], Authors.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'lastName',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
], Authors.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'pseudonym',
        type: 'varchar',
        width: 255,
        unique: true,
        nullable: true,
    })
], Authors.prototype, "pseudonym", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dateBirthday',
        type: 'date',
        nullable: false,
    })
], Authors.prototype, "dateBirthday", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'dateDeath',
        type: 'date',
        nullable: true,
        default: null,
    })
], Authors.prototype, "dateDeath", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'country',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
], Authors.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'biography',
        type: 'varchar',
        width: 8000,
        nullable: false,
    })
], Authors.prototype, "biography", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'photo',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
        unique: true,
    })
], Authors.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => books_entity_1.Books, (books) => books.author)
], Authors.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genres_entity_1.Genres),
    (0, typeorm_1.JoinTable)()
], Authors.prototype, "genres", void 0);
Authors = __decorate([
    (0, typeorm_1.Entity)()
], Authors);
exports.Authors = Authors;
//# sourceMappingURL=authors.entity.js.map