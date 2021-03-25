
//% weight=100 color=#007EFF icon="\uf022"　block="チャット"
//% groups="['CHAT', 'MONITOR']"
namespace CHAT {
    let receivedtoip = 0
    let receivedfromip = ""
    let fromid = 0
    let setflags = 0
   
   
    let myipaddress = 0
     let myname =""
    let makestring = "" 
    let receivedtext = ""
    let secret = 0


    let onxHandler:  (name :string  ) => void

    function onsethandler(handler:()=>void){
        onxHandler = handler //これがないとメモリエラーになる


    }
    onsethandler(function(){})
  
    //%block="グループ $n で使用するID番号（数字) $x　登録する名前を $y にする"
    //%weight=100
    //% group="CHAT"
    //% n.min=1 n.max=99 n.defl=1
    //% x.min=1 x.max=19 x.defl=1
    //% y.defl="namae"
    
     /**
     * TODO:デバイスのIDを定めて初期化
     */
    export function oninit(n:number,x:number,y:string){
        radio.setGroup(n)
        myipaddress = x
        myname = y
        radio.onReceivedValue(function (name: string, value: number) {
            
            switch(setflags){
            case 0: receivedfromip = name
            fromid = value
            setflags = 1
            
            case 1 : break
            case 2:  setflags = 0 
            break 

            case 3: receivedfromip = name
            fromid = value
            setflags = 4

            case 4: break

            }
            



            
        })

        radio.onReceivedString(function (receivedString: string) {
      
                
            switch(setflags){
                case 0: break
                case 1: receivedtext = receivedString
                
                onxHandler(receivedtext)
                setflags = 0
                secret = 0

                case 2 : break
                case 3: break
                case 4: receivedtext = "SECRET: "+""+receivedString
                
                onxHandler(receivedtext)
                setflags = 0
                secret = 0


            }
          
           
        })
        radio.onReceivedNumber(function (receivedNumber: number) {
            if( receivedNumber == myipaddress){
                setflags = 3


            }else{setflags =2

            }
            
        })
    }

         
    /**
     * グループのメッセージの変更を検知したら実行
   　
     */
    //%weight=90
    //% group="CHAT","SERVER"
    //% block="メッセージ|$message|を受信したらこのブロック内のプログラムを実行する"
   //% message.defl=receivedtext
//% draggableParameters="reporter"
    export function onhand(handler:(message:string)=> void){
        onxHandler = handler
      
    }

     /**
     * 自分のIDを表示
   　
     */
    //%weight=90
    //% group="CHAT"
    //% block="自分のID:〇に設定した〇の数字を表示"
    export function myip():void{
         if(myipaddress < 10){basic.showNumber(myipaddress)

        }else{
            switch(myipaddress){
                case 10:
                basic.showLeds(`
                # . # # #
                # . # . #
                # . # . #
                # . # . #
                # . # # #
                `)
                break
                case 11:
                 basic.showLeds(`
                # . . # .
                # . . # .
                # . . # .
                # . . # .
                # . . # .
                `)
                break
                case 12:
                basic.showLeds(`
    # . # # #
    # . . . #
    # . # # #
    # . # . .
    # . # # #
    `)
    break
                case 13:
                basic.showLeds(`
    # . # # #
    # . . . #
    # . # # #
    # . . . #
    # . # # #
    `)     
    break    
                 case 14:
    basic.showLeds(`
    # . # . #
    # . # . #
    # . # # #
    # . . . #
    # . . . #
    `)     
    break
                case 15:
                basic.showLeds(`
    # . # # #
    # . # . .
    # . # # #
    # . . . #
    # . # # #
    `)
    break
                case 16:
                basic.showLeds(`
    # . # # #
    # . # . .
    # . # # #
    # . # . #
    # . # # #
    `)
    break
                case 17:
                basic.showLeds(`
    # . # # #
    # . . . #
    # . . . #
    # . . . #
    # . . . #
    `)
    break
                case 18:
                basic.showLeds(`
    # . # # #
    # . # . #
    # . # # #
    # . # . #
    # . # # #
    `)
    break
                case 19:
                basic.showLeds(`
    # . # # #
    # . # . #
    # . # # #
    # . . . #
    # . . . #
    `)
    break
                default: 
                basic.showNumber(myipaddress)
                break






            }
           

        }
       
      
    }
    /**
     * 受信しメッセージ（英数字のみ）
   　
     */
    //%weight=80
    //% group="CHAT"
    //% block="最後に受信したメッセージ(英数字）"
    export function receivedstring():string　{ 
        let receivedstring:string

        receivedstring = receivedtext
        return receivedstring




    }

