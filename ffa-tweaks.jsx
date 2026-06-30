// ffa-tweaks.jsx — Tweaks panel for TataPower FFA

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "activityDepth": "4 levels",
  "tableDensity":  "compact",
  "showWeightage": true,
  "showActIDs":    true,
  "sidebarColor":  "#0C1D56"
}/*EDITMODE-END*/;

function FFATweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    window.ffaTweaks = t;
    document.dispatchEvent(new CustomEvent('tweaksChanged', { detail: t }));
  }, [t]);

  return (
    <TweaksPanel title="FFA Tweaks">

      <TweakSection label="Activity Hierarchy" />
      <TweakRadio
        label="Nesting depth"
        value={t.activityDepth}
        options={['2 levels', '3 levels', '4 levels']}
        onChange={v => setTweak('activityDepth', v)}
      />

      <TweakSection label="Columns" />
      <TweakToggle
        label="Show weightage %"
        value={t.showWeightage}
        onChange={v => setTweak('showWeightage', v)}
      />
      <TweakToggle
        label="Show activity IDs"
        value={t.showActIDs}
        onChange={v => setTweak('showActIDs', v)}
      />

      <TweakSection label="Display" />
      <TweakRadio
        label="Row density"
        value={t.tableDensity}
        options={['compact', 'comfortable']}
        onChange={v => setTweak('tableDensity', v)}
      />

      <TweakSection label="Theme" />
      <TweakColor
        label="Sidebar color"
        value={t.sidebarColor}
        options={['#0C1D56', '#1B3A3A', '#2A1040', '#1A2E10']}
        onChange={v => setTweak('sidebarColor', v)}
      />

    </TweaksPanel>
  );
}

const _tweaksRoot = document.getElementById('tweaks-root');
if (_tweaksRoot) ReactDOM.createRoot(_tweaksRoot).render(<FFATweaks />);
