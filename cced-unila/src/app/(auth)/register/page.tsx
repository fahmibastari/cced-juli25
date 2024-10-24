"use client";

import React from "react";
import RoleSelection from "./RoleSelection";
import Form1 from "./form1";
import MembershipForm from "./form2";
import { Button } from "@/components/ui/button";

interface RegistrationData {
  role: string | null;
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  memberType?: string;
  nim?: string;
  phone?: string;
}

export default function Register() {
  // State untuk mengatur step registrasi (1: Role, 2: Form, 3: MemberType)
  const [step, setStep] = React.useState(1);

  // State untuk menyimpan data registrasi
  const [registrationData, setRegistrationData] =
    React.useState<RegistrationData>({
      role: null,
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  // Handler untuk pemilihan role
  const handleRoleSelect = (roleId: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      role: roleId,
    }));
  };

  // Handler untuk melanjutkan ke step berikutnya
  const handleContinue = () => {
    setStep((prev) => prev + 1);
  };

  // Handler untuk kembali ke step sebelumnya
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // Handler untuk submit form registrasi
  const handleFormSubmit = (formData: {
    username: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setRegistrationData((prev) => ({
      ...prev,
      ...formData,
    }));

    if (registrationData.role === "member") {
      handleContinue(); // Lanjut ke member type form
    } else {
      // Submit langsung untuk perusahaan
      handleFinalSubmit({
        ...registrationData,
        ...formData,
      });
    }
  };

  // Handler untuk submit data member
  const handleMemberSubmit = (memberData: {
    memberType: string;
    nim: string;
    phone: string;
  }) => {
    const finalData = {
      ...registrationData,
      ...memberData,
    };
    handleFinalSubmit(finalData);
  };

  // Handler untuk final submit
  const handleFinalSubmit = (finalData: RegistrationData) => {
    console.log("Complete registration data:", finalData);
    // Di sini Anda bisa menambahkan logika untuk mengirim data ke API
  };

  // Render step yang sesuai
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <RoleSelection
            onSelectRole={handleRoleSelect}
            onContinue={handleContinue}
          />
        );
      case 2:
        return (
          <Form1
            selectedRole={registrationData.role as "member" | "perusahaan"}
            onSubmit={handleFormSubmit}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <div className="w-full max-w-xl mx-auto">
            <MembershipForm onSubmit={handleMemberSubmit} />
            <div className="flex justify-between mt-4">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button
                onClick={() =>
                  handleMemberSubmit({
                    memberType: registrationData.memberType || "",
                    nim: registrationData.nim || "",
                    phone: registrationData.phone || "",
                  })
                }
              >
                Submit
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
}
