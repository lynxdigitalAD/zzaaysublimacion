import { expect, test } from '@playwright/test'

for (const [width, height] of [[1366, 633], [1280, 600], [1536, 695], [1024, 650], [1920, 800], [1920, 600], [1000, 480]]) {
  test(`laptop categories: ${width}x${height} fits and scrolls in both directions at normal zoom`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('.pin-spacer')).toHaveCount(1)
    await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Categorías', exact: true }).click()
    const shell = page.locator('.collections-shell')
    await expect.poll(async () => Math.abs((await shell.boundingBox())!.y - 84)).toBeLessThan(2)
    const bounds = (await shell.boundingBox())!
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(height + 1)
    const content = page.locator('.collections-heading, .collection-caption, .collections-bottom')
    for (const element of await content.all()) {
      const box = (await element.boundingBox())!
      expect(box.y).toBeGreaterThanOrEqual(84)
      expect(box.y + box.height).toBeLessThanOrEqual(height + 1)
    }
    const distance = await page.locator('.collections-track').evaluate(track => track.scrollWidth - track.parentElement!.clientWidth)
    expect(distance).toBeGreaterThan(50)
    const start = await page.evaluate(() => scrollY)
    const first = page.locator('.collection').first()
    const initialX = (await first.boundingBox())!.x
    await page.evaluate(delta => window.scrollBy({ top: delta, behavior: 'instant' }), Math.min(500, distance * .6))
    await expect.poll(async () => (await first.boundingBox())!.x).toBeLessThan(initialX - 20)
    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), start)
    await expect.poll(async () => Math.abs((await first.boundingBox())!.x - initialX)).toBeLessThan(2)
    const last = page.getByRole('link', { name: 'Personalizar tazas para empresas' })
    await last.focus()
    await expect(last).toBeInViewport()
    await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Trabajos', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'De aquí. Con mucha historia.' })).toBeInViewport()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('category height and motion boundaries clean up the pin without hiding content', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 633 })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  for (const height of [633, 480, 799, 800, 479, 633]) {
    await page.setViewportSize({ width: 1366, height })
    await expect(page.locator('.pin-spacer')).toHaveCount(height >= 480 ? 1 : 0)
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(page.locator('.collection')).toHaveCount(5)
  await page.getByRole('link', { name: 'Personalizar tazas para empresas' }).focus()
  await expect(page.getByRole('link', { name: 'Personalizar tazas para empresas' })).toBeInViewport()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
})
