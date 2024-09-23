export default function DashboardLayout({
  children,
  user,
  analytics,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div className="flex justify-around">
      <div>{children}</div>
      <div>{user}</div>
      <div>{analytics}</div>
    </div>
  );
}
