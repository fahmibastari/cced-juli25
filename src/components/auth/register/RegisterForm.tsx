'use client'

import DetailCompanyForm from '../../../components/auth/register/DetailCompanyForm'
import MembershipForm from '../../../components/auth/register/MembershipForm'
import RegistrationFormCompany from '../../../components/auth/register/RegistrationFormCompany'
import RegistrationFormMember from '../../../components/auth/register/RegistrationFormMember'
import RoleSelection from '../../../components/auth/register/RoleSelection'
import register from '@/actions/register'
import { Role } from '@prisma/client'
import { signIn } from 'next-auth/react'
import React from 'react'

type MemberType =
  | 'ALUMNI_UNILA'
  | 'MAHASISWA_UNILA'
  | 'ALUMNI_NON_UNILA'
  | 'MAHASISWA_NON_UNILA'

// Base interface for common registration data
interface BaseRegistrationData {
  role: Role | null
  username: string
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

// Member-specific registration data
interface MemberRegistrationData extends BaseRegistrationData {
  memberType?: MemberType
  nim?: string
  phone?: string
}

// Company-specific registration data
interface CompanyRegistrationData extends BaseRegistrationData {
  logo?: File
  companyName?: string
  industry?: string
  ownership?: string
  phoneNumber?: string
  companyPhone?: string
  website?: string
  emailPublic?: string
  bio?: string
}

// Define steps as const to ensure type safety
const STEPS = {
  ROLE_SELECTION: 'ROLE_SELECTION',
  REGISTRATION_FORM_MEMBER: 'REGISTRATION_FORM_MEMBER',
  REGISTRATION_FORM_COMPANY: 'REGISTRATION_FORM_COMPANY',
  MEMBERSHIP_FORM_MEMBER: 'MEMBERSHIP_FORM_MEMBER',
  DETAIL_COMPANY_FORM: 'DETAIL_COMPANY_FORM',
} as const

type StepType = (typeof STEPS)[keyof typeof STEPS]

export default function Register() {
  const [currentStep, setCurrentStep] = React.useState<StepType>(
    STEPS.ROLE_SELECTION
  )

  const [registrationDataMember, setRegistrationDataMember] =
    React.useState<MemberRegistrationData>({
      role: null,
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

  const [registrationDataCompany, setRegistrationDataCompany] =
    React.useState<CompanyRegistrationData>({
      role: null,
      username: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

  const handleContinue = () => {
    switch (currentStep) {
      case STEPS.ROLE_SELECTION:
        if (registrationDataMember.role === Role.MEMBER) {
          setCurrentStep(STEPS.REGISTRATION_FORM_MEMBER)
        } else if (registrationDataCompany.role === Role.COMPANY) {
          setCurrentStep(STEPS.REGISTRATION_FORM_COMPANY)
        }
        break
      case STEPS.REGISTRATION_FORM_MEMBER:
        setCurrentStep(STEPS.MEMBERSHIP_FORM_MEMBER)
        break
      case STEPS.REGISTRATION_FORM_COMPANY:
        setCurrentStep(STEPS.DETAIL_COMPANY_FORM)
        break
    }
  }
  const handleBack = () => {
    switch (currentStep) {
      case STEPS.REGISTRATION_FORM_MEMBER:
      case STEPS.REGISTRATION_FORM_COMPANY:
        setCurrentStep(STEPS.ROLE_SELECTION)
        break
      case STEPS.MEMBERSHIP_FORM_MEMBER:
        setCurrentStep(STEPS.REGISTRATION_FORM_MEMBER)
        break
      case STEPS.DETAIL_COMPANY_FORM:
        setCurrentStep(STEPS.REGISTRATION_FORM_COMPANY)
        break
    }
  }

  const handleRoleSelection = (roleId: Role) => {
    // Reset both states when changing roles
    setRegistrationDataMember((prev) => ({
      ...prev,
      role: null,
    }))
    setRegistrationDataCompany((prev) => ({
      ...prev,
      role: null,
    }))

    // Then set the correct role
    if (roleId === Role.MEMBER) {
      setRegistrationDataMember((prev) => ({
        ...prev,
        role: roleId,
      }))
    } else {
      setRegistrationDataCompany((prev) => ({
        ...prev,
        role: roleId,
      }))
    }
  }

  const handleRegistrationFormMember = (formData: {
    username: string
    fullName: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    setRegistrationDataMember((prev) => ({
      ...prev,
      ...formData,
    }))
    handleContinue()
  }

  const handleRegistrationFormCompany = (formData: {
    username: string
    fullName: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    setRegistrationDataCompany((prev) => ({
      ...prev,
      ...formData,
    }))
    handleContinue()
  }

  const handleMemberShipForm = (memberData: {
    memberType: MemberType
    nim: string
    phone: string
  }) => {
    const finalData = {
      ...registrationDataMember,
      ...memberData,
    }
    handleFinalSubmit(finalData)
  }

  const handleDetailCompanyForm = (companyData: {
    logo: File | null
    companyName: string
    industry: string
    ownership: string
    phoneNumber: string
    companyPhone: string
    website: string
    emailPublic: string
    bio: string
  }) => {
    const finalData = {
      ...registrationDataCompany,
      ...companyData,
    }
    handleFinalSubmit(finalData)
  }

  const handleFinalSubmit = async (
    finalData: MemberRegistrationData | CompanyRegistrationData
  ) => {
    try {
      const formData = new FormData()
      ;(
        Object.keys(finalData) as Array<
          keyof (MemberRegistrationData | CompanyRegistrationData)
        >
      ).forEach((key) => {
        const value = finalData[key]
        if (value !== null && value !== undefined) {
          formData.append(key, value as string | Blob)
        }
      })

      const response = await register(formData)

      if (response.success) {
        await signIn('credentials', {
          email: finalData.email,
          password: finalData.password,
          role: finalData.role,
          redirectTo: `/dashboard`,
        })
      } else {
        // console.error(
        //   'Registration errors:',
        //   response.errors || response.message,
        // )
      }
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.ROLE_SELECTION:
        return (
          <RoleSelection
            onSelectRole={handleRoleSelection}
            onSubmit={handleContinue}
          />
        )
      case STEPS.REGISTRATION_FORM_MEMBER:
        return (
          <RegistrationFormMember
            onSubmit={handleRegistrationFormMember}
            onBack={handleBack}
          />
        )
      case STEPS.REGISTRATION_FORM_COMPANY:
        return (
          <RegistrationFormCompany
            onSubmit={handleRegistrationFormCompany}
            onBack={handleBack}
          />
        )
      case STEPS.MEMBERSHIP_FORM_MEMBER:
        return (
          <MembershipForm onSubmit={handleMemberShipForm} onBack={handleBack} />
        )
      case STEPS.DETAIL_COMPANY_FORM:
        return (
          <DetailCompanyForm
            onSubmit={handleDetailCompanyForm}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <div>{renderStep()}</div>
    </>
  )
}
