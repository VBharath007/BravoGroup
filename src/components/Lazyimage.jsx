import React, { useRef, useEffect, useState } from 'react';

const LazyImage = ({
    src,
    alt,
    className = '',
    // High-quality placeholder or blurred version can go here
    placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231a1a1a" width="400" height="300"/%3E%3C/svg%3E',
    style = {},
    ...props
}) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        // Fallback for browsers without IntersectionObserver
        if (!window.IntersectionObserver) {
            setImageSrc(src);
            setHasEntered(true);
            return;
        }

        let observer;
        const imgElement = imgRef.current;

        if (imgElement && !hasEntered) {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setImageSrc(src);
                            // Reset loading state for the real image
                            setIsLoaded(false); 
                            setHasEntered(true);
                            observer.unobserve(imgElement);
                        }
                    });
                },
                {
                    rootMargin: '200px', // Trigger load 200px before it enters viewport
                    threshold: 0.01
                }
            );

            observer.observe(imgElement);
        }

        return () => {
            if (observer && imgElement) {
                observer.unobserve(imgElement);
            }
        };
    }, [src, hasEntered]);

    const handleLoad = () => {
        // Only set loaded to true if we are showing the actual image
        if (imageSrc === src) {
            setIsLoaded(true);
        }
    };

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            onLoad={handleLoad}
            // We use 'opacity-0' only until the REAL image is loaded
            // This ensures a smooth fade-in and prevents the "broken" look
            className={`${className} transition-opacity duration-1000 ease-in-out ${(!isLoaded && imageSrc === src) ? 'opacity-0' : 'opacity-100'}`}
            style={{
                ...style,
                minHeight: '1px', // Ensure it has some height for the observer
                minWidth: '1px'
            }}
            loading="lazy"
            decoding="async"
            {...props}
        />
    );
};

export default LazyImage;