import {JobSectionStatus} from "./job-section";
import {PreJobSectionStatus} from "./pre-job-section";
import {QuoteSectionStatus} from "../quote";
import {CallState} from "../call-state";

export interface Job {
  appointmentId: number;
  loadState: CallState;
  jobSections?: Array<JobSectionStatus>;
  preJobSections?: Array<PreJobSectionStatus>;
  quoteSections?: Array<QuoteSectionStatus>;
  requireDirectDebit?: boolean;
}
