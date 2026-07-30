import React, { createContext, useContext, useState, useEffect } from 'react';

interface MemberContextType {
  memberId: string | null;
  isVIPModalOpen: boolean;
  isAssessmentRunning: boolean;
  openVIPModal: () => void;
  closeVIPModal: () => void;
  startAssessment: () => void;
  stopAssessment: () => void;
  loginMember: (id: string, email: string, name: string) => void;
  logoutMember: () => void;
  memberEmail: string | null;
  memberName: string | null;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
  const [memberId, setMemberId] = useState<string | null>(null);
  const [memberEmail, setMemberEmail] = useState<string | null>(null);
  const [memberName, setMemberName] = useState<string | null>(null);
  const [isVIPModalOpen, setIsVIPModalOpen] = useState(false);
  const [isAssessmentRunning, setIsAssessmentRunning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nextgen_member_id');
    const savedEmail = localStorage.getItem('nextgen_member_email');
    const savedName = localStorage.getItem('nextgen_member_name');
    if (saved) setMemberId(saved);
    if (savedEmail) setMemberEmail(savedEmail);
    if (savedName) setMemberName(savedName);
  }, []);

  const loginMember = (id: string, email: string, name: string) => {
    setMemberId(id);
    setMemberEmail(email);
    setMemberName(name);
    localStorage.setItem('nextgen_member_id', id);
    localStorage.setItem('nextgen_member_email', email);
    localStorage.setItem('nextgen_member_name', name);
    setIsVIPModalOpen(false);
    setIsAssessmentRunning(true); // Automatically start assessment on login!
  };

  const logoutMember = () => {
    setMemberId(null);
    setMemberEmail(null);
    setMemberName(null);
    localStorage.removeItem('nextgen_member_id');
    localStorage.removeItem('nextgen_member_email');
    localStorage.removeItem('nextgen_member_name');
  };

  return (
    <MemberContext.Provider
      value={{
        memberId,
        memberEmail,
        memberName,
        isVIPModalOpen,
        isAssessmentRunning,
        openVIPModal: () => {
          if (memberId) {
            setIsAssessmentRunning(true);
          } else {
            setIsVIPModalOpen(true);
          }
        },
        closeVIPModal: () => setIsVIPModalOpen(false),
        startAssessment: () => setIsAssessmentRunning(true),
        stopAssessment: () => setIsAssessmentRunning(false),
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
