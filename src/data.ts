import type { AlumniMember, Batch, Event, Notification, Opportunity, FundraisingCampaign, CommunityPost } from "./types";

export const BATCHES: Batch[] = [
  { id: "2061", yearBS: "2061 B.S.", yearAD: "2004/05 A.D.", program: "SLC", memberCount: 8 },
  { id: "2067", yearBS: "2067 B.S.", yearAD: "2010/11 A.D.", program: "SLC", memberCount: 12 },
  { id: "2072", yearBS: "2072 B.S.", yearAD: "2015/16 A.D.", program: "SEE", memberCount: 18 },
  { id: "2074", yearBS: "2074 B.S.", yearAD: "2017/18 A.D.", program: "+2 Science", memberCount: 14 },
  { id: "2075", yearBS: "2075 B.S.", yearAD: "2018/19 A.D.", program: "+2 Management", memberCount: 11 },
  { id: "2076", yearBS: "2076 B.S.", yearAD: "2019/20 A.D.", program: "SEE", memberCount: 16 },
  { id: "2081", yearBS: "2081 B.S.", yearAD: "2024/25 A.D.", program: "SEE", memberCount: 10 },
  { id: "2082", yearBS: "2082 B.S.", yearAD: "2025/26 A.D.", program: "+2 Science", memberCount: 9 },
];

const COLORS = ["#2B5F3A", "#1C3B28", "#234D33", "#3A7A4F", "#57976B", "#D48C0A", "#BA7700", "#9A6200"];

export const ALUMNI: AlumniMember[] = [
  { id: "1", name: "Suman Giri", batchBS: "2076 B.S.", batchAD: "2019/20 A.D.", program: "SEE", country: "Australia", city: "Melbourne", profession: "Software Engineer", employer: "Atlassian", bio: "Passionate about technology and always proud to be a Gorkhan.", verified: true, docVerified: true, status: "approved", initials: "SG", color: COLORS[0], joinedDate: "2082 B.S." },
  { id: "2", name: "Rojina Thapa", batchBS: "2075 B.S.", batchAD: "2018/19 A.D.", program: "+2 Management", country: "Australia", city: "Sydney", profession: "Accountant", employer: "KPMG", bio: "Commerce graduate making a mark in financial services.", verified: true, docVerified: false, status: "approved", initials: "RT", color: COLORS[1], joinedDate: "2082 B.S." },
  { id: "3", name: "Prakash K.C.", batchBS: "2072 B.S.", batchAD: "2015/16 A.D.", program: "SEE", country: "United Kingdom", city: "London", profession: "Nurse", employer: "NHS", bio: "Serving the community through healthcare.", verified: true, docVerified: true, status: "approved", initials: "PK", color: COLORS[2], joinedDate: "2082 B.S." },
  { id: "4", name: "Anisha Bhandari", batchBS: "2074 B.S.", batchAD: "2017/18 A.D.", program: "+2 Science", country: "Nepal", city: "Kathmandu", profession: "Doctor", employer: "Bir Hospital", bio: "Medical professional committed to improving healthcare in Nepal.", verified: true, docVerified: true, status: "approved", initials: "AB", color: COLORS[3], joinedDate: "2082 B.S." },
  { id: "5", name: "Sagar Khatri", batchBS: "2076 B.S.", batchAD: "2019/20 A.D.", program: "SEE", country: "Japan", city: "Tokyo", profession: "IT Specialist", verified: true, docVerified: false, status: "approved", initials: "SK", color: COLORS[4], joinedDate: "2082 B.S." },
  { id: "6", name: "Nabin Ghimire", batchBS: "2067 B.S.", batchAD: "2010/11 A.D.", program: "SLC", country: "United States", city: "New York", profession: "Business Analyst", employer: "Deloitte", bio: "GUPS shaped my foundation. Grateful every day.", verified: true, docVerified: true, status: "approved", initials: "NG", color: COLORS[5], joinedDate: "2082 B.S." },
  { id: "7", name: "Bibek Shrestha", batchBS: "2072 B.S.", batchAD: "2015/16 A.D.", program: "SEE", country: "Canada", city: "Toronto", profession: "Civil Engineer", verified: false, docVerified: false, status: "approved", initials: "BS", color: COLORS[6], joinedDate: "2082 B.S." },
  { id: "8", name: "Aashish Gautam", batchBS: "2074 B.S.", batchAD: "2017/18 A.D.", program: "+2 Science", country: "Qatar", city: "Doha", profession: "Electrical Engineer", verified: true, docVerified: false, status: "approved", initials: "AG", color: COLORS[7], joinedDate: "2082 B.S." },
  { id: "9", name: "Sabina Adhikari", batchBS: "2075 B.S.", batchAD: "2018/19 A.D.", program: "+2 Management", country: "United Arab Emirates", city: "Dubai", profession: "Marketing Manager", verified: true, docVerified: true, status: "approved", initials: "SA", color: COLORS[0], joinedDate: "2082 B.S." },
  { id: "10", name: "Ramesh Oli", batchBS: "2061 B.S.", batchAD: "2004/05 A.D.", program: "SLC", country: "Nepal", city: "Kohalpur", profession: "Businessman", bio: "Proud to be among the first GUPS alumni.", verified: true, docVerified: false, status: "approved", initials: "RO", color: COLORS[1], joinedDate: "2082 B.S." },
  { id: "11", name: "Dipika Rana", batchBS: "2076 B.S.", batchAD: "2019/20 A.D.", program: "SEE", country: "South Korea", city: "Seoul", profession: "Language Teacher", verified: false, docVerified: false, status: "approved", initials: "DR", color: COLORS[2], joinedDate: "2082 B.S." },
  { id: "12", name: "Kamal Poudel", batchBS: "2067 B.S.", batchAD: "2010/11 A.D.", program: "SLC", country: "India", city: "Delhi", profession: "Journalist", verified: true, docVerified: false, status: "approved", initials: "KP", color: COLORS[3], joinedDate: "2082 B.S." },
  { id: "13", name: "Sunita Bista", batchBS: "2081 B.S.", batchAD: "2024/25 A.D.", program: "SEE", country: "Nepal", city: "Nepalgunj", profession: "Student", verified: false, docVerified: false, status: "pending", initials: "SB", color: COLORS[4], joinedDate: "2082 B.S." },
  { id: "14", name: "Raju Tamang", batchBS: "2082 B.S.", batchAD: "2025/26 A.D.", program: "+2 Science", country: "Nepal", city: "Kohalpur", profession: "Student", verified: false, docVerified: false, status: "pending", initials: "RT", color: COLORS[5], joinedDate: "2083 B.S." },
];

