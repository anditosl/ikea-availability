const program = require('commander')
const axios = require('axios')

const availApi = axios.create({
	method: 'get',
	baseURL: 'https://iows.ikea.com/retail/iows/us/en',
	headers: {
		authority:'iows.ikea.com',
		accept:'application/vnd.ikea.iows+json;version=1.0',
		contract:'37249',
		consumer:'MAMMUT',
		'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
		origin:'https://www.ikea.com',
		'sec-fetch-site':'same-site',
		'sec-fetch-mode':'cors',
		'sec-fetch-dest':'empty',
		referer:'https://www.ikea.com/us/en/p/alex-desk-white-40260717/',
		'accept-language':'en-US,en;q=0.9,es-US;q=0.8,es;q=0.7',
		//'if-modified-since':'Thu, 25 Jun 2020 04:45:46 GMT',
	}
});

program
  .option('-s, --stores <string>', 'Stores')
  .option('-p, --product <string>', 'Product')
  .parse(process.argv)

const SUCCESS = 0
const FAILURE = 1
;(async () => {
  try {
    const { stores, product } = program
    const storesToCheck = stores.split(',').map(Number)

    let responses = []

    for (let store of storesToCheck) {
    	const response = await availApi(`/stores/${store}/availability/ART/${product}`)
    	responses.push(response)
    }

    for (let response of responses) {
    	const retailItemAvailability = response.data.StockAvailability.RetailItemAvailability
    	const availNow = retailItemAvailability.AvailableStock.$
    	const text = retailItemAvailability.StockAvailabilityInfoList ? retailItemAvailability.StockAvailabilityInfoList.StockAvailabilityInfo[0].StockAvailInfoText.$ : 'No Message'
    	console.log('Current Stock:', availNow)
    	console.log(text)
    	console.log('Forecast:')
    	const availableStockForecast = response.data.StockAvailability.AvailableStockForecastList.AvailableStockForecast
    	for (let el of availableStockForecast) {
    		const stock = el.AvailableStock.$
    		const probability = el.InStockProbabilityCode.$
    		const datetime = el.ValidDateTime.$
    		console.log(`${stock} is ${probability} on ${datetime}`)
    	}
    	console.log('============')
    }

    process.exit(SUCCESS)
  } catch (e) {
    console.log(`error running script: ${e}`)
    process.exit(FAILURE)
  }
})()
