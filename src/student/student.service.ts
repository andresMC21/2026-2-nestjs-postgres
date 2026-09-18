import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { CreateStudent } from './dto/create-student.dto';
import { PaginationDto } from './dto/pagination.dto';
import { isUUID } from 'class-validator';
import { Grades } from './entities/grades.entity';

@Injectable()
export class StudentService {

    private readonly logger = new Logger("StudentService");

    constructor(
        @InjectRepository(Grades)
        private readonly gradesRepository: Repository<Grades>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ){}

    async createStudent(createStudentDto: CreateStudent): Promise<Student | undefined>{
        try{
            const {grades = [], ...studentDetails} = createStudentDto;
            const student = this.studentRepository.create({
                ...studentDetails,
                grades: grades.map( grade => this.gradesRepository.create(grade))
            });
            await this.studentRepository.save(student);
            return student;
        }catch(error){
            this.handleException(error);
        }
    }

    async findAll(paginationDto: PaginationDto){
        try{
            const {skip, limit} = paginationDto;
            return await this.studentRepository.find({
                take: limit,
                skip: skip
            });
        }catch(error){
            this.handleException(error);
        }
    }

    async findOne(term: string){
        let student: Student | null;
        try{
            if(isUUID(term)) {
                student = await this.studentRepository.findOneBy({ id: term});
            }else{
                const queryBuilder = this.studentRepository.createQueryBuilder("student");
                student = await queryBuilder.where("UPPER(name)=:name or nickname=:nickname", {
                    name: term.toUpperCase(),
                    nickname: term.toLowerCase()
                })
                .leftJoinAndSelect("student.grades", "studentGrades")
                .getOne()
            }
            
            if(!student)
                throw new NotFoundException(`Student with ${term} not found`);

            return student;

        }catch(error){
            this.handleException(error);
        }
    }

    private handleException(error:any){
        this.logger.error(error);
        if(error.code === '23505'){
            throw new InternalServerErrorException(error.detail);
        }
    }
}
