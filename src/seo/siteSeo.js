import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";

export const SITE_URL = "https://bridge.talharashid1209.workers.dev";
export const SITE_NAME = "BRIDGE";
export const SOCIAL_IMAGE_PATH = "/bridge-night-hero.png";

const HOME_TITLE = "Free Customer Support Training for Beginners | BRIDGE";
const HOME_DESCRIPTION =
  "Build practical customer support skills, practise realistic scenarios, and prepare for interviews with 64 free beginner-friendly Journey Cards.";

function normalizePath(pathname = "/") {
  const cleanPath = pathname.split("?")[0].split("#")[0] || "/";
  if (cleanPath === "/") return "/";
  return cleanPath.replace(/\/+$/, "");
}

function limitText(value, maximum = 158) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maximum) return text;
  return `${text.slice(0, maximum - 1).replace(/\s+\S*$/, "")}…`;
}

function canonicalUrl(pathname) {
  const path = normalizePath(pathname);
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function durationToIso(duration = "") {
  const minutes = Number.parseInt(duration, 10);
  return Number.isFinite(minutes) ? `PT${minutes}M` : undefined;
}

function baseSeo(pathname) {
  const path = normalizePath(pathname);
  return {
    path,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: canonicalUrl(path),
    image: `${SITE_URL}${SOCIAL_IMAGE_PATH}`,
    imageAlt: "BRIDGE Journey Cards connecting a night-time bridge",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    type: "website",
    pageKind: "home",
  };
}

function breadcrumbData(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getSeoForPath(pathname = "/") {
  const seo = baseSeo(pathname);

  if (seo.path === "/resources") {
    return {
      ...seo,
      title: "Free Customer Support Tools and Career Resources | BRIDGE",
      description:
        "Explore free customer support tools, official product guides, typing practice, interview resources, and career websites curated for beginners.",
      pageKind: "resources",
    };
  }

  if (seo.path === "/auth") {
    return {
      ...seo,
      title: "Sign In to Your Learning Account | BRIDGE",
      description: "Sign in to save Journey Card progress and Practice Lab responses across devices.",
      robots: "noindex,nofollow",
      pageKind: "auth",
    };
  }

  if (seo.path === "/account") {
    return {
      ...seo,
      title: "Your Learning Progress | BRIDGE",
      description: "View your private BRIDGE learning progress and continue your customer support journey.",
      robots: "noindex,nofollow",
      pageKind: "account",
    };
  }

  const collectionMatch = seo.path.match(/^\/collections\/([^/]+)$/);
  if (collectionMatch) {
    const collection = collections.find((item) => item.id === collectionMatch[1]);
    if (collection) {
      return {
        ...seo,
        title: `${collection.title} Training for Support Beginners | BRIDGE`,
        description: limitText(
          `${collection.description} Learn through eight free, practical Journey Cards designed for aspiring customer support professionals.`,
        ),
        pageKind: "collection",
        collection,
      };
    }
  }

  const cardMatch = seo.path.match(/^\/cards\/([^/]+)$/);
  if (cardMatch) {
    const card = journeyCards.find((item) => item.id === cardMatch[1]);
    const collection = card
      ? collections.find((item) => item.id === card.collectionId)
      : null;
    if (card) {
      return {
        ...seo,
        title: `${card.title} | Customer Support Training | BRIDGE`,
        description: limitText(
          `${card.description} Practise with a realistic scenario and prepare a stronger interview answer in this free Journey Card.`,
        ),
        type: "article",
        pageKind: "card",
        card,
        collection,
      };
    }
  }

  if (seo.path !== "/") {
    return {
      ...seo,
      title: "Page Not Found | BRIDGE",
      description: "Return to BRIDGE and continue building practical customer support skills.",
      robots: "noindex,nofollow",
      pageKind: "not-found",
    };
  }

  return seo;
}

export function getStructuredDataForPath(pathname = "/") {
  const seo = getSeoForPath(pathname);
  const websiteId = `${SITE_URL}/#website`;
  const providerId = `${SITE_URL}/#provider`;
  const graph = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: "BRIDGE Customer Support Learning Platform",
      description: HOME_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": providerId },
    },
    {
      "@type": "Organization",
      "@id": providerId,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description:
        "A free learning platform for aspiring and early-career customer support professionals.",
      logo: `${SITE_URL}/favicon.svg`,
    },
  ];

  if (seo.pageKind === "home") {
    graph.push({
      "@type": "ItemList",
      "@id": `${seo.canonical}#collections`,
      name: "BRIDGE customer support learning collections",
      numberOfItems: collections.length,
      itemListElement: collections.map((collection, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/collections/${collection.id}`,
        name: collection.title,
      })),
    });
  }

  if (seo.pageKind === "resources") {
    graph.push(
      {
        "@type": "CollectionPage",
        "@id": `${seo.canonical}#page`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": websiteId },
        inLanguage: "en",
      },
      breadcrumbData([
        { name: "BRIDGE", url: `${SITE_URL}/` },
        { name: "Resources", url: seo.canonical },
      ]),
    );
  }

  if (seo.pageKind === "collection") {
    const cards = journeyCards.filter((card) => card.collectionId === seo.collection.id);
    graph.push(
      {
        "@type": "CollectionPage",
        "@id": `${seo.canonical}#page`,
        url: seo.canonical,
        name: seo.collection.title,
        description: seo.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": `${seo.canonical}#journey-cards` },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": `${seo.canonical}#journey-cards`,
        name: `${seo.collection.title} Journey Cards`,
        numberOfItems: cards.length,
        itemListElement: cards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/cards/${card.id}`,
          name: card.title,
        })),
      },
      breadcrumbData([
        { name: "BRIDGE", url: `${SITE_URL}/` },
        { name: seo.collection.title, url: seo.canonical },
      ]),
    );
  }

  if (seo.pageKind === "card") {
    const duration = durationToIso(seo.card.duration);
    graph.push(
      {
        "@type": "LearningResource",
        "@id": `${seo.canonical}#lesson`,
        url: seo.canonical,
        name: seo.card.title,
        description: seo.card.description,
        inLanguage: "en",
        educationalLevel: seo.card.difficulty,
        learningResourceType: "Interactive lesson",
        teaches: seo.card.skill,
        timeRequired: duration,
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "CollectionPage",
          name: seo.collection?.title || "BRIDGE Journey Cards",
          url: seo.collection
            ? `${SITE_URL}/collections/${seo.collection.id}`
            : `${SITE_URL}/`,
        },
        provider: { "@id": providerId },
      },
      breadcrumbData([
        { name: "BRIDGE", url: `${SITE_URL}/` },
        {
          name: seo.collection?.title || "Journey Cards",
          url: seo.collection
            ? `${SITE_URL}/collections/${seo.collection.id}`
            : `${SITE_URL}/`,
        },
        { name: seo.card.title, url: seo.canonical },
      ]),
    );
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function getIndexableRoutes() {
  return [
    "/",
    "/resources",
    ...collections.map((collection) => `/collections/${collection.id}`),
    ...journeyCards.map((card) => `/cards/${card.id}`),
  ];
}

export function getAllStaticRoutes() {
  return [...getIndexableRoutes(), "/auth", "/account"];
}
