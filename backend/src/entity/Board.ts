import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Comment} from './Comment';
import {User} from "./User";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    title: string;

    @Column("text")
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(type => Comment, comment => comment.board)
    comments: Comment[];
    // user와 관계 설정
    @ManyToOne(type => User, user => user.boards)
    user: User;
    // join 없이 user의 id 가져오기
    @Column()
    userId: number;


}