import { collections } from "../data/collections.js";
import { journeyCards } from "../data/journeyCards.js";
import { allFaqs } from "../data/faqs.js";
import { getGuideById, guides } from "../data/guides.js";

export const SITE_URL = "https://bridge.talharashid1209.workers.dev";
export const SITE_NAME = "BRIDGE CST";
export const SOCIAL_IMAGE_PATH = "/bridge-night-hero.png";

const HOME_TITLE = "Free Customer Support Training for Beginners | BRIDGE CST";
const HOME_DESCRIPTION =
  "Build practical customer support skills, practise realistic scenarios, and prepare for global support careers with 64 free Journey Cards.";

function normalizePath(pathname = "/") {
  const cleanPath = pathname.split("?")[0].split("#")[0] || "/";
  if (cleanPath === "/") return "/";
  return cleanPath.replace(/\/+$/, "");
}

function completeDescription(value, maximum = 158) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maximum) return text;

  const available = text.slice(0, maximum);
  const completeSentence = available.match(/^(.+[.!?])(?:\s|$)/)?.[1];
  if (completeSentence) return completeSentence;

  return `${available.slice(0, maximum - 1).replace(/\s+\S*$/, "")}.`;
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
    imageAlt: "BRIDGE CST Journey Cards connecting a night-time bridge",
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
      title: "Free Customer Support Tools and Resources | BRIDGE CST",
      description:
        "Explore free customer support tools, official product guides, typing practice, interview resources, and career websites curated for beginners.",
      pageKind: "resources",
    };
  }

  if (seo.path === "/guides") {
    return {
      ...seo,
      title: "Customer Support Career Guides | BRIDGE CST",
      description: "Read practical guides about customer support careers, CVs, interviews, BPO campaigns, support industries, tools, and technical skills.",
      pageKind: "guides",
    };
  }

  if (seo.path === "/faq") {
    return {
      ...seo,
      title: "Customer Support Training FAQ | BRIDGE CST",
      description: "Learn who BRIDGE CST is for, how Journey Cards and Practice Labs work, what accounts save, and how the free platform supports interview preparation.",
      pageKind: "faq",
    };
  }

  if (seo.path === "/search") {
    return {
      ...seo,
      title: "Search 64 Customer Support Journey Cards | BRIDGE CST",
      description: "Search all 64 free BRIDGE CST Journey Cards by skill, collection, technical topic, customer scenario, or interview preparation goal.",
      pageKind: "search",
    };
  }

  if (seo.path === "/about") {
    return {
      ...seo,
      title: "About BRIDGE CST and Creator Talha Rajput",
      description: "Learn why Talha Rajput created BRIDGE CST, how the free customer support platform helps beginners, and how AI tools assisted its development.",
      pageKind: "about",
    };
  }

  const guideMatch = seo.path.match(/^\/guides\/([^/]+)$/);
  if (guideMatch) {
    const guide = getGuideById(guideMatch[1]);
    if (guide) {
      return {
        ...seo,
        title: guide.seoTitle,
        description: completeDescription(guide.excerpt),
        type: "article",
        pageKind: "guide",
        guide,
      };
    }
  }

  if (seo.path === "/auth") {
    return {
      ...seo,
      title: "Sign In to Your Learning Account | BRIDGE CST",
      description: "Sign in to save Journey Card progress and Practice Lab responses across devices.",
      robots: "noindex,nofollow",
      pageKind: "auth",
    };
  }

  if (seo.path === "/account") {
    return {
      ...seo,
      title: "Your Learning Progress | BRIDGE CST",
      description: "View your private BRIDGE CST learning progress and continue your customer support journey.",
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
        title: `${collection.title} Training for Beginners | BRIDGE CST`,
        description: completeDescription(
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
        title: `${card.title} | BRIDGE CST`,
        description: completeDescription(
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
      title: "Page Not Found | BRIDGE CST",
      description: "Return to BRIDGE CST and continue building practical customer support skills.",
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
      alternateName: "BRIDGE Customer Support Training",
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
        "A free customer support training platform built in Pakistan for people pursuing global support careers.",
      logo: `${SITE_URL}/favicon.svg`,
    },
  ];

  if (seo.pageKind === "home") {
    graph.push({
      "@type": "ItemList",
      "@id": `${seo.canonical}#collections`,
      name: "BRIDGE CST customer support learning collections",
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
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
        { name: "Resources", url: seo.canonical },
      ]),
    );
  }

  if (seo.pageKind === "guides") {
    graph.push(
      {
        "@type": "CollectionPage",
        "@id": `${seo.canonical}#page`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": `${seo.canonical}#articles` },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": `${seo.canonical}#articles`,
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/guides/${guide.id}`,
          name: guide.title,
        })),
      },
      breadcrumbData([
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
        { name: "Guides", url: seo.canonical },
      ]),
    );
  }

  if (seo.pageKind === "faq") {
    graph.push(
      {
        "@type": "FAQPage",
        "@id": `${seo.canonical}#page`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": websiteId },
        mainEntity: allFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      breadcrumbData([
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
        { name: "FAQ", url: seo.canonical },
      ]),
    );
  }

  if (seo.pageKind === "search") {
    graph.push(
      {
        "@type": "CollectionPage",
        "@id": `${seo.canonical}#page`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": `${seo.canonical}#journey-cards` },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        "@id": `${seo.canonical}#journey-cards`,
        name: "BRIDGE CST Journey Cards",
        numberOfItems: journeyCards.length,
        itemListElement: journeyCards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/cards/${card.id}`,
          name: card.title,
        })),
      },
      breadcrumbData([
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
        { name: "Search Journey Cards", url: seo.canonical },
      ]),
    );
  }

  if (seo.pageKind === "about") {
    graph.push(
      {
        "@type": "AboutPage",
        "@id": `${seo.canonical}#page`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": websiteId },
        mainEntity: {
          "@type": "Person",
          name: "Talha Rajput",
          description: "Creator and product owner of BRIDGE CST.",
        },
        inLanguage: "en",
      },
      breadcrumbData([
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
        { name: "About", url: seo.canonical },
      ]),
    );
  }

  if (seo.pageKind === "guide") {
    graph.push(
      {
        "@type": "Article",
        "@id": `${seo.canonical}#article`,
        mainEntityOfPage: seo.canonical,
        url: seo.canonical,
        headline: seo.guide.title,
        description: seo.description,
        image: seo.image,
        datePublished: seo.guide.publishedAt,
        dateModified: seo.guide.updatedAt,
        inLanguage: "en",
        isAccessibleForFree: true,
        keywords: seo.guide.keywords.join(", "),
        author: { "@type": "Person", name: "Talha Rajput" },
        publisher: { "@id": providerId },
      },
      breadcrumbData([
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
        { name: "Guides", url: `${SITE_URL}/guides` },
        { name: seo.guide.title, url: seo.canonical },
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
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
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
          name: seo.collection?.title || "BRIDGE CST Journey Cards",
          url: seo.collection
            ? `${SITE_URL}/collections/${seo.collection.id}`
            : `${SITE_URL}/`,
        },
        provider: { "@id": providerId },
      },
      breadcrumbData([
        { name: "BRIDGE CST", url: `${SITE_URL}/` },
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
    "/guides",
    "/faq",
    "/search",
    "/about",
    ...guides.map((guide) => `/guides/${guide.id}`),
    ...collections.map((collection) => `/collections/${collection.id}`),
    ...journeyCards.map((card) => `/cards/${card.id}`),
  ];
}

export function getAllStaticRoutes() {
  return [...getIndexableRoutes(), "/auth", "/account"];
}
