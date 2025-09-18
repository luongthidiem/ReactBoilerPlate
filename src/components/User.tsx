import { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return <h2>User: {user.name}</h2>;
}
