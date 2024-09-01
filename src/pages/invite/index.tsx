import { useGetSelectedOrganization } from "@/common/hooks/useGetSelectedOrganization";
import { Flex } from "@/design-system/layout/Flex/Flex";
import { Button } from "@/design-system/ui/Button/Button";
import { Card } from "@/design-system/ui/Card/Card";
import { useMutation, useQuery } from "convex/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Text } from "@/design-system/ui/Text/Text";
import AppLoader from "@/common/components/AppLoader";

const WrappedComponent = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const selectedOrganization = useGetSelectedOrganization();

  const orgId = searchParams.get("orgId") as Id<"organizations"> | null;
  const cipher = searchParams.get("cipher");

  const getOrganizationOfInvitation = useQuery(api.organizations.getById, {
    orgId,
    cipher,
  });

  const alreadySentRequest = useQuery(api.requests.alreadySentRequest, {
    orgId,
  });

  console.log({ alreadySentRequest });

  const sendRequest = useMutation(api.requests.sendRequest);

  // TODO: change this logic
  const isAlreadyAMember = selectedOrganization?._id === orgId;

  if (getOrganizationOfInvitation === undefined) {
    return <AppLoader />;
  }

  const sendRequestHandler = async () => {
    if (!cipher || !orgId) {
      return;
    }
    await sendRequest({
      cipher,
      requestType: "organizations",
      typeId: orgId,
    });
  };

  if (!getOrganizationOfInvitation) {
    return (
      <Card className="max-w-[400px]">
        <Card.Header>
          <Card.Header.Title>
            No such organization found. Or your invite link has been expired
          </Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Text variant="body-1" className="mb-4">
            Please ask the admin to send back the invite link.
          </Text>
          <Button variant="destructive" onClick={() => navigate("/")}>
            Go back to home page
          </Button>
        </Card.Content>
      </Card>
    );
  }

  if (alreadySentRequest) {
    return (
      <Card className="max-w-[400px]">
        <Card.Header>
          <Card.Header.Title>
            Your request has already been sent.
          </Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Text variant="body-1" className="mb-4">
            Please wait till your request has been updated.
          </Text>
          <Button variant="destructive" onClick={() => navigate("/")}>
            Go back to home page
          </Button>
        </Card.Content>
      </Card>
    );
  }

  if (isAlreadyAMember) {
    return (
      <Card className="max-w-[400px]">
        <Card.Header>
          <Card.Header.Title>
            You are already a member of this organization
          </Card.Header.Title>
          <Card.Header.Subtext>
            Cannot get added again to same organization
          </Card.Header.Subtext>
        </Card.Header>
        <Card.Content>
          <Button variant="destructive" onClick={() => navigate("/")}>
            Go back to home page
          </Button>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card className="max-w-[400px]">
      <Card.Header>
        <Card.Header.Title>
          💐 Hurray! You can send request to join
        </Card.Header.Title>
        <Card.Header.Subtext>
          You will be added as the member of organization once request gets
          accepted.
        </Card.Header.Subtext>
      </Card.Header>
      <Card.Content>
        <Flex alignItems="items-center" className="mb-4">
          <Text as="span" className="mr-1">
            Send request to join
          </Text>
          <Text as="span" variant="heading-1">
            {getOrganizationOfInvitation?.name ?? ""}
          </Text>
        </Flex>
        <Button variant="destructive" onClick={sendRequestHandler}>
          Send request
        </Button>
      </Card.Content>
    </Card>
  );
};

const InvitePage = () => {
  return (
    <Flex
      justifyContent="justify-center"
      alignItems="items-center"
      className="h-full"
    >
      <WrappedComponent />
    </Flex>
  );
};

export default InvitePage;
