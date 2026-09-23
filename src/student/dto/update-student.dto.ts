import { PartialType } from "@nestjs/mapped-types";
import { CreateStudent } from "./create-student.dto";

export class UpdateStudentDto extends PartialType(CreateStudent){}