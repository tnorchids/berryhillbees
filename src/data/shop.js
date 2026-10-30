import { photos } from './photos.js';

const { flipTopHoney, muthHoney, lipBalm } = photos;

// Migrated from bhb-legacy/src/siteoptions.jsx. Update this catalog to change
// prices or availability. Weight is the legacy PayPal shipping value, not net weight.
export const paypal = {
  action: 'https://www.paypal.com/cgi-bin/webscr',
  business: 'geff.ivey@gmail.com',
  currency: 'USD'
};

export const products = [
  {
    id: 'flip-top-honey',
    name: 'Summer Honey',
    size: '1 pound · Plastic jar with flip-top lid',
    description:
      'Rich, floral summer honey from our Knoxville hives, in a plastic jar with a flip-top lid for easy dispensing.',
    image: flipTopHoney,
    alt: 'Berry Hill honey in a plastic jar with a flip-top lid',
    purchaseName: '1 LB Honey Plastic Jar',
    price: 11,
    weight: 2,
    inStock: true
  },
  {
    id: 'muth-honey',
    name: 'Summer Honey in a Muth Jar',
    size: '1 pound · Decorative glass jar with cork',
    description:
      'Our summer honey in a decorative glass Muth jar with a cork top. A good option for gifts.',
    image: muthHoney,
    alt: 'Berry Hill honey in a decorative Muth jar with a cork',
    purchaseName: '1 LB Honey Muth Jar',
    price: 14,
    weight: 3,
    inStock: true
  },
  {
    id: 'lip-balm',
    name: 'Beeswax Lip Balm',
    size: '1 tube',
    description:
      'Made with our premium capping wax in a twist-up tube. The bee in the photo is real; it is not included.',
    image: lipBalm,
    alt: 'Berry Hill Beeswax Lip Balm with a bee on the tube',
    purchaseName: '1 Tube Lip Balm',
    price: 2,
    weight: 0.1,
    inStock: false
  }
];
