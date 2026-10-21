import { Routes } from '@angular/router';

/**
 * One route per original HTML page. The URL paths are the same as the old
 * site (Firebase "cleanUrls"), so /fastag still opens the FASTag page.
 *
 * - title:         becomes document.title (what the browser tab shows)
 * - data:          read by PageMetaService (meta description, body class, layout)
 * - loadComponent: the page's code is downloaded only when first visited
 */
export const routes: Routes = [
  {
    path: '',
    title: "Truck Duniya, India's One-Stop Trucking Platform | Truck Ki Har Zaroorat",
    data: { description: "From FASTag to financing, GPS to fuel cards, loads to insurance, Truck Duniya is India's comprehensive logistics platform for fleet owners, transporters and drivers. Operated by Transrail Logistics Limited.", bodyClass: 'page-home' },
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'services',
    title: "Our Services, Truck Duniya | Multiple Services for India's Truckers",
    data: { description: "Multiple essential trucking services on one platform, FASTag, GPS, fuel card, fuel sensor, dashcam, loads, insurance, financing, and buy/sell truck.", bodyClass: 'page-services' },
    loadComponent: () => import('./pages/services/services-page').then((m) => m.ServicesPage),
  },
  {
    path: 'products',
    title: "Our Products, Truck Duniya | Multiple Services for India's Truckers",
    data: { description: "Multiple essential trucking services on one platform, FASTag, GPS, fuel card, fuel sensor, dashcam, loads, insurance, financing, and buy/sell truck." },
    loadComponent: () => import('./pages/products/products-page').then((m) => m.ProductsPage),
  },
  {
    path: 'about',
    title: "About Truck Duniya, Operated by Transrail Logistics Limited",
    data: { description: "Truck Duniya is India's one-stop trucking platform, operated by Transrail Logistics Limited." },
    loadComponent: () => import('./pages/about/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'investor-relations',
    title: "Investor Relations, Transrail Logistics Limited",
    data: { description: "Investor Relations for Transrail Logistics Limited, the operator of Truck Duniya: financial information, annual returns and CSR." },
    loadComponent: () => import('./pages/investor-relations/investor-relations-page').then((m) => m.InvestorRelationsPage),
  },
  {
    path: 'contact',
    title: "Contact Truck Duniya, 24×7 Helpline, Email & Support",
    data: { description: "Get in touch with Truck Duniya. 24×7 helpline, email and office address. Real help from a real team." },
    loadComponent: () => import('./pages/contact/contact-page').then((m) => m.ContactPage),
  },
  {
    path: 'faq',
    title: "FAQ & Support, Truck Duniya | Help for Every Truck Duniya Service",
    data: { description: "Answers to common questions about Truck Duniya, FASTag, GPS, fuel card, loads, insurance, financing, dashcam, fuel sensor and vehicle sales." },
    loadComponent: () => import('./pages/faq/faq-page').then((m) => m.FaqPage),
  },
  {
    path: 'blogs',
    title: "Blogs & News, Truck Duniya",
    data: { description: "Latest updates, industry insights and product news from Truck Duniya, India's one-stop digital trucking platform." },
    loadComponent: () => import('./pages/blogs/blogs-page').then((m) => m.BlogsPage),
  },
  {
    path: 'fastag',
    title: "FASTag Management, Truck Duniya | NHAI FASTag for Trucks & Fleets",
    data: { description: "Fleet-grade NHAI FASTag. One-wallet management, GST-ready statements, fastest dispute resolution, doorstep delivery, operated by Transrail Logistics Limited." },
    loadComponent: () => import('./pages/fastag/fastag-page').then((m) => m.FastagPage),
  },
  {
    path: 'gps',
    title: "GPS Tracking, Truck Duniya | Live Fleet Tracking & AIS-140 GPS",
    data: { description: "AIS-140 certified live GPS for Indian trucks. Route history, driver behaviour alerts, theft protection and geo-fencing, all in one screen." },
    loadComponent: () => import('./pages/gps/gps-page').then((m) => m.GpsPage),
  },
  {
    path: 'vltd',
    title: "Buy GPS, Truck Duniya | AIS-140 Vehicle Location Tracking Device",
    data: { description: "AIS-140 certified VLTD installation across India. Government-approved GPS tracking device with emergency button, tamper alerts, and state portal integration.", footerBuyGps: true },
    loadComponent: () => import('./pages/vltd/vltd-page').then((m) => m.VltdPage),
  },
  {
    path: 'loads',
    title: "Load Opportunities, Truck Duniya | Find Truck Loads & Cut Empty Trips",
    data: { description: "India's growing verified load marketplace, powered by Transrail Logistics Limited's freight network. Find on-route loads, cut return-trip losses, get paid on time.", bodyClass: 'page-loads' },
    loadComponent: () => import('./pages/loads/loads-page').then((m) => m.LoadsPage),
  },
  {
    path: 'fuel-card',
    title: "Fuel Card & Benefits, Truck Duniya | Save on Diesel Across India",
    data: { description: "One fuel card for your whole fleet. Cashback on every litre, driver-level spend control, GST-tagged single statement. Accepted at thousands of pumps." },
    loadComponent: () => import('./pages/fuel-card/fuel-card-page').then((m) => m.FuelCardPage),
  },
  {
    path: 'fuel-sensor',
    title: "Fuel Sensor, Truck Duniya | Stop Fuel Pilferage on Every Truck",
    data: { description: "Truck Duniya's capacitive fuel-level sensor with real-time alerts. Detect siphoning within minutes, spot every refill, prove every drop. Integrated with GPS and dashcam." },
    loadComponent: () => import('./pages/fuel-sensor/fuel-sensor-page').then((m) => m.FuelSensorPage),
  },
  {
    path: 'dashcam',
    title: "Dashcam, Truck Duniya | 4G-Connected Truck Dashcam with Fatigue Alerts",
    data: { description: "Truck Duniya's 4G dual-lens dashcam records road + cabin, streams live to the app, and warns on driver fatigue. Video evidence for every dispute, claim and incident." },
    loadComponent: () => import('./pages/dashcam/dashcam-page').then((m) => m.DashcamPage),
  },
  {
    path: 'insurance',
    title: "Insurance Coverage, Truck Duniya | Commercial Vehicle, Cargo & Driver Cover",
    data: { description: "Commercial vehicle insurance, goods-in-transit and driver cover, bought in minutes, renewed with a tap. Real claim support from a real team." },
    loadComponent: () => import('./pages/insurance/insurance-page').then((m) => m.InsurancePage),
  },
  {
    path: 'finance',
    title: "Truck Financing, Truck Duniya | Working Capital & Vehicle Loans for Truckers",
    data: { description: "Working capital and vehicle finance for Indian truckers. Quick, paperless, judged on real trip data, through RBI-regulated lending partners." },
    loadComponent: () => import('./pages/finance/finance-page').then((m) => m.FinancePage),
  },
  {
    path: 'khata-book',
    title: "Khata Book, Truck Duniya | Digital Ledger for Every Truck Expense",
    data: { description: "Manage all your truck running expenses in one digital ledger, anytime, anywhere. Diesel, tolls, repairs, driver advances, every rupee tracked." },
    loadComponent: () => import('./pages/khata-book/khata-book-page').then((m) => m.KhataBookPage),
  },
  {
    path: 'buy-sell-truck',
    title: "Buy & Sell Used Truck, Truck Duniya | India's Trusted Commercial Vehicle Marketplace",
    data: { description: "Buy or sell new and used commercial vehicles on Truck Duniya. Verified sellers, transparent pricing, in-app financing and RC transfer support." },
    loadComponent: () => import('./pages/buy-sell-truck/buy-sell-truck-page').then((m) => m.BuySellTruckPage),
  },
  {
    path: 'privacy-policy',
    title: "Privacy Policy | Truck Duniya",
    data: { description: "Truck Duniya Privacy Policy: How Transrail Logistics Limited collects, uses and protects your information.", layout: 'doc' },
    loadComponent: () => import('./pages/privacy-policy/privacy-policy-page').then((m) => m.PrivacyPolicyPage),
  },
  {
    path: 'terms',
    title: "Terms & Conditions, Truck Duniya",
    data: { description: "Terms and conditions governing the use of Truck Duniya services, FASTag and related products operated by Transrail Logistics Limited." },
    loadComponent: () => import('./pages/terms/terms-page').then((m) => m.TermsPage),
  },
  {
    path: '**',
    title: "Page Not Found, Truck Duniya",
    data: { description: "" },
    loadComponent: () => import('./pages/not-found/not-found-page').then((m) => m.NotFoundPage),
  },
];
