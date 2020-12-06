import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
    @Field({nullable: true})
    @IsOptional()
    @MinLength(2)
    firstName?: string;

    @Field({nullable: true})
    @IsOptional()
    @MinLength(2)
    lastName?: string;
}