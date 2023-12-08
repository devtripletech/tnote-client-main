import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/validations/project";
import { Check, ChevronsUpDown } from "lucide-react";

interface ProjectsSelectProps {
  field: any;
  form: any;
  projects: Project[];
}

export function ProjectsSelect({ field, form, projects }: ProjectsSelectProps) {
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
            {projects && field.value
              ? projects.find((project: Project) => {
                  return project.ID_projeto === field.value;
                })?.Nome
              : "Selecione o projeto"}
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
            {projects &&
              projects.map((project: Project, i: number) => (
                <CommandItem
                  value={`${project.Nome}`}
                  key={`${project.ID_projeto}`}
                  onSelect={() => {
                    form.setValue("ID_projeto", project.ID_projeto);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      project.ID_projeto === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {project.Nome}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
