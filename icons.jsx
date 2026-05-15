// Semita — line icon set (1.5px stroke, currentColor)
const Icon = ({ children, size = 22, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    {children}
  </svg>
);

const I = {
  Home: (p) => <Icon {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V10"/><path d="M10 20v-5h4v5"/></Icon>,
  Pulse: (p) => <Icon {...p}><path d="M3 12h4l2-5 4 10 2-5h6"/></Icon>,
  Wallet: (p) => <Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="17" cy="14.5" r="1"/></Icon>,
  User: (p) => <Icon {...p}><circle cx="12" cy="8" r="3.4"/><path d="M5 20c.8-3.4 3.6-5.5 7-5.5s6.2 2.1 7 5.5"/></Icon>,
  Plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,

  Bolt: (p) => <Icon {...p}><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/></Icon>,
  Drop: (p) => <Icon {...p}><path d="M12 3.5c3 4 6 7 6 10a6 6 0 0 1-12 0c0-3 3-6 6-10Z"/><path d="M9 14.5c.4 1.4 1.5 2.4 3 2.6"/></Icon>,
  Trash: (p) => <Icon {...p}><path d="M5 7h14"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 12.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1L18 7"/><path d="M10 11v6M14 11v6"/></Icon>,
  Shield: (p) => <Icon {...p}><path d="M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z"/><path d="M9.5 12.5l2 2 3.5-4"/></Icon>,
  Wrench: (p) => <Icon {...p}><path d="M14.5 3.5a4 4 0 0 0-3.6 6.7L3.5 17.6 6.4 20.5l7.4-7.4a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.1-2.1 2.4-2.4a4 4 0 0 0-2.4-.3Z"/></Icon>,
  Flame: (p) => <Icon {...p}><path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.8-2.4 2-3.5C12 6 12 4.5 12 3Z"/></Icon>,

  Bell: (p) => <Icon {...p}><path d="M6 10a6 6 0 0 1 12 0v4l1.5 3H4.5L6 14v-4Z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>,
  Chevron: (p) => <Icon {...p}><path d="M9 6l6 6-6 6"/></Icon>,
  ChevronL: (p) => <Icon {...p}><path d="M15 6l-6 6 6 6"/></Icon>,
  ChevronDown: (p) => <Icon {...p}><path d="M6 9l6 6 6-6"/></Icon>,
  Close: (p) => <Icon {...p}><path d="M6 6l12 12M6 18 18 6"/></Icon>,
  Search: (p) => <Icon {...p}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-3.6-3.6"/></Icon>,
  Check: (p) => <Icon {...p}><path d="M5 12.5 10 17l9-10"/></Icon>,
  Cam: (p) => <Icon {...p}><rect x="3" y="6.5" width="18" height="13" rx="2.5"/><circle cx="12" cy="13" r="3.5"/><path d="M9 6.5 10.5 4h3L15 6.5"/></Icon>,
  Pin: (p) => <Icon {...p}><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9.5" r="2.6"/></Icon>,
  Cal: (p) => <Icon {...p}><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3.5v3M16 3.5v3"/></Icon>,
  Leaf: (p) => <Icon {...p}><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z"/><path d="M5 20c2-6 6-10 14-15"/></Icon>,
  Vote: (p) => <Icon {...p}><path d="M4 12 9 17 20 6"/><path d="M4 17 9 22"/></Icon>,
  Box: (p) => <Icon {...p}><path d="M3 7l9-4 9 4-9 4-9-4Z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></Icon>,
  Sun: (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></Icon>,
  Moon: (p) => <Icon {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/></Icon>,
  Arrow: (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  Info: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/></Icon>,
  Filter: (p) => <Icon {...p}><path d="M4 5h16M7 12h10M10 19h4"/></Icon>,
  Phone: (p) => <Icon {...p}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/></Icon>,
  Msg: (p) => <Icon {...p}><path d="M4 5h16v11H8l-4 4V5Z"/></Icon>,
  More: (p) => <Icon {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></Icon>,
  Verified: (p) => <Icon {...p}><path d="M12 3 14 4l2-.5L17 5l2 .5.5 2L21 9l-.5 2 .5 2-1 1.5-.5 2L17 17l-1 1.5-2-.5L12 19l-2-.5-1.5.5L7 17l-2-.5L4.5 14l.5-2L4.5 10l1-1.5L5 6.5 7 5l1-1.5 2 .5L12 3Z"/><path d="M9 12l2 2 4-4"/></Icon>,
  Mic: (p) => <Icon {...p}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></Icon>,
  Spark: (p) => <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3"/></Icon>,
  Refresh: (p) => <Icon {...p}><path d="M4 12a8 8 0 0 1 14-5.3L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-14 5.3L4 16"/><path d="M4 20v-4h4"/></Icon>,
};

window.I = I;
