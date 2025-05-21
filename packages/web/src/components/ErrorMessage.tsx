export type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-900/30 p-4">
      <div className="text-sm text-red-300">{message}</div>
    </div>
  );
}
