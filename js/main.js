

const app = new Vue({
    el : '#app',
    data : {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        choosenContact : null,
        messageToSend : '',
        textToSearch : '',
        chatLengthBefore : undefined,
        chatLengthAfter : undefined,
        msgDetails : undefined,
        displaying : false,
        detailsClicked : false,
        lastLog : '',
    },

    methods : {
        choose(element){
            this.choosenContact = element;
        },

        sendMessage(messageToSend){
            if(messageToSend.trim() != ''){
                
                newMessage = { date : this.createDate(), message : messageToSend, status : 'sent' };
                this.choosenContact.messages.push(newMessage);
                this.messageToSend = '';
                setTimeout(this.reply,1000);
            }
        },

        reply(){
            newMessage = { date : this.createDate(), message : 'Okay Okay', status : 'received' };
            this.choosenContact.messages.push(newMessage);
        },    

        createDate(){
            let now = new Date();

            return (now.getDate()<10 ? '0' : '' )+ now.getDate()+'/'+(now.getMonth()<10 ? '0' : '' ) + (now.getMonth()+1)+'/'+now.getFullYear()+' '+(now.getHours()<10 ? '0' : '' )+now.getHours()+':'+(now.getMinutes()<10 ? '0' : '' )+now.getMinutes()+':'+(now.getSeconds()<10 ? '0' : '' )+now.getSeconds();
        },

        scrollBottom(){
            const chat = document.querySelector('#chat');
            chat.scrollTop = chat.scrollHeight;
        },

        lastMessage(element){
            let length = element.messages.length;
            return element.messages[length-1].message;
        },

        lastMessageTime(element){
            let length = element.messages.length;
            return element.messages[length-1].date.slice(10,16);
        },

        findLastLog(){
            const receivedMessages = this.choosenContact.messages.filter(element => element.status == 'received');

            if(receivedMessages.length > 0){
                let timeDiff = this.findTimeDiff(receivedMessages);
                console.log(timeDiff)
                if( timeDiff >= 0 && timeDiff < 6){
                    this.lastLog = 'Online';
                }
                else{
                    this.lastLog ='Ultimo accesso oggi alle '+ receivedMessages[receivedMessages.length-1].date.slice(10,16);
                }
            }
            else if(receivedMessages.length == 0){
                this.lastLog = '';
            }
        },
        
        findTimeDiff(receivedMessages){
            console.log(this.createDate())
            return (this.createDate().slice(10,13) -  receivedMessages[receivedMessages.length-1].date.slice(10,13)) + (this.createDate().slice(14,16) -  receivedMessages[receivedMessages.length-1].date.slice(14,16)) + (this.createDate().slice(17,20) -  receivedMessages[receivedMessages.length-1].date.slice(17,20));
        },

        displayMessageDetails(index){
            if(!this.detailsClicked){
                this.detailsClicked = true;            
                this.displaying = false;

                const msg = document.querySelector('#chat div .message:nth-child('+(index+1)+')');
                this.msgDetails = document.querySelector('#chat div .message:nth-child('+(index+1)+') .message-details');
                if(msg.classList.contains('message-received')){
                    this.msgDetails.style.left = (msg.clientWidth-20)+'px';
                }else{
                    this.msgDetails.style.right = (20)+'px';
                }
    
                this.msgDetails.style.display = 'inline-block';
            }
        },

        undisplayMessageDetails(){
            if(this.msgDetails != undefined && this.displaying){
                this.msgDetails.style.display = 'none';
                this.displaying = false;
                this.detailsClicked = false;            
            }
            this.displaying = true;
        },

        deleteMessage(index){
            this.choosenContact.messages.splice(index,1);
        }
    },

    beforeUpdate(){
        if(this.choosenContact != null){
            this.chatLengthBefore = document.querySelectorAll('.chat p').length;
        }
    },

    updated(){
        if(this.choosenContact != null){
            this.chatLengthAfter = document.querySelectorAll('.chat p').length;
            if(this.chatLengthAfter != this.chatLengthBefore){
                this.scrollBottom();
            };
            this.findLastLog();
        }
    }
})
