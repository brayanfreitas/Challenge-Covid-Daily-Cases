import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1654376533528 implements MigrationInterface {
    name = 'migration1654376533528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "location" character varying NOT NULL, "date" date NOT NULL, "variant" character varying NOT NULL, "num_sequences" integer NOT NULL, "perc_sequences" numeric NOT NULL, "num_sequences_total" integer NOT NULL, CONSTRAINT "PK_264acb3048c240fb89aa34626db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`DROP TABLE "cases"`);
    }

}
