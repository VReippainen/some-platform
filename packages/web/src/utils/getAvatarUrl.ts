export function getAvatarUrl(username: string): string {
  //https://api.dicebear.com/9.x/micah/svg?seed=Felix

  return `https://api.dicebear.com/9.x/micah/svg?seed=${username}`;
}
