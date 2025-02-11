import { IsEnum, IsNotEmpty } from 'class-validator';

export enum ProfileFieldEnum {
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  CERTIFICATIONS = 'certifications',
  SKILLS = 'skills',
  LANGUAGES = 'languages'
}

export class RemoveProfileFieldDto {
  @IsNotEmpty()
  @IsEnum(ProfileFieldEnum)
  field: ProfileFieldEnum;

  @IsNotEmpty()
  itemId?: string; 
}