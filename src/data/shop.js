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
      'Rich, floral summer honey from our Knoxville hives. A convenient flip-top lid makes it easy to enjoy a little every day.',
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
      'Our summer honey in a beautiful, decorative Muth jar. A little sweetness to give as a gift—or keep for yourself.',
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
      'Made with our premium capping wax in a handy twist-up tube. The bee in the photo is real, but it stays here with us!',
    image: lipBalm,
    alt: 'Berry Hill Beeswax Lip Balm with a bee on the tube',
    purchaseName: '1 Tube Lip Balm',
    price: 2,
    weight: 0.1,
    inStock: false
  }
];
