// Session data for the signed-in resident.
// NOTE: sample values are shown until the database layer is connected.
const SAMPLE_SESSION = {
  loading: false,
  user: { id: 'sample', full_name: 'Amara Lewis', email: 'amara.lewis@example.com' },
  profile: {
    id: 'sample-profile',
    full_name: 'Amara Lewis',
    hall_id: 'rawlings',
    floor: '3',
    staff_role: 'resident',
    staff_status: 'none',
  },
  hall: {
    id: 'rawlings',
    name: 'Rawlings Hall',
    short_name: 'Rawlings',
    is_demo: false,
    front_desk_phone: '',
  },
  isStaff: false,
  isDemo: false,
  needsProfile: false,
  refresh: () => {},
};

export function useSession() {
  return SAMPLE_SESSION;
}