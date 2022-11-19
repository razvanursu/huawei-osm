import { Expose, classToPlain } from 'class-transformer';
import { Base } from './base';

export class Event extends Base {
  @Expose({ name: "hashtag" })
  hashtag: string

  @Expose({ name: "name" })
  name: string

  @Expose({ name: "description" })
  description?: string

  @Expose({ name: "organizer" })
  organizer: Profile
}

export class Profile extends Base {
  @Expose({ name: "username" })
  username: string
  
  @Expose({ name: "name" })
  name: string

  @Expose({ name: "bio" })
  bio?: string

  @Expose({ name: "followers_count" })
  followersCount: number
  
  @Expose({ name: "following_count" })
  followingCount: number
}

export class Follower {
  @Expose({ name: "user" })
  user: Profile
}
