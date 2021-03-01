
//% weight=100 color=#007EFF icon="\uf022"
//% groups="['CHAT', 'SERVER']"
namespace CHAT {
    let receivedtoip : number
    let receivedfromip : string
    let fromid = 0
    let setflags = 0
   
   
    let myipaddress : number
     let myname =""
    let makestring = "" 
    let receivedtext : string 


    let onxHandler:  (name :string,value:number) => void
    let onGroupHandler: (name:string) => void
    //%block="グループ番号$nで使用するIDを$x　登録する名前を $y にする"
    //%weight=100
    //% group="CHAT"
    //% n.min=1 n.max=99 n.defl=1
    //% x.min=1 x.max=99 x.defl=1
    //% y.defl="namae"
    
     /**
     * TODO:デバイスのIDを定めて初期化
     */
    export function oninit(n:number,x:number,y:string){
        radio.setGroup(n)
        myipaddress = x
        myname = y
        radio.onReceivedValue(function (name: string, value: number) {
            if(setflags == 0){
            receivedfromip = name
            fromid = value
            setflags = 1
            }
            



            
        })

        radio.onReceivedString(function (receivedString: string) {
      
                
            
           if(setflags == 1){
            receivedtext = receivedString
                
            onxHandler(receivedtext,1)
            setflags = 0
           }
           
        })
    }

         
    /**
     * TODO:グループのメッセージの変更を検知したら実行
   　
     */
    //%weight=90
    //% group="CHAT","SERVER"
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
     * TODO:受信した相手のID（英数字のみ）
   　
     */
    //%weight=80
    //% group="CHAT"
    //% block="受信した相手のID（数字）"
    export function receivedid():number　{ 
        let fid = fromid
        return fid




    }
    /**
     * TODO:受信した相手の名前（英数字のみ）
   　
     */
    //%weight=80
    //% group="CHAT"
    //% block="受信した相手の名前（文字列）"
    export function receivedname():string　{ 
        let fname = receivedfromip
        return fname
        




    }
    




  
    /**
     * TODO:グループのデバイスに文字列（英数字のみ）を送信
     * @param y 送信する文字列,　eg:"HELLO"
   　
     */
    //%weight=70
    //% group="CHAT"
    
    //% block="グループ全体に文字列%yを送信（英数字のみ１７文字まで）"
    //% y.defl= "HELLO"
    export function sendmessege(y:string ){
       radio.sendValue(myname, myipaddress)
        

       
        
        radio.sendString(y)
        
        

    }



     /**
     * TODO:グループXのサーバーになりサーバーにメッセージの流れを監視する（IDは０、名前はSERVERで登録される）
   　
     */
    //%weight=60
    //% group="SERVER"
    //% block="グループ番号$nのサーバーになり、メッセージの流れを見る"
    //% n.min=1 n.max=99 n.defl=1
    export function server(n:number){
        radio.setGroup(n)
       
      

       radio.onReceivedValue(function (name: string, value: number) {
            if(setflags == 0){
            receivedfromip = name
            fromid = value
            setflags = 1
            }
            



            
        })

        radio.onReceivedString(function (receivedString: string) {
      
                
            
           if(setflags == 1){
            receivedtext = receivedString
                
            onxHandler(receivedtext,1)
            setflags = 0
           }
           
        })
    }
        


    

    
     /**
     * TODO:メッセージのやり取りがあったら実行する
   　
     */
    //%weight=50
    //% group="SERVER"
    //% block="グループでメッセージ$receivedtextのやり取りがあったら"
    //% receivedtext.defl=receivedtext
    //% draggableParameters="reporter"
    
    export function onserver(handler:(receivedtext:string)=>void){
         onxHandler = handler;
        
        
        
    }
    /**
     * TODO:メッセージの内容(デバイスID＋メッセージ)
   　
     */
    //%weight=40
    //% group="SERVER"
    //% block="受信したデバイスID : 登録された名前 : メッセージの内容の文字列"
    export function  receivedmessage():string　{ 
        let receivedmessage:string;
        receivedmessage = ""+convertToText(fromid)+":"+""+receivedfromip+":"+""+receivedtext;
        return receivedmessage;
        




    }
        /**
     * TODO:メッセージの内容(形式IPアドレス:メッセージ)
   　
     */
    //%weight=40
    //% group="SERVER"
    //% block="デバイスID + 名前 ＋ メッセージの内容の文字列をシリアル通信で出力"
    export function  messagetoserial():void　{ 
       let receivedmessage:string;
       receivedmessage = "|===DEVICEID: "+""+convertToText(fromid)+"===|==="+""+receivedfromip+"===|==="+""+receivedtext+"===|";
       
        serial.writeLine("RECEIVED!"); 
        serial.writeLine("|...[DEVICE_ID]...|...[NAME]...|......[MESSAGE].....|");
        serial.writeLine(receivedmessage);
        serial.writeLine("|=================|============|====================|");
        
        




    }
    
        /**
     * TODO:サーバーから全体にメッセージを送る
     * @param y 送る内容　,eg:"HELLO FROM SERVER"
   　
     */
    //%weight=40
    //% group="SERVER"
    //% block="サーバーから全体にメッセージ$yを送る"
    
    export function sendmessage(y:string):void{
        radio.sendValue("SERVER", 0)
        radio.sendString(y)

    

    }


    
}
    
    
