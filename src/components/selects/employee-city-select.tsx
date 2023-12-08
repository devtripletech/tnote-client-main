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
import { EmployeeCity, EmployeeHours } from "@/lib/validations/employee"

interface EmployeeCitySelectProps {
  field: any
  form: any
  name: string
  data: EmployeeCity[]
}

export function EmployeeCitySelect({
  field,
  form,
  name,
  data,
}: EmployeeCitySelectProps) {
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
              ? data.find((item: EmployeeCity) => {
                  return item.Codigo_Cidade === field.value
                })?.Cidade
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
              data.map((item: EmployeeCity, i: any) => (
                <CommandItem
                  value={item.Cidade}
                  key={`${item.Codigo_Cidade}`}
                  onSelect={() => {
                    form.setValue(name, item.Codigo_Cidade)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.Codigo_Cidade === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.Cidade}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
