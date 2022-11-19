import { Expose } from 'class-transformer';
import { Base } from './base';

export class Guild extends Base {
  
  @Expose({ name: "color" })
  color: string

  @Expose({ name: "name" })
  name: string
}