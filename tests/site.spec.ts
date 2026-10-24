import { expect, test, type Page } from '@playwright/test'

async function ready(page: Page) {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.waitForTimeout(350)
}

async function openSection(page: Page, label: string) {
  const menu = page.getByRole('button', { name: 'Abrir menú', exact: true })
  if (await menu.isVisible()) await menu.click()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: label, exact: true }).click()
}

for (const scenario of [
  { name: 'desktop', width: 1440, height: 1000, reduced: false },
  { name: 'mobile', width: 390, height: 844, reduced: false },
  { name: 'reduced motion', width: 1440, height: 1000, reduced: true },
]) {
  test(`reload returns to the top from an anchor and from manual scrolling: ${scenario.name}`, async ({ page }) => {
    await page.setViewportSize({ width: scenario.width, height: scenario.height })
    await page.emulateMedia({ reducedMotion: scenario.reduced ? 'reduce' : 'no-preference' })
    await page.goto('/?ref=reload-check')
    await page.evaluate(() => document.fonts.ready)
    await openSection(page, 'Trabajos')
    await expect(page.locator('#trabajos')).toBeFocused()
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(500)
    await expect(page).toHaveURL(/\?ref=reload-check#trabajos$/)

    for (const origin of ['anchor', 'manual']) {
      if (origin === 'manual') {
        await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
        await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(500)
      }
      await page.reload()
      await page.evaluate(() => document.fonts.ready)
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
      await expect(page).toHaveURL(/\?ref=reload-check$/)
      await page.waitForTimeout(600)
      expect(await page.evaluate(() => scrollY)).toBe(0)
      await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
    }
    await openSection(page, 'Trabajos')
    await expect(page.getByRole('heading', { name: 'De aquí. Con mucha historia.' })).toBeInViewport()
  })
}

test('desktop: one category pin, forward/reverse scroll, and section navigation', async ({ page }) => {
  await ready(page)
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Categorías', exact: true }).click()
  await expect.poll(async () => Math.round((await page.locator('.collections-shell').boundingBox())!.y)).toBeGreaterThanOrEqual(80)
  await page.waitForTimeout(1000)
  const start = await page.evaluate(() => scrollY)
  const initialX = (await page.locator('.collection').first().boundingBox())!.x
  await page.evaluate(() => window.scrollBy(0, 650))
  await expect.poll(async () => (await page.locator('.collection').first().boundingBox())!.x).toBeLessThan(initialX - 100)
  await page.evaluate(y => window.scrollTo(0, y), start)
  await expect.poll(async () => Math.abs((await page.locator('.collection').first().boundingBox())!.x - initialX)).toBeLessThan(3)
  const lastCategory = page.getByRole('link', { name: 'Personalizar tazas para empresas' })
  await lastCategory.focus()
  await expect(lastCategory).toBeInViewport()
  expect(await page.locator('.collections-viewport').evaluate(el => el.scrollLeft)).toBe(0)
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(start)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Trabajos', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'De aquí. Con mucha historia.' })).toBeInViewport()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Categorías', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'El momento lo eliges tú.' })).toBeInViewport()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Inicio', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport()
})

test('hero: restored video and playback', async ({ page, browserName }) => {
  await ready(page)
  const video = page.locator('.hero-film video')
  await expect(video).toBeVisible()
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.readyState)).toBeGreaterThanOrEqual(2)
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false)
  const ratio = await video.evaluate((el: HTMLVideoElement) => el.videoWidth / el.videoHeight)
  expect(ratio).toBeCloseTo(3008 / 1280, 2)
  expect(await video.evaluate((el: HTMLVideoElement) => el.currentSrc)).toContain('/hero/restored/film-medium.mp4')
  expect(await video.evaluate((el: HTMLVideoElement) => el.duration)).toBeCloseTo(109 / 24, 2)
  const dimensions = await video.evaluate((el: HTMLVideoElement) => ({ decoded: el.videoWidth, rendered: el.clientWidth }))
  // Windows WebKit can expose the native playback surface size after decoding
  // (1440px here), while loadedmetadata initially reports the 1920px source.
  if (browserName === 'webkit' && process.platform === 'win32') expect([1920, dimensions.rendered]).toContain(dimensions.decoded)
  else expect(dimensions.decoded).toBe(1920)
  await page.locator('.hero-film').click()
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
  await page.getByRole('button', { name: 'Reproducir video' }).focus()
  await page.keyboard.press('Space')
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Pedidos', exact: true }).click()
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
})