    /**
     * TODO:最後に受信した相手のID（英数字のみ）
   　
     */
    //%weight=80
    //% group="CHAT"
    //% block="最後に受信した相手のID番号（数字）"
    export function receivedid():number　{ 
        let fid = fromid
        return fid




    }
    /**
     * TODO:受信した相手の名前（英数字）
   　
     */
    //%weight=80
    //% group="CHAT"
    //% block="最後に受信した相手の名前（英数字）"
    export function receivedname():string　{ 
        let fname = receivedfromip
        return fname
        




    }
    




  
    /**
     * TODO:グループのデバイスに文字列（英数字のみ）を送信
     * @param y 送信するメッセージ　eg:"HELLO"
   　
     */
    //%weight=70
    //% group="CHAT"
    
    //% block="グループ全体にメッセージ　%y　を送信（英数字のみ１７文字まで）"
    //% y.defl= "HELLO"
    export function sendmessege(y:string ){
       radio.sendValue(myname, myipaddress)
        

       
        
        radio.sendString(y)
        
        

    }
     /**
     * TODO:指定したID番号にメッセージを送る。
     * @param y 送信する文字列,　eg:"HELLO"
   　
     */
    //%weight=70
    //% group="CHAT"
    //% n.defl=1  
    //% block="指定したID$nにメッセージ　%y　を秘匿送信（英数字のみ１７文字まで）"
    //% y.defl= "HELLO"
    export function sendsecretmessege(n:number,y:string ){
        radio.sendNumber(n)
       radio.sendValue(myname, myipaddress)
   
        radio.sendString(y)
        
        

    }



     /**
     * TODO:グループXのモニターになりサーバーにメッセージの流れを監視する（IDは０、名前はSERVERで登録される）
   　
     */
    //%weight=60
    //% group="MONITOR"
    //% block="グループ番号$nのモニター機器になり、メッセージの流れを見る"
    //% n.min=1 n.max=99 n.defl=1
    export function server(n:number){
        radio.setGroup(n)
        myipaddress =  0
        myname = "SERVER"
        radio.onReceivedValue(function (name: string, value: number) {
            
            switch(setflags){
            case 0: receivedfromip = name
            fromid = value
            setflags = 1
            
            case 1 : break
            case 2: break 

            case 3: receivedfromip = name
            fromid = value
            setflags = 1
            
            

            }
            



            
        })

        radio.onReceivedString(function (receivedString: string) {
      
                
            
           if(setflags == 1){
            receivedtext = receivedString
                
            onxHandler(receivedtext)
            setflags = 0
            basic.pause(5)
            secret = 0
           }
           
        })
        radio.onReceivedNumber(function (receivedNumber: number) {
          setflags = 3
          secret = 1
          receivedtoip = receivedNumber
          
            
        })

    }
        


    

    
     /**
     * TODO:文字列のやり取りがあったら実行する
   　
     */
    //%weight=50
    //% group="MONITOR"
    //% block="グループでメッセージのやり取りがあったら"
   
    
    export function onserver(handler:()=>void){
         onxHandler = handler;
        
        
        
    }
    /**
     * TODO:メッセージの内容(デバイスID＋メッセージ)
   　
     */
    //%weight=40
    //% group="MONITOR"
    //% block="受信したデバイスID : 登録された名前 : メッセージの内容の文字列"
    export function  receivedmessage():string　{ 
        let receivedmessage:string;
        if(secret){
        receivedmessage = ""+convertToText(fromid)+"to"+""+convertToText(receivedtoip) +" SECRETMESSAGE";
        return receivedmessage;
        }else{receivedmessage = ""+convertToText(fromid)+":"+""+receivedfromip+":"+""+receivedtext;
        return receivedmessage;

        }
        




    }
        /**
     * TODO:メッセージの内容(形式IPアドレス:メッセージ)
   　
     */
    //%weight=40
    //% group="MONITOR"
    //% block="デバイスID + 名前 ＋ メッセージの内容をシリアル通信で出力"
    export function  messagetoserial():void　{ 
       let receivedmessage:string;
       if(secret){
            receivedmessage = "|=======FROM: "+""+convertToText(fromid)+"->"+""+convertToText(receivedtoip)+"======|===SECRETMESSAGE===|"
       
        serial.writeLine("SECRET SEND DETECTED!"); 
        serial.writeLine("|...[FROMID -> TOID  ]...|......[MESSAGE]....|");
        serial.writeLine(receivedmessage);
        serial.writeLine("|=======================|===================|");

       }else{
       receivedmessage = "|===DEVICEID: "+""+convertToText(fromid)+"===|==="+""+receivedfromip+"===|==="+""+receivedtext+"===|";
       
        serial.writeLine("RECEIVED!"); 
        serial.writeLine("|...[DEVICE_ID]...|...[NAME]...|......[MESSAGE].....|");
        serial.writeLine(receivedmessage);
        serial.writeLine("|=================|============|====================|");
       }
        
        




    }
    
        /**
     * TODO:サーバーから全体にメッセージを送る
     * @param y 送る内容　,eg:"HELLO FROM MASTER"
   　
     */
    //%weight=40
    //% group="MONITOR"
    //% block="モニター機器から全体にメッセージ$yを送る"
    
    export function sendmessage(y:string):void{
        radio.sendValue("SERVER", 0)
        radio.sendString(y)

    

    }



    
}
    
    
