import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    nickname: string;

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