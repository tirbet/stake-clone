"use client";

import { Plus, Trash } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { roleSchema, RoleSchema } from "@/schemas/role.schema";
import { Label } from "@/components/ui/label";
import { permissionResource, PermissionSchema, permissionAction } from "@/schemas/permission.schema";


type Props = {
  id?: string;
  defaultValues?: RoleSchema;
  onSubmit: (values: RoleSchema) => void;
  onDelete?: () => void;
  disabled: boolean;
};

export const RoleForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<RoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: defaultValues ?? {
      name: "",
      permissions: [],
    },
  });

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "permissions",
  });

  const handleSubmit = (values: RoleSchema) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-4">
        {/* Role Name */}
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="role-name">Role Name</FormLabel>
              <FormControl>
                <Input
                  id="role-name"
                  disabled={disabled}
                  placeholder="e.g. Player, Manager, Staff"
                  autoComplete="organization-title"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Permissions Array */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <FormLabel className="text-base font-medium" htmlFor="add-permission">
              Permissions
            </FormLabel>
            <Button
              id="add-permission"
              type="button"
              size="sm"
              variant="secondary"
              onClick={() =>
                append({ resource: "" as PermissionSchema['resource'], actions: [] })
              }
              disabled={disabled}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No permissions added yet. Click "Add Permission" to get started.
            </p>
          )}

          <div className="flex flex-col gap-4">
            {fields.map((fieldItem, index) => (
              <div
                key={fieldItem.id}
                className="rounded-xl border border-border/60 bg-muted/10 p-4 shadow-sm space-y-4 transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <FormLabel
                    className="font-semibold text-sm"
                    htmlFor={`permissions-${index}-resource`}
                  >
                    Resource
                  </FormLabel>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => remove(index)}
                    disabled={disabled}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <span className="sr-only">Remove permission</span>
                    <Trash className="size-4" />
                  </Button>
                </div>

                {/* Resource Select */}
                <FormField
                  control={control}
                  name={`permissions.${index}.resource`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          name={field.name}
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={disabled}
                        >
                          <SelectTrigger 
                            id={`permissions-${index}-resource`} 
                            name={field.name} 
                            className="w-full"
                          >
                            <SelectValue placeholder="Select resource" />
                          </SelectTrigger>
                          <SelectContent>
                            {permissionResource.options.map((resource) => (
                              <SelectItem key={resource} value={resource}>
                                {resource}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <FormField
                  control={control}
                  name={`permissions.${index}.actions`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Actions
                      </FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                        {permissionAction.options.map((action) => (
                          <Label
                            key={action}
                            htmlFor={`permissions-${index}-action-${action}`}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <Checkbox
                              id={`permissions-${index}-action-${action}`}
                              aria-label={action}
                              checked={field.value?.includes(action)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...(field.value ?? []), action]);
                                } else {
                                  field.onChange(
                                    field.value?.filter((a) => a !== action) ?? []
                                  );
                                }
                              }}
                              disabled={disabled}
                            />
                            <span className="capitalize">{action.toLowerCase()}</span>
                          </Label>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit + Delete */}
        <div className="space-y-2">
          <Button 
            className="w-full" 
            disabled={disabled} 
            type="submit"
          >
            {id ? "Save Changes" : "Create Role"}
          </Button>

          {!!id && (
            <Button
              type="button"
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
              onClick={onDelete}
              disabled={disabled}
            >
              <Trash className="size-4" />
              Delete Role
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};