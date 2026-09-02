(() => {
  const data = window.SIMON_FORZA_DATA || {};
  const hist = window.SIMON_FORZA_HISTORY || {weights:[],sessions:[],extraSessions:[],movement:[],meta:{}};
  const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'});
  const fmtLong = d => new Date(d + 'T12:00:00').toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'});
  const dayMs = d => Date.parse(d + 'T00:00:00Z');
  const safe = (v,fallback='—') => (v===null || v===undefined || Number.isNaN(v)) ? fallback : v;

  const byDate = new Map();
  function ensure(date){
    if(!byDate.has(date)) byDate.set(date,{date,weightLb:null,stairs:null,extras:{},rowing:[],strength:[],activities:[],food:null,notes:null});
    return byDate.get(date);
  }

  (hist.weights||[]).forEach(([date,value])=>ensure(date).weightLb=value);
  (hist.movement||[]).forEach(m=>{
    const d=ensure(m.d);
    d.stairs={bouts:m.b,completed:m.c,ascentSteps:m.c*102,descentSteps:m.c*102,historical:true};
    if(Number.isFinite(m.pu)) d.extras.pushups=m.pu;
    if(Number.isFinite(m.core)) d.extras.coreCircuits=m.core;
  });

  [...(hist.sessions||[]),...(hist.extraSessions||[])].forEach(s=>{
    const d=ensure(s.d);
    if(s.m==='Rowing'){
      d.rowing.push({label:s.w||'Row',durationSec:s.sec,distanceM:s.dist,splitSec500:s.split,avgWatts:s.watt,calories:s.cal,historical:true,source:s.source||'structured'});
    } else if(s.m==='Strength'){
      d.strength.push({workout:s.w||'Strength workout',setCount:s.sets,time:s.t,historical:true});
    } else {
      d.activities.push({modality:s.m,label:s.w,durationSec:s.sec,distanceM:s.dist,calories:s.cal,historical:true});
    }
  });

  (data.daily||[]).forEach(live=>{
    const d=ensure(live.date);
    if(Number.isFinite(live.weightLb)) d.weightLb=live.weightLb;
    if(live.stairs) d.stairs=live.stairs;
    d.extras={...d.extras,...(live.extras||{})};
    if(live.rowing?.length) d.rowing=live.rowing;
    if(live.strength?.length) d.strength=live.strength;
    if(live.activities?.length) d.activities=live.activities;
    if(live.food) d.food=live.food;
    if(live.notes) d.notes=live.notes;
  });

  const daily=[...byDate.values()].sort((a,b)=>a.date.localeCompare(b.date));
  const weights=daily.filter(d=>Number.isFinite(d.weightLb)).map(d=>({date:d.date,value:d.weightLb}));
  const rowingPoints=[];
  daily.forEach(d=>d.rowing.forEach(r=>{if(Number.isFinite(r.avgWatts)) rowingPoints.push({date:d.date,value:r.avgWatts,label:r.label});}));
  const latest=daily.at(-1);
  const latestWeight=weights.at(-1);
  const previousWeight=weights.length>1?weights.at(-2):null;
  const rows=daily.slice(-12).reverse();
  document.getElementById('lastUpdated').textContent=fmtLong(data.meta.lastUpdated);

  document.querySelectorAll('.nav button').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  }));

  const card=(cls,inner)=>`<article class="card ${cls}">${inner}</article>`;
  const metric=(label,val,unit='',sub='')=>`<div class="metric-label">${label}</div><div class="metric">${val}${unit?` <span class="unit">${unit}</span>`:''}</div>${sub?`<div class="delta">${sub}</div>`:''}`;
  const currentLoss=latestWeight?data.goals.weight.startLb-latestWeight.value:0;
  const goalPct=Math.max(0,Math.min(100,currentLoss/data.goals.weight.lossGoalLb*100));

  const ranges=[['1m','1m'],['3m','3m'],['6m','6m'],['1y','1y'],['2y','2y'],['all','All']];
  const rangeMonths={ '1m':1,'3m':3,'6m':6,'1y':12,'2y':24 };
  const rangeState={weight:'all',rowing:'all'};

  function filterRange(points,key){
    if(key==='all'||points.length===0) return points;
    const end=new Date(points.at(-1).date+'T00:00:00Z');
    const cutoff=new Date(end);
    cutoff.setUTCMonth(cutoff.getUTCMonth()-rangeMonths[key]);
    return points.filter(p=>dayMs(p.date)>=cutoff.getTime());
  }

  function rangePicker(metricName){
    return `<div class="range-picker" role="group" aria-label="Chart time range">${ranges.map(([key,label])=>`<button type="button" data-range-metric="${metricName}" data-range="${key}" class="${rangeState[metricName]===key?'active':''}">${label}</button>`).join('')}</div>`;
  }

  function chartShell(metricName,kind){
    return `${rangePicker(metricName)}<div class="trend-chart" data-chart="${kind}"></div>`;
  }

  function lineChart(points,{target=null,yPad=.5,lineClass='line',unit=''}={}){
    if(points.length===0) return `<div class="empty">No data in this range.</div>`;
    if(points.length===1) return `<div class="empty">One data point: <strong>${points[0].value}${unit}</strong> on ${fmtLong(points[0].date)}.</div>`;
    const W=760,H=240,p={l:48,r:16,t:16,b:34};
    const vals=points.map(pt=>pt.value); let min=Math.min(...vals),max=Math.max(...vals);
    if(target!==null){min=Math.min(min,target);max=Math.max(max,target)}
    min-=yPad;max+=yPad;if(max===min)max=min+1;
    const minT=dayMs(points[0].date),maxT=dayMs(points.at(-1).date);
    const x=pt=>p.l+(dayMs(pt.date)-minT)*(W-p.l-p.r)/Math.max(1,maxT-minT);
    const y=v=>p.t+(max-v)*(H-p.t-p.b)/(max-min);
    let svg=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
    for(let i=0;i<=4;i++){const vv=max-(max-min)*i/4,yy=y(vv);svg+=`<line class="gridline" x1="${p.l}" y1="${yy}" x2="${W-p.r}" y2="${yy}"/><text class="chart-label" x="${p.l-8}" y="${yy+4}" text-anchor="end">${vv.toFixed(1)}</text>`}
    if(target!==null){svg+=`<line class="target-line" x1="${p.l}" y1="${y(target)}" x2="${W-p.r}" y2="${y(target)}"/><text class="chart-label" x="${W-p.r}" y="${y(target)-6}" text-anchor="end">Target ${target}</text>`}
    const path=points.map((pt,i)=>`${i?'L':'M'} ${x(pt).toFixed(1)} ${y(pt.value).toFixed(1)}`).join(' ');
    svg+=`<path class="${lineClass}" d="${path}"/>`;
    const radius=points.length>90?2:points.length>45?2.8:4;
    points.forEach(pt=>{svg+=`<circle class="dot" cx="${x(pt)}" cy="${y(pt.value)}" r="${radius}"><title>${fmtLong(pt.date)}: ${pt.value}${unit}</title></circle>`});
    const labelPts=[points[0],points[Math.floor((points.length-1)/2)],points.at(-1)];
    labelPts.forEach((pt,i)=>svg+=`<text class="chart-label" x="${x(pt)}" y="${H-10}" text-anchor="${i===0?'start':i===2?'end':'middle'}">${fmtDate(pt.date)}</text>`);
    return svg+'</svg>';
  }

  function renderTrendCharts(){
    document.querySelectorAll('[data-range-metric]').forEach(b=>b.classList.toggle('active',rangeState[b.dataset.rangeMetric]===b.dataset.range));
    const wp=filterRange(weights,rangeState.weight);
    document.querySelectorAll('[data-chart="weight"]').forEach(el=>el.innerHTML=lineChart(wp,{target:data.goals.weight.targetLb,yPad:1,unit:' lb'}));
    const rp=filterRange(rowingPoints,rangeState.rowing);
    document.querySelectorAll('[data-chart="rowing"]').forEach(el=>el.innerHTML=lineChart(rp,{yPad:8,lineClass:'line2',unit:' W'}));
    document.querySelectorAll('[data-range-caption="weight"]').forEach(el=>el.textContent=`${wp.length} weigh-ins · ${wp.length?fmtDate(wp[0].date)+'–'+fmtDate(wp.at(-1).date):'no data'}`);
    document.querySelectorAll('[data-range-caption="rowing"]').forEach(el=>el.textContent=`${rp.length} rows · ${rp.length?fmtDate(rp[0].date)+'–'+fmtDate(rp.at(-1).date):'no data'}`);
  }

  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-range-metric]');
    if(!btn) return;
    rangeState[btn.dataset.rangeMetric]=btn.dataset.range;
    renderTrendCharts();
  });

  const latestFood=[...daily].reverse().find(d=>d.food);
  const latestRow=[...daily].reverse().find(d=>d.rowing.length);
  const latestStair=[...daily].reverse().find(d=>d.stairs?.completed);
  const bmr=latestWeight?Math.round(10*(latestWeight.value/2.20462)+6.25*(data.profile.heightIn*2.54)-5*data.profile.age+5):null;
  const histMeta=hist.meta||{};

  document.getElementById('overviewGrid').innerHTML=[
    card('span3',metric('Current weight',latestWeight?.value?.toFixed(1),'lb',previousWeight?`${(latestWeight.value-previousWeight.value).toFixed(1)} lb vs prior weigh-in`:'')),
    card('span3',metric('Goal remaining',Math.max(0,latestWeight.value-data.goals.weight.targetLb).toFixed(1),'lb',`${goalPct.toFixed(0)}% of 16-lb goal`)),
    card('span3',metric('Recent stairs',latestStair?.stairs.completed||0,'climbs',latestStair?fmtLong(latestStair.date):'')),
    card('span3',metric('Latest row',latestRow?.rowing.at(-1)?.distanceM?.toLocaleString()||'—','m',latestRow?`${safe(latestRow.rowing.at(-1).avgWatts)} W · ${fmtDate(latestRow.date)}`:'')),
    card('span7',`<h2>Weight trend</h2>${chartShell('weight','weight')}<div class="legend"><span><i class="swatch"></i>Body weight</span><span><i class="swatch target"></i>${data.goals.weight.targetLb}-lb goal</span><span data-range-caption="weight"></span></div>`),
    card('span5',`<h2>16-lb cut</h2><div class="metric">${currentLoss.toFixed(1)} <span class="unit">lb down</span></div><div class="progress"><span style="width:${goalPct}%"></span></div><div class="goal-row"><span>Start <strong>${data.goals.weight.startLb}</strong></span><span>Target <strong>${data.goals.weight.targetLb}</strong></span></div><div class="note">Nutrition working range: ${data.goals.nutrition.calorieTargetMin.toLocaleString()}–${data.goals.nutrition.calorieTargetMax.toLocaleString()} kcal/day · protein ${data.goals.nutrition.proteinTargetMinG}–${data.goals.nutrition.proteinTargetMaxG} g/day.</div>`),
    card('span6',`<h2>Rowing power</h2>${chartShell('rowing','rowing')}<div class="legend"><span><i class="swatch alt"></i>Average watts</span><span data-range-caption="rowing"></span></div>`),
    card('span6',`<h2>Historical archive</h2>${metric('Structured sessions',histMeta.structuredSessionCount||data.historicalSummary.workoutSessions,'',`${fmtDate(histMeta.sourceStart||'2025-12-02')}–${fmtDate(histMeta.sourceEnd||data.historicalSummary.throughDate)}`)}<div class="goal-row" style="margin-top:18px"><span>Strength sets <strong>${(histMeta.structuredStrengthSetCount||data.historicalSummary.strengthSets).toLocaleString()}</strong></span><span>Weights loaded <strong>${histMeta.historicalWeightCount||198}</strong></span></div><div class="goal-row" style="margin-top:8px"><span>Rowing archive <strong>${(data.historicalSummary.rowingDistanceM/1000).toFixed(1)} km</strong></span><span>Movement days <strong>${data.historicalSummary.movementDays}</strong></span></div><div class="note">Historical weight, movement and session summaries now load into the app. The original 1,524 individual strength-set rows remain preserved in the source workbook.</div>`)
  ].join('');

  document.getElementById('weightGrid').innerHTML=[
    card('span8',`<h2>Body weight</h2>${chartShell('weight','weight')}<div class="legend"><span data-range-caption="weight"></span></div>`),
    card('span4',`${metric('Resting estimate',bmr,'kcal/day','Mifflin-St Jeor estimate')}<div style="height:18px"></div>${metric('Historical high',Math.max(...weights.map(w=>w.value)).toFixed(1),'lb',fmtDate(weights.reduce((a,b)=>a.value>b.value?a:b).date))}<div style="height:18px"></div>${metric('Goal weight',data.goals.weight.targetLb.toFixed(1),'lb','16 lb below Aug 31 baseline')}`),
    card('span12',`<h2>Recent weigh-ins</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Weight</th><th>Change</th></tr></thead><tbody>${weights.slice(-20).reverse().map((w,i,arr)=>{const older=arr[i+1];const ch=older?(w.value-older.value):null;return `<tr><td>${fmtLong(w.date)}</td><td><strong>${w.value.toFixed(1)} lb</strong></td><td>${ch===null?'—':`${ch>0?'+':''}${ch.toFixed(1)} lb`}</td></tr>`}).join('')}</tbody></table></div>`)
  ].join('');

  const hip=data.goals.hipThrust;
  const hipPct=hip.baselineLb/hip.targetMinLb*100;
  document.getElementById('trainingGrid').innerHTML=[
    card('span6',`<h2>Rowing progression</h2>${chartShell('rowing','rowing')}<div class="legend"><span data-range-caption="rowing"></span></div><div class="note">Latest: ${latestRow?`${latestRow.rowing.at(-1).distanceM?.toLocaleString()||'—'} m · ${safe(latestRow.rowing.at(-1).avgWatts)} W · ${latestRow.rowing.at(-1).totalStrokes?latestRow.rowing.at(-1).totalStrokes+' strokes':'stroke count not logged'}`:'—'}</div>`),
    card('span6',`<h2>Hip-thrust goal</h2><span class="pill">In progress</span><div class="metric" style="margin-top:12px">${hip.baselineLb} <span class="unit">lb baseline</span></div><div class="progress"><span style="width:${Math.min(100,hipPct)}%"></span></div><div class="goal-row"><span>Target <strong>${hip.targetMinLb}–${hip.targetMaxLb} lb</strong></span><span>By <strong>${fmtDate(hip.targetDate)}</strong></span></div><div class="note">${hip.plan}. Baseline: ${fmtLong(hip.baselineDate)}.</div>`),
    card('span12',`<h2>Recent training days</h2><div class="day-list">${rows.filter(d=>d.rowing.length||d.strength.length||d.activities.length||d.stairs?.completed).map(dayCard).join('')}</div>`)
  ].join('');

  function foodRows(f){return f.items.map(i=>`<tr><td>${i.name}</td><td>${i.amount}</td><td>${i.calories===null?'—':i.calories}</td><td>${i.proteinG===undefined||i.proteinG===null?'—':Number(i.proteinG).toFixed(1)}</td></tr>`).join('')}
  document.getElementById('nutritionGrid').innerHTML=latestFood?[
    card('span4',`${metric('Known calories',latestFood.food.caloriesKnown.toLocaleString(),'kcal',`${fmtLong(latestFood.date)} through ${latestFood.food.completeThrough}`)}<div style="height:18px"></div>${metric('Estimated protein',latestFood.food.proteinGEstimate,'g',`target ${data.goals.nutrition.proteinTargetMinG}–${data.goals.nutrition.proteinTargetMaxG} g`)}`),
    card('span8',`<h2>Latest food log</h2><div class="table-wrap"><table><thead><tr><th>Food</th><th>Amount</th><th>Calories</th><th>Protein g</th></tr></thead><tbody>${foodRows(latestFood.food)}</tbody></table></div>${latestFood.food.note?`<div class="note">${latestFood.food.note}</div>`:''}`),
    card('span12',`<h2>Frequent foods</h2><div class="table-wrap"><table><thead><tr><th>Food</th><th>Serving</th><th>Calories</th><th>Protein</th></tr></thead><tbody>${data.foodLibrary.map(i=>`<tr><td>${i.name}</td><td>${i.serving}</td><td>${i.calories}</td><td>${i.proteinG===null?'—':i.proteinG+' g'}</td></tr>`).join('')}</tbody></table></div>`)
  ].join(''):card('span12','<div class="empty">No food entries yet.</div>');

  function dayCard(d){
    const chips=[];
    if(Number.isFinite(d.weightLb)) chips.push(`<span class="chip"><strong>${d.weightLb.toFixed(1)}</strong> lb</span>`);
    if(d.stairs?.completed) chips.push(`<span class="chip"><strong>${d.stairs.completed}</strong> stair climbs${d.stairs.bouts>d.stairs.completed?` / ${d.stairs.bouts} recorded`:''}</span>`);
    d.rowing.forEach(r=>chips.push(`<span class="chip">Row <strong>${r.distanceM?.toLocaleString()||'—'} m</strong>${r.avgWatts?` · ${r.avgWatts} W`:''}</span>`));
    if(d.strength.length){
      const sets=d.strength.reduce((s,x)=>s+(Number.isFinite(x.setCount)?x.setCount:0),0);
      chips.push(`<span class="chip"><strong>${d.strength.length}</strong> strength session${d.strength.length===1?'':'s'}${sets?` · ${sets} sets`:''}</span>`);
    }
    d.activities.forEach(a=>chips.push(`<span class="chip"><strong>${a.modality}</strong>${a.durationSec?` · ${Math.round(a.durationSec/60)} min`:''}${a.distanceM?` · ${a.distanceM<1000?a.distanceM.toFixed(0)+' m':(a.distanceM/1000).toFixed(1)+' km'}`:''}</span>`));
    if(d.food) chips.push(`<span class="chip"><strong>${d.food.caloriesKnown.toLocaleString()}</strong> kcal</span>`);
    if(d.extras?.pushups) chips.push(`<span class="chip"><strong>${d.extras.pushups}</strong> pushups</span>`);
    if(d.extras?.coreCircuits) chips.push(`<span class="chip"><strong>${d.extras.coreCircuits}</strong> core sets</span>`);
    return `<div class="day"><div class="day-head"><div class="day-date">${fmtLong(d.date)}</div>${Number.isFinite(d.weightLb)?`<div class="day-weight">${d.weightLb.toFixed(1)} lb</div>`:''}</div><div class="chips">${chips.join('')}</div>${d.notes?`<div class="note">${d.notes}</div>`:''}</div>`;
  }

  document.getElementById('historyGrid').innerHTML=card('span12',`<h2>Complete daily log</h2><div class="note" style="margin:0 0 12px">Loaded from ${fmtLong(histMeta.sourceStart||daily[0].date)} through the latest live entry.</div><div class="day-list">${daily.slice().reverse().map(dayCard).join('')}</div>`);
  renderTrendCharts();
})();
