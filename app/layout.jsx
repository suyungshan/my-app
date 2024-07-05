import "@/styles/globals.css";
import StoreProvider from "@/store/StoreProvider";
import SocketProvider from "@/components/fetcher/Socket";

export const metadata = {
  title: "Challenge Your Speed",
  description: "Try To Click The Drum As You Can",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <SocketProvider>
          <body className="flex items-center justify-center ">{children}</body>
        </SocketProvider>
      </StoreProvider>
    </html>
  );
}
