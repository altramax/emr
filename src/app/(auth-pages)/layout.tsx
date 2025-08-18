export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dn9dkcxvs/image/upload/v1734379774/freepik__upload__86387_usfbsr.jpg')`,
      }}
    >
      {children}
    </main>
  );
}
