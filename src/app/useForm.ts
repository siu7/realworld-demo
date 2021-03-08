import { useState } from 'react'

export function useForm<FormFileds extends { [key: string]: any }>(
  initialState: FormFileds,
  onSubmit: any
) {
  const [formData, setFormData] = useState<FormFileds>(initialState)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await onSubmit()
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
  }
}
