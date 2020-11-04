import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsInput } from './assign-students.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
	constructor(
		private lessonService: LessonService,
		private studentService: StudentService,
	) {}
	@Query(returns => LessonType)
	async lesson(@Args('id') id: string) {
		return this.lessonService.getLesson(id);
	}

	@Query(returns => [LessonType])
	async allLessons() {
		return this.lessonService.getAllLessons();
	}

	@Mutation(returns => LessonType)
	async createLesson(
		@Args('createLessonInput') createLessonInput: CreateLessonInput,
	) {
		return this.lessonService.createLesson(createLessonInput);
	}

	@Mutation(returns => LessonType)
	async assignStudentsToLesson(
		@Args('assignStudents') assignStudents: AssignStudentsInput,
	) {
		return this.lessonService.assignStudentsToLesson(assignStudents);
	}

	@ResolveField()
	async students(@Parent() lesson: Lesson) {
		return this.studentService.getStudentsByIds(lesson.students);
	}
}
