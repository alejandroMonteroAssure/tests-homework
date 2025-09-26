import { useEffect, useState } from "react";
import { getUserGreeting } from "./utils/greetings";

type Props = {
  userId: string;
  onGreet: (message: string) => void;
};

export default function UserGreeting({ userId, onGreet }: Props) {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const msg = getUserGreeting(data.name);
        setGreeting(msg);
        onGreet(msg);
      })
      .catch(() => {
        setError(true);
      });
  }, [userId, onGreet]);

  if (error) return <div role="alert">Failed to load greeting.</div>;
  if (!greeting) return <div>Loading...</div>;
  return <h1>{greeting}</h1>;
}