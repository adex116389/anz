import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Spinner } from "./Spinner";

interface WrapperProps {
  children?: React.ReactNode;
  loading?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, loading }) => {
  return (
    <div id="root" className="pageContainer">
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              WebkitBoxPack: "center",
              justifyContent: "center",
              flex: "1 0 auto",
            }}
          >
            {children}
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
};
