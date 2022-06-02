import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1654127168362 implements MigrationInterface {
    name = 'migration1654127168362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" character varying NOT NULL, "date" character varying NOT NULL, "variant" character varying NOT NULL, "num_sequences" integer NOT NULL, "perc_sequences" numeric NOT NULL, "num_sequences_total" integer NOT NULL, CONSTRAINT "PK_264acb3048c240fb89aa34626db" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cases"`);
    }

}
