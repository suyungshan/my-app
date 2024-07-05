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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <StoreProvider>
        <SocketProvider>
          <body className="flex items-center justify-center ">{children}</body>
        </SocketProvider>
      </StoreProvider>
    </html>
  );
}
