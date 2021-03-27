import { useState } from 'react'

export function useForm<FormFileds extends { [key: string]: any }>(
  initialState: FormFileds,
  onSubmit: any
) {
  const [formData, setFormData] = useState<FormFileds>(initialState)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit()
  }

  function resetForm() {
    setFormData(initialState)
  }

  return {
    formData,
    setFormData,
    handleInputChange,
    handleTextAreaChange,
    handleSubmit,
    resetForm,
  }
}
