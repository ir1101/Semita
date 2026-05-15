// Semita — main tab screens: Home, Pulse, Wallet, Me
const { useState: useS, useEffect: useE, useMemo, useRef: useR } = React;

const D = () => window.SEMITA_DATA;

// helpers
const fmtINR = (n) => '₹ ' + n.toLocaleString('en-IN');
const statusColor = (s) =>
  s === 'on' ? 'good' :
  s === 'outage' ? 'bad' :
  s === 'partial' ? 'warn' :
  s === 'scheduled' ? 'info' : 'info';
const statusLabel = (s) =>
  s === 'on' ? 'Live' :
  s === 'outage' ? 'Outage' :
  s === 'partial' ? 'Partial' :
  s === 'scheduled' ? 'Planned' : s;

const ServiceIcon = ({ k, size = 22 }) => {
  const map = { electricity: I.Bolt, water: I.Drop, garbage: I.Trash,
                security: I.Shield, maintenance: I.Wrench, gas: I.Flame };
  const Cmp = map[k] || I.Info;
  return <Cmp size={size}/>;
};

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
function ScreenHome({ go, user }) {
  const d = D();
  const outage = d.services.find(s => s.status === 'outage');
  const [countdown, setCountdown] = useS(41 * 60); // seconds remaining
  useE(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="screen-enter col" style={{ padding: '8px 20px 40px', gap: 24 }}>
      {/* Greeting */}
      <div className="row between" style={{ marginTop: 4 }}>
        <div className="col gap-4">
          <div className="t-cap muted">{d.user.location}</div>
          <div className="serif" style={{ fontSize: 30, lineHeight: 1.1 }}>
            Good evening,<br/><span style={{ color: 'var(--accent)' }}>{d.user.name.split(' ')[0]}.</span>
          </div>
        </div>
        <div onClick={() => go('me')} style={{
          width: 46, height: 46, borderRadius: '50%',
          background: 'var(--accent-soft)', color: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Instrument Serif, serif', fontSize: 22,
          border: '1px solid var(--border-2)', cursor: 'pointer'
        }}>
          {d.user.name[0]}
        </div>
      </div>

      {/* Featured: outage hero */}
      {outage && (
        <div className="card-2 col gap-12 slide-up" style={{
          padding: 18,
          background: 'linear-gradient(180deg, var(--surface-2), var(--surface))',
          borderColor: 'var(--bad-soft)'
        }} onClick={() => go('service:water')}>
          <div className="row between">
            <div className="chip bad">
              <span className="dot pulsing" style={{ background: 'var(--bad)' }}/>
              Live · {statusLabel(outage.status)}
            </div>
            <div className="t-cap">{outage.lastEvent}</div>
          </div>
          <div className="serif" style={{ fontSize: 24, lineHeight: 1.15 }}>
            Water supply paused across <span style={{ color: 'var(--bad)' }}>Blocks A, B & C.</span>
          </div>
          <div className="row between" style={{ marginTop: 4 }}>
            <div className="col gap-4">
              <div className="t-cap">Resuming in</div>
              <div className="t-num" style={{ fontSize: 26 }}>
                {String(Math.floor(countdown/60)).padStart(2,'0')}:{String(countdown%60).padStart(2,'0')}
              </div>
            </div>
            <div className="col gap-4" style={{ alignItems: 'flex-end' }}>
              <div className="t-cap">Verified by</div>
              <div className="row gap-6"><I.Verified size={14}/> <span style={{ fontSize: 13 }}>Mgr. Suresh K.</span></div>
            </div>
          </div>
          <div className="bar-track" style={{ marginTop: 6 }}>
            <div className="bar-fill" style={{ width: `${100 - (countdown/(41*60))*100}%`, background: 'var(--bad)' }}/>
          </div>
        </div>
      )}

      {/* Services grid */}
      <div className="col gap-12">
        <div className="row between">
          <div className="t-cap">Services</div>
          <div className="row gap-4 muted" style={{ fontSize: 12, cursor: 'pointer' }} onClick={() => go('heatmap')}>
            Heatmap <I.Chevron size={12}/>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {d.services.map(s => (
            <div key={s.key} className="card col gap-10" style={{ padding: 14, cursor: 'pointer' }}
                 onClick={() => go(`service:${s.key}`)}>
              <div className="row between">
                <div className={`ring-glow ${statusColor(s.status)}`} style={{ width: 36, height: 36, borderRadius: 10 }}>
                  <ServiceIcon k={s.key} size={18}/>
                </div>
                <div className="row gap-6">
                  <span className={`dot ${s.status === 'outage' ? 'pulsing' : ''}`} style={{
                    background: `var(--${statusColor(s.status) === 'info' ? 'info' : statusColor(s.status)})`
                  }}/>
                </div>
              </div>
              <div className="col gap-2" style={{ marginTop: 4 }}>
                <div className="t-h">{s.label}</div>
                <div className="muted" style={{ fontSize: 12, lineHeight: 1.3 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights peek */}
      <div className="card col gap-14" onClick={() => go('insights')} style={{ cursor: 'pointer' }}>
        <div className="row between">
          <div className="col gap-2">
            <div className="t-cap">This month · insights</div>
            <div className="serif" style={{ fontSize: 22 }}>Faster than last month.</div>
          </div>
          <I.Chevron size={18} className="muted"/>
        </div>
        <div className="row gap-16">
          <div className="col gap-2" style={{ flex: 1 }}>
            <div className="row gap-6" style={{ alignItems: 'baseline' }}>
              <div className="t-num" style={{ fontSize: 32 }}>{d.insights.avgResponseHrs}</div>
              <div className="muted" style={{ fontSize: 13 }}>h avg</div>
            </div>
            <div className="t-cap" style={{ letterSpacing: '0.04em' }}>response</div>
          </div>
          <div className="col gap-2" style={{ flex: 1 }}>
            <div className="row gap-6" style={{ alignItems: 'baseline' }}>
              <div className="t-num" style={{ fontSize: 32 }}>{d.insights.issuesResolvedPct}</div>
              <div className="muted" style={{ fontSize: 13 }}>%</div>
            </div>
            <div className="t-cap">resolved</div>
          </div>
          <div className="col gap-2" style={{ flex: 1 }}>
            <div className="row gap-6" style={{ alignItems: 'baseline' }}>
              <div className="t-num" style={{ fontSize: 32 }}>{d.insights.uptimePct}</div>
              <div className="muted" style={{ fontSize: 13 }}>%</div>
            </div>
            <div className="t-cap">uptime</div>
          </div>
        </div>
        <Sparkline data={d.insights.sparkline}/>
      </div>

      {/* Quick row: maintenance / poll */}
      <div className="col gap-12">
        <div className="t-cap">For your week</div>
        <div className="card row gap-12" style={{ padding: 14, cursor: 'pointer' }} onClick={() => go('maintenance')}>
          <div className="ring-glow info" style={{ width: 40, height: 40, borderRadius: 12 }}>
            <I.Cal size={20}/>
          </div>
          <div className="col gap-2" style={{ flex: 1 }}>
            <div className="t-h">Lift B-3 service · Tue 2–5 PM</div>
            <div className="muted" style={{ fontSize: 12 }}>Use B-1 / B-2 · stairs accessible</div>
          </div>
          <I.Chevron size={16} className="dim"/>
        </div>
        <div className="card row gap-12" style={{ padding: 14, cursor: 'pointer' }} onClick={() => go('polls')}>
          <div className="ring-glow" style={{ width: 40, height: 40, borderRadius: 12 }}>
            <I.Vote size={20}/>
          </div>
          <div className="col gap-2" style={{ flex: 1 }}>
            <div className="t-h">2 polls open · 1 closing soon</div>
            <div className="muted" style={{ fontSize: 12 }}>EV chargers · Rainwater upgrade</div>
          </div>
          <I.Chevron size={16} className="dim"/>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ data }) {
  const w = 320, h = 56;
  const max = Math.max(...data), min = Math.min(...data);
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i*step, h - ((v - min) / (max - min || 1)) * (h - 6) - 3]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: h }}>
      <path d={path + ` L ${w} ${h} L 0 ${h} Z`} fill="var(--accent-soft)"/>
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// PULSE — community feed (alerts + polls + lost&found + sustainability tiles)
// ─────────────────────────────────────────────────────────────
function ScreenPulse({ go }) {
  const d = D();
  const [filter, setFilter] = useS('all');
  const filtered = filter === 'all' ? d.alerts : d.alerts.filter(a => a.kind === filter);

  return (
    <div className="screen-enter col" style={{ padding: '8px 20px 40px', gap: 22 }}>
      <div className="col gap-6">
        <div className="t-cap muted">Verified by your committee</div>
        <div className="serif" style={{ fontSize: 30 }}>The pulse.</div>
      </div>

      <div style={{ overflowX: 'auto', margin: '0 -20px', padding: '0 20px' }} className="hide-scroll">
        <div className="row gap-8" style={{ paddingBottom: 4 }}>
          {[
            { k: 'all', l: 'All', n: d.alerts.length },
            { k: 'water', l: 'Water' },
            { k: 'security', l: 'Security' },
            { k: 'maintenance', l: 'Maint.' },
            { k: 'community', l: 'Community' },
          ].map(c => (
            <div key={c.k} className={'chip' + (filter === c.k ? ' solid' : '')}
                 onClick={() => setFilter(c.k)} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {c.l}{c.n ? ' · ' + c.n : ''}
            </div>
          ))}
        </div>
      </div>

      <div className="col gap-10">
        {filtered.map((a, i) => (
          <div key={a.id} className="card col gap-10 slide-up" style={{ animationDelay: `${i*60}ms` }}>
            <div className="row between">
              <div className="row gap-10">
                <div className={`ring-glow ${a.severity === 'high' ? 'bad' : a.severity === 'med' ? 'warn' : ''}`}>
                  {a.kind === 'water' && <I.Drop size={20}/>}
                  {a.kind === 'security' && <I.Shield size={20}/>}
                  {a.kind === 'maintenance' && <I.Wrench size={20}/>}
                  {a.kind === 'community' && <I.Spark size={20}/>}
                </div>
                <div className="col gap-2">
                  <div className="t-h" style={{ lineHeight: 1.2 }}>{a.title}</div>
                  <div className="row gap-6 muted" style={{ fontSize: 12 }}>
                    <I.Verified size={12} style={{ color: 'var(--accent)' }}/>
                    {a.verifiedBy} · {a.at}
                  </div>
                </div>
              </div>
            </div>
            <div className="t-body muted" style={{ fontSize: 14 }}>{a.body}</div>
            {a.affected && (
              <div className="row gap-6" style={{ marginTop: 2 }}>
                {a.affected.map(b => <div key={b} className="chip" style={{ fontSize: 11 }}>Block {b}</div>)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Community tiles */}
      <div className="col gap-12" style={{ marginTop: 4 }}>
        <div className="t-cap">More from the community</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card col gap-10" onClick={() => go('polls')} style={{ cursor: 'pointer' }}>
            <div className="ring-glow" style={{ width: 36, height: 36, borderRadius: 10 }}><I.Vote size={18}/></div>
            <div className="t-h">Polls</div>
            <div className="muted" style={{ fontSize: 12 }}>2 open · 122 voters</div>
          </div>
          <div className="card col gap-10" onClick={() => go('lostfound')} style={{ cursor: 'pointer' }}>
            <div className="ring-glow info" style={{ width: 36, height: 36, borderRadius: 10 }}><I.Box size={18}/></div>
            <div className="t-h">Lost & found</div>
            <div className="muted" style={{ fontSize: 12 }}>4 items · 2 found</div>
          </div>
          <div className="card col gap-10" onClick={() => go('sustainability')} style={{ cursor: 'pointer' }}>
            <div className="ring-glow good" style={{ width: 36, height: 36, borderRadius: 10 }}><I.Leaf size={18}/></div>
            <div className="t-h">Sustainability</div>
            <div className="muted" style={{ fontSize: 12 }}>−20% water · today</div>
          </div>
          <div className="card col gap-10" onClick={() => go('security')} style={{ cursor: 'pointer' }}>
            <div className="ring-glow good" style={{ width: 36, height: 36, borderRadius: 10 }}><I.Shield size={18}/></div>
            <div className="t-h">Security log</div>
            <div className="muted" style={{ fontSize: 12 }}>6 events · today</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WALLET — bills & dues
// ─────────────────────────────────────────────────────────────
function ScreenWallet({ go, billsState, setBillsState }) {
  const d = D();
  const due = billsState.filter(b => b.status === 'due');
  const total = due.reduce((a, b) => a + b.amount, 0);
  const [paying, setPaying] = useS(false);

  const payAll = () => {
    setPaying(true);
    setTimeout(() => {
      setBillsState(billsState.map(b => b.status === 'due' ? { ...b, status: 'paid', due: 'Paid' } : b));
      setPaying(false);
    }, 1400);
  };

  return (
    <div className="screen-enter col" style={{ padding: '8px 20px 40px', gap: 22 }}>
      <div className="col gap-6">
        <div className="t-cap muted">Maintenance & dues</div>
        <div className="serif" style={{ fontSize: 30 }}>Wallet.</div>
      </div>

      {/* Hero: total due */}
      <div className="card-2 col gap-12" style={{ padding: 20 }}>
        <div className="row between">
          <div className="t-cap">Outstanding</div>
          <div className="chip">May 2026</div>
        </div>
        <div className="row gap-6" style={{ alignItems: 'baseline' }}>
          <div className="serif" style={{ fontSize: 56, lineHeight: 1 }}>{fmtINR(total)}</div>
        </div>
        <div className="muted" style={{ fontSize: 13 }}>
          {due.length} item{due.length === 1 ? '' : 's'} · auto-pay disabled
        </div>
        <button className="btn primary block" onClick={payAll} disabled={paying || due.length === 0} style={{ marginTop: 4 }}>
          {paying ? <>Processing <span className="pulsing">…</span></> :
           due.length === 0 ? <><I.Check size={18}/> All settled</> :
           <>Pay all · UPI <I.Arrow size={18}/></>}
        </button>
      </div>

      {/* Bills list */}
      <div className="col gap-10">
        <div className="t-cap">Bills</div>
        {billsState.map(b => (
          <div key={b.id} className="card row gap-12">
            <div className={`ring-glow ${b.status === 'paid' ? 'good' : b.status === 'optional' ? 'info' : 'warn'}`}>
              {b.status === 'paid' ? <I.Check size={20}/> : <I.Wallet size={20}/>}
            </div>
            <div className="col gap-2" style={{ flex: 1 }}>
              <div className="t-h">{b.label}</div>
              <div className="muted" style={{ fontSize: 12 }}>{b.period}</div>
            </div>
            <div className="col gap-2" style={{ alignItems: 'flex-end' }}>
              <div className="t-num" style={{ fontSize: 18 }}>{fmtINR(b.amount)}</div>
              <div className={'chip ' + (b.status === 'paid' ? 'good' : b.status === 'optional' ? '' : 'warn')}
                   style={{ fontSize: 11 }}>{b.due}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card col gap-10" onClick={() => go('insights')} style={{ cursor: 'pointer' }}>
        <div className="row between">
          <div className="t-h">Year-to-date</div>
          <I.Chevron size={16} className="dim"/>
        </div>
        <BarMini data={[7250, 7250, 7250, 7250, 7570]} labels={['Jan','Feb','Mar','Apr','May']}/>
      </div>
    </div>
  );
}

function BarMini({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div className="col gap-6">
      <div className="row" style={{ alignItems: 'flex-end', height: 80, gap: 10 }}>
        {data.map((v, i) => (
          <div key={i} className="col" style={{ flex: 1, alignItems: 'center', gap: 6 }}>
            <div style={{
              width: '100%', borderRadius: 4,
              height: (v / max) * 64,
              background: i === data.length - 1 ? 'var(--accent)' : 'var(--surface-3)',
              transition: 'height 600ms cubic-bezier(.2,.8,.2,1)',
            }}/>
          </div>
        ))}
      </div>
      <div className="row" style={{ gap: 10 }}>
        {labels.map((l, i) => (
          <div key={i} className="muted" style={{ flex: 1, textAlign: 'center', fontSize: 11 }}>{l}</div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ME — profile + settings
// ─────────────────────────────────────────────────────────────
function ScreenMe({ go, theme, setTheme, onLogout }) {
  const d = D();
  return (
    <div className="screen-enter col" style={{ padding: '8px 20px 40px', gap: 22 }}>
      <div className="col gap-6">
        <div className="t-cap muted">Account</div>
        <div className="serif" style={{ fontSize: 30 }}>You.</div>
      </div>

      {/* Identity card */}
      <div className="card-2 col gap-14" style={{ padding: 20 }}>
        <div className="row between">
          <div className="row gap-14">
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'var(--accent-soft)', color: 'var(--accent)',
              border: '1px solid var(--border-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Instrument Serif, serif', fontSize: 30
            }}>{d.user.name[0]}</div>
            <div className="col gap-4">
              <div className="t-title">{d.user.name}</div>
              <div className="muted" style={{ fontSize: 13 }}>{d.user.flat} · {d.user.society}</div>
              <div className="row gap-6" style={{ marginTop: 2 }}>
                <I.Verified size={13} style={{ color: 'var(--accent)' }}/>
                <span style={{ fontSize: 12, color: 'var(--accent)' }}>Verified resident</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RowGroup label="Society">
        <RowItem icon={I.User}  label="Resident directory"  detail="142 households" onClick={() => go('directory')}/>
        <RowItem icon={I.Cal}   label="Maintenance schedule" detail="3 events this week" onClick={() => go('maintenance')}/>
        <RowItem icon={I.Vote}  label="Polls & decisions"    detail="2 open" onClick={() => go('polls')}/>
        <RowItem icon={I.Box}   label="Lost & found"         detail="4 active" onClick={() => go('lostfound')}/>
        <RowItem icon={I.Leaf}  label="Sustainability"       detail="−20% water today" onClick={() => go('sustainability')}/>
      </RowGroup>

      <RowGroup label="Preferences">
        <RowItem icon={theme === 'dark' ? I.Moon : I.Sun}
                 label="Appearance"
                 right={
                   <div className="seg">
                     <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>Light</button>
                     <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>Dark</button>
                   </div>}/>
        <RowItem icon={I.Bell}  label="Notifications" detail="Verified only" right={<Toggle on/>}/>
        <RowItem icon={I.Shield} label="Privacy" detail="Phone masked"  right={<Toggle on/>}/>
      </RowGroup>

      <RowGroup label="Help">
        <RowItem icon={I.Phone} label="Call manager"      detail="Suresh K. · +91 98•••• 0001"/>
        <RowItem icon={I.Msg}   label="Committee chat"    detail="3 unread"/>
        <RowItem icon={I.Info}  label="About Semita"      detail="v1.0 · build 2026.05"/>
      </RowGroup>

      <div className="btn ghost" style={{ width: '100%', color: 'var(--bad)' }} onClick={onLogout}>
        Sign out
      </div>
    </div>
  );
}

function RowGroup({ label, children }) {
  return (
    <div className="col gap-10">
      <div className="t-cap" style={{ paddingLeft: 4 }}>{label}</div>
      <div className="card-2" style={{ padding: 4 }}>
        {React.Children.map(children, (c, i) => (
          <>
            {c}
            {i < React.Children.count(children) - 1 && <div style={{ height: 1, background: 'var(--border)', margin: '0 12px' }}/>}
          </>
        ))}
      </div>
    </div>
  );
}

function RowItem({ icon: Ic, label, detail, right, onClick }) {
  return (
    <div className="row gap-12" style={{ padding: '12px 12px', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
      <div className="ring-glow" style={{ width: 34, height: 34, borderRadius: 10, background: 'transparent', color: 'var(--text-2)', border: '1px solid var(--border)' }}>
        <Ic size={17}/>
      </div>
      <div className="col gap-2" style={{ flex: 1 }}>
        <div style={{ fontSize: 15 }}>{label}</div>
        {detail && <div className="muted" style={{ fontSize: 12 }}>{detail}</div>}
      </div>
      {right ? right : onClick ? <I.Chevron size={15} className="dim"/> : null}
    </div>
  );
}

function Toggle({ on: onProp = false, onChange }) {
  const [on, setOn] = useS(onProp);
  return (
    <div onClick={() => { const n = !on; setOn(n); onChange && onChange(n); }}
         style={{
           width: 38, height: 22, borderRadius: 99,
           background: on ? 'var(--accent)' : 'var(--surface-3)',
           border: '1px solid ' + (on ? 'transparent' : 'var(--border-2)'),
           position: 'relative', cursor: 'pointer',
           transition: 'background 220ms ease'
         }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 18 : 2,
        width: 16, height: 16, borderRadius: '50%',
        background: on ? '#1a1612' : 'var(--text)',
        transition: 'left 220ms cubic-bezier(.2,.8,.2,1)'
      }}/>
    </div>
  );
}

Object.assign(window, { ScreenHome, ScreenPulse, ScreenWallet, ScreenMe, Sparkline, BarMini, RowGroup, RowItem, Toggle, ServiceIcon, statusColor, statusLabel, fmtINR });
