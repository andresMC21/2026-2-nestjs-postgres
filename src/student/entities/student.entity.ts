import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grades } from "./grades.entity";

@Entity()
export class Student {


    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column("text")
    name:string;

    @Column({
        type: "int",
        nullable: true
    })
    age:number;

    @Column({
        type: "text",
        unique: true
    })
    email:string;

    @Column("boolean")
    isActive: boolean;

    @Column("text")
    gender: string;

    @Column({
        type: "text",
        array: true
    })
    favoriteSubjects:string[];

    @Column("text")
    nickname: string;

    @OneToMany(
        ()=> Grades,
        (grade) => grade.student,
        {cascade: true, eager: true}
    )
    grades?: Grades[]

    @BeforeInsert()
    checkNicknameInsert(){
        if(!this.nickname){
            this.nickname = this.name
        }
        this.nickname = this.nickname.toLowerCase()
                        .replace(" ","_")
                        +this.age
    }

    @BeforeUpdate()
    checkNicknameUpdate(){
        this.nickname = this.nickname.toLowerCase()
                        .replace(" ","_")
                        +this.age
    }

}