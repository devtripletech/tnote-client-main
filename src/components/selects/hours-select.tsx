import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface HoursSelectProps {
  onValueChange: (value: string) => void
  defaultValue: string
}
export function HoursSelect({ onValueChange, defaultValue }: HoursSelectProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Horas" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Hor</SelectLabel>
          <SelectItem value="0">00</SelectItem>
          <SelectItem value="1">01</SelectItem>
          <SelectItem value="2">02</SelectItem>
          <SelectItem value="3">03</SelectItem>
          <SelectItem value="4">04</SelectItem>
          <SelectItem value="5">05</SelectItem>
          <SelectItem value="6">06</SelectItem>
          <SelectItem value="7">07</SelectItem>
          <SelectItem value="8">08</SelectItem>
          <SelectItem value="9">09</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="11">11</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="13">13</SelectItem>
          <SelectItem value="14">14</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="17">17</SelectItem>
          <SelectItem value="18">18</SelectItem>
          <SelectItem value="19">19</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="21">21</SelectItem>
          <SelectItem value="22">22</SelectItem>
          <SelectItem value="23">23</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
