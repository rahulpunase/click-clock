import { Flex } from "@/design-system/layout/Flex/Flex";
import { Avatar } from "@/design-system/ui/Avatar/Avatar";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import { Skeleton } from "@/design-system/ui/Skeleton/Skeleton";
import { Text } from "@/design-system/ui/Text/Text";

import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import type { useGetUserProfile } from "@/common/hooks/db/user/queries/useGetUserProfile";
import UserOnlineStatus from "@/common/hooks/onlinePresence/UserOnlineStatus";

type BasicProfileUpdateProps = {
  profile: ReturnType<typeof useGetUserProfile>["data"];
  isLoading: boolean;
  onEditClick: () => void;
};
const BasicProfileUpdate = ({
  profile,
  isLoading,
  onEditClick,
}: BasicProfileUpdateProps) => {
  const { data: user } = useGetCurrentUser();

  const orgRole = profile?.orgRole;
  const city = profile?.city;

  return (
    <Flex gap="gap-2">
      <Flex className="w-[300px]">
        <Text variant="subtext-1">
          Update your personal profile information.
        </Text>
      </Flex>
      <Card>
        <Card.Content>
          <Flex>
            <Flex flex="flex-1" gap="gap-4">
              <Flex className="relative">
                <div className="absolute z-10 right-2">
                  <UserOnlineStatus userId={profile?.userId ?? ""} />
                </div>
                <Avatar className="border border-accent-border size-20 bg-background-card">
                  <Avatar.AvatarFallback>
                    {profile?.name[0]}
                  </Avatar.AvatarFallback>
                </Avatar>
              </Flex>
              {isLoading && (
                <Flex direction="flex-col" justifyContent="justify-between">
                  <Flex direction="flex-col" gap="gap-1">
                    <Skeleton className="h-5 w-[240px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </Flex>
                  <Skeleton className="h-5 w-[200px]" />
                </Flex>
              )}
              {!isLoading && (
                <Flex direction="flex-col" justifyContent="justify-between">
                  <Flex direction="flex-col">
                    <Text variant="heading-2">{profile?.name ?? ""}</Text>
                    <Text variant="subtext-1">{orgRole ?? "Team leader"}</Text>
                  </Flex>
                  <Text variant="subtext">{city ?? ""}</Text>
                </Flex>
              )}
            </Flex>
            <Flex alignItems="items-start">
              <Button variant="outline" icon="pencil" onClick={onEditClick}>
                Edit
              </Button>
            </Flex>
          </Flex>
          <Flex></Flex>
        </Card.Content>
      </Card>
    </Flex>
  );
};

export default BasicProfileUpdate;
