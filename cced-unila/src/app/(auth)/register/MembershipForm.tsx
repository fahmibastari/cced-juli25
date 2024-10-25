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
  | "MAHASISWA_NON_UNILA";

interface MembershipFormProps {
  onSubmit: (data: {
    memberType: MemberType;
    nim: string;
    phone: string;
  }) => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ onSubmit }) => {
  const [memberType, setMemberType] = useState<MemberType | null>(null);
  const [nim, setNim] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!memberType) {
      newErrors.memberType = "Please select a member type";
    }
    if (!nim.trim()) {
      newErrors.nim = "NIM/NPM is required";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,13}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number (10-13 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && memberType) {
      onSubmit({
        memberType,
        nim,
        phone,
      });
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="space-y-6 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Jenis Member</Label>
            {errors.memberType && (
              <p className="text-sm text-red-500">{errors.memberType}</p>
            )}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                { id: "ALUMNI_UNILA", label: "Alumni UNILA" },
                { id: "MAHASISWA_UNILA", label: "Mahasiswa UNILA" },
                { id: "ALUMNI_NON_UNILA", label: "Alumni Non UNILA" },
                { id: "MAHASISWA_NON_UNILA", label: "Mahasiswa Non UNILA" },
              ].map((type) => (
                <Button
                  key={type.id}
                  type="button"
                  onClick={() => setMemberType(type.id as MemberType)}
                  variant={memberType === type.id ? "default" : "secondary"}
                  className="h-auto whitespace-normal py-2 text-sm"
                >
                  {type.label.split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {i < type.label.split(" ").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nim">NIM / NPM</Label>
            {errors.nim && <p className="text-sm text-red-500">{errors.nim}</p>}
            <Input
              type="text"
              id="nim"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Masukkan NIM/NPM"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">No Telpon</Label>
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
            <Input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Masukkan no handphone aktif yang dapat di hubungi melalui WhatsApp"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MembershipForm;
