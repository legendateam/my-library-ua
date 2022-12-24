"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsBooksAndWillRead1657230319956 = void 0;
class CreateRelationsBooksAndWillRead1657230319956 {
    constructor() {
        this.name = 'CreateRelationsBooksAndWillRead1657230319956';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "will_read" ADD CONSTRAINT "FK_7b5387dc5c22248912627de8e54" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "will_read" DROP CONSTRAINT "FK_7b5387dc5c22248912627de8e54"');
    }
}
exports.CreateRelationsBooksAndWillRead1657230319956 = CreateRelationsBooksAndWillRead1657230319956;
//# sourceMappingURL=1657230319956-Create_Relations_Books_and_Will_Read.js.map