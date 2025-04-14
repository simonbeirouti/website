"use client"

import Link from "next/link"
import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import { use } from "react"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from "@/lib/auth"
import { dashboardRoutes } from "@/lib/routes"
import { signOut } from "@/app/(login)/actions"
import { useRouter } from 'next/navigation';

export function NavUser() {
  const { userPromise } = useUser()
  const user = use(userPromise)
  const isMobile = useSidebar()
  const router = useRouter();

  if (!user) {
    return null
  }

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push('/');
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">{user.email.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {/* <span className="truncate font-medium">{user.name}</span> */}
                <span className="truncate text-sm ml-1">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* {dashboardRoutes.userNav.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={item.url}>
                  <item.icon />
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator /> */}
            <form action={handleSignOut} className="w-full">
              <button type="submit" className="flex w-full">
                <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
