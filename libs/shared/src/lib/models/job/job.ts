import {JobSectionStatus} from "./job-section";
import {PreJobSectionStatus} from "./pre-job-section";

export interface Job {
  appointmentId: number;
  jobSections?: Array<JobSectionStatus>;
  preJobSections?: Array<PreJobSectionStatus>;
}
