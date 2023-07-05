import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ValidationError } from "./ValidationError"

import styles from "./UserForm.module.scss"

export const UserForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      salary: 25000,
    },

    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    setFormSubmitted(true)
    reset()
    console.log(data)
    // navigate to different page
  }

  return (
    <section className={styles.formContainer}>
      <h2 className={styles.formTitle}>User Form</h2>
      <form className={styles.userForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formControl}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register("name")} />
          {errors.name && (
            <ValidationError>{errors.name.message}</ValidationError>
          )}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && (
            <ValidationError>{errors.email.message}</ValidationError>
          )}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="dob">Date of birth</label>
          <input
            id="dob"
            type="date"
            {...register("dob", { valueAsDate: true })}
          />
          {errors.dob && (
            <ValidationError>{errors.dob.message}</ValidationError>
          )}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="fav-color">Favorite Color</label>
          <input id="fav-color" type="text" {...register("favoriteColor")} />
          {errors.favoriteColor && (
            <ValidationError>{errors.favoriteColor.message}</ValidationError>
          )}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="salary">
            Salary <span>£{watch("salary")}</span>
          </label>
          <input
            id="salary"
            type="range"
            min="0"
            max="100000"
            step="100"
            {...register("salary", { valueAsNumber: true })}
          />
          {errors.salary && (
            <ValidationError>{errors.salary.message}</ValidationError>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      {formSubmitted && (
        <p role="status" aria-live="polite" className={styles.successMessage}>
          Form submitted successfully!
        </p>
      )}
    </section>
  )
}

////// IMPLEMENTATION //////

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z
    .date()
    .refine((date) => {
      const currentDate = new Date()
      const minDate = new Date()
      minDate.setFullYear(currentDate.getFullYear() - 120)
      return date >= minDate
    }, "Invalid date of birth! You're probably a ghost!")
    .refine((date) => {
      const currentDate = new Date()
      const maxDate = new Date()
      maxDate.setFullYear(currentDate.getFullYear() - 18)
      return date <= maxDate
    }, "You have to be minimum 18 years old!"),
  favoriteColor: z.string().nonempty({ message: "Favorite color is required" }),
  salary: z.number(),
})
