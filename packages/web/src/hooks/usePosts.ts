import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import postService from '../services/postService';
import type { PostDto } from '@social-platform/shared/src/types/dtos/PostDto';
import type { CreatePostInput, UpdatePostInput } from '../services/postService';

export const usePostsByProfile = (profileId: string) => {
  return useQuery<PostDto[]>({
    queryKey: ['posts', 'profile', profileId],
    queryFn: () => postService.getPostsByProfileId(profileId),
    enabled: !!profileId,
  });
};

export const usePostById = (id: string) => {
  return useQuery<PostDto>({
    queryKey: ['post', id],
    queryFn: () => postService.getPostById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<PostDto, Error, CreatePostInput>({
    mutationFn: (input) => postService.createPost(input),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['posts', 'profile', data.profileId] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<PostDto, Error, UpdatePostInput>({
    mutationFn: (input) => postService.updatePost(input),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['post', data.id] });
      void queryClient.invalidateQueries({ queryKey: ['posts', 'profile', data.profileId] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { id: string; profileId: string }>({
    mutationFn: ({ id }) => postService.deletePost(id),
    onSuccess: (_, { profileId, id }) => {
      void queryClient.invalidateQueries({ queryKey: ['posts', 'profile', profileId] });
      void queryClient.invalidateQueries({ queryKey: ['post', id] });
    },
  });
};
