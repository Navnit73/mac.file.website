import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type Route } from "@playwright/test";
import { TOOL_PAGE_ROUTES, TRUST_PAGE_ROUTES } from "@/lib/site-config";
import type {
  ReconciliationStatusResponse,
  TransactionsPageResponse,
} from "@/lib/reconciliation/types";

const ALL_INDEXABLE_ROUTES = [
  "/",
  "/reconcile",
  ...TRUST_PAGE_ROUTES,
  ...TOOL_PAGE_ROUTES,
] as const;

const A11Y_CORE_ROUTES = [
  "/",
  "/reconcile",
  "/how-it-works",
  "/faq",
  "/contact-us",
  "/about-us",
  ...TOOL_PAGE_ROUTES,
] as const;

function buildCompletedReportPayload(
  reconciliationId: string
): ReconciliationStatusResponse {
  return {
    success: true,
    reconciliation_id: reconciliationId,
    status: "completed",
    progress: 100,
    message: "Reconciliation completed.",
    error: null,
    created_at: "2026-11-15T10:30:00Z",
    completed_at: "2026-11-15T10:30:05Z",
    result: {
      summary: {
        currency: "USD",
        amount_decimal_places: 2,
        bank_transactions: 3,
        ledger_transactions: 3,
        matched: 2,
        unmatched_bank: 1,
        unmatched_ledger: 0,
        possible_duplicates: 0,
        amount_mismatches: 0,
        amount_corrections: 0,
        ledger_direction_convention: "bank",
        date_tolerance_days: 2,
        description_matching: true,
      },
      balance_check: {
        bank_opening_balance: "10000.00",
        bank_closing_balance: "13750.00",
        calculated_closing_balance: "13750.00",
        difference: "0.00",
        status: "passed",
        opening_balance_source: "statement_header",
        closing_balance_source: "statement_footer",
        running_balance: {
          status: "passed",
          checked: 3,
          breaks_count: 0,
          breaks: [],
        },
        ledger: {
          ledger_opening_balance: "10000.00",
          ledger_closing_balance: "13785.00",
          calculated_closing_balance: "13785.00",
          difference: "0.00",
          status: "passed",
          opening_balance_source: "ledger_opening",
          closing_balance_source: "ledger_closing",
        },
        book_to_bank: {
          explained_by_discrepancies: "-35.00",
          closing_balance_difference: "-35.00",
          opening_balance_difference: "0.00",
          unexplained_difference: "0.00",
          status: "passed",
        },
      },
      matched_transactions: [
        {
          category: "matched",
          bank_transaction: {
            id: "b_1",
            source: "bank",
            row: 2,
            date: "2026-11-02",
            original_date: "2026-11-02",
            description: "ACH Deposit Acme Corp",
            reference: "INV1042",
            debit: null,
            credit: "4200.00",
            amount: "4200.00",
            flow: "in",
            balance: "14200.00",
          },
          ledger_transaction: {
            id: "l_1",
            source: "ledger",
            row: 2,
            date: "2026-11-01",
            original_date: "2026-11-01",
            description: "Customer Payment Acme Corp",
            reference: "INV1042",
            debit: null,
            credit: "4200.00",
            amount: "4200.00",
            flow: "in",
            balance: "14200.00",
          },
          amount: "4200.00",
          date_difference_days: 1,
          match_basis: ["exact_amount", "reference_id"],
          confidence: "high",
        },
      ],
      unmatched_bank_transactions: [
        {
          id: "b_3",
          source: "bank",
          row: 4,
          date: "2026-11-12",
          original_date: "2026-11-12",
          description: "Outbound Wire Transfer Fee",
          reference: "FEE012",
          debit: "35.00",
          credit: null,
          amount: "35.00",
          flow: "out",
          balance: "13750.00",
          category: "unmatched_bank",
          reason: "No matching fee entry recorded in business ledger",
        },
      ],
      unmatched_ledger_transactions: [],
      possible_duplicates: [],
      amount_mismatches: [],
      amount_corrections: [],
      warnings: [],
    },
  };
}

