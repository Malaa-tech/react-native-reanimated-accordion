import { useRef, useCallback } from 'react';
import type { ExpandableRef } from './Expandable';

/**
 * Hook to manage expandable component state and methods
 * @param initialExpanded - Initial expanded state
 * @returns Object containing ref and utility methods
 */
export const useExpandable = (initialExpanded = false) => {
  // Create ref to store the expandable component methods
  const expandableRef = useRef<ExpandableRef>(null);

  // Create a ref to track the expanded state externally
  const expandedStateRef = useRef(initialExpanded);

  // Utility methods that forward to the component's methods
  const expand = useCallback(() => {
    expandableRef.current?.expand();
  }, []);

  const collapse = useCallback(() => {
    expandableRef.current?.collapse();
  }, []);

  const toggle = useCallback(() => {
    expandableRef.current?.toggle();
  }, []);

  const isExpanded = useCallback(() => {
    return expandableRef.current?.isExpanded() ?? expandedStateRef.current;
  }, []);

  return {
    ref: expandableRef,
    expandedRef: expandedStateRef,
    expand,
    collapse,
    toggle,
    isExpanded,
  };
};

export default useExpandable;
