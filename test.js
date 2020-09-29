const TestClient = require('./test-client')
const client = new TestClient('luke', 1)
const bot = require('./bot')(client)
client.login()

// test an ordinary message
client.mockMessage('Hello, World', msg =>
{
    throw "Ordinary message should not receive a response."
})

// test !help
client.mockMessage('!help', msg =>
{
    console.log('!help received message')
})

// test !joke
client.mockMessage('!joke', msg =>
{
    console.log('!joke received msg.')
})

// Test !joke but at the end (should not do anything)
client.mockMessage('Hello !joke', msg =>
{
    throw "This should not have responded with anything"
})

client.mockMessage(`Hey Luke, I am confused?`, msg =>
{
    if(msg === `Hi confused, I'm Dad!`)
    {
    }
    else
    {
        throw "Wrong response to confused"
    }
})

client.mockMessage(`I am thirsty and I'm hungry`, msg =>
{
    if(msg === `Hi thirsty and hungry, I'm Dad!`)
    {
    }
    else
    {
        throw "Wrong response to thirst & hungry"
    }
})

client.mockMessage('I am worried', msg =>
{
    if(msg === `Hi worried, I'm Dad!`)
    {

    }
    else
    {
        throw "Does not pad correctly"
    }
})

client.mockMessage(`I am angry. This does not work.`, msg =>
{
    if(msg === `Hi angry, I'm Dad!`)
    {

    }
    else
    {
        throw 'Sentence issues'
    }
})


client.mockMessage('You and him are jerks.', msg =>
{
    throw 'Should not reply'
})

client.mockMessage(`I am dumb! This is silly. Also I'm programming`, msg =>
{
    if(msg === `Hi dumb and programming, I'm Dad!`)
    {

    }
    else
    {
        throw "Does not recognize I'm in multiple sentences"
    }
})

client.mockMessage(`I'm simple`, msg =>
{
    if(msg === `Hi simple, I'm Dad!`)
    {

    }
    else
    {
        throw "Does not split correctly"
    }
})