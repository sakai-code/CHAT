
//% weight=100 color=#007EFF icon="\uf022"
//% groups="['CHAT', 'SERVER']"
namespace CHAT {
    let receivedtoip : number
    let receivedfromip : string
    let setgflags = 0
   
   
    let myipaddress : number
    let makestring = "" 
    let receivedtext : string 


    let onxHandler:  (name :string,value:number) => void
    let onGroupHandler: (name:string) => void
    //%block="グループ番号$nでデバイスのIDを$xにする"
    //%weight=100
    //% group="CHAT"
    //% n.min=1 n.max=99 n.defl=1
    //% x.min=1 x.max=99 x.defl=1
    
     /**
     * TODO:デバイスのIDを定めて初期化
     */
    export function oninit(n:number,x:number){
        radio.setGroup(n)
        myipaddress = x
       
       

        radio.onReceivedString(function (receivedString: string) {
            receivedfromip =  receivedString.substr(0,1)
                
            
           
            receivedtext = receivedString.substr(1,17)
                
            onxHandler(receivedtext,1)
           
        })
    }

         
    /**
     * TODO:グループのメッセージの変更を検知したら実行
   　
     */
    //%weight=90
    //% group="CHAT"
    //% block="グループのメッセージ|$receivedmessage|が変わったら実行する"
   //% receivedtext.defl=receivedtext
    //% draggableParameters="reporter"
    export function onfoo(handler:(receivedmessage:string)=> void){
        onxHandler = handler
      
    }
     /**
     * TODO:自分のIDを表示
   　
     */
    //%weight=90
    //% group="CHAT"
    //% block="自分のID:〇に設定した〇の数字を表示"
    export function myip():void{
        basic.showNumber(myipaddress)
      
    }
    /**
     * TODO:受信した文字列（英数字のみ）
   　
     */
    //%weight=80
    //% group="CHAT"
    //% block="受信した文字列（英数字）"
    export function receivedstring():string　{ 
        let receivedstring:string
        receivedstring = receivedtext
        return receivedstring




    }
  
    /**
     * TODO:グループのデバイスに文字列（英数字のみ）を送信
   　
     */
    //%weight=70
    //% group="CHAT"
    
    //% block="グループ全体に文字列%yを送信（英数字のみ１７文字まで）"
    //% y.defl= "HELLO"
    export function sendmessege(y:string ){
        

        makestring =""+ convertToText(myipaddress)+""+y ;
        
        radio.sendString(makestring)
        
        

    }

 







     /**
     * TODO:グループXのサーバーになりサーバーにメッセージの流れを監視する
   　
     */
    //%weight=60
    //% group="SERVER"
    //% block="グループ番号$nのサーバーになり、メッセージの流れを見る"
    //% n.min=1 n.max=99 n.defl=1
    export function server(n:number){
        radio.setGroup(n)
        setgflags = 0
      

        radio.onReceivedString(function (receivedString: string) {

        
           
                let ip = receivedString.substr(0,1)
                receivedfromip = ip
                receivedtext = receivedString.substr(1,17)
               
              
               

                onGroupHandler(receivedtext)
        })
    }
        


    

    
     /**
     * TODO:メッセージのやり取りがあったら実行する
   　
     */
    //%weight=50
    //% group="SERVER"
    //% block="グループでメッセージのやり取りがあったら"
    
    export function onserver(handler:()=>void){
         onGroupHandler = handler;
        
        
        
    }
    /**
     * TODO:メッセージの内容(デバイスID＋メッセージ)
   　
     */
    //%weight=40
    //% group="SERVER"
    //% block="デバイスID＋メッセージの内容の文字列"
    export function  receivedmessage():string　{ 
        let receivedmessage:string;
        receivedmessage = ""+convertToText(receivedfromip)+":"+""+receivedtext;
        return receivedmessage;
        




    }
        /**
     * TODO:メッセージの内容(形式IPアドレス:メッセージ)
   　
     */
    //%weight=40
    //% group="SERVER"
    //% block="デバイスID+:メッセージの内容の文字列文字列をシリアル通信で出力"
    export function  messagetoserial():void　{ 
       let receivedmessage:string;
       receivedmessage = "|===DEVICEID: "+""+convertToText(receivedfromip)+"===|"+"==="+""+receivedtext+"===|";
       
        serial.writeLine("RECEIVED!"); 
        serial.writeLine("|...[DEVICE_ID]...|......[MESSAGE].....|");
        serial.writeLine(receivedmessage);
        serial.writeLine("|=================|====================|");
        
        




    }
    
}
    
    
