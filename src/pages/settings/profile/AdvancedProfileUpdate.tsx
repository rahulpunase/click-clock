import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import { Skeleton } from "@/design-system/ui/Skeleton/Skeleton";
import { Text } from "@/design-system/ui/Text/Text";

import { useGetCurrentUser } from "@/common/hooks/db/user/queries/useGetCurrentUser";
import type { useGetUserProfile } from "@/common/hooks/db/user/queries/useGetUserProfile";

const DisplayField = ({
  label,
  value,
  fallback,
  isLoading,
}: {
  label: string;
  value: string;
  fallback?: string;
  isLoading: boolean;
}) => (
  <Flex direction="flex-col" flex="flex-1">
    <Text variant="subtext-1">{label}</Text>
    {isLoading && <Skeleton className="h-5 w-[200px]" />}
    {!isLoading && (
      <>
        {value && <Text variant="body-2">{value}</Text>}
        {!value && fallback && <Text variant="subtext">{fallback}</Text>}
      </>
    )}
  </Flex>
);

type AdvancedProfileUpdateProps = {
  profile: ReturnType<typeof useGetUserProfile>["data"];
  isLoading: boolean;
  onEditClick: () => void;
};
const AdvancedProfileUpdate = ({
  profile,
  isLoading,
  onEditClick,
}: AdvancedProfileUpdateProps) => {
  const { data: user } = useGetCurrentUser();

  const name = (profile?.name ?? user?.name)?.split(" ");
  const emailAddress = profile?.email ?? user?.email;

  return (
    <Flex gap="gap-2">
      <Flex className="w-[300px]">
        <Text variant="subtext-1">
          Update your personal profile information.
        </Text>
      </Flex>
      <Card>
        <Card.Header>
          <Card.Header.Title>Personal information</Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Flex>
            <Flex direction="flex-col" flex="flex-1" gap="gap-6">
              <Flex flex="flex-1" gap="gap-6" className="pr-20">
                <DisplayField
                  label="First name"
                  value={name?.[0] ?? ""}
                  fallback="No first name is provided"
                  isLoading={isLoading}
                />
                <DisplayField
                  label="Last name"
                  value={name?.[1] ?? ""}
                  fallback="No last name is provided"
                  isLoading={isLoading}
                />
              </Flex>
              <Flex flex="flex-1" gap="gap-6" className="pr-20">
                <DisplayField
                  label="Email address"
                  value={emailAddress ?? ""}
                  fallback="No email address. :("
                  isLoading={isLoading}
                />
                <DisplayField
                  label="Phone"
                  value={profile?.phone ?? ""}
                  fallback="We won't be calling you"
                  isLoading={isLoading}
                />
              </Flex>
              <Flex flex="flex-1" gap="gap-6" className="pr-20">
                <DisplayField
                  label="Display name"
                  value={profile?.nickName ?? ""}
                  fallback="Display name helps you build your identity"
                  isLoading={isLoading}
                />
              </Flex>
              <Flex>
                <DisplayField
                  label="Bio"
                  value={profile?.bio ?? ""}
                  fallback="Tell us some good or bad things about you. We won't be judging. ;)"
                  isLoading={isLoading}
                />
              </Flex>
            </Flex>
            <Flex alignItems="items-start">
              <Button variant="outline" icon="pencil" onClick={onEditClick}>
                Edit
              </Button>
            </Flex>
          </Flex>
        </Card.Content>
      </Card>
    </Flex>
  );
};

export default AdvancedProfileUpdate;
