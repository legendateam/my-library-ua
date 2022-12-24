"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsUsersAndWillRead1657231290864 = void 0;
class CreateRelationsUsersAndWillRead1657231290864 {
    constructor() {
        this.name = 'CreateRelationsUsersAndWillRead1657231290864';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "will_read" ADD CONSTRAINT "FK_3746bbbd35e2d8b872b6bbf6326" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "will_read" DROP CONSTRAINT "FK_3746bbbd35e2d8b872b6bbf6326"');
    }
}
exports.CreateRelationsUsersAndWillRead1657231290864 = CreateRelationsUsersAndWillRead1657231290864;
//# sourceMappingURL=1657231290864-Create_relations_Users_and_Will_Read.js.map