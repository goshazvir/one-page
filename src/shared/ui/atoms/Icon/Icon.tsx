import type { SVGAttributes } from 'react';
import { cn } from '@/shared/lib';
import { icons, type IconName } from './icons';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size = 20, className, ...props }: IconProps) => {
  const icon = icons[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      {...props}
    >
      <path d={icon.path} />
    </svg>
  );
};
