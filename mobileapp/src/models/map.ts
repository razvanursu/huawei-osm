import { Expose, Type, Transform, plainToClass, Exclude, plainToInstance } from 'class-transformer';
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
  @Transform(({ value }) => value && plainToInstance(Guild, value))
  owningGuild: Guild

  @Expose({ name: "solved_by" })
  @Transform(({ value }) => value && plainToInstance(User, value))
  solvedBy: User

  @Expose({ name: "circle_radius" })
  circleRadius: number

  @Expose({ name: "nearest_neighbor" })
  nearestNeighbor: number

  @Expose({ name: "points_value" })
  pointsValue: number

  @Expose({ name: "xp_value" })
  xpValue: number
  
  @Expose({ name: "user_distance" })
  userDistance: number

  @Expose({ name: "solved_datetime" })
  @Transform(({ value }) => new Date(value))
  solvedDatetime: Date

}