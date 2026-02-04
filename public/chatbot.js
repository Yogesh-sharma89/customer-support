

(function () {

    const apiUrl = 'https://customer-support-kappa-nine.vercel.app/api/chat'

    const scriptTag = document.currentScript;

    const ownerId = scriptTag.getAttribute('data-owner-id')

    if (!ownerId) {
        console.log("Owner id not found")
        return;
    }

    const button = document.createElement('div')

    button.innerHTML = `
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square-icon lucide-bot-message-square"><path d="M12 6V2H8"/><path d="M15 11v2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M9 11v2"/></svg>
    `

    document.body.appendChild(button);

    Object.assign(button.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        cursor: 'pointer',
        fontSize: 22,
        zIndex: 1000,
        boxShadow: '0px 15px 40px rgba(0,0,0,0.4)'
    })

    const chatWindow = document.createElement('div')

    Object.assign(chatWindow.style, {
        position: 'fixed',
        bottom: '90px',
        right: '24px',
        width: '90vw',
        maxWidth:'380px',
        height: '70vh',
        maxHeight:"420px",
        backgroundColor: '#fff',
        borderRadius: '14px',
        display: 'none',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 99999,
        fontFamily: "Inter, system-ui, sans-serif",
        boxShadow: "0px 25px 60px rgba(0,0,0,0.25)"
    })

    document.body.appendChild(chatWindow)

    chatWindow.innerHTML = `
        <div style="
        background:linear-gradient(135deg,#111,#333);
        color:#fff;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:15px 16px;
        font-weight:600;
        font-size:14px;
    ">
        <span>Customer Support</span>

        <span id="chat-close" style="
        cursor:pointer;
        font-size:18px;
        line-height:1;
        ">✕</span>
    </div>
    <div id = "chat-message" style="
        flex:1;
        padding:14px;
        background:#f7f7f8;
        overflow-y:auto;
        font-size:14px;
        color:#222;
        display:flex,
        flex-direction:column
    ">
        <div style="
        background:#fff;
        padding:10px 12px;
        border-radius:12px;
        width:max-content;
        max-width:80%;
        margin-bottom:18px
        box-shadow:0 2px 8px rgba(0,0,0,0.08);
        ">
      👋 Hi! How can we help you today?
        </div>

    
    </div>

    <div style="
        padding:10px;
        border-top:1px solid #eee;
        background:#fff;
    ">
    <div style="
      display:flex;
      align-items:center;
      gap:8px;
      background:#f4f4f5;
      border-radius:12px;
      padding:6px 8px;
    ">
      <input
        id="chat-input"
        type="text"
        placeholder="Type your message..."
        style="
          flex:1;
          border:none;
          outline:none;
          background:transparent;
          padding:8px 10px;
          font-size:14px;
          font-family:inherit;
        "
      />

      <button
        id="chat-send"
        style="
          width:36px;
          height:36px;
          border:none;
          border-radius:10px;
          background:linear-gradient(135deg,#111,#333);
          color:#fff;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:16px;
        "
      >
        ➤
      </button>
    </div>
    </div>

    `

    const closeBtn = document.querySelector('#chat-close')

    closeBtn.addEventListener('click',()=>{
        chatWindow.style.display = 'none';
    })

    button.onclick = ()=>{
        chatWindow.style.display = chatWindow.style.display==='none'?'flex':'none'
    }

    
    const sendbtn = document.querySelector('#chat-send');
    const messageArea = document.querySelector('#chat-message')

    function addMessage(text, sender = "bot") {

            const isUser = sender === "user";

            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.justifyContent = isUser ? "flex-end" : "flex-start";
            wrapper.style.marginBottom = "18px";

            const bubble = document.createElement("div");
            bubble.innerText = text;

            Object.assign(bubble.style, {
                background: isUser
                ? "linear-gradient(135deg,#111,#333)"
                : "#ffffff",
                color: isUser ? "#fff" : "#222",
                padding: "10px 12px",
                borderRadius: isUser
                ? "14px 4px 14px 14px"
                : "14px 14px 14px 4px",
                maxWidth: "75%",
                boxShadow: isUser
                ? "0 4px 12px rgba(0,0,0,0.15)"
                : "0 2px 8px rgba(0,0,0,0.08)",
                wordWrap: "break-word",
                fontSize: "14px",
                lineHeight: "1.4"
            });

            wrapper.appendChild(bubble);
            messageArea.appendChild(wrapper);

            messageArea.scrollTop = messageArea.scrollHeight;
    }

    sendbtn.onclick = async()=>{
        const input = document.querySelector('#chat-input');
        const text = input?.value?.trim();
        if(!text){
            window.alert('Message in required')
            return
        }

        addMessage(text,'user')
        input.value = ''

        const typing = document.createElement('div')

        typing.innerHTML = 'Typing...'

        Object.assign(typing.style,{
            fontSize:'12px',
            marginBottom:'10px',
            alignSelf:'flex-start',
            color:'#6b7280'
        })

        messageArea.appendChild(typing)
        messageArea.scrollTop = messageArea.scrollHeight;

        try{

            const response = await fetch(apiUrl,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify({
                    message:text,ownerId
                })
            })

            const data = await response.json();
            addMessage(data.response,'bot')
            messageArea.removeChild(typing)

        }catch(err){
          console.log(`Error occured while sending message : ${err}`)
          messageArea.removeChild(typing)
          addMessage(err || 'There is some technical error','bot')
        }
    }




})()