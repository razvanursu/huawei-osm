import { Expose, classToPlain } from 'class-transformer';
import { Base } from './base';

export class User extends Base {
  @Expose({ name: "email" })
  email: string

  @Expose({ name: "username" })
  username: string

  @Expose({ name: "guild" })
  guild: number
  
  @Expose({ name: "current_level" })
  currentLevel: number

  @Expose({ name: "current_xp" })
  currentXp: number

  @Expose({ name: "current_points" })
  currentPoints: number
  
  @Expose({ name: "level_xp" })
  levelXp: number

  @Expose({ name: "level_max_xp" })
  levelMaxXp: number
}