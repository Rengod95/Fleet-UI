"use client"

import * as React from "react"
import {
  Group,
  Panel,
  Separator,
} from "react-resizable-panels"
import { GripVertical } from "lucide-react"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof Group>) => (
  <Group
    data-slot="resizable-panel-group"
    className={cn(
      "flex w-full",
      // v4는 data attribute가 달라질 수 있으니 direction prop 기반으로 보정
      (props as { orientation?: "horizontal" | "vertical" }).orientation === "vertical" &&
        "flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = Panel

const ResizableHandle = ({
  className,
  withHandle,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean
  orientation?: "horizontal" | "vertical"
}) => (
  <Separator
    data-slot="resizable-handle"
    className={cn(
      "bg-border focus-visible:ring-ring relative flex items-center justify-center outline-none transition-colors focus-visible:ring-1 focus-visible:ring-offset-1",
      orientation === "horizontal" ? "w-px self-stretch" : "h-px w-full",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="bg-border z-10 flex h-6 w-4 items-center justify-center rounded-sm border">
        <GripVertical className="size-3.5" />
      </div>
    )}
  </Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

