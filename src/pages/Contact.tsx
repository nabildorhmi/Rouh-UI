import { useState } from "react";
import { useForm } from "react-hook-form";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button, LinkButton } from "../components/ui/Button";
import { CALENDLY_LINKS } from "../data/config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const inputClass =
  "w-full rounded-lg border border-black/15 px-4 py-2.5 text-sm text-black placeholder:text-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange";
const labelClass = "text-sm font-bold text-black mb-1.5 block";
const errorClass = "text-xs text-orange mt-1";

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // TODO: replace with real submission (email service / backend API).
    console.info("Contact form submitted (placeholder handler):", data);
    setSent(true);
  };

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-6 sm:p-8 mb-12">
        <p className="font-bold text-black">Already know what you need?</p>
        <p className="mt-1 text-sm text-black/60">
          Skip the form and grab a time straight from our calendar.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <LinkButton
            href={CALENDLY_LINKS.agency}
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            Book Agency call
          </LinkButton>
          <LinkButton
            href={CALENDLY_LINKS.podcast}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="flex-1"
          >
            Book Podcast session
          </LinkButton>
        </div>
      </div>

      <SectionHeading
        eyebrow="Get in touch"
        title="Have a question that doesn't fit a plan or a slot?"
        description="Send us a note and we'll get back to you."
      />

      {sent ? (
        <div className="mt-10 rounded-2xl border border-orange/20 bg-orange/5 p-8 text-center">
          <p className="font-bold text-black">Thanks for reaching out.</p>
          <p className="text-sm text-black/60 mt-1">We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 flex flex-col gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
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

          <div>
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className={inputClass}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message", { required: "Please enter a message." })}
            />
            {errors.message && (
              <p id="message-error" className={errorClass}>
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" className="mt-2 w-full sm:w-auto">
            Send message
          </Button>
        </form>
      )}
    </section>
  );
}
