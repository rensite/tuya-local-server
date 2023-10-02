# tuya-local-server

This repo is for experiments with local tuya devices.

Fill config file using your devices details.

```
export const config = [
	{
		type: "switch6",
		name: "Device Name",
	    ip: "192.168.0.123",
	    id: "456273158765238761",
	    key: "Ku8c43jhdwcwewe",
	},
  ...
]
```

## Docs

Uses following lib [https://codetheweb.github.io/tuyapi/index.html](https://github.com/codetheweb/tuyapi)https://github.com/codetheweb/tuyapi as the main functionality.
