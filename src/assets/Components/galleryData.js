// Auto-loads gallery images from: src/img/gallery/<category-slug>/
//
// Folder naming convention:
//   src/img/gallery/headlight-restoration/before.jpg
//   src/img/gallery/headlight-restoration/after.jpg
//
// To add a MULTIPLE examples to the same category, prefix the pair with a number:
//   src/img/gallery/headlight-restoration/1-before.jpg
//   src/img/gallery/headlight-restoration/1-after.jpg
//   src/img/gallery/headlight-restoration/2-before.jpg
//   src/img/gallery/headlight-restoration/2-after.jpg
//
// To add a NEW category, just create a new folder under src/img/gallery/
// named in-lowercase-with-hyphens (e.g. "ceramic-coating") and drop a
// before/after pair inside it. The display name is generated automatically
// from the folder name (e.g. "ceramic-coating" -> "Ceramic Coating").
//
// NO CODE CHANGES NEEDED — just add/remove image files and folders.

const imageModules = import.meta.glob(
  '../../img/gallery/**/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}',
  { eager: true }
);

const toTitleCase = (slug) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const categoriesMap = {};

Object.entries(imageModules).forEach(([path, module]) => {
  // path looks like: ../../img/gallery/headlight-restoration/1-before.jpg
  const match = path.match(/gallery\/([^/]+)\/([^/]+)\.[^.]+$/i);
  if (!match) return;

  const [, categorySlug, fileName] = match;
  const lower = fileName.toLowerCase();

  let type = null;
  if (lower.includes('before')) type = 'before';
  else if (lower.includes('after')) type = 'after';
  if (!type) return; // skip any file that doesn't follow the naming convention

  const pairKey =
    lower.replace('before', '').replace('after', '').replace(/[^a-z0-9]/g, '') || '1';

  if (!categoriesMap[categorySlug]) categoriesMap[categorySlug] = {};
  if (!categoriesMap[categorySlug][pairKey]) categoriesMap[categorySlug][pairKey] = {};
  categoriesMap[categorySlug][pairKey][type] = module.default;
});

const galleryCategories = Object.keys(categoriesMap)
  .sort()
  .map((slug) => {
    const pairsMap = categoriesMap[slug];
    const pairs = Object.keys(pairsMap)
      .sort()
      .map((pairKey) => pairsMap[pairKey])
      .filter((pair) => pair.before && pair.after) // only keep complete before+after pairs
      .map((pair) => ({ ...pair, title: toTitleCase(slug) }));

    return {
      slug,
      name: toTitleCase(slug),
      thumbnail: pairs[0]?.after,
      pairs,
    };
  })
  .filter((category) => category.pairs.length > 0); // skip categories with no complete pairs

export default galleryCategories;
