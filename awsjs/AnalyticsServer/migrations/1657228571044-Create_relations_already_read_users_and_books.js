"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsAlreadyReadUsersAndBooks1657228571044 = void 0;
class CreateRelationsAlreadyReadUsersAndBooks1657228571044 {
    constructor() {
        this.name = 'CreateRelationsAlreadyReadUsersAndBooks1657228571044';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "already_read" ADD CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "already_read" ADD CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "already_read" DROP CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1"');
        await queryRunner.query('ALTER TABLE "already_read" DROP CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a"');
    }
}
exports.CreateRelationsAlreadyReadUsersAndBooks1657228571044 = CreateRelationsAlreadyReadUsersAndBooks1657228571044;
//# sourceMappingURL=1657228571044-Create_relations_already_read_users_and_books.js.map