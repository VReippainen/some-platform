import React, { useState } from 'react';
import { LabeledInput } from './LabeledInput/LabeledInput';
import Button from './Button/Button';
import { useCreatePost } from '../hooks/usePosts';
import { ErrorMessage } from './ErrorMessage';

interface PostFormProps {
  profileId: string;
  onSuccess?: () => void;
}

export function PostForm({ profileId, onSuccess }: PostFormProps) {
  const [content, setContent] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const createPost = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!content.trim()) {
      setLocalError('Content cannot be empty');
      return;
    }
    try {
      await createPost.mutateAsync({ profileId, content });
      setContent('');
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError('Failed to create post.');
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="space-y-4 max-w-xl mx-auto"
    >
      <LabeledInput
        label="Post Content"
        id="post-content"
        name="content"
        type="text"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        disabled={createPost.isPending}
        autoFocus
      />
      {(localError ?? (createPost.error instanceof Error ? createPost.error.message : null)) && (
        <ErrorMessage
          message={
            localError ??
            (createPost.error instanceof Error
              ? createPost.error.message
              : 'Failed to create post.')
          }
        />
      )}
      <Button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? 'Posting…' : 'Post'}
      </Button>
    </form>
  );
}
