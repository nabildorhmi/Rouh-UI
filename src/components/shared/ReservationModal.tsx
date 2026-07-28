import { useState } from "react";
import type { ReservationFormData, ReservationMode } from "../../types";
import { Modal } from "../ui/Modal";
import { ReservationForm } from "./ReservationForm";
import { ConfirmationStep } from "./ConfirmationStep";

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

  const handleSubmit = (data: ReservationFormData) => {
    // TODO: replace with real submission (email service / backend API).
    console.info("Reservation submitted (placeholder handler):", { mode, selectedTierName, ...data });
    setSubmitted(data);
  };

  const handleClose = () => {
    onClose();
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
        <ReservationForm mode={mode} selectedTierName={selectedTierName} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
}
