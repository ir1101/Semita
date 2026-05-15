// Onboarding + Login flow
const { useState, useEffect, useRef } = React;

function Splash({ onContinue }) {
  return (
    <div className="col" style={{ height: '100%', padding: '80px 28px 40px', justifyContent: 'space-between', background: 'var(--bg)' }}>
      <div className="col gap-12" style={{ paddingTop: 60 }}>
        <div className="t-cap" style={{ color: 'var(--accent)' }}>· RWA OS</div>
        <div className="serif" style={{ fontSize: 78, lineHeight: 0.92, letterSpacing: '-0.03em' }}>Semita.</div>
        <div className="t-body muted" style={{ maxWidth: 280, marginTop: 8 }}>
          One quiet path for everything your neighbourhood depends on.
        </div>
      </div>

      <div style={{ position: 'relative', height: 240, margin: '0 -28px' }}>
        {/* abstract layered ring */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {[0, 1, 2, 3, 4].map((i) =>
          <div key={i} style={{
            position: 'absolute',
            width: 80 + i * 44, height: 80 + i * 44, borderRadius: '50%',
            border: '1px solid var(--border-2)',
            opacity: 1 - i * 0.16,
            animation: `floatRing 6s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`
          }} />
          )}
          <div className="ring-glow" style={{ width: 60, height: 60 }}>
            <I.Spark size={26} />
          </div>
        </div>
        <style>{`
          @keyframes floatRing {
            0%, 100% { transform: scale(1); opacity: var(--o, 1); }
            50% { transform: scale(1.04); }
          }
        `}</style>
      </div>

      <div className="col gap-12">
        <button className="btn primary block" onClick={onContinue}>
          Get started <I.Arrow size={18} />
        </button>
        <div className="t-body muted" style={{ textAlign: 'center', fontSize: 13 }}>
          Verified by your society manager · No spam
        </div>
      </div>
    </div>);

}

const ONBOARD_SLIDES = [
{ cap: '01 · Services',
  title: 'Every utility,\nin one quiet view.',
  body: 'Water, power, garbage, security and maintenance — live status, no scattered groups.',
  visual: 'services' },
{ cap: '02 · Verified',
  title: 'Notifications you\ncan actually trust.',
  body: 'Only your manager and committee can publish alerts. Photos, locations and ETAs are signed.',
  visual: 'verified' },
{ cap: '03 · Insights',
  title: 'Understand how\nthe society runs.',
  body: 'Response times, consumption, recurring issues — surfaced so the RWA can fix them.',
  visual: 'insights' }];


function OnboardVisual({ kind }) {
  if (kind === 'services') {
    const tiles = [
    { i: I.Bolt, l: 'Power', c: 'good' },
    { i: I.Drop, l: 'Water', c: 'bad' },
    { i: I.Trash, l: 'Garbage', c: 'warn' },
    { i: I.Shield, l: 'Security', c: 'good' }];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {tiles.map((t, i) =>
        <div key={i} className="card" style={{ padding: 14, animation: `slideUp 380ms ${i * 70}ms both` }}>
            <div className="row between">
              <div className={`ring-glow ${t.c}`} style={{ width: 36, height: 36, borderRadius: 10 }}>
                <t.i size={18} />
              </div>
              <span className="dot" style={{ background: 'var(--accent)', opacity: 0.6 }} />
            </div>
            <div className="t-h" style={{ marginTop: 16 }}>{t.l}</div>
          </div>
        )}
      </div>);

  }
  if (kind === 'verified') {
    return (
      <div className="col gap-10">
        <div className="card row gap-12" style={{ animation: 'slideUp 380ms 60ms both' }}>
          <div className="ring-glow"><I.Verified size={20} /></div>
          <div className="col gap-4" style={{ flex: 1 }}>
            <div className="t-h">Mgr. Suresh K.</div>
            <div className="t-body muted" style={{ fontSize: 13 }}>Water disruption · Cauvery valve</div>
          </div>
          <div className="chip good">signed</div>
        </div>
        <div className="card row gap-12" style={{ animation: 'slideUp 380ms 160ms both' }}>
          <div className="ring-glow good"><I.Shield size={20} /></div>
          <div className="col gap-4" style={{ flex: 1 }}>
            <div className="t-h">Guard Ravi</div>
            <div className="t-body muted" style={{ fontSize: 13 }}>Gate 2 · visitor turned away</div>
          </div>
          <div className="chip good">signed</div>
        </div>
        <div style={{ height: 6 }} />
        <div className="t-body dim" style={{ fontSize: 13, textAlign: 'center', animation: 'fadeIn 800ms 400ms both' }}>
          — no rumours forwarded —
        </div>
      </div>);

  }
  if (kind === 'insights') {
    return (
      <div className="card col gap-12" style={{ animation: 'slideUp 380ms 60ms both' }}>
        <div className="row between">
          <div className="t-cap">Issues · 30 days</div>
          <div className="chip good">↓ 18%</div>
        </div>
        <svg viewBox="0 0 220 70" style={{ width: '100%', height: 70 }}>
          <path d="M0 50 Q 30 30, 50 35 T 100 32 T 150 22 T 220 18"
          fill="none" stroke="var(--accent)" strokeWidth="1.5" />
          <path d="M0 50 Q 30 30, 50 35 T 100 32 T 150 22 T 220 18 L 220 70 L 0 70 Z"
          fill="var(--accent-soft)" />
          {[0, 50, 100, 150, 220].map((x, i) =>
          <circle key={i} cx={x} cy={[50, 35, 32, 22, 18][i]} r="2.5" fill="var(--accent)" />
          )}
        </svg>
        <div className="row between" style={{ marginTop: 4 }}>
          <div className="col">
            <div className="t-num" style={{ fontSize: 28 }}>2.6<span style={{ fontSize: 14, color: 'var(--text-2)' }}>h</span></div>
            <div className="t-cap">avg response</div>
          </div>
          <div className="col">
            <div className="t-num" style={{ fontSize: 28 }}>89<span style={{ fontSize: 14, color: 'var(--text-2)' }}>%</span></div>
            <div className="t-cap">resolved</div>
          </div>
        </div>
      </div>);

  }
  return null;
}

