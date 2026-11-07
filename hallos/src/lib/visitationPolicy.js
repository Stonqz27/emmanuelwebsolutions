export const MORGAN_VISITATION_FAQ_URL = 'https://www.morgan.edu/residence-life-and-housing/resources-for-residents/frequently-asked-questions';

// Published baseline for Morgan university-owned and leased facilities.
// Hall-specific staff confirmation and approved exceptions still take priority.
export const MORGAN_VISITATION_POLICY = [
  { day: 'Monday – Thursday', windows: [
    ['12:00 p.m. – 4:00 p.m.', 'Matriculating students with a Bear Card only'],
    ['4:00 p.m. – 10:30 p.m.', 'Matriculating students with a Bear Card; registered non-student visitors with ID'],
  ] },
  { day: 'Friday', windows: [
    ['12:00 p.m. – 4:00 p.m.', 'Matriculating students with a Bear Card only'],
    ['4:00 p.m. – 12:00 a.m.', 'Matriculating students with a Bear Card; registered non-student visitors with ID'],
  ] },
  { day: 'Saturday', windows: [
    ['12:00 p.m. – 12:00 a.m.', 'Matriculating students with a Bear Card; registered non-student visitors with ID'],
  ] },
  { day: 'Sunday', windows: [
    ['12:00 p.m. – 10:30 p.m.', 'Matriculating students with a Bear Card; registered non-student visitors with ID'],
  ] },
];
