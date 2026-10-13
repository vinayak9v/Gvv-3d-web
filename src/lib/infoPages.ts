// Content for the menu pages whose full details the school will publish later.
// Each renders through <InfoPage>; replace `intro` (or the page itself) once the
// real content arrives.

export type InfoPageDef = {
  title: string;
  section: string;
  intro: string;
};

export const ACADEMIC_PAGES: Record<string, InfoPageDef> = {
  pedagogy: {
    title: 'Pedagogy',
    section: 'Academics · Curriculum',
    intro:
      'How we teach at Garima Vidhya Vihar — experiential, activity-based and technology-enabled learning that puts the student at the centre of every classroom.',
  },
  syllabus: {
    title: 'Syllabus',
    section: 'Academics · Curriculum',
    intro: 'Class-wise CBSE syllabus for the current academic session.',
  },
  courses: {
    title: 'Courses Offered',
    section: 'Academics · Curriculum',
    intro: 'Streams and subject combinations offered from Pre-Primary to Class XII.',
  },
  evaluation: {
    title: 'Evaluation Pattern',
    section: 'Academics · Examination',
    intro: 'Our assessment scheme — periodic tests, term examinations and continuous evaluation, as per CBSE guidelines.',
  },
  'date-sheet': {
    title: 'Exam Date Sheet',
    section: 'Academics · Examination',
    intro: 'Date sheets for the upcoming periodic tests and term examinations.',
  },
  'board-results': {
    title: 'Board Results',
    section: 'Academics · Results',
    intro: 'CBSE Class X and Class XII board examination results of our students.',
  },
  'external-results': {
    title: 'Results of External Exams',
    section: 'Academics · Results',
    intro: 'Results of Olympiads, competitive and other external examinations taken by our students.',
  },
};

export const EVENT_PAGES: Record<string, InfoPageDef> = {
  'school-events': {
    title: 'School Events',
    section: 'Events and Activities',
    intro: 'Annual functions, celebrations and special days across the school calendar.',
  },
  'inter-house': {
    title: 'Inter House Events',
    section: 'Events and Activities',
    intro: 'Competitions between our houses in sports, arts, debate and more.',
  },
  'inter-school': {
    title: 'Inter School Events',
    section: 'Events and Activities',
    intro: 'Competitions and events where our students represent Garima Vidya Vihar.',
  },
  clubs: {
    title: 'School Clubs',
    section: 'Events and Activities',
    intro: 'Clubs that let students explore interests beyond the classroom — robotics, science, literary, eco and more.',
  },
  tours: {
    title: 'Tours and Excursions',
    section: 'Events and Activities',
    intro: 'Educational tours, field trips and excursions organised for our students.',
  },
};

export const EDUCATORS_PAGE: InfoPageDef = {
  title: 'Our Educators',
  section: 'About Us',
  intro: 'Meet the teaching staff of Garima Vidya Vihar.',
};

export const PROSPECTUS_PAGE: InfoPageDef = {
  title: 'Prospectus',
  section: 'Admissions',
  intro: 'The Garima Vidya Vihar prospectus — everything parents need to know about the school, admissions and fees.',
};
