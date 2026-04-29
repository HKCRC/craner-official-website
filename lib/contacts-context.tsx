import React, { createContext, useContext } from "react";
import type { ContactInfo } from "@/lib/api/public-read";

const ContactsContext = createContext<ContactInfo[] | null>(null);

export function ContactsProvider({
  value,
  children,
}: {
  value: ContactInfo[] | null;
  children: React.ReactNode;
}) {
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}

/** SSR `contacts` from the page, or `homePageData.contacts` on the home page. */
export function useContacts(): ContactInfo[] | null {
  return useContext(ContactsContext);
}
