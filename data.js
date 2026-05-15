// Semita — mock data
window.SEMITA_DATA = {
  user: {
    name: 'Aanya Iyer',
    flat: 'C-1204',
    block: 'C',
    society: 'Brigade Sanctuary',
    location: 'HSR Layout · Sector 6',
    role: 'Resident',
    avatarColor: '#C7AB7C',
  },

  services: [
    { key: 'electricity', label: 'Electricity', status: 'on',     detail: 'Stable · 230 V',                lastEvent: '3 days ago' },
    { key: 'water',       label: 'Water',       status: 'outage', detail: 'Cauvery pump · ETA 6:30 PM',    lastEvent: 'Now · 41 min' },
    { key: 'garbage',     label: 'Garbage',     status: 'scheduled', detail: 'Wet · 7:45 AM tomorrow',     lastEvent: 'Yesterday 8:02 AM' },
    { key: 'security',    label: 'Security',    status: 'on',     detail: '3 guards on duty',              lastEvent: 'Patrol · 12 min ago' },
    { key: 'maintenance', label: 'Maintenance', status: 'partial', detail: 'Lift B-3 under service',       lastEvent: 'Started 2:10 PM' },
    { key: 'gas',         label: 'Piped Gas',   status: 'on',     detail: 'No interruptions',              lastEvent: 'Stable' },
  ],

  alerts: [
    { id: 'a1', kind: 'water', title: 'Water supply disruption · Blocks A, B, C',
      body: 'Cauvery line valve failure. BWSSB on site. Tanker dispatched to overhead.',
      verifiedBy: 'Mgr. Suresh K.', at: '41 min ago', severity: 'high',
      affected: ['A', 'B', 'C'] },
    { id: 'a2', kind: 'security', title: 'Unverified visitor at Gate 2 turned away',
      body: 'Person claimed to be Amazon delivery. No order matched. Photo logged.',
      verifiedBy: 'Guard Ravi', at: '2 h ago', severity: 'med' },
    { id: 'a3', kind: 'maintenance', title: 'Lift B-3 service window 2 — 5 PM',
      body: 'Otis quarterly maintenance. Use B-1 or B-2. Stairs accessible.',
      verifiedBy: 'Mgr. Suresh K.', at: '5 h ago', severity: 'low' },
    { id: 'a4', kind: 'community', title: 'Garba night · clubhouse 8 PM Friday',
      body: 'Sign-up at gate. Pot-luck. Ages welcome.',
      verifiedBy: 'Culture Committee', at: 'Yesterday', severity: 'low' },
  ],

  insights: {
    avgResponseHrs: 2.6,
    issuesThisMonth: 47,
    issuesResolvedPct: 89,
    uptimePct: 96.4,
    sparkline: [6, 4, 5, 3, 7, 4, 2, 5, 3, 4, 6, 4, 3, 5, 4, 6, 7, 5, 4, 3, 4, 6, 5, 4, 3, 5, 4, 6, 4, 3],
    waterMonthly: [62, 58, 64, 71, 68, 65, 60, 58, 62, 64, 66, 63], // kL
    powerMonthly: [410, 395, 430, 472, 510, 530, 540, 520, 480, 445, 425, 415], // kWh
    categories: [
      { k: 'Water',       n: 18, color: '#8FA6B2' },
      { k: 'Maintenance', n: 11, color: '#C7AB7C' },
      { k: 'Security',    n: 7,  color: '#C68576' },
      { k: 'Cleaning',    n: 6,  color: '#8FB29A' },
      { k: 'Other',       n: 5,  color: '#6E6759' },
    ],
  },

  residents: [
    { id: 'r1', name: 'Aarav Mehta',      flat: 'A-0203', block: 'A', role: 'Resident',     phone: '+91 98•••• 3421', verified: true },
    { id: 'r2', name: 'Divya Raghavan',   flat: 'A-0805', block: 'A', role: 'Resident',     phone: '+91 98•••• 8810', verified: true },
    { id: 'r3', name: 'Suresh Kumaraswamy', flat: 'Off.', block: '—', role: 'Manager',       phone: '+91 98•••• 0001', verified: true },
    { id: 'r4', name: 'Ishaan Pillai',    flat: 'B-1101', block: 'B', role: 'Resident',     phone: '+91 98•••• 2204', verified: true },
    { id: 'r5', name: 'Riya Krishnan',    flat: 'C-1204', block: 'C', role: 'Resident',     phone: 'You',             verified: true, isMe: true },
    { id: 'r6', name: 'Rohan Banerjee',   flat: 'C-0309', block: 'C', role: 'Committee',    phone: '+91 98•••• 4471', verified: true },
    { id: 'r7', name: 'Meera Krishnan',   flat: 'D-0708', block: 'D', role: 'Resident',     phone: '+91 98•••• 7732', verified: true },
    { id: 'r8', name: 'Vihaan Reddy',     flat: 'B-0405', block: 'B', role: 'Resident',     phone: '+91 98•••• 9912', verified: false },
    { id: 'r9', name: 'Ananya Pillai',    flat: 'D-1502', block: 'D', role: 'Resident',     phone: '+91 98•••• 5566', verified: true },
    { id: 'rA', name: 'Karthik Nair',     flat: 'A-1006', block: 'A', role: 'Committee',    phone: '+91 98•••• 3320', verified: true },
  ],

  maintenanceEvents: [
    { day: 'Mon 13', time: '10:00 – 12:00', title: 'Generator service',     where: 'Power room',  by: 'Sterling',  type: 'planned' },
    { day: 'Tue 14', time: '14:00 – 17:00', title: 'Lift B-3 — Otis QM',    where: 'Tower B',     by: 'Otis',      type: 'planned' },
    { day: 'Wed 15', time: '08:00 – 11:00', title: 'Pool chemical balance', where: 'Clubhouse',   by: 'Aquacare',  type: 'planned' },
    { day: 'Thu 16', time: 'Now',           title: 'Cauvery valve repair',  where: 'Sump room',   by: 'BWSSB',     type: 'live' },
    { day: 'Fri 17', time: '07:30 – 09:00', title: 'Pest control · Tower A',where: 'Tower A',     by: 'Pestmgmt.', type: 'planned' },
    { day: 'Sat 18', time: '09:00 – 13:00', title: 'Façade washing',        where: 'Tower D',     by: 'Sparkle',   type: 'planned' },
  ],

  bills: [
    { id: 'b1', label: 'Monthly maintenance',   period: 'May 2026',   amount: 7250, due: 'Today',    status: 'due' },
    { id: 'b2', label: 'Water tanker · ad-hoc', period: 'May 2026',   amount: 320,  due: 'Today',    status: 'due' },
    { id: 'b3', label: 'Clubhouse — Garba',     period: '15 May 2026',amount: 500,  due: '15 May',   status: 'optional' },
    { id: 'b4', label: 'Maintenance — Apr',     period: 'Apr 2026',   amount: 7250, due: 'Paid',     status: 'paid' },
    { id: 'b5', label: 'Maintenance — Mar',     period: 'Mar 2026',   amount: 7250, due: 'Paid',     status: 'paid' },
  ],

  polls: [
    { id: 'p1', q: 'Move EV chargers to basement-2?',
      options: [ {l:'Yes', v: 86}, {l:'No', v: 24}, {l:'Need more info', v: 12} ], closes: 'in 2 days', total: 122 },
    { id: 'p2', q: 'Adopt rainwater harvesting upgrade (₹3.2L)?',
      options: [ {l:'Approve', v: 64}, {l:'Defer', v: 41} ], closes: 'in 5 days', total: 105 },
  ],

  lostFound: [
    { id: 'l1', kind: 'found', title: 'AirPods Pro · clubhouse bench', at: '2 h ago',  by: 'D-0708' },
    { id: 'l2', kind: 'lost',  title: 'Black cat collar (Mochi)',     at: 'Yesterday', by: 'C-1502' },
    { id: 'l3', kind: 'found', title: 'Brown leather wallet',         at: 'Yesterday', by: 'Gate 1' },
    { id: 'l4', kind: 'lost',  title: 'Kids cycle — pink',            at: '3 days ago',by: 'A-0805' },
  ],

  // Building heatmap: 4 towers (A,B,C,D), 18 floors, 4 flats each
  buildings: ['A', 'B', 'C', 'D'],

  consumption: {
    water: { today: 248, yesterday: 312, weekAvg: 285, unit: 'L' },
    power: { today: 14.2, yesterday: 16.8, weekAvg: 15.4, unit: 'kWh' },
    waste: { today: 1.8, yesterday: 2.1, weekAvg: 2.0, unit: 'kg' },
    trend: [285, 290, 270, 295, 312, 305, 248], // last 7 days water
  },

  securityFeed: [
    { id: 's1', t: '14:32', kind: 'visitor', text: 'Swiggy delivery → C-1204 · approved by you', tone: 'good' },
    { id: 's2', t: '13:18', kind: 'vehicle', text: 'KA-05-MX-2104 entered · resident verified',  tone: 'good' },
    { id: 's3', t: '12:50', kind: 'alert',   text: 'Unverified visitor at Gate 2 turned away',  tone: 'warn' },
    { id: 's4', t: '12:11', kind: 'patrol',  text: 'Tower B perimeter patrol complete',          tone: 'good' },
    { id: 's5', t: '11:40', kind: 'visitor', text: 'Amazon → A-0805 · verified',                tone: 'good' },
    { id: 's6', t: '10:22', kind: 'vehicle', text: 'KA-01-AB-9912 exited',                       tone: 'good' },
  ],

  reportCategories: [
    { k: 'water', label: 'Water' },
    { k: 'electricity', label: 'Electricity' },
    { k: 'security', label: 'Security' },
    { k: 'cleaning', label: 'Cleaning' },
    { k: 'lift', label: 'Lift / Elevator' },
    { k: 'common', label: 'Common areas' },
    { k: 'noise', label: 'Noise / nuisance' },
    { k: 'other', label: 'Other' },
  ],
};
