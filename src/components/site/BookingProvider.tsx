import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { BookingDialog } from "./BookingDialog";
import { PartnerDialog } from "./PartnerDialog";

type Ctx = {
  openBooking: () => void;
  openPartner: () => void;
};
const BookingCtx = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState(false);
  const [partner, setPartner] = useState(false);
  const openBooking = useCallback(() => setBooking(true), []);
  const openPartner = useCallback(() => setPartner(true), []);
  return (
    <BookingCtx.Provider value={{ openBooking, openPartner }}>
      {children}
      <BookingDialog open={booking} onOpenChange={setBooking} />
      <PartnerDialog open={partner} onOpenChange={setPartner} />
    </BookingCtx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) return { openBooking: () => {}, openPartner: () => {} };
  return ctx;
}
