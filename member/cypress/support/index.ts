Cypress.on('test:before:run:async', async () => {
  if (!window.msw) {
    const { worker } = await import('@/libs/msw')
    await worker.start()
  }
})