export const EVENTS: Event[] = [
  { id: "1", title: "GUPS Alumni Gathering 2083", dateBS: "Mangsir 15, 2083 B.S.", dateAD: "December 1, 2026", location: "Kohalpur, Banke", description: "The annual alumni gathering — reconnect with your batchmates and celebrate the GUPS community. All Gorkhans welcome.", organizer: "Alumni Association", attendees: 34, type: "upcoming" },
  { id: "2", title: "Gorkhan Networking Night — Kathmandu", dateBS: "Poush 3, 2083 B.S.", dateAD: "December 18, 2026", location: "Kathmandu, Nepal", description: "An informal networking evening for Gorkhans currently in Kathmandu. Share your journeys and build new connections.", organizer: "Anisha Bhandari", attendees: 12, type: "upcoming" },
  { id: "3", title: "GUPS Classroom Renovation Fund Launch", dateBS: "Ashwin 20, 2083 B.S.", dateAD: "October 6, 2026", location: "Online / Kohalpur", description: "Official launch of the classroom renovation fundraiser. Join us to hear about the project and contribute.", organizer: "Alumni Association", attendees: 28, type: "past" },
  { id: "4", title: "First GUPS Alumni Day", dateBS: "Shrawan 5, 2082 B.S.", dateAD: "July 21, 2025", location: "GUPS Campus, Kohalpur", description: "The inaugural alumni day marking the establishment of the Alumni Association.", organizer: "Alumni Association", attendees: 67, type: "past" },
];

