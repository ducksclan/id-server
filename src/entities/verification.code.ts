import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@ducksclan/database';
import { Generator } from '@ducksclan/utils';
import { IsString } from 'class-validator';
import Account from './account';

@Entity()
export default class VerificationCode extends BaseEntity {
    constructor(id: string, account: Account) {
        super();
        this.id = id;
        this.account = account;
    }

    @IsString()
    @PrimaryColumn('varchar')
    id: string;

    @IsString()
    @Column('varchar')
    value: string = Generator.code(6);

    @OneToOne(() => Account, account => account.verificationCode, {
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'account_id' })
    account: Account;
}
