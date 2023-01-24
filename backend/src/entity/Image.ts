import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import {Board} from "./Board";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: true})
    mimetype: string;

    @Column({type: "longblob"})
    data: string;

    @Column({length: 100, nullable: true})
    original_name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(type => Board, {onDelete:"CASCADE", onUpdate:"CASCADE"})
    @JoinColumn()
    board: Board;

}