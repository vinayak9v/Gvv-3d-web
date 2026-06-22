// Dialogue stages — each one is shown during the corresponding scroll range
// Adjust ranges and text freely; ranges go from 0 (top of scroll) to 1 (bottom)
export type DialogueStage = {
  range: [number, number]
  title?: string
  text: string
}

export const DIALOGUE_STAGES: DialogueStage[] = [
  {
    range: [0.00, 0.08],
    text: "",
  },
  {
    range: [0.08, 0.16],
    title: "About Garima Vidya Vihar",
    text: "We provide learning opportunities that help every child develop holistically, with a culture of positivity, intellect, innovation, and joyful learning.",
  },
  {
    range: [0.16, 0.28],
    title: "Learning Approach",
    text: "Our academic environment promotes cooperation, collaboration, experiential learning, and competency-based education as guided by NEP 2020.",
  },
  {
    range: [0.28, 0.38],
    title: "Educational Leadership",
    text: "Under Director Mr. Santosh Bagora and Principal Ms. Rama Sharma, our experienced facilitators inspire knowledge, learning, and personal growth.",
  },
  {
    range: [0.38, 0.48],
    title: "Our Goal",
    text: "We aim to build life skills, emotional intelligence, and a strong moral foundation so students grow into responsible young global citizens.",
  },
  {
    range: [0.48, 0.58],
    title: "Quality of Education",
    text: "GVV follows Board by-laws while implementing competency-based education with proper records of internal assessments and academics.",
  },
  {
    range: [0.58, 0.68],
    title: "Establishment",
    text: "Founded in 2007, GVV is run by Garima Vidya Vihar Shiksha Avam Samaj Sewa Sanstha and was established to provide quality education at an affordable fee structure.",
  },
  {
    range: [0.68, 0.78],
    title: "Core Values",
    text: "Love for our culture and country, kindness, cooperation, respect for others, and moral ethics form the foundation of character building at GVV.",
  },
  {
    range: [0.78, 0.86],
    title: "Mission Statement",
    text: "Garima School is first and foremost a family. Teachers support students to become confident people and passionate learners through kindness, cooperation, and respect.",
  },
  {
    range: [0.86, 0.94],
    title: "Vision Statement",
    text: "To create better human beings with ethical behavior, enriched with Indian values, respect for others, cooperation, and love for their parents.",
  },
  {
    range: [0.94, 1.01],
    title: "Future Ready",
    text: "We focus on skills and competency-based knowledge through experiential learning, preparing students to take up future challenges with confidence.",
  },
]

// Academic structure content from your Figma — for later, when we add holographic panels
export const ACADEMIC_CONTENT = {
  philosophy: [
    "Conceptual mastery",
    "Analytical reasoning",
    "Structured assessment",
    "Future readiness",
  ],
  stages: [
    { name: "Foundation Stage", range: "Pre-Nursery to KG", focus: "Play-based learning, language immersion, foundational numeracy" },
    { name: "Preparatory Stage", range: "III-V", focus: "Concept building, communication skills, holistic pedagogy" },
    { name: "Middle Stage", range: "VI-VIII", focus: "STEM integration, research interest, skill development" },
    { name: "Secondary Stage", range: "IX-XII", focus: "Board preparation, competitive readiness, streams choice" },
  ],
  methodology: [
    "Technology-integrated classrooms",
    "Project & research-based learning",
    "Personalized academic mentoring",
    "Professional mentorship",
  ],
  outcomes: [
    "Consistent board results",
    "Strong competitive examination preparation",
    "Scholarly discipline & academic confidence",
  ],
}
