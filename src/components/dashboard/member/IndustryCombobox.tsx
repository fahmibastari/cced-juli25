'use client'

import { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import industryOptions from '@/data/industrySector'

interface IndustryComboboxProps {
  value: string
  onChange: (value: string) => void
}

export function IndustryCombobox({ value, onChange }: IndustryComboboxProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Jika memilih "Lainnya", kirimkan nilai kosong untuk menandakan "semua industri"
    if (value === 'Lainnya') {
      onChange('Semua Bidang') // Gantie dengan 'semua' agar filter tidak terbatas
    }
  }, [value, onChange])

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : 'Pilih Bidang Industri'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-h-60 overflow-y-auto">
          <Command>
            <CommandInput placeholder="Cari bidang industri..." />
            <CommandEmpty>Industri tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {[...industryOptions, 'Lainnya'].map((industry) => (
                <CommandItem
                  key={industry}
                  value={industry}
                  onSelect={(currentValue) => {
                    if (currentValue === 'Lainnya') {
                      onChange('Semua Bidang') // Mengirimkan 'semua' untuk menampilkan semua industri
                    } else {
                      onChange(currentValue)
                    }
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === industry ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {industry}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
