import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import React from "react";

interface TidingCardProps {
  projectNumber: string;
  title: string;
  description: string;
  imageUrl: string;
  avatars: string[];
}

const TidingCard: React.FC<TidingCardProps> = ({
  projectNumber,
  title,
  description,
  imageUrl,
  avatars,
}) => {
  return (
    <Card className="w-full max-w-sm">
      <img
        src={imageUrl}
        alt={title}
        width={400}
        height={200}
        className="rounded-t-lg"
      />
      <CardContent>
        <div className="text-sm text-muted-foreground">{projectNumber}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="outline" className="mt-4">
          View Project
        </Button>
        <div className="flex mt-4 space-x-2">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="User avatar"
              width={24}
              height={24}
              className="rounded-full"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TidingCard;