test('hero resumes a native loop seek while preserving manual and offscreen pauses', async ({ page }) => {
  await ready(page)
  const video = page.locator('.hero-film video')
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.15)
  // Reproduce the native backend's pause followed by its seek to the loop start.
  await video.evaluate((el: HTMLVideoElement) => { el.pause(); el.currentTime = 0 })
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(false)
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.15)

  await page.locator('.film-playback').click()
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
  await video.evaluate((el: HTMLVideoElement) => { el.currentTime = 0 })
  await page.waitForTimeout(300)
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)

  await page.locator('.film-playback').click()
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.15)
  await openSection(page, 'Pedidos')
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
  await video.evaluate((el: HTMLVideoElement) => { el.currentTime = 0 })
  await page.waitForTimeout(300)
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true)
})

test('hero video failure leaves the poster and copy visible with navigation usable', async ({ page, browserName }) => {
  // Windows WebKit loads MP4 through the native media backend, outside page.route.
  // Block media at document level there so the browser really rejects every source.
  const nativeMedia = browserName === 'webkit' && process.platform === 'win32'
  if (nativeMedia) {
    await page.route('http://127.0.0.1:5174/', async route => {
      const response = await route.fetch()
      await route.fulfill({ response, body: (await response.text()).replace('<head>', '<head><meta http-equiv="Content-Security-Policy" content="media-src \'none\'">') })
    })
  } else await page.route('**/media/hero/restored/*.mp4*', route => route.abort())
  await ready(page)
  await expect.poll(() => page.locator('video').evaluate((el: HTMLVideoElement) => el.readyState)).toBe(0)
  if (nativeMedia) await expect.poll(() => page.locator('video').evaluate((el: HTMLVideoElement) => el.networkState)).toBe(3)
  await expect.poll(() => page.locator('.hero-film').evaluate(el => el.classList.contains('is-ready'))).toBe(false)
  const poster = page.locator('.hero-film img')
  await expect.poll(() => poster.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await openSection(page, 'Personalización')
  await expect(page.locator('#personalizacion')).toBeFocused()
})

test('personalization switches three mug designs and removes the old captions and contact button', async ({ page }) => {
  await ready(page)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Personalización', exact: true }).click()
  const section = page.locator('#personalizacion')
  const preview = section.locator('.personalization-photo')
  let initialHeight = 0
  for (const [label, id, heading] of [
    ['Una frase', 'frase', 'Eso que solo ustedes entienden.'],
    ['Un recuerdo', 'recuerdo', 'Un momento que se queda cerca.'],
    ['Mi marca', 'marca', 'Tu identidad, hasta en el café.'],
    ['Una frase', 'frase', 'Eso que solo ustedes entienden.'],
  ]) {
    const button = section.getByRole('button', { name: label, exact: true })
    await button.click()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(section.locator('.idea-choices [aria-pressed="true"]')).toHaveCount(1)
    await expect(section.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    const image = preview.getByRole('img')
    await expect(image).toHaveCount(1)
    await expect(image).toHaveAttribute('src', `/media/personalization-scenes/${id}-960.webp`)
    await expect(image).toHaveAttribute('alt', /conceptual/)
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    const height = (await preview.boundingBox())!.height
    if (!initialHeight) initialHeight = height
    expect(Math.abs(height - initialHeight)).toBeLessThan(1)
  }
  await expect(preview).toHaveText('')
  await expect(section.getByText('Fotografía de nuestro trabajo real', { exact: true })).toHaveCount(0)
  await expect(section.getByRole('link', { name: 'Platiquemos de tu idea', exact: true })).toHaveCount(0)
  await expect(section.locator('#personalization-samples-note')).toContainText('escenas conceptuales')
})

test('work thumbnails swap the main photo; lightbox supports navigation, Escape and focus return', async ({ page }) => {
  await ready(page)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Trabajos', exact: true }).click()
  const mainPhoto = page.locator('.work-main img')
  const caption = page.locator('.work-main figcaption')
  const gallery = page.locator('#trabajos')
  for (const [title, file, counter] of [
    ['El Santo y el ferrocarril', 'tulancingo-catedral', '02 / 03'],
    ['El sabor de nuestras tradiciones', 'tulancingo-tradiciones', '03 / 03'],
    ['El Tulanbús y el café de olla', 'tulancingo-frente', '01 / 03'],
  ]) {
    const thumbnail = gallery.getByRole('button', { name: `Ver imagen: ${title}`, exact: true })
    await thumbnail.focus()
    const focusedButton = await thumbnail.elementHandle()
    await page.keyboard.press('Enter')
    await expect(mainPhoto).toHaveAttribute('src', `/media/work-mobile-scenes/${file}-960.webp`)
    await expect(mainPhoto).toHaveAttribute('alt', /conceptual/)
    await expect.poll(() => mainPhoto.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
    await expect(caption).toContainText(title)
    await expect(caption).toContainText(counter)
    await expect(gallery.locator('.work-thumbnails button')).toHaveCount(2)
    await expect(gallery.getByRole('dialog')).not.toBeVisible()
    expect(await focusedButton!.evaluate(el => el === document.activeElement)).toBe(true)
  }
  const opener = page.getByRole('button', { name: 'Ampliar imagen: El Tulanbús y el café de olla' })
  await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', '/media/work-mobile-scenes/tulancingo-frente-960.webp')
  await page.getByRole('button', { name: 'Imagen siguiente' }).click()
  await expect(page.locator('#work-dialog-title')).toHaveText('El Santo y el ferrocarril')
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('#work-dialog-title')).toHaveText('El sabor de nuestras tradiciones')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(opener).toBeFocused()
  for (const closeMethod of ['button', 'backdrop']) {
    await opener.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cerrar imagen' })).toBeFocused()
    const scrollBeforeClose = await page.evaluate(() => scrollY)
    if (closeMethod === 'button') await page.getByRole('button', { name: 'Cerrar imagen' }).click()
    else await page.mouse.click(1, 1)
    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(opener).toBeFocused()
    expect(Math.abs(await page.evaluate(() => scrollY) - scrollBeforeClose)).toBeLessThan(2)
  }
})

test('quote validates quantity and prepares exactly the visitor brief', async ({ page }) => {
  await ready(page)
  await page.evaluate(() => { window.open = ((url: string | URL | undefined) => { (window as unknown as { quoteUrl: string }).quoteUrl = String(url); return null }) as typeof window.open })
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Pedidos', exact: true }).click()
  await page.getByRole('radio', { name: 'Bodas', exact: true }).check()
  await page.getByLabel('¿Cuántas tazas?').fill('0')
  await page.getByRole('button', { name: 'Platiquemos por WhatsApp' }).click()
  expect(await page.evaluate(() => (window as unknown as { quoteUrl?: string }).quoteUrl)).toBeUndefined()
  await page.getByLabel('¿Cuántas tazas?').fill('12')
  await page.getByRole('textbox', { name: 'Tu idea (si ya tienes una)', exact: true }).fill('Ana & Miguel, una fecha para recordar.')
  await page.getByRole('button', { name: 'Platiquemos por WhatsApp' }).click()
  const captured = await page.evaluate(() => (window as unknown as { quoteUrl: string }).quoteUrl)
  const url = new URL(captured)
  expect(url.hostname).toBe('wa.me')
  expect(url.pathname).toBe('/525568903047')
  expect(url.searchParams.get('text')).toContain('12 taza(s)')
  expect(url.searchParams.get('text')).toContain('Bodas')
  expect(url.searchParams.get('text')).toContain('Ana & Miguel, una fecha para recordar.')
  await expect(page.getByRole('status')).toContainText('Tu mensaje está preparado')
})

test('mobile: native horizontal categories, menu, actual mobile video, and no overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect.poll(() => page.locator('video').evaluate((el: HTMLVideoElement) => el.currentSrc)).toContain('film-mobile.mp4')
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Categorías', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false')
  const cards = await page.locator('.collection').evaluateAll(elements => elements.map(el => ({ top: el.getBoundingClientRect().top, left: el.getBoundingClientRect().left })))
  expect(cards.every((card, index) => index === 0 || Math.abs(card.top - cards[0].top) < 1 && card.left > cards[index - 1].left)).toBe(true)
  await page.getByRole('link', { name: 'Personalizar tazas para empresas' }).scrollIntoViewIfNeeded()
  await expect(page.getByRole('link', { name: 'Personalizar tazas para empresas' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.setViewportSize({ width: 320, height: 740 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('reduced motion: static poster, no video requests or pins, complete categories', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const videoRequests: string[] = []
  page.on('request', request => { if (new URL(request.url()).pathname.endsWith('.mp4')) videoRequests.push(request.url()) })
  await ready(page)
  await expect(page.locator('video')).toHaveCount(0)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(page.locator('.hero-film img')).toBeVisible()
  await expect(page.locator('.collection')).toHaveCount(5)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Contacto', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Las buenas ideas merecen una taza.' })).toBeInViewport()
  expect(videoRequests).toEqual([])
})

test('viewport changes remove and recreate the category pin without duplicates', async ({ page }) => {
  await ready(page)
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
  await page.setViewportSize({ width: 1024, height: 700 })
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
  await page.setViewportSize({ width: 1024, height: 450 })
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Trabajos', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'De aquí. Con mucha historia.' })).toBeInViewport()
  await page.setViewportSize({ width: 1440, height: 1000 })
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(page.locator('video')).toHaveCount(0)
})

test('keyboard skip link and FAQ remain operable', async ({ page }) => {
  await ready(page)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const question = page.locator('summary').filter({ hasText: '¿Cuánto cuesta una taza personalizada?' })
  await question.scrollIntoViewIfNeeded()
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByText('La cotización se confirma según el diseño y la cantidad.', { exact: false })).toBeVisible()
})

test('all rendered assets resolve and the browser has no runtime errors', async ({ page }) => {
  const problems: string[] = []
  page.on('pageerror', error => problems.push(error.message))
  page.on('response', response => { if (response.status() >= 400) problems.push(`${response.status()} ${response.url()}`) })
  await ready(page)
  for (const section of ['personalizacion', 'categorias', 'trabajos', 'pedidos', 'contacto']) {
    await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: section === 'personalizacion' ? 'Personalización' : section === 'categorias' ? 'Categorías' : section === 'trabajos' ? 'Trabajos' : section === 'pedidos' ? 'Pedidos' : 'Contacto', exact: true }).click()
    await page.waitForTimeout(500)
  }
  const sources = await page.locator('img').evaluateAll(images => [...new Set(images.map(image => image.src))])
  for (const source of sources) expect((await page.request.get(source)).status()).toBe(200)
  expect(problems).toEqual([])
})

