export interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number
}

export const FigmaIcon: React.FC<Readonly<IconProps>> = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16 4C16 5.65685 14.6569 7 13 7L10 7V1L13 1C14.6569 1 16 2.34315 16 4V4Z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M4 4C4 5.65685 5.34315 7 7 7L10 7V1L7 1C5.34315 1 4 2.34315 4 4V4Z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M4 10C4 11.6569 5.34315 13 7 13H10V7L7 7C5.34315 7 4 8.34315 4 10V10Z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M4 16C4 17.6569 5.34315 19 7 19V19C8.65685 19 10 17.6569 10 16V13H7C5.34315 13 4 14.3431 4 16V16Z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path
      d="M10 10C10 11.6569 11.3431 13 13 13V13C14.6569 13 16 11.6569 16 10V10C16 8.34315 14.6569 7 13 7V7C11.3431 7 10 8.34315 10 10V10Z"
      stroke="currentColor"
      strokeWidth="1.75"
    />
  </svg>
)

export const HeartIcon: React.FC<Readonly<IconProps>> = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
  </svg>
)

export const RetweetIcon: React.FC<Readonly<IconProps>> = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
  </svg>
)

export const ReplyIcon: React.FC<Readonly<IconProps>> = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
  </svg>
)

export const ImpressionIcon: React.FC<Readonly<IconProps>> = ({ size = 20, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
  </svg>
)

export const TwitterIcon: React.FC<Readonly<IconProps>> = ({ size = 28, ...props }) => (
  <svg
    height={size}
    width={size}
    viewBox="328 355 335 276"
    fill="currentColor"
    stroke="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M 630, 425 A 195, 195 0 0 1 331, 600 A 142, 142 0 0 0 428, 570 A 70, 70 0 0 1 370, 523 A 70, 70 0 0 0 401, 521 A 70, 70 0 0 1 344, 455 A 70, 70 0 0 0 372, 460 A 70, 70 0 0 1 354, 370 A 195, 195 0 0 0 495, 442 A 67, 67 0 0 1 611, 380 A 117, 117 0 0 0 654, 363 A 65, 65 0 0 1 623, 401 A 117, 117 0 0 0 662, 390 A 65, 65 0 0 1 630, 425 Z" />
  </svg>
)
