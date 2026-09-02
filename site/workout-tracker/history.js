(() => {
  const parseNum = v => v === '' ? null : Number(v);
  const weights = `2025-12-02,211.3
2025-12-03,209.6
2025-12-04,208.6
2025-12-05,206.4
2025-12-06,206
2025-12-07,208.4
2025-12-08,208.8
2025-12-09,207.6
2025-12-10,206.6
2025-12-11,205.8
2025-12-12,206.8
2025-12-13,207.4
2025-12-14,208.8
2025-12-15,209.7
2025-12-16,207.4
2025-12-17,207.6
2025-12-18,208.6
2025-12-19,208.4
2025-12-21,208
2025-12-22,210.8
2025-12-23,208.4
2025-12-24,208.4
2025-12-25,208.4
2025-12-26,208.2
2025-12-27,211
2025-12-28,210.6
2025-12-31,208.4
2026-01-01,209.6
2026-01-03,210.4
2026-01-07,208.4
2026-01-08,208.2
2026-01-09,205.5
2026-01-10,206.4
2026-01-11,207.2
2026-01-12,209.2
2026-01-13,208.4
2026-01-14,207.4
2026-01-15,205.8
2026-01-16,206.2
2026-01-17,206.8
2026-01-18,206.2
2026-01-19,208.2
2026-01-21,207.8
2026-01-22,205.6
2026-01-23,204.4
2026-01-24,204.8
2026-01-25,206.6
2026-01-26,208
2026-01-27,205.6
2026-01-28,205.2
2026-01-29,203
2026-01-30,204.2
2026-01-31,205.2
2026-02-01,206.2
2026-02-03,207.6
2026-02-04,204.4
2026-02-05,202.8
2026-02-06,204
2026-02-07,203
2026-02-08,204.8
2026-02-09,204.6
2026-02-10,203
2026-02-11,202.2
2026-02-12,201.6
2026-02-13,202.8
2026-02-14,203.2
2026-02-15,204.2
2026-02-16,203.6
2026-02-17,203
2026-02-18,202.2
2026-02-19,201.6
2026-02-20,200.8
2026-02-21,200.8
2026-02-22,201.6
2026-02-23,202.4
2026-02-24,203.2
2026-02-25,203.2
2026-02-26,201.6
2026-02-27,201.2
2026-02-28,202.8
2026-03-01,201.8
2026-03-02,202.4
2026-03-03,203.8
2026-03-04,201.6
2026-03-05,200.8
2026-03-07,202.7
2026-03-08,202
2026-03-09,202.8
2026-03-10,202.4
2026-03-11,202.8
2026-03-12,201.6
2026-03-13,203.4
2026-03-14,203.2
2026-03-15,203.4
2026-03-16,203.2
2026-03-17,203.2
2026-03-18,201
2026-03-19,201.8
2026-03-20,202.8
2026-03-21,201.8
2026-03-26,201.6
2026-03-27,201.4
2026-03-28,201
2026-03-30,203.4
2026-03-31,202.8
2026-04-01,201.6
2026-04-02,201.2
2026-04-03,200.9
2026-04-04,203
2026-04-05,203.1
2026-04-06,203.2
2026-04-07,203.3
2026-04-08,203.4
2026-04-09,203.5
2026-04-10,203.6
2026-04-11,203.7
2026-04-12,203.8
2026-04-13,204.2
2026-04-14,204
2026-04-15,203.8
2026-04-19,203.4
2026-04-20,204.6
2026-04-21,203
2026-04-22,201.8
2026-04-23,201.6
2026-04-24,201.8
2026-04-25,200.6
2026-04-26,202
2026-04-27,201.6
2026-04-28,200
2026-04-29,199.8
2026-04-30,199
2026-05-01,199.2
2026-05-02,199.8
2026-05-03,201.6
2026-05-04,200.2
2026-05-05,199
2026-05-06,199.8
2026-05-07,199.2
2026-05-08,198
2026-05-09,198.2
2026-05-10,199.8
2026-05-11,199.8
2026-05-12,199.4
2026-05-13,201
2026-05-14,201.8
2026-05-15,200
2026-05-16,199.8
2026-05-28,200.2
2026-05-29,199.6
2026-05-30,199.2
2026-06-03,200.8
2026-06-05,201.8
2026-06-06,200.2
2026-06-07,200.2
2026-06-08,202.8
2026-06-10,200.8
2026-06-11,200.4
2026-06-12,200.8
2026-06-17,202
2026-06-18,202.8
2026-06-20,203.6
2026-06-22,205
2026-06-23,203.4
2026-06-24,201.8
2026-06-30,202.4
2026-07-01,202.8
2026-07-02,201.6
2026-07-03,201.4
2026-07-04,201.2
2026-07-05,201
2026-07-06,200.8
2026-07-07,200.6
2026-07-08,200.4
2026-07-09,200.1
2026-07-10,199.4
2026-07-11,200.4
2026-07-12,203.2
2026-07-13,205.2
2026-07-14,204.2
2026-07-15,203.2
2026-07-16,200
2026-07-17,199.6
2026-07-18,201
2026-07-19,203
2026-07-20,205
2026-07-21,202.4
2026-07-22,202
2026-07-23,202.8
2026-07-24,201.6
2026-08-14,206.8
2026-08-18,204.8
2026-08-19,204
2026-08-25,204.2
2026-08-27,201.4
2026-08-28,202
2026-08-29,204.8
2026-08-30,208`.trim().split('\n').map(r => {
    const [date,value] = r.split(',');
    return [date, Number(value)];
  });
  const sessions = `2025-12-02|Strength|Strength workout|7||||||
2025-12-03|Strength|Strength workout|2||||||
2025-12-04|Strength|Strength workout|3||||||
2025-12-05|Strength|Strength workout|4||||||
2025-12-06|Strength|Strength workout|13|10:23|||||
2025-12-07|Strength|Strength workout|17|11:35|||||
2025-12-10|Strength|Strength workout|9|18:11|||||
2025-12-12|Strength|Strength workout|9|08:30|||||
2025-12-13|Strength|Strength workout|11|10:25|||||
2025-12-14|Strength|Strength workout|9|08:32|||||
2025-12-15|Strength|Strength workout|8|22:28|||||
2025-12-16|Strength|Strength workout|8|17:45|||||
2025-12-17|Strength|Strength workout|7|19:59|||||
2025-12-19|Strength|Strength workout|8|13:02|||||
2025-12-20|Strength|YMCA Fishers total body Row|17|12:31|||||
2025-12-21|Strength|YMCA Fishers total body Row|20|11:33|||||
2025-12-24|Strength|Strength workout|11|16:52|||||
2025-12-25|Strength|Strength workout|10|09:27|||||
2025-12-26|Strength|Strength workout|9|13:15|||||
2025-12-27|Strength|YMCA Fishers total body Row|27|10:25|||||
2025-12-28|Strength|YMCA Fishers total body Row|24|11:29|||||
2025-12-31|Strength|YMCA Fishers total body Row|25|09:52|||||
2026-01-01|Strength|Strength workout|8|10:31|||||
2026-01-03|Strength|YMCA Fishers total body Row|14|10:19|||||
2026-01-04|Strength|YMCA Fishers total body Row|21|12:02|||||
2026-01-07|Strength|Upper body 1 (Home)|12|06:32|||||
2026-01-08|Rowing|Concept2 row|||1204|4149|145.2|114|231
2026-01-09|Rowing|Concept2 row|||724|2439|148.4|102|134
2026-01-09|Strength|Upper body 1 (Home)|13|05:33|||||
2026-01-10|Strength|Strength workout|3|09:52|||||
2026-01-11|Strength|Leg workout 1|13|13:38|||||
2026-01-12|Cycling|Stationary bike|||2760||||358
2026-01-13|Rowing|Concept2 row|||1802|5920|152.4|99|321
2026-01-14|Rowing|Concept2 row|||1802|6090|148.1|109|336
2026-01-15|Strength|Strength workout|5|20:21|||||
2026-01-18|Rowing|Concept2 row|||1202|4028|149.2|105|221
2026-01-19|Strength|Strength workout|10|12:27|||||
2026-01-24|Strength|YMCA Fishers total body Row|18|09:16|||||
2026-02-01|Strength|Leg workout 1|14|12:18|||||
2026-02-02|Strength|Strength workout|3|19:20|||||
2026-02-04|Strength|Upper body 1 (Home)|9|07:07|||||
2026-02-08|Strength|Core 4 Abs Activator I|9|13:01|||||
2026-02-09|Strength|Core 4 Abs Activator I Adductors|9|18:26|||||
2026-02-10|Strength|Upper body 1 (Home)|11|08:14|||||
2026-02-11|Strength|Core 4 Abs Activator I Adductors|9|20:05|||||
2026-02-14|Strength|YMCA Fishers total body Row|30|13:23|||||
2026-02-15|Strength|Leg workout 1|14|15:14|||||
2026-02-16|Strength|YMCA Fishers total body Row|19|13:26|||||
2026-02-17|Rowing|Concept2 row|||1379|4253|162.0|82|223
2026-02-18|Rowing|Concept2 row|||1320|4315|153.0|98|233
2026-02-18|Strength|Core 4 Abs Activator I Adductors|12|19:55|||||
2026-02-21|Strength|YMCA Fishers total body Row|36|11:38|||||
2026-02-22|Strength|Leg workout 1|14|11:25|||||
2026-02-28|Strength|YMCA Fishers total body Row|25|17:15|||||
2026-03-01|Strength|Nippard Leg Day 1|19|12:20|||||
2026-03-03|Strength|Upper body 1 (Home)|11|07:33|||||
2026-03-05|Strength|Upper body 1 (Home)|7|08:15|||||
2026-03-07|Strength|YMCA Fishers total body|23|10:33|||||
2026-03-08|Strength|Upper body 1 (Home)|3|22:43|||||
2026-03-09|Strength|Upper body 1 (Home)|12|20:35|||||
2026-03-11|Strength|Upper body 1 (Home)|8|18:10|||||
2026-03-14|Strength|Upper #1 YMCA Fishers|33|10:12|||||
2026-03-15|Strength|Leg workout 1|23|11:07|||||
2026-03-16|Rowing|Concept2 row|||1202|4046|148.5|107|222
2026-03-19|Strength|Strength workout|5|21:44|||||
2026-03-21|Strength|Upper #1 YMCA Fishers|34|15:40|||||
2026-03-22|Strength|Leg workout 1|22|15:43|||||
2026-03-23|Rowing|Concept2 row|||1202|4024|149.4|105|220
2026-03-24|Rowing|Concept2 row|||1201|4155|144.5|116|233
2026-03-25|Rowing|Concept2 row|||1260|4282|147.2|110|237
2026-03-25|Rowing|Concept2 row|||1200|4228|142.0|122|240
2026-03-28|Strength|Upper #1 YMCA Fishers|34|07:10|||||
2026-03-30|Rowing|Concept2 row|||1260|4159|152.7|100|226
2026-03-30|Rowing|Concept2 row|||1201|4160|144.4|116|233
2026-04-01|Rowing|Concept2 row|||960|3207|149.7|104|175
2026-04-02|Strength|Strength workout|3||||||
2026-04-03|Strength|Strength workout|4|19:13|||||
2026-04-06|Strength|Leg workout 1|17|11:20|||||
2026-04-08|Strength|Strength workout|9|09:16|||||
2026-04-09|Strength|Home: pull-ups|27|10:57|||||
2026-04-11|Strength|Upper #1 YMCA Fishers|29|14:01|||||
2026-04-12|Strength|Strength workout|13|10:41|||||
2026-04-12|Strength|Leg workout 1|21|14:16|||||
2026-04-13|Rowing|Concept2 row|||1201|4277|140.4|127|245
2026-04-14|Rowing|Concept2 row|||1261|4301|146.6|111|239
2026-04-15|Strength|Strength workout|3|21:21|||||
2026-04-15|Rowing|Concept2 row|||1202|4269|140.9|125|244
2026-04-19|Strength|Strength workout|3|10:09|||||
2026-04-19|Strength|Leg workout 1|15|15:58|||||
2026-04-20|Rowing|Concept2 row|||1201|4323|138.9|130|249
2026-04-21|Rowing|Concept2 row|||1205|4416|136.4|138|259
2026-04-22|Rowing|Concept2 row|||983|3755|132.2|156|228
2026-04-23|Rowing|Concept2 row|||1201|4150|144.7|115|232
2026-04-24|Rowing|Concept2 row|||1201|4372|137.4|135|255
2026-04-25|Strength|Upper #1 YMCA Fishers|29|07:11|||||
2026-04-27|Rowing|Concept2 row|||1801|6357|141.7|123|362
2026-04-28|Rowing|Concept2 row|||1383|5011|138.1|133|291
2026-04-29|Rowing|Concept2 row|||1202|4341|138.5|132|251
2026-05-02|Strength|Upper #1 YMCA Fishers|31|14:31|||||
2026-05-09|Strength|Upper #1 YMCA Fishers|28|13:06|||||
2026-05-16|Strength|Leg workout 1 – 1st half|9|10:15|||||
2026-05-16|Strength|Leg workout 1 – part 2|7|18:32|||||
2026-05-17|Strength|Upper #1 YMCA Fishers|8|15:49|||||
2026-05-23|Strength|Upper #1 YMCA Fishers|15|10:13|||||
2026-05-24|Strength|Upper #1 YMCA Fishers|8|10:01|||||
2026-05-24|Strength|Leg workout 1|13|11:56|||||
2026-05-25|Strength|Upper #1 YMCA Fishers|28|09:45|||||
2026-05-26|Strength|Upper #1 YMCA Fishers|5|09:21|||||
2026-05-26|Strength|Leg workout 1|14|18:51|||||
2026-05-27|Strength|Strength workout|3|21:21|||||
2026-05-28|Strength|Strength workout|3|21:58|||||
2026-05-31|Strength|Strength workout|3|12:37|||||
2026-05-31|Swimming|Swimming|||360|482.8032|||
2026-05-31|Strength|Strength workout|4|22:00|||||
2026-06-01|Strength|Strength workout|4|18:15|||||
2026-06-03|Strength|Strength workout|2|21:40|||||
2026-06-06|Strength|Upper #1 YMCA Fishers|26|10:03|||||
2026-06-07|Strength|Leg workout 1|16|12:18|||||
2026-06-10|Strength|Leg workout 1|15|19:53|||||
2026-06-11|Strength|Upper #1 YMCA Fishers|23|19:41|||||
2026-06-13|Strength|Upper #1 YMCA Fishers|24|10:21|||||
2026-06-14|Strength|Leg workout 1|18|11:28|||||
2026-06-15|Strength|Home pull-ups|16|18:46|||||
2026-06-16|Strength|Leg workout 1|15|16:08|||||
2026-06-18|Strength|Upper body 1 (Home)|14|19:43|||||
2026-06-19|Strength|Leg workout 1|16|09:14|||||
2026-06-20|Strength|YMCA Fishers total body Row|12|09:39|||||
2026-06-22|Strength|Upper body 1 (Home)|10|19:53|||||
2026-06-23|Strength|Leg workout 1|15|18:54|||||
2026-06-25|Strength|Upper #1 YMCA Fishers|15|19:44|||||
2026-06-27|Strength|Strength workout|29||||||
2026-07-02|Strength|Upper body 1 (Home)|10|19:49|||||
2026-07-03|Strength|Leg workout 1|15|12:44|||||
2026-07-12|Strength|Upper #1 YMCA Fishers|16|14:24|||||
2026-07-31|Strength|Upper #1 YMCA Fishers|20|14:51|||||
2026-08-23|Rowing|Concept2 row|||600|2179|137.7|136|126
2026-08-24|Rowing|Concept2 row|||601|2221|135.3|141|131
2026-08-29|Strength|Leg workout 1|18||||||
2026-08-30|Rowing|Concept2 row|||602|2102|143.2|119|118
2026-08-30|Rowing|Concept2 row|||601|2066|145.6|113|115`.trim().split('\n').map(r => {
    const [d,m,w,sets,t,sec,dist,split,watt,cal] = r.split('|');
    return {d,m,w,sets:parseNum(sets),t:t||null,sec:parseNum(sec),dist:parseNum(dist),split:parseNum(split),watt:parseNum(watt),cal:parseNum(cal)};
  });
  const extraSessions = `2026-02-09|Rowing|Concept2 row|||1202|3981|151.0|102|217|raw`.trim().split('\n').map(r => {
    const [d,m,w,sets,t,sec,dist,split,watt,cal,source] = r.split('|');
    return {d,m,w,sets:parseNum(sets),t:t||null,sec:parseNum(sec),dist:parseNum(dist),split:parseNum(split),watt:parseNum(watt),cal:parseNum(cal),source};
  });
  const movement = `2026-01-15|11|0||
2026-02-11|13|13||
2026-02-12|7|7||
2026-02-13|13|13||
2026-02-19|11|11||
2026-02-20|8|8||
2026-02-24|3|3||
2026-02-25|12|12|240|0
2026-02-27|2|2||
2026-03-03|8|8||
2026-03-04|13|13||
2026-03-05|13|13||
2026-03-11|10|10||
2026-03-12|7|7||
2026-03-16|12|12||
2026-03-17|10|10||
2026-03-20|10|10||
2026-03-25|10|10|200|0
2026-03-26|10|10|200|0
2026-03-27|10|9|180|0
2026-03-30|11|11|160|0
2026-03-31|10|10|180|0
2026-04-01|10|10|200|0
2026-04-03|10|10||
2026-04-13|14|14||
2026-04-24|10|10||
2026-04-28|13|13||
2026-04-29|14|14||
2026-04-30|1|1||
2026-05-01|13|13||
2026-05-04|11|11||
2026-05-06|12|11||
2026-05-07|14|14||
2026-05-11|12|9||
2026-05-12|6|6||
2026-05-14|2|2||
2026-05-15|11|11||
2026-05-18|7|7||
2026-06-08|10|9||
2026-06-09|10|10||
2026-06-10|3|3||
2026-07-06|12|12||
2026-07-13|11|11||
2026-07-15|12|12||
2026-07-16|16|16||
2026-07-17|4|4||
2026-07-20|17|16||
2026-07-22|17|16||
2026-07-23|4|4||
2026-08-13|12|12|140|10
2026-08-14|12|12|130|11
2026-08-17|10|10|100|10
2026-08-18|8|8|80|8
2026-08-19|9|0||`.trim().split('\n').map(r => {
    const [d,b,c,pu,core] = r.split('|');
    return {d,b:Number(b),c:Number(c),pu:parseNum(pu),core:parseNum(core)};
  });
  window.SIMON_FORZA_HISTORY = {
    meta: {
      sourceStart: '2025-12-02',
      sourceEnd: '2026-08-30',
      historicalWeightCount: weights.length,
      structuredSessionCount: sessions.length,
      structuredStrengthSetCount: 1524,
      note: 'Historical weight, movement, and session-summary archive migrated from the structured workout tracker. The original 1,524 set-level strength rows remain preserved in the source workbook.'
    },
    weights,
    sessions,
    extraSessions,
    movement
  };
})();
