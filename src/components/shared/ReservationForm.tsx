import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import type { ReservationFormData, ReservationMode } from "../../types";
import { Button } from "../ui/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ReservationFormProps {
  mode: ReservationMode;
  selectedTierName: string;
  onSubmit: (data: ReservationFormData) => void;
  submitting?: boolean;
  submitError?: string | null;
  setFieldErrors?: (handler: (errors: Record<string, string[]>) => void) => void;
}

const inputClass =
  "w-full rounded-lg border border-black/15 px-4 py-2.5 text-sm text-black placeholder:text-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange";
const labelClass = "text-sm font-bold text-black mb-1.5 block";
const errorClass = "text-xs text-orange mt-1";

export function ReservationForm({
  mode,
  selectedTierName,
  onSubmit,
  submitting = false,
  submitError = null,
  setFieldErrors,
}: ReservationFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ReservationFormData>();

  if (setFieldErrors) {
    setFieldErrors((apiErrors: Record<string, string[]>) => {
      Object.entries(apiErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          const targetField = field === "preferred_dates" ? "preferredDates" : field;
          setError(targetField as keyof ReservationFormData, {
            type: "server",
            message: messages[0],
          });
        }
      });
    });
  }

  const tierFieldLabel = mode === "agency" ? "Selected plan" : "Selected package";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
      aria-label={mode === "agency" ? "Agency reservation form" : "Podcast studio reservation form"}
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_website")}
        />
      </div>

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
              {errors.phone && (
                <p id="phone-error" className={errorClass}>
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>
                Company
              </label>
              <input id="company" type="text" className={inputClass} {...register("company")} />
              {errors.company && (
                <p id="company-error" className={errorClass}>
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>
              Tell us about your project
            </label>
            <textarea id="message" rows={4} className={inputClass} {...register("message")} />
            {errors.message && (
              <p id="message-error" className={errorClass}>
                {errors.message.message}
              </p>
            )}
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
            {errors.preferredDates && (
              <p id="preferredDates-error" className={errorClass}>
                {errors.preferredDates.message}
              </p>
            )}
          </div>
        </>
      )}

      {submitError && (
        <div className="rounded-lg border border-orange/20 bg-orange/5 p-4 text-xs text-orange">
          {submitError}
        </div>
      )}

      <Button type="submit" disabled={submitting} className="mt-2 w-full">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
