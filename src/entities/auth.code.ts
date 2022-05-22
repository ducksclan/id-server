import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@ducksclan/database';
import { Generator } from '@ducksclan/utils';
import Account from './account';

@Entity()
export default class AuthCode extends BaseEntity {
    static init(fingerprint: string, account: Account) {
        let entity = new AuthCode();

        entity.id = fingerprint;
        entity.account = account;

        return entity;
    }

    @PrimaryColumn('varchar')
    id!: string;

    @Column('varchar')
    value: string = Generator.code(6);

    @ManyToOne(() => Account, account => account.authCodes, {
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'account_id' })
    account!: Account;
}
