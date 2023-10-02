import TuyAPI from 'tuyapi'
import express from 'express'
const app = express()
const port = 3001

import { config } from './config.js'

app.use(express.json());
const connections = []

config
  .filter((device) => device.type === 'switch6')
  .forEach((device) => {
    let tuyaConf = {
      ...device, 
      version: '3.3',
      issueRefreshOnConnect: true
    }
    let tuya = new TuyAPI(tuyaConf)
    tuya.find().then((e) => {
      tuya.connect()
    })
    
    tuya.on('connected', () => {
      console.log(`Connected to ${tuyaConf.name}!`)
    })

    tuya.on('disconnected', () => {
      console.log(`Disconnected from ${tuyaConf.name}!`)
    })

    tuya.on('data', data => {
      console.log('data', data)
    })

    tuya.on('dp-refresh', data => {
      console.log('data', data)
    })

    tuya.on('heartbeat', () => {
      console.log('heartbeat')
    })


    tuya.on('error', error => {
      console.log('error', error)
    })

    connections[device.id] = tuya
  })


app.get('/', (req, res) => {
  res.json(Object.entries(connections).map(([key, value]) => key));
})

app.post('/', (req, res) => {
  const { device_id, switch_id } = req.body;
  connections[device_id].toggle(switch_id)
    .then(data => res.json(data) )
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});