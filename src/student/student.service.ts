import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudent } from './dto/create-student.dto';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ){}

    async createStudent(createStudentDto: CreateStudent): Promise<Student | undefined>{
        try{
            const student = this.studentRepository.create(createStudentDto);
            await this.studentRepository.save(student);
            return student;
        }catch(error){
            throw new NotFoundException(`No se pudo guardar dato en la bd: ${error}`);
        }
    }
}
