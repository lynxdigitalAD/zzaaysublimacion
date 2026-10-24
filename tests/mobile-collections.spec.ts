import { expect, test, type Page } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

async function openCategories(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Categorías', exact: true }).click()
  await expect.poll(async () => Math.round((await page.locator('#categorias').boundingBox())!.y)).toBe(92)
  await expect.poll(() => page.locator('.collection').first().evaluate(element => +getComputedStyle(element).opacity)).toBe(1)
}

async function swipe(page: Page, start: { x: number; y: number }, end: { x: number; y: number }) {
  const session = await page.context().newCDPSession(page)
  try {
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [start] })
    for (let step = 1; step <= 12; step++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: start.x + (end.x - start.x) * step / 12, y: start.y + (end.y - start.y) * step / 12 }] })
      await page.waitForTimeout(30)
    }
    await page.waitForTimeout(90)
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  } finally { await session.detach() }
}

test('touch swipes advance and reverse categories without capturing vertical page scroll', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Trusted touch injection uses Chromium CDP; WebKit retains the keyboard and native-scroll checks.')
  await openCategories(page)
  const rail = page.getByRole('region', { name: 'Explorar categorías' })
  await expect(rail.locator('.collection')).toHaveCount(5)
  await expect(page.locator('#categorias button')).toHaveCount(0)
  const image = (await rail.locator('figure').first().boundingBox())!
  const y = image.y + 120
  const initialY = await page.evaluate(() => scrollY)
  await swipe(page, { x: 330, y }, { x: 60, y })
  await expect.poll(async () => Math.round((await rail.locator('.collection').nth(1).boundingBox())!.x)).toBe(24)
  expect(Math.abs(await page.evaluate(() => scrollY) - initialY)).toBeLessThan(2)
  await expect.poll(() => rail.locator('.collection').nth(1).evaluate(element => +getComputedStyle(element).opacity)).toBe(1)

  await swipe(page, { x: 60, y }, { x: 330, y })
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBeLessThan(2)
  await swipe(page, { x: 160, y: y + 160 }, { x: 160, y: y - 80 })
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(initialY + 100)
  expect(await rail.evaluate(element => element.scrollLeft)).toBeLessThan(2)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('keyboard focus, reduced motion and resizing preserve usable mobile and desktop tracks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openCategories(page)
  const rail = page.locator('.collections-viewport')
  const last = page.getByRole('link', { name: 'Personalizar tazas para empresas' })
  await last.focus()
  await expect(last).toBeInViewport()
  await expect.poll(async () => Math.round((await page.locator('.collection').last().boundingBox())!.x)).toBe(24)
  await expect(rail).toHaveAttribute('tabindex', '0')
  await expect(page.locator('.pin-spacer')).toHaveCount(0)

  await page.locator('#categorias').focus()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBe(0)
  await expect(rail).not.toHaveAttribute('tabindex', '0')
  await last.focus()
  await expect(last).toBeInViewport()

  await page.locator('#categorias').focus()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(rail).toHaveAttribute('tabindex', '0')
  await expect.poll(() => rail.evaluate(element => element.scrollLeft)).toBe(0)
  await last.focus()
  await expect(last).toBeInViewport()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
