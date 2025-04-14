import * as React from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import SupportForm from "@/components/support-form"
import FeedbackForm from "@/components/feedback-form"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const isMobile = useIsMobile()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="grid grid-cols-2 gap-2">
          {items.map((item) => {
            const [open, setOpen] = React.useState(false)

            if (!isMobile) {
              return (
                <Dialog key={item.title} open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton className="border border-gray-200 rounded-lg h-16 flex flex-col items-center justify-center">
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>{item.title}</DialogTitle>
                      <DialogDescription>
                        {item.title === "Support"
                          ? "Submit a support request and we'll get back to you soon."
                          : "We value your feedback to help us improve our services."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="px-4 sm:px-0 -my-4">
                      {item.title === "Support" ? <SupportForm /> : <FeedbackForm />}
                    </div>
                  </DialogContent>
                </Dialog>
              )
            }

            return (
              <Drawer key={item.title} open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="border border-gray-200 rounded-lg h-16 flex flex-col items-center justify-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>{item.title}</DrawerTitle>
                    <DrawerDescription>
                      {item.title === "Support"
                        ? "Submit a support request and we'll get back to you soon."
                        : "We value your feedback to help us improve our services."}
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 sm:px-0 -my-4">
                    {item.title === "Support" ? <SupportForm /> : <FeedbackForm />}
                  </div>
                  <DrawerFooter className="">
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}