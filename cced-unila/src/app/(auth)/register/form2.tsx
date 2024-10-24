"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type MemberType =
  | "ALUMNI_UNILA"
  | "MAHASISWA_UNILA"
  | "ALUMNI_NON_UNILA"
  | "MAHASISWA_NON_UNILA"
  | undefined;

interface MembershipFormProps {
  onSubmit: (data: { memberType: string; nim: string; phone: string }) => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ onSubmit }) => {
  const [jenisMember, setJenisMember] = useState<MemberType>(undefined);
  const [nim, setNim] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = (type: MemberType) => {
    setJenisMember(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jenisMember) {
      onSubmit({
        memberType: jenisMember,
        nim,
        phone,
      });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="space-y-6 pt-6">
        {/* Member Type Selection */}
        <div className="space-y-2">
          <Label>Jenis Member</Label>
          <div className="grid grid-cols-4 gap-2">
            <Button
              type="button"
              onClick={() => handleClick("ALUMNI_UNILA")}
              variant={jenisMember === "ALUMNI_UNILA" ? "default" : "secondary"}
              className="h-auto whitespace-normal py-2 text-sm"
            >
              Alumni
              <br />
              UNILA
            </Button>
            <Button
              type="button"
              onClick={() => handleClick("MAHASISWA_UNILA")}
              variant={
                jenisMember === "MAHASISWA_UNILA" ? "default" : "secondary"
              }
              className="h-auto whitespace-normal py-2 text-sm"
            >
              Mahasiswa
              <br />
              UNILA
            </Button>
            <Button
              type="button"
              onClick={() => handleClick("ALUMNI_NON_UNILA")}
              variant={
                jenisMember === "ALUMNI_NON_UNILA" ? "default" : "secondary"
              }
              className="h-auto whitespace-normal py-2 text-sm"
            >
              Alumni
              <br />
              Non UNILA
            </Button>
            <Button
              type="button"
              onClick={() => handleClick("MAHASISWA_NON_UNILA")}
              variant={
                jenisMember === "MAHASISWA_NON_UNILA" ? "default" : "secondary"
              }
              className="h-auto whitespace-normal py-2 text-sm"
            >
              Mahasiswa
              <br />
              Non UNILA
            </Button>
          </div>
        </div>

        {/* Full Name Input */}
        <div className="space-y-2">
          <Label htmlFor="nim">NIM / NPM</Label>
          <Input
            type="text"
            id="nim"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Masukkan NIM/NPM"
          />
        </div>

        {/* Phone Number Input */}
        <div className="space-y-2">
          <Label htmlFor="phone">No Telpon</Label>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Masukkan no handphone aktif yang dapat di hubungi melalui WhatsApp"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipForm;
