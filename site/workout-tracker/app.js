(() => {
  const data = window.SIMON_FORZA_DATA;
  const fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'});
  const fmtLong = (d) => new Date(d + 'T12:00:00').toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'});
  const daily = [...data.daily].sort((a,b)=>a.date.localeCompare(b.date));
  const weights = daily.filter(d=>Number.isFinite(d.weightLb)).map(d=>({date:d.date,value:d.weightLb}));
  const latest = daily[daily.length-1];
  const latestWeight = [...weights].pop();
  const previousWeight = weights.length>1?weights[weights.length-2]:null;
  const rows = daily.slice(-10).reverse();
  document.getElementById('lastUpdated').textContent = fmtLong(data.meta.lastUpdated);

  document.querySelectorAll('.nav button').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  }));

  const card=(cls,inner)=>`<article class="card ${cls}">${inner}</article>`;
  const metric=(label,val,unit='',sub='')=>`<div class="metric-label">${label}</div><div class="metric">${val}${unit?` <span class="unit">${unit}</span>`:''}</div>${sub?`<div class="delta">${sub}</div>`:''}`;
  const safe = (v, fallback='—') => (v===null || v===undefined || Number.isNaN(v)) ? fallback : v;
  const totalStairs = daily.reduce((s,d)=>s+(d.stairs?.completed||0),0);
  const totalRowRecent = daily.reduce((s,d)=>s+d.rowing.reduce((a,r)=>a+(r.distanceM||0),0),0);
  const currentLoss = latestWeight ? data.goals.weight.startLb - latestWeight.value : 0;
  const goalPct = Math.max(0,Math.min(100,currentLoss/data.goals.weight.lossGoalLb*100));

  function lineChart(points,{target=null,yPad=.5,lineClass='line'}={}){
    if(points.length<2) return `<div class="empty">Not enough data yet.</div>`;
    const W=760,H=240,p={l:48,r:16,t:16,b:34};
    const vals=points.map(p=>p.value); let min=Math.min(...vals),max=Math.max(...vals);
    if(target!==null){min=Math.min(min,target);max=Math.max(max,target)}
    min-=yPad;max+=yPad;if(max===min)max=min+1;
    const x=i=>p.l+i*(W-p.l-p.r)/(points.length-1);
    const y=v=>p.t+(max-v)*(H-p.t-p.b)/(max-min);
    const ticks=4;
    let svg=`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
    for(let i=0;i<=ticks;i++){const vv=max-(max-min)*i/ticks; const yy=y(vv);svg+=`<line class="gridline" x1="${p.l}" y1="${yy}" x2="${W-p.r}" y2="${yy}"/><text class="chart-label" x="${p.l-8}" y="${yy+4}" text-anchor="end">${vv.toFixed(1)}</text>`}
    if(target!==null){svg+=`<line class="target-line" x1="${p.l}" y1="${y(target)}" x2="${W-p.r}" y2="${y(target)}"/><text class="chart-label" x="${W-p.r}" y="${y(target)-6}" text-anchor="end">Target ${target}</text>`}
    const path=points.map((pt,i)=>`${i?'L':'M'} ${x(i).toFixed(1)} ${y(pt.value).toFixed(1)}`).join(' ');
    svg+=`<path class="${lineClass}" d="${path}"/>`;
    points.forEach((pt,i)=>{svg+=`<circle class="dot" cx="${x(i)}" cy="${y(pt.value)}" r="4"><title>${fmtLong(pt.date)}: ${pt.value}</title></circle>`});
    const labelIdx=[0,Math.floor((points.length-1)/2),points.length-1];
    [...new Set(labelIdx)].forEach(i=>svg+=`<text class="chart-label" x="${x(i)}" y="${H-10}" text-anchor="middle">${fmtDate(points[i].date)}</text>`);
    return svg+'</svg>';
  }

  function rowingChart(){
    const pts=[];daily.forEach(d=>d.rowing.forEach(r=>{if(Number.isFinite(r.avgWatts))pts.push({date:d.date,value:r.avgWatts,label:r.label})}));
    return lineChart(pts,{yPad:8,lineClass:'line2'});
  }

  const latestFood=[...daily].reverse().find(d=>d.food);
  const latestRow=[...daily].reverse().find(d=>d.rowing.length);
  const latestStair=[...daily].reverse().find(d=>d.stairs?.completed);
  const bmr=latestWeight ? Math.round(10*(latestWeight.value/2.20462)+6.25*(data.profile.heightIn*2.54)-5*data.profile.age+5) : null;

  document.getElementById('overviewGrid').innerHTML = [
    card('span3',metric('Current weight',latestWeight?.value?.toFixed(1),'lb',previousWeight?`${(latestWeight.value-previousWeight.value).toFixed(1)} lb vs prior weigh-in`:'')),
    card('span3',metric('Goal remaining',Math.max(0,(data.goals.weight.targetLb-latestWeight.value)*-1).toFixed(1),'lb',`${goalPct.toFixed(0)}% of 16-lb goal`)),
    card('span3',metric('Recent stairs',latestStair?.stairs.completed||0,'climbs',latestStair?fmtLong(latestStair.date):'')),
    card('span3',metric('Latest row',latestRow?.rowing.at(-1)?.distanceM?.toLocaleString()||'—','m',latestRow?`${latestRow.rowing.at(-1).avgWatts||'—'} W · ${fmtDate(latestRow.date)}`:'')),
    card('span7',`<h2>Weight trend</h2>${lineChart(weights,{target:data.goals.weight.targetLb,yPad:1})}<div class="legend"><span><i class="swatch"></i>Body weight</span><span><i class="swatch target"></i>191.4-lb goal</span></div>`),
    card('span5',`<h2>16-lb cut</h2><div class="metric">${currentLoss.toFixed(1)} <span class="unit">lb down</span></div><div class="progress"><span style="width:${goalPct}%"></span></div><div class="goal-row"><span>Start <strong>${data.goals.weight.startLb}</strong></span><span>Target <strong>${data.goals.weight.targetLb}</strong></span></div><div class="note">Nutrition working range: ${data.goals.nutrition.calorieTargetMin.toLocaleString()}–${data.goals.nutrition.calorieTargetMax.toLocaleString()} kcal/day · protein ${data.goals.nutrition.proteinTargetMinG}–${data.goals.nutrition.proteinTargetMaxG} g/day.</div>`),
    card('span6',`<h2>Rowing power</h2>${rowingChart()}<div class="legend"><span><i class="swatch alt"></i>Average watts</span></div>`),
    card('span6',`<h2>Historical archive</h2>${metric('Workout sessions',data.historicalSummary.workoutSessions,'',`through ${fmtDate(data.historicalSummary.throughDate)}`)}<div class="goal-row" style="margin-top:18px"><span>Strength sets <strong>${data.historicalSummary.strengthSets.toLocaleString()}</strong></span><span>Rowing <strong>${(data.historicalSummary.rowingDistanceM/1000).toFixed(1)} km</strong></span></div><div class="goal-row" style="margin-top:8px"><span>Movement days <strong>${data.historicalSummary.movementDays}</strong></span><span>Weights <strong>${data.historicalSummary.recordedWeights}</strong></span></div><div class="note">The historical source remains preserved; the live dashboard is being migrated into the structured web log.</div>`)
  ].join('');

  document.getElementById('weightGrid').innerHTML = [
    card('span8',`<h2>Body weight</h2>${lineChart(weights,{target:data.goals.weight.targetLb,yPad:1})}`),
    card('span4',`${metric('Resting estimate',bmr,'kcal/day','Mifflin-St Jeor estimate')}<div style="height:18px"></div>${metric('Height','6′0″','','')}<div style="height:18px"></div>${metric('Goal weight',data.goals.weight.targetLb.toFixed(1),'lb','16 lb below Aug 31 baseline')}`),
    card('span12',`<h2>Recent weigh-ins</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Weight</th><th>Change</th></tr></thead><tbody>${weights.slice(-15).reverse().map((w,i,arr)=>{const older=arr[i+1];const ch=older?(w.value-older.value):null;return `<tr><td>${fmtLong(w.date)}</td><td><strong>${w.value.toFixed(1)} lb</strong></td><td>${ch===null?'—':`${ch>0?'+':''}${ch.toFixed(1)} lb`}</td></tr>`}).join('')}</tbody></table></div>`)
  ].join('');

  const hip=data.goals.hipThrust; const hipPct=(hip.baselineLb-0)/(hip.targetMinLb)*100;
  document.getElementById('trainingGrid').innerHTML = [
    card('span6',`<h2>Rowing progression</h2>${rowingChart()}<div class="note">Latest: ${latestRow?`${latestRow.rowing.at(-1).distanceM.toLocaleString()} m · ${safe(latestRow.rowing.at(-1).avgWatts)} W · ${latestRow.rowing.at(-1).totalStrokes?latestRow.rowing.at(-1).totalStrokes+' strokes':'stroke count not logged'}`:'—'}</div>`),
    card('span6',`<h2>Hip-thrust goal</h2><span class="pill">In progress</span><div class="metric" style="margin-top:12px">${hip.baselineLb} <span class="unit">lb baseline</span></div><div class="progress"><span style="width:${Math.min(100,hipPct)}%"></span></div><div class="goal-row"><span>Target <strong>${hip.targetMinLb}–${hip.targetMaxLb} lb</strong></span><span>By <strong>${fmtDate(hip.targetDate)}</strong></span></div><div class="note">${hip.plan}. Baseline: ${fmtLong(hip.baselineDate)}.</div>`),
    card('span12',`<h2>Recent training days</h2><div class="day-list">${rows.filter(d=>d.rowing.length||d.strength.length||d.stairs?.completed).map(dayCard).join('')}</div>`)
  ].join('');

  function foodRows(f){return f.items.map(i=>`<tr><td>${i.name}</td><td>${i.amount}</td><td>${i.calories===null?'—':i.calories}</td><td>${i.proteinG===undefined||i.proteinG===null?'—':Number(i.proteinG).toFixed(1)}</td></tr>`).join('')}
  document.getElementById('nutritionGrid').innerHTML = latestFood ? [
    card('span4',`${metric('Known calories',latestFood.food.caloriesKnown.toLocaleString(),'kcal',`${fmtLong(latestFood.date)} through ${latestFood.food.completeThrough}`)}<div style="height:18px"></div>${metric('Estimated protein',latestFood.food.proteinGEstimate,'g',`target ${data.goals.nutrition.proteinTargetMinG}–${data.goals.nutrition.proteinTargetMaxG} g`)}`),
    card('span8',`<h2>Latest food log</h2><div class="table-wrap"><table><thead><tr><th>Food</th><th>Amount</th><th>Calories</th><th>Protein g</th></tr></thead><tbody>${foodRows(latestFood.food)}</tbody></table></div>${latestFood.food.note?`<div class="note">${latestFood.food.note}</div>`:''}`),
    card('span12',`<h2>Frequent foods</h2><div class="table-wrap"><table><thead><tr><th>Food</th><th>Serving</th><th>Calories</th><th>Protein</th></tr></thead><tbody>${data.foodLibrary.map(i=>`<tr><td>${i.name}</td><td>${i.serving}</td><td>${i.calories}</td><td>${i.proteinG===null?'—':i.proteinG+' g'}</td></tr>`).join('')}</tbody></table></div>`)
  ].join('') : card('span12','<div class="empty">No food entries yet.</div>');

  function dayCard(d){
    const chips=[];
    if(d.weightLb)chips.push(`<span class="chip"><strong>${d.weightLb.toFixed(1)}</strong> lb</span>`);
    if(d.stairs?.completed)chips.push(`<span class="chip"><strong>${d.stairs.completed}</strong> stair climbs</span>`);
    d.rowing.forEach(r=>chips.push(`<span class="chip">Row <strong>${r.distanceM?.toLocaleString()||'—'} m</strong>${r.avgWatts?` · ${r.avgWatts} W`:''}</span>`));
    if(d.strength.length) chips.push(`<span class="chip"><strong>${d.strength.length}</strong> strength session${d.strength.length===1?'':'s'}</span>`);
    if(d.food) chips.push(`<span class="chip"><strong>${d.food.caloriesKnown.toLocaleString()}</strong> known kcal</span>`);
    if(d.extras?.pushups)chips.push(`<span class="chip"><strong>${d.extras.pushups}</strong> pushups</span>`);
    return `<div class="day"><div class="day-head"><div class="day-date">${fmtLong(d.date)}</div>${d.weightLb?`<div class="day-weight">${d.weightLb.toFixed(1)} lb</div>`:''}</div><div class="chips">${chips.join('')}</div>${d.notes?`<div class="note">${d.notes}</div>`:''}</div>`;
  }

  document.getElementById('historyGrid').innerHTML = card('span12',`<h2>Recent daily log</h2><div class="day-list">${daily.slice().reverse().map(dayCard).join('')}</div>`);
})();