test('occasion keyboard selection retains the brief and clears a stale WhatsApp fallback', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await ready(page)
  await page.evaluate(() => { window.open = ((url: string | URL | undefined) => { (window as unknown as { quoteUrl: string }).quoteUrl = String(url); return null }) as typeof window.open })
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Pedidos', exact: true }).click()
  const fallback = page.getByRole('link', { name: 'Abrir mi mensaje en WhatsApp' })
  await expect(fallback).toHaveCount(0)
  await page.getByRole('radio', { name: 'Regalos', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('radio', { name: 'Cumpleaños', exact: true })).toBeChecked()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('radio', { name: 'Bodas', exact: true })).toBeChecked()
  await page.getByRole('textbox', { name: 'Tu idea (si ya tienes una)', exact: true }).fill('Una fecha especial: 25 de octubre.')
  await page.getByLabel('¿Cuántas tazas?').fill('1.5')
  await page.getByRole('button', { name: 'Platiquemos por WhatsApp' }).click()
  expect(await page.evaluate(() => (window as unknown as { quoteUrl?: string }).quoteUrl)).toBeUndefined()
  await page.getByLabel('¿Cuántas tazas?').fill('12')
  await page.getByRole('button', { name: 'Platiquemos por WhatsApp' }).click()
  await expect(fallback).toBeVisible()
  await page.getByRole('radio', { name: 'Tengo otra idea', exact: true }).check()
  await expect(fallback).toHaveCount(0)
  await expect(page.getByRole('status')).toBeEmpty()
  await expect(page.getByRole('textbox', { name: 'Tu idea (si ya tienes una)', exact: true })).toHaveValue('Una fecha especial: 25 de octubre.')
  await expect(page.getByLabel('¿Cuántas tazas?')).toHaveValue('12')
  await page.getByRole('button', { name: 'Platiquemos por WhatsApp' }).click()
  const url = new URL(await fallback.getAttribute('href') as string)
  expect(url.searchParams.get('text')).toContain('Ocasión: Otra idea.')
  expect(url.searchParams.get('text')).toContain('Una fecha especial: 25 de octubre.')
})

test('personalization respects its photo limits; occasion labels fit at narrow widths', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1920, height: 1080 })
  await ready(page)
  const photo = page.locator('.personalization-photo')
  expect((await photo.boundingBox())!.width).toBeLessThanOrEqual(480)
  expect((await page.locator('.photo-mat').boundingBox())!.height).toBeLessThanOrEqual(500)
  expect(await page.locator('.photo-mat img.is-active').evaluate(el => getComputedStyle(el).objectFit)).toBe('contain')
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    const fitted = await page.locator('.occasion-tile').evaluateAll(tiles => tiles.every(tile => {
      const box = tile.getBoundingClientRect()
      const label = tile.querySelector('span:not(.occasion-check)')!.getBoundingClientRect()
      return label.left >= box.left && label.right <= box.right && box.width >= 44 && box.height >= 44
    }))
    expect(fitted).toBe(true)
    const ideaChoicesFit = await page.locator('.idea-choices').evaluate(group => {
      const bounds = group.getBoundingClientRect()
      return [...group.querySelectorAll('button')].every(button => {
        const box = button.getBoundingClientRect()
        return box.left >= bounds.left && box.right <= bounds.right + 1 && box.width >= 44 && box.height >= 44
      })
    })
    expect(ideaChoicesFit).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})
