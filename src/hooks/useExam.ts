import { useContext } from 'react'
import { ExamContext } from '@/contexts/ExamContext'

export function useExam() {
  const ctx = useContext(ExamContext)
  if (!ctx) {
    throw new Error('useExam must be used within an ExamProvider')
  }
  return ctx
}
