import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Character {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  tag: string;
}