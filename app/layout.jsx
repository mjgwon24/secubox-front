import "./globals.css";
import { LeftSidebar } from "@/app/components/sidebar/LeftSidebar";
import { RightSidebar } from "@/app/components/sidebar/RightSidebar";
import { Header } from "@/app/components/header/Header";
import { LogBar } from "@/app/components/log/LogBar";
import { DndContext } from "@/app/dndContext";
import { ModalProvider } from "@/app/ModalContext";
import { AttackProvider } from "@/app/AttackContext";
import LogContext from "./LogContext";

export const metadata = {
  title: "SecuBox",
  description: "A cyber security simulation tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AttackProvider>
          <LogContext>
            <ModalProvider>
              <DndContext>
                <div className="flex flex-col w-screen h-full min-h-screen">
                  <Header />
                  <div className="flex flex-row justify-between content-height">
                    <LeftSidebar />
                    <div className="flex flex-col justify-between w-full">
                      {children}
                      <LogBar />
                    </div>
                    <RightSidebar />
                  </div>
                </div>
              </DndContext>
            </ModalProvider>
          </LogContext>
        </AttackProvider>
      </body>
    </html>
  );
}
