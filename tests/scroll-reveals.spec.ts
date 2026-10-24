import { expect, test } from '@playwright/test'

test('mobile scroll reveals each block once and retains it when scrolling back', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const question = page.locator('.questions details').first()
  expect(await question.evaluate(element => +getComputedStyle(element).opacity)).toBe(0)
  await question.scrollIntoViewIfNeeded()
  await page.waitForTimeout(150)
  const during = await question.evaluate(element => +getComputedStyle(element).opacity)
  expect(during).toBeGreaterThan(0)
  expect(during).toBeLessThan(1)
  await expect.poll(() => question.evaluate(element => +getComputedStyle(element).opacity)).toBe(1)
  await question.locator('summary').click()
  await expect(question).toHaveAttribute('open', '')

  // Offscreen carousel cards reveal when they are explored horizontally.
  await page.locator('.collections-viewport').scrollIntoViewIfNeeded()
  for (const card of await page.locator('.collection').all()) {
    await card.evaluate(element => element.scrollIntoView({ block: 'nearest', inline: 'start', behavior: 'instant' }))
    await page.waitForTimeout(80)
  }

  // Walk the native page, including the layout change introduced by the open FAQ.
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let top = 0; top <= maxScroll; top += 450) {
    await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), top)
    await page.waitForTimeout(70)
  }
  await page.waitForTimeout(700)
  expect(await page.locator('[data-reveal]').evaluateAll(elements => elements.every(element => +getComputedStyle(element).opacity === 1))).toBe(true)
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  expect(await question.evaluate(element => +getComputedStyle(element).opacity)).toBe(1)
  await question.scrollIntoViewIfNeeded()
  expect(await question.evaluate(element => +getComputedStyle(element).opacity)).toBe(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('keyboard focus exposes unrevealed controls and pinned categories immediately', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  expect(await page.locator('.request-brief').evaluate(element => +getComputedStyle(element).opacity)).toBe(0)
  await page.locator('#idea').evaluate(element => (element as HTMLTextAreaElement).focus({ preventScroll: true }))
  expect(await page.locator('.request-brief').evaluate(element => +getComputedStyle(element).opacity)).toBe(1)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Categorías', exact: true }).click()
  const last = page.getByRole('link', { name: 'Personalizar tazas para empresas' })
  await last.focus()
  await expect(last).toBeInViewport()
  expect(await last.evaluate(element => +getComputedStyle(element.closest('.collection')!).opacity)).toBe(1)
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
  expect(await page.locator('.collection').evaluateAll(elements => elements.every(element => getComputedStyle(element).transform === 'none'))).toBe(true)
})

test('reduced motion shows all scroll content immediately and changing preferences does not hide it', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const visible = () => page.locator('[data-reveal]').evaluateAll(elements => elements.every(element => +getComputedStyle(element).opacity === 1))
  expect(await visible()).toBe(true)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  expect(await visible()).toBe(true)
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await visible()).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(await visible()).toBe(true)
})
