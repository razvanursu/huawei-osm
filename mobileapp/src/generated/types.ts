import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CreateEventInput = {
  address: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  hashtag: Scalars['String'];
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  paypalUsername?: InputMaybe<Scalars['String']>;
  startTime: Scalars['DateTime'];
};

export type CreateTicketTemplateInput = {
  description?: InputMaybe<Scalars['String']>;
  eventId: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Event = {
  __typename?: 'Event';
  address: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  endTime: Scalars['DateTime'];
  hashtag: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  name: Scalars['String'];
  organizer: Profile;
  organizerId: Scalars['String'];
  participants: Array<EventParticipant>;
  participation?: Maybe<EventParticipant>;
  paypalUsername?: Maybe<Scalars['String']>;
  poster?: Maybe<Scalars['String']>;
  startTime: Scalars['DateTime'];
  ticketTemplates: Array<TicketTemplate>;
};


export type EventParticipantsArgs = {
  filters?: InputMaybe<EventParticipantFilter>;
};

export type EventParticipant = {
  __typename?: 'EventParticipant';
  event: Event;
  eventId: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isInvitationPending: Scalars['Boolean'];
  participant: Profile;
  participantId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type EventParticipantFilter = {
  isInvitationPending?: InputMaybe<Scalars['Boolean']>;
};

export type EventParticipantIdInput = {
  eventId: Scalars['ID'];
  participantId: Scalars['ID'];
};

export type EventParticipantInput = {
  eventId: Scalars['ID'];
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  participantId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type EventStory = {
  __typename?: 'EventStory';
  author: Profile;
  authorId: Scalars['ID'];
  event: Event;
  eventId: Scalars['ID'];
  url: Scalars['String'];
};

export type FollowUserInput = {
  followingId: Scalars['String'];
};

export type FollowerPaginationCursor = {
  followerId: Scalars['String'];
  followingId: Scalars['String'];
};

export type FollowerRelation = {
  __typename?: 'FollowerRelation';
  follower: Profile;
  followingUser: Profile;
};

export type LoginError = {
  __typename?: 'LoginError';
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = LoginError | Token;

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Event>;
  createEventParticipant?: Maybe<EventParticipant>;
  createEventStory?: Maybe<EventStory>;
  createTicketTemplate?: Maybe<TicketTemplate>;
  deleteEvent?: Maybe<Scalars['Boolean']>;
  deleteTicketTemplate?: Maybe<Scalars['Boolean']>;
  followUser?: Maybe<FollowerRelation>;
  login: LoginResult;
  removeEventParticipant?: Maybe<Scalars['Boolean']>;
  signup: SignupResult;
  singleUpload: Scalars['Boolean'];
  unfollowUser?: Maybe<Scalars['String']>;
  updateEvent?: Maybe<Event>;
  updateEventParticipant?: Maybe<EventParticipant>;
  updateProfile?: Maybe<Profile>;
  updateTicketTemplate?: Maybe<TicketTemplate>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateEventParticipantArgs = {
  input: EventParticipantInput;
};


export type MutationCreateEventStoryArgs = {
  eventId: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
};


export type MutationCreateTicketTemplateArgs = {
  input: CreateTicketTemplateInput;
};


export type MutationDeleteEventArgs = {
  eventId: Scalars['String'];
};


export type MutationDeleteTicketTemplateArgs = {
  eventId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationFollowUserArgs = {
  input: FollowUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveEventParticipantArgs = {
  id: EventParticipantIdInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
  test: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  input: FollowUserInput;
};


export type MutationUpdateEventArgs = {
  eventId: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  input?: InputMaybe<UpdateEventInput>;
};


export type MutationUpdateEventParticipantArgs = {
  input: EventParticipantInput;
};


export type MutationUpdateProfileArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  input: ProfileUpdateInput;
};


export type MutationUpdateTicketTemplateArgs = {
  id: Scalars['String'];
  input: UpdateTicketTemplateInput;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  followers: Array<Profile>;
  followersNumber: Scalars['Int'];
  followingRelation: Scalars['Boolean'];
  followingUsers: Array<Profile>;
  followingUsersNumber: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  profilePicture?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};


export type ProfileFollowersArgs = {
  cursor?: InputMaybe<FollowerPaginationCursor>;
  take?: InputMaybe<Scalars['Float']>;
};


export type ProfileFollowingUsersArgs = {
  cursor?: InputMaybe<FollowerPaginationCursor>;
  take?: InputMaybe<Scalars['Float']>;
};

export type ProfileUpdateInput = {
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<Event>;
  eventStories?: Maybe<Array<EventStory>>;
  events?: Maybe<Array<Event>>;
  myAccount?: Maybe<User>;
  myProfile?: Maybe<Profile>;
  profile?: Maybe<Profile>;
  profiles?: Maybe<Array<Profile>>;
  userStories?: Maybe<Array<EventStory>>;
};


export type QueryEventArgs = {
  eventId: Scalars['String'];
};


export type QueryEventStoriesArgs = {
  eventId: Scalars['String'];
};


export type QueryProfileArgs = {
  userId: Scalars['String'];
};


export type QueryUserStoriesArgs = {
  userId: Scalars['String'];
};

export type SignupError = {
  __typename?: 'SignupError';
  message: Scalars['String'];
  target: Scalars['String'];
};

export type SignupInput = {
  birthday: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignupResult = SignupError | User;

export type TicketTemplate = {
  __typename?: 'TicketTemplate';
  description?: Maybe<Scalars['String']>;
  event: Event;
  eventId: Scalars['ID'];
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type UpdateEventInput = {
  description?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['DateTime']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  paypalUsername?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateTicketTemplateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginError' } | { __typename?: 'Token', token: string } };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent?: { __typename?: 'Event', id: string, name: string } | null };

export type EventCreationResponseFragment = { __typename?: 'Event', id: string, name: string };

export type UpdateEventMutationVariables = Exact<{
  eventId: Scalars['String'];
  input?: InputMaybe<UpdateEventInput>;
  file?: InputMaybe<Scalars['Upload']>;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent?: { __typename?: 'Event', id: string, name: string } | null };

export type DeleteEventMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent?: boolean | null };

export type CreateTicketTemplateMutationVariables = Exact<{
  input: CreateTicketTemplateInput;
}>;


export type CreateTicketTemplateMutation = { __typename?: 'Mutation', createTicketTemplate?: { __typename?: 'TicketTemplate', id: string, name: string, description?: string | null, price: number } | null };

export type DeleteTicketTemplateMutationVariables = Exact<{
  id: Scalars['String'];
  eventId: Scalars['String'];
}>;


export type DeleteTicketTemplateMutation = { __typename?: 'Mutation', deleteTicketTemplate?: boolean | null };

export type CreateEventParticipantMutationVariables = Exact<{
  input: EventParticipantInput;
}>;


export type CreateEventParticipantMutation = { __typename?: 'Mutation', createEventParticipant?: { __typename?: 'EventParticipant', participant: { __typename?: 'Profile', name: string } } | null };

export type UpdateEventParticipantMutationVariables = Exact<{
  input: EventParticipantInput;
}>;


export type UpdateEventParticipantMutation = { __typename?: 'Mutation', updateEventParticipant?: { __typename?: 'EventParticipant', participant: { __typename?: 'Profile', name: string } } | null };

export type RemoveEventParticipantMutationVariables = Exact<{
  id: EventParticipantIdInput;
}>;


export type RemoveEventParticipantMutation = { __typename?: 'Mutation', removeEventParticipant?: boolean | null };

export type FullEventFragment = { __typename?: 'Event', id: string, hashtag: string, name: string, description?: string | null, startTime: any, endTime: any, paypalUsername?: string | null, poster?: string | null, address: string, isPrivate: boolean, isAdmin: boolean, organizer: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }, ticketTemplates: Array<{ __typename?: 'TicketTemplate', id: string, name: string, description?: string | null, price: number }>, participants: Array<{ __typename?: 'EventParticipant', participant: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string } }>, participation?: { __typename?: 'EventParticipant', isAdmin: boolean, title?: string | null, isInvitationPending: boolean } | null };

export type EventListEntryFragment = { __typename?: 'Event', id: string, hashtag: string, name: string, description?: string | null, startTime: any, endTime: any, poster?: string | null, address: string, isPrivate: boolean, organizer: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }, participants: Array<{ __typename?: 'EventParticipant', participant: { __typename?: 'Profile', id: string, name: string, profilePicture?: string | null } }> };

export type FullTicketTemplateFragment = { __typename?: 'TicketTemplate', id: string, name: string, description?: string | null, price: number };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events?: Array<{ __typename?: 'Event', id: string, hashtag: string, name: string, description?: string | null, startTime: any, endTime: any, poster?: string | null, address: string, isPrivate: boolean, organizer: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }, participants: Array<{ __typename?: 'EventParticipant', participant: { __typename?: 'Profile', id: string, name: string, profilePicture?: string | null } }> }> | null };

export type EventQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, hashtag: string, name: string, description?: string | null, startTime: any, endTime: any, paypalUsername?: string | null, poster?: string | null, address: string, isPrivate: boolean, isAdmin: boolean, organizer: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }, ticketTemplates: Array<{ __typename?: 'TicketTemplate', id: string, name: string, description?: string | null, price: number }>, participants: Array<{ __typename?: 'EventParticipant', participant: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string } }>, participation?: { __typename?: 'EventParticipant', isAdmin: boolean, title?: string | null, isInvitationPending: boolean } | null } | null };

