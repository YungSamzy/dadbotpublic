class MockMessage 
{
    constructor(text, func) 
    {
        this.content = text
        this.author = {}
        this.channel = {
            send: (msg) =>
            {
                console.log(`Message sent: ${msg}`)
                if(func) func(msg)
            }
        }
    }
}


class TestClient
{

    constructor(username, id)
    {
        this.username = username
        this.id = id
        this.registered_events = {}
    }


    on(eventName, func) {
        if(!this.registered_events[eventName])
        {
            this.registered_events[eventName] = []
        }
        this.registered_events[eventName].push(func)
    }

    trigger(eventName, data) {
        if(this.registered_events[eventName])
        {
            this.registered_events[eventName].forEach(func =>
            {
                func(data)
            })
        }
    }

    login()
    {
        this.trigger('ready')
    }


    mockMessage(text, func)
    {
        let message = new MockMessage(text, func)
        this.trigger('message', message)
    }
}

module.exports = TestClient