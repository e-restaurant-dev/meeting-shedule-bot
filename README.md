# meeting-schedule-bot

## Setup

1. Download external libraries

```bash
npm install
```

2. Create config.json file and fill it with variables:

```json
{
    "token": "bot token",
    "clientId": "bot client id",
    "guildId": "id of discord server"
}
```

3. Deploy slash commands to be able to use it from the server

```bash
npm run deploy-commands
```

4. Run bot

```bash
npm run start # or "npm run dev" to run in development (hot reload) mode
```

### Commands stubs

* meet

`/meet user:@PunGy#9009 time:2022/07/17 23:11 zone:pl`
