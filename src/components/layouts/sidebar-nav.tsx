"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SidebarNavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import getCurrentUser from "@/actions/getCurrentUser"
import { UserPayload } from "@/lib/validations/auth"
import React from "react"

export interface SidebarNavProps {
  items: SidebarNavItem[]
  user: UserPayload
}

export function SidebarNav({ items, user }: SidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  const itemsForRoles = items.filter(
    (item) =>
      item.showForRole && item.showForRole.some((path) => user?.role == path)
  )

  if (!itemsForRoles?.length) return null

  return (
    <div className="flex w-full flex-col gap-2">
      {itemsForRoles.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"]

        return item.href ? (
          <Link
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                pathname === item.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}