export type FullEventParticipantFragment = { __typename?: 'EventParticipant', isAdmin: boolean, title?: string | null, participant: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string } };

export type PendingInvitesQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type PendingInvitesQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, participants: Array<{ __typename?: 'EventParticipant', isAdmin: boolean, title?: string | null, participant: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string } }> } | null };

export type ParticipantsQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type ParticipantsQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, participants: Array<{ __typename?: 'EventParticipant', isAdmin: boolean, title?: string | null, participant: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string } }> } | null };

export type EventTicketTemplateFragment = { __typename?: 'TicketTemplate', id: string, name: string, price: number, description?: string | null };

export type EventTicketTemplatesQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventTicketTemplatesQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, ticketTemplates: Array<{ __typename?: 'TicketTemplate', id: string, name: string, price: number, description?: string | null }> } | null };

export type UpdateProfileMutationVariables = Exact<{
  profile: ProfileUpdateInput;
  file?: InputMaybe<Scalars['Upload']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'Profile', name: string } | null };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'FollowerRelation', followingUser: { __typename?: 'Profile', id: string } } | null };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser?: string | null };

export type ProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfilesQuery = { __typename?: 'Query', profiles?: Array<{ __typename?: 'Profile', id: string, name: string, username: string, profilePicture?: string | null, bio?: string | null, followersNumber: number, followingUsersNumber: number, followingRelation: boolean }> | null };

