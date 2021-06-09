import {ButtonConfig} from "@homecare/common";

export function createFooterBackButton(
  callback: () => void,
  label = 'Back',
  slot: 'start' | 'center' | 'end' = 'start'
): ButtonConfig {
  return {
    label,
    slot,
    callback
  }
}

export function createFooterNextButton(
  callback: () => void,
  label = 'Next',
  slot: 'start' | 'center' | 'end' = 'end'
): ButtonConfig {
  return {
    label,
    slot,
    callback
  }
}
