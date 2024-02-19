import "./globals.css";

export const metadata = {
  title: "DekHor Dorms",
  description: "Find Your Dorms in Your Way!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
