import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {DragDropContext,Droppable,Draggable}from "react-beautiful-dnd"
import initialData from './inital-data';
import { render } from 'react-dom';
import { ReactDOM } from 'react';
// to do şükrü 
//günleri boş derslerle dolduran fonksiyon yap baştaki for u 5 gün içinde çalıştır bitti
//boş ders in yerine dolu ders girilince boş dersi sil ve eğer değişiklik geri alınrsa yeniden oluştur 
//en sonunda bütün dropble ları bi container in içine al dersin dışarı düşmesi problemini önle 
//dolu derslerin ıd sini dizide const gibi yap çakışma veya kayma olmasın 
//saatleri tabloda göster
//giriş ve derslik seçme sayfası ekle 
//backend ile nasıl etkileşim kurulacağına bak 
//dersleri yazdırıken indexleri de yazdır çök karışık 




const DATA = [
  {
    id: "01",
    name: "Veri Yapilari ve algoritmalar",
    
  },
  {
    id: "02",
    name: "Nesneye yonelik programlama",
  },
  {
    id: "03",
    name: "Gereksinim analizi",
  },
  {
    id: "045",
    name: "lab",
  },  {
    id: "04343",
    name: " dağitik sistemler",
  },
  {
    id: "0404",
    name: "ders listesini sonu",
  },
];
const DATAP = [

];
const DATASA = [

];
const DATAS = [
  
];
const DATAC = [
  
];
const DATAPER = [
  
];
const DATACUMA = [
  
];
const DATACUMAt = [
  
];
var x=0;


