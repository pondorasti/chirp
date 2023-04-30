"use client"

import { Transition as HeadlessTransition } from "@headlessui/react"

export const Transition = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof HeadlessTransition>) => (
  <HeadlessTransition {...props}>{children}</HeadlessTransition>
)
