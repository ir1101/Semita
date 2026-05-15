// Semita — App shell: routing, tabs, theme, tweaks
const { useState: useState_, useEffect: useEffect_, useMemo: useMemo_ } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "showTweaksHint": true
}/*EDITMODE-END*/;

function Tweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Appearance">
        <TweakRadio
          label="Theme"
          value={tweaks.theme}
          onChange={(v) => setTweak('theme', v)}
          options={[{value:'light',label:'Light'},{value:'dark',label:'Dark'}]}/>
      </TweakSection>
      <TweakSection title="Demo">
        <TweakButton label="Reset prototype state" onClick={() => {
          localStorage.removeItem('semita.state');
          location.reload();
        }}/>
      </TweakSection>
    </TweaksPanel>
  );
}

function TabBar({ tab, setTab, onPlus }) {
  const tabs = [
    { k: 'home',   l: 'Home',    Ic: I.Home },
    { k: 'pulse',  l: 'Pulse',   Ic: I.Pulse },
    { k: 'plus',   l: '',        Ic: I.Plus, fab: true },
    { k: 'wallet', l: 'Wallet',  Ic: I.Wallet },
    { k: 'me',     l: 'Me',      Ic: I.User },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => t.fab ? (
        <div key={t.k} className="tab" style={{ flex: 0 }}>
          <div className="fab" onClick={onPlus}>
            <I.Plus size={22}/>
          </div>
        </div>
      ) : (
        <div key={t.k} className={'tab' + (tab === t.k ? ' active' : '')} onClick={() => setTab(t.k)}>
          <t.Ic size={22}/>
          <span className="tab-label">{t.l}</span>
          <span className="tab-dot"/>
        </div>
      ))}
    </div>
  );
}

function App() {
  // Theme tweaks
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Auth state — start on splash → onboard → login → app
  // Persist in localStorage so a refresh stays where you were
  const [stage, setStage_] = useState_(() => localStorage.getItem('semita.stage') || 'splash');
  const setStage = (s) => { localStorage.setItem('semita.stage', s); setStage_(s); };

  const [tab, setTab_] = useState_(() => localStorage.getItem('semita.tab') || 'home');
  const setTab = (s) => { localStorage.setItem('semita.tab', s); setTab_(s); };

  // Sheet route — service detail, report, etc.
  const [sheet, setSheet] = useState_(null);

  // Persistent demo state
  const [bills, setBills] = useState_(() => {
    const s = localStorage.getItem('semita.bills');
    return s ? JSON.parse(s) : window.SEMITA_DATA.bills;
  });
  useEffect_(() => { localStorage.setItem('semita.bills', JSON.stringify(bills)); }, [bills]);

  // Apply theme
  useEffect_(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme || 'dark');
  }, [tweaks.theme]);

  const go = (target) => {
    if (target.startsWith('service:')) setSheet(target);
    else if (target === 'home')   { setTab('home'); setSheet(null); }
    else if (target === 'pulse')  { setTab('pulse'); setSheet(null); }
    else if (target === 'wallet') { setTab('wallet'); setSheet(null); }
    else if (target === 'me')     { setTab('me'); setSheet(null); }
    else setSheet(target);
  };

  const onLogout = () => {
    localStorage.removeItem('semita.stage');
    localStorage.removeItem('semita.tab');
    setStage('splash'); setTab('home'); setSheet(null);
  };

  // Pre-auth flow
  if (stage === 'splash') {
    return <Frame theme={tweaks.theme}>
      <Splash onContinue={() => setStage('onboard')}/>
    </Frame>;
  }
  if (stage === 'onboard') {
    return <Frame theme={tweaks.theme}>
      <Onboarding onDone={() => setStage('login')}/>
    </Frame>;
  }
  if (stage === 'login') {
    return <Frame theme={tweaks.theme}>
      <Login onDone={() => setStage('app')}/>
    </Frame>;
  }

  // App
  return (
    <Frame theme={tweaks.theme}>
      <div className="app-root">
        {/* Status bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <IOSStatusBar dark={tweaks.theme === 'dark'}/>
        </div>

        {/* Tab content */}
        <div className="scroll" key={tab}>
          {tab === 'home'   && <ScreenHome go={go}/>}
          {tab === 'pulse'  && <ScreenPulse go={go}/>}
          {tab === 'wallet' && <ScreenWallet go={go} billsState={bills} setBillsState={setBills}/>}
          {tab === 'me'     && <ScreenMe go={go} theme={tweaks.theme} setTheme={(v) => setTweak('theme', v)} onLogout={onLogout}/>}
        </div>

        <TabBar tab={tab} setTab={(t) => { setTab(t); setSheet(null); }} onPlus={() => setSheet('report')}/>

        {/* Sheets */}
        {sheet?.startsWith('service:') && (
          <ScreenServiceDetail serviceKey={sheet.split(':')[1]} onClose={() => setSheet(null)} go={go}/>
        )}
        {sheet === 'report'         && <ScreenReport onClose={() => setSheet(null)}/>}
        {sheet === 'insights'       && <ScreenInsights onClose={() => setSheet(null)}/>}
        {sheet === 'directory'      && <ScreenDirectory onClose={() => setSheet(null)}/>}
        {sheet === 'maintenance'    && <ScreenMaintenance onClose={() => setSheet(null)}/>}
        {sheet === 'security'       && <ScreenSecurity onClose={() => setSheet(null)}/>}
        {sheet === 'polls'          && <ScreenPolls onClose={() => setSheet(null)}/>}
        {sheet === 'lostfound'      && <ScreenLostFound onClose={() => setSheet(null)}/>}
        {sheet === 'sustainability' && <ScreenSustainability onClose={() => setSheet(null)}/>}
        {sheet === 'heatmap'        && <ScreenHeatmap onClose={() => setSheet(null)}/>}
      </div>

      <Tweaks tweaks={tweaks} setTweak={setTweak}/>
    </Frame>
  );
}

function Frame({ children, theme }) {
  return (
    <div className="stage">
      <IOSDevice width={402} height={874} dark={theme === 'dark'}>
        {children}
      </IOSDevice>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);
