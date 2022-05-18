import {createDateKeyComparer, createStringKeyComparer} from "@homecare/common";

export enum AppointmentEntity {
  Appointment = 'Appointment',
  AppointmentCallType = 'AppointmentCallType',
  AppointmentNoAnswer = 'AppointmentNoAnswer',
  AppointmentNoAnswerReason = 'AppointmentNoAnswerReason',
  AppointmentStatus = 'AppointmentStatus',
  AppointmentVisit = 'AppointmentVisit',
  CallType = 'CallType',
  CallTypeClass = 'CallTypeClass'
}

export const appointmentEntityMetadata = {
  [AppointmentEntity.Appointment]: {
    sortComparer: createDateKeyComparer('bookingDateTime')
  },
  [AppointmentEntity.AppointmentCallType]: {},
  [AppointmentEntity.AppointmentNoAnswer]: {},
  [AppointmentEntity.AppointmentNoAnswerReason]: {},
  [AppointmentEntity.AppointmentStatus]: {},
  [AppointmentEntity.AppointmentVisit]: {},
  [AppointmentEntity.CallType]: {},
  [AppointmentEntity.CallTypeClass]: {}
}
