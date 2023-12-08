"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { catchError } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import { duplicateAttendanceAction } from "@/actions/attendance";

interface DataTableRowActionsProps<TData> {
  attendanceId: number;
}

export function DataTableRowActions<TData>({
  attendanceId,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  function updateHandler() {
    router.push(`/dashboard/attendance/edit/${attendanceId}`);
  }
  async function duplicateHandler() {
    try {
      // const res = await duplicateAttendanceAction(attendanceId)
      // if (res.error) {
      //   toast.error(res.error)
      // } else {
      //   toast.success("Lançamento adicionado com sucesso!")
      // }
    } catch (error) {
      catchError(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={updateHandler}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={duplicateHandler}>Duplicar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
