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

interface ClientsSelectProps {
  field: any
  form: any
  clients: Client[]
  setClientId?: any
  name: string
}

export function ClientsSelect({
  field,
  form,
  setClientId,
  clients,
  name,
}: ClientsSelectProps) {
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
            {clients && field.value
              ? clients.find((client: Client) => {
                  return client.ID_cliente === field.value
                })?.Nome
              : "Selecione o cliente"}
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
            {clients &&
              clients.map((client: Client, i: any) => (
                <CommandItem
                  value={client.Nome}
                  key={`${client.ID_cliente}`}
                  onSelect={() => {
                    setClientId &&
                      setClientId(
                        client.ID_cliente && client.ID_cliente.toString()
                      )
                    form.setValue(name, client.ID_cliente)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      client.ID_cliente === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {client.Nome}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
