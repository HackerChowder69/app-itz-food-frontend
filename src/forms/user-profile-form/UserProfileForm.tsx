"use client";

import { useState } from "react";

import { z } from "zod";

import type { BackEndUser, UpdateUser } from "@/api/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";

const formSchema = z.object({
  address: z.string().trim().min(1, "La direccion es obligatoria."),
  city: z.string().trim().min(1, "La ciudad es obligatoria."),
  country: z.string().trim().min(1, "El pais es obligatorio."),
  email: z.string().email("Correo invalido.").optional(),
  name: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres."),
});

export type UserFormData = z.infer<typeof formSchema>;
type FormField = keyof UserFormData;
type FormErrors = Partial<Record<FormField, string>>;

type UserProfileFormProps = {
  currentUser?: BackEndUser;
  isLoading?: boolean;
  onSave: (userProfileData: UpdateUser) => Promise<unknown>;
  submitLabel?: string;
  loadingLabel?: string;
};

const getDefaultValues = (currentUser?: BackEndUser): UserFormData => ({
  address: currentUser?.address ?? "",
  city: currentUser?.city ?? "",
  country: currentUser?.country ?? "",
  email: currentUser?.email ?? "",
  name: currentUser?.name ?? "",
});

function UserProfileForm({
  currentUser,
  isLoading = false,
  loadingLabel = "Actualizando...",
  onSave,
  submitLabel = "Actualizar",
}: UserProfileFormProps) {
  const [formData, setFormData] = useState<UserFormData>(
    getDefaultValues(currentUser)
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: FormField, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const nextErrors: FormErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === "string" && !nextErrors[field as FormField]) {
          nextErrors[field as FormField] = issue.message;
        }
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({});

    await onSave({
      address: result.data.address,
      city: result.data.city,
      country: result.data.country,
      name: result.data.name,
    });
  };

  return (
    <form id="user-profile-form" onSubmit={handleSubmit} className="grid gap-6">
      <Card className="mx-auto max-w-[860px] overflow-hidden bg-slate-50">
        <CardHeader className="p-6 pb-3">
          <CardTitle className="text-base font-bold text-slate-950">
            Perfil del usuario
          </CardTitle>
          <CardDescription>
            Consulta y cambia la información de tu perfil aquí.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email" className="text-xs font-bold text-slate-900">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                disabled
                placeholder="Teclea tu email"
                value={formData.email ?? ""}
                onChange={(event) => handleChange("email", event.target.value)}
              />
              <FieldError>{errors.email}</FieldError>
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className="text-xs font-bold text-slate-900">
                Nombre
              </FieldLabel>
              <Input
                id="name"
                placeholder="Teclea tu nombre"
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
              <FieldError>{errors.name}</FieldError>
            </Field>
          </FieldGroup>

          <div className="grid gap-4 md:grid-cols-3">
            <FieldGroup className="flex-1">
              <Field className="flex-1">
                <FieldLabel htmlFor="address" className="text-xs font-bold text-slate-900">
                  Dirección
                </FieldLabel>
                <Input
                  id="address"
                  placeholder="Calle, numero y colonia"
                  value={formData.address}
                  onChange={(event) => handleChange("address", event.target.value)}
                />
                <FieldError>{errors.address}</FieldError>
              </Field>
            </FieldGroup>

            <FieldGroup className="flex-1">
              <Field className="flex-1">
                <FieldLabel htmlFor="city" className="text-xs font-bold text-slate-900">
                  Ciudad
                </FieldLabel>
                <Input
                  id="city"
                  placeholder="Ciudad o municipio"
                  value={formData.city}
                  onChange={(event) => handleChange("city", event.target.value)}
                />
                <FieldError>{errors.city}</FieldError>
              </Field>
            </FieldGroup>

            <FieldGroup className="flex-1">
              <Field className="flex-1">
                <FieldLabel htmlFor="country" className="text-xs font-bold text-slate-900">
                  País
                </FieldLabel>
                <Input
                  id="country"
                  placeholder="Pais"
                  value={formData.country}
                  onChange={(event) => handleChange("country", event.target.value)}
                />
                <FieldError>{errors.country}</FieldError>
              </Field>
            </FieldGroup>
          </div>
        </CardContent>

        <CardFooter className="justify-start px-6 pb-6">
          <Field>
            {isLoading ? (
              <LoadingButton label={loadingLabel} />
            ) : (
              <Button
                type="submit"
                className="h-9 rounded-md bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600"
              >
                {submitLabel}
              </Button>
            )}
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}

export default UserProfileForm;