function attachRuntimeMonitors(page: Page) {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedSameOriginAssets: string[] = [];

  page.on("pageerror", (err) => {
    pageErrors.push(err.message);
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      if (!text.includes("clarity.ms")) {
        consoleErrors.push(text);
      }
    }
  });

  page.on("response", (res) => {
    const url = res.url();
    if (
      url.startsWith("http://127.0.0.1:3100") &&
      !url.includes("/does-not-exist-404") &&
      !url.includes("/reconcile-preview/bad") &&
      !url.includes("/reconcile-preview/ab") &&
      res.status() >= 400
    ) {
      failedSameOriginAssets.push(`${res.status()} ${url}`);
    }
  });

  return { pageErrors, consoleErrors, failedSameOriginAssets };
}

test.describe("Sitewide Routing, SEO, Structured Data, Responsive & Runtime Audit", () => {
  test("validates all indexable routes for status, SEO metadata, schema, heading order, and layout overflow", async ({
    page,
  }, testInfo) => {
    const isDesktop = testInfo.project.name === "desktop";
    const routesToCheck = isDesktop ? ALL_INDEXABLE_ROUTES : A11Y_CORE_ROUTES;

    const seenTitles = new Set<string>();
    const seenDescriptions = new Set<string>();

    for (const routePath of routesToCheck) {
      const monitors = attachRuntimeMonitors(page);
      const response = await page.goto(routePath, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `HTTP 200 on ${routePath}`).toBe(200);

      // Verify language attribute and metadata
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      const title = await page.title();
      expect(title.trim().length, `Non-empty title on ${routePath}`).toBeGreaterThan(10);

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(
        description?.trim().length ?? 0,
        `Non-empty meta description on ${routePath}`
      ).toBeGreaterThan(30);

      if (isDesktop) {
        expect(seenTitles.has(title), `Duplicate title on ${routePath}: ${title}`).toBe(false);
        seenTitles.add(title);
        expect(
          seenDescriptions.has(description ?? ""),
          `Duplicate description on ${routePath}`
        ).toBe(false);
        seenDescriptions.add(description ?? "");
      }

      // Canonical URL check: must match the route, never inherit "/" on subpages
      const canonical = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href");
      const expectedSuffix = routePath === "/" ? "" : routePath;
      expect(canonical, `Canonical matches ${routePath}`).toBe(
        `https://reconcilebankstatement.online${expectedSuffix}`
      );

      // Single H1 and no heading hierarchy skips (ignoring hidden templates)
      const h1Count = await page.locator("h1").count();
      expect(h1Count, `Single H1 on ${routePath}`).toBe(1);

      const headingLevels = await page.evaluate(() =>
        Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
          .filter((el) => {
            const style = window.getComputedStyle(el);
            return style.display !== "none" && style.visibility !== "hidden";
          })
          .map((el) => Number(el.tagName.slice(1)))
      );
      expect(headingLevels[0], `First visible heading is h1 on ${routePath}`).toBe(1);
      for (let i = 1; i < headingLevels.length; i += 1) {
        expect(
          headingLevels[i] - headingLevels[i - 1],
          `No skipped heading level on ${routePath} (${headingLevels.join(",")})`
        ).toBeLessThanOrEqual(1);
      }

      // Structured data integrity: valid JSON, no FAQPage or HowTo
      const schemaTexts = await page
        .locator('script[type="application/ld+json"]')
        .allInnerTexts();
      expect(schemaTexts.length, `JSON-LD present on ${routePath}`).toBeGreaterThan(0);
      for (const rawSchema of schemaTexts) {
        const parsed = JSON.parse(rawSchema) as Record<string, unknown>;
        expect(parsed["@context"]).toBe("https://schema.org");
        expect(rawSchema).not.toContain('"FAQPage"');
        expect(rawSchema).not.toContain('"HowTo"');
      }

      // No horizontal overflow at this viewport
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow, `Zero horizontal overflow on ${routePath}`).toBeLessThanOrEqual(0);

      // Ensure no raw markdown backticks or internal placeholders rendered visibly
      const visibleText = await page.evaluate(() => document.body.innerText);
      expect(visibleText).not.toContain("OCR_API_BASE_URL");
      expect(visibleText).not.toContain("lib/site-config.ts");
      expect(visibleText).not.toContain("DNS Cutover");
      expect(visibleText).not.toContain("Editable Placeholder");

      expect(monitors.pageErrors, `No pageerror on ${routePath}`).toEqual([]);
      expect(monitors.consoleErrors, `No console error on ${routePath}`).toEqual([]);
      expect(
        monitors.failedSameOriginAssets,
        `No failed same-origin requests on ${routePath}`
      ).toEqual([]);
    }
  });

  test("returns real HTTP 404 with custom UI and noindex for unknown and malformed preview routes", async ({
    page,
  }) => {
    for (const badPath of [
      "/does-not-exist-404",
      "/reconcile-preview/bad!id",
      "/reconcile-preview/ab",
      "/reconcile-preview/rec_one/extra",
    ]) {
      const response = await page.goto(badPath, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `HTTP 404 on ${badPath}`).toBe(404);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        /couldn't find that page/i
      );
      const robotsDirectives = await page
        .locator('meta[name="robots"]')
        .evaluateAll((els) =>
          els.map((el) => (el.getAttribute("content") ?? "").toLowerCase())
        );
      expect(robotsDirectives.length).toBeGreaterThanOrEqual(1);
      for (const directive of robotsDirectives) {
        expect(directive).toContain("noindex");
        expect(directive.replace(/\bnoindex\b/g, "")).not.toMatch(/\bindex\b/);
      }
    }
  });

  test("verifies robots.txt, sitemap.xml, and internal anchor link crawl", async ({
    request,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Run once on desktop project");

    const robotsRes = await request.get("/robots.txt");
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toContain("Disallow: /api/");
    expect(robotsText).toContain("Disallow: /reconcile-preview/");
    expect(robotsText).toContain("Sitemap: https://reconcilebankstatement.online/sitemap.xml");

    const sitemapRes = await request.get("/sitemap.xml");
    expect(sitemapRes.status()).toBe(200);
    const sitemapXml = await sitemapRes.text();
    expect(sitemapXml).toContain("https://reconcilebankstatement.online</loc>");
    expect(sitemapXml).not.toContain("/reconcile-preview");
    expect(sitemapXml).not.toContain("/api/");

    const hrefs = new Set<string>();
    for (const seedPath of ["/", "/reconcile", "/how-it-works", "/tool"]) {
      await page.goto(seedPath, { waitUntil: "domcontentloaded" });
      const pageHrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a[href]"))
          .map((a) => a.getAttribute("href") ?? "")
          .filter((h) => h.startsWith("/") && !h.startsWith("//"))
      );
      for (const href of pageHrefs) {
        const clean = href.split("#")[0] || "/";
        hrefs.add(clean);
      }
    }

    for (const targetPath of hrefs) {
      const res = await request.get(targetPath);
      expect(res.status(), `Internal link ${targetPath} resolves OK`).toBe(200);
    }
  });
});