function Onboarding({ onDone }) {
  const [i, setI] = useState(0);
  const next = () => i < ONBOARD_SLIDES.length - 1 ? setI(i + 1) : onDone();
  const slide = ONBOARD_SLIDES[i];

  return (
    <div className="col" style={{ height: '100%', padding: '72px 28px 40px', justifyContent: 'space-between' }}>
      <div className="row between">
        <div className="t-cap" style={{ color: 'var(--accent)' }}>{slide.cap}</div>
        <button className="btn ghost" style={{ height: 32, padding: '0 10px', fontSize: 13 }} onClick={onDone}>Skip</button>
      </div>

      <div className="col gap-24 fade-in" key={i}>
        <OnboardVisual kind={slide.visual} />
        <div className="serif" style={{ fontSize: 36, lineHeight: 1.05, whiteSpace: 'pre-line' }}>
          {slide.title}
        </div>
        <div className="t-body muted" style={{ maxWidth: 320 }}>{slide.body}</div>
      </div>

      <div className="col gap-16">
        <div className="row gap-6" style={{ justifyContent: 'center' }}>
          {ONBOARD_SLIDES.map((_, k) =>
          <div key={k} style={{
            width: k === i ? 22 : 6, height: 6, borderRadius: 3,
            background: k === i ? 'var(--accent)' : 'var(--border-2)',
            transition: 'all 280ms ease'
          }} />
          )}
        </div>
        <button className="btn primary block" onClick={next}>
          {i < ONBOARD_SLIDES.length - 1 ? 'Continue' : 'Sign in'} <I.Arrow size={18} />
        </button>
      </div>
    </div>);

}

