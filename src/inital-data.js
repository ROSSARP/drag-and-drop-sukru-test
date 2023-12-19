const initialData={
dersler:{
    'task-1':{id:'task-1',content:'lineercebir'},
    'task-2':{id:'task-2',content:'makine öğrenmesi temelleri'},
    'task-3':{id:'task-3',content:'calculus'},
    'task-4':{id:'task-4',content:'ingilizce'},

},
day:{
'pazartesi':{id:'pazartesi',title:'gün',taskIds:['task-1','task-2']},
'sali':{id:'salı',title:'gün',taskIds:['task-3','task-4']},
},
dayOrder:['pazartesi','sali']
};
export  default  initialData;