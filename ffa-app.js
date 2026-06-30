/* ── TataPower FFA · Screen Renderer ─────────────────────── */

// Tweaks state — updated live by ffa-tweaks.jsx
window.ffaTweaks = JSON.parse(localStorage.getItem('ffa_tweaks') || '{"activityDepth":"4 levels","tableDensity":"compact","showWeightage":true,"showActIDs":true,"sidebarColor":"#0C1D56"}');

const TITLES = {
  dashboard:   'Dashboard',
  projects:    'Project Master',
  activities:  'Activities Master',
  vendors:     'Vendor Master',
  'proj-act':  'Project–Activity Mapping',
  'proj-vendor': 'Activity–Vendor Mapping',
  monitoring:  'Progress & MIS Reports',
};

// ── Helpers ───────────────────────────────────────────────────
const chip = (t, c) => `<span class="chip c-${c}">${t}</span>`;
const pct  = (v, cls='pr-bl') =>
  `<span class="pr" style="width:58px"><span class="pr-f ${cls}" style="width:${v}%"></span></span>`;

const statusChip = s => ({
  'Active':     chip('Active', 'g'),
  'Completed':  chip('Completed', 'b'),
  'In Progress':chip('In Progress', 'b'),
  'Planned':    chip('Planned', 'x'),
  'Planning':   chip('Planning', 'y'),
  'Delayed':    chip('Delayed', 'r'),
  'On Hold':    chip('On Hold', 'r'),
  'SAP Linked': chip('SAP Linked', 'b'),
  'Temp':       chip('Temp', 'y'),
  'Inactive':   chip('Inactive', 'x'),
}[s] || chip(s, 'x'));

const svgSearch = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="7" r="4"/><path d="M11 11l3 3" stroke-linecap="round"/></svg>`;
const svgPlus   = `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 3v10M3 8h10"/></svg>`;
const svgInfo   = `<svg viewBox="0 0 16 16" fill="currentColor" opacity=".6"><circle cx="8" cy="8" r="6"/><path d="M8 7v4" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="5.5" r=".8" fill="white"/></svg>`;
const svgWarn   = `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 2l6 12H2L8 2zm0 3.5v3.5m0 2v.5" stroke="none"/></svg>`;

// ── Navigate ──────────────────────────────────────────────────
function navigate(s) {
  document.querySelectorAll('.ni').forEach(el => el.classList.toggle('active', el.dataset.s === s));
  document.getElementById('htitle').textContent = TITLES[s] || s;
  const fns = { dashboard: renderDashboard, projects: renderProjects, activities: renderActivities,
    vendors: renderVendors, 'proj-act': renderProjAct, 'proj-vendor': renderProjVendor, monitoring: renderMonitoring };
  const fn = fns[s];
  if (fn) document.getElementById('content').innerHTML = fn();
  initScreen(s);
}

document.querySelectorAll('.ni').forEach(el => el.addEventListener('click', () => navigate(el.dataset.s)));

