import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('evnets')
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url:string;

    @Column({nullable:true})
    referrer:string;

    @Column()
    device:string;

    @CreateDateColumn()
    created_at: Date;
}