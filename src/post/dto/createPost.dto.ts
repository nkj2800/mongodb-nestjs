import { IsNotEmpty, IsString, MaxLength } from "class-validator"



export class CreatePostDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  content: string

  @IsString()
  @IsNotEmpty()
  userId: string

}