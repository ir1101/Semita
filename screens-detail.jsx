// Semita — detail screens / flows. All "sheet" style with their own back nav.
const { useState: useSt, useEffect: useEf, useMemo: useMm, useRef: useRf } = React;

// Sheet shell with header
function Sheet({ title, onClose, action, children, full }) {
  return (
    <div className="sheet">
      <div style={{ height: 56, flexShrink: 0 }}/>
      <div className="row between" style={{ padding: '8px 16px 12px' }}>
        <div onClick={onClose} className="row gap-4" style={{ cursor: 'pointer', color: 'var(--text-2)', fontSize: 14 }}>
          <I.ChevronL size={20}/> Back
        </div>
        <div className="t-h">{title}</div>
        <div style={{ width: 60, textAlign: 'right' }}>{action}</div>
      </div>
      <div className="scroll" style={{ paddingTop: 0 }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SERVICE DETAIL (with timeline)
// ─────────────────────────────────────────────────────────────
function ScreenServiceDetail({ serviceKey, onClose, go }) {
  const d = D();
  const s = d.services.find(x => x.key === serviceKey) || d.services[0];
  const isOutage = s.status === 'outage';
  const [eta, setEta] = useSt(41 * 60);
  useEf(() => { const t = setInterval(() => setEta(c => Math.max(0, c-1)), 1000); return () => clearInterval(t); }, []);

  const timeline = isOutage ? [
    { t: 'Now',       title: 'Tanker dispatched to overhead tank',  by: 'Mgr. Suresh K.', live: true },
    { t: '18 min ago', title: 'BWSSB technician arrived on site',    by: 'Guard Ravi' },
    { t: '32 min ago', title: 'Issue verified · valve failure',      by: 'Mgr. Suresh K.', signed: true },
    { t: '41 min ago', title: 'First reports from Block A',          by: '4 residents' },
  ] : [
    { t: '3 days ago', title: 'Routine grid check · stable',         by: 'BESCOM', signed: true },
    { t: '6 days ago', title: 'Voltage stabiliser auto-correction',  by: 'System' },
  ];

  return (
    <Sheet title={s.label} onClose={onClose} action={<I.More size={20}/>}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 22 }}>
        {/* Hero */}
        <div className="card-2 col gap-14" style={{ padding: 20 }}>
          <div className="row between">
            <div className={`ring-glow ${statusColor(s.status)}`} style={{ width: 48, height: 48, borderRadius: 14 }}>
              <ServiceIcon k={s.key} size={24}/>
            </div>
            <div className="chip" style={{
              background: `var(--${statusColor(s.status) === 'info' ? 'accent-soft' : statusColor(s.status)+'-soft'})`,
              color: `var(--${statusColor(s.status) === 'info' ? 'accent' : statusColor(s.status)})`,
              border: 0
            }}>
              <span className={`dot ${isOutage ? 'pulsing' : ''}`}
                    style={{ background: `var(--${statusColor(s.status) === 'info' ? 'accent' : statusColor(s.status)})` }}/>
              {statusLabel(s.status)}
            </div>
          </div>
          <div className="serif" style={{ fontSize: 28, lineHeight: 1.1 }}>{s.detail}</div>
          {isOutage && (
            <div className="row between" style={{ marginTop: 4 }}>
              <div className="col gap-4">
                <div className="t-cap">Expected restore</div>
                <div className="t-num" style={{ fontSize: 28 }}>
                  {String(Math.floor(eta/60)).padStart(2,'0')}:{String(eta%60).padStart(2,'0')}
                </div>
              </div>
              <div className="col gap-4" style={{ alignItems: 'flex-end' }}>
                <div className="t-cap">Affected</div>
                <div className="row gap-4">
                  {(s.key === 'water' ? ['A','B','C'] : ['B-3']).map(b =>
                    <span key={b} className="chip bad" style={{ fontSize: 11 }}>{b}</span>)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick actions */}
        {isOutage && (
          <div className="row gap-10">
            <button className="btn ghost" style={{ flex: 1, height: 44 }}>
              <I.Bell size={16}/> Subscribe
            </button>
            <button className="btn ghost" style={{ flex: 1, height: 44 }}>
              <I.Phone size={16}/> Manager
            </button>
            <button className="btn ghost" style={{ flex: 1, height: 44 }} onClick={() => go('report')}>
              <I.Plus size={16}/> Report
            </button>
          </div>
        )}

        {/* Timeline */}
        <div className="col gap-12">
          <div className="t-cap">Timeline</div>
          <div className="col" style={{ position: 'relative', paddingLeft: 24 }}>
            <div style={{
              position: 'absolute', left: 9, top: 8, bottom: 8,
              width: 1, background: 'var(--border-2)'
            }}/>
            {timeline.map((e, i) => (
              <div key={i} className="col gap-4" style={{ paddingBottom: 18, position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: -22, top: 4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: e.live ? 'var(--bad)' : 'var(--surface-3)',
                  border: '2px solid var(--bg)',
                  boxShadow: e.live ? '0 0 0 4px var(--bad-soft)' : 'none'
                }}/>
                <div className="row between">
                  <div className="t-cap" style={{ color: e.live ? 'var(--bad)' : 'var(--text-2)' }}>
                    {e.t} {e.live && '· live'}
                  </div>
                  {e.signed && <I.Verified size={13} style={{ color: 'var(--accent)' }}/>}
                </div>
                <div style={{ fontSize: 15 }}>{e.title}</div>
                <div className="muted" style={{ fontSize: 12 }}>{e.by}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="col gap-12">
          <div className="row between">
            <div className="t-cap">From residents</div>
            <div className="chip" style={{ fontSize: 11 }}>4 verified</div>
          </div>
          {[
            { who: 'Aarav · A-0203', t: '12 min ago', say: 'No water in kitchen tap either. Tanker coming?' },
            { who: 'Divya · A-0805', t: '24 min ago', say: 'Overhead tank looks half full. Sharing carefully.' },
          ].map((c,i) => (
            <div key={i} className="card col gap-6">
              <div className="row between">
                <div className="t-h" style={{ fontSize: 14 }}>{c.who}</div>
                <div className="muted" style={{ fontSize: 11 }}>{c.t}</div>
              </div>
              <div className="t-body" style={{ fontSize: 14 }}>{c.say}</div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────
// REPORT ISSUE — multi-step flow
// ─────────────────────────────────────────────────────────────
function ScreenReport({ onClose }) {
  const d = D();
  const [step, setStep] = useSt(0); // 0 cat, 1 details, 2 photo, 3 location, 4 review, 5 done
  const [draft, setDraft] = useSt({ cat: null, urgency: 'normal', details: '', photo: false, location: 'C-1204 · Block C kitchen' });

  const steps = ['Category', 'Details', 'Photo', 'Location', 'Review'];
  const canNext = step === 0 ? !!draft.cat :
                  step === 1 ? draft.details.length > 5 :
                  true;

  const submit = () => { setStep(5); };

  if (step === 5) return (
    <Sheet title="Report sent" onClose={onClose}>
      <div className="col center" style={{ height: 'calc(100% - 60px)', padding: 28, justifyContent: 'center', alignItems: 'center', gap: 18 }}>
        <div style={{ position: 'relative', width: 88, height: 88 }}>
          <div className="pulse-ring" style={{ color: 'var(--good)' }}/>
          <div className="ring-glow good" style={{ width: 88, height: 88, borderRadius: '50%' }}>
            <I.Check size={40}/>
          </div>
        </div>
        <div className="serif" style={{ fontSize: 28, textAlign: 'center' }}>
          Thank you, Aanya.
        </div>
        <div className="t-body muted" style={{ textAlign: 'center', maxWidth: 280 }}>
          Ticket <span className="mono" style={{ color: 'var(--accent)' }}>#SEM-4127</span> assigned to maintenance. You'll be notified when verified.
        </div>
        <div className="card col gap-10" style={{ width: '100%', marginTop: 8 }}>
          <div className="row between">
            <div className="t-cap">Estimated response</div>
            <div className="chip good">~ 2.6 h</div>
          </div>
          <div className="bar-track"><div className="bar-fill" style={{ width: '12%' }}/></div>
          <div className="row between muted" style={{ fontSize: 12 }}>
            <span>Received</span>
            <span>Triaged</span>
            <span>Assigned</span>
            <span>Resolved</span>
          </div>
        </div>
        <button className="btn primary block" onClick={onClose} style={{ marginTop: 8 }}>Done</button>
      </div>
    </Sheet>
  );

  return (
    <Sheet title="New report" onClose={onClose}>
      {/* Stepper */}
      <div className="row gap-6" style={{ padding: '0 20px 16px' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= step ? 'var(--accent)' : 'var(--border-2)',
            transition: 'background 320ms ease'
          }}/>
        ))}
      </div>

      <div className="col" style={{ padding: '4px 20px 24px', gap: 18 }} key={step}>
        <div className="fade-in">
          <div className="t-cap" style={{ color: 'var(--accent)' }}>Step {step+1} of {steps.length}</div>
          <div className="serif" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 6 }}>
            {step === 0 && 'What\'s the issue?'}
            {step === 1 && 'Tell us a little more.'}
            {step === 2 && 'Add a photo, if helpful.'}
            {step === 3 && 'Where, exactly?'}
            {step === 4 && 'Looks right?'}
          </div>
        </div>

        {step === 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="fade-in">
            {d.reportCategories.map(c => {
              const Ic = { water: I.Drop, electricity: I.Bolt, security: I.Shield,
                           cleaning: I.Trash, lift: I.Wrench, common: I.Box, noise: I.Mic, other: I.Info }[c.k];
              return (
                <div key={c.k} className="card col gap-10"
                     onClick={() => setDraft({ ...draft, cat: c.k })}
                     style={{
                       cursor: 'pointer',
                       borderColor: draft.cat === c.k ? 'var(--accent)' : 'var(--border)',
                       background: draft.cat === c.k ? 'var(--accent-soft)' : 'var(--surface)'
                     }}>
                  <div className={`ring-glow ${draft.cat === c.k ? '' : ''}`} style={{ width: 38, height: 38, borderRadius: 10 }}>
                    <Ic size={18}/>
                  </div>
                  <div className="t-h">{c.label}</div>
                </div>
              );
            })}
          </div>
        )}

        {step === 1 && (
          <div className="col gap-14 fade-in">
            <div className="col gap-8">
              <div className="t-cap">Urgency</div>
              <div className="row gap-8">
                {[
                  { k: 'low', l: 'Low', c: '' },
                  { k: 'normal', l: 'Normal', c: '' },
                  { k: 'urgent', l: 'Urgent', c: 'bad' },
                ].map(u => (
                  <div key={u.k} onClick={() => setDraft({ ...draft, urgency: u.k })}
                       className={'chip' + (draft.urgency === u.k ? ' solid' : '')}
                       style={{ cursor: 'pointer', padding: '8px 14px', fontSize: 13 }}>
                    {u.l}
                  </div>
                ))}
              </div>
            </div>
            <div className="col gap-8">
              <div className="t-cap">Description</div>
              <textarea className="input textarea" placeholder="What did you notice? When did it start?"
                        value={draft.details} onChange={e => setDraft({ ...draft, details: e.target.value })}/>
              <div className="muted" style={{ fontSize: 12 }}>Be specific — flat number, time, sounds, smells.</div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="col gap-12 fade-in">
            <div className="imgph" style={{ height: 200, borderRadius: 18, position: 'relative', cursor: 'pointer' }}
                 onClick={() => setDraft({ ...draft, photo: !draft.photo })}>
              {draft.photo ? (
                <div className="col gap-8 center" style={{ alignItems: 'center', color: 'var(--text)' }}>
                  <I.Check size={32} style={{ color: 'var(--good)' }}/>
                  <span style={{ fontSize: 13 }}>Photo attached · IMG_0241.jpg</span>
                </div>
              ) : (
                <div className="col gap-8 center" style={{ alignItems: 'center' }}>
                  <I.Cam size={32}/>
                  <span>tap to attach photo</span>
                </div>
              )}
            </div>
            <div className="muted" style={{ fontSize: 13 }}>
              Photos help the manager triage faster. Optional but encouraged.
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="col gap-12 fade-in">
            <div className="card row gap-12">
              <div className="ring-glow"><I.Pin size={20}/></div>
              <div className="col gap-2" style={{ flex: 1 }}>
                <div className="t-h">Your flat · C-1204</div>
                <div className="muted" style={{ fontSize: 12 }}>Block C · 12th floor · kitchen</div>
              </div>
              <I.Check size={20} style={{ color: 'var(--accent)' }}/>
            </div>
            <div className="t-cap" style={{ paddingTop: 6 }}>Or pick a common area</div>
            {['Clubhouse', 'Pool deck', 'Parking · basement 1', 'Tower B lobby', 'Gate 2'].map(p => (
              <div key={p} className="card row between" style={{ padding: '12px 16px' }}>
                <span>{p}</span>
                <I.Chevron size={14} className="dim"/>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="col gap-10 fade-in">
            <div className="card col gap-10">
              <div className="row between">
                <div className="t-cap">Category</div>
                <div className="row gap-6">{draft.cat || '—'} <I.Chevron size={12} className="dim"/></div>
              </div>
              <div className="row between">
                <div className="t-cap">Urgency</div>
                <div className={'chip' + (draft.urgency === 'urgent' ? ' bad' : '')} style={{ fontSize: 11 }}>{draft.urgency}</div>
              </div>
              <div className="row between">
                <div className="t-cap">Photo</div>
                <div>{draft.photo ? '1 attached' : <span className="muted">none</span>}</div>
              </div>
              <div className="row between">
                <div className="t-cap">Where</div>
                <div style={{ fontSize: 13 }}>{draft.location}</div>
              </div>
            </div>
            <div className="card col gap-6">
              <div className="t-cap">Description</div>
              <div className="t-body">{draft.details || <span className="muted">—</span>}</div>
            </div>
            <div className="t-body muted" style={{ fontSize: 13, textAlign: 'center', marginTop: 6 }}>
              Submitted to Mgr. Suresh K. · auto-routed to Maintenance
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="row gap-10" style={{ padding: '14px 20px 24px', borderTop: '1px solid var(--border)' }}>
        {step > 0 && (
          <button className="btn ghost" style={{ flex: '0 0 auto' }} onClick={() => setStep(step - 1)}>Back</button>
        )}
        <button className="btn primary" style={{ flex: 1 }}
                disabled={!canNext}
                onClick={() => step < 4 ? setStep(step+1) : submit()}>
          {step < 4 ? <>Continue <I.Arrow size={16}/></> : <>Submit report <I.Check size={16}/></>}
        </button>
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────
// INSIGHTS / ANALYTICS
// ─────────────────────────────────────────────────────────────
function ScreenInsights({ onClose }) {
  const d = D();
  const [range, setRange] = useSt('30d');
  return (
    <Sheet title="Insights" onClose={onClose}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 20 }}>
        <div className="row between">
          <div className="serif" style={{ fontSize: 28 }}>How the society is running.</div>
        </div>
        <div className="seg">
          {[['7d','7 days'],['30d','30 days'],['90d','90 days']].map(([k,l]) => (
            <button key={k} className={range === k ? 'on' : ''} onClick={() => setRange(k)}>{l}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Metric label="Avg response" value={d.insights.avgResponseHrs} unit="h" trend="-12%"/>
          <Metric label="Resolved" value={d.insights.issuesResolvedPct} unit="%" trend="+4%"/>
          <Metric label="Uptime" value={d.insights.uptimePct} unit="%" trend="+0.6%"/>
          <Metric label="Issues" value={d.insights.issuesThisMonth} unit="" trend="-18%"/>
        </div>

        {/* Issues spark */}
        <div className="card col gap-12">
          <div className="row between">
            <div className="col gap-2">
              <div className="t-cap">Issues per day</div>
              <div className="serif" style={{ fontSize: 22 }}>Trending down.</div>
            </div>
            <div className="chip good">↓ 18%</div>
          </div>
          <Sparkline data={d.insights.sparkline}/>
        </div>

        {/* Donut categories */}
        <div className="card col gap-14">
          <div className="t-cap">Issue mix</div>
          <div className="row gap-16">
            <Donut data={d.insights.categories} total={d.insights.issuesThisMonth}/>
            <div className="col gap-8" style={{ flex: 1 }}>
              {d.insights.categories.map(c => (
                <div key={c.k} className="row between" style={{ fontSize: 13 }}>
                  <div className="row gap-8">
                    <span className="dot" style={{ background: c.color }}/>
                    <span>{c.k}</span>
                  </div>
                  <span className="muted">{c.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Consumption — water */}
        <div className="card col gap-12">
          <div className="row between">
            <div className="t-cap">Water · kL / month</div>
            <div className="chip">community avg</div>
          </div>
          <ColumnChart data={d.insights.waterMonthly} highlight={d.insights.waterMonthly.length - 1}/>
        </div>

        {/* Power */}
        <div className="card col gap-12">
          <div className="row between">
            <div className="t-cap">Power · kWh / month</div>
            <div className="chip warn">peak May</div>
          </div>
          <ColumnChart data={d.insights.powerMonthly} highlight={d.insights.powerMonthly.length - 1} color="warn"/>
        </div>

      </div>
    </Sheet>
  );
}

function Metric({ label, value, unit, trend }) {
  const positive = trend?.startsWith('-') ? true : false;
  return (
    <div className="card col gap-8" style={{ padding: 14 }}>
      <div className="t-cap">{label}</div>
      <div className="row gap-6" style={{ alignItems: 'baseline' }}>
        <div className="t-num" style={{ fontSize: 30 }}>{value}</div>
        {unit && <div className="muted" style={{ fontSize: 13 }}>{unit}</div>}
      </div>
      <div className={'chip ' + (positive ? 'good' : '')} style={{ fontSize: 11, alignSelf: 'flex-start' }}>{trend}</div>
    </div>
  );
}

function Donut({ data, total }) {
  const R = 38, sw = 14;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
      <svg viewBox="-50 -50 100 100" style={{ width: 100, height: 100, transform: 'rotate(-90deg)' }}>
        <circle r={R} fill="none" stroke="var(--surface-3)" strokeWidth={sw}/>
        {data.map((d, i) => {
          const frac = d.n / total;
          const len = frac * C;
          const off = acc;
          acc += len;
          return (
            <circle key={i} r={R} fill="none" stroke={d.color} strokeWidth={sw}
                    strokeDasharray={`${len} ${C}`} strokeDashoffset={-off}/>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div className="t-num" style={{ fontSize: 22 }}>{total}</div>
        <div className="t-cap" style={{ fontSize: 10 }}>issues</div>
      </div>
    </div>
  );
}

function ColumnChart({ data, highlight, color = 'accent' }) {
  const max = Math.max(...data);
  return (
    <div className="row" style={{ alignItems: 'flex-end', height: 90, gap: 6 }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1,
          height: (v / max) * 80,
          borderRadius: 3,
          background: i === highlight ? `var(--${color})` :
                      i === highlight - 1 ? `var(--${color === 'accent' ? 'accent-soft' : color+'-soft'})` :
                      'var(--surface-3)',
          opacity: i === highlight ? 1 : 0.85,
          transition: 'height 600ms cubic-bezier(.2,.8,.2,1)',
          transitionDelay: `${i*30}ms`,
        }}/>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIRECTORY
// ─────────────────────────────────────────────────────────────
function ScreenDirectory({ onClose }) {
  const d = D();
  const [q, setQ] = useSt('');
  const [block, setBlock] = useSt('all');
  const filtered = useMm(() => d.residents.filter(r =>
    (block === 'all' || r.block === block) &&
    (q.length === 0 || r.name.toLowerCase().includes(q.toLowerCase()) || r.flat.toLowerCase().includes(q.toLowerCase()))
  ), [q, block, d.residents]);

  const grouped = useMm(() => {
    const g = {};
    filtered.forEach(r => { (g[r.name[0]] ||= []).push(r); });
    return Object.entries(g).sort();
  }, [filtered]);

  return (
    <Sheet title="Directory" onClose={onClose} action={<I.Filter size={20}/>}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 14 }}>
        <div className="card row gap-10" style={{ padding: '10px 14px' }}>
          <I.Search size={18} className="muted"/>
          <input className="input" style={{ background: 'transparent', border: 0, height: 32, padding: 0 }}
                 placeholder="Search name or flat" value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div style={{ overflowX: 'auto', margin: '0 -20px', padding: '0 20px' }}>
          <div className="row gap-8" style={{ paddingBottom: 4 }}>
            {[{k:'all', l:'All blocks'}, ...d.buildings.map(b=>({k:b, l:`Block ${b}`}))].map(c => (
              <div key={c.k} className={'chip' + (block === c.k ? ' solid' : '')}
                   onClick={() => setBlock(c.k)} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>{c.l}</div>
            ))}
          </div>
        </div>

        {grouped.map(([letter, rs]) => (
          <div key={letter} className="col gap-8">
            <div className="t-cap" style={{ paddingLeft: 4 }}>{letter}</div>
            <div className="card-2" style={{ padding: 4 }}>
              {rs.map((r,i) => (
                <React.Fragment key={r.id}>
                  <div className="row gap-12" style={{ padding: '10px 12px' }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 12,
                      background: r.isMe ? 'var(--accent-soft)' : 'var(--surface)',
                      color: r.isMe ? 'var(--accent)' : 'var(--text-2)',
                      border: '1px solid var(--border)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontFamily:'Instrument Serif, serif', fontSize: 17
                    }}>{r.name[0]}</div>
                    <div className="col gap-2" style={{ flex: 1 }}>
                      <div className="row gap-6">
                        <span style={{ fontSize: 15 }}>{r.name}</span>
                        {r.verified && <I.Verified size={12} style={{ color: 'var(--accent)' }}/>}
                      </div>
                      <div className="muted" style={{ fontSize: 12 }}>{r.flat} · {r.role}</div>
                    </div>
                    <div className="muted mono" style={{ fontSize: 12 }}>{r.phone}</div>
                  </div>
                  {i < rs.length - 1 && <div style={{ height: 1, background: 'var(--border)', margin: '0 12px' }}/>}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col center" style={{ padding: 60, alignItems: 'center', gap: 8 }}>
            <div className="muted">No matches</div>
          </div>
        )}
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────
// MAINTENANCE CALENDAR
// ─────────────────────────────────────────────────────────────
function ScreenMaintenance({ onClose }) {
  const d = D();
  return (
    <Sheet title="Maintenance" onClose={onClose} action={<I.Cal size={20}/>}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 18 }}>
        <div className="row between">
          <div className="serif" style={{ fontSize: 28 }}>This week's plan.</div>
        </div>
        <div className="row gap-6" style={{ overflowX: 'auto', margin: '0 -20px', padding: '0 20px' }}>
          {d.maintenanceEvents.map((e, i) => (
            <div key={i} className="col gap-2" style={{
              minWidth: 56, padding: '12px 10px',
              background: e.type === 'live' ? 'var(--accent-soft)' : 'var(--surface)',
              border: '1px solid ' + (e.type === 'live' ? 'var(--accent)' : 'var(--border)'),
              borderRadius: 12, alignItems: 'center'
            }}>
              <div className="t-cap" style={{ fontSize: 10 }}>{e.day.split(' ')[0]}</div>
              <div className="serif" style={{ fontSize: 22 }}>{e.day.split(' ')[1]}</div>
            </div>
          ))}
        </div>
        <div className="col gap-10">
          {d.maintenanceEvents.map((e, i) => (
            <div key={i} className="card row gap-12" style={{ borderColor: e.type === 'live' ? 'var(--accent)' : 'var(--border)' }}>
              <div className={`ring-glow ${e.type === 'live' ? '' : 'info'}`}>
                <I.Wrench size={20}/>
              </div>
              <div className="col gap-2" style={{ flex: 1 }}>
                <div className="row gap-6">
                  <div className="t-h">{e.title}</div>
                  {e.type === 'live' && <span className="chip" style={{ background: 'var(--bad-soft)', color: 'var(--bad)', border: 0, fontSize: 10 }}>
                    <span className="dot pulsing" style={{ background: 'var(--bad)' }}/> live
                  </span>}
                </div>
                <div className="muted" style={{ fontSize: 12 }}>{e.day} · {e.time}</div>
                <div className="muted" style={{ fontSize: 12 }}>{e.where} · by {e.by}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────
// SECURITY LOG
// ─────────────────────────────────────────────────────────────
function ScreenSecurity({ onClose }) {
  const d = D();
  return (
    <Sheet title="Security" onClose={onClose}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 18 }}>
        <div className="card-2 col gap-10" style={{ padding: 18 }}>
          <div className="row between">
            <div className="t-cap">Today</div>
            <div className="chip good"><span className="dot pulsing" style={{ background: 'var(--good)' }}/> 3 guards on duty</div>
          </div>
          <div className="row gap-16" style={{ marginTop: 4 }}>
            <div className="col gap-2" style={{ flex: 1 }}>
              <div className="t-num" style={{ fontSize: 28 }}>14</div>
              <div className="t-cap">visitors</div>
            </div>
            <div className="col gap-2" style={{ flex: 1 }}>
              <div className="t-num" style={{ fontSize: 28 }}>22</div>
              <div className="t-cap">vehicles</div>
            </div>
            <div className="col gap-2" style={{ flex: 1 }}>
              <div className="t-num" style={{ fontSize: 28 }}>1</div>
              <div className="t-cap">incident</div>
            </div>
          </div>
        </div>

        <div className="col gap-10">
          <div className="t-cap">Live log</div>
          {d.securityFeed.map(s => (
            <div key={s.id} className="card row gap-12">
              <div className={`ring-glow ${s.tone === 'warn' ? 'warn' : 'good'}`}>
                {s.kind === 'visitor' && <I.User size={18}/>}
                {s.kind === 'vehicle' && <I.Box size={18}/>}
                {s.kind === 'alert' && <I.Shield size={18}/>}
                {s.kind === 'patrol' && <I.Pin size={18}/>}
              </div>
              <div className="col gap-2" style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}>{s.text}</div>
                <div className="muted mono" style={{ fontSize: 11 }}>{s.t}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────
// POLLS
// ─────────────────────────────────────────────────────────────
function ScreenPolls({ onClose }) {
  const d = D();
  const [votes, setVotes] = useSt({});
  const vote = (pid, oi) => {
    if (votes[pid] !== undefined) return;
    setVotes({ ...votes, [pid]: oi });
  };
  return (
    <Sheet title="Polls" onClose={onClose}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 18 }}>
        <div className="serif" style={{ fontSize: 28 }}>Decide together.</div>
        {d.polls.map(p => {
          const voted = votes[p.id];
          const newTotal = p.total + (voted !== undefined ? 1 : 0);
          return (
            <div key={p.id} className="card col gap-14">
              <div className="row between">
                <div className="t-cap">closes {p.closes}</div>
                <div className="chip">{newTotal} votes</div>
              </div>
              <div className="serif" style={{ fontSize: 22, lineHeight: 1.2 }}>{p.q}</div>
              <div className="col gap-8">
                {p.options.map((o, oi) => {
                  const v = o.v + (voted === oi ? 1 : 0);
                  const pct = Math.round((v / newTotal) * 100);
                  const isMine = voted === oi;
                  return (
                    <div key={oi} onClick={() => vote(p.id, oi)}
                         style={{
                           position: 'relative', overflow: 'hidden',
                           border: '1px solid ' + (isMine ? 'var(--accent)' : 'var(--border-2)'),
                           background: 'var(--surface-2)',
                           borderRadius: 12, padding: '12px 14px',
                           cursor: voted === undefined ? 'pointer' : 'default'
                         }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: isMine ? 'var(--accent-soft)' : 'var(--surface-3)',
                        width: voted !== undefined ? pct + '%' : '0%',
                        transition: 'width 600ms cubic-bezier(.2,.8,.2,1)',
                        opacity: 0.85
                      }}/>
                      <div className="row between" style={{ position: 'relative' }}>
                        <div className="row gap-8">
                          {voted !== undefined && isMine && <I.Check size={16} style={{ color: 'var(--accent)' }}/>}
                          <span style={{ fontSize: 14 }}>{o.l}</span>
                        </div>
                        {voted !== undefined && <span className="t-num" style={{ fontSize: 16 }}>{pct}%</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              {voted === undefined && <div className="muted" style={{ fontSize: 12 }}>Tap an option to cast your vote.</div>}
              {voted !== undefined && <div className="muted" style={{ fontSize: 12 }}>Vote recorded · committee notified</div>}
            </div>
          );
        })}
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────
// LOST & FOUND
// ─────────────────────────────────────────────────────────────
function ScreenLostFound({ onClose }) {
  const d = D();
  const [tab, setTab] = useSt('all');
  const items = tab === 'all' ? d.lostFound : d.lostFound.filter(i => i.kind === tab);
  return (
    <Sheet title="Lost & found" onClose={onClose} action={<I.Plus size={20}/>}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 16 }}>
        <div className="serif" style={{ fontSize: 28 }}>Find your way back.</div>
        <div className="seg">
          <button className={tab === 'all' ? 'on' : ''} onClick={() => setTab('all')}>All</button>
          <button className={tab === 'lost' ? 'on' : ''} onClick={() => setTab('lost')}>Lost</button>
          <button className={tab === 'found' ? 'on' : ''} onClick={() => setTab('found')}>Found</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {items.map(it => (
            <div key={it.id} className="card col gap-10" style={{ padding: 12 }}>
              <div className="imgph" style={{ height: 110 }}>{it.kind}</div>
              <div className="col gap-2">
                <div className="row gap-6">
                  <div className={'chip ' + (it.kind === 'found' ? 'good' : 'warn')} style={{ fontSize: 10, padding: '2px 8px' }}>
                    {it.kind}
                  </div>
                </div>
                <div className="t-h" style={{ fontSize: 14, lineHeight: 1.25, marginTop: 4 }}>{it.title}</div>
                <div className="muted" style={{ fontSize: 11 }}>{it.at} · {it.by}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

// ─────────────────────────────────────────────────────────────
// SUSTAINABILITY
// ─────────────────────────────────────────────────────────────
function ScreenSustainability({ onClose }) {
  const d = D();
  const c = d.consumption;
  return (
    <Sheet title="Sustainability" onClose={onClose}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 18 }}>
        <div className="col gap-6">
          <div className="t-cap" style={{ color: 'var(--good)' }}>· Today</div>
          <div className="serif" style={{ fontSize: 30, lineHeight: 1.05 }}>
            You used <span style={{ color: 'var(--good)' }}>20% less water</span> than yesterday.
          </div>
        </div>

        {/* big ring */}
        <div className="card-2 col gap-14" style={{ padding: 20, alignItems: 'center' }}>
          <ConsumptionRing pct={62} value={c.water.today} unit="L" label="water · today" tone="good"/>
          <div className="row between" style={{ width: '100%', marginTop: 4 }}>
            <div className="col gap-2" style={{ alignItems: 'center', flex: 1 }}>
              <div className="t-num" style={{ fontSize: 20 }}>{c.water.yesterday}</div>
              <div className="t-cap">yesterday</div>
            </div>
            <div style={{ width: 1, background: 'var(--border)' }}/>
            <div className="col gap-2" style={{ alignItems: 'center', flex: 1 }}>
              <div className="t-num" style={{ fontSize: 20 }}>{c.water.weekAvg}</div>
              <div className="t-cap">week avg</div>
            </div>
            <div style={{ width: 1, background: 'var(--border)' }}/>
            <div className="col gap-2" style={{ alignItems: 'center', flex: 1 }}>
              <div className="t-num" style={{ fontSize: 20, color: 'var(--good)' }}>−20%</div>
              <div className="t-cap">vs yest.</div>
            </div>
          </div>
        </div>

        {/* Last 7 days */}
        <div className="card col gap-12">
          <div className="row between">
            <div className="t-cap">Last 7 days · L</div>
            <div className="chip good">trending down</div>
          </div>
          <ColumnChart data={c.trend} highlight={c.trend.length - 1} color="good"/>
        </div>

        {/* Two tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card col gap-8">
            <div className="ring-glow warn" style={{ width: 36, height: 36, borderRadius: 10 }}><I.Bolt size={18}/></div>
            <div className="t-h">Power</div>
            <div className="t-num" style={{ fontSize: 24 }}>{c.power.today}<span style={{ fontSize: 12, color: 'var(--text-2)' }}> kWh</span></div>
            <div className="muted" style={{ fontSize: 11 }}>−15% vs yesterday</div>
          </div>
          <div className="card col gap-8">
            <div className="ring-glow good" style={{ width: 36, height: 36, borderRadius: 10 }}><I.Trash size={18}/></div>
            <div className="t-h">Waste</div>
            <div className="t-num" style={{ fontSize: 24 }}>{c.waste.today}<span style={{ fontSize: 12, color: 'var(--text-2)' }}> kg</span></div>
            <div className="muted" style={{ fontSize: 11 }}>−14% vs yesterday</div>
          </div>
        </div>

        {/* Society tips */}
        <div className="card col gap-10">
          <div className="t-cap">Society-wide tip</div>
          <div className="serif" style={{ fontSize: 20, lineHeight: 1.25 }}>
            Switching geysers to 6 AM cuts collective power by ~ 8%.
          </div>
        </div>
      </div>
    </Sheet>
  );
}

function ConsumptionRing({ pct, value, unit, label, tone = 'accent' }) {
  const R = 64, sw = 12, C = 2 * Math.PI * R;
  const len = (pct / 100) * C;
  return (
    <div style={{ position: 'relative', width: 170, height: 170 }}>
      <svg viewBox="-85 -85 170 170" style={{ width: 170, height: 170, transform: 'rotate(-90deg)' }}>
        <circle r={R} fill="none" stroke="var(--surface-3)" strokeWidth={sw}/>
        <circle r={R} fill="none" stroke={`var(--${tone})`} strokeWidth={sw}
                strokeLinecap="round"
                strokeDasharray={`${len} ${C}`}
                style={{ transition: 'stroke-dasharray 800ms cubic-bezier(.2,.8,.2,1)' }}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="t-num" style={{ fontSize: 40, lineHeight: 1 }}>{value}</div>
        <div className="muted" style={{ fontSize: 12 }}>{unit}</div>
        <div className="t-cap" style={{ marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HEATMAP — building view
// ─────────────────────────────────────────────────────────────
function ScreenHeatmap({ onClose }) {
  const d = D();
  const [sel, setSel] = useSt(null);

  // generate stable per-flat status
  const flats = useMm(() => {
    const out = [];
    const towers = d.buildings;
    for (const t of towers) {
      const floors = [];
      for (let f = 18; f >= 1; f--) {
        const row = [];
        for (let n = 1; n <= 4; n++) {
          const seed = (t.charCodeAt(0) * 31 + f * 7 + n) % 100;
          let s = 'on';
          if (['A','B','C'].includes(t) && seed < 80) s = 'off';
          else if (seed < 8) s = 'off';
          else if (seed < 16) s = 'partial';
          row.push({ t, f, n, s, id: `${t}-${String(f).padStart(2,'0')}0${n}` });
        }
        floors.push(row);
      }
      out.push({ tower: t, floors });
    }
    return out;
  }, []);

  return (
    <Sheet title="Outage map" onClose={onClose} action={<I.Refresh size={18}/>}>
      <div className="col" style={{ padding: '4px 20px 40px', gap: 18 }}>
        <div className="col gap-6">
          <div className="t-cap" style={{ color: 'var(--bad)' }}>· Live</div>
          <div className="serif" style={{ fontSize: 26, lineHeight: 1.1 }}>
            Water outage across <span style={{ color: 'var(--bad)' }}>Towers A, B & C</span>
          </div>
        </div>

        <div className="row gap-10" style={{ fontSize: 12 }}>
          <div className="row gap-6"><span className="dot" style={{ background: 'var(--good)' }}/> Active</div>
          <div className="row gap-6"><span className="dot" style={{ background: 'var(--warn)' }}/> Partial</div>
          <div className="row gap-6"><span className="dot" style={{ background: 'var(--bad)' }}/> Outage</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {flats.map(b => (
            <div key={b.tower} className="card col gap-8" style={{ padding: 10 }}>
              <div className="row between">
                <div className="t-h">Tower {b.tower}</div>
                <div className="muted" style={{ fontSize: 11 }}>{b.floors.length} fl</div>
              </div>
              <div className="col gap-3">
                {b.floors.map((row, fi) => (
                  <div key={fi} className="row gap-3">
                    {row.map(c => (
                      <div key={c.id}
                           onClick={() => setSel(c)}
                           className={`heatmap-cell ${c.s === 'on' ? 'on' : c.s === 'off' ? 'off' : 'partial'} ${sel?.id === c.id ? 'selected' : ''}`}
                           style={{ flex: 1, minHeight: 7 }}/>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {sel && (
          <div className="card col gap-8 slide-up">
            <div className="row between">
              <div className="t-h">Flat {sel.id}</div>
              <div className={`chip ${sel.s === 'on' ? 'good' : sel.s === 'off' ? 'bad' : 'warn'}`}>
                {sel.s === 'on' ? 'water active' : sel.s === 'off' ? 'no water' : 'low pressure'}
              </div>
            </div>
            <div className="muted" style={{ fontSize: 12 }}>
              {sel.s === 'on'
                ? 'Receiving normal supply from overhead tank.'
                : sel.s === 'off'
                  ? 'Affected by Cauvery valve failure. ETA 6:30 PM.'
                  : 'Tail-end pressure drop. Will normalise post-fix.'}
            </div>
          </div>
        )}
      </div>
    </Sheet>
  );
}

Object.assign(window, {
  Sheet,
  ScreenServiceDetail, ScreenReport, ScreenInsights, ScreenDirectory,
  ScreenMaintenance, ScreenSecurity, ScreenPolls, ScreenLostFound,
  ScreenSustainability, ScreenHeatmap,
});
