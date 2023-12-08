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
import { Employee, TechnicalManager } from "@/lib/validations/employee"
import { Project } from "@/lib/validations/project"
import { Check, ChevronsUpDown } from "lucide-react"

interface EmployeesSelectProps {
  field: any
  form: any
  employees: TechnicalManager[]
  name: string
}

export function EmployeeSelect({
  field,
  form,
  employees,
  name,
}: EmployeesSelectProps) {
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
            {employees && field.value
              ? employees.find((employee: TechnicalManager) => {
                  return employee.gerenteTecnico === field.value
                })?.Nome
              : "Selecione o gerente técnico"}
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
            {employees &&
              employees.map((employee: TechnicalManager, i: number) => (
                <CommandItem
                  value={`${employee.Nome}`}
                  key={`${employee.gerenteTecnico}`}
                  onSelect={() => {
                    form.setValue(name, employee.gerenteTecnico)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      employee.gerenteTecnico === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {employee.Nome}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