export const NOTIFICATIONS: Notification[] = [
  { id: "1", type: "account", message: "Your profile has been verified and approved by the association.", time: "2 hours ago", read: false },
  { id: "2", type: "batch", message: "Dipika Rana from your 2076 B.S. batch joined the association.", time: "1 day ago", read: false },
  { id: "3", type: "event", message: "GUPS Alumni Gathering 2083 is coming up in 3 weeks.", time: "2 days ago", read: false },
  { id: "4", type: "community", message: "Sagar Khatri commented on your post.", time: "3 days ago", read: true },
  { id: "5", type: "admin", message: "Your document verification has been reviewed.", time: "5 days ago", read: true },
  { id: "6", type: "batch", message: "Your batch (2076 B.S.) now has 16 registered Gorkhans.", time: "1 week ago", read: true },
];

export const OPPORTUNITIES: Opportunity[] = [
  { id: "1", title: "Junior Software Developer", organization: "CloudTech Nepal", location: "Kathmandu, Nepal", type: "job", postedBy: "Suman Giri", deadline: "Mangsir 30, 2083 B.S.", description: "Looking for a junior developer with strong fundamentals in React and Node.js. Remote-friendly culture.", remote: true },
  { id: "2", title: "Nursing Placement — NHS UK", organization: "NHS England", location: "London, UK", type: "job", postedBy: "Prakash K.C.", deadline: "Poush 15, 2083 B.S.", description: "NHS is actively recruiting nurses from Nepal. Full support for visa and relocation.", remote: false },
  { id: "3", title: "Undergraduate Scholarship — Japan", organization: "MEXT Scholarship", location: "Japan", type: "scholarship", postedBy: "Sagar Khatri", deadline: "Falgun 10, 2083 B.S.", description: "Japanese government scholarship for Nepali students. Covers tuition, living, and travel.", remote: false },
  { id: "4", title: "Career Mentorship Programme", organization: "GUPS Alumni Association", location: "Anywhere", type: "mentorship", postedBy: "Alumni Association", deadline: "Ongoing", description: "Connect with experienced Gorkhans for career guidance. Open to all members.", remote: true },
  { id: "5", title: "Marketing Internship", organization: "BrandHive Qatar", location: "Doha, Qatar", type: "internship", postedBy: "Aashish Gautam", deadline: "Mangsir 20, 2083 B.S.", description: "6-month internship in a fast-growing marketing agency. Stipend provided.", remote: false },
];

export const CAMPAIGNS: FundraisingCampaign[] = [
  { id: "1", title: "GUPS Classroom Renovation Fund", description: "Help us renovate 3 classrooms at GUPS — new furniture, whiteboards, and improved lighting for the next generation of Gorkhans.", targetAmount: 300000, raisedAmount: 187500, contributorCount: 23, deadline: "Chaitra 30, 2083 B.S.", organizer: "Alumni Association" },
  { id: "2", title: "GUPS Merit Scholarship Fund", description: "Establish an annual scholarship for deserving GUPS students who cannot afford higher education.", targetAmount: 500000, raisedAmount: 92000, contributorCount: 14, deadline: "Baisakh 15, 2084 B.S.", organizer: "Alumni Association" },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: "1", author: "Suman Giri", authorInitials: "SG", authorColor: COLORS[0], authorBatch: "2076 B.S.", content: "Anyone from the 2076 B.S. SEE batch planning to attend the upcoming gathering in Kohalpur? Would love to reconnect with old friends. Drop a comment below!", time: "2 hours ago", likes: 14, comments: 6, type: "text", liked: false },
  { id: "2", author: "Nabin Ghimire", authorInitials: "NG", authorColor: COLORS[5], authorBatch: "2067 B.S.", content: "Proud to share that I just celebrated my 5th year at Deloitte. GUPS gave me the discipline and values that got me here. Once a Gorkhan, always a Gorkhan. 🙏", time: "1 day ago", likes: 41, comments: 11, type: "achievement", liked: true },
  { id: "3", author: "Alumni Association", authorInitials: "AA", authorColor: COLORS[1], authorBatch: "Association", content: "Reminder: The GUPS Alumni Gathering 2083 registration closes soon. Only 12 spots remaining. Register through the Events section if you haven't already.", time: "2 days ago", likes: 22, comments: 4, type: "event", liked: false },
  { id: "4", author: "Anisha Bhandari", authorInitials: "AB", authorColor: COLORS[3], authorBatch: "2074 B.S.", content: "Congratulations to Rojina Thapa on her new role at KPMG Sydney! The 2075 B.S. batch is out here making waves.", time: "3 days ago", likes: 36, comments: 8, type: "achievement", liked: false },
  { id: "5", author: "Ramesh Oli", authorInitials: "RO", authorColor: COLORS[1], authorBatch: "2061 B.S.", content: "For all the young Gorkhans just starting out — the GUPS foundation is real. I still remember the discipline our teachers instilled in us back in 2061 B.S. Use it.", time: "5 days ago", likes: 28, comments: 5, type: "text", liked: false },
];

