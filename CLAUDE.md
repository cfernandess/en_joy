# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Hebrew (RTL) bakery online store for "המאפים של גיל" (Gil's Baked Goods). Sells cookies, brownies, and rugelach with WhatsApp integration for orders.

## Development

This is a static website with no build tools. Open `index.html` directly in a browser to preview. No npm, no bundler, no server required.

## Architecture

- **index.html** - Product catalog with shopping cart and order form
- **style.css** - Pink-themed styling
- **script.js** - Cart logic (add items, render cart, form validation)

The shopping cart is stored in a JavaScript array. Products use `data-name` and `data-price` attributes on select elements. Orders are validated to only allow Sunday-Thursday delivery dates.

## Language

All UI text is in Hebrew. The site uses `dir="rtl"` for right-to-left layout.
