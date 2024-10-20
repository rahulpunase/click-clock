import { Flex } from "@/design-system/layout/Flex/Flex";
import { Text } from "@/design-system/ui/Text/Text";

import styles from "./Loader.module.scss";

type LoaderAnimationProps = {
  label?: string;
};
const LoaderAnimation = ({ label }: LoaderAnimationProps) => {
  return (
    <Flex className={styles.loader}>
      <Text as="span">{label ?? "Click up..."}</Text>
    </Flex>
  );
};

export default LoaderAnimation;
