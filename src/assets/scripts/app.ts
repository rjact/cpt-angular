if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.ts')
		.then(() => {
			console.log('service worker registered');
		})
}