import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@ducksclan/database';
import Account from './account';

@Entity()
export default class RefreshToken extends BaseEntity {
    static init(
        fingerprint: string,
        account: Account,
        token: string,
        ip?: string | null
    ) {
        let entity = new RefreshToken();

        entity.id = fingerprint;
        entity.account = account;
        entity.value = token;
        entity.ip = ip;

        return entity;
    }

    @PrimaryColumn('varchar')
    id!: string;

    @Column('varchar', { unique: true })
    value!: string;

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
