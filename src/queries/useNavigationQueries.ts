import { gql, ApolloClient } from "@apollo/client";
import { useMemo } from "react";
import { skipToken, useQuery, useSuspenseQuery } from "@apollo/client/react";

const USER_LINKS_GQL = gql`
    query GetUserLinks($token: String!) {
      navigation(token: $token) {
        name
        path
        itemList {
          name
          path
        }
      }
    }
`;

/**
 * Recursively removes null values from objects and arrays.
 */
function sanitizeNavigationData(data: unknown): unknown {
  if (data === null || data === undefined) return undefined;

  if (Array.isArray(data)) {
    const sanitized = data.map(sanitizeNavigationData);
    // Filter out any items that became undefined after sanitization
    return sanitized.filter((item) => item !== undefined);
  }

  if (typeof data === "object" && data !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const cleanedValue = sanitizeNavigationData(value);
      if (cleanedValue !== undefined) {
        sanitized[key] = cleanedValue;
      }
    }
    return sanitized;
  }

  // Primitive values: keep them as-is
  return data;
}

export type NavigationItem = {
  name: string;
  path?: string;
  itemList?: NavigationItem[];
};

type UserLinksQueryData = {
  navigation: NavigationItem[];
};

export function useUserLinks(token: string | null, client?: ApolloClient) {
  const result = useQuery<UserLinksQueryData>(USER_LINKS_GQL, {
    variables: { token: token ?? "" },
    skip: !token,
    client,
  });

  const sanitizedData = useMemo(() => {
    if (!result.data) {
      return undefined;
    }

    return sanitizeNavigationData(result.data) as UserLinksQueryData;
  }, [result.data]);

  return {
    ...result,
    data: sanitizedData,
  };
}

export function useUserLinksSuspense(token: string | null, client?: ApolloClient) {
  const queryOptions = token
    ? { variables: { token }, client }
    : skipToken;

  const { data } = useSuspenseQuery<UserLinksQueryData>(USER_LINKS_GQL, queryOptions);

  return useMemo(() => {
    if (!data) {
      return undefined;
    }

    return sanitizeNavigationData(data) as UserLinksQueryData;
  }, [data]);
}

