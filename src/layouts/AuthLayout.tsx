// khung giao dien chung cho cac trang pass
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header, sidebar... nếu muốn */}
      <header className="bg-gray-200 dark:bg-gray-800 p-4 shadow">
        <h1 className="text-xl font-bold">My App 🚀</h1>
      </header>
      {/* Nội dung chính */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
