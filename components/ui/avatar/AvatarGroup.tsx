import { cn } from "@/lib/utils";
import { Avatar, type AvatarProps } from "./Avatar";

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarProps["size"];
  className?: string;
}

const overlapMap = {
  xs:    "-space-x-1.5",
  sm:    "-space-x-2",
  md:    "-space-x-3",
  lg:    "-space-x-3",
  xl:    "-space-x-4",
  "2xl": "-space-x-5",
};

const ringMap = {
  xs:    "ring-[1.5px]",
  sm:    "ring-2",
  md:    "ring-2",
  lg:    "ring-2",
  xl:    "ring-[3px]",
  "2xl": "ring-[3px]",
};

const countSize = {
  xs:    "size-6  text-[10px]",
  sm:    "size-8  text-xs",
  md:    "size-10 text-xs",
  lg:    "size-12 text-sm",
  xl:    "size-16 text-base",
  "2xl": "size-20 text-lg",
};

export function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  className,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;
  const ringClass = ringMap[size ?? "md"];
  const overlapClass = overlapMap[size ?? "md"];

  return (
    <div className={cn("flex items-center", overlapClass, className)}>
      {visible.map((avatar, i) => (
        <span
          key={i}
          className={cn("inline-flex rounded-full ring-background", ringClass)}
          title={avatar.name ?? avatar.alt}
        >
          <Avatar {...avatar} size={size} />
        </span>
      ))}

      {remaining > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full",
            "bg-secondary text-secondary-foreground font-medium",
            "ring-background",
            ringClass,
            countSize[size ?? "md"]
          )}
          title={`${remaining} kişi daha`}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
}
