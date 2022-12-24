"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const typeorm_1 = require("typeorm");
const ratings_entity_1 = require("./ratings.entity");
const genres_entity_1 = require("./genres.entity");
const comments_entity_1 = require("./comments.entity");
const authors_entity_1 = require("./authors.entity");
const commons_fields_entity_1 = require("./commons-fields.entity");
let Books = class Books extends commons_fields_entity_1.CommonsFields {
};
__decorate([
    (0, typeorm_1.Column)({
        name: 'name',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
], Books.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'yearOfRelease',
        type: 'int',
        nullable: true,
    })
], Books.prototype, "yearOfRelease", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'description',
        type: 'varchar',
        width: 8000,
        nullable: false,
        unique: true,
    })
], Books.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fileText',
        type: 'varchar',
        width: 255,
        nullable: true,
        unique: true,
    })
], Books.prototype, "fileText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'cover',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
        unique: true,
    })
], Books.prototype, "cover", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'fileAudio',
        type: 'varchar',
        width: 255,
        nullable: true,
        unique: true,
        default: null,
    })
], Books.prototype, "fileAudio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'authorId',
        type: 'int',
        nullable: false,
    })
], Books.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => authors_entity_1.Authors, (author) => author.books),
    (0, typeorm_1.JoinColumn)({ name: 'authorId' })
], Books.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comments_entity_1.Comments, (comment) => comment.book)
], Books.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genres_entity_1.Genres),
    (0, typeorm_1.JoinTable)()
], Books.prototype, "genres", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ratings_entity_1.Ratings, (ratings) => ratings.book)
], Books.prototype, "ratings", void 0);
Books = __decorate([
    (0, typeorm_1.Entity)()
], Books);
exports.Books = Books;
//# sourceMappingURL=books.entity.js.map