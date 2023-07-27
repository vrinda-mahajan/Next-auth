type profileParams = {
  id: string;
};

export default function UserProfile({ params }: { params: profileParams }) {
  return (
    <div>
      <h2>User Profile {params.id}</h2>
    </div>
  );
}
