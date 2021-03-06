import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(Student)
		private studentRepository: Repository<Student>,
	) {}

	async createStudent(
		createStudentInput: CreateStudentInput,
	): Promise<Student> {
		const { firstname, lastname } = createStudentInput;
		const student = this.studentRepository.create({
			id: uuid(),
			firstname,
			lastname,
		});

		return this.studentRepository.save(student);
	}

	async getStudent(id: string) {
		return this.studentRepository.findOne({ id }); // {id} else MongoDB id !
	}

	async getAllStudents() {
		return this.studentRepository.find();
	}

	async getStudentsByIds(studentIds: string[]): Promise<Student[]> {
		return this.studentRepository.find({
			where: {
				id: {
					$in: studentIds,
				},
			},
		});
	}
}
