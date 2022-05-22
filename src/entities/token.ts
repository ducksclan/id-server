import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';
import { BaseEntity } from '@ducksclan/database';
import Account from './account';

@Entity()
export default class RefreshToken extends BaseEntity {
    constructor(
        id: string,
        account: Account,
        value: string,
        ip?: string | null
    ) {
        super();
        this.id = id;
        this.account = account;
        this.value = value;
        this.ip = ip;
    }

    @IsString()
    @PrimaryColumn('varchar')
    id!: string;

    @IsString()
    @Column('varchar', { unique: true })
    value!: string;

    @IsOptional()
    @IsString()
    @Column('varchar', { nullable: true })
    ip?: string | null = null;

    @ManyToOne(() => Account, account => account.tokens, {
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'account_id' })
    account!: Account;
}
