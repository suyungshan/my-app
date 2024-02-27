import "@/styles/globals.css";
import StoreProvider from "@/store/StoreProvider";

export const metadata = {
  title: "Challenge Your Speed",
  description: "Try To Click The Drum As You Can",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="home">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
