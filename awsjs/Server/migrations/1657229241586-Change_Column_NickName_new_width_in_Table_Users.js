"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeColumnNickNameNewWidthInTableUsers1657229241586 = void 0;
class ChangeColumnNickNameNewWidthInTableUsers1657229241586 {
    constructor() {
        this.name = 'ChangeColumnNickNameNewWidthInTableUsers1657229241586';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f"');
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "nickName"');
        await queryRunner.query('ALTER TABLE "users" ADD "nickName" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f" UNIQUE ("nickName")');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f"');
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "nickName"');
        await queryRunner.query('ALTER TABLE "users" ADD "nickName" character varying(50) NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f" UNIQUE ("nickName")');
    }
}
exports.ChangeColumnNickNameNewWidthInTableUsers1657229241586 = ChangeColumnNickNameNewWidthInTableUsers1657229241586;
//# sourceMappingURL=1657229241586-Change_Column_NickName_new_width_in_Table_Users.js.map