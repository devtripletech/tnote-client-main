"use client"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { FormControl } from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Client } from "@/lib/validations/client"
import { Check, ChevronsUpDown } from "lucide-react"
import { getClientsAction } from "@/actions/client"
import React from "react"
import { SelectData } from "@/types"
import { EmployeeHours } from "@/lib/validations/employee"

interface EmployeeHoursSelectProps {
  field: any
  form: any
  name: string
  data: EmployeeHours[]
}

export function EmployeeHoursSelect({
  field,
  form,
  name,
  data,
}: EmployeeHoursSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {data && field.value
              ? data.find((item: EmployeeHours) => {
                  return item.ID_horario === field.value
                })?.Nome
              : "Selecione o horário"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-white" side="bottom">
        <Command>
          <CommandInput
            className="focus:outline-none focus:border-transparent active:outline-none active:border-transparent"
            placeholder="Search framework..."
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {data &&
              data.map((item: EmployeeHours, i: any) => (
                <CommandItem
                  value={item.Nome}
                  key={`${item.ID_horario}`}
                  onSelect={() => {
                    form.setValue(name, item.ID_horario)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.ID_horario === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.Nome}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
