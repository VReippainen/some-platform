import React, { useState } from 'react';
import { LabeledInput } from './LabeledInput/LabeledInput';
import Button from './Button/Button';
import { useCreatePost } from '../hooks/usePosts';
import { ErrorMessage } from './ErrorMessage';
import { useUploadImage } from '../hooks/useImages';
import { useCurrentProfile, useProfileById } from '../hooks/useProfile';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';

interface PostFormProps {
  profileId: string;
  onSuccess?: () => void;
}

export function PostForm({ profileId, onSuccess }: PostFormProps) {
  const [content, setContent] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const createPost = useCreatePost();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const uploadImage = useUploadImage();
  const [makeProfilePicture, setMakeProfilePicture] = useState<boolean>(false);
  const { data: profile, isLoading: loadingProfile } = useCurrentProfile();

  if (loadingProfile || !profile) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!content.trim()) {
      setLocalError('Content cannot be empty');
      return;
    }
    try {
      const post = await createPost.mutateAsync({ profileId, content });
      // Upload image if selected
      if (imageFile && post.id && profile.id) {
        await uploadImage.mutateAsync({ file: imageFile, postId: post.id, profileId: profile.id });
      }
      setContent('');
      setImageFile(null);
      setMakeProfilePicture(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError('Failed to create post.');
      }
    }
  };

  const errorMessage =
    localError ??
    (createPost.error instanceof Error
      ? createPost.error.message
      : uploadImage.error instanceof Error
        ? uploadImage.error.message
        : 'Failed to create post.');

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
        disabled={createPost.isPending || uploadImage.isPending}
        autoFocus
      />
      <div>
        <label htmlFor="post-image" className="block text-sm font-medium text-gray-300 mb-1">
          Image (optional)
        </label>
        <input
          id="post-image"
          name="image"
          type="file"
          accept="image/*"
          disabled={createPost.isPending || uploadImage.isPending}
          onChange={(e) => {
            setImageFile(e.target.files?.[0] ?? null);
            setMakeProfilePicture(false);
          }}
        />
        <div className="mt-2 flex items-center gap-2">
          <input
            id="make-profile-picture"
            name="makeProfilePicture"
            type="checkbox"
            checked={makeProfilePicture}
            disabled={!imageFile || createPost.isPending || uploadImage.isPending}
            onChange={(e) => {
              setMakeProfilePicture(e.target.checked);
            }}
          />
          <label htmlFor="make-profile-picture" className="text-sm text-gray-300">
            Make this image my profile picture
          </label>
        </div>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button type="submit" disabled={createPost.isPending || uploadImage.isPending}>
        {createPost.isPending || uploadImage.isPending ? 'Posting…' : 'Post'}
      </Button>
    </form>
  );
}
