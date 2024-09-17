import publicApiClient from "@/api-clients/public-api-client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const useSubscribeToNewsletter = ({
  mutationOptions,
}: {
  mutationOptions?: UseMutationOptions<
    AxiosResponse<any, any>,
    Error,
    {
      email: string;
    },
    unknown
  >;
} = {}) => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const subscribeToNewsletterMutation = useMutation({
    ...mutationOptions,
    mutationKey: ["email-subscription"],
    mutationFn: ({ email }: { email: string }) =>
      publicApiClient.post("/email/subscription", {
        email,
      }),
    onSuccess(data, variables, context) {
      toast.success(data.data.message || "Abonnement succesvol aangemaakt!");
      setEmail("");
      mutationOptions?.onSuccess &&
        mutationOptions?.onSuccess(data, variables, context);
    },
    onError(error, variables, context) {
      mutationOptions?.onError &&
        mutationOptions?.onError(error, variables, context);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Er is een fout opgetreden. Probeer het opnieuw.",
        );
      } else {
        toast.error(
          "Er is een onverwachte fout opgetreden. Probeer het opnieuw.",
        );
      }
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    setValidationError(null);

    if (!z.string().email().safeParse(email).success) {
      setValidationError("Ongeldig e-mailadres");
      return;
    }

    subscribeToNewsletterMutation.mutate({ email });
  };

  return {
    email,
    handleEmailChange,
    handleFormSubmit,
    subscribeToNewsletterMutation,
    validationError,
  };
};

export default useSubscribeToNewsletter;
