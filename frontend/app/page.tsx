"use client";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import { BsOpenai } from "react-icons/bs";
import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiGit,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import ChatAssistant from "./components/ChatAssistant";

const email = "bufete.rondalefloyd@gmail.com";
const resumePath = "/Rondale_Bufete_ATS_Resume.pdf";

const skillGroups = [
  {
    label: "Backend & APIs",
    skills: [
      "Python",
      "FastAPI",
      "Flask",
      "Django",
      "REST APIs",
      "SQLAlchemy",
      "Alembic",
      "JWT",
    ],
  },
  {
    label: "AI & Integrations",
    skills: [
      "OpenAI GPT Realtime API",
      "WebRTC",
      "Embeddings",
      "Document-grounded Q&A",
      "RAG",
      "Google Places API",
    ],
  },
  {
    label: "Cloud & Data",
    skills: [
      "Microsoft Azure",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Redis",
      "AWS Lambda",
      "API Gateway",
      "IAM",
      "S3",
      "CloudFormation",
      "CloudWatch",
      "SES",
      "DynamoDB",
    ],
  },
  {
    label: "Frontend & Delivery",
    skills: [
      "GitHub Actions",
      "Azure DevOps",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Vue.js",
      "Docker",
      "Git",
      "Jira",
      "Postman",
      "Agile Scrum",
      "Monday.com",
    ],
  },
];

