/**
 * Prefix an absolute site path with Astro's configured `base`.
 * Lets the same build work at the domain root (cverse.ai) and under a
 * sub-path such as GitHub Pages' https://<user>.github.io/<repo>/.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
