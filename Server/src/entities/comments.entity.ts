import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { Books } from './books.entity';
import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';

@Entity()
export class Comments extends CommonsFields {
    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        name: 'bookId',
        type: 'int',
        nullable: false,
    })
        bookId: number;

    @Column({
        name: 'text',
        type: 'text',
        nullable: false,
    })
        text: string;

    @ManyToOne(() => Books, (books) => books.comments)
    @JoinColumn({ name: 'bookId' })
        book: Books;

    @ManyToOne(() => Users, (users) => users.comments)
    @JoinColumn({ name: 'userId' })
        user: Users;
}
