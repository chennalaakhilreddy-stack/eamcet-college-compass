import React, { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronDown, Search, Check } from 'lucide-react'
import clsx from 'clsx'

export interface Option {
  value: string
  label: string
}

interface SearchableDropdownProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  className = '',
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options
    const lowerSearch = searchTerm.toLowerCase()
    return options.filter((opt) => opt.label.toLowerCase().includes(lowerSearch))
  }, [options, searchTerm])

  const selectedOption = options.find((opt) => opt.value === value)

  const handleSelect = (val: string) => {
    onChange(val)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className={clsx('relative', className)} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          'w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200',
          'bg-white/[0.04] border border-white/[0.08] text-white/90 text-sm font-medium',
          'hover:bg-white/[0.06] hover:border-white/[0.12]',
          isOpen && 'ring-2 ring-brand-500/20 border-brand-500/30 bg-white/[0.06]'
        )}
      >
        <span className={clsx('truncate', !selectedOption && 'text-white/40')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            'w-4 h-4 text-white/50 transition-transform duration-200 flex-shrink-0 ml-2',
            isOpen && 'rotate-180 text-brand-400'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 rounded-xl bg-dark-900 border border-white/[0.08] shadow-2xl shadow-black overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search Input */}
          <div className="p-2 border-b border-white/[0.06] bg-dark-950/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full bg-white/[0.04] border border-transparent rounded-lg py-1.5 pl-8 pr-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.06] transition-colors"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5 scroll-smooth">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-white/40">No results found</div>
            ) : (
              <div className="space-y-0.5">
                {filteredOptions.map((opt) => {
                  const isSelected = opt.value === value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={clsx(
                        'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left',
                        isSelected
                          ? 'bg-brand-500/10 text-brand-400 font-semibold'
                          : 'text-white/80 hover:bg-brand-500/80 hover:text-white'
                      )}
                    >
                      <span className="truncate pr-4">{opt.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-brand-400 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
