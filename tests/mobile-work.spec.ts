import { expect, test } from '@playwright/test'

const views = [
  { title: 'El Tulanbús y el café de olla', file: 'tulancingo-frente' },
  { title: 'El Santo y el ferrocarril', file: 'tulancingo-catedral' },
  { title: 'El sabor de nuestras tradiciones', file: 'tulancingo-tradiciones' },
]

test('mobile gallery keeps three thumbnails visible and opens the selected conceptual scene', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.getByRole('button', { name: 'Abrir menú' }).click()
  await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name: 'Trabajos', exact: true }).click()
  const gallery = page.locator('#trabajos')
  await expect(gallery).toBeFocused()
  await expect(gallery.locator('.project-meta')).toContainText('ESCENAS CONCEPTUALES')
  await expect(gallery).not.toContainText('FOTOGRAFÍAS REALES')
  const thumbnails = gallery.locator('.work-thumbnails button')
  await expect(thumbnails).toHaveCount(3)
  const boxes = await thumbnails.evaluateAll(buttons => buttons.map(button => {
    const box = button.getBoundingClientRect()
    return { x: box.x, y: box.y, width: box.width, height: box.height }
  }))
  expect(boxes.every((box, index) => box.width >= 44 && box.height >= 44 && Math.abs(box.y - boxes[0].y) < 1 && (index === 0 || box.x > boxes[index - 1].x + boxes[index - 1].width))).toBe(true)

  for (const [index, view] of views.entries()) {
    const thumbnail = gallery.getByRole('button', { name: `Ver imagen: ${view.title}`, exact: true })
    await thumbnail.click()
    await expect(thumbnail).toHaveAttribute('aria-pressed', 'true')
    await expect(gallery.locator('.work-thumbnails [aria-pressed="true"]')).toHaveCount(1)
    await expect(gallery.locator('.work-main img')).toHaveAttribute('src', `/media/work-mobile-scenes/${view.file}-960.webp`)
    await expect(gallery.locator('.work-main img')).toHaveAttribute('alt', /conceptual/)
    await expect.poll(() => gallery.locator('.work-main img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
    await expect(gallery.locator('figcaption')).toContainText(view.title)
    await expect(gallery.locator('figcaption')).toContainText(`0${index + 1} / 03`)
    await expect(gallery.locator('.work-dots > span').nth(index)).toHaveClass('is-active')
    await expect(thumbnails).toHaveCount(3)
  }
  const opener = gallery.getByRole('button', { name: `Ampliar imagen: ${views[2].title}`, exact: true })
  await opener.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('img')).toHaveAttribute('src', '/media/work-mobile-scenes/tulancingo-tradiciones-960.webp')
  await expect(dialog).toContainText('Escena conceptual · Vista 3 de 3')
  await dialog.getByRole('button', { name: 'Imagen siguiente' }).click()
  await expect(dialog.locator('h3')).toHaveText(views[0].title)
  await page.keyboard.press('ArrowLeft')
  await expect(dialog.locator('h3')).toHaveText(views[2].title)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('reduced motion and responsive changes preserve the selected view and truthful image labels', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  const originalPhotoRequests: string[] = []
  page.on('request', request => { if (request.url().includes('/media/work/')) originalPhotoRequests.push(request.url()) })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const gallery = page.locator('#trabajos')
  await gallery.scrollIntoViewIfNeeded()
  await expect(gallery.locator('.work-main img')).toHaveAttribute('src', '/media/work-mobile-scenes/tulancingo-frente-960.webp')
  await expect(gallery.locator('.project-meta')).toContainText('ESCENAS CONCEPTUALES')
  await expect(gallery.locator('.work-thumbnails button')).toHaveCount(2)
  expect(originalPhotoRequests).toEqual([])

  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 })
    await expect(gallery.locator('.work-thumbnails button')).toHaveCount(3)
    const thumbnail = gallery.getByRole('button', { name: `Ver imagen: ${views[2].title}`, exact: true })
    await thumbnail.focus()
    await page.keyboard.press('Enter')
    await expect(thumbnail).toBeFocused()
    await expect(thumbnail).toHaveAttribute('aria-pressed', 'true')
    await expect(gallery.locator('.work-main img')).toHaveAttribute('src', '/media/work-mobile-scenes/tulancingo-tradiciones-960.webp')
    await expect(gallery.locator('.project-meta')).toContainText('ESCENAS CONCEPTUALES')
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.setViewportSize({ width: 769, height: 1000 })
  await expect(gallery.locator('.work-thumbnails button')).toHaveCount(2)
  await expect(gallery.locator('.work-main img')).toHaveAttribute('src', '/media/work-mobile-scenes/tulancingo-tradiciones-960.webp')
  await expect(gallery.locator('.work-main img')).toHaveAttribute('alt', /conceptual/)
  await expect(gallery.locator('.work-dots')).not.toBeVisible()
  await expect(gallery.locator('.project-meta')).toContainText('ESCENAS CONCEPTUALES')
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(gallery.locator('.work-main img')).toHaveAttribute('src', '/media/work-mobile-scenes/tulancingo-tradiciones-960.webp')
  await expect(gallery.locator('.work-thumbnails [aria-pressed="true"]')).toHaveAccessibleName(`Ver imagen: ${views[2].title}`)
  expect(originalPhotoRequests).toEqual([])
})
