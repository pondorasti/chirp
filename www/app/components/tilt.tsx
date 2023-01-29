"use client"
import React from "react"
import Tilt from "react-parallax-tilt"

interface TiltWrapperProps extends React.PropsWithChildren {
  className?: string
}

export const TiltWrapper: React.FC<Readonly<TiltWrapperProps>> = ({ className, children }) => (
  <Tilt
    className={className}
    perspective={880}
    scale={1.05}
    trackOnWindow={false}
    transitionSpeed={600}
    // glareEnable
    // glarePosition="all"
    // glareMaxOpacity={0.9}
    // glareColor="white"
  >
    {children}
  </Tilt>
)
