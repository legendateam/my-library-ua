"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCommonsFields1657225647334 = void 0;
class CreateTableCommonsFields1657225647334 {
    constructor() {
        this.name = 'CreateTableCommonsFields1657225647334';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "commons_fields" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:27:33Z\', "deletedAt" TIMESTAMP, CONSTRAINT "PK_3e400b51fb79e0f61348fb593f3" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "commons_fields"');
    }
}
exports.CreateTableCommonsFields1657225647334 = CreateTableCommonsFields1657225647334;
//# sourceMappingURL=1657225647334-Create_table_commons_fields.js.map