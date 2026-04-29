import * as React from "react"
import { DrawerPreview as Drawer } from "@base-ui/react/drawer"

import { cn } from "@/lib/utils"

const Sheet = Drawer.Root
const SheetTrigger = Drawer.Trigger
const SheetClose = Drawer.Close

type SheetContentProps = React.ComponentPropsWithoutRef<typeof Drawer.Popup> & {
  side?: "top" | "bottom" | "left" | "right"
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Drawer.Popup>,
  SheetContentProps
>(({ className, side = "right", ...props }, ref) => {
  return (
    <Drawer.Portal>
      <Drawer.Backdrop className="fixed inset-0 z-50 bg-black/40" />
      <Drawer.Popup
        ref={ref}
        className={cn(
          "fixed z-50 bg-background p-6 shadow-lg outline-none",
          side === "right" && "right-0 top-0 h-full w-80 border-l",
          side === "left" && "left-0 top-0 h-full w-80 border-r",
          side === "top" && "left-0 top-0 h-80 w-full border-b",
          side === "bottom" && "bottom-0 left-0 h-80 w-full border-t",
          className
        )}
        {...props}
      />
    </Drawer.Portal>
  )
})

SheetContent.displayName = "SheetContent"

const SheetTitle = Drawer.Title
const SheetDescription = Drawer.Description

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
}