export type ProfileQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: string, name: string, username: string, profilePicture?: string | null, bio?: string | null, followersNumber: number, followingUsersNumber: number, followingRelation: boolean } | null };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile?: { __typename?: 'Profile', id: string, name: string, username: string, profilePicture?: string | null, bio?: string | null, followersNumber: number, followingUsersNumber: number, followingRelation: boolean } | null };

export type FullProfileFragment = { __typename?: 'Profile', id: string, name: string, username: string, profilePicture?: string | null, bio?: string | null, followersNumber: number, followingUsersNumber: number, followingRelation: boolean };

export type FollowersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowersQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', followers: Array<{ __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }> } | null };

export type MyFollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFollowersQuery = { __typename?: 'Query', myProfile?: { __typename?: 'Profile', followers: Array<{ __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }> } | null };

export type FollowingUsersQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowingUsersQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', followingUsers: Array<{ __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }> } | null };

export type MyFollowingUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFollowingUsersQuery = { __typename?: 'Query', myProfile?: { __typename?: 'Profile', followingUsers: Array<{ __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string }> } | null };

export type ProfileListEntryFragment = { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string };

export type EventStoriesQueryVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type EventStoriesQuery = { __typename?: 'Query', eventStories?: Array<{ __typename?: 'EventStory', url: string, author: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string } }> | null };

