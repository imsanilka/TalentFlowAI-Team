export const jobs = [
  {
    id: "job-101",
    title: "Junior Frontend Developer",
    company: "Lanka Digital Labs",
    location: "Colombo · Hybrid",
    type: "Full-time",
    department: "Engineering",
    posted: "2 days ago",
    summary: "Build accessible React experiences for fast-growing Sri Lankan products.",
    description:
      "Join a collaborative product team building responsive customer experiences. You will turn designs into reusable React components and help improve usability across the platform.",
    requirements: ["React and JavaScript fundamentals", "HTML, CSS and responsive design", "Understanding of Git", "Good communication skills"],
  },
  {
    id: "job-102",
    title: "UI/UX Design Intern",
    company: "PixelCraft Studio",
    location: "Remote",
    type: "Internship",
    department: "Design",
    posted: "4 days ago",
    summary: "Research, prototype and test friendly digital experiences with our design team.",
    description:
      "Work with designers and developers to research user needs, create wireframes and test prototypes. This role is ideal for a student building a strong product design portfolio.",
    requirements: ["Figma basics", "Interest in user research", "A small design portfolio", "Willingness to learn"],
  },
  {
    id: "job-103",
    title: "Graduate Software Engineer",
    company: "CloudBridge Solutions",
    location: "Kandy · On-site",
    type: "Full-time",
    department: "Engineering",
    posted: "1 week ago",
    summary: "Start your engineering career on cloud-based business applications.",
    description:
      "Learn from senior engineers while delivering tested features for enterprise clients. The graduate programme includes mentoring, code reviews and structured technical training.",
    requirements: ["Computer Science or related degree", "One programming language", "Problem-solving ability", "Teamwork"],
  },
  {
    id: "job-104",
    title: "QA Engineer Intern",
    company: "Vertex Systems",
    location: "Colombo · Hybrid",
    type: "Internship",
    department: "Quality Assurance",
    posted: "1 week ago",
    summary: "Help teams release reliable software through thoughtful manual and automated tests.",
    description:
      "Create test cases, report defects clearly and learn the foundations of test automation while working closely with developers and product owners.",
    requirements: ["Attention to detail", "Software testing fundamentals", "Clear written communication", "Basic programming knowledge"],
  },
];

export const initialApplications = [
  {
    id: "app-201",
    jobId: "job-103",
    role: "Graduate Software Engineer",
    company: "CloudBridge Solutions",
    status: "Interview",
    appliedOn: "18 July 2026",
    nextStep: "Technical interview · 28 July, 10:00 AM",
  },
  {
    id: "app-202",
    jobId: "job-102",
    role: "UI/UX Design Intern",
    company: "PixelCraft Studio",
    status: "Screening",
    appliedOn: "20 July 2026",
    nextStep: "Portfolio review in progress",
  },
];

export const statusOrder = ["Applied", "Screening", "Shortlisted", "Interview", "Offer", "Hired"];
