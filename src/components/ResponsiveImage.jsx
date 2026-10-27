// Sizes describe the page's actual columns; the browser also accounts for DPR.
export const fullPhotoSizes =
  '(min-width: 1232px) 1152px, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)';
export const halfPhotoSizes =
  '(min-width: 1232px) 544px, (min-width: 1024px) calc((100vw - 144px) / 2), (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)';

export default function ResponsiveImage({
  src,
  sizes = fullPhotoSizes,
  ...props
}) {
  return (
    <img
      {...props}
      src={src.src}
      srcSet={src.srcSet}
      sizes={sizes}
      width={src.width}
      height={src.height}
    />
  );
}
