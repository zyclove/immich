import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAssetUserTable1738099775096 implements MigrationInterface {
    name = 'AddAssetUserTable1738099775096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "asset_user" ("assetId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_f3d7f17ab93d60e007282726058" PRIMARY KEY ("assetId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_assetId_userId" ON "asset_user" ("assetId", "userId") `);
        await queryRunner.query(`ALTER TABLE "asset_user" ADD CONSTRAINT "FK_07c8478e0936e78b553aaeceedb" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "asset_user" ADD CONSTRAINT "FK_85e2ef24493bdf649dfdfb769a2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset_user" DROP CONSTRAINT "FK_85e2ef24493bdf649dfdfb769a2"`);
        await queryRunner.query(`ALTER TABLE "asset_user" DROP CONSTRAINT "FK_07c8478e0936e78b553aaeceedb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_assetId_userId"`);
        await queryRunner.query(`DROP TABLE "asset_user"`);
    }

}
