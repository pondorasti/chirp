"use client"
import clsx from "clsx"
import React from "react"
import Tilt from "react-parallax-tilt"

interface TiltWrapperProps extends React.PropsWithChildren {
  className?: string
}

export const TiltWrapper: React.FC<Readonly<TiltWrapperProps>> = ({ className, children }) => (
  <Tilt
    className={clsx(className)}
    perspective={880}
    trackOnWindow={false}
    tiltMaxAngleX={5}
    tiltMaxAngleY={5}
    transitionSpeed={600}
    gyroscope
    glareEnable
    glarePosition="all"
    glareMaxOpacity={0.08}
    glareBorderRadius="32px"
    glareColor="#1DA1F2"
  >
    {children}
  </Tilt>
)
