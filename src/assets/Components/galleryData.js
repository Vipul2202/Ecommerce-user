import hrold from '../../img/hrold.JPG';
import hrnew from '../../img/hrnew.JPG';
import idold from '../../img/idold.JPG';
import idnew from '../../img/idnew.JPG';
import ubold from '../../img/uc-old.jpg';
import ubnew from '../../img/uc-neww.jpg';
import wpold from '../../img/wheelpolish-old.jpg';
import wpnew from '../../img/wheelpolish-new.jpg';
import pcold from '../../img/pcold.JPG';
import pcnew from '../../img/pcnew.JPG';

// Each category can hold MULTIPLE before/after pairs.
// To add a new example to an existing category, just add another
// { before, after, title } object to that category's "pairs" array.
// To add a brand new category, import its images above and add a new
// object to this array with a unique "slug".

const galleryCategories = [
  {
    slug: 'headlight-restoration',
    name: 'Headlight Restoration',
    thumbnail: hrnew,
    pairs: [
      { before: hrold, after: hrnew, title: 'Headlight Restoration' },
    ],
  },
  {
    slug: 'interior-protection',
    name: 'Interior Protection',
    thumbnail: idnew,
    pairs: [
      { before: idold, after: idnew, title: 'Interior Protection' },
    ],
  },
  {
    slug: 'underbody-clean-paint',
    name: 'Underbody Clean & Paint Service',
    thumbnail: ubnew,
    pairs: [
      { before: ubold, after: ubnew, title: 'Underbody Clean & Paint Service' },
    ],
  },
  {
    slug: 'alloy-wheel-polishing',
    name: 'Alloy Wheel Polishing',
    thumbnail: wpnew,
    pairs: [
      { before: wpold, after: wpnew, title: 'Alloy Wheel Polishing' },
    ],
  },
  {
    slug: 'stage-3-paint-protection',
    name: 'Stage 3 Paint Protection',
    thumbnail: pcnew,
    pairs: [
      { before: pcold, after: pcnew, title: 'Stage 3 Paint Protection' },
    ],
  },
];

export default galleryCategories;
