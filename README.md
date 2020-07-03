# ikea-availability
Script to check availability for any given product

## Getting Started

### Dependencies

- node
- npm

You can find installers for node (it includes npm) in the official website: https://nodejs.org/en/download/

### Run it

- Clone the repo `git clone https://github.com/anditosl/ikea-availability.git`
- Go to `ikea-availability` directory
- `npm install`
- `node index.js --stores <string> --product <string>`

Example
```
node index.js --stores 399,162,167,413 --product 40260717
```

## Where do I find the IDs?

### Product ID
Look at the ending of the URL for a given product.
For example, for Alex Desk in White, URL is https://www.ikea.com/us/en/p/alex-desk-white-40260717/. As you can see, Product ID is *40260717*

### Stores IDs
Go to https://www.ikea.com/ext/us/local-stores/ and select the store you want to check. You will find the store number right below the name/location.
For example, for "CA, Burbank" store, you will see the following information on the page:
```
CA, Costa Mesa
Store 167
Address:
1475 S Coast Dr, Costa Mesa, CA 92626
```
In that case, store ID is *167*
