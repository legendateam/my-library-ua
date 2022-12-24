"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsUsersAndFavorites1657231080802 = void 0;
class CreateRelationsUsersAndFavorites1657231080802 {
    constructor() {
        this.name = 'CreateRelationsUsersAndFavorites1657231080802';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"');
    }
}
exports.CreateRelationsUsersAndFavorites1657231080802 = CreateRelationsUsersAndFavorites1657231080802;
//# sourceMappingURL=1657231080802-Create_relations_Users_and_Favorites.js.map