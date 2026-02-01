# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Hebrew (RTL) bakery online store for "מתוקים בגליל התחתון" (Sweets in the Lower Galilee). Owner: גיל (Gil). Phone: 050-391-9925.

## Development

This is a static website with no build tools. Open `index.html` directly in a browser to preview. No npm, no bundler, no server required.

## Architecture

- **index.html** - Product catalog with floating cart and order form
- **style.css** - Pastel pink/white styling with rounded elements
- **script.js** - Cart logic, bundle pricing, WhatsApp order integration

Products use `data-name`, `data-price`, `data-bundle-qty`, and `data-bundle-price` attributes. The floating cart panel toggles visibility. Orders are sent via WhatsApp with full order summary. Delivery dates validated to Sunday-Thursday only.

## Images

Product images go in the `images/` folder (e.g., `images/brownies.png`).

## Language

All UI text is in Hebrew. The site uses `dir="rtl"` for right-to-left layout.
