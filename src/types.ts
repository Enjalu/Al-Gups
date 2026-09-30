export type AuthState = "public" | "alumni" | "admin";

export type AppView =
  | "home"
  | "directory"
  | "batches"
  | "batch-detail"
  | "events"
  | "event-detail"
  | "memories"
  | "distinguished"
  | "contact"
  | "login"
  | "register"
  | "claim-profile"
  | "dashboard"
  | "alumni-directory"
  | "my-batch"
  | "community"
  | "notifications"
  | "opportunities"
  | "fundraising"
  | "profile"
  | "settings"
  | "alumni-events"
  | "alumni-memories"
  | "admin-dashboard"
  | "admin-profiles"
  | "admin-alumni"
  | "admin-verification"
  | "admin-moderation"
  | "admin-events"
  | "admin-fundraising"
  | "admin-settings";

export interface NavParams {
  batchId?: string;
  memberId?: string;
  eventId?: string;
}

export interface AlumniMember {
  id: string;
  name: string;
  batchBS: string;
  batchAD: string;
  program: string;
  country: string;
  city: string;
  profession: string;
  employer?: string;
  bio?: string;
  verified: boolean;
  docVerified: boolean;
  status: "approved" | "pending" | "rejected";
  initials: string;
  color: string;
  joinedDate: string;
}

export interface Batch {
  id: string;
  yearBS: string;
  yearAD: string;
  program: string;
  memberCount: number;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  dateBS: string;
  dateAD: string;
  location: string;
  description: string;
  organizer: string;
  attendees: number;
  type: "upcoming" | "past";
  registered?: boolean;
}

export interface Notification {
  id: string;
  type: "account" | "event" | "community" | "batch" | "admin";
  message: string;
  time: string;
  read: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: "job" | "internship" | "scholarship" | "mentorship" | "business" | "volunteering";
  postedBy: string;
  deadline: string;
  description: string;
  remote: boolean;
}

export interface FundraisingCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  contributorCount: number;
  deadline: string;
  organizer: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  authorBatch: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  type: "text" | "achievement" | "event" | "batch-update";
  liked?: boolean;
}
