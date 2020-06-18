# waitgroup

A tiny version of Golang's [WaitGroup](https://golang.org/pkg/sync/#WaitGroup) for Deno with promises and zero dependencies outside of `std`.

```ts
import { WaitGroup } from "https://raw.githubusercontent.com/jpwilliams/waitgroup-deno/v1.0.0/mod.ts";

const wg = new WaitGroup()

const urls = [
	'http://www.golang.org/',
	'http://www.google.com/',
	'http://www.somestupidname.com/'
]

urls.forEach((url) => {
	// Increment the WaitGroup counter
	wg.add(1)
	// Fetch the URL
	fetch(url).then(() => {
		// Decrement the counter when the GET is complete
		wg.done()
	})
})

// Wait for all HTTP fetches to complete
await wg.wait()

```

For most applications, using built-ins like `Promise.all` will work perfectly, but sometimes this can be a really nice abstraction if the promises you have to keep track of are pretty spread out.

See [jpwilliams/waitgroup](https://github.com/jpwilliams/waitgroup) for a Node.js version.
