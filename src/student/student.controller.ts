import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudent } from './dto/create-student.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudent){
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  findAll(@Query() PaginationDto: PaginationDto){
    return this.studentService.findAll(PaginationDto);
  }

  @Get(":term")
  findOne(@Param("term") term: string){
    return this.studentService.findOne(term);
  }

  @Patch(":id")
  update(@Param("id") email: string, @Body() updateStudentDto: UpdateStudentDto){
    return this.studentService.update(email, updateStudentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string){
    return this.studentService.removeStudent(id);
  }

}
