module.exports = (req,res) => {
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'יש להשתמש בטופס.'});
 let b=req.body;try{if(typeof b==='string')b=JSON.parse(b)}catch{return res.status(400).json({error:'בקשה לא תקינה.'})}
 const values={};for(const k of ['name','phone','service','date','time','notes'])values[k]=String(b?.[k]||'').trim();
 if(!values.name||values.name.length>80||! /^[+0-9 ()-]{9,20}$/.test(values.phone)||!/^\d{4}-\d{2}-\d{2}$/.test(values.date)||!/^\d{2}:\d{2}$/.test(values.time)||values.notes.length>500||!['החלקה אורגנית','קראטין','שיקום שיער','בוטוקס לשיער','גוונים','תספורת','ייעוץ'].includes(values.service))return res.status(400).json({error:'בדקו את השם, הטלפון, הטיפול, התאריך והשעה.'});
 const day=new Date(values.date+'T12:00:00Z');const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Jerusalem',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 if(isNaN(day)||day.toISOString().slice(0,10)!==values.date||values.date<today||Number(values.time.slice(0,2))>23||Number(values.time.slice(3))>59)return res.status(400).json({error:'בחרו יום תקין שאינו בעבר ושעה תקינה.'});
 return res.status(200).json({mode:'demo',delivered:false,booked:false,message:'הבקשה הוכנה לדוגמה בלבד. לא נשלח מייל ולא נקבע תור.',summary:values});
};
