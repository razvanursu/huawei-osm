import { Expose, Type, Transform, plainToClass, Exclude } from 'class-transformer';
import { Base } from './base';
import { Guild } from './guild';
import { User } from './user';

export class Issue extends Base {
  @Expose({ name: "image_id" })
  imageId: string

  @Expose({ name: "latitude" })
  @Transform(({ value }) => parseFloat(value))
  latitude: number

  @Expose({ name: "longitude" })
  @Transform(({ value }) => parseFloat(value))
  longitude: number

  @Expose({ name: "owning_guild" })
  @Type(() => Guild)
  owningGuild: Guild

  @Expose({ name: "solved_by" })
  solvedBy: User
}