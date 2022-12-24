import {
    CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CommonsFields {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
    })
        id: number;

    @CreateDateColumn()
        createdAt: Date;

    @DeleteDateColumn()
        deletedAt: Date;
}
