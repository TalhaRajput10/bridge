import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoForPath, getStructuredDataForPath, SITE_NAME } from "../seo/siteSeo.js";

function ensureMeta(attribute, key) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  return element;
}

function setMeta(attribute, key, content) {
  ensureMeta(attribute, key).setAttribute("content", content);
}

function ensureCanonical() {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  return element;
}

function ensureStructuredData() {
  let element = document.head.querySelector("#bridge-structured-data");
  if (!element) {
    element = document.createElement("script");
    element.id = "bridge-structured-data";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  return element;
}

function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);
    const structuredData = getStructuredDataForPath(pathname);

    document.title = seo.title;
    document.documentElement.lang = "en";
    setMeta("name", "description", seo.description);
    setMeta("name", "robots", seo.robots);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:type", seo.type);
    setMeta("property", "og:url", seo.canonical);
    setMeta("property", "og:image", seo.image);
    setMeta("property", "og:image:alt", seo.imageAlt);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", seo.image);
    setMeta("name", "twitter:image:alt", seo.imageAlt);
    ensureCanonical().setAttribute("href", seo.canonical);
    ensureStructuredData().textContent = JSON.stringify(structuredData);
  }, [pathname]);

  return null;
}

export default SeoManager;
