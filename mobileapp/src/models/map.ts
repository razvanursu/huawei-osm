import { Expose, classToPlain } from 'class-transformer';
import { Base } from './base';

export class Issue extends Base {
  @Expose({ name: "image_id" })
  imageId: string

  @Expose({ name: "latitude" })
  latitude: string

  @Expose({ name: "longitude" })
  longitude: string
}