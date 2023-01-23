import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20})
    name: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(() => User, user => user.roles)
    @JoinTable({
        name: "user_role",
        joinColumn: {name: "role_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "user_id", referencedColumnName: "id"}
    })
    users: User[];
}


/*
insert into role (name) values ('ROLE_ADMIN');
insert into role (name) values ('ROLE_MANAGER');
insert into role (name) values ('ROLE_USER');
*/