import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface MinutesSelectProps {
  onValueChange: (value: string) => void
  defaultValue: string
}

export function MinutesSelect({
  onValueChange,
  defaultValue,
}: MinutesSelectProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Minutos" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Min</SelectLabel>
          <SelectItem value="0">00</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="45">45</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
