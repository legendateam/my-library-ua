import {
    Entity, Column,
} from 'typeorm';

import { CommonsFields } from './commons-fields.entity';

@Entity()
export class Genres extends CommonsFields {
    @Column({
        name: 'name',
        type: 'varchar',
        width: 50,
        unique: true,
        nullable: false,
    })
        name: string;
}
