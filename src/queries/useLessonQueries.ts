import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

export type Lesson = {
  id: string;
  title: string;
  content: unknown;
  content_version: number;
  updated_at?: string;
};

type LessonsQueryData = {
  lessons: Lesson[];
};

type LessonsQueryVariables = {
  search?: string;
  limit?: number;
  offset?: number;
};

export type CreateLessonMutationData = {
  createLesson: Lesson;
};

export type CreateLessonMutationVariables = {
  input: {
    title: string;
    content?: unknown;
  };
};

export type UpdateLessonMutationData = {
  updateLesson: Lesson;
};

export type UpdateLessonMutationVariables = {
  id: string;
  input: {
    title?: string;
    content?: unknown;
  };
};

const CREATE_LESSON_GQL = gql`
  mutation CreateLesson($input: CreateLessonInput!) {
    createLesson(input: $input) {
      id
      title
      content_version
    }
  }
` as TypedDocumentNode<CreateLessonMutationData, CreateLessonMutationVariables>;

const UPDATE_LESSON_GQL = gql`
  mutation UpdateLesson($id: ID!, $input: UpdateLessonInput!) {
    updateLesson(id: $id, input: $input) {
      id
      title
      content_version
    }
  }
` as TypedDocumentNode<UpdateLessonMutationData, UpdateLessonMutationVariables>;

const LESSONS_GQL = gql`
  query Lessons($search: String, $limit: Int, $offset: Int) {
    lessons(search: $search, limit: $limit, offset: $offset) {
      id
      title
      content
      content_version
      updated_at
    }
  }
` as TypedDocumentNode<LessonsQueryData, LessonsQueryVariables>;

export function useCreateLessonMutation() {
  const [createLesson, { loading: isSavingLesson, error: saveLessonError }] = useMutation(
    CREATE_LESSON_GQL,
  );

  return {
    createLesson,
    isSavingLesson,
    saveLessonError,
  };
}

export function useUpdateLessonMutation() {
  const [updateLesson, { loading: isUpdatingLesson, error: updateLessonError }] = useMutation(
    UPDATE_LESSON_GQL,
  );

  return {
    updateLesson,
    isUpdatingLesson,
    updateLessonError,
  };
}

export function useLessonsQuery(variables?: LessonsQueryVariables) {
  const { data, loading, error, refetch } = useQuery(LESSONS_GQL, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  return {
    lessons: data?.lessons ?? [],
    loading,
    error,
    refetch,
  };
}
