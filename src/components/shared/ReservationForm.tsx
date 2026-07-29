import { useForm } from "react-hook-form";
import type { ReservationFormData, ReservationMode } from "../../types";
import { Button } from "../ui/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ReservationFormProps {
  mode: ReservationMode;
  selectedTierName: string;
  onSubmit: (data: ReservationFormData) => void;
}

const inputClass =
  "w-full rounded-lg border border-black/15 px-4 py-2.5 text-sm text-black placeholder:text-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange";
const labelClass = "text-sm font-bold text-black mb-1.5 block";
const errorClass = "text-xs text-orange mt-1";

export function ReservationForm({ mode, selectedTierName, onSubmit }: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormData>();

  const tierFieldLabel = mode === "agency" ? "Selected plan" : "Selected package";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
      aria-label={mode === "agency" ? "Agency reservation form" : "Podcast studio reservation form"}
    >
      <div>
        <span className={labelClass}>{tierFieldLabel}</span>
        <div className="rounded-lg bg-orange/5 border border-orange/20 px-4 py-2.5 text-sm font-bold text-orange">
          {selectedTierName}
        </div>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Full name
        </label>
        <input
          id="name"
          type="text"
          className={inputClass}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name", { required: "Please enter your name." })}
        />
        {errors.name && (
          <p id="name-error" className={errorClass}>
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          type="email"
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email", {
            required: "Please enter your email.",
            pattern: { value: EMAIL_PATTERN, message: "Please enter a valid email address." },
          })}
        />
        {errors.email && (
          <p id="email-error" className={errorClass}>
            {errors.email.message}
          </p>
        )}
      </div>

      {mode === "agency" ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input id="phone" type="tel" className={inputClass} {...register("phone")} />
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>
                Company
              </label>
              <input id="company" type="text" className={inputClass} {...register("company")} />
            </div>
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>
              Tell us about your project
            </label>
            <textarea id="message" rows={4} className={inputClass} {...register("message")} />
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="topic" className={labelClass}>
              About your session
            </label>
            <textarea
              id="topic"
              rows={3}
              className={inputClass}
              placeholder="Podcast name, episode topic, or a short description of what you're recording."
              aria-invalid={!!errors.topic}
              aria-describedby={errors.topic ? "topic-error" : undefined}
              {...register("topic", { required: "Please tell us a bit about your session." })}
            />
            {errors.topic && (
              <p id="topic-error" className={errorClass}>
                {errors.topic.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="preferredDates" className={labelClass}>
              Preferred dates
            </label>
            <input
              id="preferredDates"
              type="text"
              placeholder="e.g. any weekday in August"
              className={inputClass}
              {...register("preferredDates")}
            />
          </div>
        </>
      )}

      <Button type="submit" className="mt-2 w-full">
        Submit
      </Button>
    </form>
  );
}