test.describe("WCAG 2.2 AA Accessibility Audits", () => {
  for (const routePath of A11Y_CORE_ROUTES) {
    test(`passes axe-core WCAG 2.2 AA checks on ${routePath}`, async ({ page }) => {
      await page.goto(routePath, { waitUntil: "domcontentloaded" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations,
        `Axe violations on ${routePath}: ${JSON.stringify(results.violations, null, 2)}`
      ).toEqual([]);
    });
  }
});

test.describe("Interactive Components, Race Conditions & Reconciliation E2E", () => {
  test("supports keyboard tabs, modals, FAQ accordions, mobile menu, and clipboard feedback", async ({
    page,
  }, testInfo) => {
    const monitors = attachRuntimeMonitors(page);
    await page
      .context()
      .grantPermissions(["clipboard-read", "clipboard-write"])
      .catch(() => undefined);
    await page.goto("/", { waitUntil: "load" });

    // Features Explorer keyboard navigation (ArrowRight/ArrowDown -> Home)
    const firstTab = page.locator('[role="tab"]').first();
    const secondTab = page.locator('[role="tab"]').nth(1);
    const thirdTab = page.locator('[role="tab"]').nth(2);
    await expect(async () => {
      await firstTab.focus();
      await page.keyboard.press("ArrowRight");
      await expect(secondTab).toBeFocused({ timeout: 500 });
      await expect(secondTab).toHaveAttribute("aria-selected", "true");
    }).toPass({ timeout: 5000 });

    await page.keyboard.press("ArrowDown");
    await expect(thirdTab).toBeFocused();
    await expect(thirdTab).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(firstTab).toBeFocused();
    await expect(firstTab).toHaveAttribute("aria-selected", "true");

    // Guide Modal opens, locks background via dialog role, closes on Escape and restores focus
    const guideTrigger = page
      .locator("section#use-cases button")
      .filter({ hasText: /Guide|Workflow|Checklist/i })
      .first();
    await guideTrigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(guideTrigger).toBeFocused();

    // Mobile hamburger menu on mobile viewport
    if (testInfo.project.name === "mobile") {
      const menuBtn = page.getByRole("button", { name: "Open navigation menu" });
      const box = await menuBtn.boundingBox();
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
      await menuBtn.click();
      await expect(page.locator("#mobile-nav-menu")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#mobile-nav-menu")).toBeHidden();
      await expect(menuBtn).toBeFocused();
    }

    // FAQ page accordion + category filter
    await page.goto("/faq", { waitUntil: "load" });
    const faqButtons = page.locator("section button[aria-expanded]");
    const firstFaqBtn = faqButtons.first();
    const initialExpanded = await firstFaqBtn.getAttribute("aria-expanded");
    await expect(async () => {
      await firstFaqBtn.click();
      expect(await firstFaqBtn.getAttribute("aria-expanded")).not.toBe(
        initialExpanded
      );
    }).toPass({ timeout: 5000 });

    // Contact Us copy button
    await page.goto("/contact-us", { waitUntil: "load" });
    const copyBtn = page.locator("#channels article").first().getByRole("button");
    await expect(async () => {
      await copyBtn.click();
      await expect(copyBtn).toContainText(/Copied/i, { timeout: 1000 });
    }).toPass({ timeout: 5000 });

    expect(monitors.pageErrors).toEqual([]);
    expect(monitors.consoleErrors).toEqual([]);
  });

  test("handles upload, Enter lookup, polling, category filter, pageSize change without loops, and export", async ({
    page,
  }) => {
    const monitors = attachRuntimeMonitors(page);

    let uploadCalls = 0;
    let statusCalls = 0;
    const txRequests: string[] = [];
    let exportCalls = 0;

    await page.route("**/api/reconciliation/**", async (route: Route) => {
      const req = route.request();
      const url = new URL(req.url());

      if (url.pathname === "/api/reconciliation/upload" && req.method() === "POST") {
        uploadCalls += 1;
        await route.fulfill({
          status: 202,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            reconciliation_id: "rec_e2e_01",
            status: "queued",
            message: "Queued",
            status_url: "/api/reconciliation/rec_e2e_01",
          }),
        });
        return;
      }

      if (url.pathname === "/api/reconciliation/rec_lookup_01") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(buildCompletedReportPayload("rec_lookup_01")),
        });
        return;
      }

      if (url.pathname === "/api/reconciliation/rec_e2e_01") {
        statusCalls += 1;
        if (statusCalls === 1) {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              success: true,
              reconciliation_id: "rec_e2e_01",
              status: "processing",
              progress: 60,
              message: "Matching rows...",
              result: null,
              error: null,
              created_at: "2026-11-15T10:30:00Z",
              completed_at: null,
            }),
          });
          return;
        }
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(buildCompletedReportPayload("rec_e2e_01")),
        });
        return;
      }

      if (
        url.pathname === "/api/reconciliation/rec_e2e_01/transactions" ||
        url.pathname === "/api/reconciliation/rec_lookup_01/transactions"
      ) {
        txRequests.push(url.search);
        const category = url.searchParams.get("status");
        const pageNum = Number(url.searchParams.get("page") ?? "1");
        const sizeNum = Number(url.searchParams.get("page_size") ?? "25");

        const payload: TransactionsPageResponse = {
          success: true,
          reconciliation_id: "rec_e2e_01",
          status:
            (category as TransactionsPageResponse["status"]) ?? "unmatched_bank",
          page: pageNum,
          page_size: sizeNum,
          total: category === "matched" ? 120 : 1,
          transactions:
            category === "matched"
              ? buildCompletedReportPayload("rec_e2e_01").result!
                  .matched_transactions
              : buildCompletedReportPayload("rec_e2e_01").result!
                  .unmatched_bank_transactions,
        };

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(payload),
        });
        return;
      }

      if (url.pathname === "/api/reconciliation/rec_e2e_01/export") {
        exportCalls += 1;
        await route.fulfill({
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": 'attachment; filename="rec_e2e_01.csv"',
          },
          body: "id,amount\nb_1,4200.00\n",
        });
        return;
      }

      await route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ status: "error", error: "Not found" }),
      });
    });

    // 1. Validate Enter-to-lookup without accidentally submitting upload form
    await page.goto("/reconcile", { waitUntil: "load" });
    await page.getByRole("button", { name: /Load Sample CSV Pair/i }).click();
    await expect(page.getByText("2/2 files ready for tie-out")).toBeVisible();

    await page.getByRole("button", { name: /Open existing ID/i }).click();
    const resumeInput = page.locator("#rec-resume-id");
    await resumeInput.fill("bad!id");
    await resumeInput.press("Enter");
    await expect(
      page.locator('[role="alert"]:not(#__next-route-announcer__)')
    ).toContainText(/Invalid reconciliation ID/i);
    expect(uploadCalls).toBe(0);

    // Valid lookup redirects cleanly via onCompleted to preview
    await resumeInput.fill("rec_lookup_01");
    await resumeInput.press("Enter");
    await expect(page).toHaveURL(/\/reconcile-preview\/rec_lookup_01/, {
      timeout: 15_000,
    });
    expect(uploadCalls).toBe(0);

    // 2. Full upload -> poll -> complete -> preview flow
    await page.goto("/reconcile", { waitUntil: "load" });
    await page.getByRole("button", { name: /Load Sample CSV Pair/i }).click();
    await page
      .getByRole("button", { name: /Run Bank Reconciliation/i })
      .click();

    await expect(page).toHaveURL(/\/reconcile-preview\/rec_e2e_01/, {
      timeout: 15_000,
    });
    await expect(page.getByText("Reconciliation Completed")).toBeVisible();

    // 3. Verify pageSize switching does NOT cause an infinite refetch loop
    await page.getByRole("button", { name: /Matched/i }).first().click();
    await expect(page.getByText(/Total: 120 items/i)).toBeVisible();

    const txCountBeforeSizeChange = txRequests.length;
    await page.locator("#rec-page-size").selectOption("50");
    await expect(page.locator("#rec-page-size")).toHaveValue("50");
    await page.waitForTimeout(350);
    // Switching pageSize once should issue only 1 transactions request (no runaway loop)
    expect(txRequests.length - txCountBeforeSizeChange).toBeLessThanOrEqual(2);
    expect(txRequests[txRequests.length - 1]).toContain("page_size=50");

    // Pagination Next keeps page_size=50
    await page.getByRole("button", { name: "Next" }).click();
    await expect(page.getByText(/Page 2 of 3/i)).toBeVisible();

    // CSV export
    await page.getByRole("button", { name: "Export CSV" }).click();
    await expect.poll(() => exportCalls).toBe(1);

    expect(monitors.pageErrors).toEqual([]);
    expect(monitors.consoleErrors).toEqual([]);
  });
});
