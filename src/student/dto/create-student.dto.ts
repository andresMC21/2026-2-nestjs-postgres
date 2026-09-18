import { IsString, IsNumber, IsPositive, IsEmail, IsBoolean, IsIn, IsArray, IsOptional } from "class-validator";
import { Grades } from "../entities/grades.entity";

export class CreateStudent{

    @IsString()
    name: string;

    @IsNumber()
    @IsPositive()
    age: number;

    @IsString()
    @IsEmail()
    email: string;

    @IsBoolean()
    isActive: boolean;

    @IsString()
    @IsIn(['Male', 'Female', 'Other'])
    gender: string;

    @IsArray()
    @IsOptional()
    favoriteSubjects: string[];

    @IsArray()
    @IsOptional()
    grades: Grades[];
}