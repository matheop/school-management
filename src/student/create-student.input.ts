import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
	@Field()
	@MinLength(2)
	firstname: string;

	@Field()
	@IsNotEmpty()
	lastname: string;
}
