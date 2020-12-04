// import { MinLength } from 'class-validator';
import { Field, ArgsType, Int } from '@nestjs/graphql';

import { PaginationArgs } from 'src/common/dto/pagination.args';

@ArgsType()
export class GetAuthorArgs extends PaginationArgs {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  // @MinLength(3)
  firstName?: string;
}