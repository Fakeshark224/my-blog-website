import Navbar from '../components/Navbar'; // Naya component import karo
import './globals.css'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Bas yahan import karke use karo */}
        <main>{children}</main>
      </body>
    </html>
  );
}