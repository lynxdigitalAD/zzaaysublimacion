import { expect, test, type Page } from '@playwright/test'

async function openPersonalization(page: Page) {
  const menu = page.getByRole('button', { name: 'Abrir menú' })
  if (await menu.isVisible()) await menu.click()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Personalización', exact: true }).click()
  await expect.poll(() => page.locator('.personalization-copy').evaluate(element => getComputedStyle(element).opacity)).toBe('1')
  await expect.poll(() => page.locator('.personalization-photo').evaluate(element => getComputedStyle(element).opacity)).toBe('1')
}

async function ready(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => document.fonts.ready)
}

test('hero: ordered entrance finishes promptly and returning or resizing does not replay it', async ({ page }) => {
  // Sample each animation frame on a controlled clock, independent of other workers.
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') })
  await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'))
  await page.addInitScript(() => {
    const record: { start: number; first: Record<string, number>; completed: number; maxY: number } = { start: 0, first: {}, completed: 0, maxY: 0 }
    ;(window as unknown as { introRecord: typeof record }).introRecord = record
    const sample = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-hero-intro]'))
      if (elements.length === 4) {
        const now = performance.now()
        if (!record.start) record.start = now
        for (const element of elements) {
          const style = getComputedStyle(element)
          const key = element.dataset.heroIntro!
          if (+style.opacity > .02 && record.first[key] === undefined) record.first[key] = now - record.start
          const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform)
          record.maxY = Math.max(record.maxY, Math.abs(matrix.m42))
        }
        if (elements.every(element => +getComputedStyle(element).opacity >= .999)) record.completed = now - record.start
      }
      if (!record.completed) requestAnimationFrame(sample)
    }
    requestAnimationFrame(sample)
  })
  await ready(page)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.clock.runFor(2000)
  await expect(page.locator('.hero-film img')).toBeVisible()
  await expect.poll(() => page.evaluate(() => (window as unknown as { introRecord: { completed: number } }).introRecord.completed)).toBeGreaterThan(0)
  const record = await page.evaluate(() => (window as unknown as { introRecord: { first: Record<string, number>; completed: number; maxY: number } }).introRecord)
  expect(record.first.eyebrow).toBeLessThan(record.first.title)
  expect(record.first.title).toBeLessThan(record.first.emphasis)
  expect(record.first.emphasis).toBeLessThan(record.first.description)
  expect(record.completed).toBeGreaterThan(1200)
  expect(record.completed).toBeLessThan(2400)
  expect(record.maxY).toBeLessThanOrEqual(20)
  expect(await page.locator('.hero-film video').evaluate(element => getComputedStyle(element).transform)).toBe('none')
  await expect(page.locator('.hero-copy a')).toHaveCount(0)
  await page.clock.resume()
  await openPersonalization(page)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Inicio', exact: true }).click()
  expect(await page.locator('[data-hero-intro]').evaluateAll(elements => elements.map(element => +getComputedStyle(element).opacity))).toEqual([1, 1, 1, 1])
  await page.setViewportSize({ width: 390, height: 844 })
  expect(await page.locator('[data-hero-intro]').evaluateAll(elements => elements.map(element => +getComputedStyle(element).opacity))).toEqual([1, 1, 1, 1])
})

test('personalization: genuine crossfade, stable composition, and the latest rapid selection wins', async ({ page }) => {
  await ready(page)
  await openPersonalization(page)
  await page.locator('.photo-mat img').evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())))
  const initialHeight = (await page.locator('#personalizacion').boundingBox())!.height
  const initialWidths = await page.locator('.idea-choices button').evaluateAll(buttons => buttons.map(button => button.getBoundingClientRect().width))
  await page.getByRole('button', { name: 'Un recuerdo', exact: true }).click()
  await page.waitForTimeout(130)
  const middle = await page.locator('.photo-mat img').evaluateAll(images => images.map(image => +getComputedStyle(image).opacity))
  expect(middle[0]).toBeGreaterThan(0)
  expect(middle[0]).toBeLessThan(1)
  expect(middle[1]).toBeGreaterThan(0)
  expect(middle[1]).toBeLessThan(1)
  await page.getByRole('button', { name: 'Mi marca', exact: true }).click()
  await page.waitForTimeout(65)
  await page.getByRole('button', { name: 'Una frase', exact: true }).click()
  await page.waitForTimeout(65)
  await page.getByRole('button', { name: 'Mi marca', exact: true }).click()
  await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /marca-960\.webp$/)
  await expect(page.locator('.idea-detail-content.is-active h3')).toHaveText('Tu identidad, hasta en el café.')
  await expect.poll(() => page.locator('.photo-mat img').evaluateAll(images => images.map(image => +getComputedStyle(image).opacity))).toEqual([0, 0, 1])
  await expect(page.locator('.idea-choices [aria-pressed="true"]')).toHaveCount(1)
  expect(Math.abs((await page.locator('#personalizacion').boundingBox())!.height - initialHeight)).toBeLessThan(1)
  const widths = await page.locator('.idea-choices button').evaluateAll(buttons => buttons.map(button => button.getBoundingClientRect().width))
  widths.forEach((width, index) => expect(Math.abs(width - initialWidths[index])).toBeLessThan(1))
  expect(await page.locator('.photo-mat img').evaluateAll(images => images.every(image => getComputedStyle(image).transform === 'none' && getComputedStyle(image).objectFit === 'contain'))).toBe(true)
})

