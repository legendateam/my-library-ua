import {
    Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
} from 'typeorm';

import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';
import { Books } from './books.entity';

@Entity()
export class AlreadyRead extends CommonsFields {
    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @ManyToOne(() => Users, (user) => user.alreadyRead)
    @JoinColumn({ name: 'userId' })
        user: Users;

    @ManyToMany(() => Books)
    @JoinTable()
        books: Books[];
}
