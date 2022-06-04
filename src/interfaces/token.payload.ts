import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ClientError } from '@ducksclan/wrapper-express';
import { Validation } from '@ducksclan/utils';

export default class TokenPayload {
    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsInt()
    @IsNotEmpty()
    access_level?: number;

    constructor(object: TokenPayload) {
        this.user_id = object?.user_id;
        this.access_level = object?.access_level;
    }

    static async validate(payload: any): Promise<TokenPayload> {
        let object = new TokenPayload(payload);
        let errors = await Validation.validate(object);

        if (errors.length > 0) {
            throw ClientError.Unauthorized('invalid token payload');
        }

        return object;
    }
}
