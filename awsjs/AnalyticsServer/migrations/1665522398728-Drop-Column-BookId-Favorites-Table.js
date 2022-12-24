"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropColumnBookIdFavoritesTable1665522398728 = void 0;
class DropColumnBookIdFavoritesTable1665522398728 {
    constructor() {
        this.name = 'DropColumnBookIdFavoritesTable1665522398728';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "bookId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "favorites" ADD "bookId" integer NOT NULL`);
    }
}
exports.DropColumnBookIdFavoritesTable1665522398728 = DropColumnBookIdFavoritesTable1665522398728;
//# sourceMappingURL=1665522398728-Drop-Column-BookId-Favorites-Table.js.map