// ══════════════════════════════════════════════════════════════
// SCREEN 0 — DASHBOARD
// ══════════════════════════════════════════════════════════════
function renderDashboard() {
  const projects = [
    {id:'TPSSL-RJ-001', name:'Rajasthan Solar Ph.1', type:'Solar PV',  loc:'Rajasthan · North', blk:24, progress:62, prc:'pr-bl', mile:'MMS Erection',   target:'30 Jun 2026', st:'Active'},
    {id:'TPSSL-GJ-002', name:'Gujarat Solar Ph.2',   type:'Solar PV',  loc:'Gujarat · West',    blk:18, progress:45, prc:'pr-or', mile:'Piling Work',     target:'15 Aug 2026', st:'Delayed'},
    {id:'TPSSL-TN-004', name:'Tamil Nadu Solar 3',   type:'Solar PV',  loc:'Tamil Nadu · South',blk:32, progress:78, prc:'pr-gn', mile:'AC Cabling',      target:'10 May 2026', st:'Active'},
    {id:'TPSSL-AP-005', name:'AP BESS Storage',       type:'BESS',      loc:'Andhra Pradesh · S',blk:12, progress:34, prc:'pr-bl', mile:'Foundation Work', target:'20 Sep 2026', st:'Active'},
    {id:'TPSSL-MH-003', name:'Maharashtra Transm.',   type:'Transmission',loc:'Maharashtra · W', blk:'—',progress:12,prc:'pr-or', mile:'Tower Foundation',target:'30 Nov 2026',st:'Planning'},
  ];

  const alerts = [
    ['TPSSL-GJ-002','Piling Block 12',    '2 days late','c-r'],
    ['TPSSL-RJ-001','DC Cabling Blk 8',   'Due Today',  'c-y'],
    ['TPSSL-AP-005','Inverter Pad Blk 3', '3 days late','c-r'],
    ['TPSSL-TN-004','Transformer Erection','On Track',  'c-g'],
    ['TPSSL-MH-003','Tower Survey',        'Scheduled',  'c-x'],
  ];

  const issues = [
    ['Site Access — Block 14','TPSSL-RJ-001','High'],
    ['Material Delay — MMS Frames','TPSSL-GJ-002','High'],
    ['Earthing QC Fail Blk 2','TPSSL-TN-004','Med'],
    ['Vendor Timeline Dispute','TPSSL-AP-005','Low'],
    ['Drawing Approval Pending','TPSSL-MH-003','Med'],
  ];

  return `
<div class="stat-grid">
  <div class="stat">
    <div class="stat-ic" style="background:#EEF2FF">
      <svg viewBox="0 0 16 16" fill="#1D4ED8"><path d="M2 3a1 1 0 011-1h2.5l1 1H13a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V3z"/></svg>
    </div>
    <div>
      <div class="stat-v">12</div>
      <div class="stat-l">Active Projects</div>
      <div class="stat-d" style="color:var(--g)">↑ 2 added this month</div>
    </div>
  </div>
  <div class="stat">
    <div class="stat-ic" style="background:#FEF3C7">
      <svg viewBox="0 0 16 16" fill="#D97706"><path d="M2 4h12v1.5H2zm0 3.5h8v1.5H2zm0 3.5h10v1.5H2z"/></svg>
    </div>
    <div>
      <div class="stat-v">847</div>
      <div class="stat-l">Activities Mapped</div>
      <div class="stat-d" style="color:var(--txt2)">Across 12 projects</div>
    </div>
  </div>
  <div class="stat">
    <div class="stat-ic" style="background:var(--gbg)">
      <svg viewBox="0 0 16 16" fill="#059669"><path d="M8 2a3 3 0 100 6 3 3 0 000-6zM4 11a4 4 0 018 0v2H4v-2z"/></svg>
    </div>
    <div>
      <div class="stat-v">34</div>
      <div class="stat-l">Active Vendors</div>
      <div class="stat-d" style="color:var(--w)">5 Temp IDs pending SAP</div>
    </div>
  </div>
  <div class="stat">
    <div class="stat-ic" style="background:var(--ebg)">
      <svg viewBox="0 0 16 16" fill="#DC2626"><path d="M8 2a6 6 0 110 12A6 6 0 018 2zm0 3v3.5l2 2-.8 1.1L7 9.5V5z"/></svg>
    </div>
    <div>
      <div class="stat-v">23</div>
      <div class="stat-l">Pending QC Checks</div>
      <div class="stat-d" style="color:var(--e)">6 overdue &gt;3 days</div>
    </div>
  </div>
</div>

<div style="display:grid;grid-template-columns:1fr 308px;gap:10px">
  <div class="card">
    <div class="card-h">
      <span class="card-t">Project Progress Overview</span>
      <div style="display:flex;gap:6px;align-items:center">
        <select class="fc fc-sm" style="width:118px">
          <option>All Regions</option><option>North</option><option>West</option><option>South</option>
        </select>
        <button class="btn btn-g btn-sm">View All →</button>
      </div>
    </div>
    <div class="tw" style="border:none;border-radius:0 0 6px 6px">
      <table>
        <thead><tr>
          <th>Project ID</th><th>Name</th><th>Type</th><th>Location</th>
          <th class="t-r">Blks</th><th>Progress</th><th>Current Milestone</th>
          <th>Target Date</th><th>Status</th>
        </tr></thead>
        <tbody>
          ${projects.map(p => `<tr>
            <td class="t-navy">${p.id}</td>
            <td style="font-weight:500">${p.name}</td>
            <td>${chip(p.type,'n')}</td>
            <td style="font-size:11px;color:var(--txt2)">${p.loc}</td>
            <td class="t-r">${p.blk}</td>
            <td style="white-space:nowrap">${pct(p.progress,p.prc)} <span style="font-size:10.5px;color:var(--txt2);margin-left:3px">${p.progress}%</span></td>
            <td style="font-size:11.5px">${p.mile}</td>
            <td style="font-size:11.5px">${p.target}</td>
            <td>${statusChip(p.st)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div style="display:flex;flex-direction:column;gap:10px">
    <div class="card">
      <div class="card-h">
        <span class="card-t">Milestone Alerts</span>
        <span style="font-size:10px;color:var(--e);font-weight:600">3 Overdue</span>
      </div>
      ${alerts.map(([proj,act,due,cls]) => `
      <div style="padding:7px 13px;border-bottom:1px solid var(--bdr2);display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:500;font-size:12px">${act}</div>
          <div style="font-size:10.5px;color:var(--txt2)">${proj}</div>
        </div>
        <span class="chip ${cls}">${due}</span>
      </div>`).join('')}
    </div>

    <div class="card">
      <div class="card-h">
        <span class="card-t">Open Issues</span>
        <span class="chip c-r">5 Open</span>
      </div>
      ${issues.map(([iss,proj,sev]) => `
      <div style="padding:6px 13px;border-bottom:1px solid var(--bdr2);display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:500;font-size:12px">${iss}</div>
          <div style="font-size:10.5px;color:var(--txt2)">${proj}</div>
        </div>
        <span class="chip ${sev==='High'?'c-r':sev==='Med'?'c-y':'c-x'}">${sev}</span>
      </div>`).join('')}
    </div>
  </div>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// SCREEN 1 — PROJECT MASTER
// ══════════════════════════════════════════════════════════════
function renderProjects() {
  const P = [
    {id:'TPSSL-RJ-001',name:'Rajasthan Solar Phase 1',  type:'Solar PV',     region:'Rajasthan',      zone:'North', blk:24, tbl:480, st:'Active',   sap:'WBS-RJ-0023', cap:'200 MWp', dist:'Jodhpur'},
    {id:'TPSSL-GJ-002',name:'Gujarat Solar Phase 2',    type:'Solar PV',     region:'Gujarat',        zone:'West',  blk:18, tbl:360, st:'Active',   sap:'WBS-GJ-0031', cap:'150 MWp', dist:'Kutch'},
    {id:'TPSSL-MH-003',name:'Maharashtra Transmission', type:'Transmission', region:'Maharashtra',    zone:'West',  blk:'—',tbl:'—', st:'Planning', sap:'',             cap:'400 kV',  dist:'Nagpur'},
    {id:'TPSSL-TN-004',name:'Tamil Nadu Solar 3',       type:'Solar PV',     region:'Tamil Nadu',     zone:'South', blk:32, tbl:640, st:'Active',   sap:'WBS-TN-0044', cap:'250 MWp', dist:'Tirunelveli'},
    {id:'TPSSL-AP-005',name:'AP BESS Storage',          type:'BESS',         region:'Andhra Pradesh', zone:'South', blk:12, tbl:'—', st:'Active',   sap:'WBS-AP-0052', cap:'100 MWh', dist:'Kurnool'},
    {id:'TPSSL-RJ-006',name:'Rajasthan Solar Phase 2',  type:'Solar PV',     region:'Rajasthan',      zone:'North', blk:28, tbl:560, st:'Planning', sap:'',             cap:'300 MWp', dist:'Bikaner'},
  ];

  return `
<div class="tb">
  <div class="srch">${svgSearch}<input placeholder="Search projects…"></div>
  <select class="fc fc-sm"><option>All Types</option><option>Solar PV</option><option>Transmission</option><option>BESS</option></select>
  <select class="fc fc-sm"><option>All Regions</option><option>Rajasthan</option><option>Gujarat</option><option>Maharashtra</option><option>Tamil Nadu</option><option>Andhra Pradesh</option></select>
  <select class="fc fc-sm"><option>All Status</option><option>Active</option><option>Planning</option><option>Completed</option></select>
  <span class="sp"></span>
  <button class="btn btn-s btn-sm">Import from SAP</button>
  <button class="btn btn-p btn-sm">${svgPlus} New Project</button>
</div>

<div class="spl">
  <div class="tw">
    <table>
      <thead><tr>
        <th>Project ID</th><th>Project Name</th><th>Type</th><th>Region</th><th>Zone</th>
        <th class="t-r">Blocks</th><th class="t-r">Tables</th>
        <th>Status</th><th>SAP Ref</th><th></th>
      </tr></thead>
      <tbody id="proj-tbody">
        ${P.map((p,i) => `<tr class="${i===0?'sel':''}" data-pi="${i}">
          <td class="t-navy">${p.id}</td>
          <td style="font-weight:500">${p.name}</td>
          <td>${chip(p.type,'n')}</td>
          <td>${p.region}</td><td>${p.zone}</td>
          <td class="t-r">${p.blk}</td><td class="t-r">${p.tbl}</td>
          <td>${statusChip(p.st)}</td>
          <td style="font-size:11px;color:var(--txt2)">${p.sap||'<span class="muted">—</span>'}</td>
          <td style="display:flex;gap:3px;padding:3px 9px">
            <button class="btn btn-g btn-sm">Edit</button>
            <button class="btn btn-g btn-sm">View</button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="dpanel" id="proj-detail">
    <div class="dp-head">
      <span style="font-size:12.5px;font-weight:600;color:var(--navy)">TPSSL-RJ-001</span>
      ${chip('Active','g')}
    </div>
    <div class="dp-sec">
      <div class="dp-sec-t">Project Info</div>
      <div class="dp-row"><span class="dp-k">Name</span><span class="dp-v">Rajasthan Solar Phase 1</span></div>
      <div class="dp-row"><span class="dp-k">Type</span><span class="dp-v">${chip('Solar PV','n')}</span></div>
      <div class="dp-row"><span class="dp-k">Capacity</span><span class="dp-v">200 MWp</span></div>
      <div class="dp-row"><span class="dp-k">EPC Category</span><span class="dp-v">TPSSL EPC</span></div>
    </div>
    <div class="dp-sec">
      <div class="dp-sec-t">Geography</div>
      <div class="dp-row"><span class="dp-k">Region</span><span class="dp-v">Rajasthan</span></div>
      <div class="dp-row"><span class="dp-k">Zone</span><span class="dp-v">North</span></div>
      <div class="dp-row"><span class="dp-k">District</span><span class="dp-v">Jodhpur</span></div>
    </div>
    <div class="dp-sec">
      <div class="dp-sec-t">Project Structure</div>
      <div class="dp-row"><span class="dp-k">Total Blocks</span><span class="dp-v">24</span></div>
      <div class="dp-row"><span class="dp-k">Tables / Block</span><span class="dp-v">20</span></div>
      <div class="dp-row"><span class="dp-k">Total Tables</span><span class="dp-v">480</span></div>
    </div>
    <div class="dp-sec">
      <div class="dp-sec-t">SAP Reference</div>
      <div class="dp-row"><span class="dp-k">WBS Element</span><span class="dp-v mono">WBS-RJ-0023</span></div>
      <div class="dp-row"><span class="dp-k">SAP Project ID</span><span class="dp-v mono">P-00023</span></div>
    </div>
    <div class="dp-sec">
      <div class="dp-sec-t">Block Structure</div>
      ${[1,2,3,4].map(b=>`
      <div style="display:flex;align-items:center;gap:5px;padding:3px 0;font-size:11.5px">
        <svg width="9" height="9" viewBox="0 0 9 9" fill="var(--bdr)"><rect x="0" y="0" width="9" height="9" rx="1.5"/></svg>
        <span>Block ${b}</span>
        <span class="muted" style="font-size:11px">— 20 Tables</span>
      </div>`).join('')}
      <div style="font-size:11px;color:var(--txt3);padding:3px 0 0 14px">… 20 more blocks</div>
    </div>
    <div class="dp-foot">
      <button class="btn btn-p btn-sm" style="flex:1;justify-content:center">Edit Project</button>
      <button class="btn btn-s btn-sm">+ Add Block</button>
    </div>
  </div>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// SCREEN 2 — ACTIVITIES MASTER
// ══════════════════════════════════════════════════════════════
function renderActivities() {
  const tw   = window.ffaTweaks || {};
  const maxL = {'2 levels':1,'3 levels':2,'4 levels':3}[tw.activityDepth||'2 levels'];
  const showWt = tw.showWeightage !== false;
  const showId = tw.showActIDs   !== false;

  const ALL = [
    // ─ DC Work ────────────────────────────────────────────────
    {id:'ACT-001',   name:'DC Work',                    uom:'—',   l:0,cat:'DC Work',      wt:40},
    {id:'ACT-002',   name:'Piling Work',                uom:'No.', l:1,cat:'DC Work',      wt:12},
    {id:'ACT-002-1', name:'Pre-drilling Survey',        uom:'No.', l:2,cat:'DC Work',      wt:3 },
    {id:'ACT-002-2', name:'Pile Driving',               uom:'No.', l:2,cat:'DC Work',      wt:7 },
    {id:'ACT-002-21',name:'Rig Positioning',            uom:'No.', l:3,cat:'DC Work',      wt:2 },
    {id:'ACT-002-22',name:'Pile Boring',                uom:'No.', l:3,cat:'DC Work',      wt:4 },
    {id:'ACT-002-23',name:'Pile Insertion & Check',     uom:'No.', l:3,cat:'DC Work',      wt:1 },
    {id:'ACT-002-3', name:'Post-driving QC',            uom:'No.', l:2,cat:'DC Work',      wt:2 },
    {id:'ACT-003',   name:'MMS Erection',               uom:'No.', l:1,cat:'DC Work',      wt:10},
    {id:'ACT-003-1', name:'Foundation Bolt Setting',    uom:'No.', l:2,cat:'DC Work',      wt:3 },
    {id:'ACT-003-2', name:'Structure Assembly',         uom:'No.', l:2,cat:'DC Work',      wt:5 },
    {id:'ACT-003-3', name:'Torque Tightening',          uom:'No.', l:2,cat:'DC Work',      wt:2 },
    {id:'ACT-004',   name:'Module Installation',        uom:'No.', l:1,cat:'DC Work',      wt:10},
    {id:'ACT-004-1', name:'Module Unboxing & QC',       uom:'No.', l:2,cat:'DC Work',      wt:2 },
    {id:'ACT-004-2', name:'Module Placement',           uom:'No.', l:2,cat:'DC Work',      wt:6 },
    {id:'ACT-004-21',name:'Row Assignment',             uom:'No.', l:3,cat:'DC Work',      wt:1 },
    {id:'ACT-004-22',name:'Panel Lifting & Setting',    uom:'No.', l:3,cat:'DC Work',      wt:3 },
    {id:'ACT-004-23',name:'Alignment & Levelness QC',  uom:'No.', l:3,cat:'DC Work',      wt:2 },
    {id:'ACT-004-3', name:'Clamp Fixing',               uom:'No.', l:2,cat:'DC Work',      wt:2 },
    {id:'ACT-005',   name:'DC Cabling',                 uom:'m',   l:1,cat:'DC Work',      wt:5 },
    {id:'ACT-005-1', name:'Cable Tray Laying',          uom:'m',   l:2,cat:'DC Work',      wt:2 },
    {id:'ACT-005-2', name:'Cable Pulling',              uom:'m',   l:2,cat:'DC Work',      wt:2 },
    {id:'ACT-005-3', name:'Termination & Crimping',     uom:'No.', l:2,cat:'DC Work',      wt:1 },
    {id:'ACT-006',   name:'Earthing & Bonding',         uom:'m',   l:1,cat:'DC Work',      wt:3 },
    // ─ Civil Work ─────────────────────────────────────────────
    {id:'ACT-007',   name:'Civil Work',                 uom:'—',   l:0,cat:'Civil Work',   wt:25},
    {id:'ACT-008',   name:'Road & Grading',             uom:'m',   l:1,cat:'Civil Work',   wt:6 },
    {id:'ACT-008-1', name:'Sub-base Preparation',       uom:'m',   l:2,cat:'Civil Work',   wt:3 },
    {id:'ACT-008-2', name:'Metalling & Compaction',     uom:'m',   l:2,cat:'Civil Work',   wt:3 },
    {id:'ACT-009',   name:'Fencing',                    uom:'m',   l:1,cat:'Civil Work',   wt:7 },
    {id:'ACT-009-1', name:'Pole Erection',              uom:'No.', l:2,cat:'Civil Work',   wt:3 },
    {id:'ACT-009-2', name:'Wire Mesh Fixing',           uom:'m',   l:2,cat:'Civil Work',   wt:4 },
    {id:'ACT-010',   name:'Control Room Constr.',       uom:'sqm', l:1,cat:'Civil Work',   wt:8 },
    {id:'ACT-010-1', name:'Foundation & Plinth',        uom:'sqm', l:2,cat:'Civil Work',   wt:3 },
    {id:'ACT-010-2', name:'Brick Masonry & Plastering', uom:'sqm', l:2,cat:'Civil Work',   wt:4 },
    {id:'ACT-010-3', name:'Roofing & Flooring',         uom:'sqm', l:2,cat:'Civil Work',   wt:1 },
    {id:'ACT-011',   name:'Inverter Pad',               uom:'No.', l:1,cat:'Civil Work',   wt:4 },
    {id:'ACT-011-1', name:'Pad Concreting',             uom:'No.', l:2,cat:'Civil Work',   wt:2 },
    {id:'ACT-011-2', name:'Anchor Bolt Setting',        uom:'No.', l:2,cat:'Civil Work',   wt:2 },
    // ─ AC Work ────────────────────────────────────────────────
    {id:'ACT-012',   name:'AC Work',                    uom:'—',   l:0,cat:'AC Work',      wt:20},
    {id:'ACT-013',   name:'Inverter Installation',      uom:'No.', l:1,cat:'AC Work',      wt:6 },
    {id:'ACT-013-1', name:'Foundation Check',           uom:'No.', l:2,cat:'AC Work',      wt:1 },
    {id:'ACT-013-2', name:'Inverter Placement',         uom:'No.', l:2,cat:'AC Work',      wt:3 },
    {id:'ACT-013-3', name:'Cable Connection',           uom:'No.', l:2,cat:'AC Work',      wt:2 },
    {id:'ACT-014',   name:'AC Cabling',                 uom:'m',   l:1,cat:'AC Work',      wt:7 },
    {id:'ACT-014-1', name:'HT Cable Laying',            uom:'m',   l:2,cat:'AC Work',      wt:3 },
    {id:'ACT-014-2', name:'LT Cable Laying',            uom:'m',   l:2,cat:'AC Work',      wt:3 },
    {id:'ACT-014-3', name:'Terminations',               uom:'No.', l:2,cat:'AC Work',      wt:1 },
    {id:'ACT-015',   name:'Transformer Erection',       uom:'No.', l:1,cat:'AC Work',      wt:7 },
    {id:'ACT-015-1', name:'Transformer Offloading',     uom:'No.', l:2,cat:'AC Work',      wt:2 },
    {id:'ACT-015-2', name:'Erection & Positioning',     uom:'No.', l:2,cat:'AC Work',      wt:3 },
    {id:'ACT-015-3', name:'Oil Filling & Testing',      uom:'No.', l:2,cat:'AC Work',      wt:2 },
    // ─ Transmission ───────────────────────────────────────────
    {id:'ACT-016',   name:'Transmission Line',          uom:'—',   l:0,cat:'Transmission', wt:15},
    {id:'ACT-017',   name:'Tower Foundation',           uom:'No.', l:1,cat:'Transmission', wt:5 },
    {id:'ACT-017-1', name:'Excavation',                 uom:'cum', l:2,cat:'Transmission', wt:2 },
    {id:'ACT-017-2', name:'Concreting',                 uom:'cum', l:2,cat:'Transmission', wt:3 },
    {id:'ACT-018',   name:'Tower Erection',             uom:'No.', l:1,cat:'Transmission', wt:5 },
    {id:'ACT-018-1', name:'Member Assembly',            uom:'No.', l:2,cat:'Transmission', wt:3 },
    {id:'ACT-018-2', name:'Bolt Tightening',            uom:'No.', l:2,cat:'Transmission', wt:2 },
    {id:'ACT-019',   name:'Conductor Stringing',        uom:'km',  l:1,cat:'Transmission', wt:5 },
    {id:'ACT-019-1', name:'Pilot Wire Pulling',         uom:'km',  l:2,cat:'Transmission', wt:2 },
    {id:'ACT-019-2', name:'Conductor Stringing (Main)', uom:'km',  l:2,cat:'Transmission', wt:3 },
  ];

  const A = ALL.filter(a => a.l <= maxL);

  const levelLabel = l => ['L0 — Group','L1 — Task','L2 — Sub-task','L3 — Step'][l] || `L${l}`;
  const indent = a => {
    if (a.l === 0) return `<svg width="10" height="10" viewBox="0 0 10 10" fill="var(--navy)" style="margin-right:5px;vertical-align:middle;opacity:.5"><rect x="0" y="2" width="10" height="1.5" rx=".5"/><rect x="0" y="4.3" width="10" height="1.5" rx=".5"/><rect x="0" y="6.5" width="10" height="1.5" rx=".5"/></svg>`;
    const pad = (a.l - 1) * 16;
    return `<span style="display:inline-block;width:${pad}px"></span><span style="color:var(--txt3);margin-right:4px;font-size:10.5px">└</span>`;
  };

  return `
<div class="tabs" id="act-tabs" style="margin-bottom:0">
  ${['All','DC Work','Civil Work','AC Work','Transmission'].map((c,i)=>
    `<div class="tab ${i===0?'active':''}" data-cat="${c}">${c}</div>`).join('')}
</div>
<div class="tw" style="border-top:none;border-radius:0 0 6px 6px">
  <div style="padding:8px 10px;display:flex;gap:7px;align-items:center;border-bottom:1px solid var(--bdr2)">
    <div class="srch">${svgSearch}<input placeholder="Search activities…" id="act-search"></div>
    <span class="sp"></span>
    <span style="font-size:11px;color:var(--txt2)">Drag to reorder &nbsp;·&nbsp; <strong>${A.length}</strong> activities &nbsp;·&nbsp; depth: ${maxL===1?'L0→L1':maxL===2?'L0→L2':'L0→L3'}</span>
    <button class="btn btn-s btn-sm">Configure UoM</button>
    <button class="btn btn-p btn-sm">${svgPlus} Add Activity</button>
  </div>
  <table>
    <thead><tr>
      <th style="width:30px"></th>
      <th>Activity Name</th>
      ${showId ? '<th>Activity ID</th>' : ''}
      <th>Category</th>
      <th>UoM</th>
      <th>Level</th>
      ${showWt ? '<th class="t-r">Weightage %</th>' : ''}
      <th>Status</th>
      <th>Actions</th>
    </tr></thead>
    <tbody id="act-tbody">
      ${A.map(a => `<tr class="l${a.l}" draggable="true" data-id="${a.id}" data-cat="${a.cat}">
        <td><span class="drag-h">⠿⠿</span></td>
        <td>${indent(a)}${a.name}</td>
        ${showId ? `<td class="mono" style="font-size:10.5px;color:var(--txt2)">${a.id}</td>` : ''}
        <td>${chip(a.cat,'n')}</td>
        <td><span class="mono">${a.uom}</span></td>
        <td><span class="chip c-x" style="font-size:9.5px">${levelLabel(a.l)}</span></td>
        ${showWt ? `<td class="t-r">${a.wt}%</td>` : ''}
        <td>${chip('Active','g')}</td>
        <td style="display:flex;gap:3px;padding:3px 9px">
          <button class="btn btn-g btn-sm">Edit</button>
          ${a.l < maxL ? `<button class="btn btn-g btn-sm">+ Sub-task</button>` : ''}
        </td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// SCREEN 3 — VENDOR MASTER
// ══════════════════════════════════════════════════════════════
function renderVendors() {
  const V = [
    {id:'V-001',name:'M/s Electrocraft Solutions', sap:'SAP-4500123',type:'Contractor',    cats:'DC Work, Civil Work',     contact:'Suresh Patil',   st:'Active'},
    {id:'V-002',name:'M/s SolarBuild Infra',       sap:'SAP-4500089',type:'Contractor',    cats:'DC Work',                 contact:'Ramesh Kumar',   st:'SAP Linked'},
    {id:'V-003',name:'M/s PowerTech Contractors',  sap:'TEMP-0031',  type:'Subcontractor', cats:'AC Work',                 contact:'Ajay Sharma',    st:'Temp'},
    {id:'V-004',name:'M/s GreenWatt EPC',          sap:'SAP-4500156',type:'Contractor',    cats:'AC Work, Transmission',   contact:'Priya Nair',     st:'Active'},
    {id:'V-005',name:'M/s Sahara Infra Works',     sap:'TEMP-0044',  type:'Subcontractor', cats:'Civil Work',              contact:'Deepak Rao',     st:'Temp'},
    {id:'V-006',name:'M/s Apex Electrical',        sap:'SAP-4500198',type:'Contractor',    cats:'AC Work',                 contact:'Vikram Singh',   st:'Active'},
    {id:'V-007',name:'M/s Northern Grid Services', sap:'SAP-4500211',type:'Contractor',    cats:'Transmission',            contact:'Mohan Das',      st:'SAP Linked'},
  ];

  return `
<div class="tb">
  <div class="srch">${svgSearch}<input placeholder="Search vendors…"></div>
  <select class="fc fc-sm"><option>All Status</option><option>Active</option><option>SAP Linked</option><option>Temp</option></select>
  <select class="fc fc-sm"><option>All Types</option><option>Contractor</option><option>Subcontractor</option></select>
  <span class="sp"></span>
  <button class="btn btn-s btn-sm">
    <svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11"><path d="M8 2a3 3 0 100 6 3 3 0 000-6zm-2 7a4 4 0 00-4 4h12a4 4 0 00-4-4H6z"/></svg>
    Create Temp ID
  </button>
  <button class="btn btn-p btn-sm">${svgPlus} Add Vendor</button>
</div>

<div class="info-bar info-yell">
  ${svgWarn}
  <span><strong>2 Temp vendors</strong> (TEMP-0031, TEMP-0044) have pending SAP ID linkage. Update once SAP IDs are allocated to enable full workflow integration.</span>
</div>

<div class="tw">
  <table>
    <thead><tr>
      <th>Vendor ID</th><th>Vendor Name</th><th>SAP / Temp ID</th><th>Type</th>
      <th>Work Categories</th><th>Contact Person</th><th>Status</th><th>Actions</th>
    </tr></thead>
    <tbody>
      ${V.map(v=>`<tr>
        <td class="t-navy">${v.id}</td>
        <td style="font-weight:500">${v.name}</td>
        <td>
          <span class="mono" style="color:${v.sap.startsWith('TEMP')?'var(--w)':'var(--txt2)'}">${v.sap}</span>
          ${v.sap.startsWith('TEMP')?`<span class="chip c-y" style="margin-left:4px;font-size:9px">Temp</span>`:''}
        </td>
        <td>${chip(v.type,'x')}</td>
        <td style="font-size:11.5px;color:var(--txt2)">${v.cats}</td>
        <td style="font-size:11.5px">${v.contact}</td>
        <td>${statusChip(v.st)}</td>
        <td style="display:flex;gap:3px;padding:3px 9px">
          <button class="btn btn-g btn-sm">Edit</button>
          ${v.st==='Temp'?`<button class="btn btn-g btn-sm" style="color:var(--g)">Link SAP</button>`:''}
          <button class="btn btn-g btn-sm">View</button>
        </td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// SCREEN 4 — PROJECT–ACTIVITY MAPPING
// ══════════════════════════════════════════════════════════════
function renderProjAct() {
  const tw = window.ffaTweaks || {};
  const maxL = {'2 levels':1,'3 levels':2,'4 levels':3}[tw.activityDepth||'2 levels'];

  const ALL = [
    // ─ DC Work ──────────────────────────────────────────────
    {n:'DC Work',                  id:'ACT-001',   uom:'—',   sc:'—',       wt:40, sd:'',           ed:'',           pre:'—',               st:'Active',     l:0},
    {n:'Piling Work',              id:'ACT-002',   uom:'No.', sc:'9,600',   wt:12, sd:'01-Feb-2026', ed:'30-Mar-2026',pre:'—',               st:'Completed',  l:1},
    {n:'Pre-drilling Survey',      id:'ACT-002-1', uom:'No.', sc:'9,600',   wt:3,  sd:'01-Feb-2026', ed:'10-Feb-2026',pre:'—',               st:'Completed',  l:2},
    {n:'Pile Driving',             id:'ACT-002-2', uom:'No.', sc:'9,600',   wt:7,  sd:'10-Feb-2026', ed:'25-Mar-2026',pre:'Pre-drilling',    st:'Completed',  l:2},
    {n:'Rig Positioning',          id:'ACT-002-21',uom:'No.', sc:'9,600',   wt:2,  sd:'10-Feb-2026', ed:'10-Feb-2026',pre:'—',               st:'Completed',  l:3},
    {n:'Pile Boring',              id:'ACT-002-22',uom:'No.', sc:'9,600',   wt:4,  sd:'11-Feb-2026', ed:'20-Mar-2026',pre:'Rig Positioning', st:'Completed',  l:3},
    {n:'Pile Insertion & Check',   id:'ACT-002-23',uom:'No.', sc:'9,600',   wt:1,  sd:'21-Mar-2026', ed:'25-Mar-2026',pre:'Pile Boring',     st:'Completed',  l:3},
    {n:'Post-driving QC',          id:'ACT-002-3', uom:'No.', sc:'9,600',   wt:2,  sd:'26-Mar-2026', ed:'30-Mar-2026',pre:'Pile Driving',    st:'Completed',  l:2},
    {n:'MMS Erection',             id:'ACT-003',   uom:'No.', sc:'9,600',   wt:10, sd:'15-Feb-2026', ed:'30-Apr-2026',pre:'Piling Work',     st:'Active',     l:1},
    {n:'Foundation Bolt Setting',  id:'ACT-003-1', uom:'No.', sc:'9,600',   wt:3,  sd:'15-Feb-2026', ed:'01-Mar-2026',pre:'Piling Work',     st:'Active',     l:2},
    {n:'Structure Assembly',       id:'ACT-003-2', uom:'No.', sc:'9,600',   wt:5,  sd:'01-Mar-2026', ed:'20-Apr-2026',pre:'Bolt Setting',    st:'Active',     l:2},
    {n:'Torque Tightening',        id:'ACT-003-3', uom:'No.', sc:'9,600',   wt:2,  sd:'20-Apr-2026', ed:'30-Apr-2026',pre:'Assembly',        st:'Planned',    l:2},
    {n:'Module Installation',      id:'ACT-004',   uom:'No.', sc:'192,000', wt:10, sd:'01-Mar-2026', ed:'31-May-2026',pre:'MMS Erection',    st:'Active',     l:1},
    {n:'Module Unboxing & QC',     id:'ACT-004-1', uom:'No.', sc:'192,000', wt:2,  sd:'01-Mar-2026', ed:'15-Mar-2026',pre:'—',               st:'Active',     l:2},
    {n:'Module Placement',         id:'ACT-004-2', uom:'No.', sc:'192,000', wt:6,  sd:'15-Mar-2026', ed:'20-May-2026',pre:'Unboxing',        st:'Active',     l:2},
    {n:'Row Assignment',           id:'ACT-004-21',uom:'No.', sc:'192,000', wt:1,  sd:'15-Mar-2026', ed:'15-Mar-2026',pre:'—',               st:'Active',     l:3},
    {n:'Panel Lifting & Setting',  id:'ACT-004-22',uom:'No.', sc:'192,000', wt:3,  sd:'16-Mar-2026', ed:'10-May-2026',pre:'Row Assignment',  st:'Active',     l:3},
    {n:'Alignment & Levelness QC', id:'ACT-004-23',uom:'No.', sc:'192,000', wt:2,  sd:'11-May-2026', ed:'20-May-2026',pre:'Panel Lifting',   st:'Planned',    l:3},
    {n:'Clamp Fixing',             id:'ACT-004-3', uom:'No.', sc:'192,000', wt:2,  sd:'21-May-2026', ed:'31-May-2026',pre:'Placement',       st:'Planned',    l:2},
    {n:'DC Cabling',               id:'ACT-005',   uom:'m',   sc:'48,000',  wt:5,  sd:'15-Mar-2026', ed:'15-Jun-2026',pre:'Module Install.', st:'In Progress',l:1},
    {n:'Cable Tray Laying',        id:'ACT-005-1', uom:'m',   sc:'48,000',  wt:2,  sd:'15-Mar-2026', ed:'30-Apr-2026',pre:'—',               st:'Active',     l:2},
    {n:'Cable Pulling',            id:'ACT-005-2', uom:'m',   sc:'48,000',  wt:2,  sd:'01-May-2026', ed:'31-May-2026',pre:'Cable Tray',      st:'In Progress',l:2},
    {n:'Termination & Crimping',   id:'ACT-005-3', uom:'No.', sc:'1,920',   wt:1,  sd:'01-Jun-2026', ed:'15-Jun-2026',pre:'Cable Pulling',   st:'Planned',    l:2},
    {n:'Earthing & Bonding',       id:'ACT-006',   uom:'m',   sc:'9,600',   wt:3,  sd:'01-Mar-2026', ed:'30-Jun-2026',pre:'DC Cabling',      st:'Planned',    l:1},
    // ─ Civil Work ────────────────────────────────────────────
    {n:'Civil Work',               id:'ACT-007',   uom:'—',   sc:'—',       wt:25, sd:'',           ed:'',           pre:'—',               st:'Active',     l:0},
    {n:'Road & Grading',           id:'ACT-008',   uom:'m',   sc:'18,500',  wt:6,  sd:'15-Jan-2026', ed:'28-Feb-2026',pre:'—',               st:'Completed',  l:1},
    {n:'Sub-base Preparation',     id:'ACT-008-1', uom:'m',   sc:'18,500',  wt:3,  sd:'15-Jan-2026', ed:'01-Feb-2026',pre:'—',               st:'Completed',  l:2},
    {n:'Metalling & Compaction',   id:'ACT-008-2', uom:'m',   sc:'18,500',  wt:3,  sd:'01-Feb-2026', ed:'28-Feb-2026',pre:'Sub-base',        st:'Completed',  l:2},
    {n:'Fencing',                  id:'ACT-009',   uom:'m',   sc:'24,000',  wt:7,  sd:'01-Feb-2026', ed:'31-Mar-2026',pre:'Road & Grading',  st:'Active',     l:1},
    {n:'Pole Erection',            id:'ACT-009-1', uom:'No.', sc:'800',     wt:3,  sd:'01-Feb-2026', ed:'15-Mar-2026',pre:'—',               st:'Active',     l:2},
    {n:'Wire Mesh Fixing',         id:'ACT-009-2', uom:'m',   sc:'24,000',  wt:4,  sd:'16-Mar-2026', ed:'31-Mar-2026',pre:'Pole Erection',   st:'Planned',    l:2},
    {n:'Control Room Constr.',     id:'ACT-010',   uom:'sqm', sc:'1,200',   wt:8,  sd:'15-Jan-2026', ed:'30-Apr-2026',pre:'—',               st:'In Progress',l:1},
    {n:'Foundation & Plinth',      id:'ACT-010-1', uom:'sqm', sc:'1,200',   wt:3,  sd:'15-Jan-2026', ed:'28-Feb-2026',pre:'—',               st:'Completed',  l:2},
    {n:'Brick Masonry',            id:'ACT-010-2', uom:'sqm', sc:'1,200',   wt:4,  sd:'01-Mar-2026', ed:'15-Apr-2026',pre:'Foundation',      st:'In Progress',l:2},
    {n:'Roofing & Flooring',       id:'ACT-010-3', uom:'sqm', sc:'1,200',   wt:1,  sd:'16-Apr-2026', ed:'30-Apr-2026',pre:'Masonry',         st:'Planned',    l:2},
    // ─ AC Work ───────────────────────────────────────────────
    {n:'AC Work',                  id:'ACT-012',   uom:'—',   sc:'—',       wt:20, sd:'',           ed:'',           pre:'—',               st:'Active',     l:0},
    {n:'Inverter Installation',    id:'ACT-013',   uom:'No.', sc:'48',      wt:6,  sd:'01-May-2026', ed:'30-Jun-2026',pre:'Civil Work',      st:'Planned',    l:1},
    {n:'Foundation Check',         id:'ACT-013-1', uom:'No.', sc:'48',      wt:1,  sd:'01-May-2026', ed:'05-May-2026',pre:'—',               st:'Planned',    l:2},
    {n:'Inverter Placement',       id:'ACT-013-2', uom:'No.', sc:'48',      wt:3,  sd:'06-May-2026', ed:'20-Jun-2026',pre:'Foundation Check',st:'Planned',    l:2},
    {n:'Cable Connection',         id:'ACT-013-3', uom:'No.', sc:'48',      wt:2,  sd:'21-Jun-2026', ed:'30-Jun-2026',pre:'Placement',       st:'Planned',    l:2},
    {n:'AC Cabling',               id:'ACT-014',   uom:'m',   sc:'12,000',  wt:7,  sd:'15-May-2026', ed:'15-Jul-2026',pre:'Inverter Install.',st:'Planned',   l:1},
    {n:'HT Cable Laying',          id:'ACT-014-1', uom:'m',   sc:'6,000',   wt:3,  sd:'15-May-2026', ed:'15-Jun-2026',pre:'—',               st:'Planned',    l:2},
    {n:'LT Cable Laying',          id:'ACT-014-2', uom:'m',   sc:'6,000',   wt:3,  sd:'16-Jun-2026', ed:'10-Jul-2026',pre:'HT Cabling',      st:'Planned',    l:2},
    {n:'Transformer Erection',     id:'ACT-015',   uom:'No.', sc:'8',       wt:7,  sd:'01-Jun-2026', ed:'31-Jul-2026',pre:'AC Cabling',      st:'Planned',    l:1},
    {n:'Transformer Offloading',   id:'ACT-015-1', uom:'No.', sc:'8',       wt:2,  sd:'01-Jun-2026', ed:'07-Jun-2026',pre:'—',               st:'Planned',    l:2},
    {n:'Erection & Positioning',   id:'ACT-015-2', uom:'No.', sc:'8',       wt:3,  sd:'08-Jun-2026', ed:'15-Jul-2026',pre:'Offloading',      st:'Planned',    l:2},
    {n:'Oil Filling & Testing',    id:'ACT-015-3', uom:'No.', sc:'8',       wt:2,  sd:'16-Jul-2026', ed:'31-Jul-2026',pre:'Erection',        st:'Planned',    l:2},
  ];

  const rows = ALL.filter(r => r.l <= maxL);
  const rowIndent = r => {
    if (r.l === 0) return r.n;
    const pad = (r.l - 1) * 16;
    return `<span style="display:inline-block;width:${pad}px"></span><span style="color:var(--txt3);margin-right:3px;font-size:10.5px">└</span>${r.n}`;
  };

  return `
<div class="tb">
  <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap">
    <span class="fl">Project:</span>
    <select class="fc" style="width:230px">
      <option>TPSSL-RJ-001 — Rajasthan Solar Ph.1</option>
      <option>TPSSL-GJ-002 — Gujarat Solar Ph.2</option>
      <option>TPSSL-TN-004 — Tamil Nadu Solar 3</option>
      <option>TPSSL-AP-005 — AP BESS Storage</option>
    </select>
    <span class="fl" style="margin-left:4px">Block:</span>
    <select class="fc" style="width:120px">
      <option>All Blocks</option>
      ${[1,2,3,4,5,6].map(b=>`<option>Block ${b}</option>`).join('')}
    </select>
  </div>
  <span class="sp"></span>
  <button class="btn btn-s btn-sm">Import from SAP</button>
  <button class="btn btn-p btn-sm">${svgPlus} Add Activity Mapping</button>
</div>

<div class="info-bar info-blue">
  ${svgInfo}
  <span><strong>Rajasthan Solar Phase 1</strong> &ensp;|&ensp; 200 MWp &ensp;|&ensp; 24 Blocks, 480 Tables &ensp;|&ensp; <strong>${rows.length}</strong> activities shown &ensp;|&ensp; Depth: <strong>${maxL===1?'L0→L1':maxL===2?'L0→L2':'L0→L3'}</strong></span>
</div>

<div class="tw">
  <table>
    <thead><tr>
      <th>Activity</th><th>Act. ID</th><th>UoM</th>
      <th class="t-r">Total Scope</th><th class="t-r">Weightage %</th>
      <th>Start Date</th><th>End Date</th>
      <th>Prerequisite</th><th>Status</th><th></th>
    </tr></thead>
    <tbody>
      ${rows.map(r=>`<tr class="l${r.l}" style="${r.l===0?'background:#F0F3FA':r.l>=2?'background:#FAFBFD':''}">
        <td>${rowIndent(r)}</td>
        <td class="mono" style="font-size:${r.l>=2?'10.5px':'11.5px'};color:var(--txt2)">${r.id}</td>
        <td class="mono">${r.uom}</td>
        <td class="t-r" style="font-size:${r.l>=2?'11px':'12px'}">${r.sc}</td>
        <td class="t-r">
          ${r.l===0
            ? `<strong>${r.wt}%</strong>`
            : `<input type="number" class="ti ti-w" value="${r.wt}" style="text-align:right"> %`}
        </td>
        <td>${r.sd?`<input type="text" class="ti ti-wd" value="${r.sd}">`:''}</td>
        <td>${r.ed?`<input type="text" class="ti ti-wd" value="${r.ed}">`:''}</td>
        <td style="font-size:11px;color:var(--txt2)">${r.pre}</td>
        <td>${statusChip(r.st)}</td>
        <td><button class="btn btn-g btn-sm">Edit</button></td>
      </tr>`).join('')}
    </tbody>
  </table>
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px">
  <button class="btn btn-s">Reset Changes</button>
  <button class="btn btn-p">Save Mapping</button>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// SCREEN 5 — ACTIVITY–VENDOR MAPPING
// ══════════════════════════════════════════════════════════════
function renderProjVendor() {
  const tw = window.ffaTweaks || {};
  const maxL = {'2 levels':1,'3 levels':2,'4 levels':3}[tw.activityDepth||'2 levels'];

  const ALL = [
    // ─── DC Work Group ─────────────────────────────────────────
    {n:'DC Work',              id:'ACT-001',  uom:'—', total:null,   sd:'',           ed:'',           l:0,isGroup:true, vendors:[]},
    {n:'Piling Work',          id:'ACT-002',  uom:'No.',total:9600,  sd:'01-Feb-2026',ed:'30-Mar-2026',l:1,isGroup:false,vendors:[
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:4800,pct:50,  sd:'01-Feb-2026',ed:'15-Mar-2026',st:'Completed'},
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:4800,pct:50,  sd:'10-Feb-2026',ed:'30-Mar-2026',st:'Completed'},
    ]},
    {n:'Pre-drilling Survey',  id:'ACT-002-1',uom:'No.',total:9600,  sd:'01-Feb-2026',ed:'10-Feb-2026',l:2,isGroup:false,vendors:[
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:9600,pct:100,sd:'01-Feb-2026',ed:'10-Feb-2026',st:'Completed'},
    ]},
    {n:'Pile Driving',         id:'ACT-002-2',uom:'No.',total:9600,  sd:'10-Feb-2026',ed:'25-Mar-2026',l:2,isGroup:false,vendors:[
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:4800,pct:50, sd:'10-Feb-2026',ed:'15-Mar-2026',st:'Completed'},
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:4800,pct:50, sd:'10-Feb-2026',ed:'25-Mar-2026',st:'Completed'},
    ]},
    {n:'Rig Positioning',      id:'ACT-002-21',uom:'No.',total:9600, sd:'10-Feb-2026',ed:'10-Feb-2026',l:3,isGroup:false,vendors:[
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:9600,pct:100,sd:'10-Feb-2026',ed:'10-Feb-2026',st:'Completed'},
    ]},
    {n:'Pile Boring',          id:'ACT-002-22',uom:'No.',total:9600, sd:'11-Feb-2026',ed:'20-Mar-2026',l:3,isGroup:false,vendors:[
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:9600,pct:100,sd:'11-Feb-2026',ed:'20-Mar-2026',st:'Completed'},
    ]},
    {n:'Post-driving QC',      id:'ACT-002-3',uom:'No.',total:9600,  sd:'26-Mar-2026',ed:'30-Mar-2026',l:2,isGroup:false,vendors:[
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:9600,pct:100,sd:'26-Mar-2026',ed:'30-Mar-2026',st:'Completed'},
    ]},
    {n:'MMS Erection',         id:'ACT-003',  uom:'No.',total:9600,  sd:'15-Feb-2026',ed:'30-Apr-2026',l:1,isGroup:false,vendors:[
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:3200,pct:33.3,sd:'15-Feb-2026',ed:'28-Mar-2026',st:'Active'},
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:3200,pct:33.3,sd:'15-Feb-2026',ed:'10-Apr-2026',st:'Active'},
      {name:'M/s PowerTech Contractors', vid:'V-003',qty:3200,pct:33.4,sd:'01-Mar-2026',ed:'30-Apr-2026',st:'Active'},
    ]},
    {n:'Structure Assembly',   id:'ACT-003-2',uom:'No.',total:9600,  sd:'01-Mar-2026',ed:'20-Apr-2026',l:2,isGroup:false,vendors:[
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:4800,pct:50, sd:'01-Mar-2026',ed:'10-Apr-2026',st:'Active'},
      {name:'M/s PowerTech Contractors', vid:'V-003',qty:4800,pct:50, sd:'15-Mar-2026',ed:'20-Apr-2026',st:'Active'},
    ]},
    {n:'Module Installation',  id:'ACT-004',  uom:'No.',total:192000,sd:'01-Mar-2026',ed:'31-May-2026',l:1,isGroup:false,vendors:[
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:96000,pct:50,sd:'01-Mar-2026',ed:'30-Apr-2026',st:'Active'},
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:96000,pct:50,sd:'01-Apr-2026',ed:'31-May-2026',st:'Planned'},
    ]},
    {n:'Module Placement',     id:'ACT-004-2',uom:'No.',total:192000,sd:'15-Mar-2026',ed:'20-May-2026',l:2,isGroup:false,vendors:[
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:96000,pct:50,sd:'15-Mar-2026',ed:'20-Apr-2026',st:'Active'},
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:96000,pct:50,sd:'01-Apr-2026',ed:'20-May-2026',st:'Planned'},
    ]},
    {n:'Panel Lifting & Setting',id:'ACT-004-22',uom:'No.',total:192000,sd:'16-Mar-2026',ed:'10-May-2026',l:3,isGroup:false,vendors:[
      {name:'M/s SolarBuild Infra',      vid:'V-002',qty:96000,pct:50,sd:'16-Mar-2026',ed:'20-Apr-2026',st:'Active'},
      {name:'M/s Electrocraft Solutions',vid:'V-001',qty:96000,pct:50,sd:'01-Apr-2026',ed:'10-May-2026',st:'Planned'},
    ]},
    {n:'DC Cabling',           id:'ACT-005',  uom:'m',  total:48000, sd:'15-Mar-2026',ed:'15-Jun-2026',l:1,isGroup:false,vendors:[
      {name:'M/s GreenWatt EPC',         vid:'V-004',qty:48000,pct:100,sd:'15-Mar-2026',ed:'15-Jun-2026',st:'In Progress'},
    ]},
    {n:'Cable Pulling',        id:'ACT-005-2',uom:'m',  total:48000, sd:'01-May-2026',ed:'31-May-2026',l:2,isGroup:false,vendors:[
      {name:'M/s GreenWatt EPC',         vid:'V-004',qty:48000,pct:100,sd:'01-May-2026',ed:'31-May-2026',st:'In Progress'},
    ]},
    // ─── Civil Work Group ───────────────────────────────────────
    {n:'Civil Work',           id:'ACT-007',  uom:'—', total:null,   sd:'',           ed:'',           l:0,isGroup:true, vendors:[]},
    {n:'Fencing',              id:'ACT-009',  uom:'m',  total:24000, sd:'01-Feb-2026',ed:'31-Mar-2026',l:1,isGroup:false,vendors:[
      {name:'M/s Sahara Infra Works',    vid:'V-005',qty:24000,pct:100,sd:'01-Feb-2026',ed:'31-Mar-2026',st:'Active'},
    ]},
    {n:'Pole Erection',        id:'ACT-009-1',uom:'No.',total:800,   sd:'01-Feb-2026',ed:'15-Mar-2026',l:2,isGroup:false,vendors:[
      {name:'M/s Sahara Infra Works',    vid:'V-005',qty:800, pct:100,sd:'01-Feb-2026',ed:'15-Mar-2026',st:'Active'},
    ]},
    {n:'Wire Mesh Fixing',     id:'ACT-009-2',uom:'m',  total:24000, sd:'16-Mar-2026',ed:'31-Mar-2026',l:2,isGroup:false,vendors:[
      {name:'M/s Sahara Infra Works',    vid:'V-005',qty:24000,pct:100,sd:'16-Mar-2026',ed:'31-Mar-2026',st:'Planned'},
    ]},
    // ─── AC Work Group ──────────────────────────────────────────
    {n:'AC Work',              id:'ACT-012',  uom:'—', total:null,   sd:'',           ed:'',           l:0,isGroup:true, vendors:[]},
    {n:'Inverter Installation',id:'ACT-013',  uom:'No.',total:48,    sd:'01-May-2026',ed:'30-Jun-2026',l:1,isGroup:false,vendors:[]},
    {n:'Foundation Check',     id:'ACT-013-1',uom:'No.',total:48,    sd:'01-May-2026',ed:'05-May-2026',l:2,isGroup:false,vendors:[]},
    {n:'Inverter Placement',   id:'ACT-013-2',uom:'No.',total:48,    sd:'06-May-2026',ed:'20-Jun-2026',l:2,isGroup:false,vendors:[]},
  ];

  // Filter by depth; assign sequential index only to non-group items
  const filtered = ALL.filter(a => a.l <= maxL);
  let vIdx = -1;
  const data = filtered.map(a => ({...a, vIdx: a.isGroup ? -1 : ++vIdx}));

  const rowIndent = a => {
    if (a.l === 0) return `<strong>${a.n}</strong>`;
    const pad = (a.l - 1) * 16;
    return `<span style="display:inline-block;width:${pad}px"></span><span style="color:var(--txt3);margin-right:4px;font-size:10.5px">└</span>${a.n}`;
  };

  return `
<div class="tb">
  <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap">
    <span class="fl">Project:</span>
    <select class="fc" style="width:220px">
      <option>TPSSL-RJ-001 — Rajasthan Solar Ph.1</option>
      <option>TPSSL-GJ-002 — Gujarat Solar Ph.2</option>
    </select>
    <span class="fl" style="margin-left:4px">Block:</span>
    <select class="fc" style="width:118px">
      <option>All Blocks</option>
      ${[1,2,3,4,5].map(b=>`<option>Block ${b}</option>`).join('')}
    </select>
    <span class="fl" style="margin-left:4px">Activity:</span>
    <select class="fc" style="width:165px">
      <option>All Activities</option>
      <option>DC Work</option><option>Civil Work</option><option>AC Work</option>
    </select>
  </div>
  <span class="sp"></span>
  <button class="btn btn-p btn-sm">${svgPlus} Assign Vendor</button>
</div>

<div class="info-bar info-blue">
  ${svgInfo}
  <span>Hierarchy depth: <strong>${maxL===1?'L0→L1':maxL===2?'L0→L2':'L0→L3'}</strong>. Group rows (L0) are structural headers. Click ▶ on any task to expand vendor assignments.</span>
</div>

<div class="tw">
  <table>
    <thead><tr>
      <th style="width:28px"></th>
      <th>Activity</th><th>Act. ID</th><th>UoM</th>
      <th class="t-r">Total Scope</th>
      <th>Plan Start</th><th>Plan End</th>
      <th class="t-r">Vendors</th><th>Allocation Status</th>
    </tr></thead>
    <tbody id="pvmap-tbody">
      ${data.map(a => {
        if (a.isGroup) return `
        <tr style="background:#EEF1F7;cursor:default">
          <td></td>
          <td colspan="8" style="font-weight:700;font-size:12px;color:var(--navy);padding:5px 9px;letter-spacing:.3px">${a.n}</td>
        </tr>`;
        const i = a.vIdx;
        const alloc = a.vendors.reduce((s,v)=>s+v.qty,0);
        const allocPct = a.total>0?Math.round(alloc/a.total*100):0;
        const allocCls = alloc===0?'c-x':allocPct<100?'c-y':'c-g';
        const vpad = (a.l)*16+8;
        return `
        <tr class="act-parent" data-av="${i}" style="font-weight:${a.l===1?500:400};background:${a.l>=2?'#FAFBFD':''}">
          <td style="text-align:center">
            <span class="expand-btn" data-av="${i}" style="font-size:13px;color:var(--txt3);cursor:pointer;user-select:none;display:inline-block;transition:transform .15s">▶</span>
          </td>
          <td>${rowIndent(a)}</td>
          <td class="mono" style="font-size:${a.l>=2?'10.5px':'11.5px'};color:var(--txt2)">${a.id}</td>
          <td class="mono">${a.uom}</td>
          <td class="t-r">${a.total?a.total.toLocaleString():'—'}</td>
          <td style="font-size:11.5px">${a.sd}</td>
          <td style="font-size:11.5px">${a.ed}</td>
          <td class="t-r">${a.vendors.length}</td>
          <td>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
              <span class="chip ${allocCls}">
                ${alloc>0?alloc.toLocaleString()+' / '+a.total.toLocaleString()+' ('+allocPct+'%)':'Unassigned'}
              </span>
              <button class="btn btn-g btn-sm view-btn" data-act="${a.id}" style="padding:2px 6px;font-size:11px;height:20px;line-height:1">View</button>
            </div>
          </td>
        </tr>
        ${a.vendors.map(v=>`
        <tr class="vsub vrow-${i}" style="display:none">
          <td></td>
          <td style="padding-left:${vpad}px">
            <span style="color:var(--txt3);margin-right:4px;font-size:11px">└</span>
            <span style="font-weight:500">${v.name}</span>
            <span class="mono" style="margin-left:5px;font-size:10.5px;color:var(--txt3)">${v.vid}</span>
          </td>
          <td></td><td></td>
          <td class="t-r" style="font-weight:600">${v.qty.toLocaleString()}</td>
          <td style="font-size:11px">${v.sd}</td>
          <td style="font-size:11px">${v.ed}</td>
          <td class="t-r">${v.pct}%</td>
          <td>${statusChip(v.st)} <button class="btn btn-g btn-sm" style="margin-left:4px">Edit</button></td>
        </tr>`).join('')}
        <tr class="vsub vrow-${i}" style="display:none">
          <td colspan="9" style="padding:5px 9px 7px ${vpad}px;background:#F8FBFF">
            <button class="btn btn-g btn-sm" style="color:var(--blue)">
              ${svgPlus} Add Vendor to "${a.n}"
            </button>
          </td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>
</div>
<div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px">
  <button class="btn btn-s">Cancel</button>
  <button class="btn btn-p">Save Vendor Mapping</button>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// SCREEN 6 — MONITORING / MIS
// ══════════════════════════════════════════════════════════════
function renderMonitoring() {
  const dp = [
    ['MMS Erection',       'TPSSL-RJ-001','Blk 12','48',   '4,320', 'Electrocraft'],
    ['Module Installation','TPSSL-RJ-001','Blk 8', '960',  '92,160','SolarBuild'],
    ['DC Cabling',         'TPSSL-TN-004','Blk 24','1,200','38,400','GreenWatt EPC'],
    ['Piling Work',        'TPSSL-GJ-002','Blk 5', '160',  '2,880', 'Electrocraft'],
    ['Fencing',            'TPSSL-AP-005','Blk 3', '800',  '4,800', 'Sahara Infra'],
    ['DC Cabling',         'TPSSL-RJ-001','Blk 10','1,440','19,200','GreenWatt EPC'],
  ];

  const pva = [
    {proj:'Rajasthan Ph.1',  plan:70,act:62},
    {proj:'Gujarat Ph.2',    plan:55,act:45},
    {proj:'Tamil Nadu 3',    plan:75,act:78},
    {proj:'AP BESS',         plan:40,act:34},
    {proj:'Maharashtra Tr.', plan:18,act:12},
  ];

  const today = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});

  return `
<div class="tb">
  <select class="fc fc-sm"><option>All Projects</option><option>TPSSL-RJ-001</option><option>TPSSL-GJ-002</option><option>TPSSL-TN-004</option></select>
  <select class="fc fc-sm"><option>Today</option><option>This Week</option><option>This Month</option><option>Custom Range</option></select>
  <span class="sp"></span>
  <button class="btn btn-s btn-sm">
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="11" height="11"><path d="M3 8h10M8 3l5 5-5 5"/></svg>
    Download Excel
  </button>
  <button class="btn btn-p btn-sm">Generate Report</button>
</div>

<div class="stat-grid">
  <div class="stat">
    <div class="stat-ic" style="background:#EEF2FF">
      <svg viewBox="0 0 16 16" fill="none" stroke="#1D4ED8" stroke-width="1.5" stroke-linecap="round"><path d="M2 11l3-4 3 3 3-5 3 2"/></svg>
    </div>
    <div><div class="stat-v">62%</div><div class="stat-l">Avg. Project Progress</div></div>
  </div>
  <div class="stat">
    <div class="stat-ic" style="background:var(--gbg)">
      <svg viewBox="0 0 16 16" fill="none" stroke="#059669" stroke-width="1.8" stroke-linecap="round"><path d="M3 8l3 3 7-7"/></svg>
    </div>
    <div><div class="stat-v">189</div><div class="stat-l">Activities On Track</div></div>
  </div>
  <div class="stat">
    <div class="stat-ic" style="background:var(--ebg)">
      <svg viewBox="0 0 16 16" fill="#DC2626"><path d="M8 2a6 6 0 110 12A6 6 0 018 2zm0 3v3.5l2 2-.8 1.1L7 9.5V5z"/></svg>
    </div>
    <div><div class="stat-v">14</div><div class="stat-l">Delayed Activities</div></div>
  </div>
  <div class="stat">
    <div class="stat-ic" style="background:var(--wbg)">
      <svg viewBox="0 0 16 16" fill="#D97706"><path d="M8 2l6 12H2L8 2zm0 4v3.5m0 2.5v.5" stroke="none"/></svg>
    </div>
    <div><div class="stat-v">8</div><div class="stat-l">Open Issues</div></div>
  </div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
  <div class="card">
    <div class="card-h">
      <span class="card-t">Daily Progress Report — ${today}</span>
      <button class="btn btn-s btn-sm">View Full Report</button>
    </div>
    <div class="tw" style="border:none;border-radius:0 0 6px 6px">
      <table>
        <thead><tr>
          <th>Activity</th><th>Project</th><th>Block</th>
          <th class="t-r">Today (No.)</th><th class="t-r">Cumulative</th><th>Vendor</th>
        </tr></thead>
        <tbody>
          ${dp.map(([act,proj,blk,today,cum,vend])=>`<tr>
            <td style="font-weight:500">${act}</td>
            <td style="font-size:11px">${proj}</td>
            <td>${chip(blk,'n')}</td>
            <td class="t-r" style="font-weight:500">${today}</td>
            <td class="t-r" style="color:var(--txt2)">${cum}</td>
            <td style="font-size:11.5px;color:var(--txt2)">${vend}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-h">
      <span class="card-t">Planned vs Actual Progress</span>
      <div style="display:flex;gap:8px;font-size:10.5px;align-items:center">
        <span style="display:flex;align-items:center;gap:3px"><span style="width:10px;height:5px;background:#CBD5E1;display:inline-block;border-radius:2px"></span>Plan</span>
        <span style="display:flex;align-items:center;gap:3px"><span style="width:10px;height:5px;background:var(--blue);display:inline-block;border-radius:2px"></span>Actual</span>
      </div>
    </div>
    <div class="card-b">
      ${pva.map(({proj,plan,act})=>{
        const ahead = act>=plan;
        const diff = Math.abs(plan-act);
        return `
      <div style="margin-bottom:11px">
        <div style="display:flex;justify-content:space-between;margin-bottom:3px;font-size:12px">
          <span style="font-weight:500">${proj}</span>
          <span class="chip ${ahead?'c-g':'c-r'}">${ahead?'▲':'▼'} ${diff}% ${ahead?'ahead':'behind'}</span>
        </div>
        <div style="position:relative;height:9px;background:#E5E7EB;border-radius:4px;overflow:visible;margin-bottom:1px">
          <div style="position:absolute;height:100%;width:${plan}%;background:#CBD5E1;border-radius:4px"></div>
          <div style="position:absolute;height:100%;width:${act}%;background:${ahead?'var(--g)':'var(--e)'};border-radius:4px;opacity:.85"></div>
        </div>
        <div style="display:flex;gap:12px;font-size:10.5px;color:var(--txt3)">
          <span>Plan: ${plan}%</span><span>Actual: ${act}%</span>
        </div>
      </div>`;
      }).join('')}
    </div>
  </div>
</div>`;
}

// ══════════════════════════════════════════════════════════════
// INIT SCREEN — Interactivity per screen
// ══════════════════════════════════════════════════════════════
function initScreen(s) {

  // ── Project rows → update detail panel (simplified)
  if (s === 'projects') {
    document.querySelectorAll('#proj-tbody tr').forEach(row => {
      row.addEventListener('click', () => {
        document.querySelectorAll('#proj-tbody tr').forEach(r => r.classList.remove('sel'));
        row.classList.add('sel');
      });
    });
  }

  // ── Activities: tab filter + drag-and-drop reorder
  if (s === 'activities') {
    document.querySelectorAll('#act-tabs .tab').forEach(tab => {
      tab.addEventListener('click', e => {
        document.querySelectorAll('#act-tabs .tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.dataset.cat;
        document.querySelectorAll('#act-tbody tr').forEach(row => {
          row.style.display = (cat === 'All' || row.dataset.cat === cat) ? '' : 'none';
        });
      });
    });

    // Drag-and-drop reorder
    let dragSrc = null;
    document.querySelectorAll('#act-tbody tr').forEach(row => {
      row.addEventListener('dragstart', e => {
        dragSrc = row;
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      row.addEventListener('dragend', () => {
        dragSrc && dragSrc.classList.remove('dragging');
        document.querySelectorAll('#act-tbody tr').forEach(r => r.classList.remove('drag-over'));
        dragSrc = null;
      });
      row.addEventListener('dragover', e => {
        e.preventDefault();
        if (row !== dragSrc) row.classList.add('drag-over');
      });
      row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
      row.addEventListener('drop', e => {
        e.stopPropagation(); e.preventDefault();
        if (dragSrc && dragSrc !== row) {
          row.parentNode.insertBefore(dragSrc, row);
        }
        row.classList.remove('drag-over');
      });
    });
  }

  // ── Vendor mapping: expand/collapse vendor rows
  if (s === 'proj-vendor') {
    const toggle = (i) => {
      const rows = document.querySelectorAll(`.vrow-${i}`);
      const btn  = document.querySelector(`.expand-btn[data-av="${i}"]`);
      if (!rows.length || !btn) return;
      const open = rows[0].style.display !== 'none';
      rows.forEach(r => r.style.display = open ? 'none' : '');
      btn.style.transform = open ? '' : 'rotate(90deg)';
    };

    document.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); toggle(btn.dataset.av); });
    });
    document.querySelectorAll('.act-parent').forEach(row => {
      row.addEventListener('click', () => toggle(row.dataset.av));
    });

    // Expand first two by default
    ['0','1'].forEach(i => toggle(i));

    // Handle view button click to view details
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const actId = btn.dataset.act;
        const projSelect = document.querySelector('.tb select.fc');
        const projId = projSelect ? projSelect.value.split(' — ')[0] : 'TPSSL-RJ-001';
        window.top.location.href = `view.html?project=${encodeURIComponent(projId)}&activity=${encodeURIComponent(actId)}`;
      });
    });
  }
}

// ── Tweak effects ────────────────────────────────────────────
function applyTweaks(t) {
  const sb = document.getElementById('sidebar');
  if (sb) sb.style.background = t.sidebarColor || '#0C1D56';
  document.body.classList.toggle('density-comfortable', t.tableDensity === 'comfortable');
  // Re-render activities if it's the active screen (depth/column changes need re-render)
  const cur = document.querySelector('.ni.active')?.dataset.s;
  if (cur === 'activities') {
    document.getElementById('content').innerHTML = renderActivities();
    initScreen('activities');
  }
}

document.addEventListener('tweaksChanged', e => {
  window.ffaTweaks = e.detail;
  applyTweaks(e.detail);
});

// ── Boot ──────────────────────────────────────────────────────
let startScreen = 'dashboard';
try {
  const parentParams = new URLSearchParams(window.parent.location.search);
  startScreen = parentParams.get('screen') || 'dashboard';
} catch (e) {
  const urlParams = new URLSearchParams(window.location.search);
  startScreen = urlParams.get('screen') || 'dashboard';
}
navigate(startScreen);
