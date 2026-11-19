import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const EnquiryContext = createContext(null);

const initialDraft = {
  name: '',
  arrival: '',
  departure: '',
  guests: '2',
  cabanas: '1',
  message: '',
};

/** Shares the enquiry draft between the quick planner bar and the contact form. */
export function EnquiryProvider({ children }) {
  const [draft, setDraft] = useState(initialDraft);
  const updateDraft = useCallback((patch) => setDraft((d) => ({ ...d, ...patch })), []);
  const value = useMemo(() => ({ draft, updateDraft }), [draft, updateDraft]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return ctx;
};