test('personalization: a slow superseded image cannot replace the latest photo and description', async ({ page }) => {
  let release!: () => void
  const held = new Promise<void>(resolve => { release = resolve })
  await page.route('**/personalization-scenes/marca-*.webp', async route => { await held; await route.continue() })
  try {
    await ready(page)
    await openPersonalization(page)
    await page.locator('.photo-mat img').first().evaluate(image => (image as HTMLImageElement).decode())
    await page.getByRole('button', { name: 'Mi marca', exact: true }).click()
    await expect(page.locator('#idea-preview')).toHaveAttribute('aria-busy', 'true')
    await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /frase-960\.webp$/)
    await expect(page.locator('.idea-detail-content.is-active h3')).toHaveText('Eso que solo ustedes entienden.')
    await page.getByRole('button', { name: 'Un recuerdo', exact: true }).click()
    await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /recuerdo-960\.webp$/)
    release()
    await page.waitForTimeout(500)
    await expect(page.locator('#idea-preview')).toHaveAttribute('aria-busy', 'false')
    await expect(page.locator('.idea-detail-content.is-active h3')).toHaveText('Un momento que se queda cerca.')
    await expect(page.getByRole('button', { name: 'Un recuerdo', exact: true })).toHaveAttribute('aria-pressed', 'true')
    expect(await page.locator('.photo-mat img').evaluateAll(images => images.map(image => +getComputedStyle(image).opacity))).toEqual([0, 1, 0])
  } finally { release() }
})

test('personalization: keyboard selection, responsive indicator, and reverse scroll retain the state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page)
  await openPersonalization(page)
  const brand = page.getByRole('button', { name: 'Mi marca', exact: true })
  await brand.focus()
  await page.keyboard.press('Enter')
  await expect(brand).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /marca-960\.webp$/)
  for (const width of [390, 320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await expect.poll(() => page.locator('.idea-choices').evaluate(group => {
      const indicator = group.querySelector('.idea-active-indicator')!.getBoundingClientRect()
      const selected = group.querySelector('[aria-pressed="true"]')!.getBoundingClientRect()
      return Math.max(Math.abs(indicator.left - selected.left), Math.abs(indicator.width - selected.width))
    })).toBeLessThan(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
  await page.locator('#personalizacion').scrollIntoViewIfNeeded()
  expect(await page.locator('.personalization-photo').evaluate(element => getComputedStyle(element).transform)).toBe('none')
  await expect.poll(() => page.locator('.personalization-photo').evaluate(element => getComputedStyle(element).opacity)).toBe('1')
  await expect.poll(() => page.locator('.personalization-copy').evaluate(element => getComputedStyle(element).opacity)).toBe('1')
  await expect(brand).toHaveAttribute('aria-pressed', 'true')
})

test('personalization: a failed image keeps the matching previous content and the other controls usable', async ({ page }) => {
  await page.route('**/personalization-scenes/marca-*.webp', route => route.abort())
  await ready(page)
  await openPersonalization(page)
  await page.getByRole('button', { name: 'Mi marca', exact: true }).click()
  await expect(page.locator('.idea-load-error')).toContainText('No pudimos cargar esta vista')
  await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /frase-960\.webp$/)
  await expect(page.locator('.idea-detail-content.is-active h3')).toHaveText('Eso que solo ustedes entienden.')
  await expect(page.locator('#idea-preview')).toHaveAttribute('aria-busy', 'false')
  await page.getByRole('button', { name: 'Un recuerdo', exact: true }).click()
  await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /recuerdo-960\.webp$/)
  await expect(page.locator('.idea-detail-content.is-active h3')).toHaveText('Un momento que se queda cerca.')
  await expect(page.locator('.idea-load-error')).toBeEmpty()
})

test('reduced motion: immediate hero, instant content changes and a settled preference change', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await ready(page)
  expect(await page.locator('[data-hero-intro]').evaluateAll(elements => elements.map(element => +getComputedStyle(element).opacity))).toEqual([1, 1, 1, 1])
  await openPersonalization(page)
  await page.getByRole('button', { name: 'Un recuerdo', exact: true }).click()
  await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /recuerdo-960\.webp$/)
  expect(await page.locator('.photo-mat img').evaluateAll(images => images.map(image => +getComputedStyle(image).opacity))).toEqual([0, 1, 0])
  expect(await page.locator('.idea-detail-content.is-active').evaluate(element => +getComputedStyle(element).opacity)).toBe(1)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.getByRole('button', { name: 'Mi marca', exact: true }).click()
  await expect(page.locator('.photo-mat img.is-active')).toHaveAttribute('src', /marca-960\.webp$/)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(await page.locator('.photo-mat img').evaluateAll(images => images.map(image => +getComputedStyle(image).opacity))).toEqual([0, 0, 1])
  expect(await page.locator('[data-hero-intro]').evaluateAll(elements => elements.map(element => +getComputedStyle(element).opacity))).toEqual([1, 1, 1, 1])
})
