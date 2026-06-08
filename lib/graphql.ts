/**
 * GraphQL query documents (WPGraphQL + WPGraphQL for ACF).
 * Field names assume the ACF field groups in /wordpress/SETUP.md.
 * These strings are also mirrored as .graphql files in /graphql for reference.
 */

export const SERVICES_QUERY = /* GraphQL */ `
  query Services {
    services(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug
        title
        serviceFields {
          number
          icon
          excerpt
          description
          features { feature }
          cta
        }
        seo { title metaDesc canonical opengraphImage { sourceUrl } }
      }
    }
  }
`;

export const SERVICE_BY_SLUG_QUERY = /* GraphQL */ `
  query ServiceBySlug($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      slug
      title
      serviceFields {
        number
        icon
        excerpt
        description
        features { feature }
        cta
        sections { heading intro items { title text } }
      }
      seo { title metaDesc canonical opengraphImage { sourceUrl } }
    }
  }
`;

export const PROJECTS_QUERY = /* GraphQL */ `
  query Projects {
    projects(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        slug
        title
        projectFields {
          category
          caseLabel
          summary
          coverFrom
          coverTo
          results { result }
          coverImage { node { sourceUrl altText } }
        }
      }
    }
  }
`;

export const TESTIMONIALS_QUERY = /* GraphQL */ `
  query Testimonials {
    testimonials(first: 50) {
      nodes {
        title
        testimonialFields { name role quote }
      }
    }
  }
`;

export const GLOBAL_QUERY = /* GraphQL */ `
  query GlobalSettings {
    globalSettings {
      siteFields {
        email
        website
        location
        tagline
        motto
        legalName
        ctaLabel
        nav { label url }
        footerServices { label url }
        social { label url }
      }
    }
  }
`;

export const PAGE_BY_SLUG_QUERY = /* GraphQL */ `
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      slug
      title
      content
    }
  }
`;

export const PAGES_QUERY = /* GraphQL */ `
  query Pages($first: Int = 50) {
    pages(first: $first, where: { status: PUBLISH }) {
      nodes {
        slug
        title
        isFrontPage
      }
    }
  }
`;

/* ── Blog posts (standard WPGraphQL Post type) ─────────────────────────── */

export const POSTS_QUERY = /* GraphQL */ `
  query Posts($first: Int = 24) {
    posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        title
        excerpt
        date
        author { node { name } }
        categories(first: 1) { nodes { name slug } }
        featuredImage { node { sourceUrl altText } }
      }
    }
  }
`;

export const POSTS_BY_CATEGORY_QUERY = /* GraphQL */ `
  query PostsByCategory($slug: String, $first: Int = 24) {
    posts(first: $first, where: { status: PUBLISH, categoryName: $slug, orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        title
        excerpt
        date
        author { node { name } }
        categories(first: 1) { nodes { name slug } }
        featuredImage { node { sourceUrl altText } }
      }
    }
  }
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      title
      excerpt
      content
      date
      author { node { name } }
      categories(first: 1) { nodes { name slug } }
      featuredImage { node { sourceUrl altText } }
    }
  }
`;

/**
 * Same as POST_BY_SLUG_QUERY but also requests RankMath SEO fields
 * (provided by the "WPGraphQL for Rank Math SEO" extension).
 * If that extension is NOT active this query errors — getPost() detects that
 * and transparently retries POST_BY_SLUG_QUERY, so the page never breaks.
 */
export const POST_BY_SLUG_WITH_SEO_QUERY = /* GraphQL */ `
  query PostBySlugWithSeo($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      slug
      title
      excerpt
      content
      date
      author { node { name } }
      categories(first: 1) { nodes { name slug } }
      featuredImage { node { sourceUrl altText } }
      seo {
        title
        description
        canonicalUrl
        openGraph {
          title
          description
          image { url }
        }
      }
    }
  }
`;
