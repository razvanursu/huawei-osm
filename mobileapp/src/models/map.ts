import { Expose, classToPlain, Type, Transform } from 'class-transformer';
import { Base } from './base';

export class Issue extends Base {
  @Expose({ name: "image_id" })
  imageId: string

  @Expose({ name: "latitude" })
  @Transform(({ value }) => parseFloat(value))
  latitude: number

  @Expose({ name: "longitude" })
  @Transform(({ value }) => parseFloat(value))
  longitude: number
}