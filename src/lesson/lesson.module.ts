import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { Lesson } from './lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
	// TOrmM.forFeature --> allows us to inject our repositories
	// into our providers (Resolver/Service)
	imports: [StudentModule, TypeOrmModule.forFeature([Lesson])],
	providers: [LessonResolver, LessonService],
})
export class LessonModule {}