export type EventStoryEntryFragment = { __typename?: 'EventStory', url: string, author: { __typename?: 'Profile', id: string, profilePicture?: string | null, name: string, username: string } };

export const EventCreationResponseFragmentDoc = gql`
    fragment EventCreationResponse on Event {
  id
  name
}
    `;
export const ProfileListEntryFragmentDoc = gql`
    fragment ProfileListEntry on Profile {
  id
  profilePicture
  name
  username
}
    `;
export const FullTicketTemplateFragmentDoc = gql`
    fragment FullTicketTemplate on TicketTemplate {
  id
  name
  description
  price
}
    `;
export const FullEventFragmentDoc = gql`
    fragment FullEvent on Event {
  id
  hashtag
  name
  description
  startTime
  endTime
  paypalUsername
  poster
  address
  isPrivate
  isAdmin
  organizer {
    ...ProfileListEntry
  }
  ticketTemplates {
    ...FullTicketTemplate
  }
  participants(filters: {isInvitationPending: false}) {
    participant {
      ...ProfileListEntry
    }
  }
  participation {
    isAdmin
    title
    isInvitationPending
  }
}
    ${ProfileListEntryFragmentDoc}
${FullTicketTemplateFragmentDoc}`;
export const EventListEntryFragmentDoc = gql`
    fragment EventListEntry on Event {
  id
  hashtag
  name
  description
  startTime
  endTime
  poster
  address
  isPrivate
  organizer {
    ...ProfileListEntry
  }
  participants {
    participant {
      id
      name
      profilePicture
    }
  }
}
    ${ProfileListEntryFragmentDoc}`;
export const FullEventParticipantFragmentDoc = gql`
    fragment FullEventParticipant on EventParticipant {
  participant {
    ...ProfileListEntry
  }
  isAdmin
  title
}
    ${ProfileListEntryFragmentDoc}`;
export const EventTicketTemplateFragmentDoc = gql`
    fragment EventTicketTemplate on TicketTemplate {
  id
  name
  price
  description
}
    `;
export const FullProfileFragmentDoc = gql`
    fragment FullProfile on Profile {
  id
  name
  username
  profilePicture
  bio
  followersNumber
  followingUsersNumber
  followingRelation
}
    `;
