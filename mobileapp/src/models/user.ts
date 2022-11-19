import { Expose, classToPlain } from 'class-transformer';
import { Base } from './base';

export class User extends Base {
  @Expose({ name: "email" })
  email: string

  @Expose({ name: "username" })
  username: string
  
  @Expose({ name: "current_level" })
  currentLevel: number

  @Expose({ name: "current_xp" })
  currentXp: number
}