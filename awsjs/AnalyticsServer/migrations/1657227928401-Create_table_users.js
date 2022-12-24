"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1657227928401 = void 0;
class CreateTableUsers1657227928401 {
    constructor() {
        this.name = 'CreateTableUsers1657227928401';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T21:05:32Z\', "deletedAt" TIMESTAMP, "nickName" character varying(50) NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying DEFAULT \'USER\', "avatar" character varying, CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f" UNIQUE ("nickName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "users"');
    }
}
exports.CreateTableUsers1657227928401 = CreateTableUsers1657227928401;
//# sourceMappingURL=1657227928401-Create_table_users.js.map