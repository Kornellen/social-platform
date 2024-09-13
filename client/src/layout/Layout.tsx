import NavBar from "../components/NavBar/NavBar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />
      {children}
    </div>
  );
}
