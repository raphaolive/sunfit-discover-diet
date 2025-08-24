import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData } from '@/types';

interface FormContextType {
  formData: Partial<UserData>;
  updateFormData: (data: Partial<UserData>) => void;
  resetFormData: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<UserData>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (data: Partial<UserData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetFormData = () => {
    setFormData({});
    setCurrentStep(1);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