function App() {
  
  var i;

  const[arr,setSal]= useState(DATAS);
  const[ders,setStores]= useState(DATA);
  const[pazartesi,setPazart]=useState(DATAP);
  const[sali,setSali]=useState(DATASA);
  const[car,setCAR]=useState(DATAC);
  const[per,setPER]=useState(DATAPER);
  const[cuma,setCUMA]=useState(DATACUMA);
  const[cumat,setCUMAt]=useState(DATACUMAt);

 
  const gundizi=[ders,pazartesi,sali,car,per,cuma];//günler dizisi
  const clolumn=["dersler","pazartesi","sali","car","per","cuma"];
  //01 ders
  //11 pazartesi
  //21 salı ... 10lar basamağı günü temsil ediyo  birler basamağı ıd
  function gunOLustur(arr,idkey){
    for(i=0;i<14;i++){
      //id ler çakışıyo daha unick yapıcak bişey lazım  11 12 13 14 le çarpılanlar bir oncekiyle çakışıyo
      let num = idkey*1000+i;//pazartesinin id leri i*10  salınınki i*20  burda sorun var ıd de sıra yı  ve günü tutmak için daha değişk bi sistem lazım 
      let textid = num.toString();
      const placeh= new Object();
      placeh.id=textid;
      placeh.name=".";
      arr.push(placeh);
      console.log("a");
    }
  }
  if(x===0){
    //render başlayınca sadece bir defa doldursun diye x i kullanıyorum 
    gunOLustur(pazartesi,1);
    gunOLustur(sali,2);
    gunOLustur(car,3);
    gunOLustur(per,4);
    gunOLustur(cuma,5);
    gunOLustur(cumat,6);

  }
  x=1;
  const handleUniversal=(results)=>{
    const{ source, destination , type}=results;
    
  }
  const handleDragDrop=(results) => {
    const{ source, destination , type}=results;
    console.log("drag drop oluyo",results);
    console.log(ders);
    console.log(pazartesi);
    console.log({destination,source});
    //splice hatasının çözümü için index kopyası olarak column dan bakıyorum 
    var indexsource=clolumn.indexOf(source.droppableId);
    var indexdest=clolumn.indexOf(destination.droppableId);

    const sourceIndex=source.index;
    const destinationIndex=destination.index;
    console.log({destination,source});

    const arrtempsource=gundizi[indexsource];
    const arrtempdest=gundizi[indexdest];
    const tempdestcheck=arrtempdest[destinationIndex];
    const tempsourcheck=arrtempsource[sourceIndex];
    //yukardaki 4 const dakiler alttaki iflerde kullandıklarım 
    if(!destination) return;//null safety için
    console.log(destination.droppableId);
    

    if(source.droppableId===destination.droppableId && source.index===destination.index) return;

    if(source.droppableId===destination.droppableId){
      //burda boş derslerin aynı sütunda yer değiştirebilmesini sağlamam lazım 
      const reoederedDersler=gundizi[indexsource];
      const sourceIndex=source.index;
      const destinationIndex=destination.index;
      const [removedDers]=reoederedDersler.splice(sourceIndex,1);//hareket halindeki dersi listeden silip removedDersin içine atar
      reoederedDersler.splice(destinationIndex,0,removedDers);
      console.log({destination,source});
      gundizi[indexsource]=reoederedDersler;
      return ;
    }
    if(arrtempsource.length!=0){
      if(tempsourcheck.name==="."){
        console.log("boş ders oynatma");
       
        return ;
      }

    }
    console.log(gundizi);
   // console.log(" source dropbleid index :",gundizi.FindIndex(source.droppableId));
    //console.log("desti dropbleid index :",gundizi.FindIndex(destination.droppableId));

    //herhangibi bi yerden başka bir yere gidişte çalışıcak  
    //hala düzeltemededim splice hatası devam ediyo 11.12.2023  şimdi fark ettim stringin modunu alıyorum




    if(arrtempdest.length!=0){
      if(tempdestcheck.name==="."){
        console.log("boş ders tatil");
        const [removedDers]=arrtempsource.splice(sourceIndex,1);//hareket halindeki dersi listeden silip removedDersin içine atar
        arrtempdest.splice(destinationIndex,1);//hedefteki boş ise onu silip yerine geleni yazıcam
        arrtempdest.splice(destinationIndex,0,removedDers);
        if(arrtempsource!==ders){
          let numt = 7*1000+(Math.floor(Math.random() * 100));//id de int i normalden 3 basamak fazladan başlatıcam 7000+random(1-100 arası gibi ) ünickliği sağlamalı
          let textidt= numt.toString();
          const placeht= new Object();
          placeht.id=textidt;
          placeht.name=".";
          arrtempsource.splice(sourceIndex,0,placeht);
          //dersler dışındaki bi yerden başka bir yere ders taşırken soucedakiboş kalan yeri random ıd li bi boş ders ile doldurmamlazım


        }
        gundizi[indexsource] = arrtempsource;
        gundizi[indexdest]=arrtempdest;
        return ;
      }

    }


 
    //const sourceIndex=source.index;
    //const destinationIndex=destination.index;
    console.log({destination,source});
   // console.log(" source dropbleid index :",gundizi.FindIndex(source.droppableId));
    //console.log("desti dropbleid index :",gundizi.FindIndex(destination.droppableId));
    //const indexfind=Object.values(gundizi);
    //console.log(indexfind);
    //console.log(source.droppableId);
    
    console.log("indexler::...::",indexsource,indexdest);
    //index of bulamıyo -1 dondürüyo 
    //const arrtempsource=gundizi[indexsource];
   // const arrtempdest=gundizi[indexdest];
    //console.log("source------------------     destianation =>",arrtempsource,arrtempdest);

    //her günden her güne ders taşıma

    if(arrtempsource.length!=0){
      if(tempsourcheck.name!="."){
        console.log("boş ders oynatma");
        //burda bide elaman ekledim ama yanlış ekledşm geri alıcaksam yenşden boş bi ders oluşturmam lazım s
        const [removedDers]=arrtempsource.splice(sourceIndex,1);//hareket halindeki dersi listeden silip removedDersin içine atar
        arrtempdest.splice(destinationIndex,0,removedDers);
        gundizi[indexsource] = arrtempsource;
        gundizi[indexdest]=arrtempdest;
        return ;
        //iki sütun arasında gün değişiminde source a birtane boş ders eklemem lazım 
        //ders sayısı başta azalıyo ama sonradan eklemiyorum 
      }

    }
    //şimdilik heryerdenher yere burda kalsın normalde yukardaki if return edince buralar çalışmıyccak
    const [removedDers]=arrtempsource.splice(sourceIndex,1);//hareket halindeki dersi listeden silip removedDersin içine atar
    arrtempdest.splice(destinationIndex,0,removedDers);
    gundizi[indexsource] = arrtempsource;
    gundizi[indexdest]=arrtempdest;
    return ;
    //console.log({ders,source});
    //return üde dizili yapmam lazım

    
    
     
    
 
  }
  return (
    <div className="App">
     
      <DragDropContext onDragEnd={handleDragDrop}>

      <div className='card'>
        
          <div className='header'>
            <h1>dersler</h1>
          </div>
          <Droppable droppableId='dersler'  type='group'>
           
            {(provided) => (
              <div{...provided.droppableProps} ref={provided.innerRef}>
                 {ders.map((ders, index ) => (
                    <Draggable 
                    draggableId={ders.id} 
                    key={ders.id} 
                    index={index} >
                      {(provided)=>(
                        <div>
                          <div className='ders-container' {...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                            <h3>{ders.name}</h3>
                          </div>
                        </div>
                      )}
                    </Draggable>
                 ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        
      </div>
      
      
      <div className='tablo-saat'>
        <h1>Saat</h1>
        
        <h3 className='saat'>9.00-10.00</h3>
        <h3 className='saat'>10.00-11.00</h3>
        <h3 className='saat'>11.00-12.00</h3>
        <h3 className='saat'>12.00-13.00</h3>
        <h3 className='saat'>13.00-14.00</h3>
        <h3 className='saat'>14.00-15.00</h3>
        <h3 className='saat'>15.00-16.00</h3>
        <h3 className='saat'>16.00-17.00</h3>
        <h3 className='saat'>17.00-18.00</h3>
        <h3 className='saat'>18.00-19.00</h3>
        <h3 className='saat'>19.00-20.00</h3>
        <h3 className='saat'>20.00-21.00</h3>
        <h3 className='saat'>21.00-22.00</h3>
        <h3 className='saat'>22.00-23.00</h3>
      </div>

     
     <div className='tablo'>
          <h1>Pazartesi</h1>
          <Droppable  clasname='hafta' droppableId="pazartesi" type='group'>
            {(provided) => (
              <div{...provided.droppableProps} ref={provided.innerRef}>
                 {pazartesi.map((pazartesi, index ) => (
                    <Draggable 
                    draggableId={pazartesi.id} 
                    key={pazartesi.id} 
                    index={index} >
                      {(provided)=>(
                        <div>
                          <div className={pazartesi.name==="." ? 'ders-bos':'ders-container'}{...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                            <h3>{pazartesi.name}</h3>
                          </div>
                        </div>
                      )}
                    </Draggable>
                    
                 ))}
                {provided.placeholder}
              </div>
            )}


            

          </Droppable>
          
      </div>
      <div className='tablo'>
      <h1>Sali</h1>
          <Droppable  clasname='hafta' droppableId="sali" type='group'>
            {(provided) => (
              <div{...provided.droppableProps} ref={provided.innerRef}>
                 {sali.map((sali, index ) => (
                    <Draggable 
                    draggableId={sali.id} 
                    key={sali.id} 
                    index={index} >
                      {(provided)=>(
                        <div>
                          <div className={sali.name==="." ? 'ders-bos':'ders-container'}{...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                            <h3>{sali.name}</h3>
                          </div>
                        </div>
                      )}
                    </Draggable>
                    
                 ))}
                {provided.placeholder}
              </div>
            )}


            

          </Droppable>
          
      </div>


     
      <div className='tablo'>
      <h1>Çarşamba</h1>
          <Droppable  clasname='hafta' droppableId="car" type='group'>
            {(provided) => (
              <div{...provided.droppableProps} ref={provided.innerRef}>
                 {car.map((car, index ) => (
                    <Draggable 
                    draggableId={car.id} 
                    key={car.id} 
                    index={index} >
                      {(provided)=>(
                        <div>
                          <div className={car.name==="." ? 'ders-bos':'ders-container'}{...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                            <h3>{car.name}</h3>
                          </div>
                        </div>
                      )}
                    </Draggable>
                    
                 ))}
                {provided.placeholder}
              </div>
            )}


            

          </Droppable>
          
      </div>


     
      <div className='tablo'>
      <h1>Perşembe</h1>
          <Droppable  clasname='hafta' droppableId="per" type='group'>
            {(provided) => (
              <div{...provided.droppableProps} ref={provided.innerRef}>
                 {per.map((per, index ) => (
                    <Draggable 
                    draggableId={per.id} 
                    key={per.id} 
                    index={index} >
                      {(provided)=>(
                        <div>
                          <div className={per.name==="." ? 'ders-bos':'ders-container'}{...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                            <h3>{per.name}</h3>
                          </div>
                        </div>
                      )}
                    </Draggable>
                    
                 ))}
                {provided.placeholder}
              </div>
            )}


            

          </Droppable>
          
      </div>

      
      <div className='tablo'>
      <h1>Cuma</h1>
          <Droppable  clasname='hafta' droppableId="cuma" type='group'>
            {(provided,snapshot) => (
              <div{...provided.droppableProps} ref={provided.innerRef}style={{
                //minHeight: '360px', // Set the minimum height here
                backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              }}>
                 {cuma.map((cuma, index ) => (
                    <Draggable 
                    draggableId={cuma.id} 
                    key={cuma.id} 
                    index={index} >
                      {(provided)=>(
                        <div>
                          <div className={cuma.name==="." ? 'ders-bos':'ders-container'}{...provided.dragHandleProps}{...provided.draggableProps} ref={provided.innerRef}>
                            <h3>{cuma.name}</h3>
                          </div>
                        </div>
                      )}
                    </Draggable>
                    
                 ))}
                {provided.placeholder}
              </div>
            )}


            

          </Droppable>
          
      </div>
      
      





      </DragDropContext>
     
 

      
    </div>
  );
}

export default App;
