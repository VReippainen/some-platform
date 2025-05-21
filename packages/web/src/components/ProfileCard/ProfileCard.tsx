import Card from '../Card/Card';
import type { ProfileCardProps } from './types';
import GenderIndicator from './GenderIndicator';

const getImageBorder = (gender: string) => {
  if (gender === 'male') {
    return 'border-2 border-blue-500';
  }
  if (gender === 'female') {
    return 'border-2 border-pink-500';
  }
  if (gender != '') {
    return 'border-2 border-purple-700';
  }
  return 'border-2 border-gray-700';
};

function ProfileCard({ username, avatarUrl, gender, actions, className = '' }: ProfileCardProps) {
  const cardShadow = getImageBorder(gender ?? '');
  return (
    <Card className={`flex flex-col items-center gap-3 p-6 ${className}`}>
      <img src={avatarUrl} alt={username + ' avatar'} className={`object-cover ${cardShadow}`} />
      <div className="font-semibold text-lg text-white flex items-center gap-1">
        {username}
        <GenderIndicator gender={gender} />
      </div>
      {/*bio && <div className="text-gray-300 text-center text-sm">{bio}</div>*/}
      {/*stats && (
        <div className="flex gap-6 mt-2">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <span className="text-white font-bold">{value}</span>
              <span className="text-xs text-gray-400 capitalize">{key}</span>
            </div>
          ))}
        </div>
      )*/}
      {actions && <div className="flex gap-2 mt-3">{actions}</div>}
    </Card>
  );
}

export default ProfileCard;
