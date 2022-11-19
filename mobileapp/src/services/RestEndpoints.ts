import * as Apollo from '@apollo/client';
import { gql, useQuery } from "@apollo/client"
import { Exact, Scalars } from '../generated/types';

const getPayPalLinkMutation = gql`
  mutation PayPalLink($ticketId: UUID!, $eventId: UUID!) {
  link(ticketId: $ticketId, eventId: $eventId) @rest(type: "PaymentLink", path: "/payment/paypal?ticket_id={args.ticketId}&event_id={args.eventId}") {
      link
    }
}`;

export type PayPalLinkVariables = Exact<{
    ticketId: Scalars['UUID'];
    eventId: Scalars['UUID'];
}>;

export type PayPalLinkMutation = { __typename?: 'Mutation', link: { __typename?: 'PaymentLink', link: string }};
  
export function usePayPalLinkMutation(baseOptions?: Apollo.MutationHookOptions<PayPalLinkMutation, PayPalLinkVariables>) {
    const options = {...baseOptions}
    return Apollo.useMutation<PayPalLinkMutation, PayPalLinkVariables>(getPayPalLinkMutation, options);
}

const getPayPalSuccessMutation = gql`
  mutation PayPalSuccess($pathBuilder: function){
  link(pathBuilder: $pathBuilder) @rest(type: "PaymentLink", pathBuilder: $pathBuilder) {
      id
      message
    }
}`;

export type PayPalSuccessVariables = Exact<{
    url: string;
    pathBuilder?: (variables: any) => string;
}>;

export type PayPalSuccessMutation = { __typename?: 'Mutation', message: { __typename?: 'PaymentSuccess', id: string, message: string }};

export function usePayPalSuccessMutation(baseOptions?: Apollo.MutationHookOptions<PayPalSuccessMutation, PayPalSuccessVariables>) {
    const options = {...baseOptions}
    return Apollo.useMutation<PayPalSuccessMutation, PayPalSuccessVariables>(getPayPalSuccessMutation, options);
}