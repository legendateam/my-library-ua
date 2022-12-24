import {
    Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,
} from 'typeorm';

import { Books } from './books.entity';
import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';

@Entity()
export class WillRead extends CommonsFields {
    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @ManyToMany(() => Books)
    @JoinTable()
        books: Books[];

    @ManyToOne(() => Users, (user) => user.willRead)
    @JoinColumn({ name: 'userId' })
        user: Users;
}
