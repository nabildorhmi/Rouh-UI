import { useState, useRef } from "react";
import type { ReservationFormData, ReservationMode } from "../../types";
import { Modal } from "../ui/Modal";
import { ReservationForm } from "./ReservationForm";
import { ConfirmationStep } from "./ConfirmationStep";
import { postJson, ApiValidationError, ApiRequestError } from "../../lib/apiClient";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  mode: ReservationMode;
  selectedTierName: string;
  calendlyUrl: string;
}

export function ReservationModal({
  open,
  onClose,
  mode,
  selectedTierName,
  calendlyUrl,
}: ReservationModalProps) {
  const [submitted, setSubmitted] = useState<ReservationFormData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const setFieldErrorsRef = useRef<((errors: Record<string, string[]>) => void) | null>(null);

  const handleSubmit = async (data: ReservationFormData) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { preferredDates, ...restData } = data;
      const payload: Record<string, unknown> = {
        mode,
        tier_name: selectedTierName,
        ...restData,
      };
      if (preferredDates !== undefined && preferredDates !== "") {
        payload.preferred_dates = preferredDates;
      }

      await postJson("/reservations", payload);
      setSubmitted(data);
    } catch (err) {
      if (err instanceof ApiValidationError) {
        setFieldErrorsRef.current?.(err.errors);
      } else if (err instanceof ApiRequestError && err.status === 429) {
        setSubmitError(
          "You've submitted this a few times already. Please wait a minute and try again."
        );
      } else {
        setSubmitError(
          "Something went wrong sending your message. Please check your connection and try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSubmitError(null);
    // Reset after the close transition would run in a fuller implementation;
    // kept simple here since there is no exit animation yet.
    setTimeout(() => setSubmitted(null), 300);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={submitted ? "You're all set" : `Reserve — ${selectedTierName}`}
    >
      {submitted ? (
        <ConfirmationStep name={submitted.name} calendlyUrl={calendlyUrl} />
      ) : (
        <ReservationForm
          mode={mode}
          selectedTierName={selectedTierName}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
          setFieldErrors={(handler) => {
            setFieldErrorsRef.current = handler;
          }}
        />
      )}
    </Modal>
  );
}