const featuredSkills = [
  { label: "Python", icon: <SiPython />, color: "#3776AB" },
  { label: "FastAPI", icon: <SiFastapi />, color: "#009688" },
  { label: "Django", icon: <SiDjango />, color: "#092E20" },
  { label: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
  { label: "OpenAI", icon: <BsOpenai />, color: "#10A37F" },
  { label: "Docker", icon: <SiDocker />, color: "#2496ED" },
  { label: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { label: "Azure", icon: <VscAzure />, color: "#0078D4" },
  { label: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
  { label: "Git", icon: <SiGit />, color: "#F05032" },
];

const experience = [
  {
    role: "Backend Developer - REINSW Client",
    company: "Cloudstaff",
    logo: "/company-logos/cloudstaff.svg",
    initials: "CS",
    period: "February 2026 - Present",
    summary:
      "Primary backend developer for an AI-driven real-estate property search platform serving the Australian market.",
    highlights: [
      "Modernized legacy backend code using SQLAlchemy and Alembic, improving maintainability and database change management.",
      "Designed REST APIs for property search, AI assistant workflows, and external integrations.",
      "Integrated OpenAI GPT Realtime API, WebRTC voice workflows, Google Places API / Nearby Search, and embedding-based document Q&A.",
      "Improved query performance through indexing and reduced AI token usage by optimizing prompts and limiting context to relevant data.",
    ],
  },
  {
    role: "Cloud Developer",
    company: "iCXeed Philippines Inc.",
    logo: "/company-logos/icxeed.svg",
    initials: "IX",
    period: "June 2025 - February 2026",
    summary:
      "Built cloud automation and API-based workflows for Amazon Connect deployments.",
    highlights: [
      "Created AWS Lambda and CloudFormation automation that reduced deployment time by 80% across 10+ enterprise deployments.",
      "Developed user provisioning and reporting pipelines with Lambda, S3, and SES.",
      "Remediated AWS Security Hub findings and strengthened IAM and encryption controls.",
    ],
  },
  {
    role: "Software Developer",
    company: "GCM3 Inc.",
    initials: "GCM3",
    period: "February 2024 - April 2025",
    summary:
      "Developed and maintained IVR systems and full-stack applications with Next.js and Django for five clients across 10+ deployments.",
    highlights: [
      "Managed SIT/UAT activities, client integrations, deployment pipelines, and environment configuration.",
    ],
  },
  {
    role: "Full-stack Developer",
    company: "S&M Superstore",
    initials: "S&M",
    period: "June 2023 - June 2024",
    summary:
      "Developed a multi-branch POS system using Next.js and Django with inventory, sales, and reporting workflows.",
    highlights: [
      "Designed and maintained the MySQL database supporting transaction processing and reporting dashboards.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Ateneo de Naga University, CCS",
    initials: "AN",
    logo: "/company-logos/adnu-ccs.svg",
    period: "June 2022 - August 2022",
    summary:
      "Contributed JavaScript and Python features to a gamified student task-management application and created UI prototypes in Figma.",
    highlights: [],
  },
];

const sectionHeadingSx = {
  color: "text.primary",
  fontWeight: 700,
  letterSpacing: "-0.02em",
};

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <ChatAssistant />
      <Box
        component="header"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Container maxWidth="md" sx={{ py: { xs: 7, md: 10 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography
                component="p"
                variant="overline"
                sx={{ fontWeight: 700, letterSpacing: "0.14em", opacity: 0.8 }}
              >
                Portfolio
              </Typography>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  mt: 1,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 1.05,
                }}
              >
                Rondale Floyd M. Bufete
              </Typography>
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 400 }}>
                Fullstack Developer | AI & Cloud Integrations
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                component="a"
                href={`mailto:${email}`}
                variant="contained"
                sx={{
                  bgcolor: "#ffffff",
                  color: "#202124",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#f1f3f4" },
                }}
              >
                Email me
              </Button>
              <Button
                component="a"
                href={resumePath}
                download
                variant="outlined"
                sx={{
                  color: "inherit",
                  borderColor: "currentColor",
                  fontWeight: 700,
                }}
              >
                Download resume
              </Button>
              <Button
                component={NextLink}
                href="/projects"
                variant="text"
                sx={{ color: "inherit", fontWeight: 700 }}
              >
                Projects
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" component="main" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack spacing={{ xs: 6, md: 8 }}>
          <Box component="section" aria-labelledby="about-heading">
            <Typography id="about-heading" component="h2" variant="h4" sx={sectionHeadingSx}>
              About
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, maxWidth: 760, lineHeight: 1.8 }}>
              Backend developer experienced in building AI-enabled applications, REST APIs, cloud
              integrations, and database-backed services. I have hands-on experience with the
              OpenAI GPT Realtime API, WebRTC, retrieval-augmented generation, Google Places API,
              AWS, Azure, and backend modernization.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, maxWidth: 760, lineHeight: 1.8 }}>
              I am a collaborative contributor in Agile, cross-functional delivery teams.
            </Typography>
          </Box>

          <Box component="section" aria-labelledby="skills-heading">
            <Typography id="skills-heading" component="h2" variant="h4" sx={sectionHeadingSx}>
              Technical skills
            </Typography>
            <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
                Core toolkit
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(5, 1fr)" },
                  gap: { xs: 2, sm: 2.5 },
                }}
              >
                {featuredSkills.map((skill) => (
                  <Stack key={skill.label} spacing={0.75} sx={{ alignItems: "center", textAlign: "center" }}>
                    <Box
                      aria-hidden="true"
                      sx={{
                        display: "flex",
                        color: (theme) =>
                          theme.palette.mode === "dark" &&
                          (skill.label === "Django" || skill.label === "Next.js")
                            ? "#ffffff"
                            : skill.color,
                        fontSize: { xs: 30, sm: 34 },
                      }}
                    >
                      {skill.icon}
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {skill.label}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Paper>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 3,
                mt: 3,
              }}
            >
              {skillGroups.map((group) => (
                <Box key={group.label}>
                  <Typography variant="subtitle1" sx={{ mb: 1.25, fontWeight: 700 }}>
                    {group.label}
                  </Typography>
                  <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                    {group.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Box>

          <Box component="section" aria-labelledby="experience-heading">
            <Typography id="experience-heading" component="h2" variant="h4" sx={sectionHeadingSx}>
              Professional experience
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              {experience.map((job) => (
                <Paper key={`${job.role}-${job.company}`} component="article" variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 72,
                          height: 72,
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                          overflow: "hidden",
                          bgcolor: "background.default",
                          "& .company-logo": {
                            filter: (theme) =>
                              theme.palette.mode === "dark"
                                ? "brightness(0) invert(1)"
                                : "none",
                          },
                        }}
                      >
                        {job.logo ? (
                          <Image
                            className="company-logo"
                            src={job.logo}
                            alt={`${job.company} logo`}
                            width={72}
                            height={72}
                            style={{ display: "block", height: "100%", width: "100%" }}
                          />
                        ) : (
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 0,
                              bgcolor: (theme) =>
                                theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                              color: (theme) =>
                                theme.palette.mode === "dark" ? "#000000" : "#ffffff",
                              fontWeight: 700,
                            }}
                          >
                            {job.initials}
                          </Avatar>
                        )}
                      </Box>
                      <Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                          {job.role}
                        </Typography>
                        <Typography color="primary.main" sx={{ fontWeight: 600 }}>
                          {job.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {job.period}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography sx={{ lineHeight: 1.7 }}>{job.summary}</Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                      {job.highlights.map((highlight) => (
                        <Box component="li" key={highlight} sx={{ pl: 0.5, mb: 0.75, lineHeight: 1.6, listStyleType: "disc", }}>
                          <Typography component="span">{highlight}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Box component="section" aria-labelledby="education-heading">
            <Typography id="education-heading" component="h2" variant="h4" sx={sectionHeadingSx}>
              Education
            </Typography>
            <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Bachelor of Science in Computer Science
              </Typography>
              <Typography sx={{ mt: 1 }}>Ateneo de Naga University</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                June 2019 - June 2023 | Honorable Mention
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Container>

      <Box component="footer" sx={{ borderTop: 1, borderColor: "divider" }}>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Zone 1 Liboro, Ragay, Camarines Sur, Philippines | 09516101009
            </Typography>
            <Link href={`mailto:${email}`} underline="hover" sx={{ width: "fit-content" }}>
              {email}
            </Link>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Available for backend, API, cloud, and AI integration opportunities.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
