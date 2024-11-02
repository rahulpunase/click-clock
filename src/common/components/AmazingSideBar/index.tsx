import {
  ChartArea,
  Headset,
  MapPin,
  MessageCircleHeart,
  Send,
  Twitter,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { Flex } from "@/design-system/layout/Flex/Flex";
import Icon, { IconName } from "@/design-system/ui/Icon/Icon";
import { Text } from "@/design-system/ui/Text/Text";

const LinkItems = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: IconName;
  label: string;
}) => (
  <Link to={to}>
    <Flex alignItems="items-center" gap="gap-2">
      <Icon className="size-4" IconName={icon} />
      <Text variant="body-1">{label}</Text>
    </Flex>
  </Link>
);

const AmazingSideBar = () => {
  return (
    <Flex className="h-full w-[320px] py-2">
      <Flex
        className="bg-background-card rounded-md h-full w-full p-3"
        direction="flex-col"
      >
        <Text variant="heading-2">Click up</Text>
        <Flex className="mt-8" direction="flex-col">
          <Text variant="heading-1">Chat with us</Text>
          <Text variant="subtext">
            Speak to our friendly team via live chat
          </Text>
          <Flex direction="flex-col" className="py-4" gap="gap-2">
            <LinkItems
              to="/"
              icon={MessageCircleHeart}
              label="Start a live chat"
            />
            <LinkItems to="/" icon={Send} label="Shoot us a mail" />
            <LinkItems to="/" icon={Twitter} label="Message us on Twitter" />
          </Flex>
        </Flex>
        <Flex className="mt-8" direction="flex-col">
          <Text variant="heading-1">Call us</Text>
          <Text variant="subtext">
            Call our team Monday to Friday from 8am to 5pm
          </Text>
          <Flex direction="flex-col" className="py-4" gap="gap-2">
            <LinkItems to="/" icon={Headset} label="+1 (555) 000-0000" />
          </Flex>
        </Flex>
        <Flex className="mt-12" direction="flex-col">
          <Text variant="heading-1">Visit us</Text>
          <Text variant="subtext">
            Let's meet in person in our Mumbai offices
          </Text>
          <Flex direction="flex-col" className="py-4" gap="gap-2">
            <LinkItems to="/" icon={MapPin} label="154, Mallad, Mumbai - MH" />
            <LinkItems
              to="/"
              icon={MapPin}
              label="233, Andheri East, Mumbai - MH"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AmazingSideBar;
