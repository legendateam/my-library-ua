"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsBooksAndComments1657230468025 = void 0;
class CreateRelationsBooksAndComments1657230468025 {
    constructor() {
        this.name = 'CreateRelationsBooksAndComments1657230468025';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_fe496134857bf079aa6b55d68df" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_fe496134857bf079aa6b55d68df"');
    }
}
exports.CreateRelationsBooksAndComments1657230468025 = CreateRelationsBooksAndComments1657230468025;
//# sourceMappingURL=1657230468025-Create_relations_Books_and_Comments.js.map