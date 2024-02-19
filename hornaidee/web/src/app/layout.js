import "./globals.css";
import NavBar from "./navbar";

export const metadata = {
  title: "DekHor Dorms",
  description: "Find Your Dorms in Your Way!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {<NavBar />}
        {children}
      </body>
    </html>
  );
}
