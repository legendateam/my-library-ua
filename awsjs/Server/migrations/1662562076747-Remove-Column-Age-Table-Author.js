"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveColumnAgeTableAuthor1662562076747 = void 0;
class RemoveColumnAgeTableAuthor1662562076747 {
    constructor() {
        this.name = 'RemoveColumnAgeTableAuthor1662562076747';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "age"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "authors" ADD "age" integer NOT NULL`);
    }
}
exports.RemoveColumnAgeTableAuthor1662562076747 = RemoveColumnAgeTableAuthor1662562076747;
//# sourceMappingURL=1662562076747-Remove-Column-Age-Table-Author.js.map