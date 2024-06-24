import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ProfileCardProps = {
  name: string;
  username: string;
  phoneNumber: string;
};

export function ProfileCard(props: ProfileCardProps) {
  return (
    <Card className="font-mono shadow-none rounded-md">
      <CardHeader>
        <CardTitle>{props.name + "'s"} Profile</CardTitle>
        <CardDescription>Profile Details</CardDescription>
      </CardHeader>
      <CardContent className="font-mono">
        <p>
          <strong>Name:</strong> {props.name}
        </p>
        <p>
          <strong>Username:</strong> @{props.username}
        </p>
        <p>
          <strong>Phone Number:</strong> +{props.phoneNumber}
        </p>
      </CardContent>
    </Card>
  );
}
