import * as React from 'react';
import { cn } from '../../lib/utils';
import { buildSrcSet, buildTransformUrl, splitImageProps } from './image-helpers';
import { useResponsiveImage } from './use-responsive-image';

/** Responsive Wix image transform with a blurred preview and accessible alt. */
export const ResponsiveImage = React.forwardRef(function ResponsiveImage(
  { src, parsed, fittingType, focalPoint, quality, className, style, aspectRatio, onLoad, onSourceChange, ...props }, ref
) {
  const { wrapperRef, imgRef, loaded, options, handleLoad } = useResponsiveImage(
    { parsed, fittingType, focalPoint, quality, className, onLoad, onSourceChange }, ref
  );
  const { wrapperProps, imageProps } = splitImageProps(props);
  return (
    <span ref={wrapperRef} className={cn('inline-block relative', className)} style={{ aspectRatio, ...style }} {...wrapperProps} data-base44-image="" data-base44-image-src={src}>
      <span data-source-location={undefined} className="block relative h-full w-full overflow-hidden">
        {options && !loaded && (
          <img
            alt="" aria-hidden="true" data-source-location={undefined}
            src={buildTransformUrl(parsed, { ...options, width: 20, height: options.height ? Math.max(1, Math.round(20 * options.height / options.width)) : undefined, quality: 20 })}
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: fittingType === 'fit' ? 'contain' : 'cover', filter: 'blur(10px)', transform: 'scale(1.1)' }}
          />
        )}
        <img
          ref={imgRef} src={options ? buildTransformUrl(parsed, options) : src}
          srcSet={options ? buildSrcSet(parsed, options) : undefined}
          onLoad={handleLoad} {...imageProps}
          className={cn('relative block h-full w-full', imageProps.className)}
          style={{ ...imageProps.style, objectFit: fittingType === 'fit' ? 'contain' : 'cover' }}
        />
      </span>
    </span>
  );
});
ResponsiveImage.displayName = 'ResponsiveImage';
