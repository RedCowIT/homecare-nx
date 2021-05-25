export interface AlertButton {
  text: string,
  role?: string,
  cssClass?: string,
  handler? () : void
}

export interface AlertOptions {
  message: string,
  header?: string,
  color?: string,
  duration?: number,
  buttons?: AlertButton[]
}
