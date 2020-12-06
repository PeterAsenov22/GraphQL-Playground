import { Field, InputType, OmitType, PartialType } from "@nestjs/graphql";
import { Min } from "class-validator";
import { CreateAuthorInput } from "./create-author.input";

@InputType()
export class UpdateAuthorInput extends PartialType(
    OmitType(CreateAuthorInput, ['firstName'] as const)
) {
    @Field()
    @Min(1)
    id: number;
}