"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsBooksAndRatings1657230739693 = void 0;
class CreateRelationsBooksAndRatings1657230739693 {
    constructor() {
        this.name = 'CreateRelationsBooksAndRatings1657230739693';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "ratings" ADD CONSTRAINT "FK_0563ca767066800a8b2123e6d15" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "ratings" DROP CONSTRAINT "FK_0563ca767066800a8b2123e6d15"');
    }
}
exports.CreateRelationsBooksAndRatings1657230739693 = CreateRelationsBooksAndRatings1657230739693;
//# sourceMappingURL=1657230739693-Create_relations_Books_and_Ratings.js.map