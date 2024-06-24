import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateUserSettingsDto {

  @IsOptional()
  @IsBoolean()
  recieveNotifications?: boolean

  @IsOptional()
  @IsBoolean()
  recieveEmails?: boolean

  @IsOptional()
  @IsBoolean()
  recieveSMS?: boolean
}

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  username: string

  @IsString()
  @IsOptional()
  displayName?: string

  @IsOptional()
  @ValidateNested() // indicates that this property contains nested objects that need validation
  @Type(() => CreateUserSettingsDto) // ensure that the input data is transformed into an instance of the createusersettingsdto 
  settings?: CreateUserSettingsDto

}