import {
  siC,
  siCloudflare,
  siCplusplus,
  siDiscord,
  siDjango,
  siDocker,
  siDotnet,
  siExpress,
  siGit,
  siGithub,
  siGithubactions,
  siGodotengine,
  siHetzner,
  siHtml5,
  siItchdotio,
  siJavascript,
  siJira,
  siMaplibre,
  siMermaid,
  siMongodb,
  siMysql,
  siNeon,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siShopify,
  siSvelte,
  siTailwindcss,
  siTypescript,
  siUnity,
  siVercel,
  siVitest,
  siWebpack,
  siWordpress,
  type SimpleIcon
} from 'simple-icons';

/** Brand marks come from Simple Icons (CC0). Names are matched loosely, see `brandFor`. */
const brands: Record<string, SimpleIcon> = {
  c: siC,
  'c++': siCplusplus,
  cloudflare: siCloudflare,
  discord: siDiscord,
  django: siDjango,
  docker: siDocker,
  '.net': siDotnet,
  express: siExpress,
  git: siGit,
  github: siGithub,
  'github actions': siGithubactions,
  godot: siGodotengine,
  hetzner: siHetzner,
  html: siHtml5,
  'itch.io': siItchdotio,
  javascript: siJavascript,
  jira: siJira,
  maplibre: siMaplibre,
  mermaid: siMermaid,
  mongodb: siMongodb,
  mysql: siMysql,
  neon: siNeon,
  'node.js': siNodedotjs,
  java: siOpenjdk,
  php: siPhp,
  postgresql: siPostgresql,
  python: siPython,
  react: siReact,
  shopify: siShopify,
  svelte: siSvelte,
  sveltekit: siSvelte,
  'tailwind css': siTailwindcss,
  typescript: siTypescript,
  unity: siUnity,
  vercel: siVercel,
  vitest: siVitest,
  webpack: siWebpack,
  wordpress: siWordpress
};

export type Brand = { title: string; path: string; hex: string };

/** Finds the brand mark for a tool name from the content files, or undefined. */
export function brandFor(tool: string): Brand | undefined {
  const key = tool.toLowerCase().replace(/\s+\d+(\.\d+)*$/, '').replace(/\s+pages$/, '').replace(/ gl$/, '').replace(/ framework$/, '').trim();
  const found =
    brands[key] ??
    brands[key.replace(/\s+framework.*$/, '')] ??
    (key.startsWith('.net') ? brands['.net'] : undefined);
  return found && { title: found.title, path: found.path, hex: found.hex };
}
