import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { HttpStatus, ApiError } from '@ducksclan/wrapper-express';
import { Validation } from '@ducksclan/utils';

export default class TokenPayload {
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsOptional()
    @IsBoolean()
    admin?: boolean;

    constructor(object: TokenPayload) {
        this.user_id = object?.user_id;
        this.admin = object?.admin;
    }

    static async validate(payload: any): Promise<TokenPayload> {
        let object = new TokenPayload(payload);
        let errors = await Validation.validate(object);

        if (errors.length > 0) {
            throw new ApiError('invalid token', HttpStatus.Unauthorized);
        }

        return object;
    }
}
