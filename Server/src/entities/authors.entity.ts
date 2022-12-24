import {
    Column, Entity, JoinTable, ManyToMany, OneToMany,
} from 'typeorm';

import { CommonsFields } from './commons-fields.entity';
import { Genres } from './genres.entity';
import { Books } from './books.entity';

@Entity()
export class Authors extends CommonsFields {
    @Column({
        name: 'firstName',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        firstName: string;

    @Column({
        name: 'lastName',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        lastName: string;

    @Column({
        name: 'pseudonym',
        type: 'varchar',
        width: 255,
        unique: true,
        nullable: true,
    })
        pseudonym: string;

    @Column({
        name: 'dateBirthday',
        type: 'date',
        nullable: false,
    })
        dateBirthday: string;

    @Column({
        name: 'dateDeath',
        type: 'date',
        nullable: true,
        default: null,
    })
        dateDeath?: string;

    @Column({
        name: 'country',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        country: string;

    @Column({
        name: 'biography',
        type: 'varchar',
        width: 8000,
        nullable: false,
    })
        biography: string;

    @Column({
        name: 'photo',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
        unique: true,
    })
        photo?: string;

    @OneToMany(() => Books, (books) => books.author)
        books: Books[];

    @ManyToMany(() => Genres)
    @JoinTable()
        genres: Genres[];
}
