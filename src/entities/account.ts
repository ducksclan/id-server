import { Column, Entity, OneToMany } from 'typeorm';
import { UuidEntity } from '@ducksclan/database';
import RefreshToken from './refresh.token';
import AuthCode from './auth.code';

@Entity()
export default class Account extends UuidEntity {
    static init(email: string) {
        let entity = new Account();

        entity.email = email;

        return entity;
    }

    @Column('varchar', { unique: true })
    email!: string;

    @Column('integer')
    access_level: number = 0;

    @Column('datetime', { nullable: true })
    verified_at?: Date | null = null;

    // relations

    @OneToMany(() => RefreshToken, entity => entity.account)
    tokens?: RefreshToken[];

    @OneToMany(() => AuthCode, entity => entity.account)
    authCodes?: AuthCode[];
}
