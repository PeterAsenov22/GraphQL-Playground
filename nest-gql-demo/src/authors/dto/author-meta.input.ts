import { InputType, PartialType } from "@nestjs/graphql";
import { AuthorMeta } from "../models/author-meta.model";

@InputType()
export class AuthorMetaInput extends PartialType(AuthorMeta, InputType) {}