import RefreshToken from './token';
import AuthCode from './auth.code';
import VerificationCode from './verification.code';
import { UuidEntity } from '@ducksclan/database';
import { Generator } from '@ducksclan/utils';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import {
    IsAlphanumeric,
    IsDate,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

@Entity()
export default class Account extends UuidEntity {
    constructor(email: string) {
        super();
        this.email = email;
    }

    @IsString()
    @IsEmail()
    @Column('varchar', { unique: true })
    email: string;

    @IsString()
    @IsAlphanumeric()
    @MinLength(5)
    @MaxLength(20)
    @Column('varchar', { unique: true })
    username: string = 'user_' + Generator.sequence(10);

    @IsInt()
    @Column('integer')
    access_level: number = 0;

    @IsOptional()
    @IsDate()
    @Column('datetime', { nullable: true })
    verified_at?: Date | null = null;

    // relations

    @OneToMany(() => RefreshToken, entity => entity.account)
    tokens?: RefreshToken[];

    @OneToMany(() => AuthCode, entity => entity.account)
    authCodes?: AuthCode[];

    @OneToOne(() => VerificationCode, entity => entity.account)
    verificationCode?: VerificationCode;
}
