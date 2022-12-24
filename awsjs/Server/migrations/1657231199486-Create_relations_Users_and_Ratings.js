"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsUsersAndRatings1657231199486 = void 0;
class CreateRelationsUsersAndRatings1657231199486 {
    constructor() {
        this.name = 'CreateRelationsUsersAndRatings1657231199486';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "ratings" ADD CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "ratings" DROP CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40"');
    }
}
exports.CreateRelationsUsersAndRatings1657231199486 = CreateRelationsUsersAndRatings1657231199486;
//# sourceMappingURL=1657231199486-Create_relations_Users_and_Ratings.js.map