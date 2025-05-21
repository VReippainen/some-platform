import type { ReactElement } from 'react';

function GenderIndicator({ gender }: { gender?: string }): ReactElement | null {
  if (gender === 'male') {
    return (
      <span title="Male" className="text-blue-400 text-base">
        ♂
      </span>
    );
  }
  if (gender === 'female') {
    return (
      <span title="Female" className="text-pink-400 text-base">
        ♀
      </span>
    );
  }
  if (gender != '') {
    return (
      <span title="Other" className="text-purple-400 text-base">
        ⚥
      </span>
    );
  }
  return null;
}

export default GenderIndicator;
