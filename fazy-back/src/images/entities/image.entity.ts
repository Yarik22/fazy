import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  image: string;
}
