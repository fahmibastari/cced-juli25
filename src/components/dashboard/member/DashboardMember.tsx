'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import JobCard from './JobCard'
import JobDetail from './JobDetail'
import React, { useState, useEffect } from 'react'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { applyJob } from '@/actions/member-action'
import { motion } from 'framer-motion'
import sektor from '@/data/industrySector'; // Import the list of industries
import { IndustryCombobox } from './IndustryCombobox' // Import komponen IndustryCombobox


interface Job {
  [x: string]: any
  status: string | null
  id: string
  companyLogoUrl?: string | undefined 
  companyName: string
  title: string
  location: string | null
  deadline: Date | string | null

  salary?: string
  type?: string | null
  company?: {
    logo?: { src: string }
    companyName?: string
    industry?: string
  } | null
  posterFile?: {
    name?: string
    src?: string 
} | null
}

interface DashboardMemberProps {
  jobs: Job[]
  user: User
}

export default function DashboardMember({ jobs, user }: DashboardMemberProps) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(Array.isArray(jobs) && jobs.length > 0 ? jobs[0].id : null)
  const [tab, setTab] = useState<'list' | 'detail'>('list')
  const [isDesktop, setIsDesktop] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'semua' | 'aktif' | 'nonaktif'>('semua')
  const [filterIndustry, setFilterIndustry] = useState<string>('Semua Bidang') // Industry filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const [tempFilterStatus, setTempFilterStatus] = useState<'semua' | 'aktif' | 'nonaktif'>('semua')
  const [tempFilterIndustry, setTempFilterIndustry] = useState<string>('Semua Bidang') // Temporary industry filter
  const [tempSearchTerm, setTempSearchTerm] = useState('')

  


  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSelectJob = (job: Job) => {
    setSelectedJobId(job.id)
    setTab('detail')
    router.push(`/dashboard?job=${job.id}`)
  }
  
  const searchParams = useSearchParams()
  useEffect(() => {
    const jobIdFromUrl = searchParams.get('job')
    const tabFromUrl = searchParams.get('tab')
    if (jobIdFromUrl && jobs.length > 0) {
      setSelectedJobId(jobIdFromUrl)
    }
    if (tabFromUrl === 'detail' || tabFromUrl === 'list') {
      setTab(tabFromUrl)
    }
  }, [searchParams, jobs])
  

  // Update status aktif → nonaktif jika deadline lewat
  const now = Date.now()

  const updatedJobs = Array.isArray(jobs)
  ? jobs.map((job) => {
    const deadlineTime =
    job.deadline
      ? typeof job.deadline === 'string'
        ? new Date(job.deadline).getTime()
        : job.deadline.getTime()
      : Infinity // fallback supaya tidak dianggap expired
  
      if (job.status === 'aktif' && deadlineTime && deadlineTime < now) {
        return { ...job, status: 'nonaktif' }
      }
      return job
    })
  : []
  const selectedJob = updatedJobs.find(j => j.id === selectedJobId) ?? null


  // Filtered jobs berdasarkan status dan search term
  const filteredJobs = updatedJobs.filter((job) => {
    const matchStatus =
      filterStatus === 'semua' ||
      (filterStatus === 'aktif' && job.status === 'aktif') ||
      (filterStatus === 'nonaktif' && job.status === 'nonaktif')
  
    const searchLower = searchTerm.toLowerCase()
  
    const matchSearch =
      !searchTerm ||
      job.title?.toLowerCase().includes(searchLower) ||
      job.companyName?.toLowerCase().includes(searchLower) ||
      job.company?.companyName?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower)
  
      const matchIndustry =
      filterIndustry === 'Semua Bidang' || job.company?.industry === filterIndustry // Filter by industry

    return matchStatus && matchSearch && matchIndustry
  })
  

  const handleQuickApply = async () => {
    if (!selectedJob?.id) {
      alert('Lowongan belum dipilih')
      return
    }
    if (!user?.id) {
      alert('User belum teridentifikasi')
      return
    }
    setIsApplying(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await applyJob(selectedJob.id, user.id, { resumeMember: '' })
      if (res.success) {
        setSuccess(res.success)
      } else {
        setError(res.error || 'Gagal mengirim lamaran')
      }
    } catch (e) {
      setError('Terjadi kesalahan saat mengirim lamaran')
    } finally {
      setIsApplying(false)
    }
  }

  
  const applyFilters = () => {
    setFilterStatus(tempFilterStatus)
    setSearchTerm(tempSearchTerm)
    setFilterIndustry(tempFilterIndustry)
  }
  

  return (
    <div className="container mx-auto max-w-7xl p-4">
      {/* Tabs untuk mobile */}
      {!isDesktop && (
        <div className="flex mb-4">
          <button
            onClick={() => {
              setTab('list')
              // Sync ke URL juga
              router.push(`/dashboard?job=${selectedJob?.id ?? ''}&tab=list`)
            }}
            className={`flex-1 py-2 text-center border-b-2 ${
              tab === 'list' ? 'border-green-600 text-green-600' : 'border-transparent'
            }`}
          >
            Daftar Lowongan
          </button>
          <button
            onClick={() => {
              setTab('detail')
              router.push(`/dashboard?job=${selectedJob?.id ?? ''}&tab=detail`)
            }}
            disabled={!selectedJob}
            className={`flex-1 py-2 text-center border-b-2 ${
              tab === 'detail' ? 'border-green-600 text-green-600' : 'border-transparent'
            } ${!selectedJob ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Detail Lowongan
          </button>
        </div>
      )}

{/* Filter Bar */}
<div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 px-4 py-6 bg-white rounded-lg shadow-md">
  {/* Status Buttons */}
  <div className="flex gap-4 flex-wrap">
    {['semua', 'aktif', 'nonaktif'].map((status) => (
      <button
        key={status}
        onClick={() => setTempFilterStatus(status as any)}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
          tempFilterStatus === status
            ? 'bg-green-600 text-white'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-green-600 hover:text-white'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </button>
    ))}
      <IndustryCombobox
            value={tempFilterIndustry}
            onChange={setTempFilterIndustry}
          />
  </div>


  {/* Search Input */}
  <div className="flex w-full md:w-auto max-w-lg items-center border rounded-full shadow-sm overflow-hidden">
    <input
      type="text"
      placeholder="Cari judul, perusahaan, atau lokasi..."
      value={tempSearchTerm}
      onChange={(e) => setTempSearchTerm(e.target.value)}
      className="flex-1 px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <button
      onClick={applyFilters}
      className="bg-green-600 text-white px-6 py-2 h-full rounded-r-full hover:bg-green-700 transition duration-300"
    >
      Cari
    </button>
  </div>
</div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        {(tab === 'list' || isDesktop) && (
          <ScrollArea className={`w-full rounded-md px-4 shadow-sm border pt-4 ${isDesktop ? 'h-[600px]' : 'h-auto max-h-[60vh]'}`}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} onClick={() => { handleSelectJob(job); if (!isDesktop) { setTab('detail'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}} className="cursor-pointer">
                    <JobCard
                      jobId={job.id}
                      userId={user.id}
                      companyLogo={job.companyLogoUrl}
                      companyName={job.company?.companyName ?? job.companyName ?? 'Nama Perusahaan'}
                      title={job.title}
                      location={job.location ?? ''}
                      deadline={job.deadline
                        ? typeof job.deadline === 'string'
                          ? new Date(job.deadline)
                          : job.deadline
                        : new Date()}

                      salary={job.salary}
                      onSelectJob={() => handleSelectJob(job)}
                      applyType={job.type?.trim() ? 'external' : 'internal'}
                      industry={job.company?.industry ?? 'Tidak Diketahui'}                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">Tidak ada lowongan yang cocok.</p>
              )}
            </motion.div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}


        {/* Job Detail */}
        {(tab === 'detail' || isDesktop) && (
          <ScrollArea className={`w-full rounded-md px-4 shadow-sm border ${isDesktop ? 'h-[600px]' : 'h-auto max-h-[60vh]'}`}>
            {selectedJob ? (
              <>

              <JobDetail
              detailData={{
                ...selectedJob,
                pposterFile: selectedJob.posterFile?.src
                ? { src: selectedJob.posterFile.src }
                : null,
                company: selectedJob.company
                  ? {
                      companyName: selectedJob.company.companyName ?? '',
                      industry: selectedJob.company.industry || 'Tidak Diketahui',
                      logo: selectedJob.company.logo
                        ? { src: selectedJob.company.logo.src }
                        : null,
                    }
                  : null,
              }}
              onClickQuickApply={handleQuickApply}
              userId={user.id}
            />
            </>
            ) : (
              <p className="text-center text-gray-500 py-12">Pilih lowongan untuk melihat detail.</p>
            )}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        )}
      </div>

      {/* Optional success/error messages */}
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  )
}
