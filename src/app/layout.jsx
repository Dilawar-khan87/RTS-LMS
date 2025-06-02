import React from "react";
import "./globals.css";
import Navbar from "../components/NavBar";

export const metadata = {
  title: "MyApp",
  description: "A Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-papbJj6jnz6e+5MWkpG9QR6pPrXgPCfDWXabvjL5bfJ3LqMfEbzVIkZjZHpNc1YfPlFy0sEHPfqfXnP6YzT9mg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
