"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsCommentsAndUsers1657230899232 = void 0;
class CreateRelationsCommentsAndUsers1657230899232 {
    constructor() {
        this.name = 'CreateRelationsCommentsAndUsers1657230899232';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"');
    }
}
exports.CreateRelationsCommentsAndUsers1657230899232 = CreateRelationsCommentsAndUsers1657230899232;
//# sourceMappingURL=1657230899232-Create_Relations_Comments_and_Users.js.map