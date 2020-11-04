import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsInput } from './assign-students.input';

@Injectable()
export class LessonService {
	constructor(
		@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
	) {}

	async getLesson(id: string): Promise<Lesson> {
		// curly brackets { id } else Mongo would think
		// it's a MongoDB id
		const lesson = await this.lessonRepository.findOne({ id });
		return lesson;
	}

	async getAllLessons(): Promise<Lesson[]> {
		const lessons = await this.lessonRepository.find();
		console.log(lessons);
		return lessons;
	}

	async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
		const { name, startDate, endDate, students } = createLessonInput;
		const lesson = await this.lessonRepository.create({
			id: uuid(),
			name,
			startDate,
			endDate,
			students,
		});

		return this.lessonRepository.save(lesson);
	}

	async assignStudentsToLesson(
		assignStudents: AssignStudentsInput,
	): Promise<Lesson> {
		const { lessonId, studentIds } = assignStudents;
		const lesson = await this.lessonRepository.findOne({ id: lessonId });
		lesson.students = [...lesson.students, ...studentIds];
		return this.lessonRepository.save(lesson);
	}
}
