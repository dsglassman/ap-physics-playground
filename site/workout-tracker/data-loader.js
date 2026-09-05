(async()=>{
  try{
    const packed=window.FITNESS_DATA_PACK||"";
    if(!packed) throw new Error("Historical data pack is missing.");
    const bin=atob(packed);
    const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    if(typeof DecompressionStream!=="function") throw new Error("This browser does not support gzip decompression.");
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    const text=await new Response(stream).text();
    const data=JSON.parse(text);

    const liveDays=window.LIVE_FITNESS_DATA?.days||[];
    if(liveDays.length){
      const byDate=new Map(data.days.map(d=>[d.date,d]));
      for(const live of liveDays){
        const prior=byDate.get(live.date)||{date:live.date};
        byDate.set(live.date,{...prior,...live});
      }
      data.days=[...byDate.values()].sort((a,b)=>a.date.localeCompare(b.date));
      data.dateRange.end=data.days.at(-1).date;

      const s=data.summary||{};
      s.datedEntries=data.days.length;
      s.weightDays=data.days.filter(d=>d.weight?.primaryLb!=null).length;
      s.strengthDays=data.days.filter(d=>d.strength).length;
      s.strengthSets=data.days.reduce((t,d)=>t+(d.strength?.exercises||[]).reduce((u,e)=>u+e.sets.length,0),0);
      s.rowingSectionsParsed=data.days.reduce((t,d)=>t+(d.rowing||[]).length,0);
      s.stairDays=data.days.filter(d=>d.stairs?.length).length;
      s.stairBouts=data.days.reduce((t,d)=>t+(d.stairs||[]).length,0);
      s.completedStairBouts=data.days.reduce((t,d)=>t+(d.stairs||[]).filter(x=>x.completed).length,0);
      s.nutritionDays=data.days.filter(d=>d.nutrition).length;
      data.summary=s;
    }

    window.FITNESS_DATA=data;
    window.dispatchEvent(new Event("fitness-data-ready"));
  }catch(error){
    window.FITNESS_DATA_ERROR=error;
    window.dispatchEvent(new Event("fitness-data-error"));
  }
})();