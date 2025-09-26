import { useImages } from '../../hooks';

interface ImageProps {
  imageIds?: string[];
}

export function Image({ imageIds }: ImageProps) {
  const { data: images, isLoading } = useImages(imageIds);

  if (isLoading) {
    return <div className="w-full aspect-square bg-gray-700 animate-pulse" />;
  }
  if (images?.length === 0) {
    return null;
  }
  return (
    <>
      {(images ?? []).map((image) => (
        <img key={image.id} src={image.url} alt="Post media" className="w-full object-cover" />
      ))}
    </>
  );
}
