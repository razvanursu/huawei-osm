import { Expose } from 'class-transformer';

export class Base {
  @Expose({ name: "id" })
  id: string
}
