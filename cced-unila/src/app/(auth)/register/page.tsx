"use client";

import React from "react";
import RoleSelection from "./RoleSelection";
import RegistrationFormMember from "./RegistrationFormMember";
import MembershipForm from "./MembershipForm";
import { Button } from "@/components/ui/button";

type MemberType =
  | "ALUMNI_UNILA"
  | "MAHASISWA_UNILA"
  | "ALUMNI_NON_UNILA"
  | "MAHASISWA_NON_UNILA";

interface RegistrationData {
  role: string | null;
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  memberType?: MemberType;
  nim?: string;
  phone?: string;
}

const STEPS = {
  ROLE_SELECTION: "ROLE_SELECTION",
  REGISTRATION_FORM_MEMBER: "REGISTRATION_FORM_MEMBER",
  MEMBERSHIP_FORM_MEMBER: "MEMBERSHIP_FORM_MEMBER",
};

type StepType = (typeof STEPS)[keyof typeof STEPS];

export default function Register() {
  // const [currentStep, setCurrentStep] = React.useState<StepType>(STEPS.ROLE_SELECTION);
  const [currentStep, setCurrentStep] = React.useState<StepType>(
    STEPS.ROLE_SELECTION,
  );
  const [registrationData, setRegistrationData] =
    React.useState<RegistrationData>({
      role: null,
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleContinue = () => {
    if (currentStep === STEPS.ROLE_SELECTION) {
      setCurrentStep(STEPS.REGISTRATION_FORM_MEMBER);
    } else if (currentStep === STEPS.REGISTRATION_FORM_MEMBER) {
      setCurrentStep(STEPS.MEMBERSHIP_FORM_MEMBER);
    }
  };

  const handleBack = () => {
    if (currentStep === STEPS.REGISTRATION_FORM_MEMBER) {
      setCurrentStep(STEPS.ROLE_SELECTION);
    } else if (currentStep === STEPS.MEMBERSHIP_FORM_MEMBER) {
      setCurrentStep(STEPS.REGISTRATION_FORM_MEMBER);
    }
  };

  const handleRoleSelection = (roleId: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      role: roleId,
    }));
  };

  const handleRegistrationFormMember = (formData: {
    username: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const updatedData = {
      ...registrationData,
      ...formData,
    };

    setRegistrationData(updatedData);

    if (updatedData.role === "member") {
      handleContinue();
    } else {
      handleFinalSubmit(updatedData);
    }
  };

  const handleMemberShipForm = (memberData: {
    memberType: MemberType;
    nim: string;
    phone: string;
  }) => {
    const finalData = {
      ...registrationData,
      ...memberData,
    };
    handleFinalSubmit(finalData);
  };

  const handleFinalSubmit = async (finalData: RegistrationData) => {
    try {
      console.log("Complete registration data:", finalData);
      // Add your API call here
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(finalData),
      // });
      // Handle response
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.ROLE_SELECTION:
        return (
          <RoleSelection
            onSelectRole={handleRoleSelection}
            onContinue={handleContinue}
          />
        );
      case STEPS.REGISTRATION_FORM_MEMBER:
        return (
          <RegistrationFormMember
            selectedRole={registrationData.role as "member" | "perusahaan"}
            onSubmit={handleRegistrationFormMember}
            onBack={handleBack}
          />
        );
      case STEPS.MEMBERSHIP_FORM_MEMBER:
        return (
          <div className="w-full max-w-xl mx-auto mt-24">
            <MembershipForm onSubmit={handleMemberShipForm} />
            <div className="flex justify-between mt-4">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>{renderStep()}</div>
    </>
  );
}
