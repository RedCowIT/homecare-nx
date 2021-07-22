import {JobSectionStatus} from "./job-section";
import {PreJobSectionStatus} from "./pre-job-section";
import {QuoteSectionStatus} from "../quote";

export interface Job {
  appointmentId: number;
  jobSections?: Array<JobSectionStatus>;
  preJobSections?: Array<PreJobSectionStatus>;
  quoteSections?: Array<QuoteSectionStatus>;
}