function Login({ onDone }) {
  const [step, setStep] = useState('phone'); // phone -> otp -> verified
  const [phone, setPhone] = useState('98765 43210');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  useEffect(() => {
    if (step === 'otp') setTimeout(() => inputs.current[0]?.focus(), 200);
  }, [step]);

  const setOtpAt = (k, v) => {
    if (!/^\d?$/.test(v)) return;
    const arr = [...otp];arr[k] = v;setOtp(arr);
    if (v && k < 3) inputs.current[k + 1]?.focus();
    if (k === 3 && v) {
      setTimeout(() => setStep('verified'), 350);
      setTimeout(() => onDone(), 1400);
    }
  };

  if (step === 'verified') {
    return (
      <div className="col center" style={{ height: '100%', padding: 28, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          <div className="pulse-ring" style={{ color: 'var(--good)' }} />
          <div className="ring-glow good" style={{ width: 80, height: 80, borderRadius: '50%' }}>
            <I.Check size={36} />
          </div>
        </div>
        <div className="serif" style={{ fontSize: 30 }}>Welcome, Aanya.</div>
        <div className="t-body muted" style={{ textAlign: 'center', maxWidth: 280 }}>
          Verified by Brigade Sanctuary RWA · Flat C-1204
        </div>
      </div>);

  }

  return (
    <div className="col" style={{ height: '100%', padding: '72px 28px 40px', justifyContent: 'space-between' }}>
      <div className="col gap-8">
        <div className="t-cap" style={{ color: 'var(--accent)' }}>· {step === 'phone' ? 'Sign in' : 'Verify'}</div>
        <div className="serif" style={{ fontSize: 36, lineHeight: 1.05, marginTop: 6 }}>
          {step === 'phone' ? 'Use the number\nyour society has\non file.' : 'We sent you\na 4-digit code.'}
        </div>
        <div className="t-body muted" style={{ marginTop: 8 }}>
          {step === 'phone' ?
          'Only verified flats can join. Manager-side approval is automatic when the number matches.' :
          <>Sent to <span style={{ color: 'var(--text)' }}>+91 {phone}</span>. <a style={{ color: 'var(--accent)' }} onClick={() => setStep('phone')}>Edit</a></>}
        </div>
      </div>

      <div className="col gap-16">
        {step === 'phone' ?
        <div className="card row gap-10" style={{ padding: '4px 14px', height: 56 }}>
            <div className="t-h" style={{ color: 'var(--text-2)' }}>🇮🇳 +91</div>
            <div style={{ width: 1, height: 22, background: 'var(--border-2)' }} />
            <input className="input" style={{ background: 'transparent', border: 0, height: 48, padding: 0, fontSize: 19, letterSpacing: 1 }}
          value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98••• •••••" />
          </div> :

        <div className="row gap-10" style={{ justifyContent: 'center' }}>
            {otp.map((v, k) =>
          <input key={k} ref={(el) => inputs.current[k] = el}
          className={'otp-cell' + (v ? ' filled' : '')}
          style={{ outline: 'none', justifyContent: "center", flexDirection: "row", borderWidth: "0px 0.8px 0.8px" }}
          maxLength={1} inputMode="numeric"
          value={v} onChange={(e) => setOtpAt(k, e.target.value)} />
          )}
          </div>
        }

        <button className="btn primary block"
        onClick={() => step === 'phone' ? setStep('otp') : null}
        disabled={step === 'phone' ? phone.length < 5 : otp.some((c) => !c)}>
          {step === 'phone' ? 'Send code' : 'Verify'} <I.Arrow size={18} />
        </button>

        {step === 'otp' &&
        <div className="t-body dim" style={{ textAlign: 'center', fontSize: 13 }}>
            Auto-fill demo: tap any 4 digits — <span className="mono" style={{ color: 'var(--accent)' }}>1·2·3·4</span>
          </div>
        }
      </div>

      <div />
    </div>);

}

Object.assign(window, { Splash, Onboarding, Login });