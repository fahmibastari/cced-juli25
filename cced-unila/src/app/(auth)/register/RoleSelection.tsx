"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserIcon, BriefcaseIcon } from "lucide-react";
import Link from "next/link";

interface RoleOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface RoleSelectionProps {
  onSelectRole: (roleId: string) => void;
  onContinue: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  onSelectRole,
  onContinue,
}) => {
  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);

  const roles: RoleOption[] = [
    {
      id: "member",
      title: "Member",
      icon: <UserIcon className="h-12 w-12" />,
      description: "Akun personal biasa",
    },
    {
      id: "perusahaan",
      title: "Perusahaan",
      icon: <BriefcaseIcon className="h-12 w-12" />,
      description: "Akun business/perusahaan",
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    onSelectRole(roleId);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Daftar Akun</h1>
              <p className="text-sm text-gray-500 mt-1">
                Pilih jenis akun yang kamu buat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`relative p-6 rounded-lg border-2 transition-all duration-200 hover:border-primary ${
                    selectedRole === role.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`p-3 rounded-full ${
                        selectedRole === role.id
                          ? "text-primary"
                          : "text-gray-400"
                      }`}
                    >
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{role.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <p className="text-sm text-gray-500">
                Sudah punya akun?{" "}
                {/* <Button variant="link" className="p-0">
                  Login akun kamu
                </Button> */}
                <Link
                  href={"/login"}
                  className={`${buttonVariants({ variant: "link" })} ml-0 pl-0`}
                >
                  Login akun kamu
                </Link>
              </p>
              <Button
                onClick={onContinue}
                disabled={!selectedRole}
                className="px-8"
              >
                Lanjut
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelection;
