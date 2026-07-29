import React, { createContext, useContext, useState, useEffect } from 'react';

interface MemberContextType {
  memberId: string | null;
  isVIPModalOpen: boolean;
  openVIPModal: () => void;
  closeVIPModal: () => void;
  loginMember: (id: string) => void;
  logoutMember: () => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
  const [memberId, setMemberId] = useState<string | null>(null);
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nextgen_member_id');
    if (saved) setMemberId(saved);
  }, []);

  const loginMember = (id: string) => {
    setMemberId(id);
    localStorage.setItem('nextgen_member_id', id);
    setIsVIPModalOpen(false);
  };

  const logoutMember = () => {
    setMemberId(null);
    localStorage.removeItem('nextgen_member_id');
  };

  return (
    <MemberContext.Provider
      value={{
        memberId,
        isVIPModalOpen,
        openVIPModal: () => setIsVIPModalOpen(true),
        closeVIPModal: () => setIsVIPModalOpen(false),
        loginMember,
        logoutMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}
