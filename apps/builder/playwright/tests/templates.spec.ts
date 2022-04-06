import test, { expect } from '@playwright/test'
import path from 'path'
import { typebotViewer } from '../services/selectorUtils'

test.describe.parallel('Templates page', () => {
  test('From scratch should create a blank typebot', async ({ page }) => {
    await page.goto('/typebots/create')
    await page.click('text=Start from scratch')
    await expect(page).toHaveURL(new RegExp(`/edit`))
  })

  test('From file should import correctly', async ({ page }) => {
    await page.goto('/typebots/create')
    await page.setInputFiles(
      'input[type="file"]',
      path.join(__dirname, '../fixtures/typebots/singleChoiceTarget.json')
    )
    await expect(page).toHaveURL(new RegExp(`/edit`))
  })

  test('Templates should be previewable and usable', async ({ page }) => {
    await page.goto('/typebots/create')
    await page.click('text=Start from a template')
    await page.click('text=Customer Support')
    await expect(
      typebotViewer(page).locator('text=How can I help you?')
    ).toBeVisible()
    await page.click('text=Use this template')
    await expect(page).toHaveURL(new RegExp(`/edit`))
  })
})