export const EventStoryEntryFragmentDoc = gql`
    fragment EventStoryEntry on EventStory {
  author {
    ...ProfileListEntry
  }
  url
}
    ${ProfileListEntryFragmentDoc}`;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ... on Token {
      token
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateEventDocument = gql`
    mutation createEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    ... on Event {
      ...EventCreationResponse
    }
  }
}
    ${EventCreationResponseFragmentDoc}`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation updateEvent($eventId: String!, $input: UpdateEventInput, $file: Upload) {
  updateEvent(eventId: $eventId, input: $input, file: $file) {
    ... on Event {
      ...EventCreationResponse
    }
  }
}
    ${EventCreationResponseFragmentDoc}`;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      input: // value for 'input'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const DeleteEventDocument = gql`
    mutation deleteEvent($eventId: String!) {
  deleteEvent(eventId: $eventId)
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const CreateTicketTemplateDocument = gql`
    mutation createTicketTemplate($input: CreateTicketTemplateInput!) {
  createTicketTemplate(input: $input) {
    ... on TicketTemplate {
      ...FullTicketTemplate
    }
  }
}
    ${FullTicketTemplateFragmentDoc}`;
export type CreateTicketTemplateMutationFn = Apollo.MutationFunction<CreateTicketTemplateMutation, CreateTicketTemplateMutationVariables>;

/**
 * __useCreateTicketTemplateMutation__
 *
 * To run a mutation, you first call `useCreateTicketTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketTemplateMutation, { data, loading, error }] = useCreateTicketTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTicketTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketTemplateMutation, CreateTicketTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketTemplateMutation, CreateTicketTemplateMutationVariables>(CreateTicketTemplateDocument, options);
      }
export type CreateTicketTemplateMutationHookResult = ReturnType<typeof useCreateTicketTemplateMutation>;
export type CreateTicketTemplateMutationResult = Apollo.MutationResult<CreateTicketTemplateMutation>;
export type CreateTicketTemplateMutationOptions = Apollo.BaseMutationOptions<CreateTicketTemplateMutation, CreateTicketTemplateMutationVariables>;
export const DeleteTicketTemplateDocument = gql`
    mutation deleteTicketTemplate($id: String!, $eventId: String!) {
  deleteTicketTemplate(id: $id, eventId: $eventId)
}
    `;
export type DeleteTicketTemplateMutationFn = Apollo.MutationFunction<DeleteTicketTemplateMutation, DeleteTicketTemplateMutationVariables>;

/**
 * __useDeleteTicketTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteTicketTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketTemplateMutation, { data, loading, error }] = useDeleteTicketTemplateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useDeleteTicketTemplateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTicketTemplateMutation, DeleteTicketTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTicketTemplateMutation, DeleteTicketTemplateMutationVariables>(DeleteTicketTemplateDocument, options);
      }
export type DeleteTicketTemplateMutationHookResult = ReturnType<typeof useDeleteTicketTemplateMutation>;
export type DeleteTicketTemplateMutationResult = Apollo.MutationResult<DeleteTicketTemplateMutation>;
export type DeleteTicketTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteTicketTemplateMutation, DeleteTicketTemplateMutationVariables>;
export const CreateEventParticipantDocument = gql`
    mutation createEventParticipant($input: EventParticipantInput!) {
  createEventParticipant(input: $input) {
    ... on EventParticipant {
      participant {
        name
      }
    }
  }
}
    `;
export type CreateEventParticipantMutationFn = Apollo.MutationFunction<CreateEventParticipantMutation, CreateEventParticipantMutationVariables>;

/**
 * __useCreateEventParticipantMutation__
 *
 * To run a mutation, you first call `useCreateEventParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventParticipantMutation, { data, loading, error }] = useCreateEventParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventParticipantMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventParticipantMutation, CreateEventParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventParticipantMutation, CreateEventParticipantMutationVariables>(CreateEventParticipantDocument, options);
      }
export type CreateEventParticipantMutationHookResult = ReturnType<typeof useCreateEventParticipantMutation>;
export type CreateEventParticipantMutationResult = Apollo.MutationResult<CreateEventParticipantMutation>;
export type CreateEventParticipantMutationOptions = Apollo.BaseMutationOptions<CreateEventParticipantMutation, CreateEventParticipantMutationVariables>;
export const UpdateEventParticipantDocument = gql`
    mutation updateEventParticipant($input: EventParticipantInput!) {
  updateEventParticipant(input: $input) {
    ... on EventParticipant {
      participant {
        name
      }
    }
  }
}
    `;
export type UpdateEventParticipantMutationFn = Apollo.MutationFunction<UpdateEventParticipantMutation, UpdateEventParticipantMutationVariables>;

/**
 * __useUpdateEventParticipantMutation__
 *
 * To run a mutation, you first call `useUpdateEventParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventParticipantMutation, { data, loading, error }] = useUpdateEventParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventParticipantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventParticipantMutation, UpdateEventParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventParticipantMutation, UpdateEventParticipantMutationVariables>(UpdateEventParticipantDocument, options);
      }
export type UpdateEventParticipantMutationHookResult = ReturnType<typeof useUpdateEventParticipantMutation>;
export type UpdateEventParticipantMutationResult = Apollo.MutationResult<UpdateEventParticipantMutation>;
export type UpdateEventParticipantMutationOptions = Apollo.BaseMutationOptions<UpdateEventParticipantMutation, UpdateEventParticipantMutationVariables>;
export const RemoveEventParticipantDocument = gql`
    mutation removeEventParticipant($id: EventParticipantIdInput!) {
  removeEventParticipant(id: $id)
}
    `;
export type RemoveEventParticipantMutationFn = Apollo.MutationFunction<RemoveEventParticipantMutation, RemoveEventParticipantMutationVariables>;

/**
 * __useRemoveEventParticipantMutation__
 *
 * To run a mutation, you first call `useRemoveEventParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEventParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEventParticipantMutation, { data, loading, error }] = useRemoveEventParticipantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveEventParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEventParticipantMutation, RemoveEventParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEventParticipantMutation, RemoveEventParticipantMutationVariables>(RemoveEventParticipantDocument, options);
      }
export type RemoveEventParticipantMutationHookResult = ReturnType<typeof useRemoveEventParticipantMutation>;
export type RemoveEventParticipantMutationResult = Apollo.MutationResult<RemoveEventParticipantMutation>;
export type RemoveEventParticipantMutationOptions = Apollo.BaseMutationOptions<RemoveEventParticipantMutation, RemoveEventParticipantMutationVariables>;
export const EventsDocument = gql`
    query events {
  events {
    ... on Event {
      ...EventListEntry
    }
  }
}
    ${EventListEntryFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const EventDocument = gql`
    query event($eventId: String!) {
  event(eventId: $eventId) {
    ... on Event {
      ...FullEvent
    }
  }
}
    ${FullEventFragmentDoc}`;

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const PendingInvitesDocument = gql`
    query pendingInvites($eventId: String!) {
  event(eventId: $eventId) {
    id
    participants(filters: {isInvitationPending: true}) {
      ...FullEventParticipant
    }
  }
}
    ${FullEventParticipantFragmentDoc}`;

/**
 * __usePendingInvitesQuery__
 *
 * To run a query within a React component, call `usePendingInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingInvitesQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function usePendingInvitesQuery(baseOptions: Apollo.QueryHookOptions<PendingInvitesQuery, PendingInvitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingInvitesQuery, PendingInvitesQueryVariables>(PendingInvitesDocument, options);
      }
export function usePendingInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingInvitesQuery, PendingInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingInvitesQuery, PendingInvitesQueryVariables>(PendingInvitesDocument, options);
        }
export type PendingInvitesQueryHookResult = ReturnType<typeof usePendingInvitesQuery>;
export type PendingInvitesLazyQueryHookResult = ReturnType<typeof usePendingInvitesLazyQuery>;
export type PendingInvitesQueryResult = Apollo.QueryResult<PendingInvitesQuery, PendingInvitesQueryVariables>;
export const ParticipantsDocument = gql`
    query participants($eventId: String!) {
  event(eventId: $eventId) {
    ... on Event {
      id
      participants(filters: {isInvitationPending: false}) {
        ...FullEventParticipant
      }
    }
  }
}
    ${FullEventParticipantFragmentDoc}`;

/**
 * __useParticipantsQuery__
 *
 * To run a query within a React component, call `useParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useParticipantsQuery(baseOptions: Apollo.QueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, options);
      }
export function useParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantsQuery, ParticipantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParticipantsQuery, ParticipantsQueryVariables>(ParticipantsDocument, options);
        }
export type ParticipantsQueryHookResult = ReturnType<typeof useParticipantsQuery>;
export type ParticipantsLazyQueryHookResult = ReturnType<typeof useParticipantsLazyQuery>;
export type ParticipantsQueryResult = Apollo.QueryResult<ParticipantsQuery, ParticipantsQueryVariables>;
export const EventTicketTemplatesDocument = gql`
    query eventTicketTemplates($eventId: String!) {
  event(eventId: $eventId) {
    id
    ticketTemplates {
      ...EventTicketTemplate
    }
  }
}
    ${EventTicketTemplateFragmentDoc}`;

/**
 * __useEventTicketTemplatesQuery__
 *
 * To run a query within a React component, call `useEventTicketTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventTicketTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventTicketTemplatesQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventTicketTemplatesQuery(baseOptions: Apollo.QueryHookOptions<EventTicketTemplatesQuery, EventTicketTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventTicketTemplatesQuery, EventTicketTemplatesQueryVariables>(EventTicketTemplatesDocument, options);
      }
export function useEventTicketTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventTicketTemplatesQuery, EventTicketTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventTicketTemplatesQuery, EventTicketTemplatesQueryVariables>(EventTicketTemplatesDocument, options);
        }
export type EventTicketTemplatesQueryHookResult = ReturnType<typeof useEventTicketTemplatesQuery>;
export type EventTicketTemplatesLazyQueryHookResult = ReturnType<typeof useEventTicketTemplatesLazyQuery>;
export type EventTicketTemplatesQueryResult = Apollo.QueryResult<EventTicketTemplatesQuery, EventTicketTemplatesQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($profile: ProfileUpdateInput!, $file: Upload) {
  updateProfile(input: $profile, file: $file) {
    ... on Profile {
      name
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const FollowUserDocument = gql`
    mutation followUser($userId: String!) {
  followUser(input: {followingId: $userId}) {
    ... on FollowerRelation {
      followingUser {
        id
      }
    }
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation unfollowUser($userId: String!) {
  unfollowUser(input: {followingId: $userId})
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const ProfilesDocument = gql`
    query profiles {
  profiles {
    ... on Profile {
      ...FullProfile
    }
  }
}
    ${FullProfileFragmentDoc}`;

/**
 * __useProfilesQuery__
 *
 * To run a query within a React component, call `useProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfilesQuery(baseOptions?: Apollo.QueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
      }
export function useProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
        }
export type ProfilesQueryHookResult = ReturnType<typeof useProfilesQuery>;
export type ProfilesLazyQueryHookResult = ReturnType<typeof useProfilesLazyQuery>;
export type ProfilesQueryResult = Apollo.QueryResult<ProfilesQuery, ProfilesQueryVariables>;
export const ProfileDocument = gql`
    query profile($userId: String!) {
  profile(userId: $userId) {
    ... on Profile {
      ...FullProfile
    }
  }
}
    ${FullProfileFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const MyProfileDocument = gql`
    query myProfile {
  myProfile {
    ... on Profile {
      ...FullProfile
    }
  }
}
    ${FullProfileFragmentDoc}`;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const FollowersDocument = gql`
    query followers($userId: String!) {
  profile(userId: $userId) {
    ... on Profile {
      followers {
        ...ProfileListEntry
      }
    }
  }
}
    ${ProfileListEntryFragmentDoc}`;

/**
 * __useFollowersQuery__
 *
 * To run a query within a React component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowersQuery(baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
      }
export function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
        }
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>;
export const MyFollowersDocument = gql`
    query myFollowers {
  myProfile {
    ... on Profile {
      followers {
        ...ProfileListEntry
      }
    }
  }
}
    ${ProfileListEntryFragmentDoc}`;

/**
 * __useMyFollowersQuery__
 *
 * To run a query within a React component, call `useMyFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFollowersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFollowersQuery(baseOptions?: Apollo.QueryHookOptions<MyFollowersQuery, MyFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFollowersQuery, MyFollowersQueryVariables>(MyFollowersDocument, options);
      }
export function useMyFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFollowersQuery, MyFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFollowersQuery, MyFollowersQueryVariables>(MyFollowersDocument, options);
        }
export type MyFollowersQueryHookResult = ReturnType<typeof useMyFollowersQuery>;
export type MyFollowersLazyQueryHookResult = ReturnType<typeof useMyFollowersLazyQuery>;
export type MyFollowersQueryResult = Apollo.QueryResult<MyFollowersQuery, MyFollowersQueryVariables>;
export const FollowingUsersDocument = gql`
    query followingUsers($userId: String!) {
  profile(userId: $userId) {
    ... on Profile {
      followingUsers {
        ...ProfileListEntry
      }
    }
  }
}
    ${ProfileListEntryFragmentDoc}`;

/**
 * __useFollowingUsersQuery__
 *
 * To run a query within a React component, call `useFollowingUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingUsersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowingUsersQuery(baseOptions: Apollo.QueryHookOptions<FollowingUsersQuery, FollowingUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowingUsersQuery, FollowingUsersQueryVariables>(FollowingUsersDocument, options);
      }
export function useFollowingUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowingUsersQuery, FollowingUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowingUsersQuery, FollowingUsersQueryVariables>(FollowingUsersDocument, options);
        }
export type FollowingUsersQueryHookResult = ReturnType<typeof useFollowingUsersQuery>;
export type FollowingUsersLazyQueryHookResult = ReturnType<typeof useFollowingUsersLazyQuery>;
export type FollowingUsersQueryResult = Apollo.QueryResult<FollowingUsersQuery, FollowingUsersQueryVariables>;
export const MyFollowingUsersDocument = gql`
    query myFollowingUsers {
  myProfile {
    ... on Profile {
      followingUsers {
        ...ProfileListEntry
      }
    }
  }
}
    ${ProfileListEntryFragmentDoc}`;

/**
 * __useMyFollowingUsersQuery__
 *
 * To run a query within a React component, call `useMyFollowingUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyFollowingUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyFollowingUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyFollowingUsersQuery(baseOptions?: Apollo.QueryHookOptions<MyFollowingUsersQuery, MyFollowingUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFollowingUsersQuery, MyFollowingUsersQueryVariables>(MyFollowingUsersDocument, options);
      }
export function useMyFollowingUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFollowingUsersQuery, MyFollowingUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFollowingUsersQuery, MyFollowingUsersQueryVariables>(MyFollowingUsersDocument, options);
        }
export type MyFollowingUsersQueryHookResult = ReturnType<typeof useMyFollowingUsersQuery>;
export type MyFollowingUsersLazyQueryHookResult = ReturnType<typeof useMyFollowingUsersLazyQuery>;
export type MyFollowingUsersQueryResult = Apollo.QueryResult<MyFollowingUsersQuery, MyFollowingUsersQueryVariables>;
export const EventStoriesDocument = gql`
    query eventStories($eventId: String!) {
  eventStories(eventId: $eventId) {
    ... on EventStory {
      ...EventStoryEntry
    }
  }
}
    ${EventStoryEntryFragmentDoc}`;

/**
 * __useEventStoriesQuery__
 *
 * To run a query within a React component, call `useEventStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventStoriesQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventStoriesQuery(baseOptions: Apollo.QueryHookOptions<EventStoriesQuery, EventStoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventStoriesQuery, EventStoriesQueryVariables>(EventStoriesDocument, options);
      }
export function useEventStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventStoriesQuery, EventStoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventStoriesQuery, EventStoriesQueryVariables>(EventStoriesDocument, options);
        }
export type EventStoriesQueryHookResult = ReturnType<typeof useEventStoriesQuery>;
export type EventStoriesLazyQueryHookResult = ReturnType<typeof useEventStoriesLazyQuery>;
export type EventStoriesQueryResult = Apollo.QueryResult<EventStoriesQuery, EventStoriesQueryVariables>;