export const DISTINGUISHED_ALUMNI = [
  { id: "1", name: "Nabin Ghimire", batch: "2067 B.S.", program: "SLC", profession: "Senior Business Analyst", organization: "Deloitte, New York", country: "United States", achievement: "5-year career at Deloitte; leads cross-border financial advisory projects across South Asia.", initials: "NG", color: COLORS[5] },
  { id: "2", name: "Anisha Bhandari", batch: "2074 B.S.", program: "+2 Science", profession: "Medical Doctor", organization: "Bir Hospital, Kathmandu", country: "Nepal", achievement: "Serving as a physician at Nepal's leading public hospital; involved in rural healthcare outreach.", initials: "AB", color: COLORS[3] },
  { id: "3", name: "Prakash K.C.", batch: "2072 B.S.", program: "SEE", profession: "Registered Nurse", organization: "NHS England, London", country: "United Kingdom", achievement: "One of the first Gorkhans to qualify as an NHS nurse; mentors other Nepali healthcare workers in the UK.", initials: "PK", color: COLORS[2] },
  { id: "4", name: "Sabina Adhikari", batch: "2075 B.S.", program: "+2 Management", profession: "Marketing Manager", organization: "Dubai-based FMCG company", country: "UAE", achievement: "Built a career in international marketing across Nepal and the Gulf. Active in the GUPS Alumni Association founding committee.", initials: "SA", color: COLORS[0] },
];

export const COUNTRY_DATA = [
  { region: "South Asia", countries: [{ name: "Nepal", count: 18 }, { name: "India", count: 4 }] },
  { region: "Oceania", countries: [{ name: "Australia", count: 12 }, { name: "New Zealand", count: 2 }] },
  { region: "United Kingdom", countries: [{ name: "United Kingdom", count: 8 }] },
  { region: "Middle East", countries: [{ name: "Qatar", count: 7 }, { name: "UAE", count: 6 }, { name: "Kuwait", count: 3 }] },
  { region: "East Asia", countries: [{ name: "Japan", count: 9 }, { name: "South Korea", count: 6 }] },
  { region: "North America", countries: [{ name: "United States", count: 11 }, { name: "Canada", count: 5 }] },
  { region: "Europe", countries: [{ name: "Germany", count: 3 }, { name: "Portugal", count: 2 }] },
  { region: "Other", countries: [{ name: "Various", count: 2 }] },
];

export const PENDING_PROFILES = [
  { id: "p1", name: "Sunita Bista", batch: "2081 B.S.", program: "SEE", country: "Nepal", submittedDate: "Kartik 28, 2083 B.S.", directoryMatch: "Possible match found", evidence: ["Name matches GUPS directory entry", "Batch year confirmed", "Student registration number provided"] },
  { id: "p2", name: "Raju Tamang", batch: "2082 B.S.", program: "+2 Science", country: "Nepal", submittedDate: "Kartik 30, 2083 B.S.", directoryMatch: "No match found", evidence: ["Recently graduated — not yet in old directory", "School ID photo submitted", "Batch confirmed by teacher referral"] },
  { id: "p3", name: "Priya Shahi", batch: "2076 B.S.", program: "SEE", country: "Japan", submittedDate: "Mangsir 2, 2083 B.S.", directoryMatch: "Possible match found", evidence: ["Name similar to directory entry 'Priya Shah'", "Batch year matches", "Awaiting document upload"] },
];
