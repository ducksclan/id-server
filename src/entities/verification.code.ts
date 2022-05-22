import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@ducksclan/database';
import { Generator } from '@ducksclan/utils';
import Account from './account';

@Entity()
export default class VerificationCode extends BaseEntity {
    static init(account: Account) {
        let entity = new VerificationCode();

        entity.id = account.id;
        entity.account = account;

        return entity;
    }

    @PrimaryColumn('varchar')
    id!: string;

    @Column('varchar')
    value: string = Generator.code(6);

    @OneToOne(() => Account, account => account.verificationCode, {
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'account_id' })
    account!: Account;
}
