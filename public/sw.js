/*
 * Monetag service worker.
 *
 * Monetag serves push/SW-based formats from a service worker registered at the
 * site root (/sw.js). The line below loads Monetag's worker from their CDN.
 *
 * IMPORTANT: if your Monetag dashboard's "Download sw.js" gives a different
 * URL or content, replace this file with that exact version — only your
 * account dashboard has the authoritative file.
 */
importScripts('https://quge5.com/sw/quge5.js');
