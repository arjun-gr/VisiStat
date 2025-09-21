import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1758300444087 implements MigrationInterface {
    name = ' $npmConfigName1758300444087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`evnets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`referrer\` varchar(255) NULL, \`device\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`evnets\``);
    }

}
