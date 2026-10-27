import { paypal, products } from '../data/shop.js';
import ProductImage from '../components/ProductImage.jsx';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: paypal.currency
});
const buttonClass =
  'inline-flex items-center justify-center rounded-sm border border-ink bg-ink px-5 py-3 text-sm text-white transition-colors hover:bg-ink/85 disabled:cursor-not-allowed disabled:border-line disabled:bg-line disabled:text-muted';

// Native PayPal forms keep checkout working without a client-side cart or SDK.
function PayPalForm({ children }) {
  return (
    <form
      action={paypal.action}
      method='post'
      target='paypal'
      className='mt-auto pt-6'
    >
      <input type='hidden' name='cmd' value='_cart' />
      <input type='hidden' name='business' value={paypal.business} />
      <input type='hidden' name='currency_code' value={paypal.currency} />
      <input type='hidden' name='lc' value='US' />
      {children}
    </form>
  );
}

function ProductCard({ product }) {
  return (
    <article
      aria-labelledby={`${product.id}-heading`}
      className='flex min-w-0 flex-col rounded-sm border border-line bg-white p-5 sm:p-6'
    >
      <ProductImage product={product} />
      <p className='mb-3 mt-6 text-xs font-medium uppercase tracking-[0.12em] text-muted'>
        {product.inStock ? 'Available' : 'Temporarily sold out'}
      </p>
      <h2
        id={`${product.id}-heading`}
        className='font-serif text-2xl leading-snug'
      >
        {product.name}
      </h2>
      <p className='mt-2 text-xs leading-6 text-muted'>{product.size}</p>
      <p className='mt-4 text-sm leading-7 text-muted'>{product.description}</p>
      <p className='mt-5 font-serif text-2xl'>{money.format(product.price)}</p>
      <PayPalForm>
        <input type='hidden' name='add' value='1' />
        <input type='hidden' name='item_name' value={product.purchaseName} />
        <input type='hidden' name='amount' value={product.price.toFixed(2)} />
        <input type='hidden' name='weight' value={product.weight} />
        <fieldset
          disabled={!product.inStock}
          className='flex flex-wrap items-end gap-3 border-t border-line pt-5'
        >
          <legend className='sr-only'>Order {product.name}</legend>
          <label
            htmlFor={`${product.id}-quantity`}
            className='text-xs text-muted'
          >
            Quantity
            <input
              id={`${product.id}-quantity`}
              name='quantity'
              type='number'
              min='1'
              max='99'
              step='1'
              defaultValue='1'
              required
              className='mt-2 block w-20 rounded-sm border border-line bg-paper px-3 py-3 text-sm text-ink disabled:opacity-50'
            />
          </label>
          <button
            type='submit'
            disabled={!product.inStock}
            aria-label={
              product.inStock
                ? `Add ${product.name} to PayPal cart (opens in a separate tab)`
                : `${product.name} is sold out`
            }
            className={`${buttonClass} grow`}
          >
            {product.inStock ? 'Add to PayPal cart ↗' : 'Sold out'}
          </button>
        </fieldset>
      </PayPalForm>
    </article>
  );
}

export default function BuyOnline() {
  return (
    <>
      <section aria-labelledby='shop-heading' className='py-12 sm:py-16'>
        <p className='mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted'>
          From our hives to your home
        </p>
        <div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
          <div className='max-w-2xl'>
            <h1
              id='shop-heading'
              className='font-serif text-5xl leading-tight tracking-tight sm:text-6xl'
            >
              A little sweetness, online.
            </h1>
            <p className='mt-6 text-base leading-8 text-muted'>
              Choose your favorites below. Add items to your PayPal cart, then
              review your order and complete payment there.
            </p>
          </div>
          <PayPalForm>
            <input type='hidden' name='display' value='1' />
            <button
              type='submit'
              className={`${buttonClass} whitespace-nowrap`}
              aria-label='View your PayPal cart (opens in a separate tab)'
            >
              View cart ↗
            </button>
          </PayPalForm>
        </div>
        <p className='mt-5 text-xs leading-6 text-muted'>
          PayPal opens in a separate tab. You can return here to add more items.
        </p>
      </section>

      <section
        aria-label='Shop products'
        className='grid gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3 sm:pb-16'
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <aside
        aria-labelledby='shopping-help'
        className='mb-12 grid gap-8 border-y border-line py-8 sm:mb-16 sm:grid-cols-2 sm:gap-16'
      >
        <div>
          <h2 id='shopping-help' className='font-serif text-2xl'>
            Questions before you order?
          </h2>
          <p className='mt-3 text-sm leading-7 text-muted'>
            <a
              href='/contact'
              className='underline decoration-honey underline-offset-4'
            >
              Send us a message
            </a>{' '}
            for help with products or your order.
          </p>
        </div>
        <div>
          <h2 className='font-serif text-2xl'>A small favor for our planet.</h2>
          <p className='mt-3 text-sm leading-7 text-muted'>
            Please reuse or recycle your empty honey jars. Prefer to shop in
            person?{' '}
            <a
              href='/wheretobuy'
              className='underline decoration-honey underline-offset-4'
            >
              Find our Knoxville retailers.
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
