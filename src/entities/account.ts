import { Column, Entity, OneToMany } from 'typeorm';
import { UuidEntity } from '@ducksclan/database';
import { Generator } from '@ducksclan/utils';
import RefreshToken from './refresh.token';
import AuthCode from './auth.code';

@Entity()
export default class Account extends UuidEntity {
    static init(email: string, username?: string, access_level?: number) {
        let entity = new Account();

        entity.email = email;
        entity.username = username || 'user_' + Generator.sequence(10);
        entity.access_level = access_level || 0;

        return entity;
    }

    @Column('varchar', { unique: true })
    email!: string;

    @Column('varchar', { unique: true })
    username!: string;

    @Column('integer')
    access_level!: number;

    @Column('datetime', { nullable: true })
    verified_at?: Date | null = null;

    // relations

    @OneToMany(() => RefreshToken, entity => entity.account)
    tokens?: RefreshToken[];

    @OneToMany(() => AuthCode, entity => entity.account)
    authCodes?: AuthCode[];
}
