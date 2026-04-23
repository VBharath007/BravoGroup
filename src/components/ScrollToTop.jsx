import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utility component that scrolls the window to the top whenever the location changes.
 * This ensures that navigating to a new page via footer or other links starts at the top.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // We scroll to top on every path and search change.
    // If there is a hash (e.g. /#section), we might want to let the browser or 
    // specific component handle it, but for footer links that are full page navigations,
    // (0, 0) is the desired behavior.
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search, hash]);

  return null;
